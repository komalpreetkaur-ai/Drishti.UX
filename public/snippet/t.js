/**
 * DRISHTI — Vanilla JS Tracking Snippet (v1.0)
 * Lightweight (<8KB), Async, Zero Dependencies, GDPR/Privacy-First.
 */
(function () {
  'use strict';

  // Privacy Check: Respect Do Not Track
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') {
    console.log('[Drishti] DNT active — analytics disabled.');
    return;
  }

  // Find site script tag
  var currentScript = document.currentScript || document.querySelector('script[data-site]');
  var siteId = currentScript ? currentScript.getAttribute('data-site') : 'default_site';
  var endpoint = 'https://api.drishti.app/v1/events';

  var batchQueue = [];
  var lastClickTime = 0;
  var clickHistory = [];
  var maxScrollDepth = 0;

  // Helper: CSS Selector Generator
  function getSelector(el) {
    if (!el || el === document.body) return 'body';
    if (el.id) return '#' + el.id;
    if (el.className && typeof el.className === 'string') {
      var classes = el.className.split(' ').filter(Boolean).join('.');
      if (classes) return el.tagName.toLowerCase() + '.' + classes;
    }
    return el.tagName.toLowerCase();
  }

  // Record Click Events + Detect Rage Clicks & Dead Clicks
  document.addEventListener('click', function (e) {
    var target = e.target;
    var selector = getSelector(target);
    var now = Date.now();
    var rect = target.getBoundingClientRect();

    var relativeX = rect.width ? (e.clientX - rect.left) / rect.width : 0.5;
    var relativeY = rect.height ? (e.clientY - rect.top) / rect.height : 0.5;

    var clickEvent = {
      type: 'click',
      siteId: siteId,
      x: Math.round(e.pageX),
      y: Math.round(e.pageY),
      selector: selector,
      relativeX: parseFloat(relativeX.toFixed(2)),
      relativeY: parseFloat(relativeY.toFixed(2)),
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      ts: now
    };

    batchQueue.push(clickEvent);

    // Rage Click Detection (3+ clicks within 1000ms on same selector)
    clickHistory.push({ selector: selector, ts: now });
    clickHistory = clickHistory.filter(function (c) { return now - c.ts < 1000; });

    var sameSelectorClicks = clickHistory.filter(function (c) { return c.selector === selector; });
    if (sameSelectorClicks.length >= 3) {
      batchQueue.push({
        type: 'rage_click',
        siteId: siteId,
        selector: selector,
        clickCount: sameSelectorClicks.length,
        ts: now
      });
      clickHistory = []; // Reset history after trigger
    }

    // Dead Click Detection (Click on non-interactive element)
    var isInteractive = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].indexOf(target.tagName) !== -1 ||
      target.getAttribute('role') === 'button' ||
      window.getComputedStyle(target).cursor === 'pointer';

    if (!isInteractive && target.tagName !== 'BODY' && target.tagName !== 'HTML') {
      batchQueue.push({
        type: 'dead_click',
        siteId: siteId,
        selector: selector,
        reason: 'Click on non-interactive element',
        ts: now
      });
    }
  }, true);

  // Track Scroll Depth Percentage
  window.addEventListener('scroll', function () {
    var docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    ) - window.innerHeight;

    if (docHeight <= 0) return;

    var currentDepth = Math.round((window.scrollY / docHeight) * 100);
    if (currentDepth > maxScrollDepth) {
      maxScrollDepth = currentDepth;
      if (maxScrollDepth % 25 === 0) {
        batchQueue.push({
          type: 'scroll',
          siteId: siteId,
          depthPercentage: maxScrollDepth,
          ts: Date.now()
        });
      }
    }
  }, { passive: true });

  // Flush Batch Queue to Server
  function flushEvents() {
    if (batchQueue.length === 0) return;
    var payload = JSON.stringify({ siteId: siteId, events: batchQueue });
    batchQueue = [];

    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, payload);
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', endpoint, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(payload);
    }
  }

  // Periodic Flush (every 5 seconds)
  setInterval(flushEvents, 5000);
  window.addEventListener('beforeunload', flushEvents);

  console.log('[Drishti] Tracking snippet initialized for site:', siteId);
})();

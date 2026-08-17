import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../services/drishtiData';

export const ProfileTab: React.FC = () => {
  const [name, setName] = useState('Ananya Rao');
  const [email, setEmail] = useState('ananya@zomato.com');
  const [role, setRole] = useState('Head of Growth');
  const [company, setCompany] = useState('Zomato');
  const [weekly, setWeekly] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [profileSaved, setProfileSaved] = useState(false);

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleSave = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2200);
  };

  const toggleStyle = (on: boolean) => ({
    width: '42px',
    height: '22px',
    borderRadius: '11px',
    cursor: 'pointer',
    padding: '2px',
    border: 0,
    background: on ? '#232046' : '#cbd5e1',
    display: 'flex',
    justifyContent: on ? 'flex-end' : 'flex-start',
    alignItems: 'center',
    transition: 'all 0.2s ease'
  });

  const knobStyle = (on: boolean) => ({
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: on ? '#F0A93B' : '#ffffff'
  });

  return (
    <main style={{ padding: '34px 40px 60px', maxWidth: '880px' }}>
      
      {/* Subheader */}
      <h2 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 600 }}>Profile</h2>
      <p className="text-muted" style={{ margin: 0, fontSize: '13px' }}>
        Who you are on this account, and what Drishti sends you.
      </p>

      <hr className="hr" style={{ margin: '14px 0 30px' }} />

      {/* Avatar Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '22px', marginBottom: '34px' }}>
        <div style={{ width: '78px', height: '78px', borderRadius: '50%', border: '1px solid #232046', color: '#232046', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontSize: '30px', letterSpacing: '.02em', background: '#fff' }}>
          {initials}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 600 }}>{name}</span>
          <span className="text-muted" style={{ fontSize: '13px' }}>{role} · {company}</span>
          <button className="btn btn-secondary" style={{ alignSelf: 'flex-start', marginTop: '2px' }}>
            Upload a photograph
          </button>
        </div>
      </div>

      {/* Details Form */}
      <h4 style={{ margin: '0 0 14px', fontSize: '16px', fontWeight: 600 }}>Details</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)' }}>
            Full name
          </label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)' }}>
            Work email
          </label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)' }}>
            Role
          </label>
          <input className="input" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#7d7979', fontFamily: 'var(--font-heading)' }}>
            Company
          </label>
          <input className="input" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
      </div>

      {/* Notifications */}
      <h4 style={{ margin: '34px 0 12px', fontSize: '16px', fontWeight: 600 }}>What we send you</h4>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '14px 0', borderBottom: '1px solid var(--color-divider)' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>Weekly UX health report</div>
            <div className="text-muted" style={{ fontSize: '12px' }}>Monday mornings, findings ranked by estimated revenue impact.</div>
          </div>
          <button onClick={() => setWeekly(!weekly)} style={toggleStyle(weekly)}>
            <span style={knobStyle(weekly)} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '14px 0', borderBottom: '1px solid var(--color-divider)' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>Critical finding alerts</div>
            <div className="text-muted" style={{ fontSize: '12px' }}>Email the moment a new Critical finding is confirmed by data.</div>
          </div>
          <button onClick={() => setAlerts(!alerts)} style={toggleStyle(alerts)}>
            <span style={knobStyle(alerts)} />
          </button>
        </div>

      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '26px' }}>
        <button onClick={handleSave} className="btn btn-primary">
          {profileSaved ? 'Saved' : 'Save changes'}
        </button>
        <button className="btn btn-ghost">Change password</button>
      </div>

      {/* Team Table */}
      <h4 style={{ margin: '40px 0 12px', fontSize: '16px', fontWeight: 600 }}>Team</h4>
      <table className="table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Member</th>
            <th style={{ textAlign: 'left' }}>Email</th>
            <th style={{ textAlign: 'left' }}>Access</th>
            <th style={{ textAlign: 'left' }}>Last active</th>
          </tr>
        </thead>
        <tbody>
          {TEAM_MEMBERS.map((m, idx) => (
            <tr key={idx}>
              <td style={{ fontWeight: 600 }}>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.role}</td>
              <td style={{ color: 'var(--color-muted)' }}>{m.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-secondary" style={{ marginTop: '14px' }}>
        Invite a teammate
      </button>

    </main>
  );
};

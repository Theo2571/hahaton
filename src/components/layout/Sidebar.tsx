import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  GitBranch,
  Globe,
  BarChart2,
  Plug,
  Settings,
  Zap,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/chats', icon: MessageSquare, label: 'Лиды / Чаты' },
  { to: '/funnel', icon: GitBranch, label: 'Воронка' },
  { to: '/tours', icon: Globe, label: 'Туры' },
  { to: '/analytics', icon: BarChart2, label: 'Аналитика' },
  { to: '/integrations', icon: Plug, label: 'Интеграции' },
  { to: '/settings', icon: Settings, label: 'Настройки AI' },
];

const GLASS = {
  background: 'rgba(9,9,11,0.75)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  borderRight: '1px solid rgba(255,255,255,0.05)',
} as React.CSSProperties;

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 240,
        minWidth: 240,
        ...GLASS,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div style={{ padding: '28px 24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(124,58,237,0.4)',
            }}
          >
            <Zap size={16} color="#fff" fill="#fff" />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 800,
                fontSize: 15,
                color: '#7C3AED',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
              }}
            >
              Aiva Pro
            </div>
            <div style={{ fontSize: 9, color: '#52525b', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 1 }}>
              Neural Interface
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', margin: '0 16px 12px' }} />

      {/* Nav label */}
      <div style={{ padding: '0 24px 8px', fontSize: 9, fontWeight: 700, color: '#3f3f46', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        Навигация
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#a78bfa' : '#71717a',
              background: isActive ? 'rgba(124,58,237,0.15)' : 'transparent',
              borderRight: isActive ? '3px solid #7C3AED' : '3px solid transparent',
              transition: 'all 0.2s',
              fontFamily: 'Inter, sans-serif',
            })}
            onMouseEnter={e => {
              const el = e.currentTarget;
              if (!el.getAttribute('aria-current')) {
                el.style.color = '#d4d4d8';
                el.style.background = 'rgba(255,255,255,0.04)';
              }
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              if (!el.getAttribute('aria-current')) {
                el.style.color = '#71717a';
                el.style.background = 'transparent';
              }
            }}
          >
            <Icon size={16} strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '16px 12px 24px' }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', marginBottom: 16 }} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 12px',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.03)',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
              color: '#fff',
              flexShrink: 0,
              boxShadow: '0 0 10px rgba(124,58,237,0.3)',
            }}
          >
            МС
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#e4e4e7' }}>Менеджер</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 1 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.5)' }} />
              <span style={{ fontSize: 10, color: '#52525b' }}>Онлайн</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

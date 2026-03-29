import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  GitBranch,
  Globe,
  BarChart2,
  Plug,
  Settings,
  Plane,
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

export default function Sidebar() {
  return (
    <aside
      style={{ width: 240, minWidth: 240, background: '#161B27', borderRight: '1px solid #2A3347' }}
      className="flex flex-col h-screen sticky top-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5" style={{ borderBottom: '1px solid #2A3347' }}>
        <div
          className="flex items-center justify-center rounded-lg"
          style={{ width: 36, height: 36, background: '#3B82F6' }}
        >
          <Plane size={18} color="#fff" />
        </div>
        <div>
          <div className="font-semibold text-sm" style={{ color: '#F1F5F9' }}>Aiva</div>
          <div className="text-xs" style={{ color: '#94A3B8' }}>Sales Platform</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
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
              fontSize: 14,
              fontWeight: isActive ? 500 : 400,
              color: isActive ? '#F1F5F9' : '#94A3B8',
              background: isActive ? '#1E2433' : 'transparent',
              transition: 'all 0.15s',
            })}
            onMouseEnter={e => {
              const el = e.currentTarget;
              if (!el.classList.contains('active')) {
                el.style.background = '#1A2030';
                el.style.color = '#CBD5E1';
              }
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              if (!el.classList.contains('active')) {
                el.style.background = 'transparent';
                el.style.color = '#94A3B8';
              }
            }}
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4" style={{ borderTop: '1px solid #2A3347' }}>
        <div className="flex items-center gap-3 px-3 py-2">
          <div
            className="rounded-full flex items-center justify-center text-xs font-semibold"
            style={{ width: 32, height: 32, background: '#3B82F6', color: '#fff' }}
          >
            МС
          </div>
          <div>
            <div className="text-sm font-medium" style={{ color: '#F1F5F9' }}>Менеджер</div>
            <div className="text-xs" style={{ color: '#94A3B8' }}>Онлайн</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

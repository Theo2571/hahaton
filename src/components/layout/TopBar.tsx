import { useState } from 'react';
import { Search, Bell, X } from 'lucide-react';

const notifications = [
  { id: 1, type: 'hot', text: 'Горячий лид: Анна Соколова', time: '2 мин назад' },
  { id: 2, type: 'new', text: 'Новый лид из WhatsApp', time: '15 мин назад' },
  { id: 3, type: 'error', text: 'AI не смог ответить Дмитрию Волкову', time: '1 час назад' },
];

const dotColor = { hot: '#EF4444', new: '#7C3AED', error: '#F59E0B' } as Record<string, string>;

export default function TopBar() {
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <header
      style={{
        height: 58,
        background: 'rgba(9,9,11,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: 14,
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 4px 24px rgba(124,58,237,0.06)',
      }}
    >
      {/* Search */}
      <div
        style={{
          flex: 1,
          maxWidth: 380,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(39,39,42,0.5)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 8,
          padding: '7px 12px',
        }}
      >
        <Search size={14} color="#52525b" />
        <input
          placeholder="Поиск лидов, туров..."
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#fafafa',
            fontSize: 13,
            width: '100%',
            fontFamily: 'Inter, sans-serif',
          }}
        />
      </div>

      <div style={{ flex: 1 }} />

      {/* Notifications */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowNotifs(!showNotifs)}
          style={{
            position: 'relative',
            background: 'rgba(39,39,42,0.5)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 8,
            padding: '7px 9px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.2s',
          }}
        >
          <Bell size={16} color="#a1a1aa" />
          <span
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#EF4444',
              border: '1.5px solid #09090b',
              boxShadow: '0 0 6px rgba(239,68,68,0.6)',
            }}
          />
        </button>

        {showNotifs && (
          <div
            style={{
              position: 'absolute',
              top: 46,
              right: 0,
              width: 320,
              background: 'rgba(24,24,27,0.9)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.1)',
              zIndex: 100,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>
                Уведомления
              </span>
              <button
                onClick={() => setShowNotifs(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
              >
                <X size={14} color="#71717a" />
              </button>
            </div>
            {notifications.map(n => (
              <div
                key={n.id}
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: dotColor[n.type],
                      flexShrink: 0,
                      boxShadow: `0 0 6px ${dotColor[n.type]}80`,
                    }}
                  />
                  <span style={{ fontSize: 12, color: '#e4e4e7' }}>{n.text}</span>
                </div>
                <div style={{ fontSize: 10, color: '#52525b', marginLeft: 15 }}>{n.time}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Avatar */}
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
          cursor: 'pointer',
          boxShadow: '0 0 12px rgba(124,58,237,0.4)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        МС
      </div>
    </header>
  );
}

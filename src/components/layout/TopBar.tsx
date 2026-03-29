import { useState } from 'react';
import { Search, Bell, X } from 'lucide-react';

const notifications = [
  { id: 1, type: 'hot', text: 'Горячий лид: Анна Соколова', time: '2 мин назад' },
  { id: 2, type: 'new', text: 'Новый лид из WhatsApp', time: '15 мин назад' },
  { id: 3, type: 'error', text: 'AI не смог ответить Дмитрию Волкову', time: '1 час назад' },
];

export default function TopBar() {
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <header
      style={{
        height: 60,
        background: '#161B27',
        borderBottom: '1px solid #2A3347',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: 16,
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Search */}
      <div
        style={{
          flex: 1,
          maxWidth: 400,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#1E2433',
          border: '1px solid #2A3347',
          borderRadius: 8,
          padding: '7px 12px',
        }}
      >
        <Search size={15} color="#94A3B8" />
        <input
          placeholder="Поиск лидов, туров..."
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#F1F5F9',
            fontSize: 14,
            width: '100%',
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
            background: '#1E2433',
            border: '1px solid #2A3347',
            borderRadius: 8,
            padding: '7px 9px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Bell size={17} color="#94A3B8" />
          <span
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#EF4444',
              border: '2px solid #161B27',
            }}
          />
        </button>

        {showNotifs && (
          <div
            style={{
              position: 'absolute',
              top: 44,
              right: 0,
              width: 320,
              background: '#1E2433',
              border: '1px solid #2A3347',
              borderRadius: 12,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
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
                borderBottom: '1px solid #2A3347',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: '#F1F5F9' }}>Уведомления</span>
              <button
                onClick={() => setShowNotifs(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
              >
                <X size={15} color="#94A3B8" />
              </button>
            </div>
            {notifications.map(n => (
              <div
                key={n.id}
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #2A3347',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background:
                        n.type === 'hot' ? '#EF4444' : n.type === 'new' ? '#3B82F6' : '#F59E0B',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 13, color: '#F1F5F9' }}>{n.text}</span>
                </div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginLeft: 16 }}>{n.time}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Avatar */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: '#3B82F6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontWeight: 600,
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        МС
      </div>
    </header>
  );
}

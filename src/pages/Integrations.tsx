import { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, Link } from 'lucide-react';

const initialChannels = [
  { id: 'wa', name: 'WhatsApp', icon: '💬', connected: true, phoneNumber: '+7 (999) 123-45-67', leadsToday: 5, color: '#25D366' },
  { id: 'tg', name: 'Telegram', icon: '✈️', connected: true, phoneNumber: '@travel_ai_bot', leadsToday: 4, color: '#2CA5E0' },
  { id: 'ig', name: 'Instagram', icon: '📸', connected: false, phoneNumber: null, leadsToday: 0, color: '#E1306C' },
];

const CARD: React.CSSProperties = {
  background: 'rgba(24,24,27,0.5)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 16,
};

export default function Integrations() {
  const [channels, setChannels] = useState(initialChannels);

  function toggleConnection(id: string) {
    setChannels(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, connected: !c.connected, phoneNumber: c.connected ? null : 'Настройте подключение' }
          : c
      )
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>
          Каналы связи
        </div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#fafafa', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>
          Интеграции
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#71717a' }}>Управление каналами связи</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 28 }}>
        {channels.map(channel => (
          <div
            key={channel.id}
            style={{
              ...CARD,
              padding: 24,
              position: 'relative',
              overflow: 'hidden',
              borderColor: channel.connected ? `${channel.color}30` : 'rgba(255,255,255,0.06)',
            }}
          >
            {/* Top glow accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: channel.connected
                  ? `linear-gradient(90deg, transparent, ${channel.color}, transparent)`
                  : 'rgba(255,255,255,0.05)',
              }}
            />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    background: `${channel.color}15`,
                    border: `1px solid ${channel.color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                  }}
                >
                  {channel.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>{channel.name}</div>
                  {channel.phoneNumber && (
                    <div style={{ fontSize: 11, color: '#71717a', marginTop: 2 }}>{channel.phoneNumber}</div>
                  )}
                </div>
              </div>
              {channel.connected
                ? <CheckCircle size={18} color="#10B981" />
                : <XCircle size={18} color="#3f3f46" />
              }
            </div>

            {/* Status */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                borderRadius: 20,
                background: channel.connected ? 'rgba(16,185,129,0.12)' : 'rgba(63,63,70,0.4)',
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: channel.connected ? '#10B981' : '#52525b',
                  boxShadow: channel.connected ? '0 0 6px rgba(16,185,129,0.6)' : 'none',
                }}
              />
              <span style={{ fontSize: 11, fontWeight: 600, color: channel.connected ? '#10B981' : '#52525b' }}>
                {channel.connected ? 'Подключено' : 'Не подключено'}
              </span>
            </div>

            {/* Stats */}
            {channel.connected && (
              <div
                style={{
                  background: 'rgba(39,39,42,0.4)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: 10,
                  padding: '10px 14px',
                  marginBottom: 18,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: 10, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Лидов сегодня</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: channel.color, fontFamily: 'Manrope, sans-serif' }}>{channel.leadsToday}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Активных</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>{Math.floor(channel.leadsToday * 0.6)}</div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => toggleConnection(channel.id)}
                style={{
                  flex: 1,
                  background: channel.connected
                    ? 'rgba(239,68,68,0.1)'
                    : `linear-gradient(135deg, ${channel.color}, ${channel.color}cc)`,
                  border: channel.connected ? '1px solid rgba(239,68,68,0.25)' : 'none',
                  borderRadius: 10,
                  padding: '10px',
                  color: channel.connected ? '#EF4444' : '#fff',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  fontFamily: 'Manrope, sans-serif',
                  boxShadow: channel.connected ? 'none' : `0 0 16px ${channel.color}40`,
                }}
              >
                <Link size={13} />
                {channel.connected ? 'Отключить' : 'Подключить'}
              </button>
              {channel.connected && (
                <button
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 10,
                    padding: '10px 12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <RefreshCw size={13} color="#71717a" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Webhook info */}
      <div style={{ ...CARD, padding: 24 }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 700, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>
          Webhook URL
        </h3>
        <div
          style={{
            background: 'rgba(9,9,11,0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 10,
            padding: '12px 16px',
            fontFamily: 'monospace',
            fontSize: 12,
            color: '#a78bfa',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ color: '#71717a' }}>https://api.travelai.app/webhook/incoming</span>
          <button
            style={{
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(124,58,237,0.25)',
              borderRadius: 7,
              padding: '5px 12px',
              color: '#a78bfa',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Копировать
          </button>
        </div>
      </div>
    </div>
  );
}

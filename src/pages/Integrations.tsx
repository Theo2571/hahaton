import { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, Link } from 'lucide-react';

const initialChannels = [
  {
    id: 'wa',
    name: 'WhatsApp',
    icon: '💬',
    connected: true,
    phoneNumber: '+7 (999) 123-45-67',
    leadsToday: 5,
    color: '#25D366',
  },
  {
    id: 'tg',
    name: 'Telegram',
    icon: '✈️',
    connected: true,
    phoneNumber: '@travel_ai_bot',
    leadsToday: 4,
    color: '#2CA5E0',
  },
  {
    id: 'ig',
    name: 'Instagram',
    icon: '📸',
    connected: false,
    phoneNumber: null,
    leadsToday: 0,
    color: '#E1306C',
  },
];

export default function Integrations() {
  const [channels, setChannels] = useState(initialChannels);

  function toggleConnection(id: string) {
    setChannels(prev =>
      prev.map(c =>
        c.id === id ? { ...c, connected: !c.connected, phoneNumber: c.connected ? null : 'Настройте подключение' } : c
      )
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#F1F5F9' }}>Интеграции</h1>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: '#94A3B8' }}>
          Управление каналами связи
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
        {channels.map(channel => (
          <div
            key={channel.id}
            style={{
              background: '#161B27',
              border: `1px solid ${channel.connected ? channel.color + '44' : '#2A3347'}`,
              borderRadius: 16,
              padding: 28,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Color accent top */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: channel.connected ? channel.color : '#2A3347',
              }}
            />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: `${channel.color}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                  }}
                >
                  {channel.icon}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#F1F5F9' }}>{channel.name}</div>
                  {channel.phoneNumber && (
                    <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{channel.phoneNumber}</div>
                  )}
                </div>
              </div>
              {channel.connected ? (
                <CheckCircle size={20} color="#10B981" />
              ) : (
                <XCircle size={20} color="#64748B" />
              )}
            </div>

            {/* Status */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 12px',
                borderRadius: 6,
                background: channel.connected ? 'rgba(16,185,129,0.15)' : 'rgba(100,116,139,0.15)',
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: channel.connected ? '#10B981' : '#64748B',
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: channel.connected ? '#10B981' : '#64748B',
                }}
              >
                {channel.connected ? 'Подключено' : 'Не подключено'}
              </span>
            </div>

            {/* Stats */}
            {channel.connected && (
              <div
                style={{
                  background: '#1E2433',
                  borderRadius: 8,
                  padding: '10px 14px',
                  marginBottom: 20,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>Лидов сегодня</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: channel.color }}>{channel.leadsToday}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#64748B' }}>Активных</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#F1F5F9' }}>{Math.floor(channel.leadsToday * 0.6)}</div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => toggleConnection(channel.id)}
                style={{
                  flex: 1,
                  background: channel.connected ? 'rgba(239,68,68,0.1)' : channel.color,
                  border: channel.connected ? '1px solid rgba(239,68,68,0.3)' : 'none',
                  borderRadius: 8,
                  padding: '10px',
                  color: channel.connected ? '#EF4444' : '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Link size={14} />
                {channel.connected ? 'Отключить' : 'Подключить'}
              </button>
              {channel.connected && (
                <button
                  style={{
                    background: '#1E2433',
                    border: '1px solid #2A3347',
                    borderRadius: 8,
                    padding: '10px 12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <RefreshCw size={14} color="#94A3B8" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Webhook info */}
      <div
        style={{
          background: '#161B27',
          border: '1px solid #2A3347',
          borderRadius: 12,
          padding: 24,
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: '#F1F5F9' }}>
          Webhook URL
        </h3>
        <div
          style={{
            background: '#0F1117',
            border: '1px solid #2A3347',
            borderRadius: 8,
            padding: '12px 16px',
            fontFamily: 'monospace',
            fontSize: 13,
            color: '#94A3B8',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>https://api.travelai.app/webhook/incoming</span>
          <button
            style={{
              background: '#1E2433',
              border: '1px solid #2A3347',
              borderRadius: 6,
              padding: '5px 12px',
              color: '#94A3B8',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            Копировать
          </button>
        </div>
      </div>
    </div>
  );
}

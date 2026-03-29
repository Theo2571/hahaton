import { useState } from 'react';
import { leads, type Lead, type LeadStatus, type Channel } from '../data/mock';
import { Send, UserPlus, Bot, User, Headphones } from 'lucide-react';

const channelColors: Record<Channel, string> = {
  WA: '#25D366',
  TG: '#2CA5E0',
  IG: '#E1306C',
};

const statusConfig: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  new: { label: 'Новый', color: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
  in_progress: { label: 'В процессе', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  hot: { label: 'Горячий 🔥', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
  paid: { label: 'Оплачено ✓', color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
};

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = statusConfig[status];
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 500,
        color: cfg.color,
        background: cfg.bg,
        padding: '2px 7px',
        borderRadius: 4,
        whiteSpace: 'nowrap',
      }}
    >
      {cfg.label}
    </span>
  );
}

function ChannelBadge({ channel }: { channel: Channel }) {
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        color: channelColors[channel],
        background: `${channelColors[channel]}22`,
        padding: '1px 6px',
        borderRadius: 3,
        letterSpacing: 0.3,
      }}
    >
      {channel}
    </span>
  );
}

export default function Chats() {
  const [selectedId, setSelectedId] = useState<string>(leads[0].id);
  const [input, setInput] = useState('');
  const [managerConnected, setManagerConnected] = useState(false);
  const [allLeads, setAllLeads] = useState<Lead[]>(leads);

  const selected = allLeads.find(l => l.id === selectedId)!;

  function sendMessage() {
    if (!input.trim()) return;
    setAllLeads(prev =>
      prev.map(l =>
        l.id === selectedId
          ? {
              ...l,
              messages: [
                ...l.messages,
                {
                  id: `m${Date.now()}`,
                  sender: managerConnected ? 'manager' : 'client',
                  text: input.trim(),
                  time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
                },
              ],
              lastMessage: input.trim(),
            }
          : l
      )
    );
    setInput('');
  }

  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 108px)',
        gap: 0,
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid #2A3347',
      }}
    >
      {/* Left: Lead List */}
      <div
        style={{
          width: 300,
          minWidth: 300,
          background: '#161B27',
          borderRight: '1px solid #2A3347',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #2A3347' }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#F1F5F9' }}>Диалоги</h2>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#94A3B8' }}>
            {allLeads.length} лидов
          </p>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {allLeads.map(lead => (
            <div
              key={lead.id}
              onClick={() => setSelectedId(lead.id)}
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #1E2433',
                cursor: 'pointer',
                background: selectedId === lead.id ? '#1E2433' : 'transparent',
                transition: 'background 0.1s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#F1F5F9' }}>
                    {lead.name}
                  </span>
                  {lead.unread > 0 && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        background: '#3B82F6',
                        color: '#fff',
                        padding: '1px 5px',
                        borderRadius: 10,
                      }}
                    >
                      {lead.unread}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 11, color: '#64748B' }}>{lead.lastTime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <ChannelBadge channel={lead.channel} />
                <StatusBadge status={lead.status} />
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: '#64748B',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {lead.lastMessage}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Center: Chat */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#0F1117',
          overflow: 'hidden',
        }}
      >
        {/* Chat header */}
        <div
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid #2A3347',
            background: '#161B27',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: '#1E2433',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 600,
                color: '#3B82F6',
              }}
            >
              {selected.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#F1F5F9' }}>{selected.name}</div>
              <div style={{ fontSize: 12, color: '#94A3B8', display: 'flex', gap: 6 }}>
                <ChannelBadge channel={selected.channel} />
                <span>•</span>
                <span>{selected.country}</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {managerConnected ? (
              <span
                style={{
                  fontSize: 12,
                  color: '#10B981',
                  background: 'rgba(16,185,129,0.15)',
                  padding: '4px 10px',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <Headphones size={13} /> Менеджер подключён
              </span>
            ) : (
              <span
                style={{
                  fontSize: 12,
                  color: '#3B82F6',
                  background: 'rgba(59,130,246,0.15)',
                  padding: '4px 10px',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <Bot size={13} /> AI отвечает
              </span>
            )}
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {selected.messages.map(msg => {
            const isClient = msg.sender === 'client';
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: isClient ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end',
                  gap: 6,
                }}
              >
                {!isClient && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: isAI ? 'rgba(59,130,246,0.2)' : 'rgba(16,185,129,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isAI ? <Bot size={14} color="#3B82F6" /> : <User size={14} color="#10B981" />}
                  </div>
                )}
                <div style={{ maxWidth: '65%' }}>
                  {!isClient && (
                    <div
                      style={{
                        fontSize: 10,
                        color: isAI ? '#3B82F6' : '#10B981',
                        marginBottom: 3,
                        fontWeight: 500,
                      }}
                    >
                      {isAI ? 'AI-ассистент' : 'Менеджер'}
                    </div>
                  )}
                  <div
                    style={{
                      padding: '9px 13px',
                      borderRadius: isClient ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      background: isClient ? '#3B82F6' : '#1E2433',
                      color: '#F1F5F9',
                      fontSize: 13,
                      lineHeight: 1.5,
                    }}
                  >
                    {msg.text}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: '#64748B',
                      marginTop: 3,
                      textAlign: isClient ? 'right' : 'left',
                    }}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div
          style={{
            padding: '12px 16px',
            borderTop: '1px solid #2A3347',
            background: '#161B27',
            display: 'flex',
            gap: 8,
          }}
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder={managerConnected ? 'Написать клиенту...' : 'Сообщение (режим менеджера)...'}
            style={{
              flex: 1,
              background: '#1E2433',
              border: '1px solid #2A3347',
              borderRadius: 8,
              padding: '9px 14px',
              color: '#F1F5F9',
              fontSize: 13,
              outline: 'none',
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              background: '#3B82F6',
              border: 'none',
              borderRadius: 8,
              padding: '9px 13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Send size={15} color="#fff" />
          </button>
        </div>
      </div>

      {/* Right: Lead Context */}
      <div
        style={{
          width: 280,
          minWidth: 280,
          background: '#161B27',
          borderLeft: '1px solid #2A3347',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #2A3347' }}>
          <h3 style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Контекст лида
          </h3>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Status */}
          <div>
            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 6, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Статус
            </div>
            <StatusBadge status={selected.status} />
          </div>

          {/* Params */}
          <div>
            <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Параметры
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { label: '🌍 Страна', value: selected.country },
                { label: '📅 Даты', value: selected.dates },
                { label: '💰 Бюджет', value: selected.budget },
                { label: '👥 Люди', value: `${selected.people} чел.` },
              ].map(p => (
                <div key={p.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: '#64748B' }}>{p.label}</span>
                  <span style={{ fontSize: 12, color: '#F1F5F9', fontWeight: 500 }}>{p.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Tours */}
          {selected.suggestedTours.length > 0 && (
            <div>
              <div style={{ fontSize: 11, color: '#64748B', marginBottom: 8, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Предложены туры
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selected.suggestedTours.map(tour => (
                  <div
                    key={tour.id}
                    style={{
                      background: '#1E2433',
                      borderRadius: 8,
                      padding: '10px 12px',
                      border: '1px solid #2A3347',
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#F1F5F9', marginBottom: 2 }}>
                      {tour.hotel}
                    </div>
                    <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>
                      {tour.country} • {tour.dates}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#3B82F6' }}>
                      ${tour.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connect button */}
          <button
            onClick={() => setManagerConnected(!managerConnected)}
            style={{
              marginTop: 'auto',
              background: managerConnected ? 'rgba(16,185,129,0.15)' : '#3B82F6',
              border: managerConnected ? '1px solid #10B981' : 'none',
              borderRadius: 8,
              padding: '10px',
              cursor: 'pointer',
              color: managerConnected ? '#10B981' : '#fff',
              fontSize: 13,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              width: '100%',
            }}
          >
            <UserPlus size={15} />
            {managerConnected ? 'Отключиться' : 'Подключиться'}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { leads, type Lead, type LeadStatus, type Channel } from '../data/mock';
import { Send, UserPlus, Bot, User, Headphones } from 'lucide-react';

const channelColors: Record<Channel, string> = {
  WA: '#25D366',
  TG: '#2CA5E0',
  IG: '#E1306C',
};

const statusConfig: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  new: { label: 'Новый', color: '#7C3AED', bg: 'rgba(124,58,237,0.15)' },
  in_progress: { label: 'В процессе', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  hot: { label: 'Горячий 🔥', color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
  paid: { label: 'Оплачено ✓', color: '#10B981', bg: 'rgba(16,185,129,0.12)' },
};

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = statusConfig[status];
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 600,
        color: cfg.color,
        background: cfg.bg,
        padding: '2px 7px',
        borderRadius: 20,
        whiteSpace: 'nowrap',
        letterSpacing: '0.02em',
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
        fontSize: 9,
        fontWeight: 700,
        color: channelColors[channel],
        background: `${channelColors[channel]}18`,
        padding: '2px 6px',
        borderRadius: 3,
        letterSpacing: 0.5,
      }}
    >
      {channel}
    </span>
  );
}

const GLASS: React.CSSProperties = {
  background: 'rgba(24,24,27,0.5)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
};

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
        height: 'calc(100vh - 114px)',
        gap: 0,
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Left: Lead List */}
      <div
        style={{
          width: 290,
          minWidth: 290,
          ...GLASS,
          borderRight: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#fafafa', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.01em' }}>
            Диалоги
          </h2>
          <p style={{ margin: '2px 0 0', fontSize: 11, color: '#52525b' }}>
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
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                cursor: 'pointer',
                background: selectedId === lead.id ? 'rgba(124,58,237,0.12)' : 'transparent',
                borderLeft: selectedId === lead.id ? '3px solid #7C3AED' : '3px solid transparent',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                if (lead.id !== selectedId) e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
              onMouseLeave={e => {
                if (lead.id !== selectedId) e.currentTarget.style.background = 'transparent';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#e4e4e7', fontFamily: 'Manrope, sans-serif' }}>
                    {lead.name}
                  </span>
                  {lead.unread > 0 && (
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        background: '#7C3AED',
                        color: '#fff',
                        padding: '1px 5px',
                        borderRadius: 20,
                        boxShadow: '0 0 8px rgba(124,58,237,0.5)',
                      }}
                    >
                      {lead.unread}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 10, color: '#3f3f46' }}>{lead.lastTime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <ChannelBadge channel={lead.channel} />
                <StatusBadge status={lead.status} />
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  color: '#52525b',
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
          background: '#09090b',
          overflow: 'hidden',
        }}
      >
        {/* Chat header */}
        <div
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(24,24,27,0.4)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(91,33,182,0.3))',
                border: '1px solid rgba(124,58,237,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 700,
                color: '#a78bfa',
                fontFamily: 'Manrope, sans-serif',
              }}
            >
              {selected.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>{selected.name}</div>
              <div style={{ fontSize: 11, color: '#71717a', display: 'flex', gap: 6, alignItems: 'center' }}>
                <ChannelBadge channel={selected.channel} />
                <span>·</span>
                <span>{selected.country}</span>
              </div>
            </div>
          </div>
          <div>
            {managerConnected ? (
              <span
                style={{
                  fontSize: 11,
                  color: '#10B981',
                  background: 'rgba(16,185,129,0.12)',
                  border: '1px solid rgba(16,185,129,0.2)',
                  padding: '5px 10px',
                  borderRadius: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <Headphones size={12} /> Менеджер подключён
              </span>
            ) : (
              <span
                style={{
                  fontSize: 11,
                  color: '#a78bfa',
                  background: 'rgba(124,58,237,0.12)',
                  border: '1px solid rgba(124,58,237,0.2)',
                  padding: '5px 10px',
                  borderRadius: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <Bot size={12} /> AI отвечает
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
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: isAI ? 'rgba(124,58,237,0.2)' : 'rgba(16,185,129,0.2)',
                      border: `1px solid ${isAI ? 'rgba(124,58,237,0.3)' : 'rgba(16,185,129,0.3)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isAI ? <Bot size={13} color="#a78bfa" /> : <User size={13} color="#10B981" />}
                  </div>
                )}
                <div style={{ maxWidth: '65%' }}>
                  {!isClient && (
                    <div
                      style={{
                        fontSize: 10,
                        color: isAI ? '#7C3AED' : '#10B981',
                        marginBottom: 3,
                        fontWeight: 600,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {isAI ? 'AI-ассистент' : 'Менеджер'}
                    </div>
                  )}
                  <div
                    style={{
                      padding: '9px 13px',
                      borderRadius: isClient ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                      background: isClient
                        ? 'linear-gradient(135deg, #7C3AED, #5B21B6)'
                        : 'rgba(39,39,42,0.6)',
                      border: isClient ? 'none' : '1px solid rgba(255,255,255,0.06)',
                      color: '#fafafa',
                      fontSize: 13,
                      lineHeight: 1.55,
                      boxShadow: isClient ? '0 4px 16px rgba(124,58,237,0.3)' : 'none',
                    }}
                  >
                    {msg.text}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: '#3f3f46',
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
            borderTop: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(24,24,27,0.4)',
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
              background: 'rgba(39,39,42,0.6)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10,
              padding: '9px 14px',
              color: '#fafafa',
              fontSize: 13,
              outline: 'none',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
              border: 'none',
              borderRadius: 10,
              padding: '9px 13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 0 16px rgba(124,58,237,0.4)',
            }}
          >
            <Send size={14} color="#fff" />
          </button>
        </div>
      </div>

      {/* Right: Lead Context */}
      <div
        style={{
          width: 270,
          minWidth: 270,
          ...GLASS,
          borderLeft: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ margin: 0, fontSize: 10, fontWeight: 700, color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'Manrope, sans-serif' }}>
            Контекст лида
          </h3>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Status */}
          <div>
            <div style={{ fontSize: 10, color: '#3f3f46', marginBottom: 7, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Статус
            </div>
            <StatusBadge status={selected.status} />
          </div>

          {/* Params */}
          <div>
            <div style={{ fontSize: 10, color: '#3f3f46', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Параметры
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: '🌍 Страна', value: selected.country },
                { label: '📅 Даты', value: selected.dates },
                { label: '💰 Бюджет', value: selected.budget },
                { label: '👥 Люди', value: `${selected.people} чел.` },
              ].map(p => (
                <div
                  key={p.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                  }}
                >
                  <span style={{ fontSize: 12, color: '#71717a' }}>{p.label}</span>
                  <span style={{ fontSize: 12, color: '#e4e4e7', fontWeight: 600 }}>{p.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Tours */}
          {selected.suggestedTours.length > 0 && (
            <div>
              <div style={{ fontSize: 10, color: '#3f3f46', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Предложены туры
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selected.suggestedTours.map(tour => (
                  <div
                    key={tour.id}
                    style={{
                      background: 'rgba(39,39,42,0.4)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: 10,
                      padding: '10px 12px',
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#e4e4e7', marginBottom: 2, fontFamily: 'Manrope, sans-serif' }}>
                      {tour.hotel}
                    </div>
                    <div style={{ fontSize: 11, color: '#71717a', marginBottom: 5 }}>
                      {tour.country} · {tour.dates}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#a78bfa', fontFamily: 'Manrope, sans-serif' }}>
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
              background: managerConnected
                ? 'rgba(16,185,129,0.12)'
                : 'linear-gradient(135deg, #7C3AED, #5B21B6)',
              border: managerConnected ? '1px solid rgba(16,185,129,0.3)' : 'none',
              borderRadius: 10,
              padding: '11px',
              cursor: 'pointer',
              color: managerConnected ? '#10B981' : '#fff',
              fontSize: 13,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              width: '100%',
              boxShadow: managerConnected ? 'none' : '0 0 20px rgba(124,58,237,0.35)',
              fontFamily: 'Manrope, sans-serif',
              transition: 'all 0.2s',
            }}
          >
            <UserPlus size={14} />
            {managerConnected ? 'Отключиться' : 'Подключиться'}
          </button>
        </div>
      </div>
    </div>
  );
}

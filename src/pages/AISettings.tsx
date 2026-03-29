import { useState } from 'react';
import { Save, Bot, ToggleLeft, ToggleRight } from 'lucide-react';

type Tone = 'formal' | 'friendly' | 'sales';

const toneOptions: { value: Tone; label: string; desc: string; emoji: string }[] = [
  { value: 'formal', label: 'Формальный', desc: 'Профессиональное деловое общение', emoji: '🎩' },
  { value: 'friendly', label: 'Дружелюбный', desc: 'Тёплое, непринуждённое общение', emoji: '😊' },
  { value: 'sales', label: 'Продажный', desc: 'Активные продажи, закрытие сделок', emoji: '🚀' },
];

const priorityCountries = ['ОАЭ', 'Таиланд', 'Турция', 'Мальдивы', 'Греция', 'Испания', 'Италия', 'Бали', 'Египет'];

const CARD: React.CSSProperties = {
  background: 'rgba(24,24,27,0.5)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 16,
};

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  background: 'rgba(39,39,42,0.6)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 8,
  padding: '10px 12px',
  color: '#fafafa',
  fontSize: 13,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif',
};

export default function AISettings() {
  const [tone, setTone] = useState<Tone>('friendly');
  const [autoPush, setAutoPush] = useState(true);
  const [minBudget, setMinBudget] = useState('1000');
  const [selectedCountries, setSelectedCountries] = useState(['ОАЭ', 'Таиланд', 'Турция']);
  const [responseDelay, setResponseDelay] = useState('30');
  const [saved, setSaved] = useState(false);

  function toggleCountry(c: string) {
    setSelectedCountries(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>
          Конфигурация
        </div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#fafafa', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>
          Настройки AI
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#71717a' }}>Конфигурация AI-ассистента</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Tone */}
          <div style={{ ...CARD, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Bot size={17} color="#7C3AED" />
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>
                Тон общения
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {toneOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setTone(opt.value)}
                  style={{
                    background: tone === opt.value ? 'rgba(124,58,237,0.18)' : 'rgba(39,39,42,0.4)',
                    border: `1px solid ${tone === opt.value ? 'rgba(124,58,237,0.45)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 12,
                    padding: '16px 12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    boxShadow: tone === opt.value ? '0 0 20px rgba(124,58,237,0.15)' : 'none',
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{opt.emoji}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: tone === opt.value ? '#a78bfa' : '#e4e4e7', marginBottom: 4, fontFamily: 'Manrope, sans-serif' }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: 10, color: '#71717a', lineHeight: 1.45 }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Scenarios */}
          <div style={{ ...CARD, padding: 24 }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>
              Сценарии
            </h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                background: 'rgba(39,39,42,0.4)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 12,
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#e4e4e7', marginBottom: 3, fontFamily: 'Manrope, sans-serif' }}>
                  Авто-дожим клиентов
                </div>
                <div style={{ fontSize: 11, color: '#71717a' }}>
                  AI сам напоминает о предложении через 24 часа
                </div>
              </div>
              <button
                onClick={() => setAutoPush(!autoPush)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                {autoPush
                  ? <ToggleRight size={30} color="#7C3AED" />
                  : <ToggleLeft size={30} color="#3f3f46" />
                }
              </button>
            </div>
          </div>

          {/* Priority Countries */}
          <div style={{ ...CARD, padding: 24 }}>
            <h3 style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>
              Приоритет стран
            </h3>
            <p style={{ margin: '0 0 14px', fontSize: 11, color: '#71717a' }}>
              AI будет предлагать эти направления в первую очередь
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {priorityCountries.map(c => (
                <button
                  key={c}
                  onClick={() => toggleCountry(c)}
                  style={{
                    background: selectedCountries.includes(c) ? 'rgba(124,58,237,0.18)' : 'rgba(39,39,42,0.5)',
                    border: `1px solid ${selectedCountries.includes(c) ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 8,
                    padding: '6px 14px',
                    color: selectedCountries.includes(c) ? '#a78bfa' : '#71717a',
                    fontSize: 12,
                    fontWeight: selectedCountries.includes(c) ? 700 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Parameters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...CARD, padding: 24 }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 14, fontWeight: 700, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>
              Параметры
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ display: 'block', fontSize: 10, color: '#71717a', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Минимальный бюджет ($)
                </label>
                <input type="number" value={minBudget} onChange={e => setMinBudget(e.target.value)} style={INPUT_STYLE} />
                <p style={{ margin: '6px 0 0', fontSize: 10, color: '#52525b' }}>
                  Лиды ниже этого бюджета не получают приоритет
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 10, color: '#71717a', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Задержка ответа (сек)
                </label>
                <input type="number" value={responseDelay} onChange={e => setResponseDelay(e.target.value)} style={INPUT_STYLE} />
                <p style={{ margin: '6px 0 0', fontSize: 10, color: '#52525b' }}>
                  Имитация человеческой паузы перед ответом
                </p>
              </div>
            </div>
          </div>

          {/* Current config summary */}
          <div style={{ ...CARD, padding: 24 }}>
            <h3 style={{ margin: '0 0 14px', fontSize: 14, fontWeight: 700, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>
              Текущая конфигурация
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Тон', value: toneOptions.find(t => t.value === tone)?.label || '' },
                { label: 'Авто-дожим', value: autoPush ? 'Включён' : 'Выключен' },
                { label: 'Мин. бюджет', value: `$${minBudget}` },
                { label: 'Задержка', value: `${responseDelay} сек` },
                { label: 'Приоритет стран', value: selectedCountries.join(', ') || 'Не задано' },
              ].map(item => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                  }}
                >
                  <span style={{ fontSize: 11, color: '#71717a' }}>{item.label}</span>
                  <span style={{ fontSize: 12, color: '#e4e4e7', fontWeight: 600, textAlign: 'right', maxWidth: '60%', fontFamily: 'Manrope, sans-serif' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            style={{
              background: saved
                ? 'linear-gradient(135deg, #10B981, #059669)'
                : 'linear-gradient(135deg, #7C3AED, #5B21B6)',
              border: 'none',
              borderRadius: 12,
              padding: '13px',
              color: '#fff',
              fontSize: 14,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.2s',
              boxShadow: saved ? '0 0 20px rgba(16,185,129,0.4)' : '0 0 24px rgba(124,58,237,0.4)',
              fontFamily: 'Manrope, sans-serif',
            }}
          >
            <Save size={15} />
            {saved ? 'Сохранено!' : 'Сохранить настройки'}
          </button>
        </div>
      </div>
    </div>
  );
}

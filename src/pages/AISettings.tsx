import { useState } from 'react';
import { Save, Bot, ToggleLeft, ToggleRight } from 'lucide-react';

type Tone = 'formal' | 'friendly' | 'sales';

const toneOptions: { value: Tone; label: string; desc: string; emoji: string }[] = [
  { value: 'formal', label: 'Формальный', desc: 'Профессиональное деловое общение', emoji: '🎩' },
  { value: 'friendly', label: 'Дружелюбный', desc: 'Тёплое, непринуждённое общение', emoji: '😊' },
  { value: 'sales', label: 'Продажный', desc: 'Активные продажи, закрытие сделок', emoji: '🚀' },
];

const priorityCountries = ['ОАЭ', 'Таиланд', 'Турция', 'Мальдивы', 'Греция', 'Испания', 'Италия', 'Бали', 'Египет'];

export default function AISettings() {
  const [tone, setTone] = useState<Tone>('friendly');
  const [autoPush, setAutoPush] = useState(true);
  const [minBudget, setMinBudget] = useState('1000');
  const [selectedCountries, setSelectedCountries] = useState(['ОАЭ', 'Таиланд', 'Турция']);
  const [responseDelay, setResponseDelay] = useState('30');
  const [saved, setSaved] = useState(false);

  function toggleCountry(c: string) {
    setSelectedCountries(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#F1F5F9' }}>Настройки AI</h1>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: '#94A3B8' }}>
          Конфигурация AI-ассистента
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Tone */}
          <div
            style={{
              background: '#161B27',
              border: '1px solid #2A3347',
              borderRadius: 12,
              padding: 24,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Bot size={18} color="#3B82F6" />
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#F1F5F9' }}>
                Тон общения
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {toneOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setTone(opt.value)}
                  style={{
                    background: tone === opt.value ? 'rgba(59,130,246,0.15)' : '#1E2433',
                    border: `1px solid ${tone === opt.value ? '#3B82F6' : '#2A3347'}`,
                    borderRadius: 10,
                    padding: '16px 12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{opt.emoji}</div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: tone === opt.value ? '#3B82F6' : '#F1F5F9',
                      marginBottom: 4,
                    }}
                  >
                    {opt.label}
                  </div>
                  <div style={{ fontSize: 11, color: '#64748B', lineHeight: 1.4 }}>{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Scenarios */}
          <div
            style={{
              background: '#161B27',
              border: '1px solid #2A3347',
              borderRadius: 12,
              padding: 24,
            }}
          >
            <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: '#F1F5F9' }}>
              Сценарии
            </h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                background: '#1E2433',
                borderRadius: 10,
                border: '1px solid #2A3347',
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#F1F5F9', marginBottom: 4 }}>
                  Авто-дожим клиентов
                </div>
                <div style={{ fontSize: 12, color: '#64748B' }}>
                  AI сам напоминает о предложении через 24 часа
                </div>
              </div>
              <button
                onClick={() => setAutoPush(!autoPush)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                {autoPush ? (
                  <ToggleRight size={32} color="#3B82F6" />
                ) : (
                  <ToggleLeft size={32} color="#64748B" />
                )}
              </button>
            </div>
          </div>

          {/* Priority Countries */}
          <div
            style={{
              background: '#161B27',
              border: '1px solid #2A3347',
              borderRadius: 12,
              padding: 24,
            }}
          >
            <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: '#F1F5F9' }}>
              Приоритет стран
            </h3>
            <p style={{ margin: '0 0 14px', fontSize: 12, color: '#64748B' }}>
              AI будет предлагать эти направления в первую очередь
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {priorityCountries.map(c => (
                <button
                  key={c}
                  onClick={() => toggleCountry(c)}
                  style={{
                    background: selectedCountries.includes(c) ? 'rgba(59,130,246,0.15)' : '#1E2433',
                    border: `1px solid ${selectedCountries.includes(c) ? '#3B82F6' : '#2A3347'}`,
                    borderRadius: 6,
                    padding: '6px 14px',
                    color: selectedCountries.includes(c) ? '#3B82F6' : '#94A3B8',
                    fontSize: 13,
                    fontWeight: selectedCountries.includes(c) ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Parameters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              background: '#161B27',
              border: '1px solid #2A3347',
              borderRadius: 12,
              padding: 24,
            }}
          >
            <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 600, color: '#F1F5F9' }}>
              Параметры
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 8 }}>
                  Минимальный бюджет ($)
                </label>
                <input
                  type="number"
                  value={minBudget}
                  onChange={e => setMinBudget(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#1E2433',
                    border: '1px solid #2A3347',
                    borderRadius: 8,
                    padding: '10px 12px',
                    color: '#F1F5F9',
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <p style={{ margin: '6px 0 0', fontSize: 11, color: '#64748B' }}>
                  Лиды ниже этого бюджета не получают приоритет
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 8 }}>
                  Задержка ответа (сек)
                </label>
                <input
                  type="number"
                  value={responseDelay}
                  onChange={e => setResponseDelay(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#1E2433',
                    border: '1px solid #2A3347',
                    borderRadius: 8,
                    padding: '10px 12px',
                    color: '#F1F5F9',
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <p style={{ margin: '6px 0 0', fontSize: 11, color: '#64748B' }}>
                  Имитация человеческой паузы перед ответом
                </p>
              </div>
            </div>
          </div>

          {/* Current config summary */}
          <div
            style={{
              background: '#161B27',
              border: '1px solid #2A3347',
              borderRadius: 12,
              padding: 24,
            }}
          >
            <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: '#F1F5F9' }}>
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
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
                >
                  <span style={{ fontSize: 12, color: '#64748B' }}>{item.label}</span>
                  <span style={{ fontSize: 12, color: '#F1F5F9', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            style={{
              background: saved ? '#10B981' : '#3B82F6',
              border: 'none',
              borderRadius: 10,
              padding: '13px',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'background 0.2s',
            }}
          >
            <Save size={16} />
            {saved ? 'Сохранено!' : 'Сохранить настройки'}
          </button>
        </div>
      </div>
    </div>
  );
}

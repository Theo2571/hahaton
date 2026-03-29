import { useState } from 'react';
import { tours as initialTours, type Tour } from '../data/mock';
import { Plus, Pencil, Trash2, Star, X, Check } from 'lucide-react';

const countries = ['Все', 'ОАЭ', 'Таиланд', 'Турция', 'Мальдивы', 'Италия', 'Греция', 'Испания'];

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
  padding: '9px 12px',
  color: '#fafafa',
  fontSize: 13,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Star size={11} fill="#F59E0B" color="#F59E0B" />
      <span style={{ fontSize: 11, color: '#F59E0B', fontWeight: 600 }}>{rating.toFixed(1)}</span>
    </div>
  );
}

function Modal({ tour, onSave, onClose }: { tour: Partial<Tour>; onSave: (t: Tour) => void; onClose: () => void }) {
  const [form, setForm] = useState<Partial<Tour>>(tour);

  function handleSave() {
    if (!form.country || !form.hotel || !form.price || !form.dates) return;
    onSave({
      id: form.id || String(Date.now()),
      country: form.country,
      hotel: form.hotel,
      price: Number(form.price),
      dates: form.dates,
      rating: Number(form.rating) || 4.5,
    });
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'rgba(24,24,27,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.08)',
          padding: 28,
          width: 440,
          boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.15)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#fafafa', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.01em' }}>
            {form.id ? 'Редактировать тур' : 'Добавить тур'}
          </h3>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 6, display: 'flex' }}>
            <X size={15} color="#71717a" />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { key: 'country', label: 'Страна', placeholder: 'Например: ОАЭ' },
            { key: 'hotel', label: 'Отель', placeholder: 'Название отеля' },
            { key: 'dates', label: 'Даты', placeholder: '15–22 июл' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ display: 'block', fontSize: 11, color: '#71717a', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {f.label}
              </label>
              <input
                value={(form as Record<string, unknown>)[f.key] as string || ''}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                style={INPUT_STYLE}
              />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#71717a', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Цена ($)
              </label>
              <input type="number" value={form.price || ''} onChange={e => setForm(prev => ({ ...prev, price: Number(e.target.value) }))} placeholder="2800" style={INPUT_STYLE} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#71717a', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Рейтинг
              </label>
              <input type="number" min="1" max="5" step="0.1" value={form.rating || ''} onChange={e => setForm(prev => ({ ...prev, rating: Number(e.target.value) }))} placeholder="4.5" style={INPUT_STYLE} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 10, padding: '10px', color: '#71717a', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            }}
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            style={{
              flex: 1, background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
              border: 'none', borderRadius: 10, padding: '10px', color: '#fff', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              boxShadow: '0 0 20px rgba(124,58,237,0.4)', fontFamily: 'Manrope, sans-serif',
            }}
          >
            <Check size={13} />
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Tours() {
  const [allTours, setAllTours] = useState<Tour[]>(initialTours);
  const [countryFilter, setCountryFilter] = useState('Все');
  const [maxPrice, setMaxPrice] = useState('');
  const [modal, setModal] = useState<{ open: boolean; tour: Partial<Tour> }>({ open: false, tour: {} });

  const filtered = allTours.filter(t => {
    if (countryFilter !== 'Все' && t.country !== countryFilter) return false;
    if (maxPrice && t.price > Number(maxPrice)) return false;
    return true;
  });

  function handleSave(tour: Tour) {
    setAllTours(prev => {
      const exists = prev.find(t => t.id === tour.id);
      if (exists) return prev.map(t => (t.id === tour.id ? tour : t));
      return [...prev, tour];
    });
    setModal({ open: false, tour: {} });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>
            База данных
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#fafafa', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>
            База туров
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#71717a' }}>{filtered.length} туров</p>
        </div>
        <button
          onClick={() => setModal({ open: true, tour: {} })}
          style={{
            background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
            border: 'none', borderRadius: 10, padding: '10px 18px',
            color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: '0 0 20px rgba(124,58,237,0.35)',
            fontFamily: 'Manrope, sans-serif',
          }}
        >
          <Plus size={14} />
          Добавить тур
        </button>
      </div>

      {/* Filters */}
      <div style={{ ...CARD, padding: '14px 20px', marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {countries.map(c => (
            <button
              key={c}
              onClick={() => setCountryFilter(c)}
              style={{
                background: countryFilter === c ? 'rgba(124,58,237,0.25)' : 'rgba(39,39,42,0.6)',
                border: `1px solid ${countryFilter === c ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 8,
                padding: '5px 12px',
                color: countryFilter === c ? '#a78bfa' : '#71717a',
                fontSize: 12,
                cursor: 'pointer',
                fontWeight: countryFilter === c ? 700 : 400,
                transition: 'all 0.15s',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#52525b' }}>Макс. цена $</span>
          <input
            type="number"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            placeholder="10000"
            style={{
              background: 'rgba(39,39,42,0.6)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 8,
              padding: '5px 10px',
              color: '#fafafa',
              fontSize: 12,
              outline: 'none',
              width: 100,
              fontFamily: 'Inter, sans-serif',
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ ...CARD, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(39,39,42,0.4)' }}>
              {['Страна', 'Отель', 'Цена', 'Даты', 'Рейтинг', 'Действия'].map(h => (
                <th
                  key={h}
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#52525b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((tour, idx) => (
              <tr
                key={tour.id}
                style={{
                  borderBottom: idx < filtered.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(124,58,237,0.05)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 12, color: '#a1a1aa' }}>{tour.country}</span>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>{tour.hotel}</span>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#a78bfa', fontFamily: 'Manrope, sans-serif' }}>
                    ${tour.price.toLocaleString()}
                  </span>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 12, color: '#71717a' }}>{tour.dates}</span>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <StarRating rating={tour.rating} />
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => setModal({ open: true, tour })}
                      style={{
                        background: 'rgba(124,58,237,0.12)',
                        border: '1px solid rgba(124,58,237,0.25)',
                        borderRadius: 7,
                        padding: '5px 8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'all 0.15s',
                      }}
                    >
                      <Pencil size={12} color="#a78bfa" />
                    </button>
                    <button
                      onClick={() => setAllTours(prev => prev.filter(t => t.id !== tour.id))}
                      style={{
                        background: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        borderRadius: 7,
                        padding: '5px 8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Trash2 size={12} color="#EF4444" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: 48, textAlign: 'center', color: '#52525b', fontSize: 14, fontFamily: 'Manrope, sans-serif' }}>
            Туры не найдены
          </div>
        )}
      </div>

      {modal.open && (
        <Modal tour={modal.tour} onSave={handleSave} onClose={() => setModal({ open: false, tour: {} })} />
      )}
    </div>
  );
}

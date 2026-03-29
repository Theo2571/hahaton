import { useState } from 'react';
import { tours as initialTours, type Tour } from '../data/mock';
import { Plus, Pencil, Trash2, Star, X, Check } from 'lucide-react';

const countries = ['Все', 'ОАЭ', 'Таиланд', 'Турция', 'Мальдивы', 'Италия', 'Греция', 'Испания'];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Star size={12} fill="#F59E0B" color="#F59E0B" />
      <span style={{ fontSize: 12, color: '#F59E0B', fontWeight: 500 }}>{rating.toFixed(1)}</span>
    </div>
  );
}

function Modal({
  tour,
  onSave,
  onClose,
}: {
  tour: Partial<Tour>;
  onSave: (t: Tour) => void;
  onClose: () => void;
}) {
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
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#1E2433',
          borderRadius: 12,
          border: '1px solid #2A3347',
          padding: 28,
          width: 440,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#F1F5F9' }}>
            {form.id ? 'Редактировать тур' : 'Добавить тур'}
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
            <X size={18} color="#94A3B8" />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { key: 'country', label: 'Страна', placeholder: 'Например: ОАЭ' },
            { key: 'hotel', label: 'Отель', placeholder: 'Название отеля' },
            { key: 'dates', label: 'Даты', placeholder: '15–22 июл' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>
                {f.label}
              </label>
              <input
                value={(form as Record<string, unknown>)[f.key] as string || ''}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                style={{
                  width: '100%',
                  background: '#161B27',
                  border: '1px solid #2A3347',
                  borderRadius: 8,
                  padding: '9px 12px',
                  color: '#F1F5F9',
                  fontSize: 13,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>
                Цена ($)
              </label>
              <input
                type="number"
                value={form.price || ''}
                onChange={e => setForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                placeholder="2800"
                style={{
                  width: '100%',
                  background: '#161B27',
                  border: '1px solid #2A3347',
                  borderRadius: 8,
                  padding: '9px 12px',
                  color: '#F1F5F9',
                  fontSize: 13,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>
                Рейтинг
              </label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={form.rating || ''}
                onChange={e => setForm(prev => ({ ...prev, rating: Number(e.target.value) }))}
                placeholder="4.5"
                style={{
                  width: '100%',
                  background: '#161B27',
                  border: '1px solid #2A3347',
                  borderRadius: 8,
                  padding: '9px 12px',
                  color: '#F1F5F9',
                  fontSize: 13,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: '#2A3347',
              border: 'none',
              borderRadius: 8,
              padding: '10px',
              color: '#94A3B8',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            style={{
              flex: 1,
              background: '#3B82F6',
              border: 'none',
              borderRadius: 8,
              padding: '10px',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <Check size={14} />
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

  function handleDelete(id: string) {
    setAllTours(prev => prev.filter(t => t.id !== id));
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#F1F5F9' }}>База туров</h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: '#94A3B8' }}>{filtered.length} туров</p>
        </div>
        <button
          onClick={() => setModal({ open: true, tour: {} })}
          style={{
            background: '#3B82F6',
            border: 'none',
            borderRadius: 8,
            padding: '10px 18px',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Plus size={15} />
          Добавить тур
        </button>
      </div>

      {/* Filters */}
      <div
        style={{
          background: '#161B27',
          border: '1px solid #2A3347',
          borderRadius: 10,
          padding: '14px 20px',
          marginBottom: 16,
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {countries.map(c => (
            <button
              key={c}
              onClick={() => setCountryFilter(c)}
              style={{
                background: countryFilter === c ? '#3B82F6' : '#1E2433',
                border: countryFilter === c ? 'none' : '1px solid #2A3347',
                borderRadius: 6,
                padding: '5px 12px',
                color: countryFilter === c ? '#fff' : '#94A3B8',
                fontSize: 12,
                cursor: 'pointer',
                fontWeight: countryFilter === c ? 600 : 400,
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#64748B' }}>Макс. цена $</span>
          <input
            type="number"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            placeholder="10000"
            style={{
              background: '#1E2433',
              border: '1px solid #2A3347',
              borderRadius: 6,
              padding: '5px 10px',
              color: '#F1F5F9',
              fontSize: 12,
              outline: 'none',
              width: 100,
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: '#161B27',
          border: '1px solid #2A3347',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1E2433' }}>
              {['Страна', 'Отель', 'Цена', 'Даты', 'Рейтинг', 'Действия'].map(h => (
                <th
                  key={h}
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    borderBottom: '1px solid #2A3347',
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
                  borderBottom: idx < filtered.length - 1 ? '1px solid #1A2030' : 'none',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1A2030')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 13, color: '#94A3B8' }}>{tour.country}</span>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#F1F5F9' }}>{tour.hotel}</span>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#3B82F6' }}>
                    ${tour.price.toLocaleString()}
                  </span>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 12, color: '#94A3B8' }}>{tour.dates}</span>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <StarRating rating={tour.rating} />
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={() => setModal({ open: true, tour })}
                      style={{
                        background: 'rgba(59,130,246,0.1)',
                        border: '1px solid rgba(59,130,246,0.3)',
                        borderRadius: 6,
                        padding: '5px 8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Pencil size={12} color="#3B82F6" />
                    </button>
                    <button
                      onClick={() => handleDelete(tour.id)}
                      style={{
                        background: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.3)',
                        borderRadius: 6,
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
          <div style={{ padding: 40, textAlign: 'center', color: '#64748B', fontSize: 14 }}>
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

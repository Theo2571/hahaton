import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { salesByDayData, leadsChartData, dropOffData } from '../data/mock';
import { TrendingUp, DollarSign, Clock, Bot, AlertTriangle } from 'lucide-react';

const metrics = [
  { icon: TrendingUp, label: 'Конверсия', value: '14.6%', change: '+2.1%', up: true, color: '#10B981', glow: 'rgba(16,185,129,0.25)' },
  { icon: DollarSign, label: 'Средний чек', value: '$3 200', change: '+$400', up: true, color: '#7C3AED', glow: 'rgba(124,58,237,0.25)' },
  { icon: Clock, label: 'Время ответа', value: '8 мин', change: '-2 мин', up: true, color: '#F59E0B', glow: 'rgba(245,158,11,0.25)' },
  { icon: Bot, label: 'Доход от AI', value: '$24 800', change: '+18%', up: true, color: '#a78bfa', glow: 'rgba(167,139,250,0.25)' },
];

const CARD: React.CSSProperties = {
  background: 'rgba(24,24,27,0.5)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 16,
};

const TOOLTIP_STYLE = {
  contentStyle: {
    background: 'rgba(24,24,27,0.95)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10,
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  },
  labelStyle: { color: '#a1a1aa', fontSize: 11 },
  itemStyle: { color: '#fafafa', fontSize: 12 },
};

export default function Analytics() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>
          Нейро-аналитика
        </div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#fafafa', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>
          Аналитика
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#71717a' }}>Март 2026</p>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
        {metrics.map(({ icon: Icon, label, value, change, up, color, glow }) => (
          <div key={label} style={{ ...CARD, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: `${color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 16px ${glow}`,
                }}
              >
                <Icon size={17} color={color} />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: up ? '#10B981' : '#EF4444',
                  background: up ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                  padding: '3px 8px',
                  borderRadius: 20,
                  alignSelf: 'flex-start',
                }}
              >
                {change}
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#71717a', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500 }}>{label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#fafafa', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div style={{ ...CARD, padding: 24 }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 14, fontWeight: 700, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>
            Выручка по дням
          </h3>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={salesByDayData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: '#52525b', fontSize: 10 }} tickLine={false} axisLine={false} interval={2} />
              <YAxis tick={{ fill: '#52525b', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip {...TOOLTIP_STYLE} formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Выручка']} />
              <Bar dataKey="revenue" fill="#7C3AED" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ ...CARD, padding: 24 }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 14, fontWeight: 700, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>
            Лиды → Сделки (30 дней)
          </h3>
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={leadsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: '#52525b', fontSize: 10 }} tickLine={false} axisLine={false} interval={6} />
              <YAxis tick={{ fill: '#52525b', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
              <Line type="monotone" dataKey="leads" name="Лиды" stroke="#7C3AED" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="sales" name="Сделки" stroke="#10B981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Drop off */}
      <div style={{ ...CARD, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <AlertTriangle size={15} color="#EF4444" />
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>
            Где теряются клиенты
          </h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {dropOffData.map((d, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(39,39,42,0.4)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 12,
                padding: 16,
                borderTop: '2px solid rgba(239,68,68,0.5)',
              }}
            >
              <div style={{ fontSize: 11, color: '#a1a1aa', marginBottom: 10, lineHeight: 1.45 }}>{d.stage}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#EF4444', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>
                {d.percent}%
              </div>
              <div style={{ fontSize: 10, color: '#52525b', marginTop: 3 }}>потеря ({d.lost} лидов)</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { leadsChartData, dropOffData } from '../data/mock';
import { Users, TrendingUp, DollarSign, MessageSquare, Lightbulb, AlertTriangle } from 'lucide-react';

const kpis = [
  { icon: Users, label: 'Лидов сегодня', value: '12', sub: '+3 за час', color: '#7C3AED', glow: 'rgba(124,58,237,0.3)' },
  { icon: TrendingUp, label: 'Конверсия', value: '14.6%', sub: '+2.1% к прошлой неделе', color: '#10B981', glow: 'rgba(16,185,129,0.3)' },
  { icon: DollarSign, label: 'Выручка (AI)', value: '$24 800', sub: 'За текущий месяц', color: '#F59E0B', glow: 'rgba(245,158,11,0.3)' },
  { icon: MessageSquare, label: 'Активные диалоги', value: '7', sub: '3 горячих', color: '#a78bfa', glow: 'rgba(167,139,250,0.3)' },
];

const recommendations = [
  { icon: '💡', text: 'Добавьте бюджетные туры в Таиланд — 5 лидов ищут до $1500' },
  { icon: '⚡', text: 'Анна Соколова готова к покупке — свяжитесь в ближайший час' },
  { icon: '📊', text: 'Увеличьте скорость ответа: среднее время 8 мин, лучший показатель 2 мин' },
];

const CARD: React.CSSProperties = {
  background: 'rgba(24,24,27,0.5)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 16,
};

export default function Dashboard() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>
          Нейро-статистика
        </div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#fafafa', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>
          Intelligence Hub
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#71717a' }}>
          Воскресенье, 29 марта 2026
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
        {kpis.map(({ icon: Icon, label, value, sub, color, glow }) => (
          <div key={label} style={{ ...CARD, padding: '22px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: `${color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 16px ${glow}`,
                }}
              >
                <Icon size={18} color={color} />
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#fafafa', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em', marginBottom: 4 }}>
              {value}
            </div>
            <div style={{ fontSize: 11, color: '#71717a', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
              {label}
            </div>
            <div style={{ fontSize: 11, color: '#52525b' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={{ ...CARD, padding: 24, marginBottom: 20 }}>
        <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>
          Лиды → Продажи (30 дней)
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={leadsChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="day"
              tick={{ fill: '#52525b', fontSize: 10, fontFamily: 'Inter' }}
              tickLine={false}
              axisLine={false}
              interval={4}
            />
            <YAxis
              tick={{ fill: '#52525b', fontSize: 10, fontFamily: 'Inter' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(24,24,27,0.95)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
              labelStyle={{ color: '#a1a1aa', fontSize: 11 }}
              itemStyle={{ color: '#fafafa', fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a', paddingTop: 12 }} />
            <Line type="monotone" dataKey="leads" name="Лиды" stroke="#7C3AED" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="sales" name="Продажи" stroke="#10B981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Problems */}
        <div style={{ ...CARD, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <AlertTriangle size={15} color="#EF4444" />
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>
              Где теряются клиенты
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {dropOffData.map((d, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: '#a1a1aa' }}>{d.stage}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#EF4444' }}>{d.percent}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 4, height: 4 }}>
                  <div
                    style={{
                      width: `${d.percent}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, rgba(239,68,68,0.5), #EF4444)`,
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div style={{ ...CARD, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <Lightbulb size={15} color="#F59E0B" />
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>
              Рекомендации AI
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recommendations.map((r, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(124,58,237,0.08)',
                  border: '1px solid rgba(124,58,237,0.15)',
                  borderRadius: 10,
                  padding: '12px 14px',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: 15, flexShrink: 0 }}>{r.icon}</span>
                <span style={{ fontSize: 12, color: '#d4d4d8', lineHeight: 1.55 }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

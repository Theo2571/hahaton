import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { leadsChartData, dropOffData } from '../data/mock';
import { Users, TrendingUp, DollarSign, MessageSquare, Lightbulb, AlertTriangle } from 'lucide-react';

const kpis = [
  { icon: Users, label: 'Лидов сегодня', value: '12', sub: '+3 за час', color: '#3B82F6' },
  { icon: TrendingUp, label: 'Конверсия', value: '14.6%', sub: '+2.1% к прошлой неделе', color: '#10B981' },
  { icon: DollarSign, label: 'Выручка (AI)', value: '$24 800', sub: 'За текущий месяц', color: '#F59E0B' },
  { icon: MessageSquare, label: 'Активные диалоги', value: '7', sub: '3 горячих', color: '#8B5CF6' },
];

const recommendations = [
  { icon: '💡', text: 'Добавьте бюджетные туры в Таиланд — 5 лидов ищут до $1500' },
  { icon: '⚡', text: 'Анна Соколова готова к покупке — свяжитесь в ближайший час' },
  { icon: '📊', text: 'Увеличьте скорость ответа: среднее время 8 мин, лучший показатель 2 мин' },
];

export default function Dashboard() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#F1F5F9' }}>Dashboard</h1>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: '#94A3B8' }}>
          Воскресенье, 29 марта 2026
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {kpis.map(({ icon: Icon, label, value, sub, color }) => (
          <div
            key={label}
            style={{
              background: '#161B27',
              border: '1px solid #2A3347',
              borderRadius: 12,
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#F1F5F9' }}>{value}</div>
              </div>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: `${color}22`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={18} color={color} />
              </div>
            </div>
            <div style={{ fontSize: 12, color: '#64748B' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div
        style={{
          background: '#161B27',
          border: '1px solid #2A3347',
          borderRadius: 12,
          padding: 24,
          marginBottom: 24,
        }}
      >
        <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 600, color: '#F1F5F9' }}>
          Лиды → Продажи (30 дней)
        </h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={leadsChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A3347" />
            <XAxis
              dataKey="day"
              tick={{ fill: '#64748B', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#2A3347' }}
              interval={4}
            />
            <YAxis
              tick={{ fill: '#64748B', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{ background: '#1E2433', border: '1px solid #2A3347', borderRadius: 8 }}
              labelStyle={{ color: '#94A3B8', fontSize: 12 }}
              itemStyle={{ color: '#F1F5F9', fontSize: 12 }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12, color: '#94A3B8', paddingTop: 10 }}
            />
            <Line
              type="monotone"
              dataKey="leads"
              name="Лиды"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="sales"
              name="Продажи"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Problems */}
        <div
          style={{
            background: '#161B27',
            border: '1px solid #2A3347',
            borderRadius: 12,
            padding: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <AlertTriangle size={16} color="#EF4444" />
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#F1F5F9' }}>
              Где теряются клиенты
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {dropOffData.map((d, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: '#94A3B8' }}>{d.stage}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#EF4444' }}>{d.percent}%</span>
                </div>
                <div style={{ background: '#2A3347', borderRadius: 3, height: 5 }}>
                  <div
                    style={{
                      width: `${d.percent}%`,
                      height: '100%',
                      background: `rgba(239,68,68,${0.4 + d.percent / 100 * 0.6})`,
                      borderRadius: 3,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div
          style={{
            background: '#161B27',
            border: '1px solid #2A3347',
            borderRadius: 12,
            padding: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Lightbulb size={16} color="#F59E0B" />
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#F1F5F9' }}>
              Рекомендации AI
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recommendations.map((r, i) => (
              <div
                key={i}
                style={{
                  background: '#1E2433',
                  borderRadius: 8,
                  padding: '12px 14px',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>{r.icon}</span>
                <span style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.5 }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

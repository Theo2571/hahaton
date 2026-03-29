import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { salesByDayData, leadsChartData, dropOffData } from '../data/mock';
import { TrendingUp, DollarSign, Clock, Bot, AlertTriangle } from 'lucide-react';

const metrics = [
  { icon: TrendingUp, label: 'Конверсия', value: '14.6%', change: '+2.1%', up: true, color: '#10B981' },
  { icon: DollarSign, label: 'Средний чек', value: '$3 200', change: '+$400', up: true, color: '#3B82F6' },
  { icon: Clock, label: 'Время ответа', value: '8 мин', change: '-2 мин', up: true, color: '#F59E0B' },
  { icon: Bot, label: 'Доход от AI', value: '$24 800', change: '+18%', up: true, color: '#8B5CF6' },
];

export default function Analytics() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#F1F5F9' }}>Аналитика</h1>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: '#94A3B8' }}>Март 2026</p>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {metrics.map(({ icon: Icon, label, value, change, up, color }) => (
          <div
            key={label}
            style={{
              background: '#161B27',
              border: '1px solid #2A3347',
              borderRadius: 12,
              padding: 20,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
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
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: up ? '#10B981' : '#EF4444',
                  background: up ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                  padding: '3px 7px',
                  borderRadius: 4,
                }}
              >
                {change}
              </span>
            </div>
            <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#F1F5F9' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Revenue by day */}
        <div
          style={{
            background: '#161B27',
            border: '1px solid #2A3347',
            borderRadius: 12,
            padding: 24,
          }}
        >
          <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 600, color: '#F1F5F9' }}>
            Выручка по дням
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={salesByDayData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A3347" />
              <XAxis
                dataKey="day"
                tick={{ fill: '#64748B', fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: '#2A3347' }}
                interval={2}
              />
              <YAxis
                tick={{ fill: '#64748B', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{ background: '#1E2433', border: '1px solid #2A3347', borderRadius: 8 }}
                labelStyle={{ color: '#94A3B8', fontSize: 11 }}
                formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Выручка']}
              />
              <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leads to Deals */}
        <div
          style={{
            background: '#161B27',
            border: '1px solid #2A3347',
            borderRadius: 12,
            padding: 24,
          }}
        >
          <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 600, color: '#F1F5F9' }}>
            Лиды → Сделки (30 дней)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={leadsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A3347" />
              <XAxis
                dataKey="day"
                tick={{ fill: '#64748B', fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: '#2A3347' }}
                interval={6}
              />
              <YAxis
                tick={{ fill: '#64748B', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{ background: '#1E2433', border: '1px solid #2A3347', borderRadius: 8 }}
                labelStyle={{ color: '#94A3B8', fontSize: 11 }}
              />
              <Legend wrapperStyle={{ fontSize: 11, color: '#94A3B8' }} />
              <Line type="monotone" dataKey="leads" name="Лиды" stroke="#3B82F6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="sales" name="Сделки" stroke="#10B981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Drop off */}
      <div
        style={{
          background: '#161B27',
          border: '1px solid #2A3347',
          borderRadius: 12,
          padding: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <AlertTriangle size={16} color="#EF4444" />
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#F1F5F9' }}>
            Где теряются клиенты
          </h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {dropOffData.map((d, i) => (
            <div
              key={i}
              style={{
                background: '#1E2433',
                borderRadius: 10,
                padding: '16px',
                borderTop: '3px solid #EF4444',
              }}
            >
              <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 8, lineHeight: 1.4 }}>
                {d.stage}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#EF4444' }}>{d.percent}%</div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>потеря ({d.lost} лидов)</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

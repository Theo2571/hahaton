import { funnelStages, dropOffData } from '../data/mock';
import { ArrowDown, TrendingDown } from 'lucide-react';

export default function Funnel() {
  const maxCount = Math.max(...funnelStages.map(s => s.count));

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#F1F5F9' }}>Воронка продаж</h1>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: '#94A3B8' }}>Движение лидов по этапам</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }}>
        {/* Funnel visual */}
        <div
          style={{
            background: '#161B27',
            borderRadius: 12,
            border: '1px solid #2A3347',
            padding: 32,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {funnelStages.map((stage, idx) => {
              const widthPct = 40 + (stage.count / maxCount) * 60;
              const prevStage = funnelStages[idx - 1];
              return (
                <div key={stage.id} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {idx > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                      <ArrowDown size={16} color="#2A3347" />
                      <span style={{ fontSize: 12, color: '#EF4444' }}>
                        −{prevStage.count - stage.count} ({Math.round(((prevStage.count - stage.count) / prevStage.count) * 100)}% потеря)
                      </span>
                    </div>
                  )}
                  <div
                    style={{
                      width: `${widthPct}%`,
                      background: stage.color,
                      borderRadius: 8,
                      padding: '16px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.3s',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{stage.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
                        Конверсия: {stage.conversion}%
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 700,
                        color: '#fff',
                        minWidth: 50,
                        textAlign: 'right',
                      }}
                    >
                      {stage.count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Stage cards */}
          <div
            style={{
              background: '#161B27',
              borderRadius: 12,
              border: '1px solid #2A3347',
              padding: 20,
            }}
          >
            <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#94A3B8' }}>
              По этапам
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {funnelStages.map(stage => (
                <div key={stage.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: stage.color,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 12, color: '#94A3B8' }}>{stage.name}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#F1F5F9' }}>{stage.count}</span>
                    </div>
                    <div style={{ background: '#2A3347', borderRadius: 2, height: 4 }}>
                      <div
                        style={{
                          width: `${(stage.count / maxCount) * 100}%`,
                          height: '100%',
                          background: stage.color,
                          borderRadius: 2,
                          transition: 'width 0.5s',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drop off */}
          <div
            style={{
              background: '#161B27',
              borderRadius: 12,
              border: '1px solid #2A3347',
              padding: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <TrendingDown size={16} color="#EF4444" />
              <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#94A3B8' }}>
                Потери
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {dropOffData.map((d, i) => (
                <div
                  key={i}
                  style={{
                    background: '#1E2433',
                    borderRadius: 8,
                    padding: '10px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: 12, color: '#94A3B8' }}>{d.stage}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#EF4444' }}>−{d.lost}</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>{d.percent}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

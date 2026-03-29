import { funnelStages, dropOffData } from '../data/mock';
import { ArrowDown, TrendingDown } from 'lucide-react';

const CARD: React.CSSProperties = {
  background: 'rgba(24,24,27,0.5)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 16,
};

export default function Funnel() {
  const maxCount = Math.max(...funnelStages.map(s => s.count));

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>
          Pipeline
        </div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#fafafa', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>
          Воронка продаж
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#71717a' }}>Движение лидов по этапам</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
        {/* Funnel visual */}
        <div style={{ ...CARD, padding: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {funnelStages.map((stage, idx) => {
              const widthPct = 40 + (stage.count / maxCount) * 60;
              const prevStage = funnelStages[idx - 1];
              return (
                <div key={stage.id} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {idx > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 0' }}>
                      <ArrowDown size={14} color="#3f3f46" />
                      <span style={{ fontSize: 11, color: '#EF4444' }}>
                        −{prevStage.count - stage.count} ({Math.round(((prevStage.count - stage.count) / prevStage.count) * 100)}% потеря)
                      </span>
                    </div>
                  )}
                  <div
                    style={{
                      width: `${widthPct}%`,
                      background: stage.color,
                      borderRadius: 10,
                      padding: '14px 22px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.3s',
                      boxShadow: `0 4px 20px ${stage.color}30`,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'Manrope, sans-serif' }}>{stage.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>
                        Конверсия: {stage.conversion}%
                      </div>
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>
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
          <div style={{ ...CARD, padding: 20 }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 12, fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'Manrope, sans-serif' }}>
              По этапам
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {funnelStages.map(stage => (
                <div key={stage.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: stage.color,
                      flexShrink: 0,
                      boxShadow: `0 0 6px ${stage.color}80`,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: '#a1a1aa' }}>{stage.name}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#fafafa', fontFamily: 'Manrope, sans-serif' }}>{stage.count}</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 3, height: 4 }}>
                      <div
                        style={{
                          width: `${(stage.count / maxCount) * 100}%`,
                          height: '100%',
                          background: stage.color,
                          borderRadius: 3,
                          transition: 'width 0.5s',
                          boxShadow: `0 0 6px ${stage.color}60`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drop off */}
          <div style={{ ...CARD, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <TrendingDown size={14} color="#EF4444" />
              <h3 style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'Manrope, sans-serif' }}>
                Потери
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {dropOffData.map((d, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(39,39,42,0.4)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    borderRadius: 10,
                    padding: '10px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: 12, color: '#a1a1aa' }}>{d.stage}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#EF4444', fontFamily: 'Manrope, sans-serif' }}>−{d.lost}</div>
                    <div style={{ fontSize: 10, color: '#52525b' }}>{d.percent}%</div>
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

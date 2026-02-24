'use client';

interface KarmaGaugeProps {
  giveCount: number;
  receiveCount: number;
  verified?: boolean;
}

export default function KarmaGauge({ giveCount, receiveCount }: KarmaGaugeProps) {
  const total = giveCount + receiveCount || 1;
  const givePercent = Math.round((giveCount / total) * 100);

  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <span style={{ fontSize: 13, color: '#b0b0b0' }}>贈った</span>
          <span style={{ fontSize: 18, fontWeight: 700, marginLeft: 8, color: '#4ABFDD' }}>
            {giveCount}
          </span>
        </div>
        <div>
          <span style={{ fontSize: 13, color: '#b0b0b0' }}>受け取った</span>
          <span style={{ fontSize: 18, fontWeight: 700, marginLeft: 8, color: '#F5D946' }}>
            {receiveCount}
          </span>
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${givePercent}%`,
            background: 'linear-gradient(90deg, #4ABFDD, #7DD3E8)',
          }}
        />
      </div>
    </div>
  );
}

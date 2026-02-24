'use client';

import { useGratitudeStore } from '@/hooks/useGratitudeStore';

export default function GratitudeCounter() {
  const totalRipples = useGratitudeStore((s) => s.totalRipples);

  return (
    <div
      className="card"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 16px',
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#E8F6FA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
        }}
      >
        🌊
      </div>
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1 }}>
          {totalRipples.toLocaleString()}
        </div>
        <div style={{ fontSize: 10, color: '#b0b0b0', marginTop: 2 }}>感謝の連鎖</div>
      </div>
    </div>
  );
}

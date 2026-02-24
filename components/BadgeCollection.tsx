'use client';

import { Badge } from '@/types';

interface BadgeCollectionProps {
  badges: Badge[];
}

export default function BadgeCollection({ badges }: BadgeCollectionProps) {
  if (!badges || badges.length === 0) {
    return (
      <div style={{ fontSize: 13, color: '#b0b0b0', textAlign: 'center', padding: '20px 0' }}>
        まだバッジはありません
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="tag"
          style={{ padding: '6px 12px', fontSize: 12 }}
          title={badge.description}
        >
          {badge.emoji} {badge.name}
        </div>
      ))}
    </div>
  );
}

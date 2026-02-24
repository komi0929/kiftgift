'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface PremiumBannerProps {
  compact?: boolean;
}

export default function PremiumBanner({ compact = false }: PremiumBannerProps) {
  if (compact) {
    return (
      <Link href="/premium" style={{ textDecoration: 'none' }}>
        <div
          className="card"
          style={{
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFF9E0',
            borderColor: '#F0E8A0',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
            ⭐ もっと楽しくするオプション
          </span>
          <ArrowRight size={16} color="#D4B82A" />
        </div>
      </Link>
    );
  }

  return (
    <div
      className="card"
      style={{
        padding: 24,
        background: '#FFF9E0',
        borderColor: '#F0E8A0',
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Premium</div>
      <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, marginBottom: 16 }}>
        制限なしでギフトを楽しもう。サークル作成やマッチング優先など、Premium限定機能が使えます。
      </p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
        <span style={{ fontSize: 28, fontWeight: 700 }}>¥490</span>
        <span style={{ fontSize: 13, color: '#b0b0b0' }}>/月</span>
      </div>
      <Link
        href="/premium"
        className="btn btn-secondary"
        style={{ width: '100%', textDecoration: 'none' }}
      >
        詳しく見る
      </Link>
    </div>
  );
}

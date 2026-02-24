'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Settings } from 'lucide-react';
import KarmaGauge from '@/components/KarmaGauge';
import BadgeCollection from '@/components/BadgeCollection';
import PremiumBanner from '@/components/PremiumBanner';
import { CURRENT_USER, MOCK_GIVES, MOCK_WANTS } from '@/lib/mock-data';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'たった今';
  if (hours < 24) return `${hours}時間前`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}日前`;
  return `${Math.floor(days / 7)}週間前`;
}

export default function ProfilePage() {
  const user = CURRENT_USER;
  const completedCount = MOCK_GIVES.filter((g) => g.status === 'COMPLETED').length;

  // Generate activity from actual mock data
  const activity = useMemo(() => {
    const giveActivity = MOCK_GIVES.filter(
      (g) => g.user_id === user.id || g.status === 'COMPLETED',
    ).map((g) => ({
      id: `give-${g.id}`,
      text: `「${g.title}」を贈りました`,
      time: timeAgo(g.created_at),
      sortDate: new Date(g.created_at).getTime(),
    }));

    const wantActivity = MOCK_WANTS.filter(
      (w) => w.user_id === user.id && w.status === 'MATCHED',
    ).map((w) => ({
      id: `want-${w.id}`,
      text: `「${w.title}」を受け取りました`,
      time: timeAgo(w.created_at),
      sortDate: new Date(w.created_at).getTime(),
    }));

    return [...giveActivity, ...wantActivity].sort((a, b) => b.sortDate - a.sortDate).slice(0, 5);
  }, [user.id]);

  return (
    <div className="page-container">
      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ padding: 24, textAlign: 'center', marginBottom: 20 }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: -8 }}>
          <Link href="/guidelines" style={{ color: '#b0b0b0', padding: 4 }} aria-label="設定">
            <Settings size={18} />
          </Link>
        </div>
        <div
          className="avatar"
          style={{ width: 64, height: 64, fontSize: 24, margin: '0 auto 12px' }}
        >
          {user.display_name.charAt(0)}
        </div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>
          {user.display_name}
          {user.verified && <span style={{ marginLeft: 4, color: '#4ABFDD' }}>✓</span>}
        </div>
        <div style={{ fontSize: 12, color: '#b0b0b0', marginTop: 4 }}>
          {new Date(user.created_at).toLocaleDateString('ja-JP')} から参加
        </div>

        {/* Stats row */}
        <div
          style={{ display: 'flex', marginTop: 20, borderTop: '1px solid #f0f0f0', paddingTop: 16 }}
        >
          <div className="stat-block" style={{ flex: 1 }}>
            <div className="stat-value" style={{ color: '#4ABFDD' }}>
              {user.give_count}
            </div>
            <div className="stat-label">贈った</div>
          </div>
          <div className="stat-block" style={{ flex: 1, borderLeft: '1px solid #f0f0f0' }}>
            <div className="stat-value" style={{ color: '#F5D946' }}>
              {user.receive_count}
            </div>
            <div className="stat-label">受け取った</div>
          </div>
          <div className="stat-block" style={{ flex: 1, borderLeft: '1px solid #f0f0f0' }}>
            <div className="stat-value">{completedCount}</div>
            <div className="stat-label">完了</div>
          </div>
        </div>
      </motion.div>

      {/* Activity gauge */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>ギフト活動</h2>
        <KarmaGauge giveCount={user.give_count} receiveCount={user.receive_count} />
      </div>

      {/* Badges */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>バッジ</h2>
        <BadgeCollection badges={user.badges} />
      </div>

      {/* Recent activity */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>最近のアクティビティ</h2>
        <div className="card" style={{ overflow: 'hidden' }}>
          {activity.length > 0 ? (
            activity.map((item, i) => (
              <div
                key={item.id}
                style={{
                  padding: '14px 16px',
                  borderBottom: i < activity.length - 1 ? '1px solid #f0f0f0' : undefined,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 13 }}>{item.text}</span>
                <span style={{ fontSize: 11, color: '#b0b0b0', flexShrink: 0, marginLeft: 12 }}>
                  {item.time}
                </span>
              </div>
            ))
          ) : (
            <div style={{ padding: 20, textAlign: 'center', color: '#b0b0b0', fontSize: 13 }}>
              まだアクティビティがありません
            </div>
          )}
        </div>
      </div>

      {/* Premium */}
      <PremiumBanner />
    </div>
  );
}

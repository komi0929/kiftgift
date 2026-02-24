'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Flag } from 'lucide-react';
import { Gift } from '@/types';
import { getBurdenInfo } from '@/lib/ai/gift-guardian';
import ReportModal from './ReportModal';

interface GiveCardProps {
  gift: Gift;
  index?: number;
  onAction?: (gift: Gift) => void;
}

const TYPE_LABELS: Record<string, string> = {
  SKILL: 'スキル',
  TIME: '時間',
  KNOWLEDGE: '知識',
  PHYSICAL: 'モノ',
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'たった今';
  if (hours < 24) return `${hours}時間前`;
  const days = Math.floor(hours / 24);
  return `${days}日前`;
}

export default function GiveCard({ gift, index = 0, onAction }: GiveCardProps) {
  const [showReport, setShowReport] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const burdenInfo = gift.burden_score ? getBurdenInfo(gift.burden_score) : null;

  const handleAccept = () => {
    setAccepted(true);
    onAction?.(gift);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.25 }}
        className="card"
        style={{ padding: 20, marginBottom: 12 }}
      >
        {/* Top row: avatar + name + time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div className="avatar" style={{ width: 36, height: 36, fontSize: 14 }}>
            {gift.user?.display_name?.charAt(0) || '?'}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>
              {gift.user?.display_name || '匿名ユーザー'}
              {gift.user?.verified && (
                <span style={{ marginLeft: 4, fontSize: 12, color: '#4ABFDD' }}>✓</span>
              )}
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#b0b0b0',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Clock size={10} />
              {timeAgo(gift.created_at)}
            </div>
          </div>
          <span className="tag tag-yellow">{TYPE_LABELS[gift.gift_type] || gift.gift_type}</span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, lineHeight: 1.5 }}>
          {gift.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, marginBottom: 14 }}>
          {gift.description}
        </p>

        {/* Burden + Status row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 14,
            flexWrap: 'wrap',
          }}
        >
          {burdenInfo && (
            <span
              className="tag"
              style={{
                background:
                  gift.burden_score && gift.burden_score >= 4
                    ? '#ffebe8'
                    : gift.burden_score === 3
                      ? '#FFF9E0'
                      : '#e8f9ed',
                color:
                  gift.burden_score && gift.burden_score >= 4
                    ? '#d32f2f'
                    : gift.burden_score === 3
                      ? '#D4B82A'
                      : '#1a8c3e',
              }}
            >
              {burdenInfo.icon} {burdenInfo.label}
            </span>
          )}
          <span
            style={{
              fontSize: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background:
                  gift.status === 'OPEN'
                    ? '#34c759'
                    : gift.status === 'MATCHED'
                      ? '#F5D946'
                      : '#b0b0b0',
              }}
            />
            <span style={{ color: '#b0b0b0' }}>
              {gift.status === 'OPEN' ? '募集中' : gift.status === 'MATCHED' ? 'マッチ済' : '完了'}
            </span>
          </span>
          {gift.physical_handoff_available && (
            <span className="tag" style={{ fontSize: 10 }}>
              <MapPin size={10} style={{ marginRight: 2 }} />
              対面
            </span>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            className="btn btn-secondary btn-small"
            onClick={handleAccept}
            disabled={accepted || gift.status !== 'OPEN'}
            style={{
              opacity: accepted || gift.status !== 'OPEN' ? 0.5 : 1,
              cursor: accepted || gift.status !== 'OPEN' ? 'not-allowed' : 'pointer',
            }}
          >
            {accepted ? '✓ リクエスト済' : '受け取りたい'}
          </button>
          <button
            onClick={() => setShowReport(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              color: '#b0b0b0',
            }}
            aria-label="通報"
          >
            <Flag size={14} />
          </button>
        </div>
      </motion.div>

      {/* Report Modal */}
      {showReport && (
        <ReportModal
          targetType="gift"
          targetId={gift.id}
          onClose={() => setShowReport(false)}
          onSubmit={() => setShowReport(false)}
        />
      )}
    </>
  );
}

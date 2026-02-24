'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Flag } from 'lucide-react';
import { Gift } from '@/types';
import ReportModal from './ReportModal';

interface WantCardProps {
  gift: Gift;
  index: number;
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

export default function WantCard({ gift, index, onAction }: WantCardProps) {
  const [showReport, setShowReport] = useState(false);
  const [matched, setMatched] = useState(false);

  const handleAction = () => {
    setMatched(true);
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
              {gift.user?.display_name}
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
          <span className="tag tag-cyan">{TYPE_LABELS[gift.gift_type] || gift.gift_type}</span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, lineHeight: 1.5 }}>
          {gift.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, marginBottom: 14 }}>
          {gift.description}
        </p>

        {/* Bottom row: match info + actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {gift.ai_match_score && gift.ai_match_score > 0.7 && (
              <span className="tag tag-yellow" style={{ fontSize: 10 }}>
                マッチ {Math.round(gift.ai_match_score * 100)}%
              </span>
            )}
            {gift.physical_handoff_available && (
              <span className="tag" style={{ fontSize: 10 }}>
                <MapPin size={10} style={{ marginRight: 2 }} />
                対面
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              className="btn btn-primary btn-small"
              onClick={handleAction}
              disabled={matched}
              style={{
                opacity: matched ? 0.5 : 1,
                cursor: matched ? 'not-allowed' : 'pointer',
              }}
            >
              {matched ? '✓ マッチ済' : '贈りたい'}
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

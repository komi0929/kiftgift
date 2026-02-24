'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flag } from 'lucide-react';
import type { ReportReason } from '@/types';

interface ReportModalProps {
  targetType: 'user' | 'gift';
  targetId: string;
  onClose: () => void;
  onSubmit: (reason: ReportReason, comment: string) => void;
}

const REASONS: { value: ReportReason; label: string; emoji: string }[] = [
  { value: 'SPAM', label: 'スパム・迷惑行為', emoji: '🚫' },
  { value: 'HARASSMENT', label: 'ハラスメント', emoji: '⚠️' },
  { value: 'INAPPROPRIATE', label: '不適切なコンテンツ', emoji: '🔞' },
  { value: 'FRAUD', label: '詐欺・なりすまし', emoji: '🎭' },
  { value: 'DANGEROUS', label: '危険な活動', emoji: '⛔' },
  { value: 'OTHER', label: 'その他', emoji: '📝' },
];

export default function ReportModal({ targetType, onClose, onSubmit }: ReportModalProps) {
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!reason) return;
    onSubmit(reason, comment);
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="modal-content"
          style={{ padding: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>送信しました</div>
              <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
                確認次第対応いたします
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Flag size={18} color="#FF3B30" />
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>
                    {targetType === 'user' ? 'ユーザーを通報' : '投稿を通報'}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                >
                  <X size={20} color="#b0b0b0" />
                </button>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#888',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  通報理由
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {REASONS.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setReason(r.value)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 10,
                        border: reason === r.value ? '1px solid #4ABFDD' : '1px solid #f0f0f0',
                        background: reason === r.value ? '#E8F6FA' : '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: 13,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        color: '#1a1a1a',
                        transition: 'all 0.15s',
                      }}
                    >
                      <span>{r.emoji}</span>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#888',
                    display: 'block',
                    marginBottom: 6,
                  }}
                >
                  詳細（任意）
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="状況を教えてください..."
                  className="input-field"
                  rows={3}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!reason}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: 12,
                  opacity: reason ? 1 : 0.4,
                  cursor: reason ? 'pointer' : 'not-allowed',
                }}
              >
                通報を送信
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

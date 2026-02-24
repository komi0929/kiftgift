'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GiftType } from '@/types';
import { checkBurden } from '@/lib/ai/gift-guardian';
import GuardianFeedback from '@/components/GuardianFeedback';
import type { GuardianResult } from '@/types';

const GIFT_TYPES: { value: GiftType; label: string }[] = [
  { value: 'SKILL', label: 'スキル' },
  { value: 'TIME', label: '時間' },
  { value: 'KNOWLEDGE', label: '知識' },
  { value: 'PHYSICAL', label: 'モノ' },
];

export default function PostPage() {
  const router = useRouter();
  const [postMode, setPostMode] = useState<'WANT' | 'GIVE'>('WANT');
  const [giftType, setGiftType] = useState<GiftType>('SKILL');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Compute Guardian check synchronously (no useEffect needed)
  const guardianResult: GuardianResult | null = useMemo(() => {
    if (!title.trim() && !description.trim()) return null;
    return checkBurden(giftType, title, description);
  }, [title, description, giftType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);

    // Simulate posting (Supabase integration pending)
    setTimeout(() => {
      setSubmitting(false);
      setShowToast(true);

      // Reset form — guardianResult recomputes automatically via useMemo
      setTitle('');
      setDescription('');

      // Navigate after toast
      setTimeout(() => {
        setShowToast(false);
        router.push(postMode === 'WANT' ? '/wants' : '/gives');
      }, 1500);
    }, 800);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>新しい投稿</h1>
        <p style={{ fontSize: 13, color: '#888' }}>あなたの力を共有しましょう</p>
      </div>

      {/* Mode toggle */}
      <div
        className="card"
        style={{
          display: 'flex',
          padding: 4,
          marginBottom: 24,
          gap: 4,
        }}
      >
        <button
          onClick={() => setPostMode('WANT')}
          style={{
            flex: 1,
            padding: '10px 0',
            borderRadius: 12,
            border: 'none',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            background: postMode === 'WANT' ? '#4ABFDD' : 'transparent',
            color: postMode === 'WANT' ? '#ffffff' : '#888',
            transition: 'all 0.15s',
          }}
        >
          リクエスト
        </button>
        <button
          onClick={() => setPostMode('GIVE')}
          style={{
            flex: 1,
            padding: '10px 0',
            borderRadius: 12,
            border: 'none',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            background: postMode === 'GIVE' ? '#F5D946' : 'transparent',
            color: postMode === 'GIVE' ? '#1a1a1a' : '#888',
            transition: 'all 0.15s',
          }}
        >
          ギフト
        </button>
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
      >
        {/* Gift type */}
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>
          カテゴリ
        </label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {GIFT_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setGiftType(t.value)}
              className={`chip ${giftType === t.value ? 'chip-active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Title */}
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>
          タイトル
        </label>
        <input
          type="text"
          className="input-field"
          placeholder={postMode === 'WANT' ? '何を求めていますか？' : '何を贈りますか？'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: 20 }}
        />

        {/* Description */}
        <label style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>
          詳細
        </label>
        <textarea
          className="input-field"
          placeholder="詳しく教えてください..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{ marginBottom: 16 }}
        />

        {/* Guardian Feedback */}
        <AnimatePresence>
          {guardianResult && <GuardianFeedback result={guardianResult} />}
        </AnimatePresence>

        {/* Submit */}
        <button
          type="submit"
          className={`btn ${postMode === 'WANT' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ width: '100%', opacity: !title.trim() || submitting ? 0.5 : 1 }}
          disabled={!title.trim() || submitting}
        >
          {submitting ? '投稿中...' : postMode === 'WANT' ? 'リクエストする' : 'ギフトする'}
        </button>
      </motion.form>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className={`toast ${postMode === 'WANT' ? 'toast-primary' : 'toast-secondary'}`}
          >
            ✅ 投稿しました！
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

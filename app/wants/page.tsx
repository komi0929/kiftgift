'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import WantCard from '@/components/WantCard';
import GratitudeCounter from '@/components/GratitudeCounter';
import { MOCK_WANTS } from '@/lib/mock-data';
import { useGratitudeStore } from '@/hooks/useGratitudeStore';
import { Gift, GiftType } from '@/types';

type FilterType = 'ALL' | GiftType;

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'ALL', label: 'すべて' },
  { value: 'SKILL', label: 'スキル' },
  { value: 'TIME', label: '時間' },
  { value: 'KNOWLEDGE', label: '知識' },
  { value: 'PHYSICAL', label: 'モノ' },
];

export default function WantsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [matchedGift, setMatchedGift] = useState<Gift | null>(null);
  const triggerRipple = useGratitudeStore((s) => s.triggerRipple);

  const filteredWants = useMemo(() => {
    return MOCK_WANTS.filter((want) => {
      const matchesFilter = activeFilter === 'ALL' || want.gift_type === activeFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        want.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        want.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        want.user?.display_name?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const handleAction = useCallback(
    (gift: Gift) => {
      setMatchedGift(gift);
      setTimeout(() => {
        triggerRipple(Math.floor(Math.random() * 5) + 1);
      }, 300);
      setTimeout(() => setMatchedGift(null), 2000);
    },
    [triggerRipple],
  );

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>みんなのリクエスト</h1>
        <p style={{ fontSize: 13, color: '#888' }}>誰かの「困った」に、あなたの力を</p>
      </div>

      {/* Stats */}
      <div style={{ marginBottom: 20 }}>
        <GratitudeCounter />
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 14 }}>
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#b0b0b0',
          }}
        />
        <input
          type="text"
          placeholder="リクエストを検索..."
          className="input-field"
          style={{ paddingLeft: 40 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter chips */}
      <div
        style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}
      >
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`chip ${activeFilter === f.value ? 'chip-active' : ''}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Feed */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeFilter}-${searchQuery}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {filteredWants.map((want, i) => (
            <WantCard key={want.id} gift={want} index={i} onAction={handleAction} />
          ))}

          {filteredWants.length === 0 && (
            <div className="empty-state">
              <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
              <div>
                {searchQuery
                  ? `「${searchQuery}」に一致するリクエストが見つかりません`
                  : 'このカテゴリにはまだリクエストがありません'}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {matchedGift && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="toast toast-primary"
          >
            🎉 「{matchedGift.title}」にマッチしました！
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import GiveCard from '@/components/GiveCard';
import PremiumBanner from '@/components/PremiumBanner';
import { MOCK_GIVES } from '@/lib/mock-data';
import { useGratitudeStore } from '@/hooks/useGratitudeStore';
import { GiftType } from '@/types';

type FilterType = 'ALL' | GiftType;

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'ALL', label: 'すべて' },
  { value: 'SKILL', label: 'スキル' },
  { value: 'TIME', label: '時間' },
  { value: 'KNOWLEDGE', label: '知識' },
  { value: 'PHYSICAL', label: 'モノ' },
];

export default function GivesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const triggerRipple = useGratitudeStore((s) => s.triggerRipple);

  const filteredGives = useMemo(() => {
    return MOCK_GIVES.filter((g) => {
      const matchesFilter = activeFilter === 'ALL' || g.gift_type === activeFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.user?.display_name?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const handleAction = () => {
    triggerRipple(Math.floor(Math.random() * 5) + 1);
  };

  // Stats
  const openCount = MOCK_GIVES.filter((g) => g.status === 'OPEN').length;
  const matchedCount = MOCK_GIVES.filter((g) => g.status === 'MATCHED').length;
  const completedCount = MOCK_GIVES.filter((g) => g.status === 'COMPLETED').length;

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>ギフト一覧</h1>
        <p style={{ fontSize: 13, color: '#888' }}>善意のギフトが循環する場所</p>
      </div>

      {/* Stats */}
      <div className="card" style={{ display: 'flex', marginBottom: 20 }}>
        <div className="stat-block" style={{ flex: 1 }}>
          <div className="stat-value" style={{ color: '#4ABFDD' }}>
            {openCount}
          </div>
          <div className="stat-label">受付中</div>
        </div>
        <div className="stat-block" style={{ flex: 1, borderLeft: '1px solid #f0f0f0' }}>
          <div className="stat-value" style={{ color: '#F5D946' }}>
            {matchedCount}
          </div>
          <div className="stat-label">マッチ済</div>
        </div>
        <div className="stat-block" style={{ flex: 1, borderLeft: '1px solid #f0f0f0' }}>
          <div className="stat-value">{completedCount}</div>
          <div className="stat-label">完了</div>
        </div>
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
          placeholder="ギフトを検索..."
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
          {filteredGives.map((give, i) => (
            <GiveCard key={give.id} gift={give} index={i} onAction={handleAction} />
          ))}

          {filteredGives.length === 0 && (
            <div className="empty-state">
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎁</div>
              <div>
                {searchQuery
                  ? `「${searchQuery}」に一致するギフトが見つかりません`
                  : 'このカテゴリにはまだギフトがありません'}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Premium */}
      <div style={{ marginTop: 20 }}>
        <PremiumBanner compact />
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, Plus } from 'lucide-react';
import Link from 'next/link';

const MOCK_CIRCLES = [
  {
    id: 'c1',
    name: '福岡ママの会',
    emoji: '👶',
    members: 24,
    description: '子育て中のママが気軽にギフトを交換できるサークル',
  },
  {
    id: 'c2',
    name: 'エンジニア互助会',
    emoji: '💻',
    members: 18,
    description: 'スキルシェアやコードレビューなど、技術系のギフトが中心',
  },
  {
    id: 'c3',
    name: '料理好き集まれ',
    emoji: '🍳',
    members: 32,
    description: 'レシピ共有や食材のおすそ分けなど',
  },
  {
    id: 'c4',
    name: '読書サークル',
    emoji: '📚',
    members: 15,
    description: '本の貸し借りやおすすめ共有',
  },
];

export default function DiscoverPage() {
  const [search, setSearch] = useState('');
  const [joinedIds, setJoinedIds] = useState<Set<string>>(new Set());
  const [toastMsg, setToastMsg] = useState('');

  const filtered = MOCK_CIRCLES.filter(
    (c) => c.name.includes(search) || c.description.includes(search),
  );

  const handleJoin = (circleId: string, circleName: string) => {
    if (joinedIds.has(circleId)) {
      // Leave
      setJoinedIds((prev) => {
        const next = new Set(prev);
        next.delete(circleId);
        return next;
      });
      setToastMsg(`「${circleName}」から退出しました`);
    } else {
      // Join
      setJoinedIds((prev) => new Set(prev).add(circleId));
      setToastMsg(`「${circleName}」に参加しました！ 🎉`);
    }
    setTimeout(() => setToastMsg(''), 2000);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>サークルを探す</h1>
        <p style={{ fontSize: 13, color: '#888' }}>仲間と一緒にギフトの輪を広げよう</p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
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
          placeholder="サークルを検索..."
          className="input-field"
          style={{ paddingLeft: 40 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Circle list */}
      {filtered.map((circle, i) => {
        const isJoined = joinedIds.has(circle.id);
        return (
          <motion.div
            key={circle.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card"
            style={{ padding: 20, marginBottom: 12 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: isJoined ? '#E8F6FA' : '#f8f8f8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0,
                  transition: 'background 0.2s',
                }}
              >
                {circle.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>
                  {circle.name}
                  {isJoined && (
                    <span style={{ marginLeft: 6, fontSize: 11, color: '#4ABFDD' }}>参加中</span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: '#b0b0b0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <Users size={12} />
                  {circle.members + (isJoined ? 1 : 0)} メンバー
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5, marginBottom: 12 }}>
              {circle.description}
            </p>
            <button
              className={`btn ${isJoined ? 'btn-outline' : 'btn-primary'} btn-small`}
              style={{ width: '100%' }}
              onClick={() => handleJoin(circle.id, circle.name)}
            >
              {isJoined ? '退出する' : '参加する'}
            </button>
          </motion.div>
        );
      })}

      {filtered.length === 0 && (
        <div className="empty-state">
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
          <div>
            {search
              ? `「${search}」に一致するサークルが見つかりませんでした`
              : 'サークルが見つかりませんでした'}
          </div>
        </div>
      )}

      {/* Create button */}
      <Link
        href="/circles/new"
        className="btn btn-primary"
        style={{
          position: 'fixed',
          bottom: 80,
          right: 20,
          width: 52,
          height: 52,
          borderRadius: '50%',
          padding: 0,
          boxShadow: '0 4px 16px rgba(74, 191, 221, 0.3)',
          textDecoration: 'none',
        }}
      >
        <Plus size={24} />
      </Link>

      {/* Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="toast toast-primary"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

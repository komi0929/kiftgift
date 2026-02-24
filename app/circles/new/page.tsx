'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, ArrowLeft, Info } from 'lucide-react';
import Link from 'next/link';

export default function NewCirclePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [maxMembers, setMaxMembers] = useState(150);
  const [isPublic, setIsPublic] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name || !location) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="page-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>輪が作成されました！</h2>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 24, lineHeight: 1.6 }}>
            「{name}」の輪が誕生しました。
            <br />
            メンバーを招待して感謝の連鎖を始めましょう ✨
          </p>
          <Link
            href="/discover"
            className="btn btn-primary"
            style={{ textDecoration: 'none', padding: '12px 24px' }}
          >
            Discoverに戻る
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 24 }}
      >
        <Link
          href="/discover"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 13,
            color: '#888',
            marginBottom: 8,
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={14} /> Discoverに戻る
        </Link>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>新しい輪をつくる</h1>
        <p style={{ fontSize: 13, color: '#888' }}>ご近所さんとの感謝の連鎖を始めましょう</p>
      </motion.div>

      {/* Circle Name */}
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
          輪の名前
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例: 天神エリア、薬院ママパパの輪"
          className="input-field"
        />
      </div>

      {/* Description */}
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
          説明
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="どんなコミュニティですか？"
          className="input-field"
          rows={3}
        />
      </div>

      {/* Location */}
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
          <MapPin size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> エリア
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="例: 福岡市中央区天神"
          className="input-field"
        />
      </div>

      {/* Max Members */}
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
          <Users size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> 最大人数
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          {[50, 100, 150].map((n) => (
            <button
              key={n}
              onClick={() => setMaxMembers(n)}
              className={`chip ${maxMembers === n ? 'chip-active' : ''}`}
              style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}
            >
              {n}人
            </button>
          ))}
        </div>
      </div>

      {/* Public/Private */}
      <div style={{ marginBottom: 20 }}>
        <label
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#888',
            display: 'block',
            marginBottom: 6,
          }}
        >
          公開設定
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setIsPublic(true)}
            className={`chip ${isPublic ? 'chip-active' : ''}`}
            style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}
          >
            🌐 公開
          </button>
          <button
            onClick={() => setIsPublic(false)}
            className={`chip ${!isPublic ? 'chip-active' : ''}`}
            style={{ flex: 1, textAlign: 'center', justifyContent: 'center' }}
          >
            🔒 承認制
          </button>
        </div>
      </div>

      {/* Info */}
      <div
        className="card"
        style={{
          padding: '10px 12px',
          fontSize: 12,
          color: '#666',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          background: '#E8F6FA',
          borderColor: '#d0eef5',
        }}
      >
        <Info size={14} style={{ flexShrink: 0, marginTop: 2 }} color="#4ABFDD" />
        <span>
          輪の最大人数制限（150人）はコミュニティを身近に保つためです。安心して参加できる規模を大切にしています。
        </span>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!name || !location}
        className="btn btn-primary"
        style={{
          width: '100%',
          padding: 14,
          fontSize: 15,
          opacity: !name || !location ? 0.4 : 1,
          cursor: !name || !location ? 'not-allowed' : 'pointer',
        }}
      >
        輪をつくる ✨
      </button>
    </div>
  );
}

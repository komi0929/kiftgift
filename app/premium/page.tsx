'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirectToCheckout } from '@/lib/stripe';

const FEATURES = [
  { emoji: '🔄', title: '輪を無制限に作成', desc: 'Free版は最大2つの輪まで。Premiumは無制限。' },
  { emoji: '🤖', title: 'AIマッチング優先', desc: 'あなたのGiveスキルに合うWantsを優先的に表示。' },
  {
    emoji: '📊',
    title: '詳細な感謝統計',
    desc: '月間レポート、累計リップル数、コミュニティ貢献度。',
  },
  { emoji: '👑', title: 'プレミアムバッジ', desc: 'プロフィールに金色のバッジが表示されます。' },
  { emoji: '🌐', title: '限定コミュニティ', desc: 'Premium会員限定の輪に参加できます。' },
];

export default function PremiumPage() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async () => {
    setProcessing(true);
    setError('');
    try {
      // In production, this redirects to Stripe Checkout
      await redirectToCheckout('current-user-id');
    } catch (err) {
      // If Stripe is not configured, show friendly message
      const message = err instanceof Error ? err.message : 'エラーが発生しました';
      if (message.includes('Checkout failed') || message.includes('Invalid')) {
        setError('決済サービスは現在準備中です。もうしばらくお待ちください。');
      } else {
        setError(message);
      }
      setProcessing(false);
    }
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 20 }}
      >
        <Link
          href="/profile"
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
          <ArrowLeft size={14} /> 戻る
        </Link>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
          <span style={{ color: '#F5D946' }}>Premium</span> プラン
        </h1>
        <p style={{ fontSize: 13, color: '#888' }}>輪をもっと楽しくするオプション</p>
      </motion.div>

      {/* Pricing Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
        style={{
          padding: 24,
          marginBottom: 20,
          textAlign: 'center',
          background: '#FFF9E0',
          borderColor: '#F0E8A0',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: '#F5D946',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Crown size={28} color="white" />
          </div>
        </div>
        <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 4 }}>
          ¥490<span style={{ fontSize: 14, fontWeight: 500, color: '#888' }}>/月</span>
        </div>
        <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>いつでもキャンセル可能</div>
      </motion.div>

      {/* Features List */}
      <div style={{ marginBottom: 24 }}>
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            style={{
              padding: '12px 14px',
              marginBottom: 8,
              borderRadius: 12,
              background: '#f8f8f8',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span style={{ fontSize: 22 }}>{f.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{f.title}</div>
              <div style={{ fontSize: 11, color: '#888' }}>{f.desc}</div>
            </div>
            <Check size={16} color="#4ABFDD" />
          </motion.div>
        ))}
      </div>

      {/* Info Message */}
      <div
        className="card"
        style={{
          padding: '12px 16px',
          marginBottom: 20,
          background: '#E8F6FA',
          borderColor: '#d0eef5',
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>
          Premiumは感謝体験をより豊かにするオプション
        </div>
        <div style={{ fontSize: 11, color: '#666' }}>
          Free版でもすべてのコア機能が使えます。ギフトの送受信、マッチング、輪への参加は無料です。
        </div>
      </div>

      {/* Subscribe Button */}
      <button
        onClick={handleSubscribe}
        disabled={processing}
        className="btn btn-primary"
        style={{
          width: '100%',
          padding: 14,
          fontSize: 15,
          background: '#F5D946',
          opacity: processing ? 0.6 : 1,
          cursor: processing ? 'wait' : 'pointer',
        }}
      >
        {processing ? '処理中...' : '✨ Premium に登録する'}
      </button>

      {error && (
        <div
          style={{
            marginTop: 12,
            padding: '10px 16px',
            borderRadius: 10,
            background: '#FFF0F0',
            color: '#cc0000',
            fontSize: 12,
            textAlign: 'center',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

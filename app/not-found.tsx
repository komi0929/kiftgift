'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      className="page-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>ページが見つかりません</h1>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 32, lineHeight: 1.6 }}>
          お探しのページは移動または削除された可能性があります。
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/wants" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            <Home size={16} />
            ホームに戻る
          </Link>
        </div>

        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => history.back()}
            style={{
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: 13,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <ArrowLeft size={14} />
            前のページに戻る
          </button>
        </div>
      </motion.div>
    </div>
  );
}

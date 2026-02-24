'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface CompletionCelebrationProps {
  rippleCount?: number;
  onShare?: () => void;
}

export default function CompletionCelebration({
  rippleCount = 3,
  onShare,
}: CompletionCelebrationProps) {
  // Ripple particles (cyan-tinted) — generated once on mount
  const [particles] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      size: 8 + Math.random() * 8,
    })),
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#ffffff',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 0 }}
          animate={{ y: '100vh', opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: '#4ABFDD',
            opacity: 0.15,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Ripple rings */}
      {[0, 0.5, 1].map((delay, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.3, opacity: 0.3 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 2.5, delay, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: 160,
            height: 160,
            borderRadius: '50%',
            border: '2px solid #4ABFDD',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontSize: 56, marginBottom: 16 }}
        >
          🌊
        </motion.div>

        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
          感謝の連鎖が広がりました！
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ fontSize: 16, color: '#4ABFDD', marginBottom: 4, fontWeight: 600 }}
        >
          {rippleCount}人目のつながり
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ fontSize: 13, color: '#888', marginBottom: 32, lineHeight: 1.6 }}
        >
          あなたの優しさが、また誰かの笑顔につながりました。
        </motion.p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            onClick={onShare}
            className="btn btn-primary"
          >
            <Share2 size={16} />
            シェアする
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ marginTop: 24 }}
        >
          <Link
            href="/wants"
            style={{
              fontSize: 13,
              color: '#888',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              justifyContent: 'center',
            }}
          >
            <ArrowLeft size={14} />
            フィードに戻る
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

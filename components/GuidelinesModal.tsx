'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';

interface GuidelinesModalProps {
  onAgree: () => void;
}

const GUIDELINES = [
  {
    title: '🎁 ギフトは見返りを求めません',
    desc: 'お返しは完全に自由。受け取ることも立派なギフトです。金銭的な価値評価は一切行いません。',
  },
  {
    title: '🛡️ 個人情報を守りましょう',
    desc: '住所・電話番号はマッチング成立までシェアしないでください。',
  },
  { title: '💚 負担をかけない', desc: '高額なモノや長時間の拘束を求める投稿は控えましょう。' },
  { title: '🤝 安全な受け渡し', desc: 'モノの受け渡しは公共の場所で行いましょう。' },
  { title: '🚫 ハラスメントゼロ', desc: '嫌がらせ・差別・勧誘は通報対象です。' },
  {
    title: '✨ 感謝の連鎖を楽しもう',
    desc: 'あなたの小さなギフトが、誰かの大きな一歩になります。',
  },
];

export default function GuidelinesModal({ onAgree }: GuidelinesModalProps) {
  const [scrolled, setScrolled] = useState(false);
  const [agreed, setAgreed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('kifutogift-guidelines-agreed') === 'true';
  });

  // Also check Supabase for authenticated users (ITP-resilient)
  useEffect(() => {
    if (agreed) return;
    (async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        const { data } = await supabase
          .from('users')
          .select('agreed_guidelines_at')
          .eq('id', user.id)
          .single();
        if (data?.agreed_guidelines_at) {
          localStorage.setItem('kifutogift-guidelines-agreed', 'true');
          setAgreed(true);
        }
      } catch {
        // Supabase not available — rely on localStorage
      }
    })();
  }, [agreed]);

  const handleAgree = () => {
    localStorage.setItem('kifutogift-guidelines-agreed', 'true');
    setAgreed(true);
    // Also persist to Supabase for authenticated users
    (async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('users')
            .update({ agreed_guidelines_at: new Date().toISOString() })
            .eq('id', user.id);
        }
      } catch {
        // localStorage is the primary store
      }
    })();
    onAgree();
  };

  if (agreed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        style={{ zIndex: 200 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="modal-content"
          style={{ padding: 24 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🎁</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
              コミュニティガイドライン
            </h2>
            <p style={{ fontSize: 13, color: '#888' }}>
              みんなが安心して使えるコミュニティのために
            </p>
          </div>

          <div
            onScroll={(e) => {
              const target = e.target as HTMLDivElement;
              if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
                setScrolled(true);
              }
            }}
            style={{
              maxHeight: 300,
              overflowY: 'auto',
              marginBottom: 20,
              padding: '0 4px',
            }}
          >
            {GUIDELINES.map((g, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 14px',
                  marginBottom: 8,
                  borderRadius: 12,
                  background: '#f8f8f8',
                  border: '1px solid #f0f0f0',
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{g.title}</div>
                <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>{g.desc}</div>
              </div>
            ))}
          </div>

          {!scrolled && (
            <p style={{ fontSize: 11, color: '#b0b0b0', textAlign: 'center', marginBottom: 12 }}>
              ↓ スクロールして最後まで読んでください
            </p>
          )}

          <button
            onClick={handleAgree}
            disabled={!scrolled}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: 14,
              fontSize: 15,
              opacity: scrolled ? 1 : 0.4,
              cursor: scrolled ? 'pointer' : 'not-allowed',
            }}
          >
            同意して始める
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

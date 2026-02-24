'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';
import { useState } from 'react';

export default function SafetyTips() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '6px 10px',
          borderRadius: 8,
          background: '#E8F6FA',
          border: '1px solid #d0eef5',
          cursor: 'pointer',
          fontSize: 11,
          color: '#4ABFDD',
          fontWeight: 600,
        }}
      >
        <ShieldAlert size={13} />
        安全tips
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="modal-content"
              style={{ padding: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700 }}>🛡️ 安全な受け渡しのために</h3>
                <button
                  onClick={() => setOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={20} color="#b0b0b0" />
                </button>
              </div>

              {[
                {
                  emoji: '📍',
                  title: '公共の場所で会う',
                  desc: 'カフェ、駅前、コンビニなど人目のある場所を選びましょう',
                },
                {
                  emoji: '👥',
                  title: '初回は少人数で',
                  desc: '初めての相手とは1対1で会うより友人を連れていくと安心です',
                },
                {
                  emoji: '📱',
                  title: '連絡先を事前に共有',
                  desc: 'マッチが成立したら、アプリ内メッセージで連絡を取り合いましょう',
                },
                {
                  emoji: '🕐',
                  title: '昼間の時間帯に',
                  desc: 'できるだけ明るい時間帯に会うことをおすすめします',
                },
                {
                  emoji: '🚫',
                  title: '断っても大丈夫',
                  desc: '少しでも不安を感じたら、断ることに遠慮は要りません',
                },
              ].map((tip, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px 12px',
                    marginBottom: 6,
                    borderRadius: 10,
                    background: i % 2 === 0 ? '#E8F6FA' : '#FFF9E0',
                    display: 'flex',
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{tip.emoji}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>
                      {tip.title}
                    </div>
                    <div style={{ fontSize: 11, color: '#888', lineHeight: 1.5 }}>{tip.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, BookOpen, Shield, Crown, User, LogOut } from 'lucide-react';

const MENU_ITEMS = [
  { href: '/wants', icon: <BookOpen size={18} />, label: 'フィード' },
  { href: '/profile', icon: <User size={18} />, label: 'プロフィール' },
  { href: '/guidelines', icon: <Shield size={18} />, label: 'ガイドライン' },
  { href: '/privacy', icon: <Shield size={18} />, label: 'プライバシーポリシー' },
  { href: '/premium', icon: <Crown size={18} />, label: 'Premium' },
];

export default function SideDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger trigger */}
      <button
        onClick={() => setOpen(true)}
        style={{
          background: 'none',
          border: '1px solid #f0f0f0',
          borderRadius: 10,
          padding: '8px 10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1a1a1a',
        }}
        aria-label="メニュー"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Drawer overlay + panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.3)',
                zIndex: 90,
              }}
            />

            {/* Panel */}
            <motion.nav
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: 280,
                background: '#ffffff',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '4px 0 24px rgba(0, 0, 0, 0.08)',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '20px 20px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: '#F5D946',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                    }}
                  >
                    🎁
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>キフトギフト</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 4,
                    color: '#b0b0b0',
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Menu Items */}
              <div style={{ flex: 1, padding: '12px 0' }}>
                {MENU_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 20px',
                      textDecoration: 'none',
                      color: '#1a1a1a',
                      fontSize: 14,
                      fontWeight: 500,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f8f8f8')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{ color: '#888' }}>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Footer */}
              <div
                style={{
                  padding: '16px 20px',
                  borderTop: '1px solid #f0f0f0',
                }}
              >
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    padding: '10px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#b0b0b0',
                    fontSize: 13,
                  }}
                >
                  <LogOut size={16} />
                  ログアウト
                </button>
                <div style={{ fontSize: 11, color: '#d0d0d0', marginTop: 8 }}>
                  キフトギフト v2.0 — Demo
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

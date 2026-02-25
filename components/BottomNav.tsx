'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Gift, PlusCircle, Compass, User } from 'lucide-react';

const TABS = [
  { href: '/wants', icon: Home, label: 'ホーム' },
  { href: '/gives', icon: Gift, label: 'ギフト' },
  { href: '/post', icon: PlusCircle, label: '投稿' },
  { href: '/discover', icon: Compass, label: '発見' },
  { href: '/profile', icon: User, label: 'プロフィール' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: '#ffffff',
        borderTop: '1px solid #f0f0f0',
      }}
    >
      <div
        style={{
          maxWidth: 560,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '8px 0 env(safe-area-inset-bottom, 8px)',
        }}
      >
        {TABS.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label={tab.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: '6px 12px',
                textDecoration: 'none',
                color: isActive ? '#4ABFDD' : '#b0b0b0',
                transition: 'color 0.15s',
              }}
            >
              <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
              {/* Active dot */}
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  background: isActive ? '#4ABFDD' : 'transparent',
                  transition: 'background 0.15s',
                }}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import RippleEffect from '@/components/RippleEffect';
import SideDrawer from '@/components/SideDrawer';
import Link from 'next/link';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'キフトギフト — 感謝の連鎖を、あなたから',
  description:
    'お金を使わずに、ありがとうが複利で社会全体を豊かにしていく、AIが守るギフトエコノミー・プラットフォーム',
  openGraph: {
    title: 'キフトギフト — 感謝の連鎖を、あなたから',
    description: 'AIが守るギフトエコノミー・プラットフォーム',
    url: 'https://kiftgift.vercel.app',
    siteName: 'キフトギフト',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary',
    title: 'キフトギフト',
    description: 'AIが守るギフトエコノミー・プラットフォーム',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={notoSansJP.variable} style={{ fontFamily: '"Noto Sans JP", sans-serif' }}>
        {/* Header — nani style: hamburger | center logo | action */}
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 40,
            background: '#ffffff',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div
            style={{
              maxWidth: 560,
              margin: '0 auto',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Left: Menu — opens SideDrawer via client component */}
            <SideDrawer />

            {/* Center: Logo */}
            <Link
              href="/wants"
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: '#F5D946',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                }}
              >
                🎁
              </div>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#1a1a1a',
                  letterSpacing: '-0.02em',
                }}
              >
                キフトギフト
              </span>
            </Link>

            {/* Right: Action — linked to /post */}
            <Link
              href="/post"
              className="btn btn-primary btn-small"
              style={{ padding: '8px 16px', fontSize: 12, textDecoration: 'none' }}
            >
              投稿する
            </Link>
          </div>
        </header>

        {/* Main Content */}
        {children}

        {/* Bottom Navigation */}
        <BottomNav />

        {/* Ripple Effect Overlay */}
        <RippleEffect />
      </body>
    </html>
  );
}

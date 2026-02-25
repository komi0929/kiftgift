import type { Metadata } from 'next';
import AuthGuard from '@/components/AuthGuard';

export const metadata: Metadata = {
  title: '発見 — キフトギフト',
  description: '新しい輪やギフトを発見しよう',
};

export default function DiscoverLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}

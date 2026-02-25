import type { Metadata } from 'next';
import AuthGuard from '@/components/AuthGuard';

export const metadata: Metadata = {
  title: 'コミュニティ — キフトギフト',
  description: '輪に参加して地域のギフトを見つけよう',
};

export default function CirclesLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}

import type { Metadata } from 'next';
import AuthGuard from '@/components/AuthGuard';

export const metadata: Metadata = {
  title: 'ギフト完了 — キフトギフト',
  description: 'ギフトのやりとりを完了',
};

export default function CompletionLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}

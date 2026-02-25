import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '発見 — キフトギフト',
  description: '新しい輪やギフトを発見しよう',
};

export default function DiscoverLayout({ children }: { children: React.ReactNode }) {
  return children;
}

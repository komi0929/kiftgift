import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '投稿する — キフトギフト',
  description: 'ギフトを投稿して、感謝の連鎖を始めよう',
};

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return children;
}

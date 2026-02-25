import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ログイン — キフトギフト',
  description: '電話番号でログイン',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}

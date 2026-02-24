# KiftGift — AI Coding Rules

## プロジェクト概要

AI搭載ギフトエコノミープラットフォーム。Next.js 16 + TypeScript + Tailwind CSS v4。

## 環境制約

- **日本語パス**: `--webpack` フラグ必須（Turbopack/SWC 不可）
- **モバイルファースト**: 393×852 基準

## TypeScript

- `strict: true` を厳守
- `any` 型は禁止（`unknown` を使用）
- 型定義は `types/index.ts` に集約
- パスエイリアスは `@/` を使用

## React / Next.js

- クライアントコンポーネントには `'use client'` を必ず記述
- コンポーネントは `components/` ディレクトリに配置
- ページは `app/` ディレクトリ（App Router）
- カスタムフックは `hooks/` ディレクトリ
- ユーティリティは `lib/` ディレクトリ

## スタイリング

- Tailwind CSS クラスを優先（インラインスタイルは最小限に）
- カスタムアニメーションは `globals.css` に定義
- Framer Motion は `motion.div` パターンで統一

## テスト

- テストファイルは `__tests__/` に配置
- ファイル名は `*.test.ts` または `*.test.tsx`
- Vitest + React Testing Library を使用

## コード品質

- ESLint + Prettier でフォーマット統一
- コミット前に `lint-staged` で自動チェック
- 未使用の import は削除する

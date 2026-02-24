'use client';

import { motion } from 'framer-motion';
import { Shield, Heart, Users, Flag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import SafetyTips from '@/components/SafetyTips';

const GUIDELINES = [
  {
    icon: '💚',
    title: '受け取ることも立派なギフトです',
    description: '誰かのギフトを受け取ることで、贈り手に喜びが生まれます。遠慮しないでください。',
  },
  {
    icon: '🌿',
    title: 'お返しは完全に自由です',
    description:
      'ギフトを受け取ったからといって、お返しをする義務はありません。あなたのペースで大丈夫です。',
  },
  {
    icon: '🍃',
    title: '負担のかからない軽い参加を大切に',
    description:
      '無理なく続けられる範囲で参加しましょう。「おすすめの本を教える」くらいの気軽さでOK。',
  },
  {
    icon: '🤝',
    title: 'お互いを尊重しましょう',
    description: '相手の時間と善意を大切に。約束した時間を守り、感謝の気持ちを忘れずに。',
  },
  {
    icon: '🚫',
    title: '金銭・高額なモノの要求は禁止',
    description:
      'このプラットフォームは金銭を介さないギフトの場です。現金や高額商品の要求はお控えください。金銭的な価値評価は一切行いません。',
  },
  {
    icon: '🔒',
    title: '個人情報の保護',
    description: '本名、住所、電話番号などの個人情報はメッセージでのやりとりは避けましょう。',
  },
];

export default function GuidelinesPage() {
  return (
    <div className="page-container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 24 }}
      >
        <Link
          href="/wants"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 13,
            color: '#888',
            marginBottom: 8,
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={14} />
          戻る
        </Link>

        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>コミュニティガイドライン</h1>
        <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>
          キフトギフトは、感謝の連鎖を広げるためのプラットフォームです。
          みんなが安心して利用できるよう、以下のガイドラインをお守りください。
        </p>
      </motion.div>

      {/* Guidelines List */}
      {GUIDELINES.map((guideline, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          className="card"
          style={{
            padding: 16,
            marginBottom: 12,
            display: 'flex',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 24, flexShrink: 0 }}>{guideline.icon}</span>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{guideline.title}</h3>
            <p style={{ fontSize: 12, color: '#888', lineHeight: 1.6 }}>{guideline.description}</p>
          </div>
        </motion.div>
      ))}

      {/* Safety Tips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}
      >
        <SafetyTips />
      </motion.div>

      {/* Trust & Safety */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
        style={{
          padding: 16,
          marginTop: 16,
          background: '#E8F6FA',
          borderColor: '#d0eef5',
        }}
      >
        <h3
          style={{
            fontSize: 14,
            fontWeight: 700,
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Shield size={16} color="#4ABFDD" />
          安全性について
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#666' }}
          >
            <Flag size={14} color="#888" />
            不適切な投稿は報告ボタンから通報できます
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#666' }}
          >
            <Users size={14} color="#888" />
            認証済みバッジ（✅）は信頼性の目安です
          </div>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#666' }}
          >
            <Heart size={14} color="#888" />
            Gift Guardian AIがみんなの安全を見守っています
          </div>
        </div>
      </motion.div>

      {/* Privacy & Legal Link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{ marginTop: 16, textAlign: 'center' }}
      >
        <Link href="/privacy" style={{ fontSize: 12, color: '#4ABFDD', textDecoration: 'none' }}>
          プライバシーポリシー・利用規約
        </Link>
      </motion.div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Lock, Eye } from 'lucide-react';
import Link from 'next/link';

const SECTIONS = [
  {
    icon: <Shield size={16} color="#4ABFDD" />,
    title: '金銭的価値評価の非実施',
    content:
      'キフトギフトは、ギフト（贈り物）の金銭的価値を一切評価・算出しません。本サービスで扱うのは「時間」「知識」「スキル」などの非金銭的なギフトであり、円換算・市場価値の推定は行われません。したがって、贈与税法上の「贈与」には該当しないと考えられます。',
  },
  {
    icon: <Eye size={16} color="#4ABFDD" />,
    title: 'AIによるデータ処理',
    content:
      '本サービスでは、Gift Guardian AI（負担度チェック）およびPositivity Nudge（感謝促進メッセージ）の2つのAI機能を使用します。これらはユーザーの投稿テキストおよびギフト送受信回数のみを参照し、個人を特定する情報やスコアリング（信用スコア等）は一切行いません。',
  },
  {
    icon: <Lock size={16} color="#4ABFDD" />,
    title: '個人情報の取り扱い',
    content:
      '収集する個人情報は、表示名・メールアドレス（またはSNS認証情報）・参加サークル情報に限定されます。住所・電話番号・実名の入力は求めません。アプリ内メッセージでの個人情報共有はユーザーの自己責任となります。',
  },
  {
    icon: <Shield size={16} color="#F5D946" />,
    title: 'シャドウバンの非採用',
    content:
      'キフトギフトはシャドウバン（本人に通知せず機能制限する行為）を一切採用しません。利用制限が必要な場合は、明示的な通知とともに理由を説明します。これは透明性の原則に基づく運営方針です。',
  },
  {
    icon: <Lock size={16} color="#F5D946" />,
    title: '通報・ブロック機能',
    content:
      'すべてのユーザーは、不適切な投稿やユーザーを通報する権利を有します。通報は運営チームが確認し、ガイドライン違反が認められた場合は適切な措置を講じます。ブロック・ミュート機能により、個人レベルでの安全管理も可能です。',
  },
  {
    icon: <Eye size={16} color="#F5D946" />,
    title: 'データの保存と削除',
    content:
      'ユーザーデータはSupabase（PostgreSQL）上で暗号化されて保存されます。アカウント削除を希望する場合は、設定画面またはお問い合わせより申請でき、30日以内にすべてのデータが完全に削除されます。',
  },
];

export default function PrivacyPage() {
  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 24 }}
      >
        <Link
          href="/guidelines"
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
          ガイドラインに戻る
        </Link>

        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
          プライバシーポリシー・利用規約
        </h1>
        <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>最終更新: 2026年2月24日</p>
      </motion.div>

      {SECTIONS.map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="card"
          style={{ padding: 16, marginBottom: 12 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            {section.icon}
            <h3 style={{ fontSize: 14, fontWeight: 700 }}>{section.title}</h3>
          </div>
          <p style={{ fontSize: 12, color: '#666', lineHeight: 1.7 }}>{section.content}</p>
        </motion.div>
      ))}

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
        style={{
          padding: 16,
          marginTop: 8,
          background: '#FFF9E0',
          borderColor: '#F0E8A0',
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>⚠️ 免責事項</div>
        <p style={{ fontSize: 11, color: '#666', lineHeight: 1.7 }}>
          本サービスは物品の売買・交換プラットフォームではありません。ユーザー間のギフト授受に関する法的責任は当事者間に帰属します。
          高額な物品のやりとりは推奨しておらず、Gift Guardian
          AIが高負担と判断した投稿には警告を表示します。
          本サービスの利用により生じた損害について、運営は一切の責任を負いません。
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: 20, textAlign: 'center' }}
      >
        <Link href="/wants" style={{ fontSize: 12, color: '#4ABFDD', textDecoration: 'none' }}>
          フィードに戻る
        </Link>
      </motion.div>
    </div>
  );
}

# 串焼き大紀（Kushiyaki Taiki）公式サイト

串焼き大紀の公式Webサイトです。

## 技術スタック

| 項目 | 技術 |
|------|------|
| フレームワーク | [Next.js](https://nextjs.org/) 14（App Router） |
| UI ライブラリ | React 18 |
| 言語 | TypeScript |
| スタイリング | [Tailwind CSS](https://tailwindcss.com/) 3 |
| アニメーション | [GSAP](https://gsap.com/) |
| スムーススクロール | [Lenis](https://github.com/darkroomengineering/lenis) |
| 3D エフェクト | [Three.js](https://threejs.org/) |
| スライダー | [Swiper](https://swiperjs.com/) |
| フォント | [Shippori Mincho](https://fonts.google.com/specimen/Shippori+Mincho)（Google Fonts） |
| ホスティング | [Vercel](https://vercel.com/) |

## セットアップ

### 必要な環境

- **Node.js** 18 以上
- **npm** 9 以上

### インストール & 起動

```bash
# リポジトリをクローン
git clone https://github.com/albertoshonan/Kushiyaki-Taiki.git
cd Kushiyaki-Taiki

# 依存パッケージをインストール
npm install

# 開発サーバーを起動（http://localhost:3000）
npm run dev
```

### その他のコマンド

```bash
npm run build   # 本番用ビルド
npm run start   # ビルド済みアプリを起動
npm run lint    # ESLint でコードチェック
```

## ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx          # ルートレイアウト（メタデータ・フォント読み込み）
│   ├── page.tsx            # トップページ（HomeClient を呼び出すだけ）
│   └── globals.css         # グローバルスタイル
├── components/
│   ├── HomeClient.tsx      # メインページのクライアントコンポーネント
│   ├── Header.tsx          # ヘッダー / ナビゲーション
│   ├── Hero.tsx            # ファーストビュー
│   ├── Concept.tsx         # コンセプトセクション
│   ├── Specialite.tsx      # 料理紹介セクション
│   ├── Price.tsx           # 料金セクション
│   ├── Drinks.tsx          # ドリンクセクション
│   ├── Message.tsx         # オーナーメッセージセクション
│   ├── Footer.tsx          # フッター
│   ├── Loading.tsx         # ローディング画面
│   ├── SmoothScroll.tsx    # Lenis によるスムーススクロール
│   ├── SectionDivider.tsx  # セクション間の区切り
│   ├── EmberParticles.tsx  # 火の粉パーティクルエフェクト
│   └── SmokeParticles.tsx  # 煙パーティクルエフェクト
├── lib/
│   └── image.ts            # 画像ユーティリティ
└── styles/                 # 追加スタイル
public/
├── images/                 # 画像素材（写真・アイコン等）
├── favicon.ico
└── apple-touch-icon.png
```

## 修正する際のポイント

- **各セクションは独立したコンポーネント**になっているため、修正したいセクションに対応するファイルを編集してください。
- **ファーストビュー以降のコンポーネントは遅延読み込み**（`dynamic import`）されています（`HomeClient.tsx` 参照）。
- **画像の追加・差し替え**は `public/images/` に配置し、コンポーネント内のパスを更新してください。
- **フォント**は Google Fonts の Shippori Mincho を使用しています。変更する場合は `layout.tsx` を編集してください。
- **Tailwind CSS** の設定は `tailwind.config.js` にあります。

## デプロイ

Vercel と GitHub リポジトリが連携済みのため、**`main` ブランチに push すると自動デプロイ**されます。

プレビューデプロイを利用したい場合は、ブランチを切って Pull Request を作成してください。

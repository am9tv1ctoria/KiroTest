# Design Document

## Overview

Kiro ランディングページ（kiro-lp）は、AWS が開発した AI 搭載 IDE「Kiro」を紹介するための単一 HTML ファイルの静的ランディングページである。

### 目的

- Kiro の価値提案・主要機能・導入手順を日本語で明確に伝える
- 訪問者をダウンロードページ（`https://kiro.dev`）へ誘導する
- モバイルからデスクトップまであらゆる画面幅に対応する
- WCAG 2.1 AA アクセシビリティ基準を満たす
- ビルドツール不要、TailwindCSS CDN のみで実装する

### 技術的アプローチ

ビルドパイプライン・フレームワーク・追加 JS ライブラリを一切持たない単一の `index.html` として実装する。TailwindCSS は CDN 経由（`https://cdn.tailwindcss.com`）で読み込む。JavaScript はナビゲーションのハンバーガーメニュー開閉のみにインライン `<script>` で記述し、外部ライブラリには依存しない。

---

## Architecture

### ファイル構成

```
index.html          # ランディングページ本体（単一ファイル）
```

すべてのスタイル・スクリプト・SVGアイコンは `index.html` にインライン記述する。外部ファイルへの依存は TailwindCSS CDN のみ。

### ページ構造（DOM ツリー概観）

```
<html lang="ja">
  <head>
    meta charset, viewport, description, title
    TailwindCSS CDN <script>
  </head>
  <body>
    <header>          <!-- Navigation_Bar (sticky) -->
    <main>
      <section id="hero">       <!-- Hero_Section -->
      <section id="features">   <!-- Feature_Section -->
      <section id="how-to">     <!-- How-to / Workflow Section -->
      <section id="cta">        <!-- CTA Section -->
    </main>
    <footer>          <!-- Footer_Section -->
    <script>          <!-- Hamburger menu toggle (inline) -->
  </body>
</html>
```

### レスポンシブ戦略

TailwindCSS のモバイルファーストブレークポイントを使用する：

| ブレークポイント | 幅 | 対象 |
|---|---|---|
| (デフォルト) | 〜767px | モバイル |
| `md:` | 768px〜 | タブレット・デスクトップ |
| `lg:` | 1024px〜 | 大画面デスクトップ |

---

## Components and Interfaces

### 1. Navigation Bar コンポーネント

**要素:** `<header>` + `<nav>`  
**位置:** 固定（`position: sticky; top: 0`）  

```
[ロゴ/ブランド名]  ──────────────────  [機能] [使い方] [ダウンロード]
                                                    ↑ デスクトップ
[ロゴ/ブランド名]  ──────────────────  [☰ ハンバーガー]
                                                    ↑ モバイル（768px未満）
```

**インタラクション:**
- アンカーリンク: `href="#features"` / `href="#how-to"` / `href="#cta"`
- スムーズスクロール: `scroll-behavior: smooth` を `html` 要素に適用
- ハンバーガーメニュー: クリックで `hidden` クラスをトグル（インライン JS）

**アクセシビリティ:**
- ハンバーガーボタンに `aria-expanded` / `aria-controls` を設定
- ナビリンクには意味のあるテキストラベルを使用

---

### 2. Hero Section コンポーネント

**要素:** `<section id="hero">`  
**高さ:** `min-h-screen` または `h-screen`（初期ビューポート高さ内に収める）  

```
┌──────────────────────────────────────────┐
│  グラデーション背景（2色以上）               │
│                                          │
│  <h1>Kiro – コードを書く時間より、          │
│        設計に集中する時間を</h1>            │
│                                          │
│  <p>サブコピー（2〜3文）</p>                │
│                                          │
│  [今すぐ無料でダウンロード] ← CTA Button    │
│                                          │
└──────────────────────────────────────────┘
```

**CTA ボタン仕様:**
- `href="https://kiro.dev"` / `target="_blank"` / `rel="noopener noreferrer"`
- WCAG 4.5:1 コントラスト比を満たす配色

---

### 3. Feature Section コンポーネント

**要素:** `<section id="features">`  

**カードレイアウト:**
- デスクトップ（768px+）: `grid-cols-3`
- モバイル（768px未満）: `grid-cols-1`

**3 つの機能カード:**

| # | アイコン | 機能名 | 説明文（50〜120字） |
|---|---|---|---|
| 1 | 📋（または SVG） | Spec 駆動開発 | 要件定義から設計・タスク生成までを自動化。仕様書を書くだけで、AI が実装計画を構造化して提示します。 |
| 2 | 🤖（または SVG） | 自律型エージェント | コードの記述・テスト・修正をエージェントが自律実行。繰り返し作業から解放され、設計・意思決定に集中できます。 |
| 3 | 🔌（または SVG） | MCP 対応 | Model Context Protocol により外部ツールやサービスと連携。既存のワークフローや API をシームレスに統合できます。 |

各カードの構造:
```html
<div class="card">
  <div class="icon" aria-hidden="true"><!-- SVG or emoji --></div>
  <h3>機能名</h3>
  <p>説明文</p>
</div>
```

---

### 4. How-to / Workflow Section コンポーネント

**要素:** `<section id="how-to">`  

**ステップレイアウト:**
- デスクトップ（768px+）: `flex-row`（横並び）
- モバイル（768px未満）: `flex-col`（縦積み）

**3 ステップ:**

| # | タイトル | 説明文（30字以上） |
|---|---|---|
| 1 | Kiro をインストール | Kiro の公式サイトからダウンロードし、数分でインストール完了。既存の開発環境にすぐ統合できます。 |
| 2 | Spec を定義する | プロジェクトを開き、自然言語で要件を記述するだけ。AI が設計・タスクに自動変換します。 |
| 3 | AI が実装を生成 | エージェントがコードを記述・テスト・修正まで自律実行。あなたはレビューと意思決定に集中できます。 |

各ステップの構造:
```html
<div class="step">
  <div class="step-number">01</div>
  <h3>タイトル</h3>
  <p>説明文</p>
</div>
```

---

### 5. CTA Section コンポーネント

**要素:** `<section id="cta">`  
**位置:** フッターの直上、他セクションと視覚的に区切る（異なる背景色または border）  

```
┌──────────────────────────────────────────┐
│       Kiro を無料で始める（<h2>）            │
│                                          │
│           [ダウンロード]                    │
└──────────────────────────────────────────┘
```

**ボタン仕様:**
- `href="https://kiro.dev"` / `target="_blank"` / `rel="noopener noreferrer"`
- WCAG 4.5:1 コントラスト比を満たす配色（例：白文字 on インディゴ背景）

---

### 6. Footer Section コンポーネント

**要素:** `<footer>`  
**背景:** Tailwind `bg-gray-800` 以上のダーク背景（`bg-gray-900` 推奨）  

```
© 2025 Amazon Web Services, Inc.   |   プライバシーポリシー  利用規約  GitHub
```

**リンク仕様:**
- プライバシーポリシー / 利用規約: プレースホルダー `href="#"` でも可（実装上の注記）
- GitHub: Kiro リポジトリの URL（例: `https://github.com/aws/kiro`）
- テキストと `bg-gray-900` のコントラスト比 4.5:1 以上（`text-gray-300` 以上を使用）

---

### 7. JavaScript（ハンバーガーメニュー）

外部ライブラリなし。`<body>` 末尾にインライン `<script>` で記述：

```javascript
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
btn.addEventListener('click', () => {
  const isExpanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!isExpanded));
  menu.classList.toggle('hidden');
});
```

---

## Data Models

本ページは静的 HTML であり、実行時データモデルは存在しない。ページを構成するコンテンツの論理的構造を以下に定義する。

### FeatureCard

```typescript
interface FeatureCard {
  icon: string;           // インライン SVG または絵文字
  title: string;          // 機能名（例: "Spec 駆動開発"）
  description: string;    // 50〜120字の説明文
}
```

### WorkflowStep

```typescript
interface WorkflowStep {
  stepNumber: string;     // "01" | "02" | "03"
  title: string;          // ステップタイトル
  description: string;    // 30字以上の説明文
}
```

### NavigationLink

```typescript
interface NavigationLink {
  label: string;          // 表示テキスト（例: "機能"）
  href: string;           // アンカー先（例: "#features"）
}
```

### PageMeta

```typescript
interface PageMeta {
  title: string;          // "Kiro – AWS が開発した AI 搭載 IDE"
  description: string;    // 1〜160字の meta description
  lang: "ja";
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

プロパティ分析ノート: 本ページは静的 HTML であり純粋関数は存在しないが、DOM を通じて普遍的に検証可能なプロパティ（全要素に対して成立すべき制約）が複数存在する。以下のプロパティは各要件の受け入れ基準から導出し、DOM アサーションとして自動検証可能な形式で定義する。

---

### Property 1: Meta Description の長さ制約

*For any* Landing_Page において、`<meta name="description">` の `content` 属性の文字数が 1 以上 160 以下でなければならない。160 文字を超える description はページを無効とするため、この上限は常に満たされていること。

**Validates: Requirements 1.2, 1.3**

---

### Property 2: Feature Card 説明文の長さ制約

*For any* Feature Section 内の機能カード説明文要素、その文字数が 50 以上 120 以下であること（3 枚すべてのカードに適用）。

**Validates: Requirements 4.3**

---

### Property 3: Workflow Step 説明文の長さ制約

*For any* ワークフローセクション内のステップ説明文要素、その文字数が 30 以上であること（3 ステップすべてに適用）。

**Validates: Requirements 5.3**

---

### Property 4: CTA ボタンのリンク先整合性

*For any* CTA ボタン要素（Hero セクションおよび CTA セクション内のすべての CTA リンク）、`href` 属性が `https://kiro.dev` であり、`target="_blank"` および `rel` に `"noopener"` を含む値が設定されていること。

**Validates: Requirements 3.5, 6.4**

---

### Property 5: ナビゲーションアンカーの到達可能性

*For any* ナビゲーションリンク（`href="#features"` / `href="#how-to"` / `href="#cta"`）に対して、対応する `id` 属性を持つセクション要素がページ内に存在すること。

**Validates: Requirements 2.3, 2.4**

---

### Property 6: 画像・アイコン要素のアクセシビリティ属性

*For any* `<img>` 要素および意味を持つアイコン要素、意味のあるコンテンツを持つ場合は `alt` 属性（空でない）または `aria-label` が設定されており、装飾目的の場合は `alt=""` または `aria-hidden="true"` が設定されていること。すなわち、`alt` または `aria-hidden` の何れか一方は必ず存在すること。

**Validates: Requirements 9.1, 9.2**

---

### Property 7: 見出し階層の整合性

*For any* Landing_Page において、`<h1>` 要素がページ内にちょうど 1 つ存在すること、かつ見出しレベルがスキップされていないこと（例：`h1` の次に `h3` が来ることを禁ずる）。

**Validates: Requirements 9.3**

---

### Property 8: 外部リソースの制限

*For any* `src` 属性を持つ `<script>` 要素または `href` 属性を持つ `<link rel="stylesheet">` 要素、それが外部 URL を参照する場合、その URL は TailwindCSS CDN（`cdn.tailwindcss.com`）のみであること。追加の外部 JavaScript ライブラリや CSS ファイルは一切読み込まれていないこと。

**Validates: Requirements 10.1**

---

### Property 9: 外部画像への依存禁止と遅延読み込み

*For any* `<img>` 要素において、その `src` が外部 URL（`http://` または `https://` で始まる）を参照する場合、`loading="lazy"` 属性が設定されていること。また、アイコン類はインライン SVG またはテキスト（絵文字）として実装されており、外部画像ファイルへの依存がないこと。

**Validates: Requirements 10.2, 10.3**

---

## Error Handling

本ページは静的 HTML であり、実行時エラーは限定的だが、以下のケースを考慮する。

### TailwindCSS CDN 読み込み失敗

- **状況:** ネットワーク接続なし、または CDN 障害
- **影響:** スタイルが適用されない素の HTML が表示される
- **対応:** HTML の意味的構造（セマンティクス）を維持することで、スタイルなしでもコンテンツは読める状態を保つ。クリティカルなスタイル（コントラスト確保）はインライン `style` 属性で補足することを検討する

### JavaScript 無効環境

- **状況:** ユーザーが JS を無効化している
- **影響:** ハンバーガーメニューが機能しない
- **対応:** `<noscript>` タグでモバイル向けにナビリンクを常時表示するフォールバックを提供する。または CSS のみでチェックボックスハック等の代替実装を検討する

### 外部リンク切れ

- **状況:** `https://kiro.dev` が将来変更される場合
- **影響:** CTA ボタンが意図しないページへ遷移する
- **対応:** URL を HTML 内で集約管理し、変更時の修正箇所を最小化する（コメントで明示）

### 文字コード・フォント問題

- **状況:** 日本語フォントが端末にない場合
- **対応:** CSS の `font-family` に OS 標準の日本語フォントスタックを指定する
  ```css
  font-family: -apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN",
               "Hiragino Sans", Meiryo, sans-serif;
  ```

---

## Testing Strategy

本プロジェクトはビルドツールなしの単一 HTML ファイルであり、従来の自動テストフレームワークを直接適用することは困難である。そのため、以下の戦略を採用する。

### 静的検証（主要テスト手法）

#### HTML バリデーション

- W3C Markup Validator（`https://validator.w3.org`）でエラーゼロを確認
- 見出し階層（h1 → h2 → h3）のスキップがないことを確認

#### アクセシビリティ検証

- **Axe DevTools**（ブラウザ拡張）または **WAVE** で WCAG 2.1 AA 違反ゼロを確認
- キーボードナビゲーション（Tab キー）で全インタラクティブ要素にフォーカス到達可能であることを手動確認
- スクリーンリーダー（NVDA / macOS VoiceOver）での読み上げテストを推奨

#### コントラスト比検証

- **WebAIM Contrast Checker** でCTAボタン・フッターテキスト・フォーカスリングの 4.5:1（通常テキスト）/ 3:1（大テキスト・UI コンポーネント）を確認
- 具体的に確認が必要な配色ペア：
  - Hero CTA ボタン：テキスト色 vs ボタン背景色
  - CTA セクション ボタン：テキスト色 vs ボタン背景色
  - フッター：`text-gray-300` vs `bg-gray-900`

#### レスポンシブ検証

- Chrome DevTools のデバイスシミュレーターで以下の幅を確認：
  - 320px（最小幅）
  - 375px（iPhone SE）
  - 768px（md ブレークポイント境界）
  - 1280px（デスクトップ）
- 水平スクロールが発生しないこと、すべてのタップターゲットが 44×44px 以上であることを確認

### プロパティ検証（Correctness Properties の自動テスト）

本機能は静的 HTML ページであり、入力を受け取って出力を変換する純粋関数やデータ変換ロジックが存在しないため、ランダム入力を生成する汎用の PBT（Property-Based Testing）フレームワークによるテストは適切ではない。ただし、「全要素に対して成立すべき DOM 制約」は普遍的なプロパティとして DOM アサーションで検証できる。

ブラウザコンソールまたは HTML テストスクリプト（例：Jest + jsdom）で以下を実行する：

**Property 1: Meta Description の長さ制約**
```javascript
const desc = document.querySelector('meta[name="description"]').content;
console.assert(desc.length >= 1 && desc.length <= 160,
  `description length: ${desc.length}`);
```

**Property 2: Feature Card の説明文長さ（全カードに適用）**
```javascript
document.querySelectorAll('.feature-card p').forEach((p, i) => {
  const len = p.textContent.trim().length;
  console.assert(len >= 50 && len <= 120,
    `Card ${i} description length: ${len}`);
});
```

**Property 3: Workflow Step の説明文長さ（全ステップに適用）**
```javascript
document.querySelectorAll('.step-description').forEach((p, i) => {
  const len = p.textContent.trim().length;
  console.assert(len >= 30, `Step ${i} description length: ${len}`);
});
```

**Property 4: CTA ボタンのリンク先整合性（全 CTA ボタンに適用）**
```javascript
document.querySelectorAll('[data-cta]').forEach((a, i) => {
  console.assert(a.getAttribute('href') === 'https://kiro.dev',
    `CTA ${i} href: ${a.getAttribute('href')}`);
  console.assert(a.target === '_blank', `CTA ${i} target: ${a.target}`);
  console.assert(a.rel.includes('noopener'), `CTA ${i} rel: ${a.rel}`);
});
```

**Property 5: ナビゲーションアンカーの到達可能性（全ナビリンクに適用）**
```javascript
['features', 'how-to', 'cta'].forEach(id => {
  console.assert(document.getElementById(id) !== null,
    `Missing section: #${id}`);
});
```

**Property 6: 画像・アイコン要素のアクセシビリティ属性（全 img に適用）**
```javascript
document.querySelectorAll('img').forEach((img, i) => {
  const hasAlt = img.hasAttribute('alt');
  const hasAriaHidden = img.getAttribute('aria-hidden') === 'true';
  console.assert(hasAlt || hasAriaHidden,
    `img ${i} missing alt or aria-hidden`);
});
```

**Property 7: 見出し階層の整合性**
```javascript
const h1s = document.querySelectorAll('h1');
console.assert(h1s.length === 1, `h1 count: ${h1s.length}`);
// Check heading level order (no skips: h1→h2→h3 is OK, h1→h3 is not)
const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];
headings.forEach((h, i) => {
  if (i === 0) return;
  const prev = parseInt(headings[i-1].tagName[1]);
  const curr = parseInt(h.tagName[1]);
  console.assert(curr <= prev + 1, `Heading skip: h${prev} → h${curr}`);
});
```

**Property 8: 外部リソースの制限（全外部スクリプト・スタイルに適用）**
```javascript
document.querySelectorAll('script[src]').forEach((s, i) => {
  console.assert(s.src.includes('cdn.tailwindcss.com') || s.src === '',
    `Unexpected external script: ${s.src}`);
});
document.querySelectorAll('link[rel="stylesheet"]').forEach((l, i) => {
  console.assert(l.href.includes('cdn.tailwindcss.com'),
    `Unexpected external stylesheet: ${l.href}`);
});
```

**Property 9: 外部画像への依存禁止と遅延読み込み（全外部 img に適用）**
```javascript
document.querySelectorAll('img').forEach((img, i) => {
  if (img.src.startsWith('http')) {
    console.assert(img.loading === 'lazy',
      `External img ${i} missing loading="lazy": ${img.src}`);
  }
});
```

### パフォーマンス検証

- Chrome DevTools の Network タブで「Slow 3G」スロットリングを設定し、初期レンダリング（First Contentful Paint）が 3 秒以内であることを確認
- Lighthouse でパフォーマンス・アクセシビリティ・SEO スコアを計測（目標：各 90 以上）
- 外部リソースが TailwindCSS CDN のみであることをネットワークリクエスト一覧で確認

### 手動テストチェックリスト

```
[ ] タイトルが「Kiro – AWS が開発した AI 搭載 IDE」と表示される
[ ] lang="ja" が html タグに設定されている
[ ] ナビバーがスクロール中も上部に固定される
[ ] 768px未満でハンバーガーメニューが表示される
[ ] ハンバーガーメニューの開閉が正常に動作する
[ ] ナビリンクがスムーズスクロールで各セクションへ遷移する
[ ] Hero の CTA ボタンが https://kiro.dev を新しいタブで開く
[ ] Feature Section が 768px+ で 3 列グリッド表示になる
[ ] Feature Section が 768px未満で 1 列縦積み表示になる
[ ] How-to Section が 768px+ で横並び表示になる
[ ] How-to Section が 768px未満で縦積み表示になる
[ ] CTA セクションのボタンが https://kiro.dev を新しいタブで開く
[ ] フッターにダーク背景（gray-800 以上）が適用されている
[ ] 320px 幅で水平スクロールが発生しない
[ ] キーボードのみで全インタラクティブ要素に到達できる
[ ] Axe DevTools で WCAG 2.1 AA 違反がゼロ
[ ] Slow 3G で初期レンダリングが 3 秒以内
```

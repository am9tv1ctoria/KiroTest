# Implementation Plan: Kiro Landing Page

## Overview

`index.html` を単一の静的 HTML ファイルとして実装する。TailwindCSS CDN のみを外部依存とし、ビルドツール・フレームワーク・追加 JS ライブラリは使用しない。実装はセクションごとに段階的に進め、各ステップでアクセシビリティ・レスポンシブ・コントラスト要件を満たすことを確認する。

---

## Tasks

- [x] 1. HTML ドキュメント基盤とメタ情報の実装
  - `index.html` の `<html lang="ja">` 宣言、`<head>` セクション（charset / viewport / title / meta description / TailwindCSS CDN `<script>`）を実装する
  - title を「Kiro – AWS が開発した AI 搭載 IDE」に設定する
  - meta description を 1 文字以上 160 文字以内の日本語テキストで設定する
  - `scroll-behavior: smooth` を `html` 要素にインライン `<style>` または Tailwind の設定で適用する
  - 日本語フォントスタック（Hiragino / Meiryo / sans-serif）を `body` に設定する
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

  - [x]* 1.1 Property 1 の DOM アサーションテストを記述する
    - **Property 1: Meta Description の長さ制約**
    - ブラウザコンソールまたは Jest + jsdom で `meta[name="description"]` の `content` 長さが 1〜160 の範囲に収まることを検証するスクリプトを `tests/dom-properties.test.js` に記述する
    - **Validates: Requirements 1.2, 1.3**

  - [x]* 1.2 Property 8 の DOM アサーションテストを記述する
    - **Property 8: 外部リソースの制限**
    - `script[src]` および `link[rel="stylesheet"]` を走査し、TailwindCSS CDN 以外の外部リソースが存在しないことを検証するテストを `tests/dom-properties.test.js` に追記する
    - **Validates: Requirements 10.1**

- [x] 2. ナビゲーションバーの実装
  - `<header>` + `<nav>` を `sticky top-0` で実装し、左側にブランド名テキスト「Kiro」を配置する
  - デスクトップ（`md:` 以上）ではアンカーリンク「機能（`#features`）」「使い方（`#how-to`）」「ダウンロード（`#cta`）」を横並びで表示する
  - モバイル（768px 未満）ではハンバーガーアイコンボタンを表示し、ナビリンクを `hidden` クラスで非表示にする
  - ハンバーガーボタンに `id="menu-btn"` / `aria-expanded="false"` / `aria-controls="mobile-menu"` を設定し、モバイルメニュー要素に `id="mobile-menu"` を付与する
  - `<body>` 末尾にインライン `<script>` でハンバーガーメニューのトグルロジックを実装する（設計書の JavaScript スニペット参照）
  - `<noscript>` タグでモバイルナビリンクを常時表示するフォールバックを追加する
  - タップターゲット（ボタン・リンク）の高さ・幅を `min-h-[44px] min-w-[44px]` 以上に設定する
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 8.4_

  - [x]* 2.1 Property 5 の DOM アサーションテストを記述する
    - **Property 5: ナビゲーションアンカーの到達可能性**
    - `#features` / `#how-to` / `#cta` の各 `id` を持つ要素がページ内に存在することを検証するテストを `tests/dom-properties.test.js` に追記する
    - **Validates: Requirements 2.3, 2.4**

- [x] 3. ヒーローセクションの実装
  - `<section id="hero">` を `min-h-screen` で実装し、Navigation_Bar の直下に配置する
  - 2 色以上のカラーストップを持つ Tailwind グラデーションクラス（例: `from-indigo-900 via-indigo-700 to-purple-800`）で背景を設定する
  - `<h1>` タグで主要キャッチコピー（「Kiro – コードを書く時間より、設計に集中する時間を」）を表示する
  - 2〜3 文のサブコピーを `<p>` タグで表示する
  - `href="https://kiro.dev"` / `target="_blank"` / `rel="noopener noreferrer"` / `data-cta` 属性を持つ CTA ボタン「今すぐ無料でダウンロード」を実装する
  - ボタンのテキスト色と背景色のコントラスト比が WCAG 2.1 AA（4.5:1 以上）を満たす配色（例：白文字 `text-white` on `bg-indigo-600`）を適用する
  - モバイル（768px 未満）ではテキストとボタンを縦方向に中央揃え（`text-center flex flex-col items-center`）で配置する
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 9.5_

  - [x]* 3.1 Property 4 の DOM アサーションテストを記述する（Hero CTA）
    - **Property 4: CTA ボタンのリンク先整合性**
    - `[data-cta]` 要素の `href` が `https://kiro.dev`、`target` が `_blank`、`rel` に `noopener` を含むことを検証するテストを `tests/dom-properties.test.js` に追記する
    - **Validates: Requirements 3.5, 6.4**

- [x] 4. 主要機能紹介セクションの実装
  - `<section id="features">` を実装し、`<h2>` タグで「主要機能」見出しを表示する
  - 3 枚の機能カード（`feature-card` クラス付き `<div>`）を実装する：
    - カード 1: アイコン（インライン SVG または絵文字 📋 + `aria-hidden="true"`）・`<h3>` 機能名「Spec 駆動開発」・`<p>` 説明文（50〜120 字）
    - カード 2: アイコン（🤖 + `aria-hidden="true"`）・`<h3>`「自律型エージェント」・`<p>` 説明文（50〜120 字）
    - カード 3: アイコン（🔌 + `aria-hidden="true"`）・`<h3>`「MCP 対応」・`<p>` 説明文（50〜120 字）
  - デスクトップ（`md:` 以上）では `grid md:grid-cols-3 gap-6`、モバイルでは `grid-cols-1` でレイアウトする
  - 各アイコンに `aria-hidden="true"` を設定する
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 9.2_

  - [x]* 4.1 Property 2 の DOM アサーションテストを記述する
    - **Property 2: Feature Card 説明文の長さ制約**
    - `.feature-card p` を走査し、全カードの説明文長さが 50〜120 文字の範囲に収まることを検証するテストを `tests/dom-properties.test.js` に追記する
    - **Validates: Requirements 4.3**

- [x] 5. 使い方・ワークフローセクションの実装
  - `<section id="how-to">` を実装し、`<h2>` タグで「使い方」見出しを表示する
  - 3 ステップを `flex flex-col md:flex-row gap-8` コンテナ内に実装する：
    - ステップ 1: ステップ番号「01」・`<h3>` タイトル「Kiro をインストール」・`<p class="step-description">` 説明文（30 字以上）
    - ステップ 2: 番号「02」・`<h3>`「Spec を定義する」・`<p class="step-description">` 説明文（30 字以上）
    - ステップ 3: 番号「03」・`<h3>`「AI が実装を生成」・`<p class="step-description">` 説明文（30 字以上）
  - モバイル（768px 未満）では縦積み、デスクトップでは横並びになるよう `flex-col` / `md:flex-row` を適用する
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x]* 5.1 Property 3 の DOM アサーションテストを記述する
    - **Property 3: Workflow Step 説明文の長さ制約**
    - `.step-description` 要素を走査し、全ステップの説明文長さが 30 文字以上であることを検証するテストを `tests/dom-properties.test.js` に追記する
    - **Validates: Requirements 5.3**

- [x] 6. CTA セクションの実装
  - `<section id="cta">` をフッター直上に配置し、他セクションと視覚的に区切る背景色（例: `bg-indigo-50` または `bg-indigo-900`）を設定する
  - `<h2>` タグで「Kiro を無料で始める」見出しを表示する
  - `href="https://kiro.dev"` / `target="_blank"` / `rel="noopener noreferrer"` / `data-cta` 属性を持つ「ダウンロード」ボタンを実装する
  - ボタンのテキスト色と背景色のコントラスト比が WCAG 2.1 AA（4.5:1 以上）を満たす配色を適用する
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 7. フッターセクションの実装
  - `<footer>` を `bg-gray-900 text-gray-300` で実装し、ページ最下部に配置する
  - 著作権表示「© 2025 Amazon Web Services, Inc.」を含める
  - 「プライバシーポリシー」（`href="#"`）・「利用規約」（`href="#"`）・「GitHub」（`href="https://github.com/aws/kiro"`）のリンクを含める
  - フッター内テキスト（`text-gray-300`）と背景（`bg-gray-900`）のコントラスト比が WCAG 2.1 AA（4.5:1 以上）を満たすことを確認する
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 8. アクセシビリティとフォーカス管理の実装
  - 全インタラクティブ要素（ボタン・リンク）にキーボードフォーカスリング（Tailwind `focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500` 等、コントラスト比 3:1 以上）を設定する
  - 見出し階層を `h1` → `h2` → `h3` の順序で使用し、レベルスキップがないことを確認する（`h1` はページ内に 1 つのみ）
  - 意味を持つアイコン・画像に `alt` 属性または `aria-label` を設定し、装飾目的のアイコンに `aria-hidden="true"` を設定する
  - 全タップターゲット（ボタン・リンク）の高さ・幅が 44px 以上であることを確認する
  - 全テキストがコンテナからはみ出さず折り返されることを確認する（`break-words` / `overflow-hidden`）
  - _Requirements: 8.3, 8.4, 8.6, 9.1, 9.2, 9.3, 9.4_

  - [x]* 8.1 Property 6 の DOM アサーションテストを記述する
    - **Property 6: 画像・アイコン要素のアクセシビリティ属性**
    - `<img>` 要素を走査し、各要素に `alt` 属性または `aria-hidden="true"` の何れかが設定されていることを検証するテストを `tests/dom-properties.test.js` に追記する
    - **Validates: Requirements 9.1, 9.2**

  - [x]* 8.2 Property 7 の DOM アサーションテストを記述する
    - **Property 7: 見出し階層の整合性**
    - `h1` がページ内にちょうど 1 つ存在すること、見出しレベルがスキップされていないことを検証するテストを `tests/dom-properties.test.js` に追記する
    - **Validates: Requirements 9.3**

- [x] 9. レスポンシブレイアウトの調整と検証
  - 320px 以上のすべての画面幅で水平スクロールが発生しないよう `max-w-full overflow-x-hidden` を `body` に設定する
  - 全セクションで 640px 未満の画面幅においてフォントサイズが 14px 以上（Tailwind `text-sm` 相当 = 14px）を維持することを確認する
  - 全画像・メディア要素が `max-w-full` を持ちコンテナ幅を超えないことを確認する
  - Tailwind のブレークポイント（`sm:` / `md:` / `lg:`）のみでレスポンシブ実装されていることを確認する
  - _Requirements: 8.1, 8.2, 8.3, 8.5, 8.6_

  - [x]* 9.1 Property 9 の DOM アサーションテストを記述する
    - **Property 9: 外部画像への依存禁止と遅延読み込み**
    - 外部 URL を参照する `<img>` 要素に `loading="lazy"` が設定されていることを検証するテストを `tests/dom-properties.test.js` に追記する
    - **Validates: Requirements 10.2, 10.3**

- [x] 10. チェックポイント – すべての実装を結合して最終確認
  - すべてのセクション（Navigation_Bar → Hero → Features → How-to → CTA → Footer）が正しく結合されていることを確認する
  - インライン `<script>`（ハンバーガーメニュートグル）が `</body>` 直前に配置されていることを確認する
  - `tests/dom-properties.test.js` の全テストが Pass することを確認する
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- `*` が付いたサブタスクはオプションであり、MVP として素早く進める場合はスキップ可能
- 各タスクは対応する要件番号（Requirements X.Y）で追跡可能
- プロパティテストは Jest + jsdom または JSDOM 単体で実行可能（`npm init` + `npm install --save-dev jest jsdom jest-environment-jsdom` で環境構築）
- テスト環境を使わない場合、ブラウザコンソールで設計書の JavaScript スニペットを直接実行することで同等の検証が可能
- CTA ボタンには `data-cta` 属性を付与し、テストセレクターとして使用する
- Property 4 は Hero セクションと CTA セクション両方の CTA ボタンに対して適用される

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1", "3.1"] },
    { "id": 2, "tasks": ["4.1", "5.1", "8.1", "8.2"] },
    { "id": 3, "tasks": ["9.1"] }
  ]
}
```

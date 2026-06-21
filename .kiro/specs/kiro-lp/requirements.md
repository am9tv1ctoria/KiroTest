# Requirements Document

## Introduction

本ドキュメントは、AWS が開発した AI 搭載 IDE「Kiro」のランディングページ（LP）に関する要件を定義する。
ランディングページは既存の `index.html`（TailwindCSS CDN 使用）を改修する形で実装し、Kiro の主要機能・価値提案・導線をビジターに効果的に伝えることを目的とする。

対象技術スタック：HTML / TailwindCSS CDN（純粋な静的ファイル、ビルドツールなし）

---

## Glossary

- **Landing_Page**: `index.html` として配信される単一 HTML ファイルのランディングページ
- **Hero_Section**: ページ最上部に位置し、キャッチコピー・サブコピー・CTA ボタンを含むセクション
- **Feature_Section**: Kiro の主要機能（Spec 駆動開発・自律型エージェント・MCP 対応など）を紹介するセクション
- **CTA_Button**: 訪問者に特定のアクション（ダウンロード・詳細確認など）を促すボタン要素
- **Navigation_Bar**: ページ上部に固定表示されるナビゲーション要素
- **Footer_Section**: ページ最下部に位置し、リンクや著作権情報を含むセクション
- **Responsive_Layout**: デスクトップ・タブレット・モバイルの各ブレークポイントに対応したレイアウト
- **TailwindCSS**: CDN 経由で読み込む CSS ユーティリティフレームワーク
- **Visitor**: ランディングページを訪問するユーザー

---

## Requirements

### Requirement 1: ページ基本構造とメタ情報

**User Story:** Visitor として、適切なメタ情報を持つ構造化されたランディングページを見たい。そうすることで、Kiro が何であるかを一目で理解でき、ページが検索エンジンに正しくインデックスされる。

#### Acceptance Criteria

1. THE Landing_Page SHALL `<title>` タグに「Kiro – AWS が開発した AI 搭載 IDE」と設定する
2. THE Landing_Page SHALL `<meta name="description">` タグに Kiro の概要を 1 文字以上 160 文字以内で記述する
3. IF the `<meta name="description">` コンテンツが 160 文字を超える場合、THEN THE Landing_Page SHALL そのページを無効として description を表示しない
4. THE Landing_Page SHALL `lang="ja"` 属性を `<html>` タグに設定する
5. THE Landing_Page SHALL TailwindCSS を CDN 経由で読み込む
6. THE Landing_Page SHALL `<meta name="viewport" content="width=device-width, initial-scale=1.0">` を含む

---

### Requirement 2: ナビゲーションバー

**User Story:** Visitor として、ページ上部に明確なナビゲーションバーが欲しい。そうすることで、手動でスクロールせずに各セクションへ素早く移動できる。

#### Acceptance Criteria

1. THE Navigation_Bar SHALL スクロール中もページ上部に固定表示される
2. THE Navigation_Bar SHALL Kiro のロゴまたはブランド名テキストを左側に表示する
3. THE Navigation_Bar SHALL 「機能」「使い方」「ダウンロード」へのアンカーリンクを含む
4. WHEN a Visitor clicks any navigation link, THE Navigation_Bar SHALL スムーズスクロールで対象セクションへ遷移する
5. WHILE the page is viewed on a screen narrower than 768px, THE Navigation_Bar SHALL ハンバーガーメニューアイコンを表示し、通常のナビゲーションリンクを非表示にする
6. WHEN a Visitor taps the hamburger menu icon on a screen narrower than 768px, THE Navigation_Bar SHALL ナビゲーションリンクを展開表示し、再度タップすると折りたたむ

---

### Requirement 3: ヒーローセクション

**User Story:** Visitor として、Kiro の核心となる価値提案をすぐに理解したい。そうすることで、さらに詳しく調べるかどうかを判断できる。

#### Acceptance Criteria

1. THE Hero_Section SHALL ページ上部（Navigation_Bar の直下）に配置され、初期ビューポート高さ（100vh）以内に収まる
2. THE Hero_Section SHALL 主要キャッチコピー（例：「Kiro – コードを書く時間より、設計に集中する時間を」）を `<h1>` タグで表示する
3. THE Hero_Section SHALL Kiro の価値提案を 2〜3 文のサブコピーとして表示する
4. THE Hero_Section SHALL 「今すぐ無料でダウンロード」ラベルを持つ CTA_Button を 1 つ以上含む
5. WHEN a Visitor clicks the CTA_Button in the Hero_Section, THE Landing_Page SHALL Kiro の公式ダウンロードページ（`https://kiro.dev`）へ新しいタブで遷移する
6. THE Hero_Section SHALL 2 色以上のカラーストップを持つ CSS グラデーション背景を適用する
7. WHILE the page is viewed on a screen narrower than 768px, THE Hero_Section SHALL テキストとボタンを縦方向に中央揃えで配置する

---

### Requirement 4: 主要機能の紹介セクション

**User Story:** Visitor として、Kiro の主要機能をわかりやすく説明されたものを見たい。そうすることで、技術的な機能と開発ワークフローへのメリットを理解できる。

#### Acceptance Criteria

1. THE Feature_Section SHALL 「主要機能」または同等の見出しを `<h2>` タグで表示する
2. THE Feature_Section SHALL 以下の 3 つの機能を個別のカードとして表示する：
   - **Spec 駆動開発**: 要件定義 → 設計 → タスク生成を自動化する機能
   - **自律型エージェント**: コードの記述・テスト・修正を自律的に実行するエージェント
   - **MCP（Model Context Protocol）対応**: 外部ツールやサービスとの連携を可能にするプロトコル対応
3. THE Feature_Section SHALL 各カードにアイコン（SVG または絵文字）・機能名・説明文（50 字以上 120 字以下、各機能の目的に関連する内容）を含める
4. WHILE the page is viewed on a screen of 768px or wider, THE Feature_Section SHALL 機能カードを 3 列グリッドで表示する
5. WHILE the page is viewed on a screen narrower than 768px, THE Feature_Section SHALL 機能カードを 1 列に縦積みで表示する

---

### Requirement 5: 使い方・ワークフロー紹介セクション

**User Story:** Visitor として、Kiro の始め方を理解したい。そうすることで、オンボーディングの流れをイメージし、導入への心理的ハードルを下げることができる。

#### Acceptance Criteria

1. THE Landing_Page SHALL 「使い方」または「始め方」見出し（`<h2>` タグ）と `id` アンカー属性を持つワークフローセクションを含む
2. THE Landing_Page SHALL 以下の 3 ステップを番号付きリストまたはステップカードで表示する：
   - ステップ 1: Kiro をダウンロード・インストール
   - ステップ 2: プロジェクトを開き、Spec を定義
   - ステップ 3: AI エージェントが実装を自動生成
3. THE Landing_Page SHALL 各ステップにステップ番号・タイトル・説明文（30 字以上）を含める
4. WHILE the page is viewed on a screen of 768px or wider, THE Landing_Page SHALL ステップを横並びで表示する
5. WHILE the page is viewed on a screen narrower than 768px, THE Landing_Page SHALL ステップを縦方向に積み重ねて表示する

---

### Requirement 6: CTA（コール・トゥ・アクション）セクション

**User Story:** ページを読み終えた Visitor として、ページ下部付近に目立つ CTA セクションが欲しい。そうすることで、Kiro をダウンロードまたは試す次のステップに簡単に進むことができる。

#### Acceptance Criteria

1. THE Landing_Page SHALL Footer_Section の直上に、他のセクションと視覚的に区切られた独立した CTA セクションを含む
2. THE Landing_Page SHALL CTA セクションに「Kiro を無料で始める」という主要見出しを表示する
3. THE Landing_Page SHALL CTA セクションに「ダウンロード」ラベルを持つボタンを含む
4. WHEN a Visitor clicks the download button in the CTA section, THE Landing_Page SHALL `https://kiro.dev` へ新しいタブで遷移する
5. THE Landing_Page SHALL CTA セクションのボタンテキストと背景のコントラスト比が WCAG 2.1 AA 基準（4.5:1 以上）を満たす背景色またはグラデーションを適用する

---

### Requirement 7: フッターセクション

**User Story:** Visitor として、必要なリンクと著作権情報を含むフッターが欲しい。そうすることで、法的情報や追加リソースを簡単に見つけることができる。

#### Acceptance Criteria

1. THE Footer_Section SHALL ページ最下部に配置される
2. THE Footer_Section SHALL 著作権表示（例：「© 2025 Amazon Web Services, Inc.」）を含む
3. THE Footer_Section SHALL 「プライバシーポリシー」「利用規約」「GitHub」のリンクを含む
4. THE Footer_Section SHALL 背景色としてダークグレー（Tailwind `gray-800` 相当以上）またはブラックを適用し、ページ本文の背景色に関わらず常にダーク背景を維持する
5. THE Footer_Section SHALL フッター内のテキストと背景のコントラスト比が WCAG 2.1 AA 基準（4.5:1 以上）を満たす

---

### Requirement 8: レスポンシブデザイン

**User Story:** モバイルデバイスやタブレットを使用する Visitor として、ランディングページが自分の画面に正しく表示されてほしい。そうすることで、水平スクロールやレイアウト崩れなしにコンテンツを読んで操作できる。

#### Acceptance Criteria

1. THE Responsive_Layout SHALL 320px 以上のすべての画面幅で水平スクロールが発生しない
2. THE Responsive_Layout SHALL TailwindCSS のブレークポイント（`sm:` / `md:` / `lg:`）を使用して実装される
3. WHILE the page is viewed on a screen narrower than 640px, THE Responsive_Layout SHALL すべてのフォントサイズが 14px 以上を維持する
4. THE Responsive_Layout SHALL タップターゲット（ボタン・リンク）の高さおよび幅を 44px 以上に設定する
5. THE Responsive_Layout SHALL すべての画像およびメディア要素がコンテナ幅を超えないようにする
6. THE Responsive_Layout SHALL テキストコンテンツが折り返され、コンテナからはみ出さないようにする

---

### Requirement 9: アクセシビリティ

**User Story:** 支援技術を使用する Visitor として、ランディングページが基本的なアクセシビリティ標準に準拠してほしい。そうすることで、能力に関わらずコンテンツをナビゲートして理解できる。

#### Acceptance Criteria

1. THE Landing_Page SHALL コンテンツを持つすべての画像・アイコン要素に `alt` 属性または `aria-label` を設定する
2. THE Landing_Page SHALL 装飾目的の画像・アイコン要素に `alt=""` または `aria-hidden="true"` を設定する
3. THE Landing_Page SHALL `h1` をページ内に 1 つのみ使用し、見出しレベルをスキップしない（例：`h1` → `h3` は不可）
4. WHILE an interactive element (button or link) has keyboard focus, THE Landing_Page SHALL コントラスト比 3:1 以上のフォーカスリングを表示する
5. THE CTA_Button SHALL テキストと背景のコントラスト比が WCAG 2.1 AA 基準（4.5:1 以上）を満たす

---

### Requirement 10: パフォーマンス

**User Story:** 低速ネットワークを使用する Visitor として、ランディングページが適切な速度で読み込まれてほしい。そうすることで、コンテンツが表示される前にページを離脱せずに済む。

#### Acceptance Criteria

1. THE Landing_Page SHALL 外部リソースの読み込みを TailwindCSS CDN のみに限定し、追加の JavaScript ライブラリを読み込まない
2. THE Landing_Page SHALL インライン SVG またはテキストベースのアイコン（絵文字）を使用し、外部画像ファイルへの依存を禁止する
3. IF an `<img>` タグが外部 URL を参照する場合、THEN THE Landing_Page SHALL その `<img>` タグに `loading="lazy"` 属性を設定する
4. IF an external image has no inline alternative, THEN THE Landing_Page SHALL その外部画像を使用しない
5. THE Landing_Page SHALL 低速 3G ネットワーク環境（≤50 kbps）において初期レンダリングが 3 秒以内に完了する

/**
 * DOM Properties Tests for Kiro Landing Page
 * Uses Jest + jsdom to validate DOM constraints defined in the design document.
 *
 * Note: We use innerHTML on document.documentElement to avoid re-executing
 * inline <script> tags on each test, which would cause re-declaration errors
 * in jsdom's shared JS scope across beforeEach calls.
 */

const fs = require('fs');
const path = require('path');

// Load index.html once for all tests
const html = fs.readFileSync(
  path.resolve(__dirname, '../index.html'),
  'utf-8'
);

// Extract just the <html> inner content without re-running scripts.
// We set it via innerHTML to avoid script execution issues in jsdom.
beforeAll(() => {
  // Strip <script> tags before injecting to prevent re-declaration errors
  // in jsdom when scripts use const/let at top level within an IIFE.
  // DOM structure tests do not require script execution.
  const stripped = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  document.documentElement.innerHTML = stripped.match(/<html[^>]*>([\s\S]*)<\/html>/i)?.[1] ?? stripped;
});

// ---------------------------------------------------------------------------
// Property 1: Meta Description の長さ制約
// Validates: Requirements 1.2, 1.3
// ---------------------------------------------------------------------------
describe('Property 1: Meta Description の長さ制約', () => {
  /**
   * For any Landing_Page, the content of <meta name="description"> must be
   * between 1 and 160 characters (inclusive).
   *
   * Validates: Requirements 1.2, 1.3
   */
  test('meta[name="description"] の content が 1 文字以上 160 文字以内であること', () => {
    const meta = document.querySelector('meta[name="description"]');
    expect(meta).not.toBeNull();

    const content = meta.getAttribute('content') || '';
    expect(content.length).toBeGreaterThanOrEqual(1);
    expect(content.length).toBeLessThanOrEqual(160);
  });
});

// ---------------------------------------------------------------------------
// Property 8: 外部リソースの制限
// Validates: Requirements 10.1
// ---------------------------------------------------------------------------
describe('Property 8: 外部リソースの制限', () => {
  /**
   * For any <script src="..."> or <link rel="stylesheet" href="...">,
   * if the URL is external, it must be the TailwindCSS CDN only
   * (cdn.tailwindcss.com). No additional external JS libraries or
   * CSS files are loaded.
   *
   * Validates: Requirements 10.1
   */
  test('外部 script[src] は TailwindCSS CDN のみであること', () => {
    // Check the raw HTML for external scripts (before stripping)
    const scriptSrcMatches = [...html.matchAll(/<script\s+src=["']([^"']+)["']/gi)];
    scriptSrcMatches.forEach(([, src]) => {
      if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
        expect(src).toMatch(/cdn\.tailwindcss\.com/);
      }
    });
  });

  test('外部 link[rel="stylesheet"] は TailwindCSS CDN のみであること', () => {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach((l) => {
      const href = l.getAttribute('href') || '';
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
        expect(href).toMatch(/cdn\.tailwindcss\.com/);
      }
    });
  });
});

// ---------------------------------------------------------------------------
// Property 5: ナビゲーションアンカーの到達可能性
// Validates: Requirements 2.3, 2.4
// ---------------------------------------------------------------------------
describe('Property 5: ナビゲーションアンカーの到達可能性', () => {
  /**
   * For each navigation link (href="#features", "#how-to", "#cta"),
   * a corresponding element with that id must exist in the page.
   *
   * Validates: Requirements 2.3, 2.4
   */
  test('id="features" を持つセクション要素がページ内に存在すること', () => {
    expect(document.getElementById('features')).not.toBeNull();
  });

  test('id="how-to" を持つセクション要素がページ内に存在すること', () => {
    expect(document.getElementById('how-to')).not.toBeNull();
  });

  test('id="cta" を持つセクション要素がページ内に存在すること', () => {
    expect(document.getElementById('cta')).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Property 4: CTA ボタンのリンク先整合性（Hero CTA）
// Validates: Requirements 3.5, 6.4
// ---------------------------------------------------------------------------
describe('Property 4: CTA ボタンのリンク先整合性', () => {
  /**
   * For any CTA button element ([data-cta]), the href attribute must be
   * "https://kiro.dev", target must be "_blank", and rel must contain
   * "noopener".
   *
   * Validates: Requirements 3.5, 6.4
   */
  test('[data-cta] 要素が少なくとも 1 つ存在すること', () => {
    const ctaElements = document.querySelectorAll('[data-cta]');
    expect(ctaElements.length).toBeGreaterThanOrEqual(1);
  });

  test('[data-cta] の href が https://kiro.dev であること', () => {
    const ctaElements = document.querySelectorAll('[data-cta]');
    ctaElements.forEach((a) => {
      expect(a.getAttribute('href')).toBe('https://kiro.dev');
    });
  });

  test('[data-cta] の target が _blank であること', () => {
    const ctaElements = document.querySelectorAll('[data-cta]');
    ctaElements.forEach((a) => {
      expect(a.getAttribute('target')).toBe('_blank');
    });
  });

  test('[data-cta] の rel に noopener が含まれること', () => {
    const ctaElements = document.querySelectorAll('[data-cta]');
    ctaElements.forEach((a) => {
      const rel = a.getAttribute('rel') || '';
      expect(rel).toMatch(/noopener/);
    });
  });
});

// ---------------------------------------------------------------------------
// Property 2: Feature Card 説明文の長さ制約
// Validates: Requirements 4.3
// ---------------------------------------------------------------------------
describe('Property 2: Feature Card 説明文の長さ制約', () => {
  /**
   * For any Feature Section, all .feature-card p elements must have
   * text content between 50 and 120 characters (inclusive).
   *
   * Validates: Requirements 4.3
   */
  test('.feature-card p 要素が少なくとも 3 つ存在すること', () => {
    const cards = document.querySelectorAll('.feature-card p');
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  test('全 .feature-card p の説明文が 50 文字以上 120 文字以下であること', () => {
    const cards = document.querySelectorAll('.feature-card p');
    cards.forEach((p, i) => {
      const len = p.textContent.trim().length;
      expect(len).toBeGreaterThanOrEqual(50);
      expect(len).toBeLessThanOrEqual(120);
    });
  });
});

// ---------------------------------------------------------------------------
// Property 3: Workflow Step 説明文の長さ制約
// Validates: Requirements 5.3
// ---------------------------------------------------------------------------
describe('Property 3: Workflow Step 説明文の長さ制約', () => {
  /**
   * For any workflow step description element (.step-description),
   * the text content must be 30 characters or more (applied to all 3 steps).
   *
   * Validates: Requirements 5.3
   */
  test('.step-description 要素が少なくとも 3 つ存在すること', () => {
    const steps = document.querySelectorAll('.step-description');
    expect(steps.length).toBeGreaterThanOrEqual(3);
  });

  test('全 .step-description の文字数が 30 文字以上であること', () => {
    const steps = document.querySelectorAll('.step-description');
    steps.forEach((p, i) => {
      const len = p.textContent.trim().length;
      expect(len).toBeGreaterThanOrEqual(30);
    });
  });
});

// ---------------------------------------------------------------------------
// Property 6: 画像・アイコン要素のアクセシビリティ属性
// Validates: Requirements 9.1, 9.2
// ---------------------------------------------------------------------------
describe('Property 6: 画像・アイコン要素のアクセシビリティ属性', () => {
  /**
   * For any <img> element, each must have either an alt attribute or
   * aria-hidden="true" set (decorative images use aria-hidden="true",
   * meaningful images use a non-empty alt attribute).
   *
   * Validates: Requirements 9.1, 9.2
   */
  test('全 <img> 要素に alt または aria-hidden="true" が設定されていること', () => {
    const images = document.querySelectorAll('img');
    images.forEach((img, i) => {
      const hasAlt = img.hasAttribute('alt');
      const hasAriaHidden = img.getAttribute('aria-hidden') === 'true';
      expect(hasAlt || hasAriaHidden).toBe(true);
    });
  });
});

// ---------------------------------------------------------------------------
// Property 7: 見出し階層の整合性
// Validates: Requirements 9.3
// ---------------------------------------------------------------------------
describe('Property 7: 見出し階層の整合性', () => {
  /**
   * For any Landing_Page, there must be exactly one <h1> element, and
   * heading levels must not be skipped (e.g., h1 → h3 without h2 is invalid).
   *
   * Validates: Requirements 9.3
   */
  test('h1 要素がページ内にちょうど 1 つ存在すること', () => {
    const h1s = document.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
  });

  test('見出しレベルがスキップされていないこと', () => {
    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];
    headings.forEach((h, i) => {
      if (i === 0) return;
      const prev = parseInt(headings[i - 1].tagName[1]);
      const curr = parseInt(h.tagName[1]);
      expect(curr).toBeLessThanOrEqual(prev + 1);
    });
  });
});

// ---------------------------------------------------------------------------
// Property 9: 外部画像への依存禁止と遅延読み込み
// Validates: Requirements 10.2, 10.3
// ---------------------------------------------------------------------------
describe('Property 9: 外部画像への依存禁止と遅延読み込み', () => {
  test('外部 URL を参照する <img> 要素に loading="lazy" が設定されていること', () => {
    const images = document.querySelectorAll('img');
    images.forEach((img, i) => {
      const src = img.getAttribute('src') || '';
      if (src.startsWith('http://') || src.startsWith('https://')) {
        expect(img.getAttribute('loading')).toBe('lazy');
      }
    });
  });
});

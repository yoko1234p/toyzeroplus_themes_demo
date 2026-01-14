#!/usr/bin/env node
/**
 * Shopify Theme Generator
 * 將 Vite build 嘅 output 轉換成 Shopify themes
 */

import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const THEMES = ['dark', 'light', 'card', 'seal', 'company'];

const THEME_CONFIGS = {
  dark: {
    bgColor: '#050505',
    themeColor: '#dc2626',
    bodyClass: 'theme-dark',
    fontFamily: 'Noto Serif TC',
  },
  light: {
    bgColor: '#f4f4f0',
    themeColor: '#991b1b',
    bodyClass: 'theme-light',
    fontFamily: 'Noto Serif TC',
  },
  card: {
    bgColor: '#F9F9F9',
    themeColor: '#C83F49',
    bodyClass: 'theme-card',
    fontFamily: 'Noto Serif TC',
  },
  seal: {
    bgColor: '#F9F9F9',
    themeColor: '#C83F49',
    bodyClass: 'theme-seal',
    fontFamily: 'Noto Serif TC',
  },
  company: {
    bgColor: '#F9F9F9',
    themeColor: '#C83F49',
    bodyClass: 'theme-company',
    fontFamily: 'Noto Serif TC',
  }
};

function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function generateThemeLiquid(themeName) {
  const config = THEME_CONFIGS[themeName];
  return `<!DOCTYPE html>
<html class="no-js" lang="{{ request.locale.iso_code }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="${config.themeColor}">
  <link rel="canonical" href="{{ canonical_url }}">

  {%- if settings.favicon != blank -%}
    <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
  {%- endif -%}

  <title>
    {{ page_title }}
    {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
    {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
    {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
  </title>

  {%- if page_description -%}
    <meta name="description" content="{{ page_description | escape }}">
  {%- endif -%}

  <!-- 快樂印刷 Theme: ${themeName.charAt(0).toUpperCase() + themeName.slice(1)} Mode -->
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  {{ 'base.css' | asset_url | stylesheet_tag }}

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700;900&display=swap" rel="stylesheet">

  {{ content_for_header }}

  <script>
    document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
    window.THEME_MODE = '${themeName}';
  </script>
</head>

<body class="${config.bodyClass}" style="background-color: ${config.bgColor};">
  <a class="skip-to-content-link visually-hidden" href="#MainContent">
    {{ "accessibility.skip_to_content" | t }}
  </a>

  <div id="app">
    {{ content_for_layout }}
  </div>

  {{ 'theme-${themeName}.js' | asset_url | script_tag }}
</body>
</html>
`;
}

function generateIndexLiquid() {
  return `{% comment %}
  快樂印刷 - Index Template
  This template renders the React application
{% endcomment %}

<div id="MainContent" class="main-content">
  <div id="react-root" data-page="index"></div>
</div>

{% schema %}
{
  "name": "主頁",
  "settings": []
}
{% endschema %}
`;
}

function generateProductLiquid() {
  return `{% comment %}
  快樂印刷 - Product Template
{% endcomment %}

<div id="MainContent" class="main-content">
  <div id="react-root" data-page="product" data-product-id="{{ product.id }}"></div>
</div>

{% schema %}
{
  "name": "產品頁",
  "settings": []
}
{% endschema %}
`;
}

function generateSettingsSchema() {
  return JSON.stringify([
    {
      name: "theme_info",
      theme_name: "快樂印刷",
      theme_version: "1.0.0",
      theme_author: "Happy Printing",
      theme_documentation_url: "https://github.com/happy-printing",
      theme_support_url: "https://github.com/happy-printing/support"
    },
    {
      name: "通用設定",
      settings: [
        {
          type: "image_picker",
          id: "favicon",
          label: "網站圖標"
        },
        {
          type: "image_picker",
          id: "logo",
          label: "Logo 圖片"
        }
      ]
    }
  ], null, 2);
}

function generateLocaleJson() {
  return JSON.stringify({
    "general": {
      "accessibility": {
        "skip_to_content": "跳至內容"
      }
    },
    "products": {
      "product": {
        "add_to_cart": "加入購物車",
        "buy_now": "立即購買"
      }
    },
    "cart": {
      "title": "購物車"
    }
  }, null, 2);
}

async function buildThemes() {
  console.log('🎨 Building Shopify themes...\n');

  // 確保 dist-shopify 目錄存在
  const distShopify = join(projectRoot, 'dist-shopify');
  ensureDir(distShopify);

  // 讀取 Vite build output
  const distDir = join(projectRoot, 'dist');
  const distAssets = join(distDir, 'assets');

  if (!existsSync(distAssets)) {
    console.log('⚠️  No dist/assets found. Running build first...');
    execSync('npm run build', { cwd: projectRoot, stdio: 'inherit' });
  }

  // 搵 JS 文件
  const { readdirSync } = await import('fs');
  const assetFiles = readdirSync(distAssets);
  const jsFile = assetFiles.find(f => f.endsWith('.js'));

  if (!jsFile) {
    console.error('❌ Could not find JS file in dist/assets');
    process.exit(1);
  }

  console.log(`📦 Found assets: ${jsFile}\n`);

  const jsContent = readFileSync(join(distAssets, jsFile), 'utf-8');

  // 生成 base CSS（包含自定義字體同基本樣式）
  const baseCssContent = `
/* 自定義字體 - 龍蝦快樂 */
@font-face {
  font-family: 'LHKK';
  src: url('{{ "LHKK7000v1.04.ttf" | asset_url }}') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@keyframes flicker {
  0%, 18%, 22%, 25%, 53%, 57%, 100% { text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #ff00de, 0 0 80px #ff00de, 0 0 90px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de; }
  20%, 24%, 55% { text-shadow: none; }
}

.neon-flicker {
  animation: flicker 3s infinite alternate;
}

.writing-vertical {
  writing-mode: vertical-rl;
}

.writing-vertical-rl {
  writing-mode: vertical-rl;
}

.font-lhkk {
  font-family: 'LHKK', 'Noto Serif TC', serif;
}

.wkw-gradient {
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(20,0,0,0.4), rgba(0,20,20,0.6));
}

/* Marker Highlight Animation */
.highlight-text,
.card-highlight-text {
  background: linear-gradient(120deg, rgba(176, 141, 87, 0.35) 0%, rgba(212, 175, 55, 0.35) 100%);
  background-repeat: no-repeat;
  background-size: 0% 100%;
  background-position: 0 88%;
  transition: background-size 0.4s ease;
  padding: 2px 4px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.group:hover .highlight-text,
.group:hover .card-highlight-text {
  background-size: 100% 40%;
}

.product-highlight-text {
  background: linear-gradient(120deg, rgba(176, 141, 87, 0.35) 0%, rgba(212, 175, 55, 0.35) 100%);
  background-repeat: no-repeat;
  background-size: 100% 40%;
  background-position: 0 88%;
  padding: 2px 4px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
`;

  for (const themeName of THEMES) {
    console.log(`🔨 Building theme-${themeName}...`);

    const themeDir = join(distShopify, `theme-${themeName}`);

    // 清理並重建目錄
    if (existsSync(themeDir)) {
      rmSync(themeDir, { recursive: true });
    }

    // 創建目錄結構
    ensureDir(join(themeDir, 'assets'));
    ensureDir(join(themeDir, 'config'));
    ensureDir(join(themeDir, 'layout'));
    ensureDir(join(themeDir, 'locales'));
    ensureDir(join(themeDir, 'templates'));

    // 寫入文件
    writeFileSync(join(themeDir, 'layout', 'theme.liquid'), generateThemeLiquid(themeName));
    writeFileSync(join(themeDir, 'templates', 'index.liquid'), generateIndexLiquid());
    writeFileSync(join(themeDir, 'templates', 'product.liquid'), generateProductLiquid());
    writeFileSync(join(themeDir, 'config', 'settings_schema.json'), generateSettingsSchema());
    writeFileSync(join(themeDir, 'locales', 'zh-TW.default.json'), generateLocaleJson());
    writeFileSync(join(themeDir, 'assets', 'base.css'), baseCssContent);
    writeFileSync(join(themeDir, 'assets', `theme-${themeName}.js`), jsContent);

    // 複製字體文件
    const fontsDir = join(projectRoot, 'public', 'fonts');
    if (existsSync(join(fontsDir, 'LHKK7000v1.04.ttf'))) {
      copyFileSync(join(fontsDir, 'LHKK7000v1.04.ttf'), join(themeDir, 'assets', 'LHKK7000v1.04.ttf'));
    }

    // 創建 zip
    const zipPath = join(distShopify, `theme-${themeName}.zip`);
    if (existsSync(zipPath)) {
      rmSync(zipPath);
    }
    execSync(`cd "${themeDir}" && zip -r "../theme-${themeName}.zip" .`, { stdio: 'pipe' });

    console.log(`   ✅ theme-${themeName} created`);
  }

  console.log('\n🎉 All Shopify themes built successfully!');
  console.log(`📁 Output: ${distShopify}`);
}

buildThemes().catch(console.error);

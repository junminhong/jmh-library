---
slug: upgrade-docusaurus-v3
title: 來升級到Docusaurus v3
authors: [junminhong]
tags: [docusaurus, upgrade, v3]
---

## 起由
最近看到[docusaurus](https://docusaurus.io/)發表了v3版本, 身為一個追求最新版的愛好者, 當然要來處理一下拉

這個版本除了MDX升級以外, 也淘汰了Node.js 16, 所以在升級前要確保目前使用的是Node.js 18.0+

## 首先呢, 要來做套件升級
```json
 {
   "dependencies": {
     // upgrade to Docusaurus v3
-    "@docusaurus/core": "2.4.3",
-    "@docusaurus/preset-classic": "2.4.3",
+    "@docusaurus/core": "3.0.0",
+    "@docusaurus/preset-classic": "3.0.0",
     // upgrade to MDX v3
-    "@mdx-js/react": "^1.6.22",
+    "@mdx-js/react": "^3.0.0",
     // upgrade to prism-react-renderer v2.0+
-    "prism-react-renderer": "^1.3.5",
+    "prism-react-renderer": "^2.1.0",
     // upgrade to React v18.0+
-    "react": "^17.0.2",
-    "react-dom": "^17.0.2"
+    "react": "^18.2.0",
+    "react-dom": "^18.2.0"
   },
   "devDependencies": {
     // upgrade Docusaurus dev dependencies to v3
-    "@docusaurus/module-type-aliases": "2.4.3"
-    "@docusaurus/types": "2.4.3"
+    "@docusaurus/module-type-aliases": "3.0.0"
+    "@docusaurus/types": "3.0.0"
   }
   "engines": {
     // require Node.js 18.0+
-    "node": ">=16.14"
+    "node": ">=18.0"
   }
 }
```
```bash
# 將新版本套件進行安裝
yarn install
```

## 有遇到的問題
### Cause: Cannot find module 'prism-react-renderer/themes/github'
主要是在升級prism-react-renderer後, 匯入主題的用法有更新所導致的

```js
// docusaurus.config.js
- const lightTheme = require('prism-react-renderer/themes/github');
- const darkTheme = require('prism-react-renderer/themes/dracula');
+ const {themes} = require('prism-react-renderer');
+ const lightTheme = themes.github;
+ const darkTheme = themes.dracula;
```

從v2開始預設包含的語言更少, 需要根據自己的需求添加
```js
// docusaurus.config.js
const siteConfig = {
  themeConfig: {
    prism: {
      additionalLanguages: ['bash', 'diff', 'json'],
    },
  },
};
```


## 結語
筆者用到的東西較少, 所以更新起來遇到的問題也不多, 但基本上官方文件其實寫的蠻清楚的, 如果有遇到錯誤不仿可以參考一下官方文件


## 參考資料
- [https://docusaurus.io/docs/migration/v3](https://docusaurus.io/docs/migration/v3)
- [https://nodejs.org/en/blog/announcements/nodejs16-eol](https://nodejs.org/en/blog/announcements/nodejs16-eol)
---
slug: install-docusaurus
title: 來安裝潮潮的部落格 - Docusaurus
authors: [junminhong]
tags: [docusaurus]
---

### 起由
原本的blog, 因為domain忘記續約, 加上換個domain的關係, 想說徹底來換一套新的blog framework.

剛好之前有關注到Facebook團隊有推出一套[docusaurus](https://docusaurus.io/)

### 重頭戲
其實安裝[docusaurus](https://docusaurus.io/)不難, 基本上照著官方教學走就可以建置出基本的網站了。

我個人比較喜歡用**yarn**, 所以安裝步驟都會以**yarn**為主
- 安裝[docusaurus](https://docusaurus.io/)
```
yarn create docusaurus
```

### [建議] 搭配 Tailwind CSS
個人蠻愛用[tailwind](https://tailwindcss.com/), 所以就乾脆整合再一起, 以利接下來的版面優化。
- 安裝tailwind css package
```zsh
yarn add tailwindcss postcss autoprefixer
```
- 初始化tailwind, 創建tailwind.config.js
```zsh
npx tailwindcss init
```
- 你會獲得一個tailwind.config.js, 複製以下內容
```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
```
- 把tailwind css 放進去 custom.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Deploy
這邊直接使用vertical


### domain
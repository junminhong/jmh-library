---
slug: eslint
title: "[Next.js] 規範專案程式碼利器 - ESLint"
tags: [javascript, eslint, husky, prettier, lint-staged]
---

## 為什麼要規範專案的程式碼呢？
因為每個人寫程式碼的風格都不太一樣, 如果沒有加以規範的話, 很容易讓專案整體程式碼變的很難閱讀

那此時有些人會想說專案我自己一個人開發還需要這些規範嗎?

筆者的建議不管是幾個人在開發, 通通都先加上規範再說, 因為自己在開發雖然思維一致, 但沒有固定的規則在撰寫時, 很容易因為天馬行空的想法導致未來想在閱讀自己程式碼時會感到困惑

廢話不多說, 馬上進入實作環節
## 設定eslint
首先我們要先安裝[eslint](https://eslint.org/), 但由於筆者這邊使用[Next.js](https://nextjs.org/)在建立好專案後, 專案內部就會出現`.eslintrc.json`, 所以可以省略`eslint`的安裝步驟

```bash
yarn add --dev eslint-config-prettier
# 因為筆者有使用tailwind, 所以有順邊裝相關的plugin
yarn add --dev eslint-plugin-tailwindcss
```
```json
// .eslintrc.json

{
  "extends": [
    "next/core-web-vitals",
    "prettier",
     // 由於筆者有使用tailwind, 所以有裝相關的lint套件
    "plugin:tailwindcss/recommended"
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true,
    "mocha": true
  },
  "settings": {
    "tailwindcss": {
      "config": "./tailwind.config.js"
    }
  },
  "plugins": ["tailwindcss"],
  // 自訂自己想要的規則
  "rules": {
    "max-len": ["error", 120]
  }
}
```


## 安裝prettier
```bash
yarn add --dev prettier
```

```json
// .prettierrc

{
  // 最後面要不要有分號
  "semi": false,
  // 要不要使用單引號
  "singleQuote": false,
  // tab寬度, 筆者比教偏好使用2
  "tabWidth": 2,
  // 是否使用tab
  "useTabs": false,
  // 最大寬度
  "printWidth": 120,
  // { 要不要加空格 }
  "bracketSpacing": true,
  // > 怎麼換豪
  "bracketSameLine": false,
  // avoid => 盡量省略使用()
  "arrowParens": "avoid"
}
```

```json
// package.json

// 加個script, yarn prettier會自動幫我們format專案
"scripts": {
  "prettier": "prettier '**/*.{js,jsx,ts,tsx}' --write"
}
```

## 安裝husky + lint-staged
當我們設定好規範後, 會希望在code commit時自動化檢測程式碼是否規範

這時候我們需要借助[husky](https://github.com/typicode/husky) + [lint-staged](https://github.com/okonet/lint-staged)
```
yarn add --dev husky lint-staged

yarn husky install

yarn husky add .husky/pre-commit "yarn lint-staged"
```

## 同場加映 - 如何指定專案使用的node版本
- 首先創建`.nvmrc`和`.node-version`兩個檔案
```javascript
// .nvmrc

18.17.1
```
```javascript
// .node-version

v18.17.1
```
- 也要在`package.json`裡面設定node版本
```json
 "engines": {
    "node": "18.17.1"
  }
```
- 善用`nvm`切換node version
```bash
# 這個時候直接使用nvm use 就會自己指定使用專案要求的版本了
nvm use
```

## 參考資料
- [https://eslint.org/docs/latest/rules/](https://eslint.org/docs/latest/rules/)
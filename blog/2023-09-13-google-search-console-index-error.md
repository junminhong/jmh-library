---
slug: google-search-console-index-error
title: 排查google search console出現無法剖析結構化資料的問題
description: 排查google search console警告無法剖析結構化資料的問題
authors: [junminhong]
tags: [google, seo, google-search-console]
---

## 前言
最近google search console警告網頁出現了

![google search console的警告訊息](/blog-image/google-search-console-struct-failed/google-search-console.png)

## 排查前熱身
google 本身有提供兩個線上工具可以善用

### [複合式搜尋結果測試](https://search.google.com/test/rich-results)
- 將你想要測試的網址貼上, 並等待個幾分鐘的處理時間
![複合式搜尋結果測試網站圖](/blog-image/google-search-console-struct-failed/rich-results-test-website.png)
- 接著你就會看到測試的結果, 然後你就可以根據網站給你的提示進行修正即可
![複合式搜尋結果測試結果](/blog-image/google-search-console-struct-failed/rich-results-test-website-result.png)

### [結構定義標記驗證工具](https://validator.schema.org/)
- 將你想要測試的網址貼上, 並等待個幾分鐘的處理時間
![結構定義標記驗證工具網站圖](/blog-image/google-search-console-struct-failed/schema-test-website.png)
- 一樣根據網站提供的資訊進行修正即可

## 排查過程
那在經過工具的測試後發現原因出在**JSON-LD**身上
```js
<script type="application/ld+json">
{ /* your structured data */}
</script>
```
### 什麼是JSON-LD (JavaScript Object Notation for Linked Data)
簡單來說就是在描述這個網頁的型態以及內容, 而google的搜尋引擎會去讀取網頁中的結構化資料, 並針對不同的網頁型態做對應的搜尋結果呈現

```html
<html>
  <head>
    <title>Software Engineer</title>
    <script type="application/ld+json">
    {
      "@context" : "https://schema.org/",
      "@type" : "JobPosting",
      "title" : "Software Engineer",
      "description" : "<p>Google aspires to be an organization that reflects the globally diverse audience that our products and technology serve. We believe that in addition to hiring the best talent, a diversity of perspectives, ideas and cultures leads to the creation of better products and services.</p>",
      "identifier": {
        "@type": "PropertyValue",
        "name": "Google",
        "value": "1234567"
      },
      "datePosted" : "2017-01-18",
      "validThrough" : "2017-03-18T00:00",
      "employmentType" : "CONTRACTOR",
      "hiringOrganization" : {
        "@type" : "Organization",
        "name" : "Google",
        "sameAs" : "https://www.google.com",
        "logo" : "https://www.example.com/images/logo.png"
      },
      "jobLocation": {
      "@type": "Place",
        "address": {
        "@type": "PostalAddress",
        "streetAddress": "1600 Amphitheatre Pkwy",
        "addressLocality": "Mountain View",
        "addressRegion": "CA",
        "postalCode": "94043",
        "addressCountry": "US"
        }
      },
      "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": {
          "@type": "QuantitativeValue",
          "value": 40.00,
          "unitText": "HOUR"
        }
      }
    }
    </script>
  </head>
  <body>
  </body>
</html>
```

## 參考資源
- [https://support.google.com/webmasters/answer/9166415?hl=zh-Hant#zippy=%2C%E9%A9%97%E8%AD%89%E4%BF%AE%E6%AD%A3%E7%B5%90%E6%9E%9C](https://support.google.com/webmasters/answer/9166415?hl=zh-Hant#zippy=%2C%E9%A9%97%E8%AD%89%E4%BF%AE%E6%AD%A3%E7%B5%90%E6%9E%9C)
- [https://developers.google.com/search/docs/appearance/structured-data/article?hl=zh-tw](https://developers.google.com/search/docs/appearance/structured-data/article?hl=zh-tw)
- (https://developers.google.com/search/docs/appearance/structured-data/job-posting?hl=zh-tw)[https://developers.google.com/search/docs/appearance/structured-data/job-posting?hl=zh-tw]
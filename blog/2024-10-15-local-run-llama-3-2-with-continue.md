---
slug: local-run-llama-3-2-with-continue
title: 使用 Continue 和 LLama 3.2：本地化大模型的運行與應用
description: 本篇文章將介紹如何結合 Continue 框架與 LLaMA 3.2 模型，實現本地化大語言模型的運行與應用。從環境設置、模型下載，到實際應用的步驟解析，幫助開發者在不依賴雲端的情況下，充分利用大模型的能力進行自然語言處理任務。我們還將探討本地化運行的優勢與挑戰，並提供實際應用場景的案例分析。
authors: [junminhong]
keywords: [
  "LLama 3.2",
  "Continue plugin",
  "本地化大模型",
  "AI 模型運行",
  "自然語言處理",
  "Cursor 替代品"
]
tags: [LLama, Continue]
---

## [LLama 3.2](https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/) 模型介紹
Meta 在 2024 年九月發佈了 LLaMA 3.2，這是針對大語言模型技術的一次重要升級

與以往版本相比，LLaMA 3.2 提供了更高效的推理能力、更好的記憶效果，並且在多種自然語言處理（NLP）任務上展示了強大的表現

不論是生成文本、進行對話還是處理複雜的任務，LLaMA 3.2 都具有更優秀的精度和速度

LLaMA 3.2 還支援邊緣設備與移動端的運行，這使得它成為企業實現高效能、本地化大模型應用的理想選擇

## 在 Docker 中運行 llama 3.2 3B
> 💡 這邊要注意 docker 環境的資源記憶體要給夠，不然模型會啟動不了

這次我們使用 docker 來快速運行 llama 3.2 3B 模型，如果電腦規格夠力的話可以考慮使用 11B 或 90B 的模型
為了簡化模型的部署和運行，我們可以通過 Docker 來構建運行環境

### 從 Docker Hub 下載 [ollama](https://hub.docker.com/r/ollama/ollama) 的 image
```
# 從 docker hub 下載 docker image，並且在背景啟動
docker run -d -p 11434:11434 --name ollama ollama/ollama

# 從剛剛的 ollama container 中下載 llama3.2 3B 模型，並且在背景啟動
# 因為模型具有一定的大小，所以需要花點時間等待下載
docker exec -d -it ollama ollama run llama3.2:3b

# 假設如果你想先使用對話的話可以不進背景
docker exec -it ollama ollama run llama3.2:3b
```

## VSCode 結合 ollama 進行 AI 聊天以及程式碼生成
用個 [Continue](https://marketplace.visualstudio.com/items?itemName=Continue.continue) 馬上讓你的 VScode 搖身一變成最近很火紅的 Cursor

### 安裝 [Continue](https://marketplace.visualstudio.com/items?itemName=Continue.continue)
直接把這個 plugin 下載下來後，將下面這個 config 複製貼上，即可開始自由發揮
```
{
  "models": [
    { 
      "title" : "Llama 3.2 3b" , 
      "provider" : "ollama" , 
      "model" : "llama3.2:3b" 
    } 
  ],
  "embeddingsProvider" :  { 
    "provider" :  "ollama" , 
    "model" :  "nomic-embed-text" 
  }, 
  "tabAutocompleteModel": {
    "title" : "Llama 3.2 3b" , 
    "provider" : "ollama" , 
    "model" : "llama3.2:3b" 
  }
}
```

## Model Benchmarks
![](https://scontent.ftpe8-4.fna.fbcdn.net/v/t39.2365-6/461288018_1255239495501495_271827633811450582_n.png?_nc_cat=102&ccb=1-7&_nc_sid=e280be&_nc_ohc=Cz_bhxFeFp4Q7kNvgEt3GYz&_nc_zt=14&_nc_ht=scontent.ftpe8-4.fna&_nc_gid=AlG84r8SnW_5Wv4YEdxW6ku&oh=00_AYAEoTFe6Um54vhIu-0i9xJemcRXgGrrlZlN7ooIoBqAww&oe=6728D1ED)
![](https://scontent.ftpe8-2.fna.fbcdn.net/v/t39.2365-6/461157789_931406385491961_1692349435372036848_n.png?_nc_cat=100&ccb=1-7&_nc_sid=e280be&_nc_ohc=WcgKBCDOK8IQ7kNvgFW6Svy&_nc_zt=14&_nc_ht=scontent.ftpe8-2.fna&_nc_gid=AlG84r8SnW_5Wv4YEdxW6ku&oh=00_AYAPUM4Xbauw5F5XC_l2a4HfzgSUU95b19q_zQA18WVCfw&oe=6728E958)

## 注意事項
- 如果自己架設模型，會非常吃電腦資源，所以審慎評估後再使用

## 參考連結
- [https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/](https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/)
- [https://hub.docker.com/r/ollama/ollama](https://hub.docker.com/r/ollama/ollama)
- [https://marketplace.visualstudio.com/items?itemName=Continue.continue](https://marketplace.visualstudio.com/items?itemName=Continue.continue)
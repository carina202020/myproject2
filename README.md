# interviewProject 

## 基本功能介紹
- 新增/刪除訂閱列表
- 儲存調整設定

## 系統架構與使用框架
- 前端 angularjs v1.3.14
- 前端 bootstarp v3.3.7
- 後台 node js   v4.3.1 
- 資料庫 MySql

## 架設與部屬專案
- 安裝nodejs (https://nodejs.org/en/)
- 在專案目錄底下執行 node app.js

## 檔案目錄架構
- app.js
- public (放置網頁相關檔案)
 - js
 - css
 - node_modules (使用套件)
 	-express

## API簡介
- /page/emails/main (get)  取得頁面資訊
- /api/emails/all   (get)  取的訂閱資訊
- /api/emails/many  (post) 傳入json data (subscriptionList)更新訂閱資料


## 開發心得及遇到問題

- 從沒接觸過nodejs 怎麼會會使用nodejs作為後台語言?
看完需求規格書之後，有點不太懂 RESTful API 的意思，於是google了一下，發現很多人在網路上使用nodejs快速打造RESTful API，再者也蠻久沒有寫PHP了，於是心一橫決定重新學一個新語言nodejs.

- 前台為何使用angularJS?
之前專案時候有過用angularJS,一直覺得angularJS在資料綁定的部分真的比Jquery來的快速更多，看了一下需求，大部分都是list之間的改動，使用angularJS可以更容易偵測被選擇的項目，並且可以即時更新項目列表。

- 前端畫面為何使用用bootstarp?
接到需求後，本來打算畫面自己自己慢慢刻，但看了一下排版的規則，大致可以分為nav列 左右兩欄以及底下設定區域，覺得可以使用bootstarp的網格系統來切割整個畫面。





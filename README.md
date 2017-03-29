# interviewProject 

## 基本功能介紹
- 新增/刪除訂閱列表
- 儲存調整設定

##系統架構與使用框架
- 前端 angularjs v1.3.14
- 前端 bootstarp v3.3.7
- 後台 node js   v4.3.1 
- 資料庫 MySql

##架設與部屬專案
- 安裝nodejs (https://nodejs.org/en/)
- 在專案目錄底下執行 node app.js

##檔案目錄架構
- app.js
- public (放置網頁相關檔案)
 - js
 - css
 - node_modules (使用套件)
 	-express

##API簡介
- /page/emails/main (get)  取得頁面資訊
- /api/emails/all   (get)  取的訂閱資訊
- /api/emails/many  (post) 傳入json data (subscriptionList)更新訂閱資料




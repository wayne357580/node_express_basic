# Node express example

A simple nodejs server base on express.

## Environment

- [node.js](https://nodejs.org/en/download)
- npm

## Features

- 基於 [Express ( v4.0 )](https://expressjs.com/zh-tw/) 的 MVC 架構
- 使用 [helmet](https://www.npmjs.com/package/helmet) 安全性設定
- 使用 [winston](https://www.npmjs.com/package/winston) 儲存 log，每日自動產生、定時清除

## Structure

- /api：副路由設定 (controller)
- /models：功能模組存放處 (model)
- /public：靜態檔案 (view)
- /logs：預設 log 存放處
- .env.template：環境變數範例檔案
- routes.js：主路由設定
- server.js：啟動點
  > log 格式設定參閱：[winston](https://www.npmjs.com/package/winston) 及 ./models/logger/index.js<br/>
  > log 儲存設定參閱：[winston-daily-rotate-file](https://www.npmjs.com/package/winston-daily-rotate-file)

## Usage

1. 編輯環境變數：複製 `.env.template` 並重新命名為 `.env`
   - SERVER_PORT：啟動 port
   - LOG_LEVEL：Log 儲存等級
   - LOG_FOLDER：Log 儲存位置
   - LOG_MAX_FILES：Log 保存時間
   - LOG_MAX_SIZE：Log 單一檔案最大上限
2. 安裝套件
   ```cmd
   npm install
   ```
3. 啟動 server
   ```cmd
   npm start
   ```
4. 開啟瀏覽器：http://localhost:8081
5. 輸入測試資料(name, age, gender)，點擊 submit，獲得伺服器回應並使用 alert 顯示
   - 前端檔案：`public\html\index.html`
   - 後端檔案：`api\hello\controller\get.js`

## Other

- Log 功能模組：`models\logger\index.js`
  - 輸出一般資訊：```logger.info('some info')```
  - 輸出提示資訊：```logger.notice('some notice')```
  - 輸出完整錯誤資訊 (加上 stack 將會顯示錯誤路徑)：```logger.error(new Error(e.stack).stack)```
- 基本 CRUD API 範例：`api\demo\index.js`
- 接收 API 範例：`api\hello\index.js` > http://localhost:8081
- 檔案管理範例：`api\file\index.js` > http://localhost:8081/fileManager

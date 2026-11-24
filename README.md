# CM Trading Indicators

MACD Pattern Recognition & Trading Analysis System

以 Next.js、TypeScript、Tailwind CSS、shadcn/ui、Lucide 和 Framer Motion 建立的雙語靜態官網。繁中位於根目錄，英文位於 `/en/`。圖表與多週期訊號是示意資料。

## 本機開發

需要 Node.js 22 以上，GitHub Actions 使用 Node.js 24。

```sh
npm ci
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)。

## 型別檢查、建置與靜態預覽

```sh
npm run typecheck
npm run build
npm run preview
```

正式輸出位於 `out/`，預覽位址為 [http://127.0.0.1:4173](http://127.0.0.1:4173)。若建置使用 `NEXT_PUBLIC_BASE_PATH`，預覽時請使用同一值。

## 維護內容

- `lib/site.ts` 管理三個指標的版本、功能、下載、TradingView 發布頁、版本紀錄、測試狀態、站外連結與同步套裝。
- `lib/documentation.ts` 管理十一節繁中與英文教學內容。
- `lib/lessons.ts` 管理 MACD 示意情境與 FIBO 規則。
- 取得正式 Pine 檔後，先驗證對應版本與檔案，再填入 GitHub Releases 下載網址。若改用 repo 內的靜態來源，放到 `public/`，並在設定中填入包含部署前綴的連結。
- 版本日以 ISO 8601 `YYYY-MM-DD` 填寫。將經確認的修正與測試結果補進設定。歷史版本可加入 `releaseHistory`。
- 尚缺正式發布資料的欄位採待公布或尚未發布狀態。相容性目前顯示預定版本配對。

## GitHub Pages 部署

1. 在儲存庫開啟 **Settings → Pages**，將 **Source** 設為 **GitHub Actions**。
2. 推送到 `main`，或在 **Actions → Deploy GitHub Pages** 手動觸發。
3. 工作流程安裝鎖定依賴、執行型別檢查和靜態建置，再部署 `out/`。部署網址顯示在 `github-pages` 環境。
4. 工作流程會使用 Pages 提供的 base path 和 origin 設定站內路由、canonical 與 Open Graph。首頁／組織站點使用空前綴，專案站點使用儲存庫名稱為前綴。
5. 使用自訂網域時，在 Pages 設定網域後重新部署。

手動建置也可設定 `NEXT_PUBLIC_BASE_PATH`、`NEXT_PUBLIC_SITE_ORIGIN` 與 `NEXT_PUBLIC_REPOSITORY_URL`。正式站點的 origin 只填 URL 的方案與主機，例如 `https://example.com`。

部署參考見 [GitHub Pages 自訂工作流程](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) 與 [Next.js 靜態輸出](https://nextjs.org/docs/app/guides/static-exports)。

import { officialDocs, type Copy } from "./site";
type Guide = { id: string; title: Copy; body: Copy[]; link?: string; linkLabel?: Copy };
export const guides: Guide[] = [
  { id:"install", title:["TradingView 安裝","Install on TradingView"], body:[
    ["下載中心發布原始碼後，先選擇需要的模組與版本。開啟 TradingView 的 Supercharts，在 Pine Editor 建立新指標並貼上整份程式碼。","Once source files are available in Downloads, select your module and version. Open TradingView Supercharts, create an indicator in Pine Editor, and paste the complete script."],
    ["儲存並加入圖表，確認指標名稱與版本。若日後發布 TradingView 腳本，也可從指標面板開啟官方發布頁。","Save and add it to the chart, then check the indicator name and version. When published TradingView listings are available, use the links on the indicator pages."],
  ], link:officialDocs.editor, linkLabel:["Pine Script 官方入門","Official Pine Script guide"] },
  { id:"pine-editor", title:["使用 Pine Editor","Use Pine Editor"], body:[
    ["確認第一行是 //@version=6，每個模組使用各自的腳本。修改後先儲存，再按加入圖表或更新圖表。","Check that the script starts with //@version=6 and keep each module in its own script. Save changes, then add or update the indicator on the chart."],
    ["遇到編譯錯誤時，先從編輯器標記的第一個行號檢查，確認程式碼完整且使用原始純文字檔。","On a compile error, start with the first highlighted line and confirm that you copied the complete plain-text source."],
  ] },
  { id:"points", title:["MACD 第 1 點與第 2 點","MACD Point 1 and Point 2"], body:[
    ["第 1 點是追蹤新方向時的第一個觀察錨點。第 2 點提供下一次結構比較，用來評估方向是否延續。","Point 1 anchors observation of a new direction. Point 2 supplies the next structure for evaluating whether that direction continues."],
    ["對照 MACD 曲線與訊號線的交叉、零軸位置及前一次有效標籤。暫定狀態可能隨後續資訊更新。","Compare the MACD-signal crossover, position relative to zero, and previous valid label. Provisional states may change as the pattern develops."],
  ] },
  { id:"double-patterns", title:["雙頂、雙底辨識","Double tops and bottoms"], body:[
    ["雙頂觀察兩個高位附近的結構轉折，雙底觀察兩個低位附近的轉折。先找暫定標籤，再追蹤正式確認或失效。","Double tops track structure around two highs, and double bottoms track two lows. Identify the provisional label, then track confirmation or invalidation."],
    ["型態進入有效狀態後，AUTO FIBO 對雙頂向下投影，對雙底向上投影。","For an effective pattern, AUTO FIBO projects downward from a double top and upward from a double bottom."],
  ] },
  { id:"invalidation", title:["出妖與水平監控線","Invalidation and monitoring levels"], body:[
    ["水平監控線保留型態參考值。當引擎判定原多方或空方結構失效時，對照出妖標籤、方向和受影響的監控線。","Horizontal monitoring lines retain pattern reference levels. When the engine invalidates a bullish or bearish structure, compare the event label, direction, and affected line."],
    ["AUTO FIBO 撤銷對應的價格投影。可以從前一次有效標籤回查原型態。","AUTO FIBO removes the corresponding price projection. Use the previous valid label to trace the original pattern."],
  ] },
  { id:"zero-line", title:["零軸確認機制","Zero-line confirmation"], body:[
    ["MACD 暫時越過零軸時，先觀察是否得到確認或回到原區域。待確認或切換期間，既有效的 FIBO 保留。","When MACD briefly crosses zero, observe whether the move confirms or returns to the previous side. Valid FIBO levels remain during confirmation or transition."],
    ["ALERTS 可監控零軸 A／B 事件。建立警報時以發布腳本實際列出的條件名稱為準。","ALERTS can monitor zero-line A / B events. Use the condition names shown in the published script when creating alerts."],
  ] },
  { id:"auto-fibo", title:["使用 AUTO FIBO","Use AUTO FIBO"], body:[
    ["在價格圖上確認 HH／LL 錨點及投影方向。第 1 點保留上一組，第 2 點與新的有效型態才更新。","On the price chart, check the HH / LL anchors and projection direction. Point 1 retains the previous set. Point 2 and new valid patterns update it."],
    ["使用反向 FIBO 檢視回調區，搭配多階段 TP 檢視不同價位。出妖時撤銷該型態的 FIBO。","Use reverse FIBO to inspect retracement zones and staged TP levels to examine different prices. Invalidation removes the FIBO for the affected pattern."],
  ] },
  { id:"multi-timeframe", title:["讀取多週期表格","Read the multi-timeframe table"], body:[
    ["比較 5M／15M／1H／4H／1D 各列的前一次有效標籤與最新 MACD 標籤。藍色底列表示當前週期。","Compare previous valid and latest MACD labels across 5M / 15M / 1H / 4H / 1D. The blue row marks the current timeframe."],
    ["同向欄用來觀察多空共振。切換週期時，對照相同市場與已確認 K 棒，並留意完整跨週期同步仍在驗證。","Use the alignment column to inspect directional agreement. Compare the same market and confirmed bars when switching timeframes. Full cross-timeframe synchronization remains under validation."],
  ] },
  { id:"alerts", title:["設定 TradingView 警報","Set TradingView alerts"], body:[
    ["加入 ALERTS 指標後，開啟建立警報視窗，在條件選擇該指標與所需事件，再設定通知方式。","After adding ALERTS, open Create alert, select the indicator and event under Condition, then choose your notification method."],
    ["若條件使用 alert()，頻率由腳本控制。更新腳本或設定後，重新建立警報以套用新版配置。","For alert() conditions, the script controls frequency. Recreate alerts after updating the script or inputs to apply the new configuration."],
  ], link:officialDocs.alerts, linkLabel:["TradingView 技術警報說明","TradingView technical alerts guide"] },
  { id:"version-sync", title:["同步三個指標版本","Synchronize indicator versions"], body:[
    ["以下載中心標示的套裝版本為基準，將三個模組個別更新至同一配對。逐一檢查名稱、版本及設定。","Use the bundle pairing shown in Downloads and update each module to that version. Check names, versions, and settings individually."],
    ["以相同商品與週期比對型態標籤、FIBO 方向與 MTF 事件，再重新建立使用舊設定的警報。","Compare pattern labels, FIBO direction, and MTF events on the same instrument and timeframe, then recreate alerts using obsolete settings."],
  ] },
  { id:"faq", title:["常見問題與錯誤排除","FAQ and troubleshooting"], body:[
    ["找不到下載？尚未發布的檔案會顯示狀態，開放後會在下載中心上架。","Missing a download? Pending files display their release status and will appear in Downloads when available."],
    ["模組標籤不一致？先對照版本、商品、週期與 K 棒確認狀態，記錄發生時間與前後標籤。","Labels disagree? Check versions, instrument, timeframe, and bar confirmation. Record the time and surrounding labels."],
    ["警報沒有觸發？確認警報開啟、事件條件正確且通知權限可用，再檢查警報日誌與版號。","Alert missing? Check that it is enabled, the condition is correct, and notification permissions are available. Review the alert log and script version."],
  ] },
];

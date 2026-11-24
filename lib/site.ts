export const locales = ["zh-TW", "en"] as const;
export type Locale = (typeof locales)[number];
export type Copy = readonly [string, string];
export const t = (lang: Locale, text: Copy) => text[lang === "en" ? 1 : 0];
export const pages = ["indicators", "architecture", "documentation", "changelog", "downloads"] as const;
export type Page = (typeof pages)[number];
export const labels: Record<Page, Copy> = {
  indicators: ["指標介紹", "Indicators"],
  architecture: ["系統架構", "Architecture"],
  documentation: ["使用教學", "Documentation"],
  changelog: ["版本更新", "Changelog"],
  downloads: ["下載中心", "Downloads"],
};
export const route = (lang: Locale, page = "") => `/${lang === "en" ? "en/" : ""}${page ? page + "/" : ""}`;
export const site = {
  name: "CM Trading Indicators",
  subtitle: "MACD Pattern Recognition & Trading Analysis System",
  github: process.env.NEXT_PUBLIC_REPOSITORY_URL ?? null,
  tradingView: null as string | null,
  threads: null as string | null,
  patreon: "https://www.patreon.com/16307160/join",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  origin: process.env.NEXT_PUBLIC_SITE_ORIGIN ?? null,
};
type Indicator = {
  id: string; name: string; version: string; color: string; role: Copy; overview: Copy;
  features: Copy[]; usage: Copy; download: string | null; tradingView: string | null;
  date: string | null; fixes: Copy[] | null; testing: Copy;
};
const pending: Copy = ["尚無公開驗證紀錄", "Public test results pending"];
export const indicators: Indicator[] = [
  {
    id: "macd-pattern", name: "CM_MACD_PATTERN", version: "V3.11", color: "blue",
    role: ["核心型態辨識引擎", "Core Pattern Engine"],
    overview: ["辨識 MACD 型態與市場方向，記錄交叉、雙頂底與失效事件。", "Identify MACD structures and market direction, with crossover, reversal, and invalidation events."],
    features: [
      ["多空第 1 點與第 2 點", "Bullish and bearish Point 1 / Point 2"],
      ["暫定與正式雙頂、雙底", "Provisional and confirmed double tops and bottoms"],
      ["零軸假突破確認", "Zero-line false breakout confirmation"],
      ["多空出妖", "Bullish and bearish invalidation events"],
      ["水平監控線", "Horizontal monitoring levels"],
      ["前一次與最新標籤診斷", "Previous and latest label diagnostics"],
    ],
    usage: ["在 MACD 副圖比對前後標籤與監控線，觀察暫定型態何時得到確認或失效。", "Compare previous and latest labels with monitoring levels on the MACD pane to see when provisional patterns confirm or invalidate."],
    download: null, tradingView: null, date: null, fixes: null, testing: pending,
  },
  {
    id: "auto-fibo", name: "CM_AUTO_FIBO", version: "V1.5", color: "gold",
    role: ["自動價格定位系統", "Automated Price Mapping"],
    overview: ["用 HH／LL 錨點投影回調與多階段價格目標。", "Map retracements and staged price targets from HH / LL anchors."],
    features: [
      ["HH／LL 價格錨點", "HH / LL price anchors"],
      ["多空自動 FIBO", "Automatic bullish and bearish FIBO"],
      ["暫定與正式 FIBO", "Provisional and confirmed FIBO"],
      ["反向 FIBO 回調區", "Reverse FIBO retracement zones"],
      ["多階段 TP 目標", "Staged TP levels"],
      ["出妖撤銷與有效型態更新", "Invalidation removes levels; valid patterns update them"],
    ],
    usage: ["在主圖確認 HH／LL 與繪製方向，出妖時對應 FIBO 撤銷，新有效型態才更新。", "Check the HH / LL anchors and drawing direction on the price chart. Invalidation removes the corresponding levels and a new valid pattern updates them."],
    download: null, tradingView: null, date: null, fixes: null, testing: pending,
  },
  {
    id: "macd-alerts", name: "CM_MACD_ALERTS", version: "V1.8", color: "green",
    role: ["多週期監控及警報系統", "Multi-Timeframe Monitoring"],
    overview: ["在單一面板比對五個週期的型態與同向共振。", "Compare pattern state and directional alignment across five timeframes in one panel."],
    features: [
      ["5M／15M／1H／4H／1D", "5M / 15M / 1H / 4H / 1D"],
      ["前一次有效標籤與最新 MACD 標籤", "Previous valid label and latest MACD label"],
      ["多空同向共振", "Bullish and bearish directional alignment"],
      ["型態及出妖警報", "Pattern and invalidation alerts"],
      ["零軸 A／B 警報", "Zero-line A / B alerts"],
      ["單次響鈴機制", "Single-notification mechanism"],
    ],
    usage: ["從週期列判讀前一次有效標籤與最新 MACD 標籤，依所需事件建立 TradingView 警報。", "Read the previous valid and latest MACD labels for each timeframe, then create TradingView alerts for the events you want to monitor."],
    download: null, tradingView: null, date: null, fixes: null, testing: pending,
  },
];
export const bundle = { url: null as string | null, format: "ZIP" };
export const releaseHistory = indicators.map((indicator) => ({
  ...indicator,
  highlights: indicator.features,
  compatibility: indicators.filter(({ id }) => id !== indicator.id),
}));
export const description: Copy = [
  "CM Trading Indicators 是一套以 MACD 型態辨識為核心的模組化交易分析系統，整合自動斐波那契、多週期監控與警報通知，協助交易者建立一致的市場分析流程。",
  "CM Trading Indicators is a modular trading analysis system built around MACD pattern recognition, automatic Fibonacci levels, multi-timeframe monitoring, and alerts.",
];
export const syncStatus: Copy = ["三個指標可獨立運行，核心辨識規則需保持同步。完整跨週期同步仍在驗證階段。", "Each indicator runs independently and shares the same core recognition rules. Full cross-timeframe synchronization is still under validation."];
export const demo: Copy = ["模擬資料", "SIMULATED DATA"];
export const officialDocs = {
  editor: "https://www.tradingview.com/pine-script-docs/primer/first-steps/",
  alerts: "https://www.tradingview.com/support/solutions/43000763315-getting-started-with-technical-alerts/",
};

export const locales = ["zh-TW", "en"] as const;
export type Locale = (typeof locales)[number];
export type Copy = readonly [string, string];
export const t = (lang: Locale, text: Copy) => text[lang === "en" ? 1 : 0];
export const pages = ["indicators", "architecture", "documentation", "changelog"] as const;
export type Page = (typeof pages)[number];
export const labels: Record<Page, Copy> = {
  indicators: ["指標介紹與下載", "Indicators & Downloads"],
  architecture: ["系統架構", "Architecture"],
  documentation: ["使用教學", "Documentation"],
  changelog: ["版本更新", "Changelog"],
};
export const route = (lang: Locale, page = "") => `/${lang === "en" ? "en/" : ""}${page ? page + "/" : ""}`;
export const site = {
  name: "CM Trading Indicators",
  subtitle: "MACD Pattern Recognition & Trading Analysis System",
  tradingView: "https://www.tradingview.com/chart/",
  threads: null as string | null,
  patreon: "https://www.patreon.com/16307160/join",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  origin: process.env.NEXT_PUBLIC_SITE_ORIGIN ?? null,
};
type Indicator = {
  id: string; name: string; version: string; color: string; role: Copy; overview: Copy;
  features: Copy[]; usage: Copy; sections: { title: Copy; body: Copy[] }[]; note: Copy; tradingView: string;
  title?: Copy; highlights?: Copy[]; date: string | null; fixes: Copy[] | null; testing: Copy;
};
export const indicators: Indicator[] = [
  {
    "id": "macd-pattern",
    "name": "CM_MACD_PATTERN",
    "version": "V3.14",
    "color": "blue",
    "role": [
      "MACD 型態辨識系統",
      "MACD pattern recognition"
    ],
    "overview": [
      "本指標以 MACD 為核心，透過交叉點、極值比較及零軸確認機制，自動辨識多空結構，協助交易者觀察市場動能與潛在反轉訊號。",
      "Crossovers, extrema and zero-line confirmation identify bullish and bearish structures, momentum and potential reversals."
    ],
    "features": [
      [
        "自動辨識多空第1點、第2點。",
        "Automatic bullish and bearish Points 1 and 2."
      ],
      [
        "自動辨識暫定及正式雙頂、雙底。",
        "Provisional and confirmed double tops and bottoms."
      ],
      [
        "MACD 零軸假突破過濾與確認進度。",
        "Zero-line false breakout filtering and confirmation progress."
      ],
      [
        "多空出妖及型態失效提示。",
        "Bullish and bearish invalidation notices."
      ],
      [
        "MACD 水平監控線。",
        "Horizontal MACD monitoring levels."
      ],
      [
        "歷史型態及出妖背景紀錄。",
        "Background history of patterns and invalidations."
      ],
      [
        "前一次有效標籤與最新 MACD 標籤診斷表格。",
        "Diagnostic table of the previous valid and latest MACD labels."
      ],
      [
        "新增「顯示該點失效標籤」開關，預設關閉。",
        "Added an invalidated-point label visibility toggle, disabled by default."
      ]
    ],
    "sections": [
      {
        "title": [
          "計算規格",
          "Calculation settings"
        ],
        "body": [
          [
            "MACD 採 EMA 12／26，Signal 採 SMA 9。雙頂雙底相似度預設 8%。零軸正式確認預設連續 8 根 K 棒收盤。",
            "MACD uses EMA 12/26 with a 9-period SMA signal. Double-top and double-bottom similarity defaults to 8%. Zero-line confirmation defaults to eight consecutive bar closes."
          ]
        ]
      }
    ],
    "usage": [
      "本指標為 CM 系列的核心辨識母版，提供 AUTO FIBO 與 MACD ALERTS 的統一型態辨識基準。 多週期監控請使用 CM_MACD_ALERTS。",
      "This indicator provides the common recognition rules for AUTO FIBO and MACD ALERTS. Use CM_MACD_ALERTS for multi-timeframe monitoring."
    ],
    "note": [
      "所有訊號僅供技術分析與交易研究參考，不構成投資建議。",
      "Signals are for technical analysis and trading research. They do not constitute investment advice."
    ],
    "tradingView": "https://tw.tradingview.com/script/0dNCKVeG/",
    "date": "2026-11-25",
    "fixes": null,
    "testing": [
      "尚無公開驗證紀錄",
      "Public test results pending"
    ],
    "title": [
      "程式精簡與顯示優化",
      "Code simplification and display improvements"
    ],
    "highlights": [
      [
        "完整移除右上角 MTF 五週期表格、相關設定及跨週期辨識程式碼。",
        "Removed the integrated MTF table, settings and cross-timeframe calculation engine."
      ],
      [
        "移除右下角週期說明表格。",
        "Removed the bottom-right timeframe information table."
      ],
      [
        "新增「顯示該點失效標籤」開關，預設關閉。",
        "Added an invalidated-point label visibility toggle, disabled by default."
      ],
      [
        "多週期監控統一交由 CM_MACD_ALERTS 負責，減少重複運算。",
        "Centralized multi-timeframe monitoring in CM_MACD_ALERTS to reduce duplicate calculations."
      ]
    ]
  },
  {
    "id": "auto-fibo",
    "name": "CM_AUTO_FIBO",
    "version": "V1.5",
    "color": "gold",
    "role": [
      "自動斐波那契分析系統",
      "Automatic Fibonacci analysis"
    ],
    "overview": [
      "本指標結合 CM_MACD_PATTERN 型態辨識引擎，自動尋找 HH／LL 價格錨點，繪製對應方向的斐波那契回調及延伸目標，減少人工拉線與主觀判斷。",
      "The pattern engine finds HH/LL price anchors and plots directional Fibonacci retracements and extension targets."
    ],
    "features": [
      [
        "自動辨識 HH／LL 價格錨點。",
        "Automatic HH/LL price anchors."
      ],
      [
        "自動繪製多空 FIBO。",
        "Bullish and bearish FIBO plotting."
      ],
      [
        "暫定與正式 FIBO 顯示。",
        "Provisional and confirmed levels."
      ],
      [
        "反向 FIBO 0.382～0.702 回調區。",
        "Reverse 0.382–0.702 retracement zone."
      ],
      [
        "多階段 TP 目標與延伸比例。",
        "Staged take-profit targets and extension ratios."
      ],
      [
        "歷史 FIBO 組別管理。",
        "Historical FIBO set management."
      ],
      [
        "多空出妖撤銷機制。",
        "Removal of invalidated bullish and bearish sets."
      ]
    ],
    "sections": [
      {
        "title": [
          "FIBO 更新原則",
          "FIBO update rules"
        ],
        "body": [
          [
            "當 MACD 僅形成暫定第1點或正式第1點時，維持上一組有效 FIBO。直到新的第2點、雙頂或雙底成立，才更新 FIBO 方向及價格錨點。",
            "A provisional or confirmed Point 1 retains the previous valid set. A new Point 2, double top or double bottom updates its direction and anchors."
          ],
          [
            "多方有效型態向上繪製，空方有效型態向下繪製。對應型態出妖時撤銷該組 FIBO。",
            "Valid bullish patterns project upward and bearish patterns downward. Invalidation removes the corresponding set."
          ]
        ]
      }
    ],
    "usage": [
      "本指標可獨立運行，並建議搭配相容版本的 CM_MACD_PATTERN 使用。",
      "Runs independently and pairs with compatible CM_MACD_PATTERN versions."
    ],
    "note": [
      "所有價格目標皆為技術分析參考，不代表價格必然到達。",
      "Price targets are technical references and may never be reached."
    ],
    "tradingView": "https://tw.tradingview.com/script/xV5c3COe/",
    "date": null,
    "fixes": null,
    "testing": [
      "尚無公開驗證紀錄",
      "Public test results pending"
    ]
  },
  {
    "id": "macd-alerts",
    "name": "CM_MACD_ALERTS",
    "version": "V1.9",
    "color": "green",
    "role": [
      "多週期型態監控與警報系統",
      "Multi-timeframe pattern monitoring and alerts"
    ],
    "overview": [
      "本指標整合 CM_MACD_PATTERN 核心辨識規則，透過多時間週期監控表格及警報機制，協助交易者快速掌握不同週期的多空結構與共振狀態。",
      "Shared CM_MACD_PATTERN rules power a multi-timeframe table and alerts for bullish and bearish structures and alignment."
    ],
    "features": [
      [
        "5M／15M／1H／4H／1D 五週期監控。",
        "Monitor 5M, 15M, 1H, 4H and 1D."
      ],
      [
        "前一次有效 MACD 標籤。",
        "Previous valid MACD label."
      ],
      [
        "最新 MACD 型態標籤。",
        "Latest MACD pattern label."
      ],
      [
        "多空同向共振 ✓。",
        "Directional agreement ✓."
      ],
      [
        "暫定型態警報。",
        "Provisional pattern alerts."
      ],
      [
        "多空出妖警報。",
        "Bullish and bearish invalidation alerts."
      ],
      [
        "水平監控線觸碰警報。",
        "Horizontal monitoring line touch alerts."
      ],
      [
        "MACD 零軸 A／B 雙階段警報。",
        "Two-stage zero-line A/B alerts."
      ],
      [
        "單次響鈴機制。",
        "Single notification per event."
      ],
      [
        "新增來源 K 棒收盤時間及標籤時間診斷資訊。",
        "Added source-bar close and label timestamp diagnostics."
      ]
    ],
    "sections": [
      {
        "title": [
          "表格欄位",
          "Table columns"
        ],
        "body": [
          [
            "週期表示目前監控的時間週期。前一次標籤記錄上一組有效型態，最新 MACD 標籤顯示目前辨識狀態，同向表示不同週期的有效多空型態共振。",
            "Timeframe identifies the monitored interval. Previous label records the last valid pattern. Latest MACD label shows the current state. Alignment shows directional agreement across timeframes."
          ]
        ]
      },
      {
        "title": [
          "零軸警報",
          "Zero-line alerts"
        ],
        "body": [
          [
            "A｜盤中首次觸碰或穿越零軸，提供提前觀察通知。",
            "A · The first intrabar touch or crossing of zero gives an early notice."
          ],
          [
            "B｜連續 K 棒收盤確認零軸突破，提供正式確認通知。",
            "B · Consecutive bar closes confirm the breakout and trigger confirmation."
          ]
        ]
      }
    ],
    "usage": [
      "本指標以已收盤的來源週期資料作為 MTF 監控基礎，降低盤中訊號變動造成的干擾。",
      "MTF monitoring uses closed source-timeframe bars to reduce intrabar variation."
    ],
    "note": [
      "所有警報僅供交易輔助與技術分析參考，不構成買賣建議。",
      "Alerts assist trading research and technical analysis. They do not constitute buy or sell advice."
    ],
    "tradingView": "https://tw.tradingview.com/script/bwEI9bYB/",
    "date": "2026-11-25",
    "fixes": [
      [
        "修正 15M 及 4H 在切換圖表週期時，標籤顯示不同步的問題。",
        "Fixed observed 15M and 4H label inconsistencies when switching chart timeframes."
      ]
    ],
    "testing": [
      "依作者本次測試，已通過 5M、15M、1H、4H、1D 五週期切換及標籤一致性驗證。",
      "The author reports that V1.9 passed timeframe switching and label consistency tests across 5M, 15M, 1H, 4H and 1D."
    ],
    "title": [
      "跨週期辨識同步優化",
      "Cross-timeframe recognition synchronization"
    ],
    "highlights": [
      [
        "統一同週期與跨週期 MACD 型態辨識引擎。",
        "Unified chart-timeframe and cross-timeframe recognition engines."
      ],
      [
        "優化「前一次標籤」與「最新 MACD 標籤」辨識及歷史狀態管理。",
        "Improved previous and latest label tracking and historical state management."
      ],
      [
        "改善跨週期已收盤資料取樣機制。",
        "Optimized closed-bar data sampling."
      ],
      [
        "新增來源 K 棒收盤時間及標籤時間診斷資訊。",
        "Added source-bar close and label timestamp diagnostics."
      ]
    ]
  }
];
export const otherIndicators = [
  {
    "name": "MACD MTF Double Top and Bottom Detector 90d",
    "url": "https://tw.tradingview.com/script/Z5KHekEs/"
  },
  {
    "name": "Multi EMA | 4H & 1D Trend Change Dashboard",
    "url": "https://tw.tradingview.com/script/0tEJFfZi/"
  },
  {
    "name": "SR＋SMC＋VWAP 多空雙向教練 7.0.2",
    "url": "https://tw.tradingview.com/script/v9sZVYZ9/"
  }
];
type Release = Pick<Indicator, "id" | "name" | "version" | "color" | "date" | "testing" | "fixes" | "tradingView"> & {
  title?: Copy | null;
  highlights: Copy[];
  compatibility: { name: string; version: string }[];
};
const historicalReleases: Release[] = [
  {
    "id": "macd-pattern",
    "name": "CM_MACD_PATTERN",
    "version": "V3.11",
    "color": "blue",
    "date": null,
    "testing": [
      "尚無公開驗證紀錄",
      "Public test results pending"
    ],
    "fixes": null,
    "tradingView": "https://tw.tradingview.com/script/0dNCKVeG/",
    "title": null,
    "highlights": [
      [
        "自動辨識多空第1點、第2點。",
        "Automatic bullish and bearish Points 1 and 2."
      ],
      [
        "自動辨識暫定及正式雙頂、雙底。",
        "Provisional and confirmed double tops and bottoms."
      ],
      [
        "MACD 零軸假突破過濾與確認進度。",
        "Zero-line false breakout filtering and confirmation progress."
      ],
      [
        "多空出妖及型態失效提示。",
        "Bullish and bearish invalidation notices."
      ],
      [
        "MACD 水平監控線。",
        "Horizontal MACD monitoring levels."
      ],
      [
        "歷史型態及出妖背景紀錄。",
        "Background history of patterns and invalidations."
      ],
      [
        "前一次有效標籤與最新 MACD 標籤診斷表格。",
        "Diagnostic table of the previous valid and latest MACD labels."
      ],
      [
        "新增「顯示該點失效標籤」開關，預設關閉。",
        "Added an invalidated-point label visibility toggle, disabled by default."
      ]
    ],
    "compatibility": [
      {
        "name": "CM_AUTO_FIBO",
        "version": "V1.5"
      },
      {
        "name": "CM_MACD_ALERTS",
        "version": "V1.8"
      }
    ]
  },
  {
    "id": "auto-fibo",
    "name": "CM_AUTO_FIBO",
    "version": "V1.5",
    "color": "gold",
    "date": null,
    "testing": [
      "尚無公開驗證紀錄",
      "Public test results pending"
    ],
    "fixes": null,
    "tradingView": "https://tw.tradingview.com/script/xV5c3COe/",
    "title": null,
    "highlights": [
      [
        "自動辨識 HH／LL 價格錨點。",
        "Automatic HH/LL price anchors."
      ],
      [
        "自動繪製多空 FIBO。",
        "Bullish and bearish FIBO plotting."
      ],
      [
        "暫定與正式 FIBO 顯示。",
        "Provisional and confirmed levels."
      ],
      [
        "反向 FIBO 0.382～0.702 回調區。",
        "Reverse 0.382–0.702 retracement zone."
      ],
      [
        "多階段 TP 目標與延伸比例。",
        "Staged take-profit targets and extension ratios."
      ],
      [
        "歷史 FIBO 組別管理。",
        "Historical FIBO set management."
      ],
      [
        "多空出妖撤銷機制。",
        "Removal of invalidated bullish and bearish sets."
      ]
    ],
    "compatibility": [
      {
        "name": "CM_MACD_PATTERN",
        "version": "V3.11"
      },
      {
        "name": "CM_MACD_ALERTS",
        "version": "V1.8"
      }
    ]
  },
  {
    "id": "macd-alerts",
    "name": "CM_MACD_ALERTS",
    "version": "V1.8",
    "color": "green",
    "date": null,
    "testing": [
      "尚無公開驗證紀錄",
      "Public test results pending"
    ],
    "fixes": null,
    "tradingView": "https://tw.tradingview.com/script/bwEI9bYB/",
    "title": null,
    "highlights": [
      [
        "5M／15M／1H／4H／1D 五週期監控。",
        "Monitor 5M, 15M, 1H, 4H and 1D."
      ],
      [
        "前一次有效 MACD 標籤。",
        "Previous valid MACD label."
      ],
      [
        "最新 MACD 型態標籤。",
        "Latest MACD pattern label."
      ],
      [
        "多空同向共振 ✓。",
        "Directional agreement ✓."
      ],
      [
        "暫定型態警報。",
        "Provisional pattern alerts."
      ],
      [
        "多空出妖警報。",
        "Bullish and bearish invalidation alerts."
      ],
      [
        "水平監控線觸碰警報。",
        "Horizontal monitoring line touch alerts."
      ],
      [
        "MACD 零軸 A／B 雙階段警報。",
        "Two-stage zero-line A/B alerts."
      ],
      [
        "單次響鈴機制。",
        "Single notification per event."
      ],
      [
        "新增來源 K 棒收盤時間及標籤時間診斷資訊。",
        "Added source-bar close and label timestamp diagnostics."
      ]
    ],
    "compatibility": [
      {
        "name": "CM_MACD_PATTERN",
        "version": "V3.11"
      },
      {
        "name": "CM_AUTO_FIBO",
        "version": "V1.5"
      }
    ]
  }
];
export const releaseHistory: Release[] = [
  ...indicators.filter((item) => item.highlights).map((item) => ({
    ...item,
    highlights: item.highlights ?? [],
    compatibility: indicators.filter(({ id }) => id !== item.id),
  })),
  ...historicalReleases,
];
export const description: Copy = [
  "CM Trading Indicators 是一套以 MACD 型態辨識為核心的模組化交易分析系統，整合自動斐波那契、多週期監控與警報通知，協助交易者建立一致的市場分析流程。",
  "CM Trading Indicators is a modular trading analysis system built around MACD pattern recognition, automatic Fibonacci levels, multi-timeframe monitoring, and alerts.",
];
export const syncStatus: Copy = ["三個指標可獨立運行，核心辨識規則需保持同步。多週期監控由 CM_MACD_ALERTS 負責。依作者測試，V1.9 已通過本次五週期切換及標籤一致性驗證。", "Each indicator runs independently and shares the same core recognition rules. CM_MACD_ALERTS handles multi-timeframe monitoring. The author reports that V1.9 passed the current five-timeframe switching and label consistency test."];
export const demo: Copy = ["模擬資料", "SIMULATED DATA"];
export const officialDocs = {
  editor: "https://www.tradingview.com/pine-script-docs/primer/first-steps/",
  alerts: "https://www.tradingview.com/support/solutions/43000763315-getting-started-with-technical-alerts/",
};

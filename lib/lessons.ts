import type { Copy } from "./site";
export type Scenario = { id: string; title: Copy; text: Copy; values: number[]; signal: number[]; points: { at: number; title: Copy; level?: boolean }[]; tone: string };
const mirror = (values: number[]) => values.map((n) => -n);
const bull = [-10,-27,-40,-33,-18,-9,-15,-24,-20,-5,12,24,18];
const bullSignal = [-8,-18,-28,-33,-27,-19,-16,-21,-20,-14,1,15,20];
const bottom = [-8,-23,-40,-32,-17,-5,-17,-34,-39,-22,3,20,16];
const bottomSignal = [-5,-13,-24,-32,-26,-19,-15,-23,-32,-30,-12,8,17];
const failed = [-8,-25,-38,-29,-15,-17,-24,-20,-11,-21,-43,-36,-30];
const failedSignal = [-6,-16,-27,-29,-24,-20,-22,-20,-17,-16,-27,-34,-34];
export const scenarios: Scenario[] = [
  { id: "bull", title: ["多方第 1／2 點", "Bullish P1 / P2"], text: ["從下方穿越訊號線後，先觀察多方第 1 點。第 2 點提供比較兩次交叉與水平監控線的位置。", "After an upward signal crossover, watch for bullish Point 1. Point 2 lets you compare the two crossovers and their position relative to the monitoring level."], values: bull, signal: bullSignal, points: [{ at: 3, title: ["第 1 點", "Point 1"], level: true },{ at: 8, title: ["第 2 點", "Point 2"] }], tone: "green" },
  { id: "bear", title: ["空方第 1／2 點", "Bearish P1 / P2"], text: ["從上方跌破訊號線時，觀察空方第 1 點。第 2 點成立後再評估前後型態與價格投影。", "Watch for bearish Point 1 on a downward signal crossover. Once Point 2 is established, compare the structures and price projections."], values: mirror(bull), signal: mirror(bullSignal), points: [{ at: 3, title: ["第 1 點", "Point 1"], level: true },{ at: 8, title: ["第 2 點", "Point 2"] }], tone: "red" },
  { id: "bottom", title: ["暫定雙底", "Provisional double bottom"], text: ["兩次低位形成雙底候選。觀察第二次低位後的交叉與水平線，直到確認或失效。", "Two lows form a double-bottom candidate. Watch the next crossover and monitoring line for confirmation or invalidation."], values: bottom, signal: bottomSignal, points: [{ at: 3, title: ["第一次低位後交叉", "First crossover"], level: true },{ at: 9, title: ["暫定雙底", "Provisional bottom"] }], tone: "green" },
  { id: "top", title: ["暫定雙頂", "Provisional double top"], text: ["兩次高位形成雙頂候選。第二次高位後出現向下交叉時，辨別暫定狀態與正式標籤。", "Two highs form a double-top candidate. When the next downward crossover appears, distinguish the provisional state from a confirmed label."], values: mirror(bottom), signal: mirror(bottomSignal), points: [{ at: 3, title: ["第一次高位後交叉", "First crossover"], level: true },{ at: 9, title: ["暫定雙頂", "Provisional top"] }], tone: "red" },
  { id: "bull-fail", title: ["多方出妖", "Bullish invalidation"], text: ["多方候選型態失效時，查看出妖標籤與被破壞的水平監控線，對應的 FIBO 撤銷。", "When a bullish candidate invalidates, check the event label and breached monitoring line. The corresponding FIBO levels are removed."], values: failed, signal: failedSignal, points: [{ at: 8, title: ["多方觀察", "Bullish watch"], level: true },{ at: 9, title: ["多方出妖", "Bullish invalidation"] }], tone: "purple" },
  { id: "bear-fail", title: ["空方出妖", "Bearish invalidation"], text: ["空方候選型態失效時，查看出妖標籤與被突破的水平監控線，對應的 FIBO 撤銷。", "When a bearish candidate invalidates, check the event label and breached monitoring line. The corresponding FIBO levels are removed."], values: mirror(failed), signal: mirror(failedSignal), points: [{ at: 8, title: ["空方觀察", "Bearish watch"], level: true },{ at: 9, title: ["空方出妖", "Bearish invalidation"] }], tone: "purple" },
  { id: "zero", title: ["零軸待確認", "Zero-line pending"], text: ["短暫跨越零軸可能形成假突破。等待確認期間保留已有效的 FIBO。", "A brief move across zero can be a false breakout. Keep the valid FIBO levels while confirmation is pending."], values: [-24,-20,-14,-9,-3,4,9,4,-4,-7,-3,1,7], signal: [-24,-23,-20,-16,-10,-4,1,3,1,-3,-4,-2,2], points: [{ at: 8, title: ["零軸待確認", "Confirmation pending"], level: true }], tone: "gold" },
];
export const fiboRules: [Copy, Copy][] = [
  [["第 1 點", "Point 1"], ["保留上一組 FIBO", "Keep previous FIBO"]],
  [["第 2 點", "Point 2"], ["更新 FIBO", "Update FIBO"]],
  [["雙頂", "Double top"], ["向下繪製", "Plot downward"]],
  [["雙底", "Double bottom"], ["向上繪製", "Plot upward"]],
  [["零軸切換", "Zero-line transition"], ["保留有效 FIBO", "Keep valid FIBO"]],
  [["出妖", "Invalidation"], ["撤銷對應 FIBO", "Remove corresponding FIBO"]],
];

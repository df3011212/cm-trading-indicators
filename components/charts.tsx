import { Check, CandlestickChart } from "lucide-react";
import { demo, t, type Locale } from "@/lib/site";

const closes = [112,116,109,127,121,139,133,143,129,132,115,104,99,88,101,96,108,102,117,110,128,138,131,152,147,159,147,155,141,146,134,145,153,165,155,171,165,177];
const levels = [
  { y: 61, ratio: "1.000", price: "68,420" }, { y: 91, ratio: "0.786", price: "67,180" },
  { y: 123, ratio: "0.618", price: "66,210" }, { y: 151, ratio: "0.500", price: "65,525" },
  { y: 181, ratio: "0.382", price: "64,840" }, { y: 218, ratio: "0.000", price: "62,630" },
];
const wave = "M12 306 C45 305 57 267 86 271 S130 318 156 310 182 289 212 299 237 327 262 315 295 271 327 278 352 304 373 294 402 263 425 270 447 285 479 268";
const signal = "M12 311 C51 312 64 278 88 279 S132 307 157 315 186 303 212 308 245 321 265 322 298 291 324 284 355 295 378 298 404 280 425 277 451 282 479 274";
const events = [
  { x: 94, y: 63, pointX: 102, pointY: 95, width: 54, label: ["雙頂", "Double top"], color: "#f27884" },
  { x: 151, y: 186, pointX: 176, pointY: 151, width: 68, label: ["多方第 1 點", "Bullish P1"], color: "#64e8bf" },
  { x: 222, y: 159, pointX: 213, pointY: 144, width: 68, label: ["雙底", "Double bottom"], color: "#64e8bf" },
  { x: 271, y: 60, pointX: 287, pointY: 91, width: 68, label: ["多方第 2 點", "Bullish P2"], color: "#64e8bf" },
] as const;

export function MarketChart({ lang }: { lang: Locale }) {
  return <div className="terminal">
    <div className="terminal-top">
      <div className="market-symbol"><span className="market-icon"><CandlestickChart size={17} aria-hidden="true" /></span><div><strong>BTC / USD</strong><small>{t(lang, ["價格與型態分析", "Price & pattern analysis"])}</small></div></div>
      <div className="market-status"><span className="market-period">4H</span><span className="simulation"><i />{t(lang, demo)}</span></div>
    </div>
    <div className="chart-meta"><span><i /> {t(lang, ["價格結構", "Price Structure"])}</span><span><i /> FIBO</span><span><i /> MACD</span></div>
    <svg className="market-chart" viewBox="0 0 550 355" role="img" aria-label={t(lang, ["模擬 K 棒、斐波那契價位、MACD 與型態標籤", "Simulated candles with Fibonacci levels, MACD, and pattern labels"])}>
      <path d="M0 242H550 M0 297H550 M0 336H550 M490 0V336" className="chart-divider" />
      {[28, 93, 158, 223, 288, 353, 418].map((x) => <path key={x} d={`M${x} 0V336`} className="chart-grid" />)}
      <rect x="8" y="123" width="477" height="28" fill="#d1a74e" opacity=".06" />
      {levels.map(({ y, ratio, price }) => <g key={ratio}>
        <path d={`M8 ${y}H485`} className="fibo-line" />
        <text x="491" y={y + 3} className="chart-ratio">{ratio}</text>
        <text x="548" y={y + 3} textAnchor="end" className="axis-price">{price}</text>
      </g>)}
      {closes.map((close, i) => {
        const open = i === 0 ? 107 : closes[i - 1];
        const x = 16 + i * 12.3;
        const y = 267 - Math.max(close, open) * 1.19;
        const height = Math.max(2, Math.abs(close - open) * 1.19);
        const color = close >= open ? "#00d68f" : "#f23645";
        return <g key={i} stroke={color} fill={color}>
          <path d={`M${x} ${y - 4 - i % 7}v${height + 9 + i % 10}`} />
          <rect x={x - 2.8} y={y} width="5.6" height={height} rx=".6" />
        </g>;
      })}
      {events.map(({ x, y, pointX, pointY, width, color, label }) => <g key={label[0]}>
        <line x1={x + width / 2} y1={y + (pointY > y ? 16 : 0)} x2={pointX} y2={pointY} stroke={color} strokeOpacity=".65" />
        <circle cx={pointX} cy={pointY} r="2" fill={color} />
        <rect x={x} y={y} width={width} height="16" rx="3" fill="#121b29" stroke={color} strokeOpacity=".55" />
        <text x={x + width / 2} y={y + 11} textAnchor="middle" fill={color} className="chart-tag">{t(lang, label)}</text>
      </g>)}
      <text x="14" y="257" className="chart-caption">CM MACD</text>
      {closes.map((_, i) => {
        const value = Math.sin(i * .33 - .5) * 14 + Math.sin(i * .17) * 7;
        return <rect key={i} x={13 + i * 12.3} y={Math.min(297 - value, 297)} width="6" height={Math.abs(value)} rx="1" fill={value >= 0 ? "#00d68f" : "#f23645"} opacity=".32" />;
      })}
      <path d={wave} stroke="#42e1af" fill="none" strokeWidth="2.1" />
      <path d={signal} stroke="#ff6b80" fill="none" strokeWidth="1.6" />
      {["09:00", "12:00", "15:00", "18:00", "21:00"].map((label, i) => <text key={label} x={40 + i * 98} y="349" className="chart-price">{label}</text>)}
    </svg>
    <MtfTable lang={lang} compact />
  </div>;
}

const rows = [
  ["5M", true, ["暫定第 2 點", "Provisional P2"], false, ["暫定第 1 點", "Provisional P1"], false],
  ["15M", false, ["第 2 點", "Point 2"], true, ["雙底", "Double bottom"], true],
  ["1H", false, ["雙頂", "Double top"], true, ["暫定第 1 點", "Provisional P1"], false],
  ["4H", false, ["第 2 點", "Point 2"], true, ["暫定第 1 點", "Provisional P1"], false],
  ["1D", true, ["第 2 點", "Point 2"], true, ["暫定第 2 點", "Provisional P2"], true],
] as const;

export function MtfTable({ lang, compact = false }: { lang: Locale; compact?: boolean }) {
  const direction = (bull: boolean) => t(lang, bull ? ["多方", "Bull"] : ["空方", "Bear"]);
  return <div className={compact ? "mtf compact" : "mtf"}>
    <table>
      <caption>{compact ? t(lang, ["多週期監控", "MULTI-TIMEFRAME MONITOR"]) : t(lang, ["功能展示 · 非即時市場訊號", "Feature demonstration · No live market signals"])}</caption>
      <thead><tr><th scope="col">{t(lang, ["週期", "TF"])}</th><th scope="col">{t(lang, ["前一次標籤", "Previous label"])}</th><th scope="col">{t(lang, ["最新 MACD 標籤", "Latest MACD label"])}</th><th scope="col">{t(lang, ["同向", "Aligned"])}</th></tr></thead>
      <tbody>{rows.map(([tf, previous, previousText, latest, latestText, aligned]) => <tr key={tf} className={tf === "4H" ? "current-tf" : undefined}>
        <th scope="row">{tf}{tf === "4H" && <span className="sr-only"> {t(lang, ["目前週期", "Current timeframe"])}</span>}</th>
        <td className={previous ? "bull" : "bear"}>{direction(previous)} · {t(lang, previousText)}</td>
        <td className={latest ? "bull" : "bear"}>{direction(latest)} · {t(lang, latestText)}</td>
        <td>{aligned && <><Check aria-hidden="true" size={compact ? 12 : 16} className="bull" /><span className="sr-only">{t(lang, ["同向", "Aligned"])}</span></>}</td>
      </tr>)}</tbody>
    </table>
  </div>;
}

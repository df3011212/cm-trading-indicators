"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, ChartCandlestick, Radio } from "lucide-react";
import { marketDemo, timeframes, type Timeframe } from "@/lib/market-demo";
import { t, type Locale } from "@/lib/site";
import { MtfTable } from "./charts";

const width = 648;
const margin = 12;
const right = 570;
const priceTop = 17;
const priceBottom = 210;
const macdTop = 225;
const axisTop = 385;
const macdMid = 311;
const green = "#25d6a0";
const red = "#fa657c";
const gold = "#f5c451";
const prices = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const fibRatios = [0, .382, .5, .618, .786, 1];
const marks = [
  { lane: "upper", label: ["雙頂", "Double top"], tone: red },
  { lane: "lower", label: ["多方第 1 點", "Bullish P1"], tone: green },
  { lane: "upper", label: ["空方第 2 點", "Bearish P2"], tone: red },
  { lane: "lower", label: ["雙底", "Double bottom"], tone: green },
] as const;
const tickLocations = [0, 12, 24, 36, 48, 60];
function timeLabel(minutes: number, index: number) {
  const time = new Date(Date.UTC(2026, 0, 5, 8) + minutes * index * 60_000);
  if (minutes >= 60) return `${time.getUTCMonth() + 1}/${time.getUTCDate()}${minutes === 60 ? " " + String(time.getUTCHours()).padStart(2, "0") + ":00" : ""}`;
  return time.toISOString().slice(11, 16);
}

function TradingPlot({ lang, timeframe }: { lang: Locale; timeframe: Timeframe }) {
  const data = useMemo(() => marketDemo(timeframe), [timeframe]);
  const min = Math.min(...data.candles.map(({ low }) => low));
  const max = Math.max(...data.candles.map(({ high }) => high));
  const padding = (max - min) * .15;
  const x = (index: number) => margin + 6 + index * (right - margin - 14) / (data.candles.length - 1);
  const y = (price: number) => priceBottom - (price - min + padding) / (max - min + padding * 2) * (priceBottom - priceTop);
  const macdRange = Math.max(...[...data.macd, ...data.signal, ...data.histogram].map(Math.abs)) * 1.18;
  const macdY = (value: number) => macdMid - value / macdRange * 41;
  const path = (series: number[]) => series.map((value, index) =>
    `${index === 0 ? "M" : "L"}${x(index).toFixed(2)} ${macdY(value).toFixed(2)}`).join(" ");
  const levels = fibRatios.map((ratio) => ({ ratio, price: min + ratio * (max - min) }));
  const close = data.candles.at(-1)!.close;
  const crossovers = data.macd.flatMap((current, index) => {
    if (!index) return [];
    const previousGap = data.macd[index - 1] - data.signal[index - 1];
    const currentGap = current - data.signal[index];
    if (previousGap * currentGap >= 0) return [];
    const fraction = previousGap / (previousGap - currentGap);
    return [{
      x: x(index - 1 + fraction),
      y: macdY(data.macd[index - 1] + (current - data.macd[index - 1]) * fraction),
    }];
  });
  return <svg className="workstation-plot" viewBox={`0 0 ${width} 402`} role="img"
    aria-label={t(lang, ["模擬 K 棒、FIBO 價位、MACD 線、訊號線和柱狀圖", "Simulated candles, Fibonacci levels, MACD, signal line, and histogram"])}>
    <rect x="0" y={macdTop} width={width} height={axisTop - macdTop} className="plot-oscillator" />
    <rect x={margin} y={y(levels[4].price)} width={right - margin} height={y(levels[2].price) - y(levels[4].price)} fill={gold} opacity=".04" />
    {tickLocations.map((index) => <g key={index}>
      <path d={`M${x(index)} 0V${axisTop}`} className="plot-grid" />
      <text x={x(index)} y="398" textAnchor={index ? "middle" : "start"} className="plot-axis">{timeLabel(data.minutes, index)}</text>
    </g>)}
    {levels.map(({ ratio, price }) => <g key={ratio}>
      <path d={`M${margin} ${y(price)}H${right}`} className="plot-fibo" />
      <text x={right + 7} y={y(price) + 3.5} className="plot-ratio">{ratio.toFixed(3)}</text>
      <text x={width - 7} y={y(price) + 3.5} textAnchor="end" className="plot-axis plot-price">{prices.format(price)}</text>
    </g>)}
    <path d={`M0 ${macdTop}H${width} M0 ${axisTop}H${width} M${right} 0V${axisTop}`} className="plot-divider" />
    <path d={`M${x(data.candles.length - 1) + 3} ${y(close)}H${right}`} stroke={green} strokeDasharray="2 3" opacity=".7" />
    {data.candles.map(({ open, high, low, close }, index) => {
      const fill = close >= open ? green : red;
      return <g key={index} fill={fill} stroke={fill}>
        <path d={`M${x(index)} ${y(high)}V${y(low)}`} strokeWidth="1" />
        <rect x={x(index) - 2.6} y={Math.min(y(open), y(close))} width="5.2" height={Math.max(1.2, Math.abs(y(open) - y(close)))} rx=".55" stroke="none" />
      </g>;
    })}
    <text x="14" y="242" className="plot-label">MACD 12 · 26 · 9</text>
    <path d={`M0 ${macdMid}H${width}`} className="plot-zero" />
    <text x={width - 7} y={macdMid + 3} textAnchor="end" className="plot-axis">0.00</text>
    {data.histogram.map((value, index) => <rect key={index} x={x(index) - 2.7}
      y={Math.min(macdMid, macdY(value))} height={Math.abs(macdY(value) - macdMid)} width="5.4" rx=".8"
      fill={value >= 0 ? green : red} opacity=".44" />)}
    <path d={path(data.macd)} fill="none" stroke={green} strokeWidth="1.75" strokeLinejoin="round" />
    <path d={path(data.signal)} fill="none" stroke={red} strokeWidth="1.5" strokeLinejoin="round" />
    <g className="macd-pattern-marks">
      {marks.map(({ lane, label, tone }, index) => {
        const point = crossovers[index];
        if (!point) return null;
        const labelY = lane === "upper" ? 250 : 354;
        const boxWidth = lang === "en" ? 95 : 98;
        return <g key={label[1]} className="macd-pattern-mark">
          <path d={`M${point.x} ${point.y}V${lane === "upper" ? labelY + 21 : labelY}`} stroke={tone} strokeOpacity=".6" strokeDasharray="3 3" />
          <circle cx={point.x} cy={point.y} r="4.2" fill="#0d131e" stroke={tone} strokeWidth="1.6" />
          <rect x={point.x - boxWidth / 2} y={labelY} width={boxWidth} height="21" rx="5" fill="#121b29" stroke={tone} strokeOpacity=".65" />
          <text x={point.x} y={labelY + 14} textAnchor="middle" fill={tone} className="plot-marker">{t(lang, label)}</text>
        </g>;
      })}
    </g>
  </svg>;
}

export function MarketTerminal({ lang }: { lang: Locale }) {
  const [timeframe, setTimeframe] = useState<Timeframe>("4H");
  return <div className="workstation">
    <div className="workstation-head">
      <div className="instrument">
        <span className="instrument-icon"><ChartCandlestick size={19} aria-hidden="true" /></span>
        <div><strong>BTC<span>/</span>USD</strong><small>{t(lang, ["比特幣 · 價格與型態", "Bitcoin · Price and patterns"])}</small></div>
      </div>
      <span className="demo-state"><Radio size={13} aria-hidden="true" />{t(lang, ["模擬資料", "Simulated"])}</span>
    </div>
    <div className="workstation-toolbar">
      <div className="time-selector" role="group" aria-label={t(lang, ["模擬圖表週期", "Simulated chart timeframe"])}>
        {timeframes.map((period) => <button type="button" key={period} aria-pressed={period === timeframe} onClick={() => setTimeframe(period)}>{period}</button>)}
      </div>
      <span className="fibo-key"><i />FIBO</span>
    </div>
    <TradingPlot lang={lang} timeframe={timeframe} />
    <div className="plot-legend">
      <span><i />MACD</span><span><i />{t(lang, ["訊號線", "Signal"])}</span><span><i />{t(lang, ["柱狀圖", "Histogram"])}</span>
      <a href="#mtf-demo">{t(lang, ["多週期監控", "MTF monitor"])}<ArrowUpRight size={13} aria-hidden="true" /></a>
    </div>
    <MtfTable lang={lang} compact timeframe={timeframe} />
  </div>;
}

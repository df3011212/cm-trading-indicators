"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, CornerUpLeft, Pause, RefreshCw, X } from "lucide-react";
import { fiboRules, scenarios } from "@/lib/lessons";
import { demo, t, type Locale } from "@/lib/site";

const palette: Record<string, string> = { green: "#00d68f", red: "#f23645", gold: "#f5c451", purple: "#c975df" };
const x = (i: number) => 30 + i * 49;
const y = (n: number) => 123 - n * 1.75;
function curve(values: number[]) {
  return values.slice(1).reduce((path, value, i) => {
    const middle = (x(i) + x(i + 1)) / 2;
    return path + ` C${middle} ${y(values[i])} ${middle} ${y(value)} ${x(i + 1)} ${y(value)}`;
  }, `M${x(0)} ${y(values[0])}`);
}
export function PatternLab({ lang }: { lang: Locale }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const active = scenarios[index];
  const color = palette[active.tone];

  return <div className="lab">
    <div className="lab-options" role="group" aria-label={t(lang, ["型態情境", "Pattern scenarios"])}>
      {scenarios.map((item, i) => <button key={item.id} type="button" aria-pressed={i === index}
        className={i === index ? "selected" : undefined} onClick={() => setIndex(i)}><span style={{ background: palette[item.tone] }} />{t(lang, item.title)}</button>)}
    </div>
    <div className="lab-display" aria-live="polite">
      <div className="lab-header"><h3>{t(lang, active.title)}</h3><span className="simulation"><i />{t(lang, demo)}</span></div>
      <motion.svg key={active.id} initial={reduce ? false : { opacity: .35 }} animate={{ opacity: 1 }} transition={{ duration: .2 }}
        className="lesson-chart" viewBox="0 0 650 240" role="img" aria-label={t(lang, active.title)}>
        {[36, 82, 164, 210].map((line) => <path key={line} d={`M18 ${line}H631`} className="chart-grid" />)}
        {[0,2,4,6,8,10,12].map((i) => <path key={i} d={`M${x(i)} 22V221`} className="chart-grid" />)}
        <path d="M18 123H631" className="zero-line" /><text x="637" y="127" className="chart-price">0</text>
        {active.points.filter((point) => point.level).map(({ at }) => {
          const levelY = active.id === "zero" ? y(0) : y(active.values[at]);
          return <path key={at} d={`M${x(at)} ${levelY}H623`} stroke={color} strokeOpacity=".6" strokeDasharray="5 6" />;
        })}
        <path d={curve(active.values)} fill="none" stroke={color} strokeWidth="3" />
        <path d={curve(active.signal)} fill="none" stroke="#91a9db" strokeWidth="2" />
        {active.points.map(({ at, title }) => {
          const px = x(at);
          const py = y(active.values[at]);
          const labelY = py < 54 ? py + 29 : py - 19;
          return <g key={at}>
            <circle cx={px} cy={py} r="6" fill="#101724" stroke={color} strokeWidth="2" />
            <text x={px} y={labelY} fill={color} textAnchor="middle" className="lesson-tag">{t(lang, title)}</text>
          </g>;
        })}
      </motion.svg>
      <div className="lab-caption"><div className="legend"><span><i style={{ background: color }} />MACD</span><span><i />{t(lang, ["訊號線", "Signal line"])}</span></div><p>{t(lang, active.text)}</p></div>
    </div>
  </div>;
}
const icons = [CornerUpLeft, RefreshCw, ArrowDownRight, ArrowUpRight, Pause, X];
export function FiboRules({ lang }: { lang: Locale }) {
  return <dl className="rule-grid">{fiboRules.map(([name, detail], i) => {
    const Icon = icons[i];
    return <div key={name[1]} className="rule"><Icon size={18} aria-hidden="true" /><div><dt>{t(lang, name)}</dt><dd>{t(lang, detail)}</dd></div></div>;
  })}</dl>;
}

"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { indicators, releaseHistory, t, type Locale } from "@/lib/site";
import { Button } from "./ui/button";

export function Changelog({ lang }: { lang: Locale }) {
  const [filter, setFilter] = useState("all");
  const releases = releaseHistory.filter((item) => filter === "all" || item.id === filter)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  return <>
    <div className="filters" role="group" aria-label={t(lang, ["依指標篩選", "Filter by indicator"])}>
      <Button variant="ghost" className={filter === "all" ? "selected" : undefined} aria-pressed={filter === "all"} onClick={() => setFilter("all")}>{t(lang, ["所有指標", "All indicators"])}</Button>
      {indicators.map((item) => <Button key={item.id} variant="ghost" className={filter === item.id ? "selected" : undefined} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.name}</Button>)}
    </div>
    <div className="timeline" aria-live="polite">{releases.map((item) => <article className={`panel timeline-item accent-${item.color}`} key={item.id + item.version}>
      <span className="timeline-dot" /><div className="detail-heading"><h2>{item.name}</h2><span className="version">{item.version}</span></div>
      {item.title && <h3>{t(lang, item.title)}</h3>}
      <p className="release-date"><CalendarDays size={16} aria-hidden="true" />{item.date ? <time dateTime={item.date}>{t(lang, ["更新日期", "Updated"])} · {item.date}</time> : t(lang, ["發布日期待公布", "Release date pending"])}</p>
      <div className="release-detail">
        <div><h3>{t(lang, item.title ? ["更新內容", "Update notes"] : ["版本功能", "Release features"])}</h3><ul className="feature-list">{item.highlights.map((feature) => <li key={feature[1]}>{t(lang, feature)}</li>)}</ul></div>
        <div><h3>{t(lang, ["修正項目", "Fixes"])}</h3>{item.fixes?.length ? <ul className="feature-list">{item.fixes.map((fix) => <li key={fix[1]}>{t(lang, fix)}</li>)}</ul> : <p>{t(lang, ["待提供版本修正紀錄", "Fix notes pending"])}</p>}
          <h3>{t(lang, ["預定相容版本", "Target compatibility"])}</h3><p>{item.compatibility.length ? item.compatibility.map(({ name, version }) => name + " " + version).join(" · ") : t(lang, ["與其他指標的相容性待確認", "Compatibility with other indicators is pending"])}</p>
          <h3>{t(lang, ["測試狀態", "Testing status"])}</h3><p>{t(lang, item.testing)}</p>
        </div>
      </div>
      {item.tradingView && <Button asChild><a href={item.tradingView}>TradingView ↗</a></Button>}
    </article>)}</div>
  </>;
}

"use client";

import { useState } from "react";
import { ArrowDownToLine, CalendarDays, Package, ScrollText } from "lucide-react";
import { bundle, indicators, releaseHistory, t, type Locale } from "@/lib/site";
import { Button } from "./ui/button";

const pending = ["尚未發布", "Not yet published"] as const;
function DownloadLink({ lang, href }: { lang: Locale; href: string | null }) {
  return href ? <Button asChild variant="primary"><a href={href}><ArrowDownToLine size={15} aria-hidden="true" />{t(lang, ["下載原始碼", "Download source"])}</a></Button> :
    <span className="release-status"><span />{t(lang, pending)}</span>;
}

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
      <p className="release-date"><CalendarDays size={16} aria-hidden="true" />{item.date ? <time dateTime={item.date}>{item.date}</time> : t(lang, ["發布日期待公布", "Release date pending"])}</p>
      <div className="release-detail">
        <div><h3>{t(lang, ["版本功能", "Release features"])}</h3><ul className="feature-list">{item.highlights.map((feature) => <li key={feature[1]}>{t(lang, feature)}</li>)}</ul></div>
        <div><h3>{t(lang, ["修正項目", "Fixes"])}</h3>{item.fixes?.length ? <ul className="feature-list">{item.fixes.map((fix) => <li key={fix[1]}>{t(lang, fix)}</li>)}</ul> : <p>{t(lang, ["待提供版本修正紀錄", "Fix notes pending"])}</p>}
          <h3>{t(lang, ["預定相容版本", "Target compatibility"])}</h3><p>{item.compatibility.map(({ name, version }) => name + " " + version).join(" · ")}</p>
          <h3>{t(lang, ["測試狀態", "Testing status"])}</h3><p>{t(lang, item.testing)}</p>
        </div>
      </div>
      <DownloadLink lang={lang} href={item.download} />
    </article>)}</div>
  </>;
}

export function Downloads({ lang }: { lang: Locale }) {
  return <div className="downloads-grid">
    {indicators.map((item) => <article key={item.id} id={item.id} className={`panel download-card accent-${item.color}`}>
      <div className="card-top"><span className="feature-icon"><ScrollText size={22} aria-hidden="true" /></span><span className="version">{item.version}</span></div>
      <h2>{item.name}</h2><p>{t(lang, item.role)}</p><p>Pine Script v6 · TradingView</p>
      <p>{t(lang, ["預定配對", "Target pairing"])} · {indicators.filter(({ id }) => id !== item.id).map(({ name, version }) => name + " " + version).join(" / ")}</p>
      <DownloadLink lang={lang} href={item.download} />
    </article>)}
    <article id="bundle" className="panel download-card accent-blue">
      <div className="card-top"><span className="feature-icon"><Package size={22} aria-hidden="true" /></span><span className="version">{bundle.format}</span></div>
      <h2>{t(lang, ["三個指標同步套裝", "Three-indicator bundle"])}</h2><p>TradingView · Pine Script v6</p>
      <p>{indicators.map(({ name, version }) => name + " " + version).join(" / ")}</p>
      {bundle.url ? <Button asChild variant="primary"><a href={bundle.url}><ArrowDownToLine size={15} aria-hidden="true" />{t(lang, ["下載 ZIP", "Download ZIP"])}</a></Button> : <DownloadLink lang={lang} href={null} />}
    </article>
  </div>;
}

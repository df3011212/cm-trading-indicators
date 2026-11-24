import { SiteLink as Link } from "./site-link";
import { ArrowRight } from "lucide-react";
import { guides } from "@/lib/documentation";
import { labels, route, syncStatus, t, type Copy, type Locale, type Page } from "@/lib/site";
import { Architecture } from "./architecture";
import { MtfTable } from "./charts";
import { IndicatorDetails } from "./indicators";
import { FiboRules, PatternLab } from "./lab";
import { Changelog } from "./releases";

const subtitles: Record<Page, Copy> = {
  indicators: ["從 MACD 型態辨識、價格定位到多週期警報，按需要選擇分析模組。", "Choose the modules you need for MACD pattern recognition, price mapping, and multi-timeframe alerts."],
  architecture: ["三個獨立模組共用核心辨識規則。", "Three independent modules share the core recognition rules."],
  documentation: ["從 TradingView 安裝開始，逐步讀懂 MACD 型態、FIBO 與多週期監控。", "Start with TradingView installation and learn MACD patterns, FIBO, and multi-timeframe monitoring."],
  changelog: ["依指標查閱版本功能、發布日期、修正項目與驗證狀態。", "Browse release features, dates, fixes, and testing status by indicator."],
};

function Documentation({ lang }: { lang: Locale }) {
  return <div className="docs-grid">
    <aside><nav aria-label={t(lang, ["教學目錄", "Documentation contents"])}><h2>{t(lang, ["教學目錄", "On this page"])}</h2>
      <ol>{guides.map((guide) => <li key={guide.id}><a href={"#" + guide.id}>{t(lang, guide.title)}</a></li>)}</ol></nav></aside>
    <div className="docs-content">
      {guides.map((guide) => <section key={guide.id} id={guide.id} className="docs-section">
        <h2>{t(lang, guide.title)}</h2>
        {guide.body.map((paragraph) => <p key={paragraph[1]}>{t(lang, paragraph)}</p>)}
        {guide.link && guide.linkLabel && <a className="detail-link" href={guide.link}>{t(lang, guide.linkLabel)} <ArrowRight size={15} aria-hidden="true" /></a>}
        {guide.id === "install" && <Link className="detail-link" href={route(lang, "indicators")}>{t(lang, labels.indicators)} <ArrowRight size={15} aria-hidden="true" /></Link>}
        {guide.id === "points" && <PatternLab lang={lang} />}
        {guide.id === "auto-fibo" && <FiboRules lang={lang} />}
        {guide.id === "multi-timeframe" && <MtfTable lang={lang} />}
      </section>)}
    </div>
  </div>;
}

export function ContentPage({ page, lang }: { page: Page; lang: Locale }) {
  return <div className="container interior">
    <div className="page-heading"><h1>{t(lang, labels[page])}</h1><p>{t(lang, subtitles[page])}</p></div>
    {page === "indicators" && <IndicatorDetails lang={lang} />}
    {page === "architecture" && <Architecture lang={lang} />}
    {page === "documentation" && <Documentation lang={lang} />}
    {page === "changelog" && <Changelog lang={lang} />}
  </div>;
}

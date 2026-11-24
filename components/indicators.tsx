import { SiteLink as Link } from "./site-link";
import { Activity, ArrowDownToLine, ArrowRight, BellRing, ExternalLink, Layers3 } from "lucide-react";
import { indicators, route, t, type Locale } from "@/lib/site";
import { Button } from "./ui/button";

const icons = [Activity, Layers3, BellRing];
export function IndicatorCards({ lang }: { lang: Locale }) {
  return <div className="indicator-grid">{indicators.map((item, index) => {
    const Icon = icons[index];
    return <article key={item.id} className={`indicator-card accent-${item.color}`}>
      <div className="card-top"><span className="feature-icon"><Icon size={24} aria-hidden="true" /></span><span className="version">{item.version}</span></div>
      <h3>{item.name}</h3><p className="card-role">{t(lang, item.role)}</p>
      <p>{t(lang, item.overview)}</p>
      <ul>{item.features.map((feature) => <li key={feature[1]}>{t(lang, feature)}</li>)}</ul>
      <div className="card-links">
        <Link className="detail-link" href={route(lang, "indicators") + "#" + item.id}>{t(lang, ["查看詳細介紹", "Explore indicator"])} <ArrowRight size={15} aria-hidden="true" /></Link>
        <div className="card-secondary">
          <Link href={route(lang, "downloads") + "#" + item.id}><ArrowDownToLine size={13} aria-hidden="true" />{t(lang, ["下載原始碼", "Source download"])}</Link>
          {item.tradingView ? <a href={item.tradingView}>TradingView <ExternalLink size={12} aria-hidden="true" /></a> : <span>TradingView · {t(lang, ["待發布", "Pending"])}</span>}
        </div>
      </div>
    </article>;
  })}</div>;
}

export function IndicatorDetails({ lang }: { lang: Locale }) {
  return <div className="detail-stack">{indicators.map((item) => <article key={item.id} id={item.id} className={`panel accent-${item.color}`}>
    <div className="detail-heading"><h2>{item.name}</h2><span className="version">{item.version}</span></div>
    <p className="card-role">{t(lang, item.role)}</p>
    <p>{t(lang, item.overview)}</p>
    <ul className="feature-list">{item.features.map((feature) => <li key={feature[1]}>{t(lang, feature)}</li>)}</ul>
    <p>{t(lang, item.usage)}</p>
    <div className="inline-actions">
      <Button asChild><Link href={route(lang, "downloads") + "#" + item.id}><ArrowDownToLine size={16} aria-hidden="true" />{t(lang, ["下載原始碼", "Source download"])}</Link></Button>
      {item.tradingView ? <Button asChild><a href={item.tradingView}>TradingView <ExternalLink size={15} aria-hidden="true" /></a></Button> :
        <span className="release-status">TradingView · {t(lang, ["尚未發布", "Not yet published"])}</span>}
    </div>
  </article>)}</div>;
}

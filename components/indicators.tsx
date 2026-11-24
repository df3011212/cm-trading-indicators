import { SiteLink as Link } from "./site-link";
import { Activity, ArrowRight, BellRing, ExternalLink, Layers3 } from "lucide-react";
import { otherIndicators, indicators, route, t, type Locale } from "@/lib/site";
import { Button } from "./ui/button";
import { IndicatorArtwork } from "./indicator-artwork";

const icons = [Activity, Layers3, BellRing];
export function IndicatorCards({ lang }: { lang: Locale }) {
  return <div className="indicator-grid">{indicators.map((item, index) => {
    const Icon = icons[index];
    return <article key={item.id} className={`indicator-card accent-${item.color}`}>
      <div className="card-top"><span className="feature-icon"><Icon size={24} aria-hidden="true" /></span><span className="version">{item.version}</span></div>
      <h3>{item.name}</h3><p className="card-role">{t(lang, item.role)}</p>
      <p>{t(lang, item.overview)}</p>
      <IndicatorArtwork index={index} />
      <ul>{item.features.map((feature) => <li key={feature[1]}>{t(lang, feature)}</li>)}</ul>
      <div className="card-links">
        <Link className="detail-link" href={route(lang, "indicators") + "#" + item.id}>{t(lang, ["查看詳細介紹", "Explore indicator"])} <ArrowRight size={15} aria-hidden="true" /></Link>
        <div className="card-secondary">
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
    {item.sections.map((section) => <section key={section.title[1]}><h3>{t(lang, section.title)}</h3>{section.body.map((line) => <p key={line[1]}>{t(lang, line)}</p>)}</section>)}
    <p>{t(lang, item.usage)}</p><p>{t(lang, item.note)}</p>
    <div className="inline-actions">
      {item.tradingView ? <Button asChild><a href={item.tradingView}>TradingView <ExternalLink size={15} aria-hidden="true" /></a></Button> :
        <span className="release-status">TradingView · {t(lang, ["尚未發布", "Not yet published"])}</span>}
    </div>
  </article>)}
    <section className="panel"><h2>{t(lang, ["其他 TradingView 指標", "More TradingView indicators"])}</h2>
      <ul className="additional-scripts">{otherIndicators.map((item) => <li key={item.url}><a className="detail-link" href={item.url}>{item.name}<ExternalLink size={15} aria-hidden="true" /></a></li>)}</ul>
    </section></div>;
}

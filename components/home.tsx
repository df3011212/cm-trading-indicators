import { SiteLink as Link } from "./site-link";
import { ArrowRight, Workflow } from "lucide-react";
import { description, route, site, t, type Locale } from "@/lib/site";
import { Architecture } from "./architecture";
import { MtfTable } from "./charts";
import { MarketTerminal } from "./market-terminal";
import { IndicatorCards } from "./indicators";
import { FiboRules, PatternLab } from "./lab";
import { Button } from "./ui/button";

export function Home({ lang }: { lang: Locale }) {
  return <>
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="product-label"><span aria-hidden="true" />{site.subtitle}</div>
          <h1>{t(lang, ["讓市場結構，", "See market"])}<br /><span>{t(lang, ["變得清晰。", "structure clearly."])}</span></h1>
          <p className="hero-subtitle">Pattern Recognition. Price Structure.<br className="subtitle-break" /> Multi-Timeframe Intelligence.</p>
          <p className="hero-description">{t(lang, description)}</p>
          <div className="inline-actions hero-actions">
            <Button asChild variant="primary"><Link href="#indicators">{t(lang, ["探索指標", "Explore indicators"])}<ArrowRight size={17} aria-hidden="true" /></Link></Button>
          </div>
        </div>
        <MarketTerminal lang={lang} />
      </div>
    </section>
    <section id="indicators" className="container content-section">
      <div className="section-heading"><h2>{t(lang, ["三個核心指標", "Three core indicators"])}</h2><Link href={route(lang, "indicators")} className="detail-link">{t(lang, ["查看所有指標", "All indicators"])} <ArrowRight size={16} aria-hidden="true" /></Link></div>
      <IndicatorCards lang={lang} />
    </section>
    <section className="container content-section">
      <div className="section-heading"><h2>{t(lang, ["系統架構", "System architecture"])}</h2><Link href={route(lang, "architecture")} className="detail-link"><Workflow size={16} aria-hidden="true" />{t(lang, ["架構說明", "Architecture details"])}</Link></div>
      <Architecture lang={lang} />
    </section>
    <section className="container content-section">
      <div className="section-heading"><h2>{t(lang, ["互動式 MACD 教學", "Interactive MACD guide"])}</h2><Link href={route(lang, "documentation")} className="detail-link">{t(lang, ["完整教學", "Read documentation"])} <ArrowRight size={16} aria-hidden="true" /></Link></div>
      <PatternLab lang={lang} />
      <h3 className="subheading">{t(lang, ["FIBO 更新規則", "FIBO update rules"])}</h3>
      <FiboRules lang={lang} />
    </section>
    <section id="mtf-demo" className="container content-section">
      <div className="section-heading"><h2>{t(lang, ["多週期監控", "Multi-timeframe monitoring"])}</h2></div>
      <MtfTable lang={lang} />
    </section>
  </>;
}

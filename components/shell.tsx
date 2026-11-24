import { SiteLink as Link } from "./site-link";
import { Activity } from "lucide-react";
import { site, t, type Locale } from "@/lib/site";
export { Header } from "./navigation";
export function AnalyticsMark() {
  return <span className="brand-mark"><Activity aria-hidden="true" size={21} /></span>;
}
export function Footer({ lang }: { lang: Locale }) {
  return <footer className="footer">
    <div className="container">
      <div className="footer-top">
        <Link href={lang === "en" ? "/en/" : "/"} className="brand"><AnalyticsMark /> {site.name}</Link>
        <div className="footer-links">
          {([["TradingView", site.tradingView], ["Threads", site.threads]] as const).map(([label, url]) =>
            url ? <a key={label} href={url}>{label}</a> : <span key={label} title={t(lang, ["尚未提供連結", "Link pending"])}>{label}</span>)}
        </div>
      </div>
      <p>Built with Pine Script v6 for TradingView.</p>
      <p className="disclaimer">{t(lang, ["本網站及指標僅供技術分析、教育與程式研究用途，不構成投資建議。所有型態、警報及價格目標皆不代表未來行情必然發生。", "This website and its indicators are for technical analysis, education, and programming research only. They do not constitute investment advice. Patterns, alerts, and price targets do not guarantee future market movement."])}</p>
    </div>
  </footer>;
}

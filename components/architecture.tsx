import { SiteLink as Link } from "./site-link";
import { Activity, BellRing, ChevronRight, Layers3 } from "lucide-react";
import { indicators, route, syncStatus, t, type Locale } from "@/lib/site";

export function Architecture({ lang }: { lang: Locale }) {
  const subtitles = [
    ["唯一核心辨識母版", "Core recognition reference"],
    ["價格定位、FIBO 繪製、TP 目標", "Price mapping, FIBO levels, TP targets"],
    ["MTF 表格、共振、警報通知", "MTF table, alignment, alert notifications"],
  ] as const;
  const icons = [Activity, Layers3, BellRing];
  return <div className="architecture">
    <div className="architecture-tree">
      <svg className="architecture-lines" viewBox="0 0 900 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M450 0V26H225V56 M450 26H675V56 M220 50L225 57L230 50 M670 50L675 57L680 50" />
      </svg>
      <svg className="architecture-mobile-line" viewBox="0 0 32 180" preserveAspectRatio="none" aria-hidden="true">
        <path d="M2 2V160H31 M2 52H31 M25 46L31 52L25 58 M25 154L31 160L25 166" />
      </svg>
      {indicators.map((item, i) => {
        const Icon = icons[i];
        return <div className={`architecture-item architecture-item-${i} accent-${item.color}`} key={item.id}>
          <Link href={route(lang, "indicators") + "#" + item.id} className="architecture-node" aria-describedby={`architecture-detail-${i}`}>
            <span className="feature-icon"><Icon size={21} aria-hidden="true" /></span>
            <span className="architecture-label"><strong>{item.name} <small>{item.version}</small></strong><span>{t(lang, subtitles[i])}</span></span>
            <ChevronRight size={15} aria-hidden="true" />
          </Link>
          <div className="architecture-tooltip" id={`architecture-detail-${i}`} role="tooltip">{t(lang, item.usage)}</div>
        </div>;
      })}
    </div>
    <p className="notice"><span />{t(lang, syncStatus)}</p>
  </div>;
}

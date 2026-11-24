"use client";

import { useState, type ReactNode } from "react";
import { SiteLink as Link } from "./site-link";
import { usePathname } from "next/navigation";
import { ChartNoAxesCombined, Globe2, Heart, Menu, X } from "lucide-react";
import { labels, pages, route, site, t, type Locale } from "@/lib/site";

export function Header({ lang, mark }: { lang: Locale; mark: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const page = pages.find((item) => item === parts[lang === "en" ? 1 : 0]);
  const alternate = lang === "en" ? "zh-TW" : "en";
  const external = [
    { name: "TradingView", href: site.tradingView, Icon: ChartNoAxesCombined },
  ];
  return <header className="site-header" onKeyDown={(event) => {
    if (event.key === "Escape" && open) {
      setOpen(false);
      document.getElementById("menu-toggle")?.focus();
    }
  }}>
    <div className="container header-inner">
      <Link href={route(lang)} className="brand" onClick={() => setOpen(false)}>{mark}<span>CM Trading <span className="brand-secondary">Indicators</span></span></Link>
      <a className="header-patreon" href={site.patreon} target="_blank" rel="noopener noreferrer"
        aria-label={t(lang, ["在 Patreon 支持開發", "Support development on Patreon"])}>
        <Heart size={16} aria-hidden="true" /><span>Patreon</span>
      </a>
      <button id="menu-toggle" className="menu-toggle" type="button" aria-controls="site-nav" aria-expanded={open}
        aria-label={t(lang, [open ? "關閉選單" : "開啟選單", open ? "Close menu" : "Open menu"])} onClick={() => setOpen(!open)}>
        {open ? <X /> : <Menu />}
      </button>
      <nav id="site-nav" className={open ? "site-nav is-open" : "site-nav"} aria-label={t(lang, ["主要導覽", "Main navigation"])}>
        <div className="nav-pages">
          <Link href={route(lang)} aria-current={page ? undefined : "page"} onClick={() => setOpen(false)}>{t(lang, ["首頁", "Home"])}</Link>
          {pages.map((item) => <Link key={item} href={route(lang, item)} aria-current={page === item ? "page" : undefined} onClick={() => setOpen(false)}>{t(lang, labels[item])}</Link>)}
        </div>
        <div className="nav-tools">
          {external.map(({ name, href, Icon }) => href
            ? <a key={name} className="icon-link" href={href} aria-label={name} title={name}><Icon size={17} aria-hidden="true" /></a>
            : <span key={name} className="icon-link unavailable" title={name + " · " + t(lang, ["連結待提供", "Link pending"])} aria-label={name + " · " + t(lang, ["連結待提供", "Link pending"])}><Icon size={17} aria-hidden="true" /></span>)}
          <Link href={route(alternate, page)} className="language" hrefLang={alternate} onClick={() => setOpen(false)} aria-label={lang === "en" ? "切換繁體中文" : "Switch to English"}><Globe2 size={15} aria-hidden="true" />{lang === "en" ? "繁中" : "EN"}</Link>
        </div>
      </nav>
    </div>
  </header>;
}

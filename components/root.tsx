import type { ReactNode } from "react";
import { AnalyticsMark, Footer, Header } from "./shell";
import { t, type Locale } from "@/lib/site";
import "@/app/globals.css";

export function Root({ lang, children }: { lang: Locale; children: ReactNode }) {
  return <html lang={lang} className="dark"><body>
    <a className="skip-link" href="#main">{t(lang, ["跳至主要內容", "Skip to content"])}</a>
    <Header lang={lang} mark={<AnalyticsMark />} />
    <main id="main" tabIndex={-1}>{children}</main>
    <Footer lang={lang} />
  </body></html>;
}

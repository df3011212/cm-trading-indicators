import { Check } from "lucide-react";
import type { Timeframe } from "@/lib/market-demo";
import { t, type Locale } from "@/lib/site";

const rows = [
  ["5M", true, ["暫定第 2 點", "Provisional P2"], false, ["暫定第 1 點", "Provisional P1"], false],
  ["15M", false, ["第 2 點", "Point 2"], true, ["雙底", "Double bottom"], true],
  ["1H", false, ["雙頂", "Double top"], true, ["暫定第 1 點", "Provisional P1"], false],
  ["4H", false, ["第 2 點", "Point 2"], true, ["暫定第 1 點", "Provisional P1"], false],
  ["1D", true, ["第 2 點", "Point 2"], true, ["暫定第 2 點", "Provisional P2"], true],
] as const;

export function MtfTable({ lang, compact = false, timeframe = "4H" }: { lang: Locale; compact?: boolean; timeframe?: Timeframe }) {
  const direction = (bull: boolean) => t(lang, bull ? ["多方", "Bull"] : ["空方", "Bear"]);
  return <div className={compact ? "mtf compact" : "mtf"}>
    <table>
      <caption>{compact ? t(lang, ["多週期監控", "MULTI-TIMEFRAME MONITOR"]) : t(lang, ["功能展示 · 非即時市場訊號", "Feature demonstration · No live market signals"])}</caption>
      <thead><tr><th scope="col">{t(lang, ["週期", "TF"])}</th><th scope="col">{t(lang, ["前一次標籤", "Previous label"])}</th><th scope="col">{t(lang, ["最新 MACD 標籤", "Latest MACD label"])}</th><th scope="col">{t(lang, ["同向", "Aligned"])}</th></tr></thead>
      <tbody>{rows.map(([tf, previous, previousText, latest, latestText, aligned]) => <tr key={tf} className={tf === timeframe ? "current-tf" : undefined}>
        <th scope="row">{tf}{tf === timeframe && <span className="sr-only"> {t(lang, ["目前週期", "Current timeframe"])}</span>}</th>
        <td className={previous ? "bull" : "bear"}>{direction(previous)} · {t(lang, previousText)}</td>
        <td className={latest ? "bull" : "bear"}>{direction(latest)} · {t(lang, latestText)}</td>
        <td>{aligned && <><Check aria-hidden="true" size={compact ? 12 : 16} className="bull" /><span className="sr-only">{t(lang, ["同向", "Aligned"])}</span></>}</td>
      </tr>)}</tbody>
    </table>
  </div>;
}

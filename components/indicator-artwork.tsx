export function IndicatorArtwork({ index }: { index: number }) {
  return <svg className="indicator-artwork" viewBox="0 0 320 78" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 19H320 M0 39H320 M0 59H320 M40 0V78 M80 0V78 M120 0V78 M160 0V78 M200 0V78 M240 0V78 M280 0V78" className="art-grid" />
    {index === 0 && <>
      <path d="M0 51C27 57 40 65 66 53S96 23 124 24 151 61 181 57 205 27 233 27 263 41 285 30 307 15 320 12" className="art-active" />
      <path d="M0 56C29 61 50 60 70 54S102 35 128 33 156 55 182 56 215 42 233 38 262 37 285 36 308 30 320 24" className="art-muted" />
      <circle cx="170" cy="55" r="4" className="art-point" /><circle cx="274" cy="34" r="4" className="art-point" />
    </>}
    {index === 1 && <>
      <path d="M0 15H320 M0 29H320 M0 44H320 M0 58H320 M0 72H320" className="art-level" />
      <path d="M0 68L42 59 67 63 102 39 135 45 175 26 214 33 263 18 283 22 320 10" className="art-active" />
      <circle cx="67" cy="63" r="4" className="art-point" /><circle cx="263" cy="18" r="4" className="art-point" />
    </>}
    {index === 2 && <>
      <path d="M16 18H74 M86 18H148 M162 18H209 M230 18H300 M16 39H56 M66 39H122 M133 39H186 M198 39H258 M273 39H300 M16 60H105 M119 60H170 M183 60H231 M245 60H300" className="art-segments" />
      <path d="M16 18H74 M162 18H209 M66 39H122 M198 39H258 M16 60H105 M183 60H231" className="art-segments art-segments-on" />
    </>}
  </svg>;
}

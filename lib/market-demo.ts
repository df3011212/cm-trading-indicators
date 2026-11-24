export const timeframes = ["5M", "15M", "1H", "4H", "1D"] as const;
export type Timeframe = (typeof timeframes)[number];

const parameters = {
  "5M": { seed: 13, center: 66320, scale: 0.19, minutes: 5 },
  "15M": { seed: 78, center: 66100, scale: 0.37, minutes: 15 },
  "1H": { seed: 35, center: 65830, scale: 0.66, minutes: 60 },
  "4H": { seed: 42, center: 65520, scale: 1, minutes: 240 },
  "1D": { seed: 85, center: 64940, scale: 1.55, minutes: 1440 },
};

const anchors = [625, 760, 440, 120, 380, 565, 155, 270, 725, 1035, 850, 1320];
const count = 64;
const warmup = 36;
function ema(values: number[], length: number) {
  const alpha = 2 / (length + 1);
  let value = values[0];
  return values.map((price) => {
    value += (price - value) * alpha;
    return value;
  });
}

export function marketDemo(timeframe: Timeframe) {
  const { seed, center, scale, minutes } = parameters[timeframe];
  let state = seed;
  const noise = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296 - 0.5;
  };

  let previous = center + 180 * scale;
  const candles = Array.from({ length: count + warmup }, (_, index) => {
    const visibleIndex = index - warmup;
    const position = Math.max(0, visibleIndex) / (count - 1) * (anchors.length - 1);
    const left = Math.min(anchors.length - 2, Math.floor(position));
    const trend = visibleIndex < 0
      ? 400 + visibleIndex * 8 + Math.sin(index / 4) * 100
      : anchors[left] + (anchors[left + 1] - anchors[left]) * (position - left);
    const close = center + (trend + Math.sin(index * .88) * 65 + noise() * 130) * scale;
    const open = previous + noise() * 95 * scale;
    const high = Math.max(open, close) + (30 + (noise() + .5) * 94) * scale;
    const low = Math.min(open, close) - (30 + (noise() + .5) * 94) * scale;
    previous = close;
    return { open, high, low, close };
  });

  const prices = candles.map((candle) => candle.close);
  const fast = ema(prices, 12);
  const slow = ema(prices, 26);
  const macd = fast.map((value, i) => value - slow[i]);
  const signal = ema(macd, 9);

  return {
    candles: candles.slice(warmup),
    macd: macd.slice(warmup),
    signal: signal.slice(warmup),
    histogram: macd.slice(warmup).map((value, i) => value - signal[warmup + i]),
    minutes,
  };
}

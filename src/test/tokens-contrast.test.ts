import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(process.cwd(), "src/design-system/tokens.css"), "utf8");

type Rgb = [number, number, number];

function parseOklch(value: string): Rgb {
  const match = value.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
  if (!match) throw new Error(`oklch invalide : ${value}`);
  const lightness = Number(match[1]);
  const chroma = Number(match[2]);
  const hue = Number(match[3]);
  const a = chroma * Math.cos((hue * Math.PI) / 180);
  const b = chroma * Math.sin((hue * Math.PI) / 180);
  let l = lightness + 0.3963377774 * a + 0.2158037573 * b;
  let m = lightness - 0.1055613458 * a - 0.0638541728 * b;
  let s = lightness - 0.0894841775 * a - 1.291485548 * b;
  l **= 3;
  m **= 3;
  s **= 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map((channel) => Math.min(1, Math.max(0, channel))) as Rgb;
}

function toRgb(value: string): Rgb {
  const trimmed = value.trim();
  if (trimmed.startsWith("#")) {
    const hex = trimmed.slice(1);
    return [0, 2, 4].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255) as Rgb;
  }
  return parseOklch(trimmed);
}

function relativeLuminance([r, g, b]: Rgb): number {
  const linear = (channel: number) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

function contrastRatio(foreground: string, background: string): number {
  const light = relativeLuminance(toRgb(foreground));
  const dark = relativeLuminance(toRgb(background));
  const [higher, lower] = light > dark ? [light, dark] : [dark, light];
  return (higher + 0.05) / (lower + 0.05);
}

function parseThemeTokens(source: string): Record<string, string> {
  const tokens: Record<string, string> = {};
  for (const line of source.split("\n")) {
    const match = line.match(/--([\w-]+):\s*(.+?);/);
    if (match) tokens[match[1]] = match[2];
  }
  return tokens;
}

const [lightSection, darkSection] = css.split(".dark");
const light = parseThemeTokens(lightSection);
const dark = parseThemeTokens(darkSection);

const pairs = [
  ["background", "foreground"],
  ["card", "card-foreground"],
  ["popover", "popover-foreground"],
  ["primary", "primary-foreground"],
  ["secondary", "secondary-foreground"],
  ["muted", "muted-foreground"],
  ["accent", "accent-foreground"],
  ["destructive", "destructive-foreground"],
  ["success", "success-foreground"],
  ["warning", "warning-foreground"],
  ["information", "information-foreground"],
] as const;

const AA_THRESHOLD = 4.5;

describe("contraste des tokens (WCAG AA)", () => {
  it.each(pairs)("thème clair : %s/%s ≥ %s:1", (background, foreground) => {
    const ratio = contrastRatio(light[foreground], light[background]);
    expect(ratio).toBeGreaterThanOrEqual(AA_THRESHOLD);
  });

  it.each(pairs)("thème sombre : %s/%s ≥ %s:1", (background, foreground) => {
    const ratio = contrastRatio(dark[foreground], dark[background]);
    expect(ratio).toBeGreaterThanOrEqual(AA_THRESHOLD);
  });
});

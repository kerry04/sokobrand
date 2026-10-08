export type Category = "Politics" | "Football" | "Business" | "Culture";

export interface Market {
  id: string;
  question: string;
  category: Category;
  yesPrice: number; // 0..1
  closes: string;
  volume: string;
  traders: string;
  featured?: boolean;
  resolution: string;
  headlines: { title: string; meta: string }[];
  history: number[]; // 14 bars, 0..100
}

export const CATEGORIES: ("All" | Category)[] = [
  "All",
  "Politics",
  "Football",
  "Business",
  "Culture",
];

export const MARKETS: Market[] = [
  {
    id: "harambee-afcon-2027",
    question: "Will Harambee Stars qualify for the 2027 AFCON?",
    category: "Football",
    yesPrice: 0.68,
    closes: "Dec 12",
    volume: "KES 2.4M",
    traders: "1,204 traders",
    featured: true,
    resolution:
      "Settles YES if Harambee Stars qualify for the 2027 AFCON, per the official CAF announcement. Locked by the news oracle — payouts are manual.",
    headlines: [
      { title: "Harambee Stars name squad for final qualifiers", meta: "2h ago · 214 mentions" },
      { title: "AFCON 2027: Kenya to co-host with Uganda & Tanzania", meta: "6h ago · 389 mentions" },
    ],
    history: [22, 28, 25, 34, 30, 42, 38, 48, 44, 56, 52, 64, 60, 68],
  },
  {
    id: "expressway-toll-2027",
    question: "Will the Nairobi Expressway toll rise in 2027?",
    category: "Politics",
    yesPrice: 0.42,
    closes: "Jan 30",
    volume: "KES 860K",
    traders: "642 traders",
    resolution:
      "Settles YES if the official Nairobi Expressway toll schedule published for 2027 shows any increase over 2026 rates.",
    headlines: [
      { title: "Moja Expressway hints at tariff review", meta: "1d ago · 96 mentions" },
      { title: "MPs question expressway pricing model", meta: "3d ago · 141 mentions" },
    ],
    history: [55, 52, 58, 50, 47, 44, 48, 43, 45, 40, 42, 39, 44, 42],
  },
  {
    id: "gor-mahia-fkf",
    question: "Gor Mahia to win the FKF Premier League?",
    category: "Football",
    yesPrice: 0.71,
    closes: "May 18",
    volume: "KES 1.1M",
    traders: "893 traders",
    resolution:
      "Settles YES if Gor Mahia finish top of the FKF Premier League table at the end of the season, per official FKF standings.",
    headlines: [
      { title: "Gor Mahia extend lead with derby win", meta: "4h ago · 178 mentions" },
      { title: "K'Ogalo unbeaten in nine", meta: "2d ago · 122 mentions" },
    ],
    history: [48, 55, 52, 60, 58, 64, 61, 66, 70, 68, 73, 69, 72, 71],
  },
  {
    id: "mpesa-fees-cut",
    question: "Will M-Pesa cut transaction fees this year?",
    category: "Business",
    yesPrice: 0.35,
    closes: "Nov 02",
    volume: "KES 540K",
    traders: "418 traders",
    resolution:
      "Settles YES if Safaricom announces a reduction to M-Pesa person-to-person transaction fees before the close date.",
    headlines: [
      { title: "CBK pushes for lower mobile money costs", meta: "5h ago · 203 mentions" },
      { title: "Safaricom says fees under review", meta: "1d ago · 154 mentions" },
    ],
    history: [30, 33, 29, 36, 32, 38, 34, 31, 36, 33, 37, 34, 36, 35],
  },
  {
    id: "nairobi-formula-e",
    question: "Will Nairobi host a Formula E race by 2028?",
    category: "Culture",
    yesPrice: 0.18,
    closes: "Mar 14",
    volume: "KES 210K",
    traders: "167 traders",
    resolution:
      "Settles YES if Formula E officially announces a Nairobi E-Prix on the race calendar for any season ending by 2028.",
    headlines: [
      { title: "Nairobi eyes electric street race", meta: "2d ago · 61 mentions" },
      { title: "Formula E scouts African venues", meta: "4d ago · 88 mentions" },
    ],
    history: [12, 15, 13, 17, 14, 19, 16, 21, 18, 22, 19, 23, 20, 18],
  },
];

export function cents(p: number): string {
  return `${Math.round(p * 100)}¢`;
}

export function kes(n: number): string {
  return `KES ${n.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;
}

import { useState } from "react";
import { cents, kes, type Market } from "../data/markets.ts";
import { ActionButton, AmountField } from "../components/ui.tsx";

const QUICK = [100, 500, 1000, 5000];

export default function MarketDetail({ market, onBack }: { market: Market; onBack: () => void }) {
  const [side, setSide] = useState<"YES" | "NO">("YES");
  const [amount, setAmount] = useState("1000");
  const [placed, setPlaced] = useState(false);

  const price = side === "YES" ? market.yesPrice : 1 - market.yesPrice;
  const amt = Math.max(0, parseInt(amount || "0", 10));
  const fee = Math.round(amt * 0.03);
  const win = price > 0 ? Math.round(amt / price) : 0;

  return (
    <div className="view-enter px-5 pt-6">
      {/* nav */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-fog">
          <span className="text-2xl leading-none">‹</span>
          <span className="text-[17px] font-semibold text-primary">Market</span>
        </button>
        <span className="text-xl font-bold tracking-widest text-fog">···</span>
      </div>

      {/* meta */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-[0.14em] text-gold">
          {market.category.toUpperCase()}
        </span>
        <span className="text-xs text-fog">
          Closes {market.closes} · {market.traders}
        </span>
      </div>

      <h1 className="mt-3 text-2xl font-bold leading-tight text-primary">{market.question}</h1>

      <div className="mt-4 flex items-baseline gap-3">
        <span
          className={`text-[44px] font-bold tabular-nums leading-none ${side === "YES" ? "text-yes" : "text-no"}`}
        >
          {Math.round(price * 100)}%
        </span>
        <span className="text-sm text-fog">chance of {side}</span>
      </div>

      {/* YES / NO segmented */}
      <div className="mt-5 flex gap-2.5">
        {(["YES", "NO"] as const).map((s) => {
          const active = side === s;
          const p = s === "YES" ? market.yesPrice : 1 - market.yesPrice;
          return (
            <button
              key={s}
              onClick={() => {
                setSide(s);
                setPlaced(false);
              }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 transition active:scale-[0.98] ${
                active
                  ? s === "YES"
                    ? "bg-yes text-ink"
                    : "bg-no text-ink"
                  : "border border-line bg-surface text-fog"
              }`}
            >
              <span className="text-sm font-bold">{s}</span>
              <span className="text-lg font-bold tabular-nums">{cents(p)}</span>
            </button>
          );
        })}
      </div>

      {/* price history */}
      <div className="mt-4 rounded-2xl border border-line bg-surface p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-primary">Price history</span>
          <span className="text-xs text-fog">30D</span>
        </div>
        <div className="mt-3 flex h-20 items-end gap-1.5">
          {market.history.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded ${side === "YES" ? "bg-yes" : "bg-no"}`}
              style={{ height: `${h}%`, opacity: 0.28 + 0.72 * (h / 100) }}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-fog">
          {side} price {market.history[13] >= market.history[0] ? "climbing" : "cooling"} on recent
          news
        </p>
      </div>

      {/* trade ticket */}
      <div className="mt-4 rounded-2xl border border-line bg-surface p-5">
        <h2 className="text-[17px] font-bold text-primary">Trade</h2>
        {placed ? (
          <div className="mt-4 rounded-2xl border border-yes/40 bg-yes/10 p-5 text-center">
            <p className="text-base font-bold text-yes">Order placed</p>
            <p className="mt-1 text-sm tabular-nums text-primary">
              {side} @ {cents(price)} · {kes(amt)}
            </p>
            <button
              onClick={() => setPlaced(false)}
              className="mt-4 text-sm font-semibold text-fog underline underline-offset-4"
            >
              Place another
            </button>
          </div>
        ) : (
          <>
            <p className="mt-4 text-[13px] font-medium text-fog">Amount (KES)</p>
            <div className="mt-2">
              <AmountField value={amount} onChange={(v) => setAmount(v)} />
            </div>
            <div className="mt-3 flex gap-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => setAmount(String(q))}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                    amount === String(q)
                      ? "border border-yes text-yes"
                      : "bg-raised text-fog"
                  }`}
                >
                  {q >= 1000 ? `${q / 1000}K` : q}
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[13px] text-fog">Potential win</span>
              <span className="text-[15px] font-bold tabular-nums text-yes">{kes(win)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[13px] text-fog">Fee (3%)</span>
              <span className="text-[13px] tabular-nums text-fog">{kes(fee)}</span>
            </div>
            <div className="mt-4">
              <ActionButton
                tone={side === "YES" ? "yes" : "ghost"}
                onClick={() => amt > 0 && setPlaced(true)}
                className={side === "NO" ? "!border-no/60 !text-no" : ""}
              >
                Buy {side} · {kes(amt)}
              </ActionButton>
            </div>
          </>
        )}
      </div>

      {/* resolution */}
      <h2 className="mt-6 text-[17px] font-bold text-primary">Resolution</h2>
      <p className="mt-2 text-sm leading-relaxed text-fog">{market.resolution}</p>

      {/* related news */}
      <h2 className="mt-6 text-[17px] font-bold text-primary">Related news</h2>
      <div className="mt-3 space-y-3 pb-6">
        {market.headlines.map((n) => (
          <div key={n.title} className="rounded-2xl border border-line bg-surface p-4">
            <p className="text-sm font-semibold leading-snug text-primary">{n.title}</p>
            <p className="mt-1.5 text-xs text-fog">{n.meta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

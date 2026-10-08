import { useMemo, useState } from "react";
import { CATEGORIES, MARKETS, cents, type Market } from "../data/markets.ts";
import { ProbBar, WalletPill, Wordmark } from "../components/ui.tsx";

export default function Markets({ onSelect }: { onSelect: (m: Market) => void }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");

  const featured = MARKETS.find((m) => m.featured)!;
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MARKETS.filter(
      (m) =>
        (cat === "All" || m.category === cat) &&
        (!q || m.question.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)),
    );
  }, [query, cat]);

  return (
    <div className="view-enter px-5 pt-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <Wordmark />
        <WalletPill label="KES 12,450" />
      </div>

      {/* search */}
      <div className="mt-5">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search markets, news…"
          className="w-full rounded-2xl border border-line bg-surface px-4 py-3 text-[15px] text-primary outline-none placeholder:text-fog/70 focus:border-yes/60"
        />
      </div>

      {/* category chips */}
      <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
        {CATEGORIES.map((c) => {
          const active = cat === c;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                active ? "bg-yes text-ink" : "border border-line bg-surface text-fog"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* featured hero */}
      {cat === "All" && !query && (
        <button
          onClick={() => onSelect(featured)}
          className="mt-5 block w-full rounded-[20px] border border-line bg-surface p-5 text-left transition active:scale-[0.99]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-[0.14em] text-gold">FEATURED</span>
            <span className="text-xs text-fog">Closes {featured.closes}</span>
          </div>
          <h2 className="mt-3 text-[19px] font-semibold leading-snug text-primary">
            {featured.question}
          </h2>
          <div className="mt-4 flex items-baseline gap-4">
            <span className="flex items-baseline gap-2">
              <span className="text-[13px] font-bold text-yes">YES</span>
              <span className="text-4xl font-bold tabular-nums text-yes">
                {cents(featured.yesPrice)}
              </span>
            </span>
            <span className="flex items-baseline gap-1.5">
              <span className="text-[13px] font-bold text-fog">NO</span>
              <span className="text-xl font-bold tabular-nums text-fog">
                {cents(1 - featured.yesPrice)}
              </span>
            </span>
          </div>
          <ProbBar pct={featured.yesPrice} className="mt-4" />
          <p className="mt-3 text-xs text-fog">
            {featured.volume} traded · {featured.traders}
          </p>
        </button>
      )}

      {/* list */}
      <h3 className="mt-7 text-lg font-bold text-primary">
        {query || cat !== "All" ? "Results" : "Trending now"}
      </h3>
      <div className="mt-3 space-y-3 pb-6">
        {list
          .filter((m) => !(cat === "All" && !query && m.featured))
          .map((m) => (
            <button
              key={m.id}
              onClick={() => onSelect(m)}
              className="block w-full rounded-2xl border border-line bg-surface p-4 text-left transition active:scale-[0.99]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-[0.12em] text-gold">
                  {m.category.toUpperCase()}
                </span>
                <span className="text-[11px] text-fog">Closes {m.closes}</span>
              </div>
              <p className="mt-2 text-[15px] font-semibold leading-snug text-primary">
                {m.question}
              </p>
              <ProbBar pct={m.yesPrice} className="mt-3" />
              <div className="mt-2.5 flex gap-3">
                <span className="text-[13px] font-bold tabular-nums text-yes">
                  YES {cents(m.yesPrice)}
                </span>
                <span className="text-[13px] font-bold tabular-nums text-fog">
                  NO {cents(1 - m.yesPrice)}
                </span>
              </div>
            </button>
          ))}
        {list.filter((m) => !(cat === "All" && !query && m.featured)).length === 0 && (
          <p className="rounded-2xl border border-line bg-surface p-6 text-center text-sm text-fog">
            No markets match. Try another search or category.
          </p>
        )}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

/** YES/NO probability bar */
export function ProbBar({ pct, className = "" }: { pct: number; className?: string }) {
  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-raised ${className}`}>
      <div
        className="h-full rounded-full bg-yes transition-all duration-300"
        style={{ width: `${Math.round(pct * 100)}%` }}
      />
    </div>
  );
}

/** Wordmark: Soko (green) + Result (white) */
export function Wordmark({ size = "text-xl" }: { size?: string }) {
  return (
    <span className={`${size} font-bold tracking-tight`}>
      <span className="text-yes">Soko</span>
      <span className="text-primary">Result</span>
    </span>
  );
}

/** Wallet pill with gold dot */
export function WalletPill({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-raised px-3.5 py-2">
      <span className="h-2 w-2 rounded-full bg-gold" />
      <span className="text-sm font-semibold tabular-nums text-primary">{label}</span>
    </div>
  );
}

/** Bottom sheet modal */
export function Sheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="fade-enter absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="sheet-enter relative w-full max-w-[430px] rounded-t-3xl border-t border-line bg-surface p-6 pb-8">
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-line" />
        {children}
      </div>
    </div>
  );
}

/** Primary action button */
export function ActionButton({
  onClick,
  children,
  tone = "yes",
  className = "",
}: {
  onClick?: () => void;
  children: ReactNode;
  tone?: "yes" | "mpesa" | "ghost";
  className?: string;
}) {
  const tones = {
    yes: "bg-yes text-ink hover:brightness-110",
    mpesa: "bg-mpesa text-ink hover:brightness-110",
    ghost: "border border-line bg-raised text-primary hover:border-fog",
  } as const;
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl py-4 text-base font-bold transition active:scale-[0.98] ${tones[tone]} ${className}`}
    >
      {children}
    </button>
  );
}

/** Labeled numeric input */
export function AmountField({
  value,
  onChange,
  suffix = "KES",
}: {
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-line bg-raised px-4 py-3.5">
      <input
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
        placeholder="0"
        className="w-full bg-transparent text-xl font-semibold tabular-nums text-primary outline-none placeholder:text-fog/50"
      />
      <span className="ml-2 text-sm text-fog">{suffix}</span>
    </div>
  );
}

/** Bottom tab bar */
export type Tab = "markets" | "wallet" | "profile";

export function TabBar({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: "markets", label: "Markets" },
    { id: "wallet", label: "Wallet" },
    { id: "profile", label: "Profile" },
  ];
  return (
    <nav className="sticky bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur">
      <div className="flex">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onTab(t.id)}
              className="flex flex-1 flex-col items-center gap-1 py-3"
            >
              <span
                className={`text-[13px] ${active ? "font-semibold text-yes" : "text-fog"}`}
              >
                {t.label}
              </span>
              {active && <span className="h-0.5 w-6 rounded-full bg-yes" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

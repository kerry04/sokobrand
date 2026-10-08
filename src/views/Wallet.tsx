import { useState } from "react";
import { kes } from "../data/markets.ts";
import { ActionButton, AmountField, Sheet } from "../components/ui.tsx";

interface Tx {
  label: string;
  meta: string;
  amount: number; // signed KES
}

const TXS: Tx[] = [
  { label: "M-Pesa deposit", meta: "Today · 09:41", amount: 5000 },
  { label: "Bought YES · Harambee Stars AFCON", meta: "Yesterday · 18:02", amount: -1000 },
  { label: "Won · Gor Mahia clean sheet", meta: "Mon · 21:15", amount: 1470 },
  { label: "M-Pesa deposit", meta: "Mon · 08:30", amount: 10000 },
];

export default function Wallet() {
  const [sheet, setSheet] = useState<"deposit" | "withdraw" | null>(null);
  const [phone, setPhone] = useState("2547");
  const [depAmt, setDepAmt] = useState("1000");
  const [wdAmt, setWdAmt] = useState("2000");
  const [depState, setDepState] = useState<"idle" | "sent">("idle");
  const [wdState, setWdState] = useState<"idle" | "processing">("idle");

  const close = () => {
    setSheet(null);
    setDepState("idle");
    setWdState("idle");
  };

  return (
    <div className="view-enter px-5 pt-6">
      <h1 className="text-[22px] font-bold text-primary">Wallet</h1>

      {/* balance hero */}
      <div className="mt-4 rounded-[20px] border border-line bg-surface p-6">
        <p className="text-[13px] font-medium text-fog">Total balance</p>
        <p className="mt-1 text-4xl font-bold tabular-nums text-primary">KES 12,450.00</p>
        <p className="mt-2 text-xs text-fog">Available to trade or withdraw</p>
      </div>

      {/* soko token card */}
      <div className="mt-3 rounded-[20px] border border-gold/30 bg-surface p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] text-gold">SOKO TOKEN</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-primary">
              12,500 <span className="text-base font-semibold text-fog">SOKO</span>
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
            <span className="text-lg font-bold text-gold">S</span>
          </div>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-fog">
          Rewards for trading and referrals. Fee discounts coming soon.
        </p>
      </div>

      {/* actions */}
      <div className="mt-4 flex gap-3">
        <ActionButton tone="mpesa" onClick={() => setSheet("deposit")}>
          Deposit
        </ActionButton>
        <ActionButton tone="ghost" onClick={() => setSheet("withdraw")}>
          Withdraw
        </ActionButton>
      </div>

      {/* transactions */}
      <h2 className="mt-7 text-[17px] font-bold text-primary">Recent activity</h2>
      <div className="mt-3 space-y-2.5 pb-6">
        {TXS.map((t) => (
          <div
            key={`${t.label}-${t.meta}`}
            className="flex items-center justify-between rounded-2xl border border-line bg-surface px-4 py-3.5"
          >
            <div>
              <p className="text-sm font-semibold text-primary">{t.label}</p>
              <p className="mt-0.5 text-xs text-fog">{t.meta}</p>
            </div>
            <span
              className={`text-sm font-bold tabular-nums ${t.amount >= 0 ? "text-yes" : "text-primary"}`}
            >
              {t.amount >= 0 ? "+" : "−"}{kes(Math.abs(t.amount)).replace("KES ", "")}
            </span>
          </div>
        ))}
      </div>

      {/* deposit sheet */}
      <Sheet open={sheet === "deposit"} onClose={close}>
        {depState === "sent" ? (
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mpesa/15">
              <span className="text-2xl font-bold text-mpesa">✓</span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-primary">Prompt sent</h3>
            <p className="mt-2 text-sm leading-relaxed text-fog">
              Check your phone for the M-Pesa prompt to complete the deposit of {kes(Number(depAmt) || 0)}.
            </p>
            <div className="mt-6">
              <ActionButton tone="mpesa" onClick={close}>
                Done
              </ActionButton>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-primary">Deposit via M-Pesa</h3>
            <p className="mt-4 text-[13px] font-medium text-fog">M-Pesa number</p>
            <div className="mt-2">
              <AmountField value={phone} onChange={setPhone} suffix="" />
            </div>
            <p className="mt-4 text-[13px] font-medium text-fog">Amount (KES)</p>
            <div className="mt-2">
              <AmountField value={depAmt} onChange={setDepAmt} />
            </div>
            <div className="mt-6">
              <ActionButton tone="mpesa" onClick={() => setDepState("sent")}>
                Send M-Pesa prompt
              </ActionButton>
            </div>
            <p className="mt-3 text-center text-xs text-fog">
              Design preview — no real money moves.
            </p>
          </>
        )}
      </Sheet>

      {/* withdraw sheet */}
      <Sheet open={sheet === "withdraw"} onClose={close}>
        {wdState === "processing" ? (
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15">
              <span className="text-2xl font-bold text-gold">…</span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-primary">Processing</h3>
            <p className="mt-2 text-sm leading-relaxed text-fog">
              Withdrawing {kes(Number(wdAmt) || 0)} to your M-Pesa. Usually lands in under 10
              minutes.
            </p>
            <div className="mt-6">
              <ActionButton tone="ghost" onClick={close}>
                Close
              </ActionButton>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-primary">Withdraw to M-Pesa</h3>
            <p className="mt-4 text-[13px] font-medium text-fog">Amount (KES)</p>
            <div className="mt-2">
              <AmountField value={wdAmt} onChange={setWdAmt} />
            </div>
            <p className="mt-3 text-xs text-fog">Min KES 100 · Max KES 10,000 per request</p>
            <div className="mt-6">
              <ActionButton tone="ghost" onClick={() => setWdState("processing")}>
                Withdraw
              </ActionButton>
            </div>
          </>
        )}
      </Sheet>
    </div>
  );
}

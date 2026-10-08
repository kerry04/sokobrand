import { useState } from "react";
import type { Market } from "./data/markets.ts";
import { TabBar, type Tab } from "./components/ui.tsx";
import Markets from "./views/Markets.tsx";
import MarketDetail from "./views/MarketDetail.tsx";
import Wallet from "./views/Wallet.tsx";
import Profile from "./views/Profile.tsx";

export default function App() {
  const [tab, setTab] = useState<Tab>("markets");
  const [selected, setSelected] = useState<Market | null>(null);

  const goTab = (t: Tab) => {
    setTab(t);
    setSelected(null);
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] border-x border-line bg-ink">
      {/* design-preview badge */}
      <div className="pointer-events-none fixed right-3 top-3 z-[60]">
        <span className="rounded-full border border-gold/40 bg-ink/90 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-gold backdrop-blur">
          DESIGN PREVIEW
        </span>
      </div>

      <main className="pb-2">
        {tab === "markets" &&
          (selected ? (
            <MarketDetail market={selected} onBack={() => setSelected(null)} />
          ) : (
            <Markets onSelect={setSelected} />
          ))}
        {tab === "wallet" && <Wallet />}
        {tab === "profile" && <Profile />}
      </main>

      <TabBar tab={tab} onTab={goTab} />
    </div>
  );
}

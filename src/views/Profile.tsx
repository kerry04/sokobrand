export default function Profile() {
  return (
    <div className="view-enter px-5 pt-6">
      <h1 className="text-[22px] font-bold text-primary">Profile</h1>

      <div className="mt-4 flex items-center gap-4 rounded-[20px] border border-line bg-surface p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yes/15">
          <span className="text-xl font-bold text-yes">K</span>
        </div>
        <div>
          <p className="text-[17px] font-bold text-primary">Kerry O.</p>
          <p className="mt-0.5 text-xs text-fog">kerryobai713@gmail.com</p>
        </div>
      </div>

      <div className="mt-3 rounded-[20px] border border-line bg-surface p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-primary">Verify ID</p>
          <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">
            Pending
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-fog">
          Complete ID verification to unlock withdrawals. Takes about 2 minutes.
        </p>
        <button className="mt-4 w-full rounded-2xl bg-yes py-3.5 text-[15px] font-bold text-ink transition active:scale-[0.98]">
          Start verification
        </button>
      </div>

      <div className="mt-3 space-y-2.5 pb-6">
        {["Trading history", "Notifications", "Help & support", "Log out"].map((item) => (
          <button
            key={item}
            className="block w-full rounded-2xl border border-line bg-surface px-4 py-4 text-left text-[15px] font-medium text-primary transition active:scale-[0.99]"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

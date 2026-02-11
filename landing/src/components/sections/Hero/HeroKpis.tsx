"use client";

import { HERO_KPIS } from "../../../data/hero.data";

export default function HeroKpis() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {HERO_KPIS.map((m) => (
                <div
                    key={m.label}
                    className={[
                        "rounded-[18px] bg-white",
                        "border border-slate-200",
                        "shadow-[0_18px_30px_-26px_rgba(15,23,42,0.30)]",
                        "p-4",
                        "transition-transform duration-200 ease-out hover:scale-[1.01]",
                    ].join(" ")}
                >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {m.label}
                    </div>
                    <div className="mt-1 text-[14px] font-semibold text-slate-900">
                        {m.value}
                    </div>
                </div>
            ))}
        </div>
    );
}

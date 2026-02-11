"use client";

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

export default function StepCard({
    t,
    d,
    compact = false,
}: {
    n: string;
    t: string;
    d: string;
    icon: React.ReactNode;
    meta: string;
    index?: number;
    compact?: boolean;
}) {
    const R = "rounded-[22px]";

    return (
        <div
            className={cx(
                "group relative overflow-hidden",
                R,
                "bg-white/80 backdrop-blur",
                "border border-slate-200",
                "shadow-[0_18px_34px_-28px_rgba(15,23,42,0.40)]",
                "transition-transform duration-200 ease-out hover:scale-[1.01]"
            )}
        >
            {/* destello neutro */}
            <span
                aria-hidden="true"
                className={cx(
                    "pointer-events-none absolute -inset-y-16 -left-40 w-24 rotate-12",
                    "bg-white/70 blur-[1px] opacity-0",
                    "group-hover:opacity-100",
                    "group-hover:animate-shine"
                )}
                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.35)" }}
            />

            {/* borde sutil al hover */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
                <div className={cx("absolute inset-[-1px]", R, "border border-slate-300/70")} />
            </div>

            <div className={cx("relative", compact ? "p-5" : "p-6")}>


                <div className="mt-5 text-[16px] font-semibold tracking-[-0.015em] text-slate-900">
                    {t}
                </div>
                <p className="mt-2 text-[14px] leading-6 text-slate-600">{d}</p>

                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-60" />

                <div className="mt-4 flex items-center justify-between">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        deterministic • auditable
                    </div>
                    <div className="text-[12px] text-slate-400 transition-transform duration-200 group-hover:translate-x-1">
                        →
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes shine {
          0% {
            transform: translateX(0) rotate(12deg);
          }
          100% {
            transform: translateX(520px) rotate(12deg);
          }
        }
        :global(.animate-shine) {
          animation: shine 0.9s ease-out 1;
        }
      `}</style>
        </div>
    );
}

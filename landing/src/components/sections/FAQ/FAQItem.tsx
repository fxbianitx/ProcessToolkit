"use client";

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

export default function FAQItem({
    q,
    a,
    open,
    onToggle,
}: {
    q: string;
    a: string;
    open: boolean;
    onToggle: () => void;
}) {
    return (
        <div
            className={cx(
                "group relative overflow-hidden rounded-2xl",
                "bg-white/70 backdrop-blur",
                "border border-slate-200",
                "shadow-[0_18px_34px_-28px_rgba(15,23,42,0.40)]",
                "transition-transform duration-200 ease-out",
                "hover:scale-[1.005]"
            )}
        >
            {/* borde premium al hover / open */}
            <div
                aria-hidden="true"
                className={cx(
                    "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200",
                    "group-hover:opacity-100",
                    open && "opacity-100"
                )}
            >
                <div className="absolute inset-[-1px] rounded-2xl border border-slate-300/70" />
            </div>

            {/* destello neutro */}
            <span
                aria-hidden="true"
                className={cx(
                    "pointer-events-none absolute -inset-y-16 -left-40 w-24 rotate-12",
                    "bg-white/70 blur-[1px] opacity-0",
                    "group-hover:opacity-100",
                    "animate-none group-hover:animate-faq-shine"
                )}
                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.35)" }}
            />

            {/* button header */}
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                className={cx(
                    "relative w-full text-left",
                    "p-5",
                    "flex items-start justify-between gap-4",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                )}
            >
                <div className="min-w-0">
                    <div className="text-[15px] font-semibold text-slate-900 leading-6">
                        {q}
                    </div>
                    <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                        {open ? "tap to collapse" : "tap to expand"}
                    </div>
                </div>

                {/* icon */}
                <div
                    className={cx(
                        "shrink-0 mt-0.5 grid place-items-center",
                        "h-9 w-9 rounded-xl",
                        "border border-slate-200 bg-white",
                        "shadow-[0_14px_22px_-18px_rgba(15,23,42,0.35)]",
                        "transition-transform duration-200",
                        open && "rotate-45"
                    )}
                    aria-hidden="true"
                >
                    <span className="text-slate-700 text-[18px] leading-none">+</span>
                </div>
            </button>

            {/* body animado (seguro, no afecta a los demás items) */}
            <div
                className={cx(
                    "grid transition-[grid-template-rows] duration-200 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
            >
                <div className="overflow-hidden px-5 pb-5">
                    <p className="mt-1 text-[14px] leading-6 text-slate-600">{a}</p>

                    <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-60" />

                    <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        deterministic • auditable
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes faqShine {
          0% {
            transform: translateX(0) rotate(12deg);
          }
          100% {
            transform: translateX(520px) rotate(12deg);
          }
        }
        .animate-faq-shine {
          animation: faqShine 0.9s ease-out 1;
        }
      `}</style>
        </div>
    );
}

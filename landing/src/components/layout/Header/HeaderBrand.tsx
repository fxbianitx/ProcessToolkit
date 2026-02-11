"use client";

export default function HeaderBrand() {
    return (
        <a
            href="#"
            aria-label="Rules Engine"
            className="group inline-flex items-center gap-3 rounded-2xl px-2 py-2 -ml-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
            {/* Logo premium */}
            <span
                aria-hidden="true"
                className={[
                    "relative grid h-10 w-10 place-items-center rounded-xl",
                    "bg-slate-900 text-white font-extrabold text-[1.2em]",
                    "shadow-[0_18px_30px_-18px_rgba(15,23,42,0.55)]",
                ].join(" ")}
            >
                {/* brillo sutil */}
                <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/14 via-white/0 to-white/0" />
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                P
            </span>

            {/* Textos (más tranquilos) */}
            <span className="leading-tight">
                <span className="block text-[17px] font-bold tracking-[-0.02em] text-slate-900">
                    ProcessTool
                </span>
                <span className="mt-1 block text-[11px] font-medium tracking-[0.14em] uppercase text-slate-500">
                    Motor de reglas + auditoría
                </span>
            </span>
        </a>
    );
}

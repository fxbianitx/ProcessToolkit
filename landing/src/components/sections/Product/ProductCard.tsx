export default function ProductCard({
    title,
    desc,
    icon,
    meta,
}: {
    title: string;
    desc: string;
    icon: React.ReactNode;
    meta: string;
}) {
    const R = "rounded-[22px]";

    return (
        <div
            className={[
                "group relative overflow-hidden",
                R,
                "bg-white border border-slate-200",
                "p-6",
                "shadow-[0_18px_30px_-26px_rgba(15,23,42,0.30)]",
                "transition-transform duration-200 ease-out",
                "hover:scale-[1.02]",
                "focus-within:ring-2 focus-within:ring-slate-900/20 focus-within:ring-offset-2 focus-within:ring-offset-white",
            ].join(" ")}
        >
            {/* TOP */}
            <div className="relative z-10 grid grid-cols-[44px_1fr] gap-x-4 gap-y-2 items-center">
                {/* 1. Icono: Se mantiene igual, el grid padre lo centra */}
                <div
                    className={[
                        "relative grid place-items-center",
                        "h-11 w-11 rounded-xl",
                        "bg-slate-900 text-white",
                        "shadow-[0_18px_30px_-18px_rgba(15,23,42,0.45)]",
                        "ring-1 ring-white/10",
                    ].join(" ")}
                    aria-hidden="true"
                >
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/16 via-white/0 to-white/0"
                    />
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10"
                    />
                    <span className="relative z-10 text-[14px] font-extrabold leading-none">
                        {icon}
                    </span>
                </div>

                {/* 2. Título: Ahora estará perfectamente alineado al centro del icono */}
                <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-slate-900">
                        {title}
                    </h3>
                </div>

                {/* 3. Descripción: Usamos self-start para que empiece arriba en su propia fila */}
                <p className="col-span-2 mt-1 text-[14px] leading-6 text-slate-600 self-start">
                    {desc}
                </p>
            </div>

            {/* divider glow (microdetalle) */}
            <div className="relative z-10 mt-5 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

            {/* ✅ Meta abajo (en lugar de footer) */}
            <div className="relative z-10 mt-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                {meta}
            </div>
        </div>
    );
}

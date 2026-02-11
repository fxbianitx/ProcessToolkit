"use client";

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

function MacDots() {
    return (
        <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
        </div>
    );
}

export default function HeroVideo({
    src,
    poster,
}: {
    src?: string;
    poster?: string;
}) {
    return (
        <div className="w-full">
            {/* Eyebrow simple (no añade “más contenido”, solo contexto visual) */}
            <div className="flex items-center justify-between gap-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Auditoría a escala
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    ProcessTool • Recurso 
                </span>
            </div>

            <div
                className={cx(
                    "mt-3 relative overflow-hidden rounded-[22px] border border-slate-200 bg-white",
                    "shadow-2xl shadow-slate-200/60"
                )}
            >
                {/* Chrome (Mac) */}
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                    <div className="flex items-center gap-3">
                        <MacDots />
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            Demostración
                        </div>
                    </div>

                    
                </div>

                {/* Área video (16:10) */}
                <div className="relative aspect-[16/10] bg-slate-950">
                    {/* brillo sutil tipo glass */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-700/80 via-gray-700/90 to-gray-700"
                    />

                    {src ? (
                        <video
                            className="absolute inset-0 h-full w-full object-cover"
                            src={src}
                            poster={poster}
                            controls
                            playsInline
                            muted
                        />
                    ) : (
                        <VideoPlaceholder />
                    )}

                    {/* inset highlight premium */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
                    />
                </div>

                {/* footer mini (solo microdetalle, no info extra) */}
                <div className="border-t border-slate-100 bg-white px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            requests / min
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Inset highlight general */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/40"
                />
            </div>
        </div>
    );
}

function VideoPlaceholder() {
    return (
        <div className="absolute inset-0 grid place-items-center">
            <div className="text-center px-8">
                <div className="mx-auto inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
                        Video demo aquí
                    </span>
                </div>

                <div className="mt-4 text-[12px] leading-6 text-white/70">
                    Video cargando...
                </div>
            </div>
        </div>
    );
}

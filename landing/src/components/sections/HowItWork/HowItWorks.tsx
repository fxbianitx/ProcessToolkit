"use client";
import SectionTitle from "./SectionTitle";
import StepCard from "./StepCard";
import SectionAnimation from "../../animation/Section/SectionAnimation";
import HeroBackground from "../Hero/HeroBackground";

export default function HowItWorksSection() {
    const steps = [
        {
            n: "01",
            t: "Define reglas por organización",
            d: "Crea AST + actions JSON. Versiona y gobierna cambios con roles y evidencia.",
            icon: "{ }",
            meta: "Rules",
        },
        {
            n: "02",
            t: "Consulta por API",
            d: "Envía payload (venta, compra, despacho…) y recibe acciones en la misma respuesta.",
            icon: "→",
            meta: "API",
        },
        {
            n: "03",
            t: "Audita y diagnostica",
            d: "Snapshots + request_code + duración + evidencia por regla al momento del match.",
            icon: "🧾",
            meta: "Audit",
        },
    ] as const;

    return (
        <SectionAnimation
            id="como-funciona"
            className="sm:py-16 sm:pb-20 py-6 pb-16"
            background={<HeroBackground />}
            expandX={1.0}
            containX="clip"
            entryDelay={1.2}
            entryDuration={1}
            entry="fadeScale"
        >
            <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-10">
                {/* NO TOCAR SectionTitle */}
                <SectionTitle
                    eyebrow="Cómo funciona"
                    title="Tres pasos, cero fricción"
                    desc="Integra por API en modo request–response. Respuestas determinísticas y auditoría automática."
                />

                {/* FLOW */}
                <div className="mt-6">
                    {/* Desktop: rail horizontal */}
                    <div className="relative hidden lg:block">
                        {/* rail line */}
                        <div
                            aria-hidden="true"
                            className="absolute left-10 right-10 top-7 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
                        />
                        {/* subtle second rail */}
                        <div
                            aria-hidden="true"
                            className="absolute left-24 right-24 top-10 h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent"
                        />

                        {/* nodes row */}
                        <div className="grid grid-cols-3 gap-6">
                            {steps.map((s) => (
                                <StepNode key={s.n} n={s.n} meta={s.meta} />
                            ))}
                        </div>

                        {/* cards row */}
                        <div className="mt-6 grid grid-cols-3 gap-6">
                            {steps.map((s, i) => (
                                <StepCard key={s.n} {...s} index={i} />
                            ))}
                        </div>
                    </div>

                    <div className="lg:hidden relative">
                        {/* rail: alinea con el centro del rectángulo (w-16 => centro aprox 32px) */}
                        <div
                            aria-hidden="true"
                            className="absolute left-[32px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent"
                        />

                        <div className="space-y-6">
                            {steps.map((s, i) => (
                                // ✅ en vez de solo pl-12, usamos una grilla con 2 columnas:
                                // col 1 = nodo (ancho fijo), col 2 = card
                                <div key={s.n} className="grid grid-cols-[80px_1fr] items-start gap-3">
                                    {/* nodo centrado en su columna */}
                                    <div className="pt-2 flex justify-center">
                                        <StepNode n={s.n} meta={s.meta} compact />
                                    </div>

                                    {/* card con su propio espacio */}
                                    <div className="min-w-0">
                                        <StepCard {...s} index={i} compact />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </SectionAnimation>
    );
}

/** Node del flujo (neutro) */
function StepNode({
    n,
    meta,
    compact = false,
}: {
    n: string;
    meta: string;
    compact?: boolean;
}) {
    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <div
                    className={cx(
                        "grid place-items-center",
                        compact ? "h-10 w-16 rounded-xl" : "h-12 w-20 rounded-2xl",
                        "bg-white border border-slate-200",
                        "shadow-[0_14px_26px_-20px_rgba(15,23,42,0.45)]"
                    )}
                >
                    <div className="flex flex-col items-center leading-none">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-900">
                            {n}
                        </div>
                        <div
                            className={cx(
                                "mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400",
                                compact && "hidden" // ✅ en compact lo ocultas si quieres
                            )}
                        >
                            {meta}
                        </div>
                    </div>
                </div>

                {/* pin connector (desktop) */}
                {!compact && (
                    <div
                        aria-hidden="true"
                        className="absolute left-1/2 top-12 h-6 w-px -translate-x-1/2 bg-slate-200"
                    />
                )}
            </div>
        </div>
    );
}

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

"use client";

import SectionAnimation from "../../animation/Section/SectionAnimation";
import HeroBackground from "../Hero/HeroBackground";

export default function CTA() {
    return (
        <SectionAnimation
            id="cta"
            className="sm:py-16 sm:pb-20 py-6 pb-16"
            background={<HeroBackground />}
            expandX={1.0}
            containX="clip"
            entryDelay={1.6}
            entryDuration={1}
            entry="fadeScale"
        >
            <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
                <div className="rounded-2xl bg-white/80 backdrop-blur border border-slate-200 shadow-[0_18px_34px_-28px_rgba(15,23,42,0.40)] p-8 sm:p-10">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
                                Open Source por ahora
                            </div>

                            <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-slate-900">
                                Clona, integra y audita desde hoy.
                            </h3>

                            <p className="mt-3 max-w-2xl text-[14px] leading-6 text-slate-600">
                                Úsalo como motor central de decisiones: descuentos, tags, bloqueos, validaciones o rutas.
                                Con request_code, snapshots y evidencia por regla para depurar sin fricción.
                            </p>

                            <div className="mt-5 text-[12px] text-slate-500">
                                Request–Response • Evidencia por regla • Trazabilidad
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <a
                                href="/register"
                                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-[14px] font-semibold text-white shadow-[0_18px_30px_-18px_rgba(15,23,42,0.35)] transition-transform duration-200 hover:scale-[1.01]"
                            >
                                Registrarse
                            </a>

                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-[14px] font-semibold text-slate-900 border border-slate-200 shadow-[0_18px_30px_-24px_rgba(15,23,42,0.35)] transition-colors hover:bg-slate-50"
                            >
                                Ver GitHub →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </SectionAnimation>
    );
}

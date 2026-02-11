"use client";

import HeroActions from "./HeroActions";
import HeroKpis from "./HeroKpis";
import { HERO_BADGES } from "../../../data/hero.data";

export default function HeroCopy() {
    return (
        <div className="relative">

            {/* BADGES */}
            <div className="flex flex-wrap gap-3 animate-fadeInUp">
                {HERO_BADGES.map((b) => (
                    <span
                        key={b}
                        className={[
                            "group relative inline-flex items-center gap-2.5",
                            "rounded-xl px-3 py-1.5",
                            "border border-slate-200 bg-white/80 backdrop-blur",
                            "text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500",
                            "shadow-sm transition-all duration-300",
                            "hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300",
                        ].join(" ")}
                    >
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>

                        {b}
                    </span>
                ))}
            </div>

            {/* TITLE */}
            <h1 className="relative mt-8 mb-6 text-center sm:text-left text-[3.6em] lg:text-[3em] leading-[1.05] font-bold tracking-[-0.035em] animate-fadeInUp delay-100">
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Centraliza decisiones.
                </span>
                <span className="block text-slate-700 mt-1">
                    Audita cada ejecución.
                </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 text-[15px] sm:text-[16px] leading-7 text-slate-600 max-w-[46rem] animate-fadeInUp delay-200">
                Define reglas por organización (AST → acciones) y ejecútalas por API en modo{" "}
                <span className="relative font-semibold text-slate-800 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-emerald-400 after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100">
                    Request–Response
                </span>.
                Cada request guarda <span className="font-semibold text-slate-700">input_snapshot</span>, matches,
                duración, <span className="font-semibold text-slate-700">request_code</span> y evidencia por regla.
            </p>

            <div className="mt-8 animate-fadeInUp delay-300">
                <HeroActions />
            </div>

            <div className="mt-12 animate-fadeInUp delay-400">
                <HeroKpis />
            </div>

            <div className="mt-8 text-[11px] text-slate-500 leading-5 max-w-[46rem] animate-fadeInUp delay-500">
                Open Source por ahora • diseñado para integrarse en ERP, SaaS, tiendas y herramientas internas.
            </div>
        </div>
    );
}

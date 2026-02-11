"use client";

import CodeBlock from "./CodeBlock";
import { AST_EXAMPLE, RESPONSE_EXAMPLE, DEMO_KPIS, HEADERS_EXAMPLE } from "../../../data/hero.data";
import MacDots from "./MacDots";
import StatPill from "./StatusPill";
import Kicker from "./Kicker";
import SectionAnimation from "../../animation/Section/SectionAnimation";
import HeroBackground from "../Hero/HeroBackground";

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

export default function Demo() {
    return (
        <SectionAnimation id="demo"
            className="py-16 bg-slate-50"
            background={<HeroBackground />}
            expandX={1.0}
            containX="clip"
            entryDelay={1}
            entryDuration={1}
            entry="fadeScale"
        >
            <div className="mx-auto max-w-[1480px] px-5 sm:px-6 lg:px-10">
                {/* layout nuevo: copy izquierda / demo derecha */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
                    {/* IZQUIERDA */}
                    <div className="relative lg:col-span-4">

                        <div className="relative animate-fadeInUp">

                            <Kicker>Ejemplo de uso</Kicker>

                            <h2 className="group mt-6 text-[2.4em] leading-[1.1] font-bold tracking-[-0.03em] text-slate-900">
                                Mira un request real y su{" "}
                                <span className="relative inline-block text-slate-700">
                                    auditoría en segundos
                                </span>
                            </h2>

                            <p className="mt-6 text-[15px] sm:text-[16px] leading-7 text-slate-600 max-w-[46rem] animate-fadeInUp delay-100">
                                Envías un payload (venta, compra, despacho…) y recibes acciones en la misma respuesta.
                                Cada ejecución queda registrada con{" "}
                                <span className="font-semibold text-slate-700 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-slate-300 after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100">
                                    evidencia inmutable
                                </span>{" "}
                                para diagnóstico y trazabilidad.
                            </p>

                            {/* BULLETS MEJORADOS */}
                            <div className="mt-6 animate-fadeInUp delay-200">
                                {[
                                    { t: "Respuesta determinística", d: "Acciones consistentes, sin “magia” escondida." },
                                    { t: "Evidencia por regla", d: "Snapshots de conditions/actions al momento del match (luego observable y exportable)." },
                                    { t: "Listo para producción", d: "Duración en ms, acciones, request_code y registros forenses." },
                                ].map((b, i) => (
                                    <div
                                        key={b.t}
                                        className="group flex items-start gap-4 mb-6 transition-all duration-300 hover:translate-x-1"
                                        style={{ animationDelay: `${200 + i * 100}ms` }}
                                    >
                                        {/* Punto perfectamente alineado */}
                                        <div className="mt-[6px] h-2 w-2 rounded-full bg-slate-300 transition-colors duration-300 group-hover:bg-emerald-400 flex-none" />

                                        <div>
                                            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                                                {b.t}
                                            </div>

                                            <div className="mt-1 text-[14px] leading-6 text-slate-600 max-w-[42rem]">
                                                {b.d}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            {/* FOOTER TÉCNICO */}
                            <div className="hidden lg:block mt-8 pt-8">

                                {/* Separador degradado */}
                                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-6" />

                                <div className="text-[11px] text-slate-500 leading-5 max-w-[46rem]">
                                    La auditoría guarda{" "}
                                    <span className="text-slate-700 font-medium">input_snapshot</span>, reglas que matchearon,
                                    acciones devueltas, duración y evidencia forense por cada evaluación.
                                </div>

                                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    <span className="transition-colors hover:text-slate-600">request_code</span>
                                    <span className="text-slate-200">•</span>
                                    <span className="transition-colors hover:text-slate-600">input_snapshot</span>
                                    <span className="text-slate-200">•</span>
                                    <span className="transition-colors hover:text-slate-600">matches</span>
                                    <span className="text-slate-200">•</span>
                                    <span className="transition-colors hover:text-slate-600">actions</span>
                                    <span className="text-slate-200">•</span>
                                    <span className="transition-colors hover:text-slate-600">duración</span>
                                </div>
                            </div>

                        </div>
                    </div>




                    {/* DERECHA */}
                    <div className="lg:col-span-8">


                        {/* Panel “Mac window” */}
                        <div className="sm:mt-0 lg:mt-11">
                            <div
                                className={cx(
                                    "relative overflow-hidden rounded-[22px] border border-slate-200 bg-white",
                                    "shadow-2xl shadow-slate-200/60"
                                )}
                            >
                                {/* Top bar */}
                                <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <MacDots />
                                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                            Rules Engine • Live Trace
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="rounded-md bg-slate-900/[0.04] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                                            Pull
                                        </span>
                                        <span className="rounded-md bg-slate-900/[0.04] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                                            JSON
                                        </span>
                                    </div>
                                </div>

                                {/* Tabs */}


                                {/* Body */}
                                <div className="p-5 sm:p-6">
                                    {/* Modo / summary */}
                                    <div className="rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                                Modo
                                            </div>
                                            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                                Request–Response
                                            </span>
                                        </div>

                                        <div className="mt-2 text-[14px] font-semibold text-slate-900">
                                            Payload → acciones (misma respuesta)
                                        </div>

                                        <div className="mt-2 text-[11px] text-slate-500 leading-5">
                                            Evidencia por regla y snapshots de{" "}
                                            <span className="font-semibold text-slate-600">conditions/actions</span>.
                                        </div>
                                    </div>

                                    {/* Code blocks */}
                                    <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
                                        <div className="lg:col-span-7">
                                            <CodeBlock
                                                label="Regla (AST)"
                                                tag="conditions"
                                                code={AST_EXAMPLE}
                                                headers={HEADERS_EXAMPLE}
                                                token="eyJhY2Nlc3NfdG9rZW4iOiAiYWRtaW4tc2VjcmV0LWtleS0xMjM0NSIsICJleHAiOiAxNzQwODUzNjAwfQ..."
                                            />
                                        </div>

                                        <div className="lg:col-span-5">
                                            <CodeBlock
                                                label="Respuesta"
                                                tag="actions"
                                                code={RESPONSE_EXAMPLE}
                                            />
                                        </div>


                                    </div>

                                    {/* KPIs */}
                                    <div className="mt-4 grid grid-cols-3 gap-3">
                                        {DEMO_KPIS.map((x) => (
                                            <div
                                                key={x.label}
                                                className={cx(
                                                    "rounded-[18px] border border-slate-200 bg-white p-4",
                                                    "shadow-sm shadow-slate-200/60",
                                                    "transition-transform duration-200 ease-out hover:scale-[1.01]"
                                                )}
                                            >
                                                <div className="text-[16px] font-semibold text-slate-900">{x.value}</div>
                                                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                                    {x.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Link */}
                                    <div className="mt-2 text-center">
                                        <a
                                            href="#seguridad"
                                            className={cx(
                                                "inline-flex items-center justify-center rounded-lg px-3 py-2",
                                                "text-[11px] font-semibold uppercase tracking-[0.18em]",
                                                "text-slate-500 hover:text-slate-700 transition-colors",
                                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                                            )}
                                        >
                                            Ver seguridad &amp; control →
                                        </a>
                                    </div>
                                </div>

                                {/* Inset highlight */}
                                <div
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-white/40"
                                />
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </SectionAnimation>
    );
}

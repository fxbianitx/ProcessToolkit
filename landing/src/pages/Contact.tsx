"use client";

import SectionAnimation from "../components/animation/Section/SectionAnimation";
import HeroBackground from "../components/sections/Hero/HeroBackground";

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

export default function Contact() {
    return (
        <main className="min-h-screen bg-slate-50">
            <SectionAnimation
                id="contact"
                className="relative sm:py-16 sm:pb-20 py-8 pb-16"
                background={<HeroBackground />}
                expandX={1.0}
                containX="clip"
                entryDelay={0.4}
                entryDuration={0.9}
                entry="fadeScale"
            >
                <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
                    <div className="max-w-3xl">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                            Contacto
                        </div>
                        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-slate-900">
                            Hablemos de tu integración y tu caso de uso
                        </h1>
                        <p className="mt-4 text-[15px] leading-7 text-slate-600">
                            ProcessTool está pensado para ERPs, SaaS y herramientas internas que necesitan decisiones
                            determinísticas y auditoría completa. Escríbenos con tu escenario (venta, compra, despacho,
                            validaciones) y te respondemos con una guía concreta.
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10 items-start">
                        {/* FORM */}
                        <div className="lg:col-span-7">
                            <div
                                className={cx(
                                    "rounded-2xl bg-white/80 backdrop-blur",
                                    "border border-slate-200",
                                    "shadow-[0_18px_34px_-28px_rgba(15,23,42,0.40)]",
                                    "p-6 sm:p-8"
                                )}
                            >
                                <div className="text-[13px] font-semibold text-slate-900">
                                    Envíanos un mensaje
                                </div>
                                <p className="mt-2 text-[13px] leading-6 text-slate-600">
                                    Respuesta típica: 24–48h. Si es soporte, incluye tu <span className="font-semibold text-slate-700">request_code</span>.
                                </p>

                                <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Field label="Nombre" placeholder="Tu nombre" />
                                        <Field label="Email" placeholder="tu@email.com" type="email" />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Field label="Empresa (opcional)" placeholder="Nombre de la empresa" />
                                        <Field label="Asunto" placeholder="Integración / Pricing / Soporte" />
                                    </div>

                                    <Field
                                        label="Mensaje"
                                        placeholder="Cuéntanos tu caso: qué evento evalúas, qué acciones esperas, y si necesitas auditoría por regla."
                                        textarea
                                    />

                                    <div className="pt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="text-[12px] text-slate-500">
                                            Al enviar aceptas que te contactemos sobre esta consulta.
                                        </div>

                                        <div className="flex gap-3">
                                           
                                            <button
                                                type="submit"
                                                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-[14px] font-semibold text-white shadow-[0_18px_30px_-18px_rgba(15,23,42,0.35)] transition-transform duration-200 hover:scale-[1.01]"
                                            >
                                                Enviar mensaje
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* mini note */}
                            <div className="mt-4 text-[12px] text-slate-500">
                                Tip: si tu consulta es técnica, incluye ejemplo de payload y el tipo de regla (AST) que necesitas.
                            </div>
                        </div>

                        {/* INFO */}
                        <div className="lg:col-span-5">
                            <div className="space-y-4">
                                <InfoCard title="Canales">
                                    <InfoRow k="Email" v="contact@processtool.dev (placeholder)" />
                                    <InfoRow k="GitHub" v="Issues / Discussions" />
                                    <InfoRow k="Soporte" v="Incluye request_code y timestamps" />
                                </InfoCard>

                                <InfoCard title="Qué información ayuda">
                                    <ul className="mt-3 space-y-2 text-[13px] text-slate-600">
                                        <li>• Tipo de operación: venta/compra/despacho</li>
                                        <li>• Payload de ejemplo (campos clave)</li>
                                        <li>• Acciones esperadas (discount/tag/block/etc.)</li>
                                        <li>• Requisitos de auditoría (por request / por regla)</li>
                                        <li>• Volumen estimado (requests/día)</li>
                                    </ul>
                                </InfoCard>

                                <InfoCard title="Ubicación / horario">
                                    <p className="mt-3 text-[13px] leading-6 text-slate-600">
                                        Remoto. Respuestas en horario de oficina (UTC−5).
                                    </p>
                                </InfoCard>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionAnimation>
        </main>
    );
}

function Field({
    label,
    placeholder,
    type = "text",
    textarea = false,
}: {
    label: string;
    placeholder: string;
    type?: string;
    textarea?: boolean;
}) {
    const base =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[14px] text-slate-900 placeholder:text-slate-400 shadow-[0_10px_20px_-18px_rgba(15,23,42,0.30)] focus:outline-none focus:ring-2 focus:ring-slate-300/60";
    return (
        <label className="block">
            <div className="text-[12px] font-semibold text-slate-700">{label}</div>
            {textarea ? (
                <textarea className={cx(base, "mt-2 min-h-[140px] resize-y")} placeholder={placeholder} />
            ) : (
                <input className={cx(base, "mt-2")} type={type} placeholder={placeholder} />
            )}
        </label>
    );
}

function InfoCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl bg-white/80 backdrop-blur border border-slate-200 shadow-[0_18px_34px_-28px_rgba(15,23,42,0.40)] p-6">
            <div className="text-[13px] font-semibold text-slate-900">{title}</div>
            {children}
        </div>
    );
}

function InfoRow({ k, v }: { k: string; v: string }) {
    return (
        <div className="mt-3 flex items-start justify-between gap-4 text-[13px]">
            <div className="text-slate-500">{k}</div>
            <div className="text-slate-700 text-right">{v}</div>
        </div>
    );
}

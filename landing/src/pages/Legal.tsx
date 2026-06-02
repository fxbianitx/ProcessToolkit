"use client";

import SectionAnimation from "../components/animation/Section/SectionAnimation";
import HeroBackground from "../components/sections/Hero/HeroBackground";

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

export default function Legal() {
    const updated = new Date().toLocaleDateString();

    const nav = [
        { id: "terms", label: "1. Términos de uso" },
        { id: "privacy", label: "2. Política de privacidad" },
        { id: "security", label: "3. Seguridad y retención" },
        { id: "contact", label: "4. Contacto legal" },
    ] as const;

    return (
        <main className="min-h-screen bg-slate-50">
            <SectionAnimation
                id="legal"
                className="relative sm:py-10 sm:pb-20 py-4 pb-16"
                background={<HeroBackground />}
                expandX={1.0}
                containX="clip"
                entryDelay={0.4}
                entryDuration={0.4}
                entry="fadeScale"
            >
                <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
                        {/* LEFT (25%) */}
                        <aside className="lg:col-span-3 lg:sticky lg:top-24">
                            <div className="rounded-2xl bg-white/80 backdrop-blur border border-slate-200 shadow-[0_18px_34px_-28px_rgba(15,23,42,0.40)] p-6">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                    Legal
                                </div>

                                <h1 className="mt-2 text-[18px] sm:text-[20px] font-semibold tracking-[-0.03em] text-slate-900">
                                    Términos y Privacidad
                                </h1>

                                <p className="mt-3 text-[13px] leading-6 text-slate-600">
                                    Documentación legal base para el uso de ProcessTool. Ajusta estos textos a tu realidad operativa antes
                                    de publicar.
                                </p>

                                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-70" />

                                <div className="mt-5 text-[12px] font-semibold text-slate-900">
                                    Índice
                                </div>

                                <nav className="mt-3 space-y-1.5">
                                    {nav.map((l) => (
                                        <a
                                            key={l.id}
                                            href={`#${l.id}`}
                                            className={cx(
                                                "group flex items-center justify-between gap-3 rounded-xl px-3 py-2",
                                                "text-[13px] text-slate-600",
                                                "hover:bg-slate-50 hover:text-slate-900",
                                                "transition-colors"
                                            )}
                                        >
                                            <span className="min-w-0 truncate">{l.label}</span>
                                            <span className="text-slate-300 group-hover:text-slate-400">↗</span>
                                        </a>
                                    ))}
                                </nav>

                                <div className="mt-5 text-[12px] text-slate-500">
                                    Actualizado: {updated}
                                </div>
                            </div>
                        </aside>

                        {/* RIGHT (75%) */}
                        <div className="lg:col-span-9 space-y-6">
                            <DocSection
                                id="terms"
                                n="1"
                                title="Términos de uso"
                                subtitle="Condiciones para utilizar el sitio, API y panel de administración."
                            >
                                <P>
                                    Al acceder o utilizar ProcessTool, aceptas estos términos. Si no estás de acuerdo, no utilices el
                                    servicio.
                                </P>

                                <H3>1.1 Uso permitido</H3>
                                <Ul>
                                    <li>Integrar el API para evaluar reglas y recibir acciones determinísticas.</li>
                                    <li>Administrar reglas dentro de tu organización, respetando el aislamiento multi-tenant.</li>
                                    <li>Usar auditorías para diagnóstico y trazabilidad operativa.</li>
                                </Ul>

                                <H3>1.2 Uso prohibido</H3>
                                <Ul>
                                    <li>Intentar acceder a datos de otras organizaciones o eludir controles de autenticación.</li>
                                    <li>Abusar de recursos del servicio (flooding, scraping, intentos de explotación).</li>
                                    <li>Exponer tokens o credenciales en repositorios o canales públicos.</li>
                                </Ul>

                                <H3>1.3 Limitación de responsabilidad</H3>
                                <P>
                                    El servicio se provee “tal cual”, sin garantías. Eres responsable de validar reglas, acciones y
                                    resultados en tu contexto antes de desplegar en producción.
                                </P>
                            </DocSection>

                            <DocSection
                                id="privacy"
                                n="2"
                                title="Política de privacidad"
                                subtitle="Qué datos se procesan y cómo se usan dentro de la plataforma."
                            >
                                <P>
                                    ProcessTool está diseñado para minimizar exposición de datos sensibles. Aun así, el contenido del
                                    payload enviado por tu sistema puede contener información de negocio. Envía solo lo necesario para
                                    evaluar reglas.
                                </P>

                                <H3>2.1 Datos que pueden procesarse</H3>
                                <Ul>
                                    <li>Datos del payload enviado al endpoint de evaluación (según tu integración).</li>
                                    <li>Metadatos de auditoría: request_code, timestamps, duración, reglas matcheadas.</li>
                                    <li>Logs técnicos mínimos para diagnóstico y estabilidad.</li>
                                </Ul>

                                <H3>2.2 Tokens</H3>
                                <P>
                                    Los tokens de integración no se almacenan en texto plano; se guarda una representación hash (ej. sha256)
                                    para verificación.
                                </P>

                                <H3>2.3 Compartición</H3>
                                <P>
                                    No vendemos datos. La información se utiliza para operar el servicio, auditar ejecuciones y depurar
                                    integraciones.
                                </P>
                            </DocSection>

                            <DocSection
                                id="security"
                                n="3"
                                title="Seguridad y retención"
                                subtitle="Prácticas recomendadas de protección y conservación de evidencia."
                            >
                                <H3>3.1 Retención de auditoría</H3>
                                <P>
                                    La auditoría se conserva para trazabilidad. Define políticas internas de retención y exportación según
                                    tu necesidad (cumplimiento, debugging, control).
                                </P>

                                <H3>3.2 Recomendaciones</H3>
                                <Ul>
                                    <li>Enmascara o elimina campos sensibles del payload cuando no sean necesarios para reglas.</li>
                                    <li>Rota tokens periódicamente y evita exponerlos en frontend.</li>
                                    <li>Controla cambios de reglas con roles y revisión (gobernanza).</li>
                                </Ul>
                            </DocSection>

                            <DocSection
                                id="contact"
                                n="4"
                                title="Contacto legal"
                                subtitle="Canales para solicitudes de privacidad y seguridad."
                            >
                                <P>
                                    Para solicitudes relacionadas con privacidad, eliminación de datos o seguridad:
                                </P>
                                <Ul>
                                    <li>Email: legal@processtool.dev (placeholder)</li>
                                    <li>Canal: GitHub Issues (Security / Privacy)</li>
                                </Ul>
                            </DocSection>

                            {/* footer note */}
                            <div className="text-[12px] text-slate-500">
                                Nota: este documento es una plantilla. Ajusta contenido, base legal, cookies y jurisdicción según tu caso.
                            </div>
                        </div>
                    </div>
                </div>
            </SectionAnimation>
        </main>
    );
}

function DocSection({
    id,
    n,
    title,
    subtitle,
    children,
}: {
    id: string;
    n: string;
    title: string;
    subtitle: string;
    children: React.ReactNode;
}) {
    return (
        <section
            id={id}
            className="rounded-2xl bg-white/80 backdrop-blur border border-slate-200 shadow-[0_18px_34px_-28px_rgba(15,23,42,0.40)]"
        >
            <div className="px-6 sm:px-8 py-6 sm:py-7">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                            {n}
                        </div>
                        <h2 className="mt-1 text-[18px] sm:text-[20px] font-semibold tracking-[-0.03em] text-slate-900">
                            {title}
                        </h2>
                        <p className="mt-2 text-[13px] leading-6 text-slate-600">
                            {subtitle}
                        </p>
                    </div>

                    <a
                        href={`#${id}`}
                        className="shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-semibold text-slate-700 hover:bg-slate-50"
                    >
                        Link
                    </a>
                </div>

                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-70" />

                <div className="mt-5 space-y-4">{children}</div>
            </div>
        </section>
    );
}

function H3({ children }: { children: React.ReactNode }) {
    return <h3 className="text-[14px] font-semibold text-slate-900">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
    return <p className="text-[14px] leading-7 text-slate-600">{children}</p>;
}

function Ul({ children }: { children: React.ReactNode }) {
    return <ul className="list-disc pl-5 text-[14px] leading-7 text-slate-600">{children}</ul>;
}

"use client";
import FooterCol from "./FooterCol";
import FooterLink from "./FooterLink";



const productLinks = [
    { label: "Highlights", href: "#producto" },
    { label: "Ejemplo", href: "#demo" },
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Seguridad", href: "#seguridad" },
];

const resourceLinks = [
    { label: "GitHub", href: "https://github.com/", external: true },
    { label: "FAQ", href: "#faq" },
    { label: "Iniciar sesión", href: "/login" },
];

const trustBullets = [
    "Tokens: sha256 (no texto plano)",
    "Auditoría forense por request",
    "Histórico protegido (NO ACTION)",
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-ink-200 bg-slate-200/40">
            <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
                <div className="py-14">

                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">

                        {/* BLOQUE PRINCIPAL MÁS GRANDE */}
                        <div className="lg:col-span-5">
                            <div className="text-[18px] font-bold tracking-[-0.02em] text-ink-950">
                                ProcessTool
                            </div>

                            <p className="mt-4 max-w-[440px] text-[14px] leading-6 text-ink-600">
                                Motor de reglas por API con auditoría total,
                                evidencia por regla y diseño SQL Server friendly.
                                Arquitectura limpia, integración simple y trazabilidad completa.
                            </p>

                            <div className="mt-6 text-[12px] text-ink-500">
                                Open Source • Light mode
                            </div>
                        </div>

                        {/* Producto */}
                        <div className="lg:col-span-2">
                            <FooterCol title="Producto">
                                {productLinks.map((l) => (
                                    <FooterLink key={l.href} href={l.href}>
                                        {l.label}
                                    </FooterLink>
                                ))}
                            </FooterCol>
                        </div>

                        {/* Recursos */}
                        <div className="lg:col-span-2">
                            <FooterCol title="Recursos">
                                {resourceLinks.map((l) => (
                                    <FooterLink
                                        key={l.href}
                                        href={l.href}
                                        external={l.external}
                                    >
                                        {l.label}
                                    </FooterLink>
                                ))}
                            </FooterCol>
                        </div>

                        {/* Confianza */}
                        <div className="lg:col-span-3">
                            <FooterCol title="Confianza">
                                <ul className="mt-3 space-y-2 text-[13px] text-ink-600">
                                    {trustBullets.map((t) => (
                                        <li key={t} className="flex gap-2">
                                            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-300" />
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </FooterCol>
                        </div>

                    </div>

                    {/* Bottom bar */}
                    <div className="mt-12 flex flex-col gap-3 border-t border-ink-200 pt-6 text-[12px] text-ink-500 sm:flex-row sm:items-center sm:justify-between">
                        <span>© {year} ProcessTool. Todos los derechos reservados.</span>
                        <span>Modo claro activo • Diseño minimal premium</span>
                    </div>

                </div>
            </div>
        </footer>

    );
}



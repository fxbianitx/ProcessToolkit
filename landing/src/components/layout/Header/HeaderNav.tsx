"use client";
import SheenLoop from "../../animation/Button/SheenLoop";

type NavItem = { href: string; label: string };

export default function HeaderNav({ items }: { items: readonly NavItem[] }) {
    return (
        <nav aria-label="Navegación principal" className="flex items-center gap-1 mr-2">
            {items.map((item) => (
                <a
                    key={item.href}
                    href={item.href}
                    className={[
                        "group relative overflow-hidden",
                        "rounded-lg px-3.5 py-2",
                        "text-[0.8em] font-semibold tracking-[-0.01em]",
                        "text-slate-600 hover:text-slate-900",
                        "transition-colors duration-700",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                    ].join(" ")}
                >
                    {/* base hover (muy sutil, para que no se sienta tosco) */}
                    <span
                        aria-hidden="true"
                        className={[
                            "pointer-events-none absolute inset-0 rounded-lg",
                            "bg-slate-900/[0.06] opacity-0",
                            "transition-opacity duration-200",
                            "group-hover:opacity-100",
                        ].join(" ")}
                    />

                    {/* Animacion de Iluminacion en Loop */}
                    <SheenLoop />

                    {/* texto arriba */}
                    <span className="relative z-10">{item.label}</span>

                </a>
            ))}
        </nav>
    );
}

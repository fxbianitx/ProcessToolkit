"use client";

import { useEffect, useRef, useState } from "react";

type NavItem = { href: string; label: string };

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

export default function HeaderMobileMenu({ items }: { items: readonly NavItem[] }) {
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onClick = (e: MouseEvent) => {
            const target = e.target as Node;
            if (panelRef.current && !panelRef.current.contains(target)) setOpen(false);
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, [open]);

    return (
        <div className="relative" ref={panelRef}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label="Abrir menú"
                className={cx(
                    "inline-flex items-center justify-center rounded-2xl px-3.5 py-2.5",
                    "border border-slate-200 bg-white hover:bg-slate-50",
                    "transition-colors duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                )}
            >
                <span className="text-[12px] font-semibold text-slate-800">Menú</span>
            </button>

            {open && (
                <div
                    className={cx(
                        "absolute right-0 mt-3 w-[320px] overflow-hidden rounded-[1.75rem]",
                        "border border-slate-200 bg-white shadow-2xl shadow-slate-200/70"
                    )}
                >
                    <div className="p-4">
                        <div className="text-[11px] font-medium tracking-[0.14em] uppercase text-slate-400">
                            Navegación
                        </div>

                        <div className="mt-3 grid gap-1">
                            {items.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={cx(
                                        "rounded-2xl px-3.5 py-3",
                                        "text-[12px] font-semibold text-slate-800",
                                        "hover:bg-slate-50 transition-colors duration-200",
                                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60"
                                    )}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        <div className="mt-4 grid gap-2">
                            <a
                                href="/login"
                                className={cx(
                                    "rounded-2xl px-4 py-3 text-center",
                                    "text-[12px] font-semibold text-slate-800",
                                    "border border-slate-200 hover:bg-slate-50",
                                    "transition-colors duration-200",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60"
                                )}
                            >
                                Iniciar sesión
                            </a>

                            <a
                                href="/register"
                                className={cx(
                                    "rounded-2xl px-4 py-3 text-center",
                                    "text-[12px] font-semibold text-white",
                                    "bg-slate-900 hover:bg-slate-800",
                                    "shadow-[0_18px_30px_-20px_rgba(15,23,42,0.65)]",
                                    "transition-[transform,background-color] duration-200 ease-out hover:-translate-y-[1px]",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60"
                                )}
                            >
                                Registrarse
                            </a>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

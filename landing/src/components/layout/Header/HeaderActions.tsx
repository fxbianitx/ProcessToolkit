"use client";

import SheenLoop from "../../animation/Button/SheenLoop";

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

export default function HeaderActions() {
    const R = "rounded-md"; // baja a rounded-lg si quieres más “serio”

    return (
        <div className="flex items-center gap-2">

            {/* Registrarse (primario) */}
            <a href="/register"
                className={cx(
                    "group relative overflow-hidden",
                    R,
                    "px-4 py-2.5",
                    "text-[12px] font-semibold tracking-[-0.01em] text-white",
                    "bg-slate-900 hover:bg-slate-800",
                    "shadow-[0_18px_30px_-20px_rgba(15,23,42,0.65)]",
                    "transition-[transform,box-shadow,background-color] duration-200 ease-out",
                    "hover:scale-[1.005]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                )}
            >
                <SheenLoop />
                <span className="relative z-10">Registrarse</span>
            </a>

            {/* Iniciar sesión (secundario) */}
            <a href="/login"
                className={cx(
                    "group relative overflow-hidden",
                    R,
                    "px-4 py-2.5",
                    "text-[12px] font-semibold tracking-[-0.01em]",
                    "text-slate-700 hover:text-slate-900",
                    "bg-white/0 hover:bg-slate-900/[0.04]",
                    "transition-[transform,background-color,color] duration-200 ease-out",
                    "hover:scale-[1.005]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                )}
            >
                <SheenLoop />
                <span className="relative z-10">Iniciar sesión</span>
            </a>


        </div>
    );
}
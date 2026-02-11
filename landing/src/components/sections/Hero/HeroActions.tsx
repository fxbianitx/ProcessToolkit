"use client";

import SheenLoop from "../../animation/Button/SheenLoop";
import { ArrowUpRight } from "lucide-react";

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}


export default function HeroActions() {
    const R = "rounded-md";

    return (
        <div className="flex  sm:flex-row items-start sm:items-center gap-3">
            <a
                href="http://localhost:4200/auth/login"
                className={cx(
                    "group relative overflow-hidden",
                    R,
                    "px-6 py-4",
                    "text-[12px] font-semibold tracking-[-0.01em] text-white",
                    "bg-slate-900 hover:bg-slate-800",
                    "shadow-[0_18px_30px_-20px_rgba(15,23,42,0.65)]",
                    "transition-[transform,background-color,box-shadow] duration-200 ease-out",
                    "hover:scale-[1.02]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                )}
            >
                <SheenLoop />
                <span className="relative z-10 flex items-center gap-2">
                    Comenzar ahora
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
                </span>
            </a>

            <a
                href="#como-funciona"
                className={[
                    "px-2 py-4",
                    "text-[11px] font-semibold",
                    "text-slate-500 hover:text-slate-700",
                    "transition-colors duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg",
                ].join(" ")}
            >
                Ver cómo funciona <span aria-hidden="true">↓</span>
            </a>
        </div>
    );
}

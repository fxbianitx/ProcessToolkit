"use client";

import { useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    return prefersDark ? "dark" : "light";
}

function applyTheme(theme: Theme) {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    window.localStorage.setItem("theme", theme);
}

export default function HeaderThemeToggle() {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const t = getPreferredTheme();
        setTheme(t);
        if (typeof document !== "undefined") applyTheme(t);
    }, []);

    const isDark = theme === "dark";
    const label = useMemo(
        () => (isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"),
        [isDark]
    );

    const onToggle = () => {
        const next: Theme = isDark ? "light" : "dark";
        setTheme(next);
        applyTheme(next);
    };

    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={label}
            className={[
                "group relative inline-flex items-center gap-2 rounded-2xl px-3 py-2",
                "border border-slate-200/70 bg-white/60 hover:bg-white/80",
                "dark:border-slate-800/70 dark:bg-slate-950/40 dark:hover:bg-slate-950/55",
                "transition-colors duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950",
            ].join(" ")}
        >
            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                {isDark ? "Dark" : "Light"}
            </span>

            {/* Switch mini */}
            <span
                aria-hidden="true"
                className={[
                    "relative h-5 w-9 rounded-full",
                    "bg-slate-200 dark:bg-slate-800",
                    "transition-colors duration-200",
                ].join(" ")}
            >
                <span
                    className={[
                        "absolute top-0.5 h-4 w-4 rounded-full",
                        "bg-white dark:bg-slate-100",
                        "shadow-sm",
                        "transition-transform duration-200 ease-out",
                        isDark ? "translate-x-4" : "translate-x-0.5",
                    ].join(" ")}
                />
            </span>
        </button>
    );
}

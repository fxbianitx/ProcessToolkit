"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type EntryAnimation =
    | "none"
    | "fadeUp"
    | "fadeScale"
    | "fadeBlur"
    | "slideLeft"
    | "slideRight";

type SectionAnimationProps = {
    id?: string;
    className?: string;
    children: React.ReactNode;

    background?: React.ReactNode;

    blurPx?: number;
    yOut?: number;
    expandX?: number;
    spring?: {
        stiffness?: number;
        damping?: number;
        mass?: number;
    };

    entry?: EntryAnimation;
    entryDuration?: number;
    entryDelay?: number;
    entryOnce?: boolean;

    containX?: "clip" | "hidden" | "none";
};

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

function getEntryInitial(entry: EntryAnimation) {
    switch (entry) {
        case "fadeUp":
            return { opacity: 0, y: 18, filter: "blur(6px)", scale: 0.995 };
        case "fadeScale":
            return { opacity: 0, y: 0, filter: "blur(4px)", scale: 0.98 };
        case "fadeBlur":
            return { opacity: 0, y: 0, filter: "blur(10px)", scale: 1 };
        case "slideLeft":
            return { opacity: 0, x: -18, filter: "blur(6px)", scale: 0.995 };
        case "slideRight":
            return { opacity: 0, x: 18, filter: "blur(6px)", scale: 0.995 };
        case "none":
        default:
            return undefined;
    }
}

function getEntryInView(entry: EntryAnimation) {
    if (entry === "none") return undefined;
    return { opacity: 1, x: 0, y: 0, filter: "blur(0px)", scale: 1 };
}

export default function SectionAnimation({
    id,
    className,
    children,
    background,

    blurPx = 14,
    yOut = 50,
    expandX = 1.0,
    spring = { stiffness: 200, damping: 50, mass: 2 },

    entry = "fadeUp",
    entryDuration = 0.7,
    entryDelay = 0,
    entryOnce = true,

    containX = "clip",
}: SectionAnimationProps) {
    const ref = React.useRef<HTMLElement | null>(null);

    // Scroll ambience SOLO para el contenido (no para el background)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 95%", "end 5%"],
    });

    const visibility = useTransform(
        scrollYProgress,
        [0, 0.15, 0.5, 0.85, 1],
        [0, 1, 1, 1, 0]
    );

    const opacity = useTransform(visibility, [0, 1], [0, 1]);
    const blur = useTransform(visibility, [0, 1], [blurPx, 0]);
    const y = useTransform(visibility, [0, 1], [yOut, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.94, 1, 1, 0.94]);
    const scaleX = useTransform(visibility, [0, 1], [expandX, 1]);

    const o = useSpring(opacity, spring);
    const b = useSpring(blur, spring);
    const yy = useSpring(y, spring);
    const sc = useSpring(scale, spring);
    const sx = useSpring(scaleX, spring);

    const filter = useTransform(b, (v) => `blur(${v}px)`);

    // Dust overlay SOLO visual, pero NO desaparece del background
    const dustOpacity = useTransform(visibility, [0, 1], [0.14, 0.06]);
    const dustO = useSpring(dustOpacity, spring);

    const entryInitial = entry === "none" ? undefined : getEntryInitial(entry);
    const entryInView = entry === "none" ? undefined : getEntryInView(entry);

    const containClass =
        containX === "clip"
            ? "overflow-x-clip"
            : containX === "hidden"
                ? "overflow-x-hidden"
                : "";

    return (
        <section ref={ref as any} id={id} className={cx("relative w-full", containClass, className)}>
            {/* ✅ Background fijo: nunca se anima */}
            {background ? (
                <div className="pointer-events-none absolute inset-0 z-0">
                    {background}
                </div>
            ) : null}

            {/* ✅ Dust overlay fijo/sutil */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay"
                style={{
                    opacity: dustO,
                    background:
                        "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.10) 1px, transparent 0) 0 0 / 22px 22px",
                }}
            />

            {/* ✅ Todo lo animado va aquí (contenido) */}
            <motion.div
                className="relative z-10"
                initial={entryInitial}
                whileInView={entryInView}
                viewport={{
                    once: entryOnce,
                    amount: 0.25,
                    margin: "0px 0px -10% 0px",
                }}
                transition={{
                    duration: entryDuration,
                    delay: entryDelay,
                    ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                    opacity: o,
                    filter,
                    y: yy,
                    scale: sc,
                    scaleX: sx,
                    transformOrigin: "center",
                    willChange: "opacity, filter, transform",
                }}
            >
                {children}
            </motion.div>
        </section>
    );
}

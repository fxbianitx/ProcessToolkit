"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import SectionAnimation from "../../animation/Section/SectionAnimation";
import HeroBackground from "../Hero/HeroBackground";
import SectionTitle from "../HowItWork/SectionTitle";
import imguno from "../../../assets/FAQ/pregunta-1.png";
import imgdos from "../../../assets/FAQ/pregunta-2.png";
import imgtre from "../../../assets/FAQ/pregunta-3.png";
import imgcua from "../../../assets/FAQ/pregunta-4.png";

type FaqItem = {
    q: string;
    a: string;
    img: string;
    alt: string;
};

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

export default function FAQ() {
    const items: FaqItem[] = useMemo(
        () => [
            {
                q: "¿Esto reemplaza reglas en el ERP?",
                a: "No necesariamente. Puedes externalizar reglas críticas para centralizarlas, auditarlas y versionarlas, sin acoplarte al ERP. Funciona igual para SaaS, tiendas, herramientas internas o proyectos personales.",
                img: imguno,
                alt: "Ilustración de reglas",
            },
            {
                q: "¿Cómo se integra?",
                a: "Modo Pull (request–response): tu sistema envía un payload (venta/compra/despacho) y recibe acciones en la misma respuesta. Ideal para flujos sin latencia de eventos.",
                img: imgdos,
                alt: "Ilustración de integración por API",
            },
            {
                q: "¿Qué pasa si la DB se filtra?",
                a: "El token de integración no está en texto plano: se guarda sha256(token). Sin el token original no es reversible. Además, la auditoría se diseña para preservar evidencia histórica sin permitir cascadas peligrosas.",
                img: imgtre,
                alt: "Ilustración de seguridad",
            },
            {
                q: "¿Puedo ver la auditoría por regla?",
                a: "Sí. Por request se guarda qué reglas matchearon y evidencia por regla (snapshots de conditions/actions en el momento exacto del match).",
                img: imgcua,
                alt: "Ilustración de auditoría",
            },
        ],
        []
    );

    const [active, setActive] = useState(0);
    const timerRef = useRef<number | null>(null);

    function clearTimer() {
        if (timerRef.current) window.clearInterval(timerRef.current);
        timerRef.current = null;
    }

    function startTimer() {
        clearTimer();
        timerRef.current = window.setInterval(() => {
            setActive((prev) => (prev + 1) % items.length);
        }, 5000);
    }

    useEffect(() => {
        items.forEach((it) => {
            const im = new Image();
            im.src = it.img;
        });
    }, [items]);


    function onSelect(i: number) {
        setActive(i);
        startTimer(); // reinicia el carrusel al interactuar
    }

    const current = items[active];

    const [shownImg, setShownImg] = useState(items[0].img);
    const [nextImg, setNextImg] = useState<string | null>(null);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const target = current.img;
        if (target === shownImg) return;

        setNextImg(target);
        setIsFading(true);

        const im = new Image();
        im.src = target;

        im.onload = () => {
            // cuando está lista, esperamos un frame y hacemos el swap suave
            requestAnimationFrame(() => {
                setShownImg(target);
                setNextImg(null);
                setIsFading(false);
            });
        };

        // si el browser ya la tenía en cache, onload puede disparar rápido igual
    }, [current.img, shownImg]);


    return (
        <SectionAnimation
            id="faq"
            className="relative sm:py-16 sm:pb-20 py-6 pb-16"
            background={<HeroBackground />}
            expandX={1.0}
            containX="clip"
            entryDelay={1.4}
            entryDuration={1}
            entry="fadeScale"
        >
            <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
                <SectionTitle
                    eyebrow="FAQ"
                    title="Respuestas directas para decidir rápido"
                    desc="Si tu caso es ERP, SaaS o herramientas internas, la integración se mantiene igual: request–response y auditoría."
                />

                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10 items-start">
                    {/* LEFT: imagen */}
                    <div className="lg:col-span-5">
                        <div
                            className={cx(
                                "relative overflow-hidden rounded-2xl",
                                "border border-slate-200 bg-white/70 backdrop-blur",
                                "shadow-[0_18px_34px_-28px_rgba(15,23,42,0.40)]"
                            )}
                        >
                            <div className="relative aspect-[4/3] w-full">
                                {/* imagen “actual” siempre visible */}
                                <img
                                    src={shownImg}
                                    alt={current.alt}
                                    className={cx(
                                        "absolute inset-0 h-full w-full object-contain pb-8",
                                        "transition-opacity duration-200",
                                        isFading ? "opacity-70" : "opacity-100"
                                    )}
                                    draggable={false}
                                />

                                {/* imagen “siguiente” aparece encima mientras carga */}
                                {nextImg && (
                                    <img
                                        src={nextImg}
                                        alt={current.alt}
                                        className={cx(
                                            "absolute inset-0 h-full w-full object-contain pb-8",
                                            "opacity-0 animate-fadeIn"
                                        )}
                                        draggable={false}
                                    />
                                )}
                            </div>


                            <div className="px-5 pb-5 -mt-2">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    {String(active + 1).padStart(2, "0")} • {current.alt}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: rectángulos */}
                    <div className="lg:col-span-7">
                        <div className="space-y-3">
                            {items.map((it, i) => {
                                const isActive = i === active;
                                return (
                                    <button
                                        key={it.q}
                                        type="button"
                                        onClick={() => onSelect(i)}
                                        className={cx(
                                            "w-full text-left",
                                            "rounded-2xl border bg-white/70 backdrop-blur",
                                            "px-5 py-4",
                                            "transition-[border-color,transform,box-shadow] duration-200",
                                            "hover:border-slate-300 hover:shadow-[0_18px_34px_-28px_rgba(15,23,42,0.45)]",
                                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300/60 focus-visible:ring-offset-2",
                                            isActive
                                                ? "border-slate-300 shadow-[0_18px_34px_-28px_rgba(15,23,42,0.45)]"
                                                : "border-slate-200"
                                        )}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                                        {String(i + 1).padStart(2, "0")}
                                                    </span>
                                                    <span className="text-[15px] font-semibold text-slate-900 leading-6">
                                                        {it.q}
                                                    </span>
                                                </div>

                                                <div
                                                    className={cx(
                                                        "grid transition-[grid-template-rows,opacity] duration-200 ease-out",
                                                        isActive
                                                            ? "grid-rows-[1fr] opacity-100"
                                                            : "grid-rows-[0fr] opacity-0"
                                                    )}
                                                >
                                                    <div className="overflow-hidden">
                                                        <p className="mt-3 text-[14px] leading-6 text-slate-600">
                                                            {it.a}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <span
                                                aria-hidden="true"
                                                className={cx(
                                                    "shrink-0 mt-0.5 text-slate-500",
                                                    "transition-transform duration-200",
                                                    isActive ? "rotate-180" : "rotate-0"
                                                )}
                                            >
                                                ▾
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(2px) scale(0.995); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fadeIn { animation: fadeIn 220ms ease-out; }
      `}</style>
        </SectionAnimation>
    );
}

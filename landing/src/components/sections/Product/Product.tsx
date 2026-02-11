import React from "react";
import { Code2, Building2, ClipboardList, Settings2 } from "lucide-react"; // Importamos iconos reales
import ProductCard from "./ProductCard";
import SectionAnimation from "../../animation/Section/SectionAnimation";
import HeroBackground from "../Hero/HeroBackground";

export default function Product() {
    return (
        <SectionAnimation
            id="producto"
            className="sm:py-16 sm:pb-20 py-6 pb-16"
            background={<HeroBackground />}
            expandX={1.0}
            containX="clip"
            entryDelay={0.6}
            entryDuration={1}
            entry="fadeScale"
        >
            <div className="mx-auto max-w-[1480px] px-5 sm:px-8">

                <div className="mx-auto max-w-2xl text-center">
                    <div className="text-[12px] font-semibold tracking-[0.16em] text-ink-500 uppercase">
                        Producto
                    </div>
                    <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-ink-950">
                        Un motor de reglas que no se vuelve una caja negra
                    </h2>
                    <p className="mt-4 text-[15px] sm:text-[16px] leading-7 text-ink-600">Diseñado para operar en producción: multi-tenant real, settings con defaults, y trazabilidad forense por request.</p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                    <ProductCard
                        icon={<Code2 className="w-5 h-5 text-slate-200" />}
                        title="Reglas escalables"
                        desc="AST + operadores (==, !=, >=, contains, in, not_in) + paths. Modela lógica compleja sin código."
                        meta="AST + Paths"
                    />
                    <ProductCard
                        icon={<Building2 className="w-5 h-5 text-slate-200" />}
                        title="Multi-tenant real"
                        desc="Por organización: reglas, configuración, token, api, auditoría y roles (admin/manager/viewer)."
                        meta="Organizations"
                    />
                    <ProductCard
                        icon={<ClipboardList className="w-5 h-5 text-slate-200" />}
                        title="Trazabilidad total"
                        desc="input_snapshot, matches, acciones, duración, request_code. Diagnóstico sin suposiciones."
                        meta="Forensic logs"
                    />
                    <ProductCard
                        icon={<Settings2 className="w-5 h-5 text-slate-200" />}
                        title="Configuracion por defecto"
                        desc="Contrato de settings con defaults: timezone, currency, retention, max_rules."
                        meta="Schema"
                    />
                </div>

            </div>
        </SectionAnimation>
    );
}

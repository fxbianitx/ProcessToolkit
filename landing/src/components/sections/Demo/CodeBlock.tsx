"use client";

import { useState } from "react";

export default function HerCodeBlock({
    label,
    tag,
    code = "",
    headers = [],
    token = "",
}: {
    label: string;
    tag: string;
    code?: string;
    headers?: Array<{ key: string; value: string }>;
    token?: string;
}) {
    const [activeTab, setActiveTab] = useState<"body" | "headers" | "auth">("body");

    const hasHeaders = headers && headers.length > 0;
    const hasToken = token !== "";

    const highlightPostmanJson = (json: string | undefined | null) => {
        if (!json) return "";
        return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            (match) => {
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) return `<span class="text-[#A31515]">${match}</span>`;
                    return `<span class="text-[#098658]">${match}</span>`;
                }
                if (/true|false/.test(match)) return `<span class="text-[#0000FF]">${match}</span>`;
                return `<span class="text-[#098658]">${match}</span>`;
            }
        );
    };

    const safeCode = code || "";

    return (
        <div className="rounded-lg border border-[#E6E6E6] bg-white overflow-hidden shadow-sm font-sans w-full">
            {/* HEADER CON PESTAÑA AUTH */}
            <div className="flex items-center justify-between px-4 bg-[#F9F9F9] border-b border-[#E6E6E6]">
                <div className="flex items-center gap-5 h-10">
                    <button
                        type="button"
                        onClick={() => setActiveTab("body")}
                        className={`text-[12px] font-medium transition-all self-stretch border-b-2 pt-1 ${activeTab === "body" ? "border-[#FF6C37] text-[#212121]" : "border-transparent text-[#6B6B6B]"
                            }`}
                    >
                        {label}
                    </button>

                    {hasHeaders && (
                        <button
                            type="button"
                            onClick={() => setActiveTab("headers")}
                            className={`text-[12px] font-medium transition-all self-stretch border-b-2 pt-1 ${activeTab === "headers" ? "border-[#FF6C37] text-[#212121]" : "border-transparent text-[#6B6B6B]"
                                }`}
                        >
                            Headers ({headers.length})
                        </button>
                    )}

                    {hasToken && (
                        <button
                            type="button"
                            onClick={() => setActiveTab("auth")}
                            className={`text-[12px] font-medium transition-all self-stretch border-b-2 pt-1 ${activeTab === "auth" ? "border-[#FF6C37] text-[#212121]" : "border-transparent text-[#6B6B6B]"
                                }`}
                        >
                            Auth (1)
                        </button>
                    )}
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EAF5F0] text-[#0C7A4A] uppercase tracking-wider">
                    {tag}
                </span>
            </div>

            {/* CONTENIDO (ALTURA FIJA 13 LÍNEAS) */}
            <div className="bg-white flex h-[304px]">
                {activeTab === "body" ? (
                    <>
                        <div className="w-10 bg-[#F5F5F5] border-r border-[#E6E6E6] py-4 flex flex-col items-center text-[11px] text-[#A5A5A5] select-none font-mono">
                            {safeCode.split('\n').map((_, i) => (
                                <span key={i} className="h-5 leading-5">{i + 1}</span>
                            ))}
                        </div>
                        <pre className="px-4 py-4 text-[13px] leading-5 overflow-auto font-mono w-full scrollbar-thin">
                            <code
                                className="text-[#212121] block"
                                dangerouslySetInnerHTML={{ __html: highlightPostmanJson(safeCode) }}
                            />
                        </pre>
                    </>
                ) : activeTab === "headers" ? (
                    <div className="w-full p-4 overflow-auto text-[12px] font-mono scrollbar-thin">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[#6B6B6B] border-b border-[#E6E6E6]">
                                    <th className="pb-2 font-semibold">Key</th>
                                    <th className="pb-2 font-semibold">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {headers.map((h, idx) => (
                                    <tr key={idx} className="border-b border-[#F2F2F2] last:border-0">
                                        <td className="py-2.5 text-[#A31515] pr-4 font-medium">{h.key}</td>
                                        <td className="py-2.5 text-[#098658] break-all">{h.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    /* VISTA AUTH ESTILO POSTMAN CON ETIQUETA BEARER */
                    <div className="w-full p-6 flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-tight">Type</span>
                            <div className="text-[13px] text-[#212121] font-medium">
                                Bearer Token
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-tight">Token</span>
                                <span className="text-[10px] text-amber-600 font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">Sensitive</span>
                            </div>
                            <div className="bg-[#F9F9F9] p-4 rounded border border-[#E6E6E6] break-all font-mono text-[13px] text-[#098658] leading-relaxed shadow-inner">
                                {token}
                            </div>
                            <p className="text-[11px] text-slate-400 italic">
                                Este token permite la ejecución de reglas vía API.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

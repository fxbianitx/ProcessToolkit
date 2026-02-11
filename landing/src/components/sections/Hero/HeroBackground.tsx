"use client";

export default function HeroBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden sticky z-20">
            {/* blobs suaves */}
            <div className="absolute -top-44 right-[-140px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.10),transparent_60%)] blur-2xl" />
            <div className="absolute top-28 left-[-180px] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(100,116,139,0.10),transparent_60%)] blur-2xl" />

            {/* grano/texture sutil (sin imagen) */}
            <div className="absolute inset-0 opacity-[0.10] [background:radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.15)_1px,transparent_0)_0_0/22px_22px]" />
        </div>
    );
}

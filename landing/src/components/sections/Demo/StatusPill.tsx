export default function StatPill() {
    return (
        <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Auditoría activa
        </span>
    );
}
export default function Kicker({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            {children}
        </div>
    );
}
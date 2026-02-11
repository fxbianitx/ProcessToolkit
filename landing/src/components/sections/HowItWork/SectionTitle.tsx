export default function SectionTitle({
    eyebrow,
    title,
    desc,
}: {
    eyebrow: string;
    title: string;
    desc: string;
}) {
    return (
        <div className="mx-auto max-w-2xl text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {eyebrow}
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-slate-900">
                {title}
            </h2>
            <p className="mt-4 text-[15px] sm:text-[16px] leading-7 text-slate-600">{desc}</p>
        </div>
    );
}
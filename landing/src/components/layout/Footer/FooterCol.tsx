export default function FooterCol({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="text-[13px] font-semibold text-ink-950">{title}</div>
            <div className="mt-3 space-y-2">{children}</div>
        </div>
    );
}
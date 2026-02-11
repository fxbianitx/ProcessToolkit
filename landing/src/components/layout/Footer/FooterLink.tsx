function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

export default function FooterLink({
    href,
    children,
    external,
}: {
    href: string;
    children: React.ReactNode;
    external?: boolean;
}) {
    return (
        <a
            className={cx(
                "block text-[13px] text-ink-600 transition-colors",
                "hover:text-ink-950",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-300/60 focus-visible:ring-offset-2"
            )}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
        >
            {children}
        </a>
    );
}

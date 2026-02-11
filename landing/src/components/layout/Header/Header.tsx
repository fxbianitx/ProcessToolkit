"use client";

import { useEffect, useState } from "react";
import HeaderBrand from "./HeaderBrand";
import HeaderNav from "./HeaderNav";
import HeaderActions from "./HeaderActions";
import HeaderMobileMenu from "./HeaderMobileMenu";
import { NAV } from "../../../data/Header/header.data";

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 1);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={cx(
                "sticky top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-out",
                scrolled
                    ? "backdrop-blur-xl bg-white/90 border-b border-slate-200/70 shadow-[0_18px_40px_-28px_rgba(15,23,42,1)]"
                    : "bg-transparent shadow-[0_18px_40px_-28px_rgba(15,23,42,0.20)]"
            )}
        >
            <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-10">
                <div className="flex h-[76px] items-center justify-between gap-4">
                    <HeaderBrand />

                    <div className="hidden items-center gap-6 lg:flex">
                        <HeaderNav items={NAV} />
                        <HeaderActions />
                    </div>

                    <div className="lg:hidden">
                        <HeaderMobileMenu items={NAV} />
                    </div>
                </div>
            </div>
        </header>
    );
}
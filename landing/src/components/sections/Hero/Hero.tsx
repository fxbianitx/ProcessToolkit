"use client";

import HeroBackground from "./HeroBackground";
import HeroCopy from "./HeroCopy";
import HeroVideo from "./HeroVideo";
import SectionAnimation from "../../animation/Section/SectionAnimation";

export default function Hero() {
    return (
        <SectionAnimation
            className="sm:py-16 sm:pb-20 py-6 pb-16"
            background={<HeroBackground />} 
            expandX={1.0}                    
            containX="clip"
            entryDelay={0.4}
            entryDuration={1}
            entry="fadeScale"
        >

            <div className="mx-auto max-w-[1480px] px-5 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-11 lg:gap-12 items-start">
                    <div className="lg:col-span-5">
                        <HeroCopy />
                    </div>

                    <div className="lg:col-span-6">
                        <HeroVideo />
                    </div>
                </div>
            </div>
        </SectionAnimation>
    );
}

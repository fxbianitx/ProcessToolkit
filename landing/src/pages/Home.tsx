import Hero from "../components/sections/Hero/Hero";
import Product from "../components/sections/Product/Product";
import HowItWorksSection from "../components/sections/HowItWork/HowItWorks";
import Demo from "../components/sections/Demo/Demo";
import FAQ from "../components/sections/FAQ/FAQ";
import CTA from "../components/sections/CTA/CTA";


export default function Home() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* HERO  */}
            <Hero />

            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* PRODUCTO */}
            <Product />

            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* DEMO */}
            <Demo />

            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* CÓMO FUNCIONA */}
            <HowItWorksSection />

            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* FAQ */}
            <FAQ />

            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* CTA FINAL */}
            <CTA />


        </main>
    );
}

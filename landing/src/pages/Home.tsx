import Header from "../components/layout/Header/Header";
import Hero from "../components/sections/Hero/Hero";
import Product from "../components/sections/Product/Product";
import HowItWorksSection from "../components/sections/HowItWork/HowItWorks";
import Demo from "../components/sections/Demo/Demo";
import FAQ from "../components/sections/FAQ/FAQ";
import Footer from "../components/layout/Footer/Footer";
import CTA from "../components/sections/CTA/CTA";

function Container({ children }: { children: React.ReactNode }) {
    return <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">{children}</div>;
}


export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <Header />

            <main>
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

                <Footer />

            </main>
        </div >
    );
}

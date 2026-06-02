"use client";

import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Legal from "../pages/Legal";

// Ejemplo de futura página:
function Docs() {
    return (
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 py-10">
            <h1 className="text-2xl font-semibold text-slate-900">Docs</h1>
            <p className="mt-2 text-slate-600">Página nueva (placeholder).</p>
        </div>
    );
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/legal" element={<Legal />} />

            {/* fallback */}
            <Route path="*" element={<Home />} />
        </Routes>
    );
}

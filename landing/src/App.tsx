"use client";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

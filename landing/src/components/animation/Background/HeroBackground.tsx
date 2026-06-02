"use client";

export default function HeroBackground() {
    return (
        <div className="nano-bg" aria-hidden="true">
            {/* capas */}
            <div className="nano-layer nano-grid" />
            <div className="nano-layer nano-particles" />
            <div className="nano-layer nano-links" />

            {/* efecto pro */}
            <div className="nano-sheen" />
            <div className="nano-vignette" />
            <div className="nano-grain" />

            <style>{`
        /* ===== Base ===== */
        .nano-bg{
          position:absolute;
          inset:0;
          overflow:hidden;
          pointer-events:none;
          border-radius: inherit;
          background: white;
        }

        .nano-layer{
          position:absolute;
          inset:-20%;
          transform: translateZ(0);
        }

        /* ===== Grid sutil tipo placa ===== */
        .nano-grid{
          opacity:.52;
          background:
            linear-gradient(to right, rgba(15,23,42,0.055) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.055) 1px, transparent 1px);
          background-size: 46px 46px;
          mask-image: radial-gradient(circle at 50% 45%, black 0 56%, transparent 78%);
          animation: nanoGridDrift 18s linear infinite;
        }
        @keyframes nanoGridDrift{
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-46px,-46px,0); }
        }

        /* ===== Partículas (más notorias, 3 capas) ===== */
        .nano-particles{
            opacity: 1;
            background-image:
                radial-gradient(circle, rgba(15,23,42,0.28) 1.15px, transparent 2.3px),
                radial-gradient(circle, rgba(15,23,42,0.22) 1.35px, transparent 2.6px),
                radial-gradient(circle, rgba(15,23,42,0.16) 1.6px, transparent 3.1px);
            background-size:
                90px 90px,
                140px 140px,
                210px 210px;

            /* ✅ IMPORTANTE: inicia con posiciones definidas */
            background-position:
                0px 0px,
                50px 30px,
                80px 10px;

            mask-image: radial-gradient(circle at 55% 40%, black 0 62%, transparent 86%);
            filter: blur(.12px);

            /* ✅ loop perfecto moviendo background-position */
            animation: nanoParticlesLoop 16s linear infinite;
        }
        @keyframes nanoParticlesLoop{
            from{
                background-position:
                0px 0px,
                50px 30px,
                80px 10px;
            }
            to{
                /* ✅ mueve exactamente 1 "tile" por capa (múltiplo del size) */
                background-position:
                90px 90px,
                calc(50px + 140px) calc(30px + 140px),
                calc(80px + 210px) calc(10px + 210px);
            }
        }

        /* ===== Micro-links (líneas “circuito”) ===== */
        .nano-links{
          opacity:.50;
          background:
            repeating-linear-gradient(
              0deg,
              rgba(15,23,42,0.00) 0 18px,
              rgba(15,23,42,0.085) 18px 19px,
              rgba(15,23,42,0.00) 19px 44px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(15,23,42,0.00) 0 28px,
              rgba(15,23,42,0.075) 28px 29px,
              rgba(15,23,42,0.00) 29px 62px
            );
          mask-image: radial-gradient(circle at 42% 58%, black 0 60%, transparent 82%);
          animation: nanoLinksShift 24s ease-in-out infinite alternate;
        }
        @keyframes nanoLinksShift{
          0%   { transform: translate3d(0,0,0) rotate(0.001deg); }
          100% { transform: translate3d(-90px,55px,0) rotate(0.001deg); }
        }

        /* ===== Sheen (barrido de luz empresarial) ===== */
        .nano-sheen{
          position:absolute;
          inset:-30%;
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255,255,255,0.00) 40%,
            rgba(255,255,255,0.18) 50%,
            rgba(255,255,255,0.00) 60%,
            transparent 100%
          );
          mask-image: radial-gradient(circle at 45% 40%, black 0 62%, transparent 86%);
          transform: translateX(-45%) rotate(0.001deg);
          opacity: 0;
          animation: nanoSheenSweep 7.2s ease-in-out infinite;
          mix-blend-mode: screen;
        }
        @keyframes nanoSheenSweep{
          0%   { opacity: 0; transform: translateX(-55%) rotate(0.001deg); }
          10%  { opacity: .65; }
          26%  { opacity: .65; transform: translateX(55%) rotate(0.001deg); }
          34%  { opacity: 0; }
          100% { opacity: 0; transform: translateX(55%) rotate(0.001deg); }
        }

        /* ===== Vignette (profundidad pro) ===== */
        .nano-vignette{
          position:absolute;
          inset:0;
          background:
            radial-gradient(900px 700px at 50% 45%, rgba(255,255,255,0.00), rgba(2,6,23,0.06) 78%, rgba(2,6,23,0.09) 100%);
          opacity: .55;
        }

        /* ===== Grain / Noise (muy sutil, evita look “plano”) ===== */
        .nano-grain{
          position:absolute;
          inset:-10%;
          opacity:.08;
          background:
            repeating-linear-gradient(0deg,
              rgba(15,23,42,0.10) 0 1px,
              rgba(255,255,255,0.00) 1px 3px
            ),
            repeating-linear-gradient(90deg,
              rgba(15,23,42,0.08) 0 1px,
              rgba(255,255,255,0.00) 1px 4px
            );
          mix-blend-mode: soft-light;
          filter: blur(.35px);
          animation: nanoGrainDrift 10s linear infinite;
          mask-image: radial-gradient(circle at 50% 45%, black 0 72%, transparent 92%);
        }
        @keyframes nanoGrainDrift{
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-40px,25px,0); }
        }

        /* ===== Reduce motion ===== */
        @media (prefers-reduced-motion: reduce){
          .nano-grid, .nano-particles, .nano-links,
          .nano-sheen, .nano-grain{
            animation: none !important;
          }
        }
      `}</style>
        </div>
    );
}

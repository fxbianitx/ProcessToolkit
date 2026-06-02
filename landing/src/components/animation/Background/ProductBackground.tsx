"use client";

export default function ProductBackground() {
    return (
        <div className="prod-bg" aria-hidden="true">
            <div className="prod-layer prod-base" />
            <div className="prod-layer prod-dots" />
            <div className="prod-layer prod-diagonals" />
            <div className="prod-layer prod-glow" />
            <div className="prod-layer prod-sheen" />
            <div className="prod-layer prod-vignette" />

            <style>{`
        /* ===== Base ===== */
        .prod-bg{
          position:absolute;
          inset:0;
          overflow:hidden;
          pointer-events:none;
          border-radius: inherit;
          background:
            radial-gradient(1200px 700px at 20% 10%, rgba(255,255,255,0.95), transparent 55%),
            radial-gradient(900px 650px at 85% 40%, rgba(15,23,42,0.05), transparent 62%),
            linear-gradient(to bottom, rgba(255,255,255,0.75), rgba(255,255,255,0.88));
        }

        .prod-layer{
          position:absolute;
          inset:-20%;
          transform: translateZ(0);
        }

        /* ===== “Official” texture: micro ruido muy fino (sin ensuciar) ===== */
        .prod-base{
          opacity: .9;
          background:
            repeating-linear-gradient(
              0deg,
              rgba(15,23,42,0.035) 0 1px,
              rgba(255,255,255,0.00) 1px 4px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(15,23,42,0.030) 0 1px,
              rgba(255,255,255,0.00) 1px 6px
            );
          filter: blur(.35px);
          mix-blend-mode: soft-light;
          mask-image: radial-gradient(circle at 50% 35%, black 0 70%, transparent 90%);
          animation: prodBaseDrift 14s linear infinite;
        }
        @keyframes prodBaseDrift{
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-36px,22px,0); }
        }

        /* ===== Dots grid (topographic / tech) ===== */
        .prod-dots{
          opacity: .75;
          background-image:
            radial-gradient(circle, rgba(15,23,42,0.16) 1px, transparent 1.8px),
            radial-gradient(circle, rgba(15,23,42,0.10) 1px, transparent 2.0px);
          background-size:
            28px 28px,
            56px 56px;
          background-position:
            0 0,
            14px 18px;
          mask-image: radial-gradient(circle at 45% 35%, black 0 62%, transparent 86%);
          animation: prodDotsLoop 18s linear infinite;
        }
        /* loop seamless moviendo el background-position por múltiplos exactos */
        @keyframes prodDotsLoop{
          from{
            background-position: 0 0, 14px 18px;
          }
          to{
            background-position: 28px 28px, calc(14px + 56px) calc(18px + 56px);
          }
        }

        /* ===== Diagonals (enterprise sheen lines) ===== */
        .prod-diagonals{
          opacity: .5;
          background:
            repeating-linear-gradient(
              135deg,
              rgba(15,23,42,0.00) 0 18px,
              rgba(15,23,42,0.06) 18px 19px,
              rgba(15,23,42,0.00) 19px 54px
            );
          mask-image: radial-gradient(circle at 60% 45%, black 0 58%, transparent 84%);
          animation: prodDiagShift 20s ease-in-out infinite alternate;
        }
        @keyframes prodDiagShift{
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-70px,45px,0); }
        }

        /* ===== Soft glow (depth) ===== */
        .prod-glow{
          opacity: .9;
          background:
            radial-gradient(620px 420px at 30% 30%, rgba(15,23,42,0.06), transparent 60%),
            radial-gradient(520px 420px at 80% 60%, rgba(15,23,42,0.05), transparent 62%),
            radial-gradient(900px 800px at 55% 110%, rgba(15,23,42,0.04), transparent 60%);
          mask-image: radial-gradient(circle at 50% 45%, black 0 78%, transparent 92%);
        }

        /* ===== Premium sheen sweep ===== */
        .prod-sheen{
          inset:-30%;
          opacity: 0;
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255,255,255,0.00) 42%,
            rgba(255,255,255,0.18) 50%,
            rgba(255,255,255,0.00) 58%,
            transparent 100%
          );
          transform: translateX(-55%) rotate(0.001deg);
          mix-blend-mode: screen;
          mask-image: radial-gradient(circle at 50% 40%, black 0 62%, transparent 88%);
          animation: prodSheen 8.2s ease-in-out infinite;
        }
        @keyframes prodSheen{
          0%   { opacity: 0; transform: translateX(-60%) rotate(0.001deg); }
          12%  { opacity: .7; }
          28%  { opacity: .7; transform: translateX(60%) rotate(0.001deg); }
          36%  { opacity: 0; }
          100% { opacity: 0; transform: translateX(60%) rotate(0.001deg); }
        }

        /* ===== Vignette (serio/pro) ===== */
        .prod-vignette{
          inset:0;
          background:
            radial-gradient(900px 650px at 50% 35%, rgba(255,255,255,0), rgba(2,6,23,0.055) 78%, rgba(2,6,23,0.085) 100%);
          opacity: .5;
        }

        @media (prefers-reduced-motion: reduce){
          .prod-base, .prod-dots, .prod-diagonals, .prod-sheen{
            animation: none !important;
          }
        }
      `}</style>
        </div>
    );
}

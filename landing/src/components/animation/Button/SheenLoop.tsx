
//! Animacion de iluminado en contenedores en Loop
export default function SheenLoop() {
    return <span
        aria-hidden="true"
        className={[
            "pointer-events-none absolute inset-0",
            "bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.85),transparent)]",
            "blur-[1px] opacity-0",
            "group-hover:opacity-100 group-hover:animate-[nav-sheen_1.05s_linear_infinite]",
            "mix-blend-screen",
        ].join(" ")}
    />
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B0F17",
          900: "#111827",
          700: "#374151",
          600: "#4B5563",
          500: "#6B7280",
          300: "#D1D5DB",
          200: "#E5E7EB",
          100: "#F3F4F6",
          50: "#F9FAFB",
        },
        brand: {
          600: "#FF5630",
          700: "#E04E2F",
          50: "#FFF2EE",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(17, 24, 39, 0.08)",
        glass: "0 8px 24px rgba(17, 24, 39, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
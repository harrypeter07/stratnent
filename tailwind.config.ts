import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-alt": "var(--bg-alt)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        coral: "var(--coral)",
        mint: "var(--mint)",
        violet: "var(--violet)",
        cyan: "var(--cyan)",
        border: "var(--border)",
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "sans-serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        card: "24px",
        btn: "100px",
        panel: "32px",
      },
    },
  },
  plugins: [],
};
export default config;

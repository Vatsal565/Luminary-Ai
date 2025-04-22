import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        background: {
          DEFAULT: "var(--background)",
          secondary: "var(--background-secondary)",
        },
        border: "var(--border)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        level: {
          1: "#f9f3ec",
          2: "#f97315",
          3: "#262b33"
        }
      },
    },
  },
  plugins: [
    function({ addBase }: { addBase: (base: Record<string, any>) => void }) {
      addBase({
        ":root": {
          "--primary": "#000000",
          "--primary-foreground": "#ffffff",
          "--secondary": "#f1f5f9",
          "--secondary-foreground": "#0f172a",
          "--background": "#ffffff", 
          "--background-secondary": "#f8fafc",
          "--border": "#e2e8f0",
          "--muted": "#f1f5f9",
          "--muted-foreground": "#64748b",
          "--accent": "#f1f5f9",
          "--accent-foreground": "#0f172a"
        }
      });
    }
  ],
} satisfies Config;
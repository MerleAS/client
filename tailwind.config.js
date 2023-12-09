/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
    "./app/**/*.{js,ts,tsx}",
    "./src/**/*.{js,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      "sm/md": "704px",
      md: "768px",
      "md/lg": "896px",
      lg: "1024px",
      "lg/xl": "1152px",
      xl: "1280px",
      "3/2xl": "1308px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backdropBlur: {
        xs: "2px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        dark: "#1b1b1b",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
        xs: "2px"
      },
      keyframes: {
        slideInRight: {
          from: { opacity: 0.5, transform: "translateX(100%)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideOutRight: {
          from: { opacity: 1, transform: "translateX(0)" },
          to: { opacity: 0.5, transform: "translateX(100%)" },
        },
        slideInLeft: {
          from: { opacity: 0.5, transform: "translateX(-100%)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideOutLeft: {
          from: { opacity: 1, transform: "translateX(0)" },
          to: { opacity: 0.5, transform: "translateX(-100%)" },
        },
        in: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 0.3,
          },
        },
        out: {
          from: {
            opacity: 0.3,
          },
          to: {
            opacity: 0,
          },
        },
      },
      animation: {
        slideInRight: "slideInRight 0.6s ease-in-out forwards",
        slideOutRight: "slideOutRight 0.6s ease-in-out forwards",
        slideInLeft: "slideInLeft 0.6s ease-in-out forwards",
        slideOutLeft: "slideOutLeft 0.6s ease-in-out forwards",
        backdropIn: "in 0.6s ease-in-out forwards",
        backdropOut: "out 0.6s ease-in-out forwards",
      },
      boxShadow: {
        "3xl" : '0 15px 60px 0 rgba(0, 0, 0, 0.3)'
      },
    },
  },
};

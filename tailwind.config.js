/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#00FF94',
                    light: '#66FFBE',
                    dark: '#00B368',
                },
                obsidian: {
                    DEFAULT: '#0D0D0F',
                    light: '#1A1A1F',
                    accent: '#24242B',
                },
                emerald: {
                    50: '#E6FFF4',
                    100: '#CCFFE9',
                    200: '#99FFD2',
                    300: '#66FFBC',
                    400: '#33FFA5',
                    500: '#00FF94',
                    600: '#00CC76',
                    700: '#009959',
                    800: '#00663B',
                    900: '#00331D',
                }
            },
            fontFamily: {
                heading: ['"Clash Display"', 'sans-serif'],
                body: ['Satoshi', 'sans-serif'],
                mono: ['Satoshi Mono', 'monospace'],
            },
            letterSpacing: {
                'widest-tech': '0.3em',
            },
            backgroundImage: {
                'scanlines': 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
            },
            animation: {
                'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            boxShadow: {
                'emerald-glow': '0 0 15px rgba(0, 255, 148, 0.3)',
                'emerald-glow-strong': '0 0 25px rgba(0, 255, 148, 0.5)',
            }
        },
    },
    plugins: [],
}

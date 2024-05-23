
/**
 * I need to use this rn cuz the tailwindcss vs code plugin doesn't preview 
 * colors that aren't hex :V
 * @param {number} h [0, 360]
 * @param {number} s [0, 1]
 * @param {number} v [0, 1]
 * @return {string}
 * @author https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
 */
const hsvToRgb = (h, s, v) => {
    h /= 360;

    const component = (c) => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    }

    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    
    return `#${component(r)}${component(g)}${component(b)}`;
}

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        fontFamily: {
            'head': ['"Poppins"', 'sans-serif'],
            'body': ['"Poppins"', 'sans-serif'],
        },
        // https://www.realtimecolors.com/?colors=e5ffe0-111311-57fc4e-1ce8a4-f4ff82&fonts=Poppins-Poppins
        colors: {
            'text': {
                50: '#eaffe5',
                100: '#d5ffcc',
                200: '#aaff99',
                300: '#80ff66',
                400: '#55ff33',
                500: '#2bff00',
                600: '#22cc00',
                700: '#1a9900',
                800: '#116600',
                900: '#093300',
                950: '#041a00',
            },
            'background': {
                50: '#f1f3f1',
                100: '#e4e7e4',
                200: '#c9cfc9',
                300: '#aeb7ae',
                400: '#939f93',
                500: '#788778',
                600: '#606c60',
                700: '#485148',
                800: '#303630',
                900: '#181b18',
                950: '#0c0e0c',
            },
            'primary': {
                50: '#e7ffe6',
                100: '#cffecd',
                200: '#9ffd9b',
                300: '#70fd68',
                400: '#40fc36',
                500: '#10fb04',
                600: '#0dc903',
                700: '#0a9702',
                800: '#066402',
                900: '#033201',
                950: '#021900',
            },
            'secondary': {
                50: '#e8fdf6',
                100: '#d1faec',
                200: '#a2f6da',
                300: '#74f1c7',
                400: '#45edb5',
                500: '#17e8a2',
                600: '#12ba82',
                700: '#0e8b61',
                800: '#095d41',
                900: '#052e20',
                950: '#021710',
            },
            'accent': {
                50: '#fdffe5',
                100: '#fbffcc',
                200: '#f7ff99',
                300: '#f2ff66',
                400: '#eeff33',
                500: '#eaff00',
                600: '#bbcc00',
                700: '#8c9900',
                800: '#5e6600',
                900: '#2f3300',
                950: '#171a00',
            },
        },
        spacing: {
            tiny:     '0.1rem',
            small:    '0.8rem',
            normal:   '1.6rem',
            big:      '3rem',
            huge:     '10rem',
        },
        borderWidth: {
            normal: '1.5px',
            bold:   '2.5px',
            heavy:  '0.2rem',
        },
        borderRadius: {
            normal: '0.3rem',
            full:   '9999px',
        },
        fontSize: {
            small:        '0.75rem',
            normal:       '1.1rem',
            considerable: '1.3rem',
            big:          '1.5rem',
            huge:         '6rem',
        },
        maxWidth: {
            'paragraph': 'min(36rem, 90vw)',
        },
        boxShadow: {
            normal: '0 5px 10px 0px rgba(0, 0, 0, 0.3)',
            heavy:  '0 5px 10px 0px rgba(0, 0, 0, 0.5)',
        }
    },
    plugins: [],
}

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html, body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: Roboto ,ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        line-height: 1.5;
        -webkit-text-size-adjust: 100%;
        tab-size: 4;
        font-feature-settings: normal;
        margin: 0;
    }

    :root {
        // Colors
        --color-text-light: var(--color-neutral-200);
        --color-text-dark: var(--color-neutral-900);
        --color-primary-800: #011138;
        --color-primary-700: #081f58;
        --color-primary-600: #334777;
        --color-primary-500: #5f6f96;
        --color-primary-400: #8b97b4;
        --color-primary-300: #b8c0d2;
        --color-primary-200: #e6e8ef;
        --color-secondary-800: #5d541a;
        --color-secondary-700: #8a7d29;
        --color-secondary-600: #b5a439;
        --color-secondary-500: #dfcb4b;
        --color-secondary-400: #ecdc7b;
        --color-secondary-300: #f5ecad;
        --color-secondary-200: #fcf9e2;
        --color-primary-main: var(--color-primary-700);
        --color-secondary-main: var(--color-secondary-500);
        --color-neutral-950: #0f0f0f;
        --color-neutral-900: #2a2a2a;
        --color-neutral-800: #454545;
        --color-neutral-700: #5f5f5f;
        --color-neutral-600: #7a7a7a;
        --color-neutral-500: #959595;
        --color-neutral-400: #a8a8a8;
        --color-neutral-300: #bbbbbb;
        --color-neutral-200: #cecece;
        --color-neutral-100: #e1e1e1;
        --color-neutral-50: #f4f4f4;
        

        // Font 
        --font-roboto: 'Roboto', sans-serif;
        --font-size-h1: 48px;
        --font-size-h2: 40px;
        --font-size-h3: 32px;
        --font-size-h4: 28px;
        --font-size-h5: 24px;
        --font-size-h6: 20px;
        --font-size-body-1: 16px;
        --font-size-body-2: 14px;
        --font-size-button: 14px;
        --font-size-caption: 12px;
        --font-size-overline: 10px;
        --font-weight-medium: 500;
        
        // Gradients
        --background-gradient:radial-gradient(
            1283.71% 141.42% at 0% 100%,
            rgba(225, 225, 225, 0.25) 0%,
            rgba(244, 244, 244, 0.25) 0.01%,
            rgba(225, 225, 225, 0.25) 100%);

        --background-gradient-dark:radial-gradient(
            1283.71% 141.42% at 0% 100%,
            rgba(225, 225, 225, 0.85) 0%,
            rgba(244, 244, 244, 0.85) 0.01%,
            rgba(225, 225, 225, 0.85) 100%);
    }
`;

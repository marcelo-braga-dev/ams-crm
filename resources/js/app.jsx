import './bootstrap';

//ARGON
import "../argon/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// Argon - fim

// Nucleo Icons
import '../assets/argon/bootstrap5/css/nucleo-icons.css';
import '../assets/argon/bootstrap5/css/nucleo-svg.css';
import '../assets/argon/bootstrap5/css/nucleo-icons.css';
import '../assets/argon/bootstrap5/css/argon-dashboard.css';

import '../css/style.css';
import '../css/theme.css';
import '../css/lightbox.css';

// {/* <!--   Core JS Files   --> */}
import '../assets/argon/bootstrap5/js/core/popper.min';
import '../assets/argon/bootstrap5/js/core/bootstrap.min';
import '../assets/argon/bootstrap5/js/argon-dashboard.min';
// Bootstrap5 Argon - fim

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ThemeCustomization from '@/Themes/index';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({el, App, props}) {
        const root = createRoot(el);

        root.render(<ThemeCustomization><App {...props} /></ThemeCustomization>);
    },
    progress: {
        color: '#4B5563',
    },
});


import './bootstrap';

import '@/Themes/assets';
import ThemeCustomization from '@/Themes/index';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { AlertListener, AlertProvider } from '@/Contexts/AlertsContext.jsx';
import React from 'react';

// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    // title: (title) => `${title} - `,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeCustomization>
                <AlertProvider>
                    <AlertListener />
                        <App {...props} />
                </AlertProvider>
            </ThemeCustomization>);
    },
    progress: {
        color: '#4B5563',
    },
});


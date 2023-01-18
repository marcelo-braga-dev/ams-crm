import './bootstrap';
// import '../css/app.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

//ARGON
// import "../argon/vendor/nucleo/css/nucleo.css";
import "../argon/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// import "../argon/css/argon.css?v=1.0.0";
// Argon - fim

// Bootstrap5 Argon
// Nucleo Icons
import '../assets/argon/bootstrap5/css/nucleo-icons.css';
import '../assets/argon/bootstrap5/css/nucleo-svg.css';
import '../assets/argon/bootstrap5/css/nucleo-icons.css';
import '../assets/argon/bootstrap5/css/argon-dashboard.css';

// {/* <!--   Core JS Files   --> */}
// import '../assets/jquery/jquery-3.6.3.slim.min';
import '../assets/argon/bootstrap5/js/core/popper.min';
import '../assets/argon/bootstrap5/js/core/bootstrap.min';
// import '../assets/argon/bootstrap5/js/plugins/chartjs.min';
import '../assets/argon/bootstrap5/js/argon-dashboard.min';
// Bootstrap5 Argon - fim

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
});

InertiaProgress.init({ color: '#4B5563' });

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
import '../assets/argon/bootstrap5/js/core/popper.min';
import '../assets/argon/bootstrap5/js/core/bootstrap.min';
import '../assets/argon/bootstrap5/js/argon-dashboard.min';
// Bootstrap5 Argon - fim

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
    progress: {
        color: '#4B5563',
    },
})

import {router} from "@inertiajs/react";

export const ativarStatusWhatsapp = (id) => {
    router.post(route('auth.leads.ativar-whatsapp', id),
        {_method: 'PUT'}, {preserveScroll: true});
};

export const inativarStatusWhatsapp = (id) => {
    router.post(route('auth.leads.inativar-whatsapp', id),
        {_method: 'PUT'}, {preserveScroll: true});
};

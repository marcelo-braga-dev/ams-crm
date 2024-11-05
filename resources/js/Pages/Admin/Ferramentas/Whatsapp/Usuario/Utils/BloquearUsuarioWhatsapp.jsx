import axios from 'axios';
import { router } from '@inertiajs/react';

export const bloquearUsuarioWhatsapp = (usuario) => {
    const inativar = async () => {
        try {
            const response =
                await axios.post(route('admin.ferramentas.whatsapp.inativar-usuario', usuario.id));

        } catch (error) {
        }
    };

    inativar();
};

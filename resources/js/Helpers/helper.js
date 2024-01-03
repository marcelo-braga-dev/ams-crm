import {usePage} from "@inertiajs/react";

export const isAdmin = () => {
    return usePage().props.auth.user.tipo === 'admin'
}

export const isSupervisor = () => {
    return usePage().props.auth.user.tipo === 'supervisor'
}

export const funcaoUsuario = () => {
    return usePage().props.auth.user.tipo
}

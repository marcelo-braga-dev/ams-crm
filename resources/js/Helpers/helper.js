import { usePage } from "@inertiajs/react";

export const isAdmin = () => {
    return usePage().props.auth.user.tipo === 'admin'
}

export const isSupervisor = () => {
    return usePage().props.auth.user.tipo === 'supervisor'
}

export const funcaoUsuario = () => {
    return usePage().props.auth.user.tipo
}

export const converterMes = (mes) => {
    const meses = { 1: 'JAN', 2: 'FEV', 3: 'MAR', 4: 'ABR', 5: 'MAI', 6: 'JUN', 7: 'JUL', 8: 'AGO', 9: 'SET', 10: 'OUT', 11: 'NOV', 12: 'DEZ' }
    return meses?.[mes]
}

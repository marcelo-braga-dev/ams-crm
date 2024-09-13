import {usePage} from "@inertiajs/react";

export const isAdmin = () => {
    return usePage().props.auth.user.is_financeiro == 1
}

export const converterMes = (mes) => {
    const meses = {1: 'JAN', 2: 'FEV', 3: 'MAR', 4: 'ABR', 5: 'MAI', 6: 'JUN', 7: 'JUL', 8: 'AGO', 9: 'SET', 10: 'OUT', 11: 'NOV', 12: 'DEZ'}
    return meses?.[mes]
}
export const converterMesCompleto = (mes) => {
    const meses = {
        1: 'Janeiro', 2: 'Fevereiro', 3: 'Março', 4: 'Abril',
        5: 'Maio', 6: 'Junho', 7: 'Julho', 8: 'Agosto',
        9: 'Setembro', 10: 'Outubro', 11: 'Novembro', 12: 'Dezembro'
    }
    return meses?.[mes]
}

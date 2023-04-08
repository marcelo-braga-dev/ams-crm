export function converterDataHorario(data) {
    return  new Date(data).toLocaleString()
}

export default function convertFloatToMoney(valor, precisao = 2) {
    const res = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: precisao, maximumFractionDigits: precisao
    }).format(valor)
    if (res === 'NaN') return 0

    return res ?? 15
}
export const convertMoneyFloat = (valor) => {
    valor = valor.toString()
    return parseFloat(valor.replace('.', '')
        .replace(',', '')
        .replace(/\D/g, '')) / 100
}

export function x() {return 5050}

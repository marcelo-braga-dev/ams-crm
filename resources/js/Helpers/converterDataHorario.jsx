export function converterDataHorario(data) {
    return  new Date(data).toLocaleString()
}

export default function convertFloatToMoney(valor, precisao = 2, tag = false) {
    const res = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: precisao, maximumFractionDigits: precisao
    }).format(valor)

    if (res === 'NaN') return 0
    if (tag) return <span className={(valor < 0) ? 'text-danger' : ''}>{res}</span>
    return res
}
export const convertMoneyFloat = (valor = 0, precisao = 2) => {
    valor = valor.toString()
    return parseFloat(valor.replace('.', '')
        .replace(',', '')
        .replace(/\D/g, '')) / (10 ** precisao)
}

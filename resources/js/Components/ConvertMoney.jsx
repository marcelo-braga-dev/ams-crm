export default function ConvertMoney({children}) {
    return parseFloat(children)
        .toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
}

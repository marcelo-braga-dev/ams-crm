export default function converterDatas(data) {
    return  new Date(data + ' 22:12').toLocaleDateString()
}

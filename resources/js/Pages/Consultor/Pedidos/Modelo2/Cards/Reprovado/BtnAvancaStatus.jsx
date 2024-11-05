export default function BtnAvancaStatus({id}) {
    return (
        <a
            className='btn btn-danger btn-sm '
            href={route('consultor.revisar.edit', id)}>
                Revisar
        </a>

    )
}

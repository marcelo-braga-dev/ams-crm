export default function LeadsDados({dados}) {
    return (<>
        <div className="row">
            <div className="col">
                <p><b>Cliente:</b> {dados.cliente.nome}</p>
                <p><b>Telefone:</b> {dados.contato.telefone}</p>
                <p><b>Email:</b> {dados.contato.email}</p>
                <p><b>Atendente:</b> {dados.contato.atendente}</p>
                <p><b>Cidade/Estado:</b> {dados.cliente.cidade} / {dados.cliente.estado}</p>
                <p><b>Status:</b> {dados.infos.status}</p>
                <p><b>Anotações:</b> {dados.infos.anotacoes}</p>
            </div>
            <div className="col">
                <p><b>Meio de Contato:</b> {dados.infos.contato}</p>
                <p><b>Observações:</b> {dados.infos.status_anotacoes}</p>
                <p><b>Data de Contato:</b> {dados.infos.status_data}</p>
                <p><b>Data de Cadastro:</b> {dados.infos.data_criacao}</p>
            </div>
        </div>
    </>)
}

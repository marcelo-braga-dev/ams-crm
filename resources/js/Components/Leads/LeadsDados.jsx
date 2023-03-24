export default function LeadsDados({dados}) {
    return (<>{console.log(dados)}
        <div className="row">
            <div className="col mb-2">
                <span className="d-block"><b>Cliente:</b> {dados.cliente.nome}</span>
                <span className="d-block"><b>CNPJ:</b> {dados.cliente.cnpj}</span>
                <span className="d-block"><b>Telefone:</b> {dados.contato.telefone}</span>
                <span className="d-block"><b>Email:</b> {dados.contato.email}</span>
                <span className="d-block"><b>Atendente:</b> {dados.contato.atendente}</span>
                <span className="d-block"><b>Cidade/Estado:</b> {dados.cliente.cidade} / {dados.cliente.estado}</span>
                <span className="d-block"><b>Status:</b> {dados.infos.status}</span>
                <span className="d-block"><b>Anotações:</b> {dados.infos.anotacoes}</span>
            </div>
            <div className="col mb-2">
                <span className="d-block"><b>ID:</b> #{dados.id}</span>
                <span className="d-block"><b>Meio de Contato:</b> {dados.infos.contato}</span>
                <span className="d-block"><b>Observações:</b> {dados.infos.status_anotacoes}</span>
                <span className="d-block"><b>Data de Contato:</b> {dados.infos.status_data}</span>
                <span className="d-block"><b>Data de Cadastro:</b> {dados.infos.data_criacao}</span>
            </div>
        </div>
    </>)
}

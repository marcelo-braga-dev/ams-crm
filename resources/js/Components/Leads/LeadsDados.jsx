export default function LeadsDados({dados}) {
    return (<>
        <div className="row">
            <div className="col mb-2">
                <span className="d-block"><b>Nome:</b> {dados.cliente.nome ?? dados.cliente.razao_social}</span>
                {dados.cliente.cnpj && <span className="d-block"><b>CNPJ:</b> {dados.cliente.cnpj}</span>}
                {dados.cliente.rg && <span className="d-block"><b>RG:</b> {dados.cliente.rg}</span>}
                {dados.cliente.cpf && <span className="d-block"><b>CPF:</b> {dados.cliente.cpf}</span>}
                {!dados?.contato?.telefones?.length > 0 && <span className="d-block"><b>Telefone:</b> {dados.contato.telefone}</span>}
                {dados?.contato?.telefones?.length > 0 && <span className="d-block"><b>Telefones:</b> {dados.contato.telefones.map(item => item + ', ')}</span>}
                {dados.contato.email && <span className="d-block"><b>Email:</b> {dados.contato.email}</span>}
                {dados.contato.atendente && <span className="d-block"><b>Atendente:</b> {dados.contato.atendente}</span>}
                {dados.cliente.cidade && <span className="d-block"><b>Cidade/Estado:</b> {dados.cliente.cidade} / {dados.cliente.estado}</span>}
                {dados.cliente.endereco && <span className="d-block"><b>Endereço:</b> {dados.cliente.endereco}</span>}
                <span className="d-block"><b>Status:</b> {dados.infos.status}</span>
                {dados.infos.anotacoes && <span className="d-block"><b>Anotações:</b> {dados.infos.anotacoes}</span>}
            </div>
            <div className="col mb-2">
                <span className="d-block"><b>ID:</b> #{dados.id}</span>
                {dados.infos.contato && <span className="d-block"><b>Meio de Contato:</b> {dados.infos.contato}</span>}
                {dados.infos.status_anotacoes && <span className="d-block"><b>Observações:</b> {dados.infos.status_anotacoes}</span>}
                <span className="d-block"><b>Data de Contato:</b> {dados.infos.status_data}</span>
                <span className="d-block"><b>Data de Cadastro:</b> {dados.infos.data_criacao}</span>
            </div>
        </div>
    </>)
}

export default function LeadsDados({dados}) {
    return (<>
        <div className="row">
            <div className="col mb-2">
                <span className="d-block"><b>Nome:</b> {dados.cliente.nome ?? dados.cliente.razao_social}</span>
                <span className="d-block"><b>ID:</b> #{dados.id}</span>
                <span className="d-block"><b>Status:</b> {dados.infos.status_nome}</span>
                <span className="d-block"><b>Setor:</b> {dados?.infos?.setor?.nome}</span>
                {dados.cliente.cnpj && <span className="d-block"><b>CNPJ:</b> {dados.cliente.cnpj}</span>}
                {dados.cliente.rg && <span className="d-block"><b>RG:</b> {dados.cliente.rg}</span>}
                {dados.cliente.cpf && <span className="d-block"><b>CPF:</b> {dados.cliente.cpf}</span>}
                {!dados?.contato?.telefones?.length > 0 &&
                    <span className="d-block"><b>Telefone:</b> {dados.contato.telefone}</span>}
                {dados?.contato?.telefones?.length > 0 && <span
                    className="d-block"><b>Telefones:</b> {dados.contato.telefones.map(item => item + ', ')}</span>}
                {dados.contato.email && <span className="d-block"><b>Email:</b> {dados.contato.email}</span>}
                {dados.contato.atendente &&
                    <span className="d-block"><b>Atendente:</b> {dados.contato.atendente}</span>}
                {!dados.cliente.endereco && (dados.cliente.cidade || dados.cliente.estado) && <span
                    className="d-block"><b>Cidade/Estado:</b> {dados.cliente.cidade} / {dados.cliente.estado}</span>}
                {dados.cliente.endereco && <span className="d-block"><b>Endereço:</b> {dados.cliente.endereco}</span>}

                {dados.infos.anotacoes && <span className="d-block"><b>Anotações:</b> {dados.infos.anotacoes}</span>}
            </div>
            <div className="col mb-2">
                {dados.dados.capital_social &&
                    <span className="d-block"><b>Capital Social:</b> {dados.dados.capital_social}</span>}
                {dados.dados.tipo && <span className="d-block"><b>Tipo:</b> {dados.dados.tipo}</span>}
                {dados.dados.porte && <span className="d-block"><b>Porte:</b> {dados.dados.porte}</span>}
                {dados.dados.atividade_principal &&
                    <span className="d-block"><b>Atividade Principal:</b> {dados.dados.atividade_principal}</span>}
                {dados.dados.natureza_juridica &&
                    <span className="d-block"><b>Natureza Jurídica:</b> {dados.dados.natureza_juridica}</span>}
                {dados.dados.quadro_societario &&
                    <span className="d-block"><b>Quadro Societário:</b> {dados.dados.quadro_societario}</span>}
                {dados.dados.data_situacao &&
                    <span className="d-block"><b>Data Situação:</b> {dados.dados.data_situacao}</span>}
                {dados.dados.data_abertura &&
                    <span className="d-block"><b>Data Abertura:</b> {dados.dados.data_abertura}</span>}

                {dados.infos.contato && <span className="d-block"><b>Meio de Contato:</b> {dados.infos.contato}</span>}
                {dados.infos.status_anotacoes &&
                    <span className="d-block"><b>Observações:</b> {dados.infos.status_anotacoes}</span>}
                {/*<small className="d-block"><b>Data de Contato:</b> {dados.infos.status_data}</small>*/}
                <small className="d-block"><b>Data de Cadastro:</b> {dados.infos.data_criacao}</small>
            </div>
        </div>
    </>)
}

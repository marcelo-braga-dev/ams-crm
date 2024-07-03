import {Stack, Typography} from "@mui/material";
import Switch from "@/Components/Inputs/Switch";

export default function LeadsDados({dados}) {
    return (<>
        <div className="row">
            <div className="col"><Typography variant="h5"><b>Nome/Nome Fantasia:</b> {dados.cliente.nome}</Typography></div>
            {dados.cliente.razao_social && <div className="col"><Typography variant="h5"><b>Razão Social:</b> {dados.cliente.razao_social}</Typography></div>}
        </div>

        <div className="row my-2 ">
            <div className="col">
                <Stack spacing={1}>
                    <Typography><b>ID:</b> #{dados.id}</Typography>
                    <Typography><b>Status:</b> {dados.infos.status_nome}</Typography>
                    <Typography><b>Setor:</b> {dados?.infos?.setor?.nome}</Typography>
                    {dados.cliente.cnpj && <Typography><b>CNPJ:</b> {dados.cliente.cnpj}</Typography>}
                    {dados.cliente.rg && <Typography><b>RG:</b> {dados.cliente.rg}</Typography>}
                    {dados.cliente.cpf && <Typography><b>CPF:</b> {dados.cliente.cpf}</Typography>}
                    {!dados.cliente.endereco && (dados.cliente.cidade || dados.cliente.estado) &&
                        <Typography><b>Cidade/Estado:</b> {dados.cliente.cidade} / {dados.cliente.estado}</Typography>}
                    {dados.infos.anotacoes && <Typography><b>Anotações:</b> {dados.infos.anotacoes}</Typography>}
                    {dados.cliente.endereco && <Typography><b>Endereço:</b> {dados.cliente.endereco}</Typography>}
                </Stack>
            </div>
            <div className="col">
                <Stack spacing={1}>
                    {dados.contato.telefone && <Typography><b>Telefone:</b> {dados.contato.telefone}</Typography>}

                    {dados.contato.email && <Typography><b>Email:</b> {dados.contato.email}</Typography>}
                    {dados.contato.atendente &&
                        <Typography><b>Nome do Contato:</b> {dados.contato.atendente}</Typography>}
                    {dados.dados.capital_social &&
                        <Typography><b>Capital Social:</b> {dados.dados.capital_social}</Typography>}
                    {dados.dados.tipo && <Typography><b>Tipo:</b> {dados.dados.tipo}</Typography>}
                    {dados.dados.porte && <Typography><b>Porte:</b> {dados.dados.porte}</Typography>}
                    {dados.dados.atividade_principal &&
                        <Typography><b>Atividade Principal:</b> {dados.dados.atividade_principal}</Typography>}
                    {dados.dados.natureza_juridica &&
                        <Typography><b>Natureza Jurídica:</b> {dados.dados.natureza_juridica}</Typography>}
                    {dados.dados.quadro_societario &&
                        <Typography><b>Quadro Societário:</b> {dados.dados.quadro_societario}</Typography>}
                    {dados.dados.data_situacao &&
                        <Typography><b>Data Situação:</b> {dados.dados.data_situacao}</Typography>}
                    {dados.dados.data_abertura &&
                        <Typography><b>Data Abertura:</b> {dados.dados.data_abertura}</Typography>}
                    {dados.infos.contato && <Typography><b>Meio de Contato:</b> {dados.infos.contato}</Typography>}
                    {dados.infos.status_anotacoes &&
                        <Typography><b>Observações:</b> {dados.infos.status_anotacoes}</Typography>}
                    <small><b>Data de Cadastro:</b> {dados.infos.data_criacao}</small>
                </Stack>
            </div>
        </div>
        <Stack direction="row" spacing={2}>
            <Typography><b>Telefones:</b></Typography>
            {dados?.contato?.telefone && <Typography><b>Telefone:</b> {dados.contato.telefone}</Typography>}
            {dados?.contato?.telefones && dados?.contato?.telefones.map(item => dados.contato.telefone !== item &&
                <div key={item} className="p-2 px-3 border border-radius-lg">
                    {/*<Stack direction="row" spacing={1}><Switch size="small" style={{marginTop: 3}}/>*/}
                    <Typography display="inline" marginBottom={1}>{item}</Typography>
                    {/*</Stack>*/}
                </div>
            )}
        </Stack>
    </>)
}

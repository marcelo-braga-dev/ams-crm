import Typography from "@mui/material/Typography";
import {Person} from "react-bootstrap-icons";
import CardTitleDefault from "@/Components/Cards/CardTitleDefault";
import {Link, Stack} from "@mui/material";
import CampoTexto from "@/Components/CampoTexto.jsx";
import {TbMapPin} from "react-icons/tb";
import * as React from "react";

export default function DadosPedidoCliente({dados}) {
    return (<>
        <CardTitleDefault title="Informações do Cliente" icon={<Person size={22}/>}/>
        {dados.cliente.nome && <div className="mb-2"><CampoTexto titulo="Cliente" texto={dados.cliente.nome}/></div>}
        <div className="row row-cols-3">
            {dados.cliente.cpf && <div className="col mb-2"><CampoTexto titulo="CPF" texto={dados.cliente.cpf}/></div>}
            {dados.cliente.rg && <div className="col mb-2"><CampoTexto titulo="RG" texto={dados.cliente.rg}/></div>}
            {dados.cliente.cnpj && <div className="col mb-2"><CampoTexto titulo="CNPJ" texto={dados.cliente.cnpj}/></div>}
            {dados.cliente.inscricao_estadual && <div className="col mb-2"><CampoTexto titulo="IE" texto={dados.cliente.inscricao_estadual}/></div>}
            {dados.cliente.nascimento && <div className="col mb-2"><CampoTexto titulo="Data Nascimento" texto={dados.cliente.nascimento}/></div>}
            {dados.cliente.telefone && <div className="col mb-2"><CampoTexto titulo="Telefone" texto={dados.cliente.telefone}/></div>}
            {dados.cliente.email && <div className="col mb-2"><CampoTexto titulo="Email" texto={dados.cliente.email}/></div>}
        </div>

        {dados.cliente.endereco && (
            <Stack direction="row" spacing={1} alignItems="center">
                <CampoTexto titulo="Endereço" texto={dados.cliente.endereco}/>
                <Link target="_blank" sx={{paddingBottom: 1}}
                      href={`https://www.google.com.br/maps/search/${encodeURIComponent(dados.cliente.endereco_padrao)}`}>
                    <TbMapPin color="red" size={22}/>
                </Link>
            </Stack>
        )}
    </>)
}

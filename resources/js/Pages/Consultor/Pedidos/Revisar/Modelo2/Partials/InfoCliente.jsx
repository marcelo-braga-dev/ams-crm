import {Col} from "reactstrap";
import {FormControl, MenuItem, Radio, RadioGroup, TextField} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import pesquisaCep from '@/Helpers/pesquisaCep';

import maskJquery from "@/Helpers/maskJquery";
import * as React from "react";

export default function InfoCliente({dados}) {

    maskJquery()

    return (
        <div className="row">
            <div className="col">
                <span className="d-block"><b>Nome: </b>{dados.nome}</span>
                <span className="d-block"><b>Data de Nascimento: </b>{dados.data_nascimento}</span>
                <span className="d-block"><b>RG: </b>{dados.rg}</span>
                <span className="d-block"><b>CPF: </b>{dados.cpf}</span>
                <span className="d-block"><b>CNPJ: </b>{dados.cnpj}</span>
                <span className="d-block"><b>Inscrição Estadual: </b>{dados.inscricao_estadual}</span>
                <span className="d-block"><b>Telefone: </b>{dados.telefone}</span>
                <span className="d-block"><b>Email: </b>{dados.email}</span>
                <span className="d-block"><b>Endereço: </b>{dados.endereco}</span>
            </div>
        </div>
    )
}

import Layout from "@/Layouts/Layout";
import {TextField} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import Tabela from "./Tabela";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";

export default function Index({fornecedores, isFinanceiro}) {

    const [fornecedorSel, setFornecedorSel] = useState()



    return (
        <Layout titlePage="Produtos Cadastrados" menu="produtos" submenu="produtos-cadastrados">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-md-3">
                            <TextField label="Distribuidora" select fullWidth onChange={e => setFornecedorSel(e.target.value)}>
                                <MenuItem value="">Todos</MenuItem>
                                {fornecedores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <Tabela isFinanceiro={isFinanceiro} fornecedorSel={fornecedorSel}/>

        </Layout>
    )
}

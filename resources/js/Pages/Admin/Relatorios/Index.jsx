import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import {useState} from "react";
import GridOnIcon from "@mui/icons-material/GridOn";
import * as React from "react";

export default function () {
    const [dataInicio, setDataInicio] = useState()
    const [dataFim, setDataFim] = useState()
    const [urlPlanilha, setUrlPlanilha] = useState()

    const getDados = (e) => {
        e.preventDefault()
        axios.post(route('admin.pedidos.gerar-planilha-pedidos'), {
            dataInicio: dataInicio, dataFim: dataFim
        }).then(res => setUrlPlanilha(res.data))
    }

    return (
        <Layout titlePage="Relatório de Pedidos" menu="relatorios" submenu="relatorios-vendas">
            Período
            <form onSubmit={getDados}>
                <div className="row">
                    <div className="col-auto">
                        <TextField type="date" required
                                   onChange={e => setDataInicio(e.target.value)}/>
                    </div>
                    <div className="col-auto">
                        <TextField type="date" required
                                   onChange={e => setDataFim(e.target.value)}/>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary" type="submit">Filtrar</button>
                    </div>
                </div>
            </form>
            <div className="row mt-4">
                <div className="col">
                    {urlPlanilha && <a className="btn btn-success btn-sm" href={urlPlanilha}>
                        <GridOnIcon fontSize="small"/> Baixar Planilha
                    </a>}
                </div>
            </div>
            <div className="row">
                <div className="col">

                </div>
            </div>
        </Layout>
    )
}

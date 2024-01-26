import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import {useState} from "react";
import GridOnIcon from "@mui/icons-material/GridOn";
import * as React from "react";
import LinearProgress from '@mui/material/LinearProgress';

export default function () {
    const [dataInicio, setDataInicio] = useState()
    const [dataFim, setDataFim] = useState()
    const [urlPlanilha, setUrlPlanilha] = useState()
    const [pedidos, setPedidos] = useState([])
    const [progress, setProgress] = useState(false)

    const getDados = (e) => {
        e.preventDefault()
        setProgress(e => !e)
        axios.post(route('admin.pedidos.gerar-planilha-pedidos'), {
            dataInicio: dataInicio, dataFim: dataFim
        }).then(res => {
            setUrlPlanilha(res.data.url)
            setPedidos(res.data.pedidos)
            setProgress(e => !e)
        })
    }

    return (
        <Layout titlePage="Relatório de Pedidos" menu="relatorios" submenu="relatorios-vendas">
            Período
            <form onSubmit={getDados}>
                <div className="row">
                    <div className="col-md-3">
                        <TextField type="date" required fullWidth
                                   onChange={e => setDataInicio(e.target.value)}/>
                    </div>
                    <div className="col-md-3">
                        <TextField type="date" required fullWidth
                                   onChange={e => setDataFim(e.target.value)}/>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary" type="submit">Filtrar</button>
                    </div>
                </div>
            </form>
            {progress && <LinearProgress/>}
            <div className="row mt-4">
                <div className="col">
                    {urlPlanilha && <a className="btn btn-success btn-sm" href={urlPlanilha}>
                        <GridOnIcon fontSize="small"/> Baixar Planilha
                    </a>}
                </div>
            </div>
            {pedidos.length > 0 &&
                <div className="row">
                    <div className="col">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>ID PEDIDO</th>
                                    <th>CLIENTE</th>
                                    <th>PRODUTO</th>
                                    <th>UND</th>
                                    <th>QTD</th>
                                    <th>PREÇO UND</th>
                                    <th>TOTAL</th>
                                    <th>DATA</th>
                                </tr>
                                </thead>
                                <tbody>
                                {pedidos.map(item => {
                                    return (
                                        <tr key={item.id + item.produto} className="text-center">
                                            <td>{item.id}</td>
                                            <td className="text-start">
                                                <span className="d-block"><b>{item.nome}</b></span>
                                                {item.telefone && <span className="d-block">{item.telefone}</span>}
                                                {item.localidade && <span className="d-block">{item.localidade}</span>}
                                            </td>
                                            <td className="text-start">{item.produto}</td>
                                            <td>{item.und}</td>
                                            <td>{item.qtd}</td>
                                            <td>{item.preco}</td>
                                            <td>{item.total}</td>
                                            <td>{item.data}</td>
                                        </tr>
                                    )
                                })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
        </Layout>
    )
}

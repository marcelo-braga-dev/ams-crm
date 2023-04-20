import Layout from "@/Layouts/Admin/Layout";
import "chart.js/auto";
import MetaVendas from "./Graficos/MetaVendas";


export default function ({metaVendas, pedidos}) {
    return (
        <Layout container titlePage="Indicadores de Vendas" menu="dashboard" submenu="vendas">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <h6>Meta x Vendas</h6>
                        <MetaVendas dados={metaVendas}/>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-sm text-sm">
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Meta</th>
                                <th>Venda</th>
                                <th>Margem</th>
                                <th>Venda p/ Meta</th>
                            </tr>
                            </thead>
                            <tbody>
                            {metaVendas.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.nome}</td>
                                        <td>R$ {item.meta_money}</td>
                                        <td>R$ {item.vendas_money}</td>
                                        <td>{item.margem_money}%</td>
                                        <td>R$ {item.diferenca_meta_money}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="card mt-4">
                <div className="card-body">
                    <div className="row">
                        {/*<h6>Meta x Vendas</h6>*/}
                        {/*<MetaVendas dados={metaVendas}/>*/}
                    </div>
                </div>
            </div>


        </Layout>
    )
}

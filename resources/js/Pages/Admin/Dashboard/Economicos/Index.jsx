import Layout from "@/Layouts/Layout";
import "chart.js/auto";
import Lucro from "./Graficos/Lucro";
import LucroPie from "@/Pages/Admin/Dashboard/Economicos/Graficos/LucroPie";
import {router} from "@inertiajs/react";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function ({lucros, ano}) {

    function filtrar(anoSelecionado) {
        router.get(route('admin.dashboard.economicos.index'), {ano: anoSelecionado})
    }

    return (
        <Layout container titlePage="Indicadores Econômicos" menu="dashboard" submenu="dashboard-economico">
            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col-2">
                        <TextField label="Ano" select fullWidth defaultValue={ano}
                                   onChange={e => filtrar(e.target.value)}>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                        </TextField>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <h6>Lucros</h6>
                        <Lucro dados={lucros}/>
                    </div>
                </div>
            </div>
            <div className="row row-cols-2 mt-4">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6>Margem de Lucro</h6>
                            <LucroPie dados={lucros}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mt-4">
                <div className="card-body">
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-sm">
                                <thead>
                                <tr>
                                    <th className="text-center">Mês</th>
                                    <th>Vendas</th>
                                    <th>Custos</th>
                                    <th>Lucro</th>
                                    <th>% Lucro</th>
                                    <th>Cresc.</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="text-center">JAN</td>
                                    <td>R$ {lucros[1]?.vendas_money}</td>
                                    <td>R$ {lucros[1]?.custo_money}</td>
                                    <td>R$ {lucros[1]?.lucro_money}</td>
                                    <td>{lucros[1]?.margem_vendas_lucro_money}%</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td className="text-center">FEV</td>
                                    <td>R$ {lucros[2]?.vendas_money}</td>
                                    <td>R$ {lucros[2]?.custo_money}</td>
                                    <td>R$ {lucros[2]?.lucro_money}</td>
                                    <td>{lucros[2]?.margem_vendas_lucro_money}%</td>
                                    <td>{lucros[2]?.crescimento_margem_money}%</td>
                                </tr>
                                <tr>
                                    <td className="text-center">MAR</td>
                                    <td>R$ {lucros[3]?.vendas_money}</td>
                                    <td>R$ {lucros[3]?.custo_money}</td>
                                    <td>R$ {lucros[3]?.lucro_money}</td>
                                    <td>{lucros[3]?.margem_vendas_lucro_money}%</td>
                                    <td>{lucros[3]?.crescimento_margem_money}%</td>
                                </tr>
                                <tr>
                                    <td className="text-center">ABR</td>
                                    <td>R$ {lucros[4]?.vendas_money}</td>
                                    <td>R$ {lucros[4]?.custo_money}</td>
                                    <td>R$ {lucros[4]?.lucro_money}</td>
                                    <td>{lucros[4]?.margem_vendas_lucro_money}%</td>
                                    <td>{lucros[4]?.crescimento_margem_money}%</td>
                                </tr>
                                <tr>
                                    <td className="text-center">MAI</td>
                                    <td>R$ {lucros[5]?.vendas_money}</td>
                                    <td>R$ {lucros[5]?.custo_money}</td>
                                    <td>R$ {lucros[5]?.lucro_money}</td>
                                    <td>{lucros[5]?.margem_vendas_lucro_money}%</td>
                                    <td>{lucros[5]?.crescimento_margem_money}%</td>
                                </tr>
                                <tr>
                                    <td className="text-center">JUN</td>
                                    <td>R$ {lucros[6]?.vendas_money}</td>
                                    <td>R$ {lucros[6]?.custo_money}</td>
                                    <td>R$ {lucros[6]?.lucro_money}</td>
                                    <td>{lucros[6]?.margem_vendas_lucro_money}%</td>
                                    <td>{lucros[6]?.crescimento_margem_money}%</td>
                                </tr>
                                <tr>
                                    <td className="text-center">JUL</td>
                                    <td>R$ {lucros[7]?.vendas_money}</td>
                                    <td>R$ {lucros[7]?.custo_money}</td>
                                    <td>R$ {lucros[7]?.lucro_money}</td>
                                    <td>{lucros[7]?.margem_vendas_lucro_money}%</td>
                                    <td>{lucros[7]?.crescimento_margem_money}%</td>
                                </tr>
                                <tr>
                                    <td className="text-center">AGO</td>
                                    <td>R$ {lucros[8]?.vendas_money}</td>
                                    <td>R$ {lucros[8]?.custo_money}</td>
                                    <td>R$ {lucros[8]?.lucro_money}</td>
                                    <td>{lucros[8]?.margem_vendas_lucro_money}%</td>
                                    <td>{lucros[8]?.crescimento_margem_money}%</td>
                                </tr>
                                <tr>
                                    <td className="text-center">SET</td>
                                    <td>R$ {lucros[9]?.vendas_money}</td>
                                    <td>R$ {lucros[9]?.custo_money}</td>
                                    <td>R$ {lucros[9]?.lucro_money}</td>
                                    <td>{lucros[9]?.margem_vendas_lucro_money}%</td>
                                    <td>{lucros[9]?.crescimento_margem_money}%</td>
                                </tr>
                                <tr>
                                    <td className="text-center">OUT</td>
                                    <td>R$ {lucros[10]?.vendas_money}</td>
                                    <td>R$ {lucros[10]?.custo_money}</td>
                                    <td>R$ {lucros[10]?.lucro_money}</td>
                                    <td>{lucros[10]?.margem_vendas_lucro_money}%</td>
                                    <td>{lucros[10]?.crescimento_margem_money}%</td>
                                </tr>
                                <tr>
                                    <td className="text-center">NOV</td>
                                    <td>R$ {lucros[11]?.vendas_money}</td>
                                    <td>R$ {lucros[11]?.custo_money}</td>
                                    <td>R$ {lucros[11]?.lucro_money}</td>
                                    <td>{lucros[11]?.margem_vendas_lucro_money}%</td>
                                    <td>{lucros[11]?.crescimento_margem_money}%</td>
                                </tr>
                                <tr>
                                    <td className="text-center">DEZ</td>
                                    <td>R$ {lucros[12]?.vendas_money}</td>
                                    <td>R$ {lucros[12]?.custo_money}</td>
                                    <td>R$ {lucros[12]?.lucro_money}</td>
                                    <td>{lucros[12]?.margem_vendas_lucro_money}%</td>
                                    <td>{lucros[12]?.crescimento_margem_money}%</td>
                                </tr>
                                <tr className="font-weight-bold">
                                    <td className="text-center">Total</td>
                                    <td>R$ {lucros?.vendas_total}</td>
                                    <td>R$ {lucros?.custo_total}</td>
                                    <td>R$ {lucros?.lucro_total}</td>
                                    <td>{lucros?.margem_lucro_total}%</td>
                                    <td>{lucros?.crescimento_total}%</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

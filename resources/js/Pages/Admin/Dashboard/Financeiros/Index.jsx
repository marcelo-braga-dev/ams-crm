import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import "chart.js/auto";
import Faturamento from "./Graficos/Faturamento";
import Prazos from "./Graficos/Prazos";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {router} from "@inertiajs/react";

export default function ({faturamento, prazos, ano}) {
    function filtrar(anoSelecionado) {
        router.get(route('admin.dashboard.financeiros.index'), {ano: anoSelecionado})
    }

    return (
        <Layout container titlePage="Indicadores Financeiros" menu="dashboard" submenu="dashboard-financeiro">
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
                    <h6>Faturamento</h6>
                    <Faturamento dados={faturamento}/>
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-body">
                    <h6>Prazos Médios Pagamentos <br/><small>(Faturando p/ Faturado)</small></h6>
                    <Prazos dados={prazos}/>
                </div>
            </div>
        </Layout>
    )
}

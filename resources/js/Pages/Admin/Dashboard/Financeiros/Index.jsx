import Layout from "@/Layouts/Admin/Layout";
import "chart.js/auto";
import Faturamento from "./Graficos/Faturamento";
import Prazos from "./Graficos/Prazos";

export default function ({faturamento, prazos}) {
    return (
        <Layout container titlePage="Indicadores Financeiros" menu="dashboard" submenu="financeiros">
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

import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import "chart.js/auto";
import TempoOnlineDiasUsuarios from "./Graficos/TempoOnlineDiasUsuarios";

export default function ({tempoOnline}) {
    return (
        <Layout>
            <TempoOnlineDiasUsuarios dados={tempoOnline} />
        </Layout>
    )
}

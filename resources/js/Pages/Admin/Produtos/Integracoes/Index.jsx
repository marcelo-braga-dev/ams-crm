import Layout from "@/Layouts/Layout";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTable from "@/Components/Cards/CardTable";
import Link from "@/Components/Link";

export default function () {
    return (
        <Layout titlePage="Integrações com Distribuidoras" menu="produtos" submenu="produtos-integracoes">
            <CardContainer>
                <CardTable title="Histórico de Integrações" btn={<Link label="Iniciar Integração" href={route('admin.produtos.integrar')}/>}>
                    <table className="table-1">
                        <thead>
                        <tr>
                            <th>Data</th>
                            <th>Distribuidora</th>
                            <th>Status</th>
                            <th>Qtd</th>
                        </tr>
                        </thead>
                    </table>
                </CardTable>
            </CardContainer>
        </Layout>
    )
}

import Layout from "@/Layouts/Layout";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTable from "@/Components/Cards/CardTable";

export default function ({produtos}) {
    return (
        <Layout titlePage="Estoques" menu="produtos" submenu="produtos-estoques">
            <CardContainer>
                <CardBody>

                </CardBody>
                <CardTable>
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                    </table>
                </CardTable>
            </CardContainer>
        </Layout>
    )
}

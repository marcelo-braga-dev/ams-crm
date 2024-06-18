import Layout from "@/Layouts/Layout";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTable from "@/Components/Cards/CardTable";
import CardTitle from "@/Components/Cards/CardTitle";

export default function Create({fornecedores, setores, setorAtual}) {

    return (
        <Layout titlePage="Produtos por Fornecedores" menu="produtos" submenu="produtos-fornecedores">

            <CardContainer>
                <CardTitle title="Fornecedores">
                    {/*<a className="btn btn-primary" href={route('admin.produtos-fornecedores.create')}>Cadastrar</a>*/}
                </CardTitle>
                <CardTable>
                    <table className="table-1">
                        <thead>
                        <tr>
                            <th>Fornecedor</th>
                            <th>CNPJ</th>
                            <th>Setor</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {fornecedores.map((dados) => {
                            return (
                                <tr key={dados.id}>
                                    <td>
                                        {dados.nome}
                                    </td>
                                    <td>
                                        {dados.cnpj}
                                    </td>
                                    <td>
                                        {dados.setor_nome}
                                    </td>
                                    <td className="text-right">
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </CardTable>
            </CardContainer>

        </Layout>
    )
}

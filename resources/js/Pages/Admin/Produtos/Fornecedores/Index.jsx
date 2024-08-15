import Layout from "@/Layouts/Layout";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTable from "@/Components/Cards/CardTable";
import CardTitle from "@/Components/Cards/CardTitle";
import Link from "@/Components/Link";
import {Eye, Truck} from "react-bootstrap-icons";
import {router} from "@inertiajs/react";

export default function Create({fornecedores}) {

    return (
        <Layout titlePage="Distribuidoras" menu="produtos" submenu="produtos-fornecedores">
            <CardContainer>
                <CardTable icon={<Truck size="22"/>} title="Fornecedores" btn={<Link label="Cadastrar" href={route('admin.produtos.fornecedores.create')}/>}>
                    <table className="table-1 table-hover cursor-pointer">
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
                                <tr key={dados.id} onClick={() => router.get(route('admin.produtos.fornecedores.show', dados.id))}>
                                    <td>
                                        {dados.nome}
                                    </td>
                                    <td>
                                        {dados.cnpj}
                                    </td>
                                    <td>
                                        {dados.setor_nome}
                                    </td>
                                    <td className="text-center">
                                        <Eye size="22"/>
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

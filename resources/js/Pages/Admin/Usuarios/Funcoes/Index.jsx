import Layout from "@/Layouts/Layout";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTable from "@/Components/Cards/CardTable";
import CardBody from "@/Components/Cards/CardBody";
import Link from "@/Components/Link";

export default function ({funcoes}) {
    return (
        <Layout titlePage="Funções de Usuários" menu="usuarios" submenu="usuarios-funcoes">
            <CardContainer>
                <CardTable title="Funções Cadastradas" btn={<Link label="Cadastrar Nova Função" href={route('admin.usuarios.funcoes.create')}/>}>
                    <table className="table-1">
                        <thead>
                        <tr>
                            <th>Nome</th>
                            <th className="text-center">Qtd</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {funcoes.map((item => (
                            <tr key={item.id}>
                                <td>{item.nome}</td>
                                <td className="text-center">{item.qtd}</td>
                                <td>
                                    <a className="mb-0 btn btn-primary btn-sm"
                                       href={route('admin.usuarios.funcoes.edit', item.id)}>Ver</a>
                                </td>
                            </tr>
                        )))}
                        </tbody>
                    </table>
                </CardTable>
            </CardContainer>

        </Layout>
    )
}

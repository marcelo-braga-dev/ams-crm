import Layout from "@/Layouts/Layout";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTable from "@/Components/Cards/CardTable";
import {Eye} from "react-bootstrap-icons";
import Link from "@/Components/Link";

export default function ({dados}) {
    return (
        <Layout container titlePage="Setores" menu="config" submenu="config-setores">
            <CardContainer>
                <CardTable title="Setores Cadastrados" btn={<Link label="Cadastrar Setor" href={route('admin.config.categorias.create')}/>}>
                    <table className="table-1">
                        <thead>
                        <tr>
                            <th>Setor</th>
                            <th>Franquia</th>
                            <th>Cor</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {dados.map((dado, index) => {
                            return (
                                <tr key={index}>
                                    <td>{dado.nome}</td>
                                    <td>{dado.franquia}</td>
                                    <td>
                                        <span className="badge rounded-circle p-2" style={{backgroundColor: dado.cor}}> </span>
                                    </td>
                                    <td>
                                        <Link href={route('admin.config.categorias.show', dado.id)} icon={<Eye size={22}/>}/>
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

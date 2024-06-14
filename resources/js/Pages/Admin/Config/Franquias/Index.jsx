import Layout from "@/Layouts/Layout";
import Color from "@/Components/Elementos/Color";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTable from "@/Components/Cards/CardTable";
import CardTitle from "@/Components/Cards/CardTitle";

export default function ({franquias}) {
    return (
        <Layout container titlePage="Franquias" menu="config" submenu="config-franquias">
            <CardContainer>
                <CardTitle title={<a href={route('admin.franquias.create')} className="btn btn-primary">Cadastrar Franquia</a>}/>
                <CardTable>
                    <table className="table-1">
                        <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cor</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {franquias.map((dado, index) => {
                            return (
                                <tr key={index}>
                                    <td>{dado.nome}</td>
                                    <td><Color valor={dado.cor}/></td>
                                    <td>
                                        <a href={route('admin.franquias.show', dado.id)}
                                           className="btn btn-primary btn-sm">Ver</a>
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

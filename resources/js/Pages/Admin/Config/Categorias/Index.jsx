import Layout from "@/Layouts/Layout";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTable from "@/Components/Cards/CardTable";
import {Eye, Trash} from "react-bootstrap-icons";
import Link from "@/Components/Link";
import {Stack} from "@mui/material";
import {router} from "@inertiajs/react";
import {useState} from "react";

export default function ({dados}) {
    const [idExcluir, setIdExcluir] = useState()
    const excluirFatch = (id) => {
        router.post(route('admin.config.categorias.destroy', idExcluir), {_method: 'DELETE'})
    }

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
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Link href={route('admin.config.categorias.show', dado.id)} icon={<Eye size={22}/>}/>
                                            <Trash size={18} cursor="pointer" color="red" onClick={() => setIdExcluir(dado.id)}
                                                   data-bs-toggle="modal" data-bs-target="#exampleModal"/>
                                        </Stack>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </CardTable>
            </CardContainer>

            <div className="modal fade mt-6" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Setor</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja realmente excluir esta setor?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => excluirFatch()}>Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

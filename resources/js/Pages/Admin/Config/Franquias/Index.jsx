import Layout from "@/Layouts/Layout";
import Color from "@/Components/Elementos/Color";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTable from "@/Components/Cards/CardTable";
import Link from "@/Components/Link.jsx";
import {Eye, Trash} from "react-bootstrap-icons";
import {router} from "@inertiajs/react";
import {Stack} from "@mui/material";
import {useState} from "react";

export default function ({franquias}) {
    const [idExcluir, setIdExcluir] = useState()
    const excluirFatch = () => {
        router.post(route('admin.franquias.destroy', idExcluir), {_method: 'DELETE'})
    }

    return (
        <Layout container titlePage="Franquias" menu="config" submenu="config-franquias">
            <CardContainer>
                <CardTable title="Franquias" btn={<Link href={route('admin.franquias.create')} label="Cadastrar Franquia"/>}>
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
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Link icon={<Eye size={22}/>} href={route('admin.franquias.show', dado.id)}/>
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
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Franquia</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja realmente excluir esta franquia?
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

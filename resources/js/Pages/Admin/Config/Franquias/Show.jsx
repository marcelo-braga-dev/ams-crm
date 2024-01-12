import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import Color from "@/Components/Elementos/Color";
import {Avatar, Card} from "@mui/material";
import * as React from "react";

export default function ({franquia, usuarios}) {
    return (
        <Layout container titlePage="Informações da Franquia" voltar={route('admin.franquias.index')}
                menu="config" submenu="config-franquias">
            <Card className="p-3 mb-4">
                <div className="row justify-content-between">
                    <div className="col mb-4">
                        <span className="d-block"><b>Nome da Franquia:</b> {franquia.nome}</span>
                        <span className="d-block"><b>ID:</b> #{franquia.id}</span>
                        <span className="d-block"><b>Cor:</b> <Color valor={franquia.cor}/></span>
                    </div>
                    <div className="col-auto">
                        <a href={route('admin.franquias.edit', franquia.id)} className="btn btn-primary">Editar</a>
                    </div>
                </div>
            </Card>
            <Card className="p-3">
                <h6>Usuários</h6>
                <table className="w-100">
                    <thead>
                    <tr>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="">
                            {usuarios.map((item, index) => {
                                return (
                                    <div className="row mb-2 pb-2 border-bottom">
                                        <div className="col-auto">
                                            <Avatar src={item.foto} sx={{width: 50, height: 50}}/>
                                        </div>
                                        <div className="col">
                                            <b>{item.nome}</b><br/>
                                            Setor: {item.setor}<br/>
                                            Função: {item.funcao}<br/>
                                        </div>
                                    </div>
                                )
                            })}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Card>
        </Layout>
    )
}

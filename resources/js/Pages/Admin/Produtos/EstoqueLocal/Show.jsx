import Layout from "@/Layouts/Layout";
import React, {useState} from "react";
import {TextField} from "@mui/material";
import {router} from "@inertiajs/react";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export default function ({produtos, fornecedor}) {
    const [qtd, setQtd] = useState()
    const [idAtualizar, setIdAtualizar] = useState()

    function valor(id, valor) {
        setIdAtualizar(id)
        setQtd(valor)
    }

    function atualizar() {
        router.post(route('admin.estoque-local.update', idAtualizar), {
            _method: 'put',
            valor: qtd
        }, {
            preserveScroll: true,
        })
        setIdAtualizar(null)
    }

    function reload() {
        window.location.reload()
    }

    return (
        <Layout container titlePage="Estoque Local" menu="produtos" submenu="produtos-estoques-local"
                voltar={route('admin.estoque-local.index')}>

            <div className="row justify-content-between mb-3 px-4">
                <div className="col-auto">
                    <span>Fornecedor:</span>
                    <h5>{fornecedor.nome}</h5>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table text-center">
                    <thead>
                    <tr>
                        <th></th>
                        <th className="text-start">Produto</th>
                        <th>Unidade</th>
                        <th className="text-center">Qtd. Estoque</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {produtos.map((dado, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {dado.foto && <img src={dado.foto} width="80" alt="foto"/>}
                                </td>
                                <td className="text-start text-wrap">
                                    <h6>{dado.nome}</h6>
                                    ID: #{dado.id}
                                </td>
                                <td>{dado.unidade}</td>
                                <td>
                                    <TextField size="small" type="number" style={{width: '5rem'}}
                                               disabled={idAtualizar && (idAtualizar !== dado.id)}
                                               defaultValue={dado.estoque}
                                               onChange={e => valor(dado.id, e.target.value)}/>

                                </td>
                                <td className="col-2">
                                    {(idAtualizar === dado.id) && (<>
                                        <button className="btn btn-success btn-sm px-2 mx-2"
                                                onClick={() => atualizar()}>Salvar
                                        </button>
                                        <button className="btn btn-link btn-sm text-dark px-0 mx-2"
                                                onClick={() => reload()}>
                                            <CloseOutlinedIcon/>
                                        </button>
                                    </>)}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

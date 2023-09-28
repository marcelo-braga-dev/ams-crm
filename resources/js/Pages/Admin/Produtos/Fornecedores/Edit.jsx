import Layout from "@/Layouts/Admin/Layout";
import TextField from "@mui/material/TextField";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import {router, useForm} from "@inertiajs/react";
import React from "react";
import ImagePdf from "@/Components/Inputs/ImagePdf";

export default function ({produto, fornecedor}) {
    const {data, setData, post} = useForm({
        fornecedor: fornecedor.id,
        nome: produto.nome,
        preco_venda: produto.preco_venda,
        preco_fornecedor: produto.preco_fornecedor,
        unidade: produto.unidade,
        url_foto: produto.foto,
    })

    function onSubmit(e) {
        e.preventDefault()
        router.post(route('admin.produtos-fornecedores.update', produto.id), {
            _method: 'put',...data
        })
    }

    return (
        <Layout titlePage="Editar Produto" container menu="produtos" submenu="todos-produtos"
                voltar={route('admin.produtos-fornecedores.show', fornecedor.id)}>
            <div className="row justify-content-between mb-4">
                <div className="col-auto">
                    <h6>Fornecedor: {fornecedor.nome}</h6>
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col mb-4">
                        <TextField label="Nome" fullWidth required defaultValue={data.nome}
                                   onChange={e => setData('nome', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-4">
                        <TextFieldMoney label="Preço Venda" value={data.preco_venda} setData={setData}
                                        index="preco_venda"
                                        required/>
                    </div>
                    <div className="col mb-4">
                        <TextFieldMoney label="Preço do Fornecedor" value={data.preco_fornecedor} setData={setData}
                                        index="preco_fornecedor" />
                    </div>
                    <div className="col mb-4">
                        <TextField label="Unidade" fullWidth required defaultValue={data.unidade}
                                   onChange={e => setData('unidade', e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-auto">
                        <ImagePdf url={data.url_foto} />
                    </div>
                    <div className="col-md-6">
                        <label>Atualizar Imagem do Produto</label>
                        <TextField
                            fullWidth type="file"
                            onChange={e => setData('foto', e.target.files[0])}>
                        </TextField>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button className="btn btn-primary" type="submit">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}

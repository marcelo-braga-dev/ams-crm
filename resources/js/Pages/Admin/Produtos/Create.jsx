import Layout from "@/Layouts/Admin/Layout";
import TextField from "@mui/material/TextField";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import {useForm} from "@inertiajs/react";
import React from "react";

export default function ({produtos, fornecedor}) {
    const {data, setData, post} = useForm({
        fornecedor: fornecedor.id
    })

    function onSubmit(e) {
        e.preventDefault()
        post(route('admin.produtos.store'))
    }

    return (
        <Layout titlePage="Cadastrar Produto" container menu="fornecedores" submenu="lista"
                voltar={route('admin.produtos.index', {fornecedor: fornecedor.id})}>
            <div className="row justify-content-between mb-4">
                <div className="col-auto">
                    <h6>Fornecedor: {fornecedor.nome}</h6>
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col mb-4">
                        <TextField label="Nome" fullWidth required
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
                                        index="preco_fornecedor"/>
                    </div>
                    <div className="col mb-4">
                        <TextField label="Unidade" fullWidth required
                                   onChange={e => setData('unidade', e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <label>Imagem do Produto</label>
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

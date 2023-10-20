import Layout from "@/Layouts/Admin/Layout";
import TextField from "@mui/material/TextField";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import {useForm} from "@inertiajs/react";
import React from "react";
import {MenuItem} from "@mui/material";

export default function ({fornecedor, categorias}) {
    const {data, setData, post} = useForm({
        fornecedor: fornecedor.id
    })

    function onSubmit(e) {
        e.preventDefault()
        post(route('admin.produtos-fornecedores.store'))
    }

    return (
        <Layout titlePage="Cadastrar Produto" container menu="produtos" submenu="todos-produtos"
                voltar={route('admin.produtos-fornecedores.show', fornecedor.id)}>
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
                    <div className="col mb-4">
                        <TextField label="Categoria" select fullWidth required defaultValue=""
                                   onChange={e => setData('categoria', e.target.value)}>
                            {categorias.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item.id}>{item.nome}</MenuItem>
                                )
                            })}
                        </TextField>
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
                <div className="row">
                    <div className="col mb-4">
                        <TextField label="Descrição do Produto" multiline fullWidth rows="3"
                                   onChange={e => setData('descricao', e.target.value)}/>
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

import Layout from "@/Layouts/Admin/Layout";
import TextField from "@mui/material/TextField";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import {router, useForm} from "@inertiajs/react";

export default function ({produto, fornecedor}) {
    const {data, setData, post} = useForm({
        fornecedor: fornecedor.id,
        nome: produto.nome,
        preco_venda: produto.preco_venda,
        preco_fornecedor: produto.preco_fornecedor,
        unidade: produto.unidade,
    })

    function onSubmit(e) {
        e.preventDefault()
        router.post(route('admin.produtos.update', produto.id), {
            _method: 'put',...data
        })
    }

    return (
        <Layout titlePage="Editar Produto" container menu="fornecedores" submenu="lista"
                voltar={route('admin.produtos.index', {fornecedor: fornecedor.id})}>
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
                                        index="preco_fornecedor"
                                        required/>
                    </div>
                    <div className="col mb-4">
                        <TextField label="Unidade" fullWidth required defaultValue={data.unidade}
                                   onChange={e => setData('unidade', e.target.value)}/>
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

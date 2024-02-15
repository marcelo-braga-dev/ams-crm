import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import {router, useForm} from "@inertiajs/react";
import {TextField} from "@mui/material";


export default function ({dados}) {
    const {data, setData} = useForm()

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.financeiro.fluxo-caixa.update', dados.id), {...data, _method: 'PUT'})
    }

    router.on('success', function () {
        data.valor_baixa = ''
        data.data_baixa = ''
    })

    return (
        <Layout titlePage="Fluxo de Caixa" menu="financeiro" submenu="fluxo-caixa"
                voltar={route('admin.financeiro.fluxo-caixa.index')}>
            <div className="row mb-4">
                <div className="col">
                    <span className="d-block"><b>Data:</b> {dados.data}</span>
                    <span className="d-block"><b>Tipo:</b> {dados.tipo}</span>
                    <span className="d-block"><b>Fornecedor:</b> {dados.fornecedor}</span>
                    <span className="d-block"><b>Empresa:</b> {dados.empresa}</span>
                    <span className="d-block"><b>Banco:</b> {dados.banco}</span>
                    <span className="d-block"><b>Status:</b> {dados.status}</span>
                </div>
                <div className="col">
                    <span className="d-block"><b>N° Nota Fiscal:</b> {dados.nota_fiscal}</span>
                    <span className="d-block"><b>Valor:</b> R$ {dados.valor}</span>
                    <span className="d-block"><b>Data Vencimento:</b> {dados.data_vencimento}</span>
                    <span className="d-block pt-3"><b>Valor Baixa:</b> R$ {dados.valor_baixa}</span>
                    <span className="d-block"><b>Data Baixa:</b> R$ {dados.data_baixa}</span>
                </div>
            </div>
            {dados.status === 'aberto' && dados.tipo === 'saida' &&
                <form onSubmit={submit}>
                    <div className="row">
                        <div className="col-3">
                            <TextFieldMoney index="valor_baixa" value={data.valor_baixa} label="Valor Baixa"
                                            setData={setData}
                                            required/>
                        </div>
                        <div className="col-3">
                            <TextField type="date" fullWidth required value={data.data_baixa ?? ''}
                                       onChange={e => setData('data_baixa', e.target.value)}/>
                        </div>
                        <div className="col-3">
                            <button className="btn btn-primary">Salvar</button>
                        </div>
                    </div>
                </form>}
        </Layout>
    )
}

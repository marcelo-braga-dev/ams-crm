import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import {router, useForm} from "@inertiajs/react";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";


export default function ({dados, bancos}) {
    const {data, setData} = useForm({
        'valor_baixa': dados.valor_baixa,
        'banco': dados.banco_id,
        'data_baixa': dados.data_baixa_float,
    })

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.financeiro.fluxo-caixa.atualizar-baixa', dados.id), {...data, _method: 'PUT'})
    }

    const excluir = () => {
        router.post(route('admin.financeiro.fluxo-caixa.destroy', dados.id), {...data, _method: 'DELETE'})
    }

    router.on('success', function () {
        data.valor_baixa = ''
        data.data_baixa = ''
        data.banco = ''
    })

    return (
        <Layout titlePage="Informações do Fluxo de Caixa" menu="financeiro" submenu="fluxo-caixa"
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
                <div className="col-auto">
                    <a className="btn btn-primary btn-sm d-block"
                       href={route('admin.financeiro.fluxo-caixa.edit', dados.id)}>Editar</a>
                    <button className="btn btn-danger btn-sm" data-bs-toggle="modal"
                            data-bs-target="#exampleExcluir">Excluir
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col mb-4">
                    <span className="d-block"><b>Descrição:</b> {dados.descricao}</span>
                </div>
            </div>
            {dados.status === 'aberto' && dados.tipo === 'saida' &&
                <form onSubmit={submit}>
                    <div className="row">
                        <div className="col-md-2">
                            <TextFieldMoney index="valor_baixa" value={data.valor_baixa} label="Valor Baixa"
                                            setData={setData} de
                                            required/>
                        </div>
                        <div className="col-md-2">
                            <TextField type="date" fullWidth required value={data.data_baixa ?? ''}
                                       onChange={e => setData('data_baixa', e.target.value)}/>
                        </div>
                        <div className="col-md-2 mb-4">
                            <TextField select label="Banco" fullWidth required value={data.banco ?? ''}
                                       onChange={e => setData('banco', e.target.value)}>
                                {bancos.map(item => <MenuItem key={item.id}
                                                              value={item.id}>{item.valor}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary">Salvar</button>
                        </div>
                    </div>
                </form>}

            <div className="modal fade mt-5" id="exampleExcluir" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Pagamento</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja realmente excluir este pagamento?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => excluir()}>Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

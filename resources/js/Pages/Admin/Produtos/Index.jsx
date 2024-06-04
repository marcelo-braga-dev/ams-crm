import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import convertFloatToMoney from "@/Helpers/converterDataHorario";

export default function ({produtos}) {
    return (
        <Layout empty titlePage="Produtos" menu="produtos" submenu="produtos-cadastrados">
            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col">
                        <TextField label="Fornecedor"/>
                    </div>
                </div>
            </div>

            <div className="card card-body">
                <div className="row">
                    <div className="col">
                        <a className="btn btn-primary btn-sm" href={route('admin.produtos.create')}>Cadastrar</a>
                    </div>
                    <div className="col-auto"><small>Quantidade: {produtos.length}</small></div>
                </div>
                <div className="row">
                    <div className="col">
                        {produtos.map(item => (
                            <div className="card card-body mb-3">
                                <div className="row">
                                    <div className="col-auto">
                                        <Avatar variant="square" style={{width: 80, height: 80}} src={item.foto}/>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            <div className="col">
                                                <span className="d-block"><b>{item.nome}</b></span>
                                                <small className="d-block">ID: #{item.id}</small>
                                                <span className="d-block">Fornecedor: {item.fornecedor}</span>
                                                <span className="d-block">Categoria: {item.categoria_nome}</span>
                                            </div>
                                            <div className="col">
                                                <span className="d-block">Valor: R$ {convertFloatToMoney(item.preco)}</span>
                                                {!!item.preco_custo && <span className="d-block">Custo: R$ {convertFloatToMoney(item.preco_custo)}</span>}
                                                <span className="d-block">Unidade: {item.unidade}</span>
                                            </div>
                                            <div className="col">
                                                <span className="d-block">Estoque: {item.estoque} und.</span>
                                                <span className="d-block">Em Trânsito: {item.estoque_transito ?? 0} und.</span>
                                                <span className="d-bl ock">Total: {item.estoque_transito + item.estoque} und.</span>
                                                <a className="btn btn-link m-0 px-2 py-1 text-dark"
                                                   href={route('admin.produtos.estoques.index')}><small>Ver Estoque</small></a>
                                            </div>
                                            <div className="col text-end">
                                                <a className="btn btn-primary"
                                                   href={route('admin.produtos.show', item.id)}>Ver</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

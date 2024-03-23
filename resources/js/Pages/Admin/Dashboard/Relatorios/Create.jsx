import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import {useState} from "react";
import {router, useForm} from "@inertiajs/react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";

export default function ({graficos, franquias}) {
    const [cadastrarJanela, setCadastrarJanela] = useState(false)
    const [idExcluir, setIdExcluir] = useState()

    const {data, setData, reset} = useForm({
        nome: '',
        codigo: '',
        franquias: '',
        funcoes: '',
    })

    const submit = (e) => {
        e.preventDefault()
        router.post(route('admin.dashboard.relatorios.store', {...data}))
    }

    const excluir = () => {
        router.post(route('admin.dashboard.relatorios.destroy', idExcluir), {_method: 'DELETE'})
    }

    router.on('success', () => {
        reset()
        setCadastrarJanela(false)
    })


    return (
        <Layout titlePage="Relatórios" menu="dashboard" submenu="dashboard-relatorios"
                voltar={route('admin.dashboard.relatorios.index')}>
            <div className="card card-body mb-4">
                <div>
                    {!cadastrarJanela && <button className="btn btn-primary"
                                                 onClick={() => setCadastrarJanela(e => !e)}>
                        Cadastrar Jenala</button>}
                </div>

                {cadastrarJanela &&
                    <form onSubmit={submit}>
                        <div className="row justify-content-between">
                            <div className="col"><h6>Importar Janela</h6></div>
                            <div className="col-auto">
                                <span className="cursor-pointer"
                                      onClick={() => setCadastrarJanela(e => !e)}>Fechar</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <InputLabel className="mb-0">Franquias</InputLabel>
                                {franquias.map(item => <FormControlLabel key={item.id} label={item.nome} control={
                                    <Checkbox onChange={e => setData('franquias', {
                                        ...data.franquias, [item.id]: e.target.checked
                                    })}/>
                                }/>)}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mb-4">
                                <InputLabel className="mb-0">Funções</InputLabel>
                                <FormControlLabel label="Admins" control={
                                    <Checkbox onChange={e => setData('funcoes', {
                                        ...data.funcoes, 'admin': e.target.checked
                                    })}/>
                                }/>
                                <FormControlLabel label="Supervisores" control={
                                    <Checkbox onChange={e => setData('funcoes', {
                                        ...data.funcoes, 'supervisor': e.target.checked
                                    })}/>
                                }/>
                                <FormControlLabel label="Vendedores" control={
                                    <Checkbox onChange={e => setData('funcoes', {
                                        ...data.funcoes, 'consultor': e.target.checked
                                    })}/>
                                }/>
                            </div>
                        </div>
                        <div className="row mb-4 mt-2">
                            <div className="col">
                                <TextField label="Nome da Jenala" fullWidth required value={data.nome}
                                           onChange={e => setData('nome', e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col">
                                <TextField label="Código" multiline rows="3" fullWidth required value={data.codigo}
                                           onChange={e => setData('codigo', e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-primary">Salvar</button>
                            </div>
                        </div>
                    </form>
                }
            </div>

            <div className="card card-body mb-4">
                <h6>Janelas Importadas</h6>
                {graficos.length ? <table className="table">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Franquias</th>
                        <th>Funções</th>
                        <th className="text-center">Data Cadastro</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {graficos.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.nome}</td>
                                <td>{item.franquias.map(item =>
                                    <small>{item}, </small>)}{item.franquias.length ? '' : 'Todas'}</td>
                                <td>{item.funcoes.map(item => <small>{item}, </small>)}{item.funcoes.length ? '' : 'Todas'}</td>
                                <td className="text-center">{item.data_cadastro}</td>
                                <td>
                                    <DeleteOutlineOutlinedIcon className="cursor-pointer" color="error"
                                                               onClick={() => setIdExcluir(item.id)}
                                                               data-bs-toggle="modal" data-bs-target="#modalExcluir"/>
                                </td>
                            </tr>
                        )
                    })}

                    </tbody>
                </table> : <small>Não há registros</small>}
            </div>

            <div className="modal fade mt-5" id="modalExcluir" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Janela</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja realmente excluir essa informação?
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

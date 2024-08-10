import React, {useState} from "react";
import Layout from '@/Layouts/Layout';
import {Stack, TextField, Typography} from "@mui/material";
import {router, useForm} from "@inertiajs/react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuItem from "@mui/material/MenuItem";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import Avatar from "@mui/material/Avatar";
import CheckboxSelected from "@/Components/Inputs/CheckboxSelected.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {List, People} from "react-bootstrap-icons";

const Page = ({usuarios, usuarioAtual}) => {
    const [qtdTarefas, setQtdTarefas] = useState(3);
    const [usuariosSelecionados, setUsuariosSelecionados] = useState([usuarioAtual]);

    const {data, setData, post} = useForm({
        descricao: '',
        tarefas: ''
    })

    function submit(e) {
        e.preventDefault();
        router.post(route('admin.ferramentas.tarefas.store'), {...data, usuarios: usuariosSelecionados})
    }

    let rows = [];
    for (let i = 1; i <= qtdTarefas; i++) {
        rows.push(
            <div key={i} className="row mt-4 align-items-center">
                <div className="col-auto">
                    <Typography>{i}.</Typography>
                </div>
                <div className="col">
                    <TextField fullWidth onChange={e =>
                        setData('tarefas', {...data.tarefas, [i]: {...data.tarefas[i], tarefa: e.target.value}})}/>
                </div>
                <div className="col-auto">
                    <TextField label="Prazo" type="datetime-local" InputLabelProps={{shrink: true}}
                               onChange={e => setData('tarefas', {...data.tarefas, [i]: {...data.tarefas[i], data: e.target.value}})}/>
                </div>
            </div>
        )
    }

    return (
        <Layout container titlePage="Cadastrar Tarefa" menu="ferramentas" submenu="ferramentas-tarefas"
                voltar={route('admin.ferramentas.tarefas.index')}>
            <form onSubmit={submit}>
                <CardContainer>
                    <CardTitle title="Informações" icon={<List size={22}/>}/>
                    <CardBody>
                        <div className="row">
                            <div className="col mb-4">
                                <TextField label="Título" fullWidth required
                                           onChange={e => setData('titulo', e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mb-4">
                                <TextField label="Área" select fullWidth required defaultValue=""
                                           onChange={e => setData('area', e.target.value)}>
                                    <MenuItem value="Pedidos">Pedidos</MenuItem>
                                    <MenuItem value="Chat Interno">Chat Interno</MenuItem>
                                    <MenuItem value="Agenda">Agenda</MenuItem>
                                    <MenuItem value="Leads">Leads</MenuItem>
                                    <MenuItem value="Emails">Emails</MenuItem>
                                    <MenuItem value="Contas Usuários">Contas Usuários</MenuItem>
                                    <MenuItem value="SAC">SAC</MenuItem>
                                    <MenuItem value="Fornecedores">Fornecedores</MenuItem>
                                    <MenuItem value="Marketing">Marketing</MenuItem>
                                    <MenuItem value="Outros">Outros</MenuItem>
                                </TextField>
                            </div>
                            <div className="col-md-3 mb-4">
                                <TextField label="Prioridade" select fullWidth required defaultValue=""
                                           onChange={e => setData('prioridade', e.target.value)}>
                                    <MenuItem value="normal">Normal</MenuItem>
                                    <MenuItem value="urgente">Urgente</MenuItem>
                                </TextField>
                            </div>
                        </div>
                        <div className="row">
                            {data.descricao.length > 500 ?
                                <div className="text-danger mb-2">Limite do texto atingido!</div> : ""}
                            <div className="col-12">
                                <TextField multiline minRows="5" label="Breve Descrição" fullWidth required
                                           onChange={e => setData('descricao', e.target.value)}/>
                            </div>
                            <div className="col-12 text-end">
                                <small className={data.descricao.length > 500 ? 'text-danger' : ''}>
                                    {data.descricao.length}/500</small>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardTitle title="Participantes" icon={<People size={22}/>}/>
                    <CardBody>
                        <div className="row row-cols-4">
                            {usuarios.map(item => (
                                <div className="col">
                                    <CardContainer>
                                        <CardBody>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <CheckboxSelected id={item.id} setSelected={setUsuariosSelecionados} checkeds={usuariosSelecionados}/>

                                                <Avatar src={item.foto}/>
                                                <Stack spacing={0}>
                                                    <Typography fontWeight="bold">{item.nome}</Typography>
                                                    <Typography variant="body2">{item.setor_nome}</Typography>
                                                </Stack>
                                            </Stack>
                                        </CardBody>
                                    </CardContainer>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardBody>
                        <div className="row">
                            <div className="col-auto"><Typography fontWeight="bold" fontSize={16}>Tarefas</Typography></div>
                            <div className="col-auto">
                                <Stack direction="row" spacing={1}>
                                    <ChevronLeftIcon onClick={() => setQtdTarefas(qtdTarefas - 1)}/>
                                    <Typography>{qtdTarefas}</Typography>
                                    <ChevronRightIcon onClick={() => setQtdTarefas(qtdTarefas + 1)}/>
                                </Stack>
                            </div>
                        </div>

                        {rows}

                    </CardBody>
                </CardContainer>
                <CardContainer>
                    <CardBody>
                        <div className="row">
                            <div className="col-auto mx-auto">
                                <button className="btn btn-primary" type="submit">Salvar</button>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>
            </form>
        </Layout>
    )
}
export default Page

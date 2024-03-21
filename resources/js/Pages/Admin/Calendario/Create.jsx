import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, {useState} from "react";
import {router, useForm} from "@inertiajs/react";
import Switch from "@mui/material/Switch";

export default function ({franquias, setores}) {
    const [registroPessoal, setRegistroPessoal] = useState(false)

    const {post, data, setData} = useForm({
        usuario: ''
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.agenda.calendario.store'), {...data, registroPessoal: registroPessoal})
    }

    return (
        <Layout titlePage="Novo Registro de Agenda" menu="ferramentas" submenu="ferramentas-agenda"
                voltar={route('admin.agenda.calendario.index')}>
            <form onSubmit={submit}>
                <div className="row mb-4">
                    <div className="col-3">
                        <TextField type="datetime-local" required fullWidth label="Data do Evento"
                                   InputLabelProps={{shrink: true}}
                                   onChange={e => setData('data', e.target.value)}/>
                    </div>
                    <div className="col-md-3">
                        <TextField label="Categoria" select fullWidth required defaultValue=""
                                   onChange={e => setData('categoria', e.target.value)}>
                            <MenuItem value="reuniao">Reunião</MenuItem>
                            <MenuItem value="visita">Visitas</MenuItem>
                            <MenuItem value="anotacoes">Anotações</MenuItem>
                        </TextField>
                    </div>
                    <div className="col">
                        <Switch onChange={e => setRegistroPessoal(e.target.checked)}/> Registro Pessoal
                    </div>
                </div>

                {!registroPessoal &&
                    <div className="row mb-5">
                        <div className="col-md-3">
                            <TextField label="Franquia" select fullWidth defaultValue="" placeholder="Todas"
                                       disabled={registroPessoal}
                                       onChange={e => setData('franquia', e.target.value)}>
                                <MenuItem>Todas</MenuItem>
                                {franquias.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-md-3">
                            <TextField label="Setor" select fullWidth defaultValue=""
                                       onChange={e => setData('setor', e.target.value)}>
                                <MenuItem value="">Todas</MenuItem>
                                {setores?.[data?.franquia]?.map(item => <MenuItem key={item.id}
                                                                                  value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                    </div>
                }

                <div className="row">
                    <div className="col">
                        <TextField label="Título" fullWidth required
                                   onChange={e => setData('titulo', e.target.value)}/>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col">
                        <TextField label="Mensagem" fullWidth required multiline rows="3"
                                   onChange={e => setData('msg', e.target.value)}/>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-auto">
                        <button className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}

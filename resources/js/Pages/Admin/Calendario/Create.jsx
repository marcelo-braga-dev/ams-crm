import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import Switch from "@mui/material/Switch";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

export default function ({ franquias, setores, usuarios }) {
    const [registroPessoal, setRegistroPessoal] = useState(false)

    const { post, data, setData } = useForm({
        usuario: ''
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.agenda.calendario.store'), { ...data, registroPessoal: registroPessoal })
    }

    const [participantes, setParticipantes] = useState([])
    const nomes = usuarios
    console.log(participantes)

    const handleChange = (event) => {
        const { target: { value } } = event;
        setParticipantes(
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    return (
        <Layout titlePage="Novo Registro de Agenda" menu="ferramentas" submenu="ferramentas-agenda"
            voltar={route('admin.agenda.calendario.index')}>
            <form onSubmit={submit}>
                <div className="mb-4 row">
                    <div className="col-3">
                        <TextField type="datetime-local" required fullWidth label="Data do Evento"
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setData('data', e.target.value)} />
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
                        <Switch onChange={e => setRegistroPessoal(e.target.checked)} /> Registro Pessoal
                    </div>
                </div>

                {!registroPessoal &&
                    <div className="mb-5 row">
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
                    <div className="mb-4">
                        <FormControl fullWidth>
                            <InputLabel id="select" label="Lang">
                                Participantes
                            </InputLabel>
                            <Select
                                multiple
                                value={participantes}
                                onChange={handleChange}
                                renderValue={(item) => {
                                    item.sort();
                                    return item.map((value) => (
                                        <span key={value}>{((usuarios.filter(a => a.id == value))?.[0]?.nome)}, </span>
                                    ))
                                }}
                            >
                                {nomes.map(item =>
                                    <MenuItem key={item.id} value={item.id}><Checkbox checked={participantes.indexOf(item.id) > -1} />{item.nome}</MenuItem>
                                )}

                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <TextField label="Título" fullWidth required
                            onChange={e => setData('titulo', e.target.value)} />
                    </div>
                </div>

                <div className="mt-4 row">
                    <div className="col">
                        <TextField label="Mensagem" fullWidth required multiline rows="3"
                            onChange={e => setData('msg', e.target.value)} />
                    </div>
                </div>
                <div className="mt-4 row">
                    <div className="col-auto">
                        <button className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}

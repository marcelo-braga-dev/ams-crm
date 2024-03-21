import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {Avatar, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {router} from "@inertiajs/react";

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Stack from "@mui/material/Stack";

export default function ({dados, destinatarios, status}) {
    function alterarStatus(status) {
        router.post(route('admin.agenda.alterar-status', {id: dados.id, status: status}))
    }

    const deletar = () => {
        router.post(route('admin.agenda.calendario.destroy', dados.id), {_method: 'DELETE'})
    }

    return (
        <Layout titlePage="Agenda" menu="ferramentas" submenu="ferramentas-agenda"
                voltar={route('admin.agenda.calendario.index')}>
            <div className="card card-body mb-4">
                <div className="row justify-content-aro und">
                    <div className="col">
                        <span className="d-block mb-2"><b>Data:</b> {dados.data}</span>
                        <span className="d-block"><b>Autor:</b> {dados.autor}</span>
                        <span className="d-block"><b>Categoria:</b> {dados.categoria}</span>
                    </div>
                    <div className="col-md-3">
                        <TextField label="Status" select fullWidth
                                   defaultValue={dados.status}
                                   onChange={e => alterarStatus(e.target.value)}>
                            {status.map(item => <MenuItem value={item.status}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col text-end">
                        <DeleteOutlineOutlinedIcon className="cursor-pointer" color="error" data-bs-toggle="modal"
                                                   data-bs-target="#modalExcluir"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <span className="d-block mt-3"><b>Título:</b> {dados.titulo}</span>
                        <span className="d-block"><b>Mensagem:</b> {dados.msg}</span>
                    </div>
                </div>
            </div>

            <div className="card card-body">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Destinatários</th>
                        <th className="text-center">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {destinatarios.map(item =>
                        <tr key={item.id}>
                            <td>
                                <Stack direction="row" spacing={2}>
                                    <Avatar src={item.foto}/> <span className="pt-2">{item.nome}</span>
                                </Stack>
                            </td>
                            <td className="text-center">
                                {item.status_nome}<br/>
                                <small>{item.data_status}</small>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="modal fade mt-5" id="modalExcluir" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Registro</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja realmente excluir essa informação?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar
                            </button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => deletar()}>Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

import CardBody from '@/Components/Cards/CardBody.jsx';
import LeadsDados from '@/Components/Leads/LeadsDados.jsx';
import { Button, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { ArrowRight, BoxSeam, ListUl, Tag, TrashFill } from 'react-bootstrap-icons';
import EditModal from '@/Pages/Geral/Leads/EditModal.jsx';
import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardTitle from '@/Components/Cards/CardTitle.jsx';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HistoricoAtendimento from '@/Partials/Leads/HistoricoAtendimento.jsx';
import HistoricoPedidos from '@/Partials/Leads/HistoricoPedidos.jsx';
import HistoricoStatus from '@/Partials/Leads/HistoricoStatus.jsx';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { LeadContext } from './LeadContext.jsx';
import { TbPackage, TbX } from 'react-icons/tb';
import Link from '@/Components/Link.jsx';
import Avatar from '@mui/material/Avatar';

const LeadDialog = ({ iconButton, action, leadId }) => {
    const isAdmin = usePage().props.auth.user.is_admin; // remover

    const { lead, fetchLead, filtros, permissoes, historicos } = useContext(LeadContext);
    const [consultorSelecionado, setConsultorSelecionado] = useState();

    function nomeConsultorSelecionado() {
        const nome = filtros.usuarios[filtros.usuarios.findIndex(i => i.id === consultorSelecionado)]?.name;
        return nome ? <>
            <b>TROCAR</b> o consultor(a) dos Leads para:<br />
            <h6>{nome}</h6>
        </> : <div className="alert alert-danger text-white">Selecione o Consultor</div>;
    }

    function encaminharLead() {
        if (consultorSelecionado) {
            router.post(route('auth.leads.api.encaminhar', { lead_ids: [lead.id], consultor_id: consultorSelecionado }));
        }
    }

    function deletarLead() {
        router.post(route('admin.clientes.leads.delete', { lead: lead.id }));
    }

    function removerVendedor() {
        router.post(route('admin.clientes.leads.remover-consultor', { lead: lead.id }));
    }

    function removerSdr() {
        router.post(route('admin.clientes.leads.remover-sdr', { lead: lead.id }));
    }

    function inativarLead() {
        router.post(route('admin.clientes.leads.inativar-lead'), { id: lead.id, _method: 'PUT' });
    }

    function reativarLead() {
        router.post(route('admin.clientes.leads.reativar-lead'), { id: lead.id, _method: 'PUT' });
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        fetchLead(leadId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (<>
            {action && <span onClick={handleClickOpen} className="cursor-pointer">{action}</span>}
            {iconButton && <IconButton onClick={handleClickOpen}>{iconButton}</IconButton>}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="xl"
            >
                <CardBody>
                    <LeadsDados dados={lead} acoes={
                        <Stack direction="row" spacing={5} alignItems="center">
                            {(permissoes.encaminhar || permissoes.limpar) &&
                                <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEncaminhar">
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <ArrowRight size={20} />
                                        <Typography>Encaminhar</Typography>
                                    </Stack>
                                </button>}

                            {/*Editar*/}
                            {permissoes.editar && <EditModal lead={lead} />}

                            {permissoes.excluir && <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalExcluir">
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <TrashFill size={15} />
                                    <Typography>Excluir</Typography>
                                </Stack>
                            </button>
                            }
                            <IconButton onClick={handleClose}>
                                <TbX color="red" size={25} />
                            </IconButton>
                        </Stack>
                    } />

                    {lead.id && <CardContainer>
                        <CardBody>
                            {isAdmin ?
                                <Link href={route('admin.pedidos.emitir.create', { lead: lead.id })}>
                                    <Button color="success" startIcon={<TbPackage />}>Emitir Pedido</Button>
                                </Link> :
                                <Link href={route('consultor.pedidos.create', { lead: lead.id })}>
                                    <Button color="success" startIcon={<TbPackage />}>Emitir Pedido</Button>
                                </Link>
                            }
                        </CardBody>
                    </CardContainer>}

                    <CardContainer>
                        <CardTitle title={(
                            <Tabs
                                value={value}
                                onChange={handleChange}
                            >
                                <Tab icon={<ListUl size={24} />} iconPosition="start" label="Histórico de Atendimento" />
                                <Tab icon={<BoxSeam size={22} />} iconPosition="start" label="Histórico de Pedidos" />
                                <Tab icon={<Tag size={22} />} iconPosition="start" label="Histórico dos Status" />
                            </Tabs>
                        )} />
                        <div style={{ height: 530 }}>
                            <CardBody>
                                {value === 0 && <HistoricoAtendimento leadId={leadId} />}

                                {value === 1 && <HistoricoPedidos historicos={historicos.pedidos} />}

                                {value === 2 && <HistoricoStatus historicos={historicos.status} />}
                            </CardBody>
                        </div>
                    </CardContainer>

                    {/*MODAL ENVIAR*/}
                    <div className="modal fade mt-5" id="modalEnviar" tabIndex="-1" aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">ALTERAR CONSULTOR</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {nomeConsultorSelecionado()}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                            onClick={() => encaminharLead()}>
                                        Alterar Consultor(a).
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*MODAL EXCLUIR*/}
                    <div className="modal fade mt-5" id="modalExcluir" tabIndex="-1" aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Excluir Lead</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Deseja realmente EXCLUIR este leads?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                            onClick={() => deletarLead()}>
                                        Excluir Lead
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*MODAL Encaminhar*/}
                    <div className="modal fade mt-6" id="modalEncaminhar" tabIndex="-1"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Encaminhar Lead</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    {permissoes.encaminhar && <div className="row">
                                        <div className="col-md-8">
                                            <TextField label="Selecione o Consultor..." select
                                                       value={consultorSelecionado ?? ''}
                                                       fullWidth required
                                                       onChange={e => setConsultorSelecionado(e.target.value)}>
                                                {filtros.usuarios.map((option) => (<MenuItem key={option.id} value={option.id}>
                                                    <Stack direction="row" spacing={2}>
                                                        <Avatar src={option.foto} sx={{ width: 25, height: 25 }} />
                                                        <Typography>{option.name}</Typography>
                                                    </Stack>
                                                </MenuItem>))}
                                            </TextField>
                                        </div>
                                        <div className="col-2">
                                            <button type="button"
                                                    onClick={() => encaminharLead()}
                                                    className="btn btn-primary"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modalEncaminhar">
                                                ENVIAR
                                            </button>
                                        </div>
                                    </div>}

                                    <div className="row">
                                        <div className="col-auto">
                                            <button className="btn btn-link text-dark" data-bs-toggle="modal" data-bs-target="#modalRemoverConsultor">
                                                Remover Vendedor
                                            </button>
                                        </div>
                                        <div className="col-auto">
                                            <button className="btn btn-link text-dark" data-bs-toggle="modal" data-bs-target="#modalRemoverSDR">
                                                Remover SDR
                                            </button>
                                        </div>

                                        {permissoes.inativar && <div className="col text-end">
                                            {lead.infos.status === 'ativo' &&
                                                <button className="btn btn-danger mb-0" data-bs-toggle="modal" data-bs-target="#inativarLead">Inativar
                                                    Lead</button>}
                                            {lead.infos.status === 'inativo' &&
                                                <button className="btn btn-success mb-0" onClick={() => reativarLead()}>Reativar Lead</button>}
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*MODAL REMOVER CONSULTOR*/}
                    <div className="modal fade mt-5" id="modalRemoverConsultor" tabIndex="-1"
                         aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Remover Consultor(a)</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Deseja REMOVER O CONSULTOR(A) deste lead?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                            onClick={() => removerVendedor()}>
                                        Remover
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*MODAL REMOVER SDR*/}
                    <div className="modal fade mt-5" id="modalRemoverSDR" tabIndex="-1" aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Remover SDR</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Deseja REMOVER O SDR deste lead?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                            onClick={() => removerSdr()}>
                                        Remover
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Inativar Lead*/}
                    <div className="modal fade mt-5" id="inativarLead" tabIndex="-1" aria-labelledby="limparLeadLabel"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="limparLeadLabel">Inativar LEAD</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Deseja inativar este leads?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => inativarLead()}>Inativar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Dialog>
        </>
    );
};
export default LeadDialog;

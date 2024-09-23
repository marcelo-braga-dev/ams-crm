import CampoTexto from '@/Components/CampoTexto.jsx';
import FornecedorIcone from '@/Components/Icons/FornecedorIcone.jsx';
import FranquiaIcone from '@/Components/Icons/FranquiaIcone.jsx';
import BancoIcone from '@/Components/Icons/BancoIcone.jsx';
import convertFloatToMoney from '@/Helpers/converterDataHorario.jsx';
import MoedaIcone from '@/Components/Icons/MoedaIcone.jsx';
import React, { useContext, useState } from 'react';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import NotaFiscalIcone from '@/Components/Icons/NotaFiscalIcone.jsx';
import { TbArrowDown, TbArrowUp, TbCalendar, TbChevronDown, TbChevronUp, TbHash, TbNote, TbSignRight, TbTrash, TbUpload } from 'react-icons/tb';
import UsuarioIcone from '@/Components/Icons/UsuarioIcone.jsx';
import AnexoIcone from '@/Components/Icons/AnexoIcone.jsx';
import Modal from 'react-modal';
import CardTitle from '@/Components/Cards/CardTitle.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import { router } from '@inertiajs/react';
import { ContextFluxoCaixa } from '@/Pages/Admin/Financeiro/FluxoCaixa/Index/ContextFluxoCaixa.jsx';

const InfoNota = ({ nota }) => {
    const [maisInfo, setMaisInfo] = useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const { setAtualizarRegistros } = useContext(ContextFluxoCaixa);

    const deleteNota = () => {
        router.post(route('admin.financeiro.fluxo-caixa.destroy', nota.id),
            { _method: 'DELETE' },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setAtualizarRegistros(e => !e);

                },
            },
        );
        setIsOpen(false);
    };

    const handleInfo = () => {
        setMaisInfo(e => !e);
    };


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (<div className="row">
        <div className="col-11">
            <CampoTexto titulo="Fornecedor" texto={nota?.fornecedor?.nome} icone={FornecedorIcone} />

            <CampoTexto titulo="Franquia" texto={nota?.franquia?.nome} icone={FranquiaIcone} />

            <CampoTexto titulo="Empresa" texto={nota?.empresa?.nome} icone={BancoIcone} />

            <div className="row">
                <div className="col">
                    <CampoTexto
                        titulo="Total"
                        texto={<Stack direction="row" spacing={1} alignItems="center">
                            <span>{`R$ ${convertFloatToMoney(nota?.valor_nota)}`}</span>
                            {nota?.tipo === 'entrada' ? <TbArrowUp color="green" size={18} /> : <TbArrowDown color="red" size={18} />}
                        </Stack>}
                        icone={MoedaIcone} />
                </div>
                <div className="col">
                    <CampoTexto titulo="Nota" texto={nota?.nota ?? '-'} icone={NotaFiscalIcone} />
                </div>
            </div>

            {maisInfo && <>
                <CampoTexto titulo="Descrição" texto={nota?.descricao} icone={TbNote} />
                <CampoTexto titulo="Origem" texto={'-'} icone={TbSignRight} />
                <CampoTexto titulo="Autor" texto={nota?.autor?.nome} icone={UsuarioIcone} />

                <div className="row">
                    <div className="col">
                        <CampoTexto titulo="Data Emissão Nota" texto={nota?.emissao ?? '-'} icone={TbCalendar} />
                    </div>
                    <div className="col">
                        {nota?.anexo && <CampoTexto icone={AnexoIcone} />}
                    </div>
                </div>
                <div className="row">
                    <div className="col-auto">
                        <CampoTexto titulo="ID" texto={`#${nota?.id}`} icone={TbHash} />
                    </div>
                    <div className="col">
                        <CampoTexto titulo="Data de Cadastrado" texto={nota?.cadastrado_dia} icone={TbUpload} />
                    </div>
                </div>
            </>}
        </div>
        <div className="col-1"
             style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Stack spacing={2}>
                <IconButton onClick={openModal}>
                    <TbTrash color="red" size={20} />
                </IconButton>
            </Stack>
            <Stack spacing={2} marginBottom={2}>
                <IconButton onClick={handleInfo}>
                    {maisInfo ? <TbChevronUp /> : <TbChevronDown />}
                </IconButton>
            </Stack>
        </div>

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={{
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '40vw',
                maxWidth: '90vw',
                padding: 0,
            },
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                zIndex: 1300,
            },
        }}>
            <CardTitle title="Excluir Nota Fiscal" icon={<TbTrash color="red" size={20} />} />
            <CardBody>
                <Stack spacing={1}>
                    <Typography>Deseja realmente excluir esta nota fiscal de ID: #{nota.id}?</Typography>
                    <Typography>Por motivo de segurança, não é possível excluir os pagamentos, apenas a nota completa com todos os pagamentos.</Typography>
                    <Typography color="red">Todas as informações e pagamentos serão escluídos.</Typography>
                </Stack>
            </CardBody>
            <CardBody>
                <Stack spacing={3} justifyContent="end" direction="row">
                    <Button onClick={closeModal}>Fechar</Button>
                    <Button color="error" onClick={deleteNota}>Excluir</Button>
                </Stack>
            </CardBody>
        </Modal>
    </div>);
};
export default InfoNota;

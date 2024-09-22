import CampoTexto from '@/Components/CampoTexto.jsx';
import FornecedorIcone from '@/Components/Icons/FornecedorIcone.jsx';
import FranquiaIcone from '@/Components/Icons/FranquiaIcone.jsx';
import BancoIcone from '@/Components/Icons/BancoIcone.jsx';
import convertFloatToMoney from '@/Helpers/converterDataHorario.jsx';
import MoedaIcone from '@/Components/Icons/MoedaIcone.jsx';
import React, { useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import NotaFiscalIcone from '@/Components/Icons/NotaFiscalIcone.jsx';
import { TbArrowDown, TbArrowUp, TbCalendar, TbChevronDown, TbChevronUp, TbNote, TbSignRight, TbUpload } from 'react-icons/tb';
import UsuarioIcone from '@/Components/Icons/UsuarioIcone.jsx';
import AnexoIcone from '@/Components/Icons/AnexoIcone.jsx';

const InfoNota = ({ nota }) => {
    const [maisInfo, setMaisInfo] = useState(false);

    const handleInfo = () => {
        setMaisInfo(e => !e);
    };

    return (<>
        <CampoTexto titulo="Fornecedor" texto={nota?.fornecedor?.nome} icone={FornecedorIcone} />

        <CampoTexto titulo="Franquia" texto={nota?.franquia?.nome} icone={FranquiaIcone} />

        <CampoTexto titulo="Empresa" texto={nota?.empresa?.nome} icone={BancoIcone} />

        <div className="row">
            <div className="col">
                <CampoTexto titulo="Total"
                            texto={
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <span>{`R$ ${convertFloatToMoney(nota?.valor_nota)}`}</span>
                                    {nota?.tipo === 'entrada' ?
                                        <TbArrowUp color="green" size={18} /> :
                                        <TbArrowDown color="red" size={18} />}
                                </Stack>
                            }
                            icone={MoedaIcone} />
            </div>
            <div className="col">
                <CampoTexto titulo="Nota" texto={nota?.nota ?? '-'} icone={NotaFiscalIcone} />
            </div>
            <div className="col-1">
                {!maisInfo && <IconButton onClick={handleInfo}>
                    <TbChevronDown />
                </IconButton>}
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
                <div className="col">
                    <CampoTexto titulo="Data de Cadastrado" texto={nota?.cadastrado_dia} icone={TbUpload} />
                </div>
                <div className="col-auto">
                    {maisInfo && <IconButton onClick={handleInfo}>
                        <TbChevronUp />
                    </IconButton>}
                </div>
            </div>
        </>}
    </>);
};
export default InfoNota;

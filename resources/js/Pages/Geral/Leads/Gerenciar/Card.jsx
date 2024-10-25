import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import { Checkbox, Stack, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import React from 'react';
import CampoTexto from '@/Components/CampoTexto.jsx';
import { TbBrandWhatsapp, TbFileStack, TbHash, TbMapPin, TbPhone, TbPin, TbUser } from 'react-icons/tb';
import SetorIcone from '@/Components/Icons/SetorIcone.jsx';

const Card = ({ lead }) => {

    return (
        <CardContainer>
            <CardBody>
                <div className="row">
                    <div className="text-center" style={{ width: 70 }}>
                        <Checkbox />
                    </div>
                    <div className="col">
                        {lead.cliente.razao_social && <CampoTexto titulo="Razão Social" icone={TbUser} texto={lead.cliente.razao_social} />}
                        {lead.cliente.nome && <CampoTexto titulo="Nome/Nome Fantasia" icone={TbUser} texto={lead.cliente.nome} />}
                        <Stack direction="row" spacing={3}>
                            <CampoTexto titulo="ID" icone={TbHash} texto={`#${lead.id}`} />
                            <CampoTexto titulo="Setor" icone={SetorIcone} texto={lead.infos.setor} />
                        </Stack>
                        <CampoTexto titulo="CNPJ" icone={TbFileStack} texto={lead.cliente.cnpj} />
                        {/*<CampoTexto titulo="Localidade" icone={TbMapPin} texto={`${lead.cliente.cidadeEstado.cidade}/${lead.cliente.cidadeEstado.estado}`} />*/}
                    </div>
                    <div className="col-2">
                        <Chip className="mb-3 mt-2" label={lead.infos.status_nome.nome} variant="outlined" sx={{ borderColor: 'blue', color: 'blue' }} size="small" />
                        <Typography variant="body2">{lead.infos.status_data}</Typography>
                    </div>
                    <div className="col-2">
                        <CampoTexto titulo="Contatos" icone={TbPhone} />
                        <Stack spacing={1}>
                            {lead?.cliente?.telefones?.map(telefone => (
                                <Stack spacing={1} direction="row" alignItems="center">
                                    <TbBrandWhatsapp size={15} color="green" />
                                    <Typography variant="body2">{telefone.telefone}</Typography>
                                </Stack>
                            ))}
                        </Stack>
                    </div>
                </div>
            </CardBody>
        </CardContainer>
    );
};
export default Card;

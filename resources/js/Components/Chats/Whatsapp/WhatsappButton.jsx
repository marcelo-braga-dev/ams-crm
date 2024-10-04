import React from "react";
import {Whatsapp} from "react-bootstrap-icons";
import { TbBrandWhatsapp } from 'react-icons/tb';

export const WhatsappButton = ({telefones, handleOpen}) => {
    // Verifica se existe algum telefone com status_whatsapp igual a 1
    const hasActiveWhatsapp = telefones.some(telefone => (telefone.status_whatsapp === 1 || telefone.status_whatsapp === 2));

    return hasActiveWhatsapp ? (
        <TbBrandWhatsapp size={23} cursor="pointer" color="green" onClick={handleOpen}/>
    ) : (
        <TbBrandWhatsapp size={23} color="gray"/>
    );
};

import React from "react";
import {Whatsapp} from "react-bootstrap-icons";

export const WhatsappButton = ({telefones, handleOpen}) => {
    // Verifica se existe algum telefone com status_whatsapp igual a 1
    const hasActiveWhatsapp = telefones.some(telefone => (telefone.status_whatsapp === 1 || telefone.status_whatsapp === 2));

    return hasActiveWhatsapp ? (
        <Whatsapp size={24} cursor="pointer" color="green" onClick={handleOpen}/>
    ) : (
        <Whatsapp size={24} color="#cccccc"/>
    );
};

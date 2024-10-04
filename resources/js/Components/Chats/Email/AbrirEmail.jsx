import {Envelope} from "react-bootstrap-icons";
import React from "react";
import { TbMail } from 'react-icons/tb';

const AbrirEmail = (emails) => {
    return (
        emails ? <TbMail size={24} cursor="auto" color="gray"/>
            : <TbMail cursor="pointer" size={24} color="orange"/>
    )
}
export default AbrirEmail

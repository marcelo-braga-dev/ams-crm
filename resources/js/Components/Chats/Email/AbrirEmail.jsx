import {Envelope} from "react-bootstrap-icons";
import React from "react";

const AbrirEmail = (emails) => {
    return (
        emails ? <Envelope size={24} cursor="auto" color="#cccccc"/>
            : <Envelope cursor="pointer" size={24} color="orange"/>
    )
}
export default AbrirEmail

import React from "react";

export default function Text({texto = ''}) {
    return texto ?
        <span dangerouslySetInnerHTML={{__html: texto.replace(/\n/g, "<br />")}} />
        : ''

}

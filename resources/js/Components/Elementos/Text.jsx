import React from "react";

export default function Text({texto = ''}) {
    return (
        <span dangerouslySetInnerHTML={{__html: texto.replace(/\n/g, "<br />")}} />
    )
}

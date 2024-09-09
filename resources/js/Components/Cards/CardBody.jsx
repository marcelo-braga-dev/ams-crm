import React from "react";

export default function CardBody(props) {
    const {displayNone} = props

    return <div style={{padding: '20px', marginTop: 10, display: displayNone ? 'none' : 'block'}} {...props}>{props.children}</div>
}

import React from "react";

export default function CardBody(props) {
    const {displayNone, children} = props

    return <div style={{padding: '20px', marginTop: 10, display: displayNone ? 'none' : 'block'}} {...props}>{children}</div>
}

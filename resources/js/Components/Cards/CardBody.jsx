import styled from 'styled-components'
import React from "react";

export default function CardBody(props) {
    return <div {...props} style={{padding: '20px'}}>{props.children}</div>
}

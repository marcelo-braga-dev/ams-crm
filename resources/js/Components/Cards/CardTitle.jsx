import styled from 'styled-components'
import {Divider, Stack} from "@mui/material";

const Title = styled.span`
    color: rgb(89, 89, 89);
    font-size: 16px;
    font-weight: 600;
`
const Container = styled.span`
    padding-inline: 20px;
    padding-top: 20px;
`

export default function CardTitle({title, icon, children, subtitle, className, onClick, cursorPointer}) {
    return (
        <Container className={`row ${cursorPointer ? 'cursor-pointer' : ''}`}>
            <div className="col mb-0" onClick={onClick}>
                <Stack direction="row" spacing={1}>
                    {icon && <span style={{color: 'rgb(89, 89, 89)'}}>{icon}</span>}
                    <Stack direction="column" className={className} spacing={0}>
                        <Title>{title}</Title>
                        {subtitle}
                    </Stack>
                </Stack>
            </div>
            <div className="col-auto mb-0">{children}</div>
            <div style={{border: '1px solid #EEF2F6'}} className="mt-3"/>
        </Container>
    )
}

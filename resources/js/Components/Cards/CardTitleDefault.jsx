import styled from 'styled-components'
import {Divider, Stack} from "@mui/material";

const Title = styled.span`
    color: black;
    font-size: 16px;
    font-weight: 600;
`
const Container = styled.span`
    margin-bottom: 10px;
`

export default function CardTitleDefault({title, icon, children, subtitle, className}) {
    return (
        <Container className="row">
            <div className="col mb-0">
                <Stack direction="row" spacing={1}>
                    {icon && <span style={{color: 'rgb(89, 89, 89)'}}>{icon}</span>}
                    <Stack direction="column" className={className} spacing={0}>
                        <Title>{title}</Title>
                        {subtitle}
                    </Stack>
                </Stack>
            </div>
            <Divider className="mt-2"/>
            <div className="col-auto mb-0">{children}</div>
        </Container>
    )
}

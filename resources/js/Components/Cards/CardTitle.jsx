import styled from 'styled-components'
import {Stack} from "@mui/material";

const Title = styled.span`
    color: rgb(59, 64, 86);
    font-size: 18px;
    font-weight: 500;
`
const Container = styled.span`
    padding-inline: 20px;
    padding-top: 20px;
`

export default function CardTitle({title, icon, children, subtitle}) {
    return (
        <Container className="row">
            <div className="col mb-0">
                <Stack direction="row" spacing={2}>
                    {icon && <span>{icon}</span>}
                    <Stack direction="column" spacing={0}>
                        <Title>{title}</Title>
                        {subtitle}
                    </Stack>
                </Stack>
            </div>
            <div className="col-auto mb-0">{children}</div>
        </Container>
    )
}

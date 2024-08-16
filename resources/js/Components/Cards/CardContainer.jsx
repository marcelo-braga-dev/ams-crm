import styled from 'styled-components'
import {useContext} from "react";
import AuthProvider from '@/Layouts/Contexts/Context'

const Card = styled.div`
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    overflow-wrap: break-word;
    margin-bottom: 2rem;
    background-color: ${(props) => props.bgColor || 'white'}
`

export default function CardContainer({children, className}) {
    const {app_settings} = useContext(AuthProvider);

    return (
        <Card className={className} bgColor={app_settings.card_bgcolor}>
            {children}
        </Card>
    )
}

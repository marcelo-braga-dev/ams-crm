import styled from 'styled-components'
import {useContext} from "react";
import AuthProvider from '@/Layouts/Contexts/Context'

const Card = styled.div`
    border-radius: 10px;
    overflow-wrap: break-word;
    margin-bottom: 20px;
    background-color: ${(props) => props.bgColor || 'white'};
    //box-shadow: 0 4px 5px rgba(0, 0, 0, 0.05);
    border: 1px solid #EEE;
`

export default function CardContainer({children, className}) {
    const {app_settings} = useContext(AuthProvider);

    return (
        <Card className={className} bgColor={app_settings.card_bgcolor}>
            {children}
        </Card>
    )
}

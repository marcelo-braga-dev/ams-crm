import styled from 'styled-components'

const Card = styled.div`
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    overflow-wrap: break-word;
    margin-bottom: 2rem;
`

export default function CardContainer({children}) {
    return (
        <Card>
            {children}
        </Card>
    )
}

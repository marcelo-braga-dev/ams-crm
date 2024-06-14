import styled from 'styled-components'

const Button = styled.button`
    border-radius: 10px;
    padding: 6px 20px;
    background-color: #ff3800;
    color: rgb(255, 255, 255);
    border: 0;
    box-shadow: 0 4px 6px rgba(255, 56, 0, 0.4), 0 1px 3px rgb(255, 255, 255);
    letter-spacing: 0.05rem;
    font-weight: 500;
`

export default function ButtonPrimary({children}) {
    return <Button>{children}</Button>
}

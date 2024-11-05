// Checkbox.js
import React from 'react';
import styled, { css } from 'styled-components';
import {Check} from "react-bootstrap-icons";

const bgColor = 'gray'

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const checkboxSizeStyles = css`
    ${({ size }) =>
        size === 'small'
            ? `
    width: 16px;
    height: 16px;
  `
            : `
    width: 20px;
    height: 20px;
  `}
`;

const StyledCheckbox = styled.div`
    display: inline-flex;
    border: 2px solid ${bgColor};
    align-items: center;
    justify-content: center;
    background: ${({ checked }) => (checked ? bgColor: 'white')};
    border: ${({ checked }) => (checked ? '0': `2px solid ${bgColor}`)};
    border-radius: 5px;
    transition: all 150ms;
    cursor: pointer;
    ${checkboxSizeStyles}

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px ${bgColor};
    }

    & > svg {
        visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
        font-size: ${({ size }) => (size === 'small' ? '16px' : '28px')};
    }
`;

const Checkbox = ({ className, checked, onChange, size = 'large' }) => (
    <CheckboxContainer className={className}>
        <HiddenCheckbox checked={checked} onChange={onChange} />
        <StyledCheckbox checked={checked} size={size} onClick={onChange}>
            {/*<CheckIcon color="#fff" />*/}
            <Check color="#fff" size="28" />
        </StyledCheckbox>
    </CheckboxContainer>
);

export default Checkbox;

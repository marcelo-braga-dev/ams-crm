// Switch.js
import React, {useRef, useState} from 'react';
import styled, {css} from 'styled-components';
import {round} from "lodash";

const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
`;

const SwitchInput = styled.input`
    height: 0;
    width: 0;
    visibility: hidden;
    position: absolute;
`;

const switchSizeStyles = {
    small: css`
        width: 30px;
        height: 15px;

        span {
            width: 11px;
            height: 11px;
            transform: ${props => (props.isOn ? 'translateX(15px)' : 'translateX(0)')};
        }
    `,
    large: css`
        width: 40px;
        height: 20px;

        span {
            width: 16px;
            height: 16px;
            transform: ${props => (props.isOn ? 'translateX(20px)' : 'translateX(0)')};
        }
    `
};

const SwitchLabel = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    background: ${props => (props.isOn ? '#000' : 'grey')};
    border-radius: 50px;
    position: relative;
    transition: background-color 0.2s;
    ${props => switchSizeStyles[props.size || 'large']}
`;

const SwitchButton = styled.span`
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 45px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.24);
`;

const Switch = ({checked, onChange, size}) => {
    const [isChecked, isSetChecked] = useState(checked);
    const inputRef = round(Math.random() * 10000);

    const handleSmallToggle = (valor) => {
        isSetChecked(e => !e);
        onChange(!!!isChecked)
    };

    return (
        <SwitchContainer>
            <SwitchInput
                checked={!isChecked}
                onChange={handleSmallToggle}
                id={'ch' + inputRef}
                type="checkbox"
            />
            <SwitchLabel
                htmlFor={'ch' + inputRef}
                isOn={isChecked} size={size}>
                <SwitchButton isOn={isChecked}/>
            </SwitchLabel>
        </SwitchContainer>
    );
};

export default Switch;

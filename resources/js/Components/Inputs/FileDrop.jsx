import React, {useState} from "react";
import styled from "styled-components";
import {Typography} from "@mui/material";
import {Upload} from "react-bootstrap-icons";

const FileDropAreaWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
    border: 3px dashed #ccc;
    border-radius: 10px;
    background-color: #ffffff;
    text-align: center;
    cursor: pointer;
    margin-bottom: 20px;

    &:hover {
        background-color: #fafafa;
    }

    &.is-dragover {
       border-color: #32803f;
    }
`;

const FakeButton = styled.span`
    background-color: #ffffff;
    color: #000000;
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 5px;
    pointer-events: none;
    margin-top: 10px;
    margin-bottom: 5px;
`;

const FileMessage = styled.span`
    color: #aaa;
`;

const FileInput = styled.input`
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
`;

const FileDropArea = ({onChange, label, required, multiple}) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [isFile, setIsFile] = useState(false);
    const [fileMsg, setFileMsg] = useState("ou solte o arquivo aqui");

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragOver(false);
        const files = event.dataTransfer.files;
        handleFiles(files);
    };

    const handleChange = (event) => {
        const files = event.target.files;
        handleFiles(files);
        onChange(event)
    };

    const handleFiles = (files) => {
        if (files.length > 1) {
            setFileMsg(`${files.length} arquivos selecionados`);
        } else {
            setFileMsg(files[0].name);
        }
        setIsFile('true')
    };

    return (
        <FileDropAreaWrapper
            className={isFile ? "is-dragover" : ""}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <Typography variant="body2" marginBottom={1}>{label}</Typography>
            <Upload size={25}/>
            <FakeButton><Typography variant="body2">Escolher Arquivo</Typography></FakeButton>
            <FileMessage><Typography variant="body2">{fileMsg}</Typography></FileMessage>
            <FileInput type="file" required={required} multiple={multiple} onChange={handleChange}/>
        </FileDropAreaWrapper>);
};

export default FileDropArea;

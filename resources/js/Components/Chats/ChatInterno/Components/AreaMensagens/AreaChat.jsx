import {Box, Card, styled} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ImagePdf from "@/Components/Inputs/ImagePdf";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import React, {useEffect, useState} from "react";
import {usePage} from "@inertiajs/react";

const CardWrapperSecondary = styled(Card)(
    ({theme}) => `
      background: rgba(34, 51, 84, 0.1);
      color: black;
      padding:  10px;
      border-radius: 15px;
      border-top-left-radius: 5px;
      max-width: 80%;
      word-break: break-all;
`
);

const CardWrapperPrimary = styled(Card)(
    ({theme}) => `
      background: rgb(0, 0, 0);
      color: white;
      padding: 10px;
      border-radius: 15px;
      border-top-right-radius: 5px;
      max-width: 80%;
      word-break: break-all;
      `
);

export default function AreaChat({item, index}) {
    const {props} = usePage()
    const [fotoUsuario, setFotoUsuario] = useState(props.foto_usuario);

    return (
        <div className="p-3">
            {item.is_resposta ?
                <Box
                    key={index}
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="flex-start">
                    <Avatar
                        variant="circular"
                        sx={{width: 50, height: 50}}
                        src={item.foto}
                    />
                    <Box
                        display="flex"
                        alignItems="flex-start"
                        flexDirection="column"
                        justifyContent="flex-start"
                        ml={2}
                    >
                        <CardWrapperSecondary>
                            {item.tipo === 'msg' && <span className="mb-2 d-block">
                                            {item.mensagem}
                                        </span>}
                            {item.tipo === 'file' && <span className="mb-2 d-block">
                                            <ImagePdf url={item.mensagem}/>
                                        </span>}
                        </CardWrapperSecondary>
                        <small className="font-italic pt-1" style={{fontSize: 12}}>
                            <DoneAllIcon color={item.status === 'lido' ? 'info' : 'disabled'}
                                         style={{fontSize: 14}}/>
                            {item.data}
                        </small>
                    </Box>
                </Box> :
                <Box
                    key={index}
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="flex-end"
                    py={1}
                >
                    <Box id="mensagens"
                         display="flex"
                         alignItems="flex-end"
                         flexDirection="column"
                         justifyContent="flex-end"
                         mr={2}
                    >
                        <CardWrapperPrimary>
                            {item.tipo === 'msg' && <span className="mb-2 d-block">
                                            {item.mensagem}
                                        </span>}
                            {item.tipo === 'file' && <span className="mb-2 d-block">
                                            <ImagePdf url={item.mensagem}/>
                                        </span>}

                        </CardWrapperPrimary>
                        <small className="font-italic pt-1" style={{fontSize: 12}}>
                            <DoneAllIcon color={item.status === 'lido' ? 'info' : 'disabled'}
                                         style={{fontSize: 14}}/>
                            {item.data}
                        </small>
                    </Box>
                    <Avatar
                        variant="circular"
                        sx={{width: 50, height: 50}}
                        alt="foto"
                        src={fotoUsuario}
                    />

                </Box>}
        </div>
    )
}

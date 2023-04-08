import {useState} from 'react';
import {
    Box,
    Typography,
    TextField,
    IconButton,
    Avatar,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    styled
} from '@mui/material';

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import MenuItem from "@mui/material/MenuItem";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ImageIcon from '@mui/icons-material/Image';

const RootWrapper = styled(Box)(
    ({theme}) => `
        padding: 3px;
  `
);

const chatAtivo = {
    backgroundColor: '#222222',
}

function SidebarContent({chats, setChatsSelecionado, chatSelecionado, setNomeChatsSelecionado, pessoas, setFotoChatsSelecionado}) {
    const user = {
        name: 'Chat Interno',
        avatar: '',
        jobtitle: 'AMS360'
    };

    function selecionarChat(dados) {
        setChatsSelecionado(dados.id)
        setNomeChatsSelecionado(dados.nome)
        setFotoChatsSelecionado(dados.foto)
    }

    return (
        <RootWrapper>
            <Box display="flex" alignItems="flex-start" className="p-2">
                <QuestionAnswerIcon className="mt-2" style={{fontSize: 42}}/>
                <Box
                    sx={{
                        ml: 1.5,
                        flex: 1
                    }}
                >
                    <Box
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="space-between"
                    >
                        <Box>
                            <Typography variant="h6" noWrap>
                                {user.name}
                            </Typography>
                            <Typography variant="caption" noWrap>
                                {user.jobtitle}
                            </Typography>
                        </Box>
                        <IconButton
                            sx={{
                                p: 1
                            }}
                            size="small"
                            color="primary"
                        >
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <TextField className="mb-3 px-2" size="small" select fullWidth
                       placeholder="Pesquisar..." defaultValue=""
                       onChange={e => selecionarChat(e.target.value)}>

                {pessoas.map((option) => {
                    return (<MenuItem key={option.id} value={option} className="border-bottom">
                        <Avatar className="me-3 "
                                src={option.foto}
                                sx={{width: 30, height: 30}}/>
                        <small className="text-muted">{option.nome}</small>
                    </MenuItem>)
                })}
            </TextField>

            <Box mt={2}>
                <List disablePadding component="div" className="mb-4">
                    {chats.map((dados, index) => {
                        const selecionado = chatSelecionado === dados.id
                        return (
                            <ListItemButton style={selecionado ? chatAtivo : {}}
                                            onClick={() => selecionarChat(dados)} key={index}>
                                <ListItemAvatar>
                                    <Avatar src={dados.foto}/>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{mr: 1}}
                                    primaryTypographyProps={{
                                        color: selecionado ? 'white' : 'black',
                                        variant: 'subtitle1',
                                        noWrap: true
                                    }}
                                    secondaryTypographyProps={{
                                        color: selecionado ? 'white' : 'black',
                                        noWrap: true
                                    }}
                                    primary={dados.nome}
                                    secondary={<>
                                        <DoneAllIcon color={
                                            selecionado ?
                                                (dados.status === 'lido' ? 'info' : 'white') :
                                                (dados.status === 'lido' ? 'info' : 'disabled')}
                                                     style={{fontSize: 14}} className="me-1"/>
                                        {dados.tipo === 'file' ?
                                            <ImageIcon style={{fontSize: 14}}/> : dados.ultima_mensagem}
                                    </>
                                    }
                                />
                                {dados.qtd_nova > 0 &&
                                    <span className="badge rounded-pill bg-success">{dados.qtd_nova}</span>}
                            </ListItemButton>
                        )
                    })}
                </List>
            </Box>
        </RootWrapper>
    );
}

export default SidebarContent;

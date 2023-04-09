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
    styled,
    Autocomplete
} from '@mui/material';

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ImageIcon from '@mui/icons-material/Image';
import Badge from '@mui/material/Badge';
import InputAdornment from '@mui/material/InputAdornment';

const RootWrapper = styled(Box)(
    ({theme}) => `
        padding: 3px;
  `
);

const chatAtivo = {
    backgroundColor: '#222222',
}

const StyledBadge = styled(Badge)(({theme}) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const StyledBadgeOffiline = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#6a6c69',
        color: '#6a6c69',
        boxShadow: `0 0 0 2px white`,
    }
}));

function SidebarContent({chats, infoChatSelecionado, pessoas, setInfoChatSelecionado}) {
    const user = {
        name: 'Chat Interno',
        avatar: '',
        jobtitle: 'AMS360'
    };

    function selecionarChat(dados) {
        if (dados ?? null) {
            setInfoChatSelecionado({
                id: dados.id,
                nome: dados.nome,
                foto: dados.foto,
                online: dados.online
            })
        }
    }

    return (
        <RootWrapper>
            <Box display="flex" alignItems="flex-start" className="p-2">
                <QuestionAnswerIcon className="mt-2" style={{fontSize: 42}}/>
                <Box sx={{ml: 1.5, flex: 1}}>
                    <Box
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="space-between">
                        <Box>
                            <Typography variant="h6" noWrap>
                                {user.name}
                            </Typography>
                            <Typography variant="caption" noWrap>
                                {user.jobtitle}
                            </Typography>
                        </Box>
                        <IconButton
                            sx={{p: 1}}
                            size="small"
                            color="primary">
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Autocomplete
                className="mb-3 px-2" size="small"
                disablePortal
                onChange={(event, newValue) => {
                    selecionarChat(newValue)
                }}
                options={pessoas}
                getOptionLabel={(option) => option.nome}
                renderOption={(props, option) => (
                    <div key={option.id} className="border-bottom py-2 d-flex w-100"  {...props}>
                        <Avatar className="me-3 "
                                src={option.foto}
                                sx={{width: 30, height: 30}}/>
                        <small className="text-muted">{option.nome}</small>
                    </div>
                )}
                renderInput={(params) =>
                    <TextField  {...params} />
                }
            />

            <Box mt={2}>
                <List disablePadding component="div" className="mb-4">
                    {chats.map((dados, index) => {
                        const selecionado = infoChatSelecionado.id === dados.id
                        if (selecionado) infoChatSelecionado.online = dados.online

                        return (
                            <ListItemButton className="border-bottom" style={selecionado ? chatAtivo : {}}
                                            onClick={() => selecionarChat(dados)} key={index}>
                                <ListItemAvatar>
                                    {dados.online ?
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                            variant="dot">
                                            <Avatar sx={{width: 50, height: 50}} alt={dados.nome} src={dados.foto}/>
                                        </StyledBadge> :
                                        <StyledBadgeOffiline
                                            overlap="circular"
                                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                            variant="dot">
                                            <Avatar sx={{width: 50, height: 50}} alt={dados.nome} src={dados.foto}/>
                                        </StyledBadgeOffiline>
                                    }
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
                                    secondary={
                                        <>
                                            <DoneAllIcon color={
                                                selecionado ?
                                                    (dados.status === 'lido' ? 'info' : 'white') :
                                                    (dados.status === 'lido' ? 'info' : 'disabled')}
                                                         style={{fontSize: 14}} className="me-1"/>
                                            {dados.tipo === 'file' ?
                                                <ImageIcon style={{fontSize: 14}}/> : dados.ultima_mensagem}
                                            <small
                                                className={(selecionado ? 'text-white ' : 'text-muted ') + "d-block text-end font-italic"}>
                                                {dados.data_mensagem}
                                            </small>
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

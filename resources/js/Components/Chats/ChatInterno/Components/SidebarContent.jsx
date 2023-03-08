import {useState} from 'react';
import {
    Box,
    Typography,
    FormControlLabel,
    Switch,
    Tabs,
    Tab,
    TextField,
    IconButton,
    InputAdornment,
    Avatar,
    List,
    Button,
    Tooltip,
    Divider,
    AvatarGroup,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    lighten,
    styled
} from '@mui/material';

import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Label from './Label';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import AlarmTwoToneIcon from '@mui/icons-material/AlarmTwoTone';
import MenuItem from "@mui/material/MenuItem";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ImageIcon from '@mui/icons-material/Image';


const AvatarSuccess = styled(Avatar)(
    ({theme}) => `
          background-color: white;
          color: green;
          width: 8px;
          height: 8px;
          margin-left: auto;
          margin-right: auto;
    `
);

const MeetingBox = styled(Box)(
    ({theme}) => `
          background-color: black;
          margin: 2px 0;
          border-radius: 10};
          padding: 2;
    `
);

const RootWrapper = styled(Box)(
    ({theme}) => `
        padding: 3px;
  `
);

const ListItemWrapper = styled(ListItemButton)(
    ({theme}) => `
        // &.MuiButtonBase-root {
        //     margin: 1px 5 0;
        // }
  `
);

const chatAtivo = {
    backgroundColor: '#222222',
}
const chatAtivoColor = {
    color: 'white',
}

function SidebarContent({chats, setChatsSelecionado, chatSelecionado, setNomeChatsSelecionado, pessoas}) {
    const user = {
        name: 'Chat Interno',
        avatar: '',
        jobtitle: 'AMS360'
    };


    const tabs = [
        {value: 'all', label: 'All'},
        {value: 'unread', label: 'Unread'},
        {value: 'archived', label: 'Archived'}
    ];

    function selecionarChat(dados) {
        setChatsSelecionado(dados.id)
        setNomeChatsSelecionado(dados.nome)

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
                            {/*<SettingsTwoToneIcon fontSize="small"/>*/}
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <TextField className="mb-3 px-2" size="small" select fullWidth
                       placeholder="Pesquisar..." defaultValue=""
                       onChange={e => selecionarChat(e.target.value)}>
                {pessoas.map((option) => {
                    return (<MenuItem key={option.id} value={option}>
                        #{option.id} - {option.nome}
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
                                    <Avatar src=""/>
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

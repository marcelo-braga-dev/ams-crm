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


function SidebarContent({chats, setChatsSelecionado, chatSelecionado, setNomeChatsSelecionado}) {
    const user = {
        name: 'Chat Interno',
        avatar: '',
        jobtitle: 'AMS360'
    };

    const [currentTab, setCurrentTab] = useState('all');

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
                            <Typography variant="h5" noWrap>
                                {user.name}
                            </Typography>
                            <Typography variant="subtitle1" noWrap>
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

            <TextField
                sx={{
                    mt: 2,
                    mb: 1
                }}
                className="px-3"
                size="small"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchTwoToneIcon/>
                        </InputAdornment>
                    )
                }}
                placeholder="Pesquisar..."
            />

            <Box mt={2}>

                <List disablePadding component="div" className="mb-4">
                    {chats.map((dados, index) => {
                        console.log(dados)
                        return (
                            <ListItemButton selected={chatSelecionado === dados.id}
                                            onClick={() => selecionarChat(dados)} key={index}>
                                <ListItemAvatar>
                                    <Avatar src=""/>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{mr: 1}}
                                    primaryTypographyProps={{
                                        color: 'textPrimary',
                                        variant: 'subtitle1',
                                        noWrap: true
                                    }}
                                    secondaryTypographyProps={{
                                        color: 'textSecondary',
                                        noWrap: true
                                    }}
                                    primary={dados.nome}
                                    secondary="ultima mensagem"
                                />
                                {dados.qtd_nova > 0 &&
                                    <span className="badge rounded-pill bg-success">{dados.qtd_nova}</span>}
                            </ListItemButton>
                        )
                    })}

                    <ListItemWrapper selected/>
                </List>

            </Box>
        </RootWrapper>
    );
}

export default SidebarContent;

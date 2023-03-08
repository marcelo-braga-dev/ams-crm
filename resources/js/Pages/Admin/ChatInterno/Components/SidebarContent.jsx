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
        &.MuiButtonBase-root {
            margin: 1px 5 0;
        }
  `
);

const TabsContainerWrapper = styled(Box)(
    ({theme}) => `
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
        }

        .MuiTab-root {
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: 3px;
                font-size: 16px;
                color: black;

                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover,
            &.Mui-selected {
                color: black;
            }
        }
  `
);

function SidebarContent({chats}) {
    const user = {
        name: 'Chat Interno',
        avatar: '/static/images/avatars/1.jpg',
        jobtitle: 'AMS360'
    };

    const [currentTab, setCurrentTab] = useState('all');

    const tabs = [
        {value: 'all', label: 'All'},
        {value: 'unread', label: 'Unread'},
        {value: 'archived', label: 'Archived'}
    ];

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
                            <SettingsTwoToneIcon fontSize="small"/>
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
                {currentTab === 'all' && (
                    <List disablePadding component="div" className="mb-4">
                        {chats.map((dados, index) => {
                            return (<ListItemWrapper key={index}>
                                <ListItemAvatar>
                                    <Avatar src="/static/images/avatars/1.jpg"/>
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
                            </ListItemWrapper>)
                        })}

                        {/*<ListItemWrapper selected>*/}
                    </List>
                )}
            </Box>
        </RootWrapper>
    );
}

export default SidebarContent;

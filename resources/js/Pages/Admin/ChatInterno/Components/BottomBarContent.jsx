import {
    Avatar,
    Tooltip,
    IconButton,
    Box,
    Button,
    styled,
    InputBase,
    useTheme
} from '@mui/material';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import SpeakerNotesOutlinedIcon from '@mui/icons-material/SpeakerNotesOutlined';
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const MessageInputWrapper = styled(InputBase)(
    ({theme}) => `
    font-size: 18px;
    padding: 1px;
    width: 100%;
`
);

const Input = styled('input')({
    display: 'none'
});

function BottomBarContent() {
    const theme = useTheme();

    const user = {
        name: 'Catherine Pike',
        avatar: '/static/images/avatars/1.jpg'
    };

    return (
        <Box
            sx={{
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                p: 2
            }}
        >
            <Box flexGrow={1} display="flex" alignItems="center">
                <QuestionAnswerIcon className="mx-3"/>
                <MessageInputWrapper
                    autoFocus
                    placeholder="Escreva sua mensagem aqui..."
                    fullWidth
                />
            </Box>
            <Box>
                <Tooltip arrow placement="top" title="Choose an emoji">
                    <IconButton
                        sx={{fontSize: '16px'}}
                        color="primary"
                    >
                        😀
                    </IconButton>
                </Tooltip>
                <Input accept="image/*" id="messenger-upload-file" type="file"/>
                <Tooltip arrow placement="top" title="Attach a file">
                    <label htmlFor="messenger-upload-file">
                        <IconButton sx={{mx: 1}} color="primary" component="span">
                            <AttachFileTwoToneIcon fontSize="small"/>
                        </IconButton>
                    </label>
                </Tooltip>
                <Button startIcon={<SendTwoToneIcon/>} variant="contained">
                    Enviar
                </Button>
            </Box>
        </Box>
    );
}

export default BottomBarContent;

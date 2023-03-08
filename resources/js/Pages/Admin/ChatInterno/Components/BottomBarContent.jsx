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
import {useForm} from "@inertiajs/react";
import {useEffect} from "react";
import EmojiPicker from "emoji-picker-react";
import AttachFileIcon from "@mui/icons-material/AttachFile";

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

function BottomBarContent({chatSelecionado}) {
    const theme = useTheme();

    const {data, setData, post} = useForm({
        mensagem: '', anexo: '', destinatario: chatSelecionado
    });

    const user = {
        name: 'Catherine Pike',
        avatar: ''
    };
    useEffect(() => {
        setData('destinatario', chatSelecionado)
    }, [chatSelecionado]);

    function scroll() {
        setTimeout(() => {
            const scrollingElement = document.getElementById('mensagens');
            if (scrollingElement) {
                scrollingElement.scrollTop = scrollingElement.scrollHeight
            }
        }, 500)
    }

    useEffect(() => {
        scroll()
    }, [chatSelecionado]);

    function submit() {
        console.log(data)
        if ((data.mensagem || data.anexo) && data.destinatario) {
            post(route('admin.chat-interno.store'));
            data.mensagem = ''
            data.anexo = ''
        }
        limparCaixaMensagem()
        scroll()
    }

    function limparCaixaMensagem() {
        const input = document.getElementById('input_mensagem');
        if (input) input.value = ''
    }

    function emoji(e) {
        setData('mensagem', data.mensagem + e.emoji)
    }

    return (
        <>{data.anexo && <small className="pt-2">
            <AttachFileIcon style={{fontSize: 18}}/>
            <b>{data.anexo.name}</b>
        </small>}
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
                        value={data.mensagem}
                        autoFocus fullWidth id="input_mensagem"
                        placeholder="Escreva sua mensagem aqui..."
                        onChange={e => setData('mensagem', e.target.value)}
                    />
                </Box>
                <Box>
                    <Tooltip arrow placement="top" title="Choose an emoji" data-bs-toggle="modal"
                             data-bs-target="#modalEmoji">

                        <IconButton
                            sx={{fontSize: '16px'}}
                            color="primary"
                        >
                            😀
                        </IconButton>
                    </Tooltip>
                    <Input accept="image/*" id="messenger-upload-file" type="file"/>
                    <Tooltip arrow placement="top" title="Anexo">
                        <label htmlFor="messenger-upload-file">
                            <IconButton sx={{mx: 1}} color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file"
                                       onChange={e => setData('anexo', e.target.files[0])}/>
                                <AttachFileTwoToneIcon fontSize="small"/>
                            </IconButton>
                        </label>
                    </Tooltip>
                    <Button startIcon={<SendTwoToneIcon/>} variant="contained" autoFocus
                            onClick={submit}>
                        Enviar
                    </Button>
                </Box>
                <div className="modal fade" id="modalEmoji" tabIndex="-1" aria-labelledby="modalEmojiLabel"
                     aria-hidden="true">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <EmojiPicker onEmojiClick={emoji}/>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default BottomBarContent;

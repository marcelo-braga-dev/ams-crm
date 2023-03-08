import {
    Tooltip,
    IconButton,
    Box,
    Button,
    styled,
    InputBase,
} from '@mui/material';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
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

document.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        const btn = document.querySelector("#btn-enviar-mensagem");
        btn.click();
    }
});

function BottomBarContent({chatSelecionado, urlSubmit}) {
    const {data, setData, post} = useForm({
        mensagem: '', anexo: '', destinatario: chatSelecionado
    });

    useEffect(() => {
        setData('destinatario', chatSelecionado)
    }, [chatSelecionado]);

    function scroll() {
        const scrollingElement = document.getElementById('mensagens');
        if (scrollingElement) {
            scrollingElement.scrollTop = scrollingElement.scrollHeight
        }
        setTimeout(() => {
            const scrollingElement = document.getElementById('mensagens');
            if (scrollingElement) {
                scrollingElement.scrollTop = scrollingElement.scrollHeight
            }
        }, 5000)
    }

    useEffect(() => {
        scroll()
    }, [chatSelecionado]);

    function submit() {
        if ((data.mensagem || data.anexo) && data.destinatario) {
            post(urlSubmit);

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

    return (chatSelecionado &&
        <>
            {
                data.anexo && <small className="pt-2">
                    <AttachFileIcon style={{fontSize: 18}}/>
                    <b>{data.anexo.name}</b>
                </small>
            }
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
                    <Button startIcon={<SendTwoToneIcon/>} variant="contained" id="btn-enviar-mensagem"
                            onClick={submit}>
                        Enviar
                    </Button>
                </Box>
                <div className="modal fade" id="modalEmoji" tabIndex="-1" aria-labelledby="modalEmojiLabel"
                     aria-hidden="true">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <EmojiPicker theme="google" onEmojiClick={emoji}/>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default BottomBarContent;

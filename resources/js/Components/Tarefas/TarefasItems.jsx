import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {Stack, Typography} from "@mui/material";
import {ChatLeft, ChatLeftText, Check2Circle, Hourglass, Person, PlusCircle} from "react-bootstrap-icons";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import {router} from "@inertiajs/react";
import Switch from "@mui/material/Switch";

const TarefasItems = ({dados, alterarStatus, criarMensagem}) => {

    const [mensagemId, setMensagemId] = useState()
    const [mensagem, setMensagem] = useState()

    const adicionarMensagem = () => {
        router.post(route('admin.ferramentas.tarefas.adicionar-mensagem'), {mensagemId, mensagem}, {preserveScroll: true})
    }

    const alterarStatusItem = (id, status) => {
        router.post(route('admin.ferramentas.tarefas.alterar-status-item'), {id, status, _method: 'PUT'}, {preserveScroll: true})
    }

    router.on('success', () => {
        setMensagemId()
        setMensagem()
    })

    return (
        dados.map((item) => {
            return <CardContainer key={item.id}>
                <CardBody>
                    <Stack direction="row" spacing={2}>
                        {alterarStatus ?
                            <Switch checked={item.status === '1'}
                                    onChange={e => alterarStatusItem(item.id, e.target.checked)}/>
                            : item.status === '1' ? <Check2Circle size={22} color="green"/> : <Hourglass size={20}/>
                        }
                        <Stack spacing={0} style={{width: '100%'}}>
                            <Typography fontWeight="bold">{item.texto}</Typography>
                            {item.data_final && <Typography variant="body2">Previsão de Término: {item.data_final}</Typography>}

                            {item.mensagens.map(mensagem => (
                                <div className="row pt-2">
                                    <div className="col border p-2">
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Person size={18}/>
                                            <Typography>{mensagem.autor.nome}</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <ChatLeftText size={17}/>
                                            <Typography>{mensagem.msg}</Typography>
                                        </Stack>
                                    </div>
                                </div>
                            ))}

                            {criarMensagem && <Stack className="cursor-pointer" direction="row" alignItems="center" spacing={1} marginTop={2}
                                    onClick={() => setMensagemId(item.id)}>
                                <PlusCircle color="green" size={18}/>
                                <Typography>Mensagem</Typography>
                            </Stack>}

                            {mensagemId === item.id &&
                                <div className="row mt-2">
                                    <div className="col">
                                        <TextField fullWidth onChange={e => setMensagem(e.target.value)}/>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-success btn-sm" onClick={adicionarMensagem}>Salvar</button>
                                    </div>
                                </div>
                            }
                        </Stack>
                    </Stack>
                </CardBody>
            </CardContainer>
        })
    )
}
export default TarefasItems

import React, {useEffect} from "react";

export default function AdminNotificacoesRequest({url, setNotificacoes}) {

    async function buscaQtnNotificacoes() {

        await axios.get(url).then((res) => {
            setNotificacoes(res.data)
        }).catch(function () {
        })

        setTimeout(function () {
            buscaQtnNotificacoes();
        }, 10000)
    }

    useEffect(() => {
        setTimeout(() => buscaQtnNotificacoes(), 500);
    }, []);

    // const handleVoltar = () => {
    //     window.history.back();
    // };
}

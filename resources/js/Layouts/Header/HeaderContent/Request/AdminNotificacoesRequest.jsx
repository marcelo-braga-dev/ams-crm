import React, {useEffect, useRef} from "react";

export default function AdminNotificacoesRequest({url, setNotificacoes}) {

    const intervalRef = useRef(null);

    const buscaQtnNotificacoes = async () => {
        try {
            const res = await axios.get(url);
            setNotificacoes(res.data);
        } catch (error) {
            console.error('Erro ao buscar notificações:', error);
        }
    };

    useEffect(() => {
        buscaQtnNotificacoes();

        intervalRef.current = setInterval(() => {
            buscaQtnNotificacoes();
        }, 90000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // async function buscaQtnNotificacoes() {
    //
    //     await axios.get(url).then((res) => {
    //         setNotificacoes(res.data)
    //     }).catch(function () {
    //     })
    //
    //     setTimeout(function () {
    //         buscaQtnNotificacoes();
    //     }, 10000)
    // }
    //
    // useEffect(() => {
    //     setTimeout(() => buscaQtnNotificacoes(), 500);
    // }, []);
}

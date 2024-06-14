import {useEffect} from "react";

export default function setUltimoLoginUsuario() {

    function atualizaUltimoLogin() {
        axios.post(route('geral.usuarios.set-ultimo-login'))

        setTimeout(function () {
            atualizaUltimoLogin();
        }, 60000)
    }

    useEffect(function () {
        atualizaUltimoLogin()
    }, [])
}

import { useEffect } from "react";
import axios from "axios";

export default function useUltimoLoginUsuario() {
    const atualizaUltimoLogin = async () => {
        try {
            await axios.post(route('geral.usuarios.set-ultimo-login'));
        } catch (error) {
            console.error("Failed to update last login:", error);
        }
    };

    useEffect(() => {
        atualizaUltimoLogin();

        const intervalId = setInterval(atualizaUltimoLogin, 60000);

        return () => clearInterval(intervalId);
    }, []);
}

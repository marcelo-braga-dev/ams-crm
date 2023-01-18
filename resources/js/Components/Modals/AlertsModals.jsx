// MODAL
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import {usePage} from '@inertiajs/inertia-react';
import { useEffect } from 'react';

const MySwal = withReactContent(Swal)

function modalSucesso(msg) {
    MySwal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,

        icon: 'success',
        title: msg,
    })
}

function modalErro(msg) {
    MySwal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,

        icon: "error",
        title: msg,
    })
}
export default function ModalsAllerts() {
    const {flash} = usePage().props

    useEffect(() => {
            if (flash.sucesso) modalSucesso(flash.sucesso)
            if (flash.erro) modalErro(flash.erro)
    }, []);


}

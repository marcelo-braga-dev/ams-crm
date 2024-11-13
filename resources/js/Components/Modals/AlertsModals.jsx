import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import {Alert} from "@mui/material";
import {usePage} from "@inertiajs/react";
import {useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";

export default function ModalsAllerts() {
    const {flash, errors} = usePage().props

    if (flash.sucesso) {
        toast.success(flash.sucesso, {
            toastId: flash.sucesso, autoClose: 3000
        });
        flash.sucesso = null
    }

    if (flash.erro) {
        toast.error(flash.erro, {
            toastId: flash.erro, autoClose: false
        });
        flash.erro = null
    }

    console.log(errors)

    return <ToastContainer limit={2}/>
}

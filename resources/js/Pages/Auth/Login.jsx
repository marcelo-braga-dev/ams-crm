import React, {useEffect, useState} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, useForm} from '@inertiajs/react';
import {Grid, Stack, TextField, Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ModalsAlerts from "@/Components/Modals/AlertsModals";



export default function Login({status, canResetPassword}) {
    const {data, setData, post, errors, reset} = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <ModalsAlerts />
            <Head title="Log in"/>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className="row justify-content-center m-3">
                <div className="col-md-4 shadow p-5 pb-3 bg-white rounded">

                    {errors[0] &&
                        <div className="alert alert-danger text-white mb-4">{errors[0]}</div>}

                    <form onSubmit={submit}>
                        <div className="row">
                            <div className="col-12">
                                <TextField label="E-mail/CNPJ" size="small" fullWidth
                                           value={data.email} id="email" name="email" autoComplete="username"
                                           onChange={e => setData('email', e.target.value)}
                                           InputLabelProps={{shrink: true}}/>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-auto">
                                {errors.email && <small className="text-danger">{errors.email}</small>}
                            </div>
                        </div>
                        <div className="row justify-content-end text-right">
                            <div className="col-12">
                                <TextField label="Senha" size="small" fullWidth className="mt-1 block w-full"
                                           id="password" type="password" name="password" autoComplete="current-password"
                                           value={data.password}
                                           onChange={e => setData('password', e.target.value)}
                                           InputLabelProps={{shrink: true}}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto">
                                {errors.password && <small className="text-danger">{errors.password}</small>}
                            </div>
                        </div>

                        <Grid container alignItems="center">
                            <Grid item>
                                <Checkbox value={data.remember} size="small"
                                          onChange={e => setData('remember', e.target.checked)}/>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">Lembrar senha</Typography>
                            </Grid>
                        </Grid>

                        <div className="flex mt-4 text-center">
                            <button className="btn btn-dark">
                                Entrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}

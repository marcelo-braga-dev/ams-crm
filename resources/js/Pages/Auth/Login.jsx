import {useEffect} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import {Head, Link, useForm} from '@inertiajs/inertia-react';
import {TextField} from "@mui/material";

export default function Login({status, canResetPassword}) {
    const {data, setData, post, processing, errors, reset} = useForm({
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
            <Head title="Log in"/>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className="row justify-content-center m-3">
                <div className="col-md-4 shadow p-5 pb-3 bg-white rounded">
                    <form onSubmit={submit}>
                        <div className="row">
                            <div className="col-12">
                                <TextField label="Email" type="email" size="small" fullWidth
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
                                <TextField label="Senha" size="small" fullWidth
                                           id="password"
                                           type="password"
                                           name="password"
                                           value={data.password}
                                           className="mt-1 block w-full"
                                           autoComplete="current-password"
                                           onChange={e => setData('password', e.target.value)}
                                           InputLabelProps={{shrink: true}}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto">
                                {errors.password && <small className="text-danger">{errors.password}</small>}
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-auto">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="flexCheckDefault"
                                           value={data.remember} onChange={e => setData('remember', e.target.value)}/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Lembrar senha
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex mt-4 text-end">
                            {/*{canResetPassword && (*/}
                            {/*    <a href={route('password.request')}>*/}
                            {/*        Esqueceu sua senha?*/}
                            {/*    </a>*/}
                            {/*)}*/}

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

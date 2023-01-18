import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/inertia-react';

export default function ForgotPassword({status}) {
    const {data, setData, post, processing, errors} = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password"/>

            <div className="mb-4 text-sm text-gray-600">
                Esqueceu sua senha?<br/>
                Sem problemas. Basta nos informar seu endereço de e-mail e enviaremos um e-mail com
                um link de redefinição de senha que permitirá que você altere sua senha.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="password"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <InputError message={errors.email} className="mt-2"/>

                <div className="flex items-center justify-between mt-4">

                    <Link href={'/'}
                          className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Voltar
                    </Link>

                    <PrimaryButton className="ml-4" processing={processing}>
                        Solicitar Redefifição
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

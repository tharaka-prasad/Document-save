import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="flex min-h-screen items-center  bg-gray-50">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Welcome Back
                    </h2>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* Password */}
                        <div>
                            <InputLabel htmlFor="password" value="Password" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Remember Me */}
                        <div className="mt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked || false)
                                    }
                                />
                                <span className="text-sm text-gray-600 hover:text-gray-800">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        {/* Links */}
                        <div className="mt-4 flex justify-between text-sm">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-indigo-600 hover:text-indigo-800"
                                >
                                    Forgot password?
                                </Link>
                            )}
                            <Link
                                href={route('register')}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                Register
                            </Link>
                        </div>

                        {/* Login Button */}
                        <PrimaryButton
                            className="w-full py-2 mt-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium"
                            disabled={processing}
                        >
                            Log in
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}

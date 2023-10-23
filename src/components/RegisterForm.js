'use client';

import {useForm} from "react-hook-form";
import axios from "axios";
import {useState} from "react";
import Link from "next/link";
import {signIn} from "next-auth/react";

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const [responseMessage, setResponseMessage] = useState();

    const onSubmit = (data) => {
        axios.put('/api/register', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.success) {
                signIn('credentials', {
                    redirect: '/chat',
                    username: data.username,
                    password: data.password
                }).then()
            } else {
                setResponseMessage(response.data.message);
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-control flex flex-col gap-y-2 max-w-sm w-full'>
            <div>
                <label className="label">
                    <span className="label-text">Логин</span>
                </label>
                <input {...register("username", {
                    required: true,
                    minLength: {value: 4, message: 'Логин должен содержать больше 8 символов'},
                    maxLength: {value: 32, message: 'Логин должен содержать меньше 32 символов'},
                    pattern: {
                        value: /[a-zA-Z_\-]+/,
                        message: 'Логин может только содержать латинские буквы обеих регистров, а также цифры и \"_\", \"-\"'
                    }
                })}
                       className='input w-full'/>
            </div>

            {errors.username && <span className='text-red-500'>{errors.username.message || 'Некорректный ввод'}</span>}

            <div>
                <label className="label">
                    <span className="label-text">Пароль</span>
                </label>
                <input type='password' {...register("password", {
                    required: true,
                    minLength: {value: 8, message: 'Пароль должен содержать больше 8 символов'},
                    maxLength: {value: 32, message: 'Пароль должен содержать меньше 32 символов'}
                })}
                       className='input w-full'/>
            </div>

            {errors.password && <span className='text-red-500'>{errors.password.message || 'Некорректный ввод'}</span>}

            {responseMessage && <span className='text-red-500'>{responseMessage}</span>}

            <button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 transition-all rounded-xl mt-2 p-2'>
                Регистрация
            </button>
            <Link href='/' className='text-xs text-gray-500'>
                У Вас уже есть аккаунт?
            </Link>
        </form>
    )
}
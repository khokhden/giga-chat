'use client';

import {useForm} from "react-hook-form";
import Message from "@/components/Message";
import axios from "axios";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import {AiOutlineSend} from "react-icons/ai";

export default function Chat() {
    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const onSubmit = (data) => {
        axios.put('/api/messages', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then();
        reset();
    };

    const [messages, setMessages] = useState([]);

    const me = useSession();

    let latestMessageTimestamp = 0;

    const updateMessages = () => {
        axios.get('/api/messages', {
            params: {
                s: latestMessageTimestamp
            }
        }).then(response => {
            if (response.data.success) {
                if (response.data.messages.length > 0) {
                    for (const event of response.data.messages) {
                        if (event.timestamp > latestMessageTimestamp) {
                            latestMessageTimestamp = event.timestamp;
                        }
                        setMessages(old => {
                            setTimeout(() => {
                                document.getElementById('chat-body').scrollTop = 999999;
                            }, 50);

                            return [...old, event];
                        });
                    }
                }
            }
        })
    }

    useEffect(() => {
        if (me.status === 'unauthenticated') {
            redirect('/')
        } else if (me.status === 'authenticated') {
            if (!window.messageUpdateInterval) {
                window.messageUpdateInterval = setInterval(() => {
                    updateMessages();
                }, 1000);
                updateMessages();
            }
        }
    }, [me]);

    return (
        <>
            <div className='w-full overflow-y-scroll scrollbar-hide grow pt-14' id='chat-body'>
                {

                    messages.length ? messages.map(({author, content, timestamp, _id}) => {
                        const date = new Date(timestamp * 1000);
                        let time = date.toLocaleString();
                        time = time.substring(0, time.length - 3).replace(', ', ' ');

                        return (<Message isAuthor={author === me.data.user.name} time={time}
                                         author={author}
                                         content={content} key={_id}/>)
                    }) : (<div className='flex flex-col items-center w-full h-full justify-center'><span
                        className="loading loading-spinner loading-lg"></span></div>)
                }
            </div>

            <form className="form-control w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-row items-center gap-x-4 px-2'>
                    <div className='w-full flex flex-row items-center gap-x-3'>
                        <span
                            className="text-gray-500 rounded-full border-2 border-gray-500 px-2 text-center cursor-pointer"
                            onClick={() => document.getElementById('help_modal').showModal()}>
                            ?
                        </span>
                        <input placeholder="Как дела?"
                               className="input input-bordered w-full" {...register("content", {
                            required: true,
                            minLength: {value: 1, message: 'Сообщение должно быть не короче 1 символа'},
                            maxLength: {value: 1024, message: 'Сообщение должно быть не длиннее 1024 символов'}
                        })}/>
                    </div>

                    <button type="submit">
                        <AiOutlineSend size={38} className='hover:-translate-y-0.5 transition-all'/>
                    </button>
                </div>
            </form>

            <dialog id="help_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Команды</h3>
                    <p className="py-4"><code>/weather</code> - Получить сводку погоды 🌦️</p>
                </div>
            </dialog>
        </>
    )
}
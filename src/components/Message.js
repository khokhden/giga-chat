import Image from "next/image";
import Avatar from "../../public/avatar.jpg";

export default function Message({isAuthor, author, time, content}) {
    const isBot = author === 'Gigachat';

    return (
        <div className={`chat ${isAuthor ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                {
                    isBot ? (<div
                            className='w-10 rounded-full'>
                            <Image src={Avatar} alt='Avatar'/>
                        </div>) :
                        (<div className="avatar placeholder select-none">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                                <span className="text-xl">{author.substring(0, 2)}</span>
                            </div>
                        </div>)
                }
            </div>
            <div className="chat-header">
                {
                    isBot ? (
                        <span className='tooltip overflow-visible text-green-400'
                              data-tip='Бот'>{author}</span>) : (<>{author}</>)
                }
                <time className="text-xs opacity-50"> {time}</time>
            </div>
            <div className="chat-bubble">
                <p className='max-w-lg' style={{overflowWrap: "anywhere"}}>
                    {content}
                </p>
            </div>
        </div>
    )
}
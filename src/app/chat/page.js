import Chat from "@/components/Chat";
import {getServerSession} from "next-auth";
import LogoutButton from "@/components/LogoutButton";
import {redirect} from "next/navigation";

export default async function ChatPage() {
    const session = await getServerSession();

    if (!session) {
        redirect('/');
    }

    return (
        <>
            <div
                className='flex flex-row items-center w-full justify-between fixed top-0 max-w-3xl z-10 bg-[#151b22] p-3'>
                <div className='flex flex-row items-center gap-x-4'>
                    <div className="avatar placeholder select-none">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                            <span className="text-xl">{session.user.name.substring(0, 2)}</span>
                        </div>
                    </div>
                    <span className='font-semibold'>
                            {session.user.name}
                        </span>
                </div>
                <LogoutButton/>
            </div>
            <div className='flex flex-col w-full items-center max-w-3xl h-screen p-3 gap-y-2'>
                <Chat/>
            </div>
        </>
    )
}

import Hero from "@/components/Hero";
import Credits from "@/components/Credits";
import Link from "next/link";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

export default async function Home() {
    const session = (await getServerSession()) || {};

    if (Object.keys(session).length !== 0) {
        redirect("/chat");
    }

    return (
        <div className='flex flex-col gap-y-8 w-full items-center p-4 pt-8'>
            <Hero/>
            <div className='flex flex-col items-start w-full max-w-2xl text-center'>
                <Link href='/api/auth/signin'
                      className='w-full bg-blue-500 hover:bg-blue-600 transition-all rounded-xl mt-2 p-2'>
                    Войти
                </Link>
                <Link href='/register' className='text-xs mt-2 text-gray-500 hover:mt-1.5 transition-all px-2'>
                    У Вас ещё нет аккаунта?
                </Link>
            </div>
            <Credits/>
        </div>
    )
}

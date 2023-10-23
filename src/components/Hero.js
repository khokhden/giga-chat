import Link from "next/link";

export default function Hero() {
    return (
        <div className='flex flex-col items-center w-full gap-y-4'>
                <span className='text-7xl font-extrabold'>Привет, это - <Link href='/'
                                                                              className='bg-gradient-to-br from-blue-400 to-cyan-600 bg-clip-text text-transparent'>GigaChat</Link></span>
            <span
                className='text-slate-300 text-2xl'>Новая соц-сеть человечества, доступная для всех желающих</span>
        </div>
    )
}
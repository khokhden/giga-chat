import './globals.css'
import {Inter} from 'next/font/google'
import Provider from "@/components/Provider";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Gigachat',
    description: 'New generation social network'
}

export default function RootLayout({children}) {
    return (
        <html lang="ru">
        <body className={`${inter.className} min-h-screen w-full`}>
        <div className='flex flex-col items-center min-h-screen bg-[#151b22]'>
            <Provider>
                {children}
            </Provider>
        </div>
        </body>
        </html>
    )
}

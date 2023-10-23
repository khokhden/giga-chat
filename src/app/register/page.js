import Hero from "@/components/Hero";
import Credits from "@/components/Credits";
import RegisterForm from "@/components/RegisterForm";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

export default async function Register() {
    const session = (await getServerSession()) || {};

    if (Object.keys(session).length !== 0) {
        redirect("/chat");
    }

    return (
        <div className='flex flex-col gap-y-8 w-full items-center p-4 pt-8'>
            <Hero/>
            <RegisterForm/>
            <Credits/>
        </div>
    )
}

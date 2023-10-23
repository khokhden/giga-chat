'use client';

import {signOut} from "next-auth/react";
import {TbLogout} from "react-icons/tb";

export default function LogoutButton() {
    return (
        <TbLogout size={38} onClick={() => signOut()} className='hover:-translate-y-0.5 transition-all'/>
    )
}
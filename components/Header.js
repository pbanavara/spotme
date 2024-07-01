import Link from "next/link";
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react'

export default function Header() {
    const { data: session } = useSession()
    async function signOutFromHere(e) {
        e.preventDefault()
        await signOut()
    }
    return (
        <header className="flex justify-between text-black items-center w-full mt-0 border-b-2 pb-2 sm:px-4 px-2">
            <Link href="/" className="flex space-x-2">
                <h3 className="sm:text-5xl text-3xl font-bold ml-2 tracking-tight">
                    spotMe 
                </h3>
                <h4> beta </h4>
            </Link>
        </header>
    );
}
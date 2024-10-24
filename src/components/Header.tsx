"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { signIn, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { BiLoaderCircle } from "react-icons/bi";

export default function Header() {
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status !== "loading") {
            setInitialLoading(false);
        }
    }, [status, session]);

    return (
        <div className='fixed top-0 w-full h-[60px] bg-black border-b border-white/60 p-3 flex justify-between items-center'>
            <Link href='/'>
                <h2 className="font-bold text-xl">Ultron</h2>
            </Link>

            {initialLoading && status === "loading" ? (
                <BiLoaderCircle className="animate-spin" />
            ) : !session ? (
                <div className="__menu">
                    <Button onClick={() => signIn("google")}>Login</Button>
                </div>
            ) : (
                <Avatar className="w-10 h-10 rounded-full bg-gray-500">
                    <AvatarImage src={session.user?.image || ""} className="rounded-full" />
                    <AvatarFallback className="rounded-full bg-gray-400 text-white">
                        {session.user?.name?.charAt(0) || "?"}
                    </AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}

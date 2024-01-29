/* eslint-disable @typescript-eslint/no-unused-vars */
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from 'next/link';
// import Navbar from '../_components/Navbar';
import { getServerAuthSession } from "@/server/auth";
// import { Button } from '@/app/_components/ui/button';




export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // email-pass girisinde child client complara gecmiyor
    // ! cozum olarak email-password girisinde provider'daki 
    // ! gibi ara sayfaya (auth/provider) yonlendir
    const serverSession = await getServerAuthSession(); // * bu tum db user datasini sagliyor
    // const serverSession = await getServerSession(); // ! TODO bu importu asla kullanma- eksik data

    return (
        <>
            <div className='relative'>

                <pre>
                    {JSON.stringify(serverSession, null, 4)}
                </pre>



                {/* <Navbar session={serverSession} /> */}
                {/* <div className="container px-5 py-24 mx-auto flex flex-wrap sm:flex-nowrap"> */}
                <div className="container w-screen max-w-7xl mx-auto px-6 xl:px-0">
                    {children}
                </div>
            </div>
        </>
    )

}


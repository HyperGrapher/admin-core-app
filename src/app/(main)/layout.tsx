/* eslint-disable @typescript-eslint/no-unused-vars */
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from 'next/link';
import { getServerAuthSession } from "@/server/auth";
import { RedirectType, redirect } from 'next/navigation';



export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const serverSession = await getServerAuthSession();

    // Session yok ise (main) altindaki tum route'lari login'e yonlendirir.
    if (!serverSession?.user) redirect('/auth/login', RedirectType.replace)


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


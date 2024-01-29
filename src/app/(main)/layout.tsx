/* eslint-disable @typescript-eslint/no-unused-vars */
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from 'next/link';
import { getServerAuthSession } from "@/server/auth";
import { RedirectType, redirect } from 'next/navigation';
import Navbar from "@/components/layout/Navbar";
import SideNav from "@/components/layout/Sidenav";



export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const serverSession = await getServerAuthSession();

    // Session yok ise (main) altindaki tum route'lari login'e yonlendirir.
    if (!serverSession?.user) redirect('/auth/login', RedirectType.replace)


    return (
        <div className='relative bg-slate-100'>

            <Navbar />

            <div className="w-full flex justify-between mt-6">
                <div className="px-8 bgx-gray-900/10">
                    <SideNav />
                </div>


                <main className="mx-auto max-w-7xl w-full ml-4 text-slate-300 pr-2 xl:pr-0">
                    {children}
                </main>
            </div>
        </div>
    )

}


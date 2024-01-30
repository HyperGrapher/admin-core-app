/* eslint-disable @typescript-eslint/no-unused-vars */
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from 'next/link';
import { getServerAuthSession } from "@/server/auth";
import { RedirectType } from 'next/navigation';
import { redirect } from '@/navigation';

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
        <div className='bg-slate-100'>

            <Navbar />

            <div className="w-full flex justify-between pt-6">
                <div className="px-8 bgx-gray-900/10">
                    <SideNav />
                </div>


                <main className="mx-auto max-w-7xl w-full xbg-red-100/80">
                    <div className="mx-auto">
                    {children}

                    </div>
                </main>
            </div>
        </div>
    )

}


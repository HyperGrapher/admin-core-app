/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { type Metadata } from "next";
import { api } from "@/trpc/server";
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: "Admin | Home",
}

// http://localhost:5005/home/index
export default function Home() {



    return (
        <main className="flex gap-2 items-center mt-2">


            <section className={cn(
                'min-w-[680px] h-screen bg-slate-500/10',
                'ml-[16.5rem] <-[aside-fixed]',
                '',
            )}>

                <h1 className="text-slate-500 text-lg font-bold">Home</h1>

            </section>




        </main>
    );
}

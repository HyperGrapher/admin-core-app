/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { type Metadata } from "next";
import { api } from "@/trpc/server";
import { redirect } from 'next/navigation'

// iconly-glass-tick.svg
// iconly-glass-info.svg
// iconly-glass-paper.svg

export const metadata: Metadata = {
    title: "Admin | Home",
}

// http://localhost:5005/dashboard
export default function Overview() {

    return (
        <div className="min-h-screen opacity-0 delayed-fade-in">


            <section
                className={cn(
                    "max-w-5xl w-full flex justify-between ",
                    "px-4 ",
                )}>
                <h1 className="text-slate-500 text-xl font-bold tracking-wider"> Genel Durum</h1>

            </section>



        </div>
    );
}

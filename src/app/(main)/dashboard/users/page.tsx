/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { type Metadata } from "next";
import { api } from "@/trpc/server";
import { redirect } from 'next/navigation'
import { Mail, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

// iconly-glass-tick.svg
// iconly-glass-info.svg
// iconly-glass-paper.svg

export const metadata: Metadata = {
    title: "Admin | Home",
}

// http://localhost:5005/dashboard
export default function Users() {

    return (
        <div className="min-h-screen opacity-0 delayed-fade-in">


            <section
                className={cn(
                    "max-w-5xl w-full flex justify-between ",
                    "px-4 ",
                )}>
                <h1 className="text-slate-500 text-xl font-bold tracking-wider">Kullanıcılar</h1>

                <Button className="bg-blue-600 hover:bg-blue-700">
                    <PlusIcon className="mr-2 h-4 w-4" /> Yeni
                </Button>

            </section>



        </div>
    );
}

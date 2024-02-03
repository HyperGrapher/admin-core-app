/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { type Metadata } from "next";
import { api } from "@/trpc/server";
import { redirect } from '@/navigation';
import { Mail, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Users from "./_components/Users"
import PageHeader from "@/components/layout/PageHeader";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import { LinkButton } from "@/components/ui/link-button";


export const metadata: Metadata = {
    title: "Admin | Home",
}

// http://localhost:5005/dashboard
export default function UsersPage() {

    const translation = useTranslations('user-page');


    return (
        <div className="min-h-screen opacity-0 delayed-fade-in">



            <PageHeader title={translation("title")} />


            <div className="">
                <Users />
            </div>



        </div>
    );
}

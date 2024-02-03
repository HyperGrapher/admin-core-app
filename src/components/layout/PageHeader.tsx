import { cn } from "@/lib/utils"
import { redirect } from '@/navigation';
import { Mail, PlusIcon } from "lucide-react"
import { Link } from "@/navigation";
import { Button } from "../ui/button";
import { useState, type SetStateAction, useMemo, useEffect, type ReactNode } from 'react';


const PageHeader = ({ title, link }: {
    title: string,
    link?: ReactNode
}) => {
    return (
        <section
            className={cn(
                "max-w-5xl w-full flex items-center justify-between ",
                "px-4 ",
            )}>
            <h1 className="text-slate-500 text-xl font-bold tracking-wider">
                {title}
            </h1>

            {link ?? null}

        </section>
    )
}

export default PageHeader
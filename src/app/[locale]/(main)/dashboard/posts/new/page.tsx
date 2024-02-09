import CreatePost from "../_components/CreatePost"
import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import { api } from "@/trpc/server";
import { Mail, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/layout/PageHeader";
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import { LinkButton } from "@/components/ui/link-button";



const NewPostPage = () => {

    const translation = useTranslations('post-page');


    return (
        <div className="min-h-screen opacity-0 delayed-fade-in">

            <PageHeader title={translation("new")} />

            <CreatePost />
        </div>
    )
}

export default NewPostPage
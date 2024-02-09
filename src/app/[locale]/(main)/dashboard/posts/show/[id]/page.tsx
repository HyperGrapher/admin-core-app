import { api } from "@/trpc/react";
import { useState } from 'react';
import Loader from "@/components/layout/Loader";
import RenderedContent from "@/components/text-editor/RenderContent";
import { cn } from "@/lib/utils"
import { type Metadata } from "next";
import { redirect } from '@/navigation';
import { Mail, PlusIcon } from "lucide-react"
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { appRoutes } from "@/lib/constants";
import DetailContent from "./_components/DetailContent";


const PostDetail = ({ params }: { params: { id: string } }) => {

    const postsTranslation = useTranslations('post-page');


    return (
        <div className={cn(
            "opacity-0 delayed-fade-in",
            "",
        )}>

            <DetailContent id={params.id} />

        </div>
    )
}

export default PostDetail
"use client"
import { api } from "@/trpc/react";
import { useState } from 'react';
import Loader from "@/components/layout/Loader";
import RenderedContent from "@/components/text-editor/RenderContent";
import { cn } from "@/lib/utils"
import { type Metadata } from "next";
import { redirect } from '@/navigation';
import { Mail, PlusIcon, Edit } from "lucide-react"
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { appRoutes } from "@/lib/constants";
import { useRouter } from '@/navigation';

const DetailContent = ({ id }: { id: string }) => {

    const router = useRouter()

    const { data: post, isLoading } = api.post.getbyId.useQuery({ id });

    return (
        <div>

            <Loader title={"Yukleniyor..."} active={isLoading} />


            <div className="flex justify-between items-center">
                <h1 className="font-bold text-slate-500 text-3xl">
                    {post?.title}
                </h1>

                <Button
                    onClick={() => router.push(`${appRoutes.editPost}/${id}`)}
                    variant="default" >
                    Edit
                    <Edit className="ml-2 h-4 w-4" />
                </Button>
            </div>

            {post && (
                <div className="mt-8 bg-white rounded-lg p-6 no-code-bg">
                    <RenderedContent tiptapHTMLContent={post?.text ?? '<p><p>'} />
                </div>
            )}

        </div>
    )
}

export default DetailContent
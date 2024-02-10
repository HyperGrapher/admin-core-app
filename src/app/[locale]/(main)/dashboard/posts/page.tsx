
import PageHeader from "@/components/layout/PageHeader";
import { LinkButton } from "@/components/ui/link-button";
import { appRoutes } from "@/lib/constants";
import { PlusIcon } from "lucide-react";
import { type Metadata } from "next";
import { useTranslations } from 'next-intl';
import Posts from "./_components/Posts";

export const metadata: Metadata = {
    title: "Admin | Makaleler",
}

const PostPage = () => {

    const postsTranslation = useTranslations('post-page');


    return (
        <div className="opacity-0 delayed-fade-in">


            <PageHeader
                title={postsTranslation("title")}
                link={(
                    <LinkButton
                        href={appRoutes.newPost}
                        size={'sm'}
                        variant={"default"} >
                        <PlusIcon className="mr-2 h-4 w-4" />

                        {postsTranslation("new")}

                    </LinkButton>
                )} />

            <Posts />


        </div>
    )
}

export default PostPage
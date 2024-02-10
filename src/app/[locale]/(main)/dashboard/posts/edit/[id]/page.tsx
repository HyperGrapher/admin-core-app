import PageHeader from "@/components/layout/PageHeader";
import { useTranslations } from 'next-intl';
import CreateOrEditPost from "../../_components/CreateOrEditPost";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin | Makale Duzenle",
}


const EditPostPage = ({ params }: { params: { id: string } }) => {

    const translation = useTranslations('post-page');


    return (
        <div className="opacity-0 delayed-fade-in ">

            <PageHeader title={translation("edit")} />

            <CreateOrEditPost edit id={params.id} />
        </div>
    )
}

export default EditPostPage
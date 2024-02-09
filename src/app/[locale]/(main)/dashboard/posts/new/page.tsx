import PageHeader from "@/components/layout/PageHeader";
import { useTranslations } from 'next-intl';
import CreateOrEditPost from "../_components/CreateOrEditPost";



const NewPostPage = () => {

    const translation = useTranslations('post-page');


    return (
        <div className="opacity-0 delayed-fade-in">

            <PageHeader title={translation("new")} />

            <CreateOrEditPost />
        </div>
    )
}

export default NewPostPage
import PageHeader from "@/components/layout/PageHeader";
import { useTranslations } from 'next-intl';
import CreatePost from "../_components/CreatePost";



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
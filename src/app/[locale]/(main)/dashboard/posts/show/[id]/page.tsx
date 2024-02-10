import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import DetailContent from "./_components/DetailContent";


const PostDetail = ({ params }: { params: { id: string } }) => {

    const postsTranslation = useTranslations('post-page');


    return (
        <div className={cn(
            "opacity-0 delayed-fade-in",
            "pr-4",
        )}>

            <DetailContent id={params.id} />

        </div>
    )
}

export default PostDetail
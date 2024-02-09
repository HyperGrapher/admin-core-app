"use client"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { UploadButton } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"
import { api } from '@/trpc/react'
import { useSession } from "next-auth/react"


const SettingsPage = () => {

    const { data: session, update } = useSession();
    const { toast } = useToast();

    const { mutate: updateUserAvatar } = api.user.updateUserAvatar.useMutation();


    function onAvatarSubmit(userId: string, url: string) {


        updateUserAvatar({ userId, url }, {
            async onSuccess() {
                await update({
                    user: {
                        picture: url,
                        image: url,
                    }
                });
                toast({
                    variant: "success",
                    title: "Avatar Güncellendi",
                })
            },
            onError(error) {
                toast({
                    variant: "destructive",
                    title: "Güneclleme hatası!",
                    description: error.message
                })
            }
        })


    }

    return (
        <div className="min-h-screen flex justify-center opacity-0 delayed-fade-in">


            <div className={cn(
                "flex self-start justify-center mt-16 bg-white rounded-md w-[360px]",
                "p-8 -translate-x-10"
            )}>


                <div className="flex flex-col items-center gap-4">

                    <h2 className="font-bold text-xl text-slate-500">
                        Avatar Yukleyin
                    </h2>

                    <Avatar className='scale-150 my-4'>
                        
                        <AvatarImage src={session?.user.image ?? '/default-avatar.jpg'} />
                    </Avatar>

                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            const serverData = res[0]?.serverData
                            onAvatarSubmit(serverData?.uploadedBy ?? "", serverData?.file.url ?? "");

                        }}
                        onUploadError={(error: Error) => {
                            console.error(error.message);
                            toast({
                                variant: "destructive",
                                title: "Yükleme hatası!",
                            })
                        }}
                        content={{
                            button({ ready }) {
                                if (ready) return <div>Avatar Yükle</div>;

                                return "Hazırlanıyor...";
                            },
                            allowedContent({ ready, fileTypes, isUploading }) {
                                if (!ready) return "Kontrol ediliyor";
                                if (isUploading) return "Yükleniyor..";
                                return `En fazla 4mb ${fileTypes.join(", ")}`;
                            },
                        }}
                    />

                </div>

            </div>



        </div>
    )
}

export default SettingsPage
"use client"

import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { PiUserSwitch } from "react-icons/pi";



export function ModalActionStatus({ userId }: { userId: string }) {

    const [open, setOpen] = useState(false);

    const utils = api.useUtils();
    const { toast } = useToast()

    const { mutate: toggleUserStatus, isLoading } = api.user.toggleUserStatus.useMutation()
    const { data: user } = api.user.getUserDetail.useQuery({ userId })

    const onToggle = () => {

        toggleUserStatus({
            userId
        }, {
            async onSuccess() {
                await utils.user.getUsers.invalidate();
                toast({
                    variant: "success",
                    title: 'İşlem başarılı',

                });

                setOpen(false);

            },
            onError(error) {
                toast({
                    variant: "destructive",
                    title: "Server Hatasi",
                    description: error.message,
                })
            }
        })


    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={'sm'} className='' variant={'ghost'} title="Kullanici statusunu degistir">
                    <PiUserSwitch className="h-5 w-5 text-red-500" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg ">
                <DialogHeader>
                    <DialogTitle>
                        Kullanıcı Statüsünü Değiştir
                    </DialogTitle>
                    <DialogDescription>

                        <div className="mt-4 space-y-2">
                            <b>Kullanıcı Email:</b>
                            <p className="text-base text-blue-500">
                                {user?.email}
                            </p>
                        </div>

                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-2">

                    <DialogClose asChild>
                        <Button
                            onClick={() => null}
                            size={'sm'}
                            type="button"
                            disabled={isLoading}
                            variant="secondary">
                            Kapat
                        </Button>
                    </DialogClose>

                    <Button
                        onClick={onToggle}
                        size={'sm'} variant={"destructive"} disabled={isLoading}>
                        {isLoading && (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {user?.active ? "Pasif Yap" : "Aktif yap"}
                    </Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
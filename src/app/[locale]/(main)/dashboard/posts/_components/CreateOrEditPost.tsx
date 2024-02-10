"use client"

import Loader from "@/components/layout/Loader"
import Tiptap from "@/components/text-editor/Tiptap"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { appRoutes } from "@/lib/constants"
import { useRouter } from '@/navigation'
import { api } from '@/trpc/react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// burada belirtilen kosullara gore input'larda hata mesaji gosterilir
const formSchema = z.object({
    text: z.string().min(1, { message: "Boş gonderilemez" }).trim(),
    title: z.string().min(3, { message: "En az 3 karakter olmali" }).max(100, { message: "En fazla 100 karakter olmali" }).trim(),
    published: z.boolean().default(false),
})

const CreateOrEditPost = ({ edit, id }: { edit?: boolean, id?: string }) => {

    const { toast } = useToast();
    const utils = api.useUtils();
    const router = useRouter()

    const { mutate: createOrEditPost, isLoading } = api.post.createOrEdit.useMutation();
    const { data: post } = api.post.getbyId.useQuery({ id: id ?? '' }, {
        enabled: edit, // eger edit true ise fetch data
        refetchOnWindowFocus: false,
    });


    const form = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        resolver: zodResolver(formSchema),
        // edit yada yeni post durumuna gore input degerlerini olusturur
        defaultValues: {
            text: post?.text ?? "",
            title: post?.title ?? "",
            published: post?.published ?? false,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // ✅ "values" will be type-safe and validated.

        createOrEditPost({
            id: edit ? Number(id) : undefined,
            title: values.title,
            text: values.text,
            published: values.published,

        }, {
            async onSuccess(data) {
                // bir route ziyaret edilince bu data cache edilir.
                // invalidate ile eski data gostermeden refetch yapilir.
                await utils.post.getbyId.invalidate({ id })
                await utils.post.getAll.invalidate()

                toast({
                    variant: "success",
                    title: "Success!",
                })

                router.push(`${appRoutes.postDetail}/${data.id}`)



            },
            async onError(err) {
                toast({
                    variant: "destructive",
                    title: "Kayıt Hatası!",
                    description: err.message,
                })
            },

        })
    }


    return (
        <div className="mt-6 ml-4 pb-36">

            {/* Edit/Create durumuna gore yazilmasi gerekeni ata */}
            <Loader title={edit ? "Makale düzenleniyor..." : "Makale Oluşturuluyor..."} active={isLoading} />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-lg">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className='relative'>
                                <FormLabel htmlFor='title' className="sr-only">Title</FormLabel>
                                <FormControl >
                                    <div className='relative'>
                                        <Input
                                            className='pl-2'
                                            id="title"
                                            type="text"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            placeholder="Post Title" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage className='text-red-600/80 absolute top-11 left-2' />
                            </FormItem>


                        )}
                    />
                    <FormField
                        control={form.control}
                        name="published" // formSchema'da belirtilen deger
                        render={({ field }) => (
                            <FormItem className='relativex'>
                                <FormLabel htmlFor='published' className="sr-only">Published</FormLabel>
                                <FormControl >
                                    <div className='relativex'>

                                        <Checkbox
                                            id="published"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />

                                        <label
                                            htmlFor="published"
                                            className="text-sm pl-3 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Published
                                        </label>
                                    </div>
                                </FormControl>
                                {/** FormMessage schema'da belirtilem hata mesajlarini gosterir */}
                                <FormMessage className='text-red-600/80 absolute top-11 left-2' />
                            </FormItem>


                        )}
                    />

                    <FormField
                        control={form.control}
                        name="text"  // formSchema'da belirtilen deger
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Tiptap content={field.value} onChange={field.onChange} />
                                </FormControl>
                                {/** FormMessage schema'da belirtilem hata mesajlarini gosterir */}
                                <FormMessage className='text-red-600/80 absolute top-11 left-2' />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        {/* Edit/Create durumuna gore yazilmasi gereken */}
                        {edit ? "Edit" : "Create"}
                    </Button>
                </form>
            </Form>


        </div>
    )
}

export default CreateOrEditPost
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Tiptap from "@/components/text-editor/Tiptap"


const formSchema = z.object({
    content: z.string().min(1, {
        message: "Boş gonderilemez",
    }).trim(),
})

const CreatePost = () => {



    const form = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // ✅ "values" will be type-safe and validated.

        console.log(values)
    }



    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Text</FormLabel>
                                <FormControl>
                                    <Tiptap content={field.value} onChange={field.onChange} />
                                </FormControl>
                                {/** FormMessage schema'da belirtilem hata mesajlarini gosterir */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default CreatePost
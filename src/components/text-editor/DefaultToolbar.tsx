import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Code

} from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"
import { type Editor } from "@tiptap/react"



const DefaultToolbar = ({ editor }: { editor: Editor | null }) => {



    if (!editor) return null

    return (
        <div className={cn(
            "flex",
            "border bg-transparent rounded-md",
        )}>

            <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                    editor.chain().focus().toggleBold().run()
                }
                aria-label="Toggle bold">
                <Bold className="h-4 w-4" />
            </Toggle>


            <Toggle
                size="sm"
                pressed={editor.isActive("heading")}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                aria-label="Toggle bold">
                <Heading2 className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                    editor.chain().focus().toggleItalic().run()
                }
                aria-label="Toggle bold">
                <Italic className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                    editor.chain().focus().toggleBulletList().run()
                }
                aria-label="Toggle bold">
                <List className="h-4 w-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
                aria-label="Toggle bold">
                <ListOrdered className="h-4 w-4" />
            </Toggle>


            <Toggle
                size="sm"
                pressed={editor.isActive("codeBlock")}
                onPressedChange={() =>
                    editor.chain().focus().toggleCodeBlock().run()
                }
                aria-label="Toggle bold">
                <Code className="h-4 w-4" />
            </Toggle>

        </div>
    )
}

export default DefaultToolbar
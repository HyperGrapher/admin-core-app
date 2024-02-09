"use client"

import { cn } from '@/lib/utils';
import BulletList from '@tiptap/extension-bullet-list';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import TiptapKit from '@tiptap/starter-kit';
import js from 'highlight.js/lib/languages/javascript';
import latex from 'highlight.js/lib/languages/latex';
import ts from 'highlight.js/lib/languages/typescript';
import { common, createLowlight, } from 'lowlight';
import DefaultToolbar from './DefaultToolbar';

const lowlight = createLowlight(common);
lowlight.register({ latex })
lowlight.register({ js })
lowlight.register({ ts })

const Tiptap = ({ content, onChange }: { content: string, onChange: (richText: string) => void }) => {


    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            TiptapKit.configure(),
            CodeBlockLowlight.configure({
                lowlight,
            }),
            Heading.configure({
                HTMLAttributes: {
                    class: "text-xl font-bold",
                    levels: [2]
                }
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: "max-w-md ps-8 space-y-1 text-gray-600 list-disc",
                }
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: "max-w-md ps-8 space-y-1 text-gray-600 list-decimal",
                }
            })
        ],
        editorProps: {
            // Editor genel stilleri
            attributes: {
                class: cn(
                    "rounded-md border min-h-[250px] p-2 bg-white"
                )
            }
        },
        content,
        onUpdate({ editor }) {
            onChange(editor.getHTML())
            console.log(editor.getHTML());

        }
    })


    if (!editor) return null;


    return (
        <div className={cn(
            "flex flex-col",
        )}>


            <DefaultToolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )


}

export default Tiptap
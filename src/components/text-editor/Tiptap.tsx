"use client"

import { useEditor, EditorContent } from '@tiptap/react';
import TiptapKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight, } from 'lowlight'
import latex from 'highlight.js/lib/languages/latex';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Text from '@tiptap/extension-text'
import Document from '@tiptap/extension-document'
import { cn } from '@/lib/utils';
import DefaultToolbar from './DefaultToolbar';

// https://github.com/wooorm/lowlight

// ! TODO https://www.youtube.com/results?search_query=react.js+rich+text+editor+with+code+highlighter
// ! https://youtu.be/ml4USMIm594
// ! https://tiptap.dev/docs/editor/api/nodes/code-block-lowlight
// ! https://github.com/wooorm/lowlight


const lowlight = createLowlight(common);
lowlight.register({ latex })
lowlight.register({ js })
lowlight.register({ ts })
// const tree = lowlight.highlight('js', '"use strict";')

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
                    "rounded-md border min-h-[250px] p-2"
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
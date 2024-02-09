"use client"
import { api } from "@/trpc/react";
import { useState } from 'react';
import Loader from "@/components/layout/Loader";
import js from 'highlight.js/lib/languages/javascript';
import latex from 'highlight.js/lib/languages/latex';
import ts from 'highlight.js/lib/languages/typescript';
import { common, createLowlight, } from 'lowlight';

const lowlight = createLowlight(common);
lowlight.register({ latex })
lowlight.register({ js })
lowlight.register({ ts })
lowlight.highlightAuto("ts")

const PostDetail = ({ params }: { params: { id: string } }) => {

    const { data: post, isFetching } = api.post.getbyId.useQuery({ id: params.id });


    return (
        <div>


            <div className="a">
                {post?.title}
            </div>
            <div className="a" dangerouslySetInnerHTML={{ __html: post?.text ?? '' }}>
            </div>

        <div className="mt-4">
            {post?.text ?? '' }
        </div>


        </div>
    )
}

export default PostDetail
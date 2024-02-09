"use client"
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Adjust style as needed

const renderContentWithCodeHighlighting = (content: string) => {
    const parsedContent = ReactHtmlParser(content, {
        transform: (node, index) => {
            if (node.type === 'tag' && node.name === 'code') {
                return (
                    <SyntaxHighlighter
                        key={index}
                        language="javascript" // Define the language for code highlighting
                        style={oneDark} // Choose the desired style
                    >
                        {node?.children?.[0] && node?.children[0]?.data}
                    </SyntaxHighlighter>
                );
            }
            return undefined;
        },
    });

    return parsedContent;
};

const RenderedContent = ({ tiptapHTMLContent }: {tiptapHTMLContent: string}) => {
    return (
        <div className="rendered-content">
            {renderContentWithCodeHighlighting(tiptapHTMLContent)}
        </div>
    );
};

export default RenderedContent;
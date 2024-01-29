"use client"
import React from 'react'
import Link from 'next/link';
import { useState, type SetStateAction, useMemo, useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { HiChevronRight, HiEnvelope } from "react-icons/hi2";

type Props = {
    title: string
    data: string
    icon: ReactNode
    link: ReactNode
}

const SummaryCard = ({ title, data, icon, link }: Props) => {
    return (
        <div className={cn(
            "bg-white rounded-xl shadow-md",
            "min-w-64 w-full max-w-[22rem]  "
        )}>

            <div className="flex gap-6 px-8 py-6">

                <div className="">
                    {icon}

                </div>

                <div className="flex flex-col items-start gap-0">

                    <p className="text-slate-500 p-0">
                        {title}
                    </p>

                    <h3 className="text-slate-600 font-bold text-4xl p-0">
                        {data}
                    </h3>

                </div>

            </div>

            <hr />
            <div className={cn(
                "w-full px-2 py-2 text-slate-600 text-sm font-medium",
                // "flex items-center gap-3",
            )}>
                <div className={cn(
                    "hover:bg-slate-100 hover:shadow-sm flex gap-3 items-center w-fit",
                    "px-2 py-2 rounded-lg transition-colors"
                )}>
                    {link}

                    <HiChevronRight />

                </div>
            </div>




        </div>
    )
}

export default SummaryCard
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { type Metadata } from "next";
import { api } from "@/trpc/server";
import { redirect } from 'next/navigation'
import SummaryCard from "@/components/cards/SummaryCard";
import Image from "next/image";
import GlassTickIcon from "@/images/iconly-glass-tick.svg"
import GlassInfoIcon from "@/images/iconly-glass-info.svg"
import GlassPaperIcon from "@/images/iconly-glass-paper.svg"
import GlassDiscountIcon from "@/images/iconly-glass-discount.svg"
import Link from "next/link";

// iconly-glass-tick.svg
// iconly-glass-info.svg
// iconly-glass-paper.svg

export const metadata: Metadata = {
    title: "Admin | Home",
}
// https://ui.shadcn.com/docs/components/sheet
// http://localhost:5005/dashboard
export default function Overview() {

    return (
        <div className="min-h-screen opacity-0 delayed-fade-in">

            <section
                className={cn(
                    "max-w-5xl w-full flex justify-between ",
                    "px-4 ",
                )}>
                <h1 className="text-slate-500 text-xl font-bold tracking-wider"> Genel Durum</h1>

            </section>

            {/* <section className="flex flex-col xl:flex-row flex-wrap justify-between gap-4 md:gap-8 mt-8"> */}
            <section className="flex flex-wrap -m-4 mx-auto">
                <div className="xl:w-1/4 md:w-1/2 p-4">
                    <SummaryCard
                        title="Kullanicilar"
                        data={"11"}
                        icon={<Image src={GlassTickIcon} height={46} width={46} alt="icon" />}
                        link={<Link href={'/dashboard/users'}>Kullanicilara git</Link>}
                    />
                </div>

                <div className="xl:w-1/4 md:w-1/2 p-4">
                    <SummaryCard
                        title="Makaleler"
                        data={"30"}
                        icon={<Image src={GlassInfoIcon} height={46} width={46} alt="icon" />}
                        link={<Link href={'/dashboard/users'}>Makalelere git</Link>}
                    />

                </div>
                <div className="xl:w-1/4 md:w-1/2 p-4">
                    <SummaryCard
                        title="Ürünler"
                        data={"84"}
                        icon={<Image src={GlassPaperIcon} height={46} width={46} alt="icon" />}
                        link={<Link href={'/dashboard/users'}>Ürünlere git</Link>}
                    />
                </div>

                <div className="xl:w-1/4 md:w-1/2 p-4">

                    <SummaryCard
                        title="Siparişler"
                        data={"256"}
                        icon={<Image src={GlassDiscountIcon} height={46} width={46} alt="icon" />}
                        link={<Link href={'/dashboard/users'}>Siparişler git</Link>}
                    />
                </div>

                {/* </section> */}



            </section>
        </div >
    );
}

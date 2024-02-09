/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { type Metadata } from "next";
import { api } from "@/trpc/server";
import { redirect } from '@/navigation';
import SummaryCard from "@/components/cards/SummaryCard";
import Image from "next/image";
import GlassTickIcon from "@/images/iconly-glass-tick.svg"
import GlassInfoIcon from "@/images/iconly-glass-info.svg"
import GlassPaperIcon from "@/images/iconly-glass-paper.svg"
import GlassDiscountIcon from "@/images/iconly-glass-discount.svg"
import { Link } from "@/navigation";
import { useTranslations } from 'next-intl';
import { appRoutes } from "@/lib/constants";



export const metadata: Metadata = {
    title: "Admin | Home",
}

export default function Overview() {

    const ov = useTranslations('overview');


    return (
        <div className="min-h-screen opacity-0 delayed-fade-in">

            <section
                className={cn(
                    "max-w-5xl w-full flex justify-between ",
                    "px-4 ",
                )}>
                <h1 className="text-slate-500 text-xl font-bold tracking-wider">
                    {ov('title')}
                </h1>

            </section>

            <section className="flex flex-wrap mt-6 mx-auto">
                <div className="xl:w-1/4 md:w-1/2 p-4">
                    <SummaryCard
                        title={ov('sc_users_title')}
                        data={"11"}
                        icon={<Image src={GlassTickIcon} height={46} width={46} alt="icon" />}
                        link={<Link href={appRoutes.users}>{ov('sc_users_nav')}</Link>}
                    />
                </div>

                <div className="xl:w-1/4 md:w-1/2 p-4">
                    <SummaryCard
                        title={ov('sc_posts_title')}
                        data={"30"}
                        icon={<Image src={GlassInfoIcon} height={46} width={46} alt="icon" />}
                        link={<Link href={appRoutes.posts}>{ov('sc_posts_nav')}</Link>}
                    />

                </div>
                <div className="xl:w-1/4 md:w-1/2 p-4">
                    <SummaryCard
                        title={ov('sc_products_title')}
                        data={"84"}
                        icon={<Image src={GlassPaperIcon} height={46} width={46} alt="icon" />}
                        link={<Link href={appRoutes.users}>{ov('sc_products_nav')}</Link>}
                    />
                </div>

                <div className="xl:w-1/4 md:w-1/2 p-4">

                    <SummaryCard
                        title={ov('sc_orders_title')}
                        data={"256"}
                        icon={<Image src={GlassDiscountIcon} height={46} width={46} alt="icon" />}
                        link={<Link href={appRoutes.posts}>{ov('sc_orders_nav')}</Link>}
                    />
                </div>

            </section>
        </div >
    );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "@/components/layout/Navbar";
import SideNav from "@/components/layout/Sidenav";
import { appRoutes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { redirect } from '@/navigation';
import { getServerAuthSession } from "@/server/auth";
import { getTranslations } from 'next-intl/server';
import { RedirectType } from 'next/navigation';
import { HiDocumentText, HiHome, HiUsers } from "react-icons/hi2";

const NAV_ICON_SIZE = 22; // px

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getServerAuthSession();
    const navTranslations = await getTranslations('navigation');

    // Session yok ise (main) klasoru altindaki tum route'lari login'e yonlendirir.
    if (!session?.user) redirect(appRoutes.login, RedirectType.replace)


    return (
        <div className='bg-slate-100'>
            <Navbar />
            <div className={cn(
                "w-full flex justify-between pt-6",
            )}>
                <div className="px-8 hidden lg:block">
                    <SideNav
                        routes={[
                            {
                                href: appRoutes.overview,
                                title: navTranslations('overview'),
                                icon: <HiHome size={NAV_ICON_SIZE} />
                            },
                            {
                                href: appRoutes.users,
                                title: navTranslations('users'),
                                icon: <HiUsers size={NAV_ICON_SIZE} />
                            },
                            {
                                href: appRoutes.posts,
                                title: navTranslations('posts'),
                                icon: <HiDocumentText size={NAV_ICON_SIZE} />
                            },
                        ]}
                    />

                </div>


                <main className={cn("mx-auto max-w-7xl w-full",)}>

                    {children}

                </main>
            </div>
        </div>
    )

}


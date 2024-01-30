/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { RedirectType } from 'next/navigation';
import { redirect } from '@/navigation';
import { getServerAuthSession } from "@/server/auth";


export const metadata = {
    title: "Admin App",
    description: "Next.js admin app",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const serverSession = await getServerAuthSession();

    if (serverSession?.user.id) redirect('/dashboard/overview', RedirectType.replace)

    return (
        <div className='relative w-full'>

            <div className="absolute top-4 right-4 flex gap-4">
                <Link
                    href="/"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        ""
                    )}
                >
                    Anasayfa
                </Link>
                <Link
                    href="/auth/login"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        ""
                    )}
                >
                    Giriş Yap
                </Link>
                <Link
                    href="/auth/signup"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        ""
                    )}
                >
                    Kayit Ol
                </Link>

            </div>
            <div className="flex justify-center mt-4">
                {/* <Image priority={true} width="125" height={0} src={''} alt="logo" /> */}
            </div>
            <main className="container relative justify-center grid">
                {children}
            </main>
        </div>
    )

}


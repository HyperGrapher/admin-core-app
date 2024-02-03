"use client"
import { cn } from '@/lib/utils';
import { Link, usePathname } from '@/navigation';


export default function SideNav({ routes }: {
    routes: {
        href: string,
        title: string,
        icon: React.ReactNode
    }[]
}) {


    const currentPath = usePathname();


    return (
        <aside className={`flex flex-col gap-4 w-52 min-h-full xbg-red-500/10 text-slate-500 text-sm tracking-wider`}>


                {routes.map(route => (
                    <RouteItem
                        key={route.title}
                        currentPath={currentPath}
                        title={route.title}
                        href={route.href}
                        icon={route.icon}

                    />

                ))}


        </aside>
    )
}

const RouteItem = ({ currentPath, href, icon, title }: {
    currentPath: string,
    title: string,
    href: string,
    icon: React.ReactNode,
}) => {

    return (
        <Link prefetch={false} href={href}>
            <div className={cn(
                'flex items-center gap-6 pl-4 py-3 rounded-lg',
                {
                    'nav-active shadow-md font-medium': currentPath.startsWith(href),
                }
            )}>
                
                {icon}

                <span>
                    {title}
                </span>

            </div>
        </Link>
    )
}

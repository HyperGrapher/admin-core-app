"use client"
import { Link, usePathname } from '@/navigation';
import { HiBell, HiCreditCard, HiFolder, HiHome, HiUsers, HiEnvelope } from "react-icons/hi2";


type Props = {
    overview: string,
    users: string,
    notifications: string,
}

export default function SideNav(props: Props) {


    const path = usePathname();


    return (
        <aside className={`flex flex-col gap-4 w-52 xbg-red-500/10 text-slate-500 text-sm tracking-wider`}>

            <Link prefetch={false} href="/dashboard/overview" >
                <div className={`flex items-center gap-6 pl-4 py-3 rounded-lg ${path.startsWith('/dashboard/overview') ? 'nav-active shadow-md font-medium' : null} `}>
                    <HiHome size={22} />
                    <span className='translate-y-0.5'>
                        {props.overview}
                    </span>
                </div>
            </Link>

            <Link href="/dashboard/users">
                <div className={`flex items-center gap-6 pl-4 py-3 rounded-lg ${path.startsWith('/dashboard/users') ? 'nav-active shadow-md font-medium' : null} `}>
                    <HiUsers size={22} />
                    <span className='translate-y-0.5'>
                        {props.users}
                    </span>

                </div>
            </Link>

            <Link prefetch={false} href="/dashboard/notifications">
                <div className={`flex items-center gap-6 pl-4 py-3 rounded-lg ${path.startsWith('/dashboard/notifications') ? 'nav-active shadow-md font-medium' : null} `}>
                    <HiBell size={22} />
                    <span className='xtranslate-y-0.5'>
                        {props.notifications}
                    </span>

                </div>
            </Link>
            {/* <Link prefetch={false} href="/dashboard/contracts">
                <div className={`flex items-center gap-6 pl-4 py-3 rounded-lg ${path.startsWith('/dashboard/contracts') ? 'nav-active shadow-md font-medium' : null} `}>
                    <HiFolder size={22} />
                    <span className='translate-y-0.5'>
                        Anlaşmalar
                    </span>

                </div>
            </Link>
            <Link prefetch={false} href="/dashboard/payments">
                <div className={`flex items-center gap-6 pl-4 py-3 rounded-lg ${path.startsWith('/dashboard/payments') ? 'nav-active shadow-md font-medium' : null} `}>
                    <HiCreditCard size={22} />
                    <span className='translate-y-0.5'>
                        Ödemeler
                    </span>

                </div>
            </Link>

            <Link href="/dashboard/messages">
                <div className={`flex items-center gap-6 pl-4 py-3 rounded-lg ${path.includes('/dashboard/messages') ? 'nav-active shadow-md font-medium' : null} `}>
                    <HiEnvelope size={22} />
                    <span className='translate-y-0.5'>
                        Mesajlar
                    </span>

                </div>
            </Link> */}
        </aside>
    )
}


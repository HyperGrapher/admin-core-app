import { cn } from "@/lib/utils"
import { Loader as LoaderIcon } from "lucide-react"


const Loader = ({ title, active }: { title: string, active: boolean }) => active ? (
    <div className="absolute bxg-black/20 inset-0 z-50 h-full flex justify-center items-center ">
        <div className={cn(
            "flex flex-col self-start items-center gap-4 bg-green-400 rounded-xl",
            "p-6 mt-48 shadow-lg border-2 text-slate-100 min-w-64"
        )}>

            <h2 className="font-bold text-xl text-slate-100">
                {title}
            </h2>

            <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
        </div>

    </div>
) : null

export default Loader
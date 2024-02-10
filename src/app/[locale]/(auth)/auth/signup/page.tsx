/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import SignupForm from "../_components/SignupForm";
import { Link } from "@/navigation";


export const metadata: Metadata = {
  title: "Admin App | Kayıt Olun",
}


export default function Signup() {

  return (

    <div className="pt-16">

      <section className={cn(
        "bg-slate-200 p-8 rounded-lg",
        "shadow-md border w-full"

      )}>

        <div className={cn(
          "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",
        )}>

          <SignupForm />

        </div>

        {/* <Link
          href={"/auth/login"}
          className="rounded-full mt-8 bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          {"Login"}
        </Link> */}
      </section>

    </div>

  )

}

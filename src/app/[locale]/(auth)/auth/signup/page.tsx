/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import Link from "next/link";
import SignupForm from "../_components/SignupForm";


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
      </section>

    </div>

  )

}

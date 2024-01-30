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
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Bir Hesap Oluştur
            </h1>
            <p className="text-sm text-muted-foreground">
              Email yada sosyal medya ile kayıt olun
            </p>
          </div>
          <SignupForm />

        </div>
      </section>

    </div>

  )

}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import { type Metadata } from "next";
import Link from "next/link";
import SignupForm from "../_components/SignupForm";


export const metadata: Metadata = {
  title: "Uzmankirala | Giriş Yapın",
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
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>

    </div>

  )

}

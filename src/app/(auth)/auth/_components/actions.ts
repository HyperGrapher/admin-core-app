"use server";
import { db } from "@/server/db";
// import { redirect } from "next/navigation";

export async function checkEmail(email: string) {
  const isEmailExist = await db.user.findUnique({
    where: { email },
    select: { email: true },
  });

  // if (!em) redirect(`/auth/setup?email=${email}`);
  if (!isEmailExist) return { success: true };
  else return { success: false };
}

export async function checkLogin(email: string) {
  const user = await db.user.findUnique({
    where: { email },
    select: { email: true},
  });

  if(!user) return { success: false };
  else return { success: true };

}

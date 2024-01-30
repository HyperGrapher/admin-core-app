"use server";
import { db } from "@/server/db";

export async function checkEmailExist(email: string) {
  const user = await db.user.count({
    where: { email },
  });

  if (!user) return { isEmailExist: false };
  return { isEmailExist: true };
}

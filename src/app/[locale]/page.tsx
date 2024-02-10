import { unstable_noStore as noStore } from "next/cache";

import { getServerAuthSession } from "@/server/auth";
import { Link } from "@/navigation";

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">

        <div className="flex flex-col items-center gap-2">


          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.username}</span>}
            </p>


            {
              !session?.user ? (<>

                <Link
                  href={"/auth/signup"}
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                >
                  {"Sign up"}
                </Link>

                <Link
                  href={"/auth/login"}
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                >
                  {"Login"}
                </Link>


              </>) :
                (

                  <Link
                    href={"/dashboard/overview"}
                    className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                  >
                    dashboard
                  </Link>
                )
            }

          </div>
        </div>

      </div>
    </main>
  );
}

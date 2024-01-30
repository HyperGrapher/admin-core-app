import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/toaster"
import { getServerSession } from "next-auth";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Admin App",
  description: "Admin app with Next.js",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
  params: {locale}

}: {
  children: React.ReactNode;
  params: {locale: string};

}) {

  const session = await getServerSession();

  return (
    <html lang={locale}>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider session={session} headers={headers()}>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}


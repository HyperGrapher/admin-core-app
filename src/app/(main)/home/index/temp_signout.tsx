"use client"

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";


const Signout = () => {
    return (
        <div>
            <Button variant={'destructive'} onClick={() => signOut()}>Sign out</Button>

        </div>
    )
}

export default Signout
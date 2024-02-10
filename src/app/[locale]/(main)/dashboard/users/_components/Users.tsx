"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/trpc/react";
import { columns } from "../table/columns"
import { DataTable } from "@/components/ui/data-table"
import { useState } from 'react';
import Loader from "@/components/layout/Loader";

const Users = () => {

    // isFetching: browser'da focus degisip tekrar tab'a gelindiginde yeniden fetch yapar. (refetchOnWindowFocus)
    // isLoading: sadece initial data fetching sirasinda true olur
    const { data: users, isFetching, isLoading } = api.user.getUsers.useQuery(undefined, {
        refetchInterval: 0, // ms olarak refetch araligi, default olarak kapali
        refetchOnWindowFocus: true,
    });


    return (
        <div className="py-10 max-w-5xl w-full">

            <Loader title="Loading ..." active={isLoading} />
            <div className="bg-white rounded-lg p-3">
                {/* user datatable tekrar kullanilabilir component */}
                {users && <DataTable columns={columns} data={users} visibility={{}} />}
            </div>

        </div>

    )
}

export default Users
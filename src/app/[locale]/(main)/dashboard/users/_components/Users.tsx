"use client"

import { api } from "@/trpc/react";
import { columns } from "../table/columns"
import { DataTable } from "@/components/ui/data-table"
import { useState } from 'react';
import Loader from "@/components/layout/Loader";

const Users = () => {

    const { data: users, isFetching } = api.user.getUsers.useQuery();

    return (
        <div className="py-10 max-w-5xl w-full">

            <Loader title="Loading ..." active={isFetching} />
            {users && <DataTable columns={columns} data={users} visibility={{}} />}
        </div>

    )
}

export default Users
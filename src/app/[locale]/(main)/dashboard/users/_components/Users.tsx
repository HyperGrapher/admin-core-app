"use client"

import { api } from "@/trpc/react";
import { columns } from "../table/columns"
import { DataTable } from "@/components/ui/data-table"
import { useState } from 'react';

const Users = () => {

    const [status, setStatus] = useState(true)

    const { data: users, isFetching } = api.user.getUsers.useQuery();

    return (
        <div className="py-10 max-w-5xl w-full">
          
            {users && <DataTable columns={columns} data={users} visibility={{}} />}
        </div>

    )
}

export default Users
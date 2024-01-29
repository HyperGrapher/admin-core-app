"use client"

import { api } from "@/trpc/react";
import { columns } from "../table/columns"
import { DataTable } from "@/components/ui/data-table"
import { useState } from 'react';
// import { DataTable } from "@/components/ui/data-table";

// https://material-kit-pro-react.devias.io/dashboard/products
const Users = () => {

    const [status, setStatus] = useState(true)

    const { data: users, isFetching } = api.user.getUsers.useQuery(/* { active: status  } */);

    return (
        <div className="py-10 max-w-5xl w-full">
            <pre>
                {/* {JSON.stringify(users, null, 4 )} */}
            </pre>
            {users && <DataTable columns={columns} data={users} visibility={{}} />}
        </div>

    )
}

export default Users
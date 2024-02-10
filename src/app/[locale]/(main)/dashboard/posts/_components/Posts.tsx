"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/trpc/react";
import { columns } from "../table/columns"
import DataTable from "../table/data-table"
import { useState } from 'react';
import Loader from "@/components/layout/Loader";


function Posts() {

    const [status, setStatus] = useState("published")

    const { data, isLoading } = api.post.getAll.useQuery({ published: status === 'published' });


    return (
        <div className="py-10 max-w-5xl w-full">
            <Loader title="Loading ..." active={isLoading} />

            <div className="bg-white rounded-lg p-3">
                {/* post datatable ozellestirilmis bir component (user datatable is generic) */}

                {data && <DataTable
                    columns={columns}
                    data={data}
                    status={status}
                    onStatusFilterChange={setStatus}
                />
                }

            </div>

        </div>
    )
}

export default Posts
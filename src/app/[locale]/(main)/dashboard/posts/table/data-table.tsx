/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Dispatch, type SetStateAction, useState } from 'react'
import { api } from "@/trpc/react";
import {
    type ColumnDef,
    type VisibilityState,
    type ColumnFiltersState,
    type SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,

} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { TbSelector } from "react-icons/tb";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    onDatabaseFilterChange: Dispatch<SetStateAction<string>>
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onDatabaseFilterChange
}: DataTableProps<TData, TValue>) {

    const [status, setStatus] = useState("published")

    const onDbFilterChange = (val: string) => {

        setStatus(val)
        onDatabaseFilterChange(val)
    }

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({
            message: false,
        })


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })

    return (
        <div className="xrounded-md xborder w-full">

            <section className="flex items-center space-x-1 justify-start mb-1">


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Filtrele
                            <TbSelector className="ml-2 h-4 w-4" />

                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={status} onValueChange={onDbFilterChange}>
                            <DropdownMenuRadioItem value="draft">Draft</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="published">Published</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>


                <DropdownMenu>
                    <DropdownMenuTrigger className='self-center' asChild>
                        <Button variant="outline" className="ml-auto">
                            Hide/Show
                            <TbSelector className="ml-2 h-4 w-4" />
                        </Button>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value: any) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>

            </section>
            <div className="rounded-md border w-full">
                <Table className='w-full'>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel()?.rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className='h-[57px]' // ? min height of the row
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className='text-sm'>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Sonuç bulunumadı.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            

        </div>
    )
}

export default DataTable
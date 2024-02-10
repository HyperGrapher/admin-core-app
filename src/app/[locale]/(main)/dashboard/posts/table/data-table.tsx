"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table";
import { useState, type Dispatch, type SetStateAction } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { SearchIcon } from "lucide-react";
import { TbSelector } from "react-icons/tb";


const TextSearchFilter = ({ columnFilters, setColumnFilters }: {
    columnFilters: ColumnFiltersState,
    setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>
}) => {

    const value = (columnFilters.find(x => x.id === "title")?.value ?? "") as string;

    const onTextChange = (id: string, value: string) => setColumnFilters(
        x => x.filter(val => val.id !== id).concat({ id, value })
    )

    return (
        <>

            <SearchIcon className='absolute left-3 w-4 h-4 top-0 bottom-0 my-auto text-slate-400' />
            <Input
                className='pl-8'
                id="search"
                value={value}
                onChange={(e) => onTextChange("title", e.target.value)}
                type="text"
                placeholder="Başlıklarda Ara" />
        </>
    )
}


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    onStatusFilterChange: Dispatch<SetStateAction<string>>,
    status: string,
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onStatusFilterChange,
    status
}: DataTableProps<TData, TValue>) {

    const onStatusChange = (val: string) => {

        onStatusFilterChange(val)

    }

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([{ id: "title", value: "" }])
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
        getFilteredRowModel: getFilteredRowModel(), 
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })

    return (
        <div className="xrounded-md xborder w-full">

            <section className="flex items-center space-x-1 justify-start mb-2">


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">Filtrele
                            <TbSelector className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={status} onValueChange={onStatusChange}>
                            <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
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

                <div className="px-2 relative">
                    <TextSearchFilter
                        columnFilters={columnFilters}
                        setColumnFilters={setColumnFilters}
                    />
                </div>

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
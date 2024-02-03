"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { api } from "@/trpc/react";
import { type ColumnDef } from "@tanstack/react-table"
import {
  type User,
  type Post,
} from '@prisma/client';
// import { InputIcon, } from "@radix-ui/react-icons"
import { HiPlus, HiEnvelope } from "react-icons/hi2";
import { BiSolidFileImport, BiSolidFileExport, BiTransfer } from "react-icons/bi";
import { BiLira } from "react-icons/bi";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from 'next/link';
// import { HoverCardContract } from './_components/HoverCardContract';
// import { HoverCardDescription } from './_components/HoverCardDescription';
import { HiOutlineInformationCircle } from "react-icons/hi";
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { numberWithCommas, formatDateFromDatabaseWithHour, cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge"
import { ModalActionStatus } from '../_components/ModalActionStatus';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { PiCreditCard } from "react-icons/pi";

export const columns: ColumnDef<User>[] = [

  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row, getValue }) => {
      const username = getValue() as string
      const email = String(row.original.email)
      const image = String(row.original.image)

      return <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={image ?? '/default-avatar.jpg'} />
          <AvatarFallback>{username.slice(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className='text-sm text-slate-600 font-medium'>{username}</span>
      </div>
    }
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: (props) => {
      const val = props.getValue() as string
      return <span className='text-sm text-slate-500'>{val}</span>
    }
  },
  {
    accessorKey: "active",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Aktif
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue }) => {
      const val = getValue() as boolean
      if (val) return <Badge variant="success">Aktif</Badge>
      return <Badge variant="destructive">Pasif</Badge>

    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Tarih
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: (props) => {
      const val = props.getValue() as Date
      return <span className='text-xs text-slate-500'>{formatDateFromDatabaseWithHour(val)}</span>
    }
  },
  {
    header: "Actions",
    cell: ({ row }) => {

      const active = row.original.active
      const userId = String(row.original.id)

      return (
        <div className=''>
          <ModalActionStatus userId={userId} />
          <Drawer>
            <DrawerTrigger>
              <Button size={'sm'} className='' variant={'ghost'} title="Kullanici statusunu degistir">
                <PiCreditCard className="h-5 w-5 text-blue-500" />
              </Button>
            </DrawerTrigger>
            <Content id={userId} />
          </Drawer>

        </div>
      )


    }
  },


]


const Content = ({ id }: { id: string }) => {
  return (
    <div>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>User ID: {id}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </div>
  )
}


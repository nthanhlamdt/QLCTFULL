"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'


export default function Navbar() {
  const { setUser } = useAuth()
  return (
    <nav className='h-16 w-full bg-white shadow-sm flex justify-end items-center'>
      <Bell className='mr-4 cursor-pointer'/>
      
      <DropdownMenu>
        <DropdownMenuTrigger className='outline-none'>
          <Avatar className='mr-10 cursor-pointer '>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='mr-5'>
          <DropdownMenuLabel>Ngô Thành Lâm</DropdownMenuLabel>
          <DropdownMenuItem>Thông tin cá nhân</DropdownMenuItem>
          <DropdownMenuItem>Cài đặt</DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href='/dang-nhap'
              onClick={() => {
                localStorage.removeItem('user')
                setUser(null)
              }}
            >
              Đăng xuất
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}

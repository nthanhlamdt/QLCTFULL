'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Home() {
  const { user, logout } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Quản lý Chi tiêu Cá nhân</h1>
      {user ? (
        <div className="space-y-4">
          <p className="text-xl">Xin chào, {user.name}!</p>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/trang-chu">Quản lý Chi tiêu</Link>
            </Button>
            <Button variant="outline" onClick={logout}>Đăng xuất</Button>
          </div>
        </div>
      ) : (
        <div className="space-x-4">
          <Button asChild>
            <Link href="/dang-nhap">Đăng nhập</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dang-ky">Đăng ký</Link>
          </Button>
        </div>
      )}
    </div>
  )
}


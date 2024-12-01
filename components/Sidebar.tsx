'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ListTodo, User, DollarSign, PiggyBank, Briefcase, TrendingUp, BookOpen, Users, BarChart2, Settings, HelpCircle, Shield, MessageSquare } from 'lucide-react'

const menuItemsUser = [
  { name: 'Trang chủ', href: '/trang-chu', icon: Home },
  { name: 'Tài khoản', href: '/tai-khoan', icon: User },
  { name: 'Chi tiêu', href: '/chi-tieu', icon: DollarSign },
  {name: 'Thu nhập', href: '/thu-nhap', icon: TrendingUp},
  { name: 'Cho vay', href: '/cho-vay', icon: Briefcase },
  { name: 'Mượn nợ', href: '/muon-no', icon: ListTodo },
  { name: 'Tích lũy', href: '/tich-luy', icon: PiggyBank },
  { name: 'Phương pháp', href: '/phuong-phap', icon: BookOpen },
]

const menuItemsAdmin = [
  { name: 'Doashboard', href: '/admin/doashboard', icon: Home },
  { name: 'Quản lý người dùng', href: '/admin/quan-ly-nguoi-dung', icon: Users },
  { name: 'Thống kê & báo cáo', href: '/admin/thong-ke-bao-cao', icon: BarChart2 },
  {name: 'Quản lý giao dịch', href: '/admin/quan-ly-giao-dich', icon: DollarSign},
  { name: 'Cấu hình hệ thống', href: '/admin/cau-hinh-he-thong', icon: Settings },
  { name: 'Quản lý nội dung', href: '/admin/quan-ly-noi-dung', icon: HelpCircle },
  { name: 'Bảo mật & nhật kí', href: '/admin/bao-mat-nhat-ky', icon: Shield },
  { name: 'Quản lý phương pháp', href: '/admin/quan-ly-phuong-phap', icon: MessageSquare },
]

export default function Sidebar({ user }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white shadow-md">
      <nav className="h-screen flex flex-col">
        <div className="p-4 text-xl font-bold">Finance App</div>
        <ul className="flex-1 overflow-y-auto">
          {user.role === 'admin' ? 
            (
              menuItemsAdmin.map((item) => (
              <Link key={item.name} href={item.href} >
                <li  className="mb-1">
                  <div 
                    className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer ${pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) ? 'bg-gray-100' : ''}`}
                  >
                    {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                    <span className="flex-grow">
                      {item.name}
                    </span>
                  </div>
                </li>
              </Link>
              ))):
            (menuItemsUser.map((item) => (
            <Link key={item.name} href={item.href} >
              <li  className="mb-1">
                <div 
                  className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer ${pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) ? 'bg-gray-100' : ''}`}
                >
                  {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                  <span className="flex-grow">
                    {item.name}
                  </span>
                </div>
              </li>
            </Link>
          )))
          }
        </ul>
      </nav>
    </aside>
  )
}


'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link'
import { AuthLayout } from '@/components/AuthLayout'
import { User, Mail, Lock, Loader2 } from 'lucide-react'

const signUpSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const { register: authRegister } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true)
    try {
      await authRegister(data.name, data.email, data.password)
      toast({
        title: "Đăng ký thành công!",
        description: "Chào mừng bạn đến với ứng dụng Quản lý Chi tiêu.",
      })
      router.push('/trang-chu')
    } catch (error) {
      toast({
        title: "Đăng ký thất bại",
        description: "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Đăng ký tài khoản mới</h2>
          <p className="mt-2 text-sm text-gray-600">
            Hoặc{' '}
            <Link href="/dang-nhap" className="font-medium text-indigo-600 hover:text-indigo-500">
              đăng nhập nếu đã có tài khoản
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Họ tên
            </Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <Input
                id="name"
                type="text"
                {...register('name')}
                className="pl-10 block w-full sm:text-sm"
                placeholder="Nguyễn Văn A"
              />
            </div>
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="pl-10 block w-full sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className="pl-10 block w-full sm:text-sm"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className="pl-10 block w-full sm:text-sm"
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng ký...
                </>
              ) : (
                'Đăng ký'
              )}
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}


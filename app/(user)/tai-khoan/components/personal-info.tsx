'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PersonalInfo() {
  const [user, setUser] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    birthdate: '1990-01-01',
    avatar: '/placeholder.svg?height=100&width=100'
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Ở đây bạn sẽ gửi dữ liệu cập nhật đến backend
    console.log('Thông tin cá nhân đã cập nhật:', user)
    alert('Thông tin cá nhân đã được cập nhật thành công!')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin cá nhân</CardTitle>
        <CardDescription>Cập nhật thông tin cá nhân của bạn tại đây.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button type="button">Thay đổi ảnh đại diện</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input 
                id="name" 
                value={user.name} 
                onChange={(e) => setUser({...user, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input 
                id="phone" 
                value={user.phone} 
                onChange={(e) => setUser({...user, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthdate">Ngày sinh</Label>
              <Input 
                id="birthdate" 
                type="date" 
                value={user.birthdate} 
                onChange={(e) => setUser({...user, birthdate: e.target.value})}
              />
            </div>
          </div>
          <Button type="submit">Lưu thay đổi</Button>
        </form>
      </CardContent>
    </Card>
  )
}


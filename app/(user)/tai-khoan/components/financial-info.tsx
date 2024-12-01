'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SecuritySettings() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false)

  const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Here you would typically send the new password to your backend
    console.log('Password change requested')
    // Show a success message
    alert('Mật khẩu đã được thay đổi thành công!')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bảo mật tài khoản</CardTitle>
        <CardDescription>Quản lý cài đặt bảo mật cho tài khoản của bạn.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
            <Input id="current-password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Mật khẩu mới</Label>
            <Input id="new-password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
            <Input id="confirm-password" type="password" required />
          </div>
          <Button type="submit">Thay đổi mật khẩu</Button>
        </form>

        <div className="flex items-center space-x-2">
          <Switch
            id="2fa"
            checked={twoFAEnabled}
            onCheckedChange={setTwoFAEnabled}
          />
          <Label htmlFor="2fa">Bật xác thực hai yếu tố (2FA)</Label>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Lịch sử đăng nhập</h3>
          {/* Here you would typically map over a list of login history items */}
          <div className="space-y-2">
            <p>Hà Nội, Việt Nam - Chrome trên Windows - 2023-06-15 14:30</p>
            <p>TP.HCM, Việt Nam - Safari trên iOS - 2023-06-14 09:15</p>
          </div>
        </div>

        <Button variant="outline">Đăng xuất khỏi tất cả thiết bị khác</Button>
      </CardContent>
    </Card>
  )
}


'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function AccountInfo() {
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [twoFAEnabled, setTwoFAEnabled] = useState(false)

  const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Ở đây bạn sẽ gửi yêu cầu thay đổi mật khẩu đến backend
    console.log('Yêu cầu thay đổi mật khẩu:', password)
    alert('Mật khẩu đã được thay đổi thành công!')
    setPassword({ current: '', new: '', confirm: '' })
  }

  const handleTwoFAChange = (checked: boolean) => {
    setTwoFAEnabled(checked)
    // Ở đây bạn sẽ gửi yêu cầu bật/tắt 2FA đến backend
    console.log('Trạng thái 2FA:', checked)
    alert(checked ? 'Xác thực hai yếu tố đã được bật' : 'Xác thực hai yếu tố đã được tắt')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin tài khoản</CardTitle>
        <CardDescription>Quản lý bảo mật tài khoản của bạn tại đây.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
            <Input 
              id="current-password" 
              type="password" 
              value={password.current}
              onChange={(e) => setPassword({...password, current: e.target.value})}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Mật khẩu mới</Label>
            <Input 
              id="new-password" 
              type="password" 
              value={password.new}
              onChange={(e) => setPassword({...password, new: e.target.value})}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
            <Input 
              id="confirm-password" 
              type="password" 
              value={password.confirm}
              onChange={(e) => setPassword({...password, confirm: e.target.value})}
              required 
            />
          </div>
          <Button type="submit">Thay đổi mật khẩu</Button>
        </form>

        <div className="flex items-center space-x-2">
          <Switch
            id="2fa"
            checked={twoFAEnabled}
            onCheckedChange={handleTwoFAChange}
          />
          <Label htmlFor="2fa">Bật xác thực hai yếu tố (2FA)</Label>
        </div>
      </CardContent>
    </Card>
  )
}


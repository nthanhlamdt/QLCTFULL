'use client'

import { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    newTransaction: true,
    budgetExceeded: true,
    periodicReport: false
  })
  const [notificationChannel, setNotificationChannel] = useState('email')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cài đặt thông báo</CardTitle>
        <CardDescription>Quản lý cách bạn nhận thông báo từ ứng dụng.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="new-transaction">Giao dịch mới</Label>
            <Switch
              id="new-transaction"
              checked={notifications.newTransaction}
              onCheckedChange={(checked) => setNotifications({...notifications, newTransaction: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="budget-exceeded">Vượt ngân sách</Label>
            <Switch
              id="budget-exceeded"
              checked={notifications.budgetExceeded}
              onCheckedChange={(checked) => setNotifications({...notifications, budgetExceeded: checked})}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="periodic-report">Báo cáo chi tiêu định kỳ</Label>
            <Switch
              id="periodic-report"
              checked={notifications.periodicReport}
              onCheckedChange={(checked) => setNotifications({...notifications, periodicReport: checked})}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Kênh nhận thông báo</Label>
          <RadioGroup value={notificationChannel} onValueChange={setNotificationChannel}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sms" id="sms" />
              <Label htmlFor="sms">SMS</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="app" id="app" />
              <Label htmlFor="app">Thông báo ứng dụng</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}


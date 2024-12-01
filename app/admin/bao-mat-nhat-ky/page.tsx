"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function TransactionReportSettings() {
  const [minTransaction, setMinTransaction] = useState([0])
  const [maxTransaction, setMaxTransaction] = useState([1000000])
  const [autoTransactions, setAutoTransactions] = useState(false)
  const [reportFrequency, setReportFrequency] = useState("weekly")
  const [reportEmail, setReportEmail] = useState(true)
  const [showTransactions, setShowTransactions] = useState(true)
  const [showSummary, setShowSummary] = useState(true)
  const [showCharts, setShowCharts] = useState(true)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Cài đặt giao dịch và báo cáo</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cài đặt giao dịch</CardTitle>
          <CardDescription>Quản lý các quy định về giao dịch trong hệ thống.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Mức giao dịch tối thiểu</Label>
            <Slider
              value={minTransaction}
              onValueChange={setMinTransaction}
              max={1000000}
              step={1000}
            />
            <div className="text-sm text-muted-foreground">
              {minTransaction[0].toLocaleString()} VND
            </div>
          </div>
          <div className="space-y-2">
            <Label>Mức giao dịch tối đa</Label>
            <Slider
              value={maxTransaction}
              onValueChange={setMaxTransaction}
              max={10000000}
              step={10000}
            />
            <div className="text-sm text-muted-foreground">
              {maxTransaction[0].toLocaleString()} VND
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-transactions"
              checked={autoTransactions}
              onCheckedChange={setAutoTransactions}
            />
            <Label htmlFor="auto-transactions">Bật giao dịch tự động</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cài đặt báo cáo</CardTitle>
          <CardDescription>Quản lý cách thức gửi và hiển thị báo cáo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tần suất gửi báo cáo</Label>
            <RadioGroup value={reportFrequency} onValueChange={setReportFrequency}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily">Hàng ngày</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="weekly" />
                <Label htmlFor="weekly">Hàng tuần</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Hàng tháng</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="report-email"
              checked={reportEmail}
              onCheckedChange={setReportEmail}
            />
            <Label htmlFor="report-email">Gửi báo cáo qua email</Label>
          </div>
          <div className="space-y-2">
            <Label>Thông tin hiển thị trong báo cáo</Label>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-transactions" 
                  checked={showTransactions}
                  onCheckedChange={setShowTransactions}
                />
                <label
                  htmlFor="show-transactions"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Danh sách giao dịch
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-summary"
                  checked={showSummary}
                  onCheckedChange={setShowSummary}
                />
                <label
                  htmlFor="show-summary"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Tổng quan tài chính
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-charts"
                  checked={showCharts}
                  onCheckedChange={setShowCharts}
                />
                <label
                  htmlFor="show-charts"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Biểu đồ phân tích
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline">Hủy thay đổi</Button>
        <Button>Lưu cài đặt</Button>
      </div>
    </div>
  )
}
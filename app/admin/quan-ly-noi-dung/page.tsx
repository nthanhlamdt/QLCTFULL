"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Checkbox } from '@/components/ui/checkbox'

const languages = [
  { label: "English", value: "en" },
  { label: "Vietnamese", value: "vi" },
  { label: "Japanese", value: "ja" },
]

const timezones = [
  { label: "Pacific Time (PT)", value: "America/Los_Angeles" },
  { label: "Eastern Time (ET)", value: "America/New_York" },
  { label: "Coordinated Universal Time (UTC)", value: "UTC" },
  { label: "Central European Time (CET)", value: "Europe/Paris" },
  { label: "Japan Standard Time (JST)", value: "Asia/Tokyo" },
  { label: "Vietnam Standard Time (VST)", value: "Asia/Ho_Chi_Minh" },
]

const currencies = [
  { label: "US Dollar ($)", value: "USD" },
  { label: "Euro (€)", value: "EUR" },
  { label: "Japanese Yen (¥)", value: "JPY" },
  { label: "British Pound (£)", value: "GBP" },
  { label: "Vietnamese Dong (₫)", value: "VND" },
]

export default function SystemConfiguration() {
  const [language, setLanguage] = useState("en")
  const [timezone, setTimezone] = useState("UTC")
  const [currency, setCurrency] = useState("USD")
  const [systemName, setSystemName] = useState("My Expense Management System")
  const [systemDescription, setSystemDescription] = useState("A comprehensive system for managing personal and business expenses.")
  const [contactEmail, setContactEmail] = useState("support@expensesystem.com")
  const [contactPhone, setContactPhone] = useState("+1 (555) 123-4567")
  const [minTransaction, setMinTransaction] = useState([0])
  const [maxTransaction, setMaxTransaction] = useState([1000000])
  const [autoTransactions, setAutoTransactions] = useState(false)
  const [reportFrequency, setReportFrequency] = useState("weekly")
  const [reportEmail, setReportEmail] = useState(true)
  const [primaryColor, setPrimaryColor] = useState("#007bff")
  const [secondaryColor, setSecondaryColor] = useState("#6c757d")
  const [font, setFont] = useState("Inter")

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Cấu hình hệ thống</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Cài đặt chung</TabsTrigger>
          <TabsTrigger value="system-info">Thông tin hệ thống</TabsTrigger>
          <TabsTrigger value="transactions">Cài đặt giao dịch</TabsTrigger>
          <TabsTrigger value="reports">Cài đặt báo cáo</TabsTrigger>
          <TabsTrigger value="roles">Quyền và vai trò</TabsTrigger>
          <TabsTrigger value="ui">Giao diện</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt chung</CardTitle>
              <CardDescription>Cấu hình ngôn ngữ, múi giờ, và định dạng tiền tệ.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Ngôn ngữ mặc định</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Múi giờ</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Chọn múi giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Định dạng tiền tệ</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Chọn định dạng tiền tệ" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((cur) => (
                      <SelectItem key={cur.value} value={cur.value}>
                        {cur.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo hệ thống</Label>
                <Input id="logo" type="file" accept="image/*" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system-info">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin hệ thống</CardTitle>
              <CardDescription>Quản lý thông tin cơ bản của hệ thống.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-name">Tên hệ thống</Label>
                <Input
                  id="system-name"
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="system-description">Mô tả hệ thống</Label>
                <Textarea
                  id="system-description"
                  value={systemDescription}
                  onChange={(e) => setSystemDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email liên hệ</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Số điện thoại liên hệ</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
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
                  {minTransaction[0].toLocaleString()} {currency}
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
                  {maxTransaction[0].toLocaleString()} {currency}
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
        </TabsContent>

        <TabsContent value="reports">
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
                    <Checkbox id="show-transactions" />
                    <label
                      htmlFor="show-transactions"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Danh sách giao dịch
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="show-summary" />
                    <label
                      htmlFor="show-summary"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Tổng quan tài chính
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="show-charts" />
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
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Quyền và vai trò</CardTitle>
              <CardDescription>Quản lý các cấp độ quyền và vai trò trong hệ thống.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Vai trò</Label>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Admin</span>
                    <Button variant="outline" size="sm">Chỉnh sửa quyền</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Moderator</span>
                    <Button variant="outline" size="sm">Chỉnh sửa quyền</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">User</span>
                    <Button variant="outline" size="sm">Chỉnh sửa quyền</Button>
                  </div>
                </div>
              </div>
              <Button>Thêm vai trò mới</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ui">
          <Card>
            <CardHeader>
              <CardTitle>Giao diện</CardTitle>
              <CardDescription>Tùy chỉnh giao diện người dùng của hệ thống.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Màu chủ đạo</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="primary-color"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-12 p-1"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-grow"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary-color">Màu phụ</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="secondary-color"
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-12 h-12 p-1"
                  />
                  <Input
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="flex-grow"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="font">Font chữ</Label>
                <Select value={font} onValueChange={setFont}>
                  <SelectTrigger id="font">
                    <SelectValue placeholder="Chọn font chữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Lato">Lato</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline">Hủy thay đổi</Button>
        <Button>Lưu cấu hình</Button>
      </div>
    </div>
  )
}
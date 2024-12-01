"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

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

export default function GeneralSettings() {
  const [language, setLanguage] = useState("en")
  const [timezone, setTimezone] = useState("UTC")
  const [currency, setCurrency] = useState("USD")
  const [systemName, setSystemName] = useState("My Expense Management System")
  const [systemDescription, setSystemDescription] = useState("A comprehensive system for managing personal and business expenses.")
  const [contactEmail, setContactEmail] = useState("support@expensesystem.com")
  const [contactPhone, setContactPhone] = useState("+1 (555) 123-4567")

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Cài đặt chung</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cài đặt cơ bản</CardTitle>
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
        </CardContent>
      </Card>

      <Card className="mb-6">
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

      <Card>
        <CardHeader>
          <CardTitle>Logo hệ thống</CardTitle>
          <CardDescription>Tải lên logo cho hệ thống của bạn.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="logo">Logo hệ thống</Label>
            <Input id="logo" type="file" accept="image/*" />
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
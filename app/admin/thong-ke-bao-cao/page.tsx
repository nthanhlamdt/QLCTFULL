"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BarChart, Bar, 
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts'
import { Download, TrendingUp, Users, Wallet, ArrowUpRight, ArrowDownRight, CalendarIcon } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const monthlyData = [
  { month: 'T1', users: 1200, savings: 150000000, expenses: 120000000 },
  { month: 'T2', users: 1350, savings: 180000000, expenses: 130000000 },
  { month: 'T3', users: 1500, savings: 200000000, expenses: 150000000 },
  { month: 'T4', users: 1800, savings: 250000000, expenses: 180000000 },
  { month: 'T5', users: 2000, savings: 300000000, expenses: 200000000 },
  { month: 'T6', users: 2200, savings: 350000000, expenses: 220000000 },
]

const categoryData = [
  { name: 'Ăn uống', value: 35000000, color: '#FF6384' },
  { name: 'Di chuyển', value: 25000000, color: '#36A2EB' },
  { name: 'Mua sắm', value: 40000000, color: '#FFCE56' },
  { name: 'Giải trí', value: 20000000, color: '#4BC0C0' },
  { name: 'Hóa đơn', value: 30000000, color: '#9966FF' },
]

const savingsData = [
  { name: 'Quỹ khẩn cấp', value: 50000000, color: '#FF6384' },
  { name: 'Tiết kiệm hưu trí', value: 150000000, color: '#36A2EB' },
  { name: 'Mua nhà', value: 200000000, color: '#FFCE56' },
  { name: 'Du lịch', value: 30000000, color: '#4BC0C0' },
  { name: 'Đầu tư', value: 100000000, color: '#9966FF' },
]

export default function AdminStatistics() {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Thống kê & Báo cáo</h1>
          <p className="text-muted-foreground">
            Tổng quan về hoạt động của người dùng và tài chính
          </p>
        </div>
        <div className="flex gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Theo ngày</SelectItem>
              <SelectItem value="week">Theo tuần</SelectItem>
              <SelectItem value="month">Theo tháng</SelectItem>
              <SelectItem value="year">Theo năm</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,200</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              +12% so với tháng trước
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng chi tiêu</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">220,000,000 ₫</div>
            <div className="flex items-center text-sm text-red-600">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              +8% so với tháng trước
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng tiết kiệm</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">350,000,000 ₫</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              +15% so với tháng trước
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ tiết kiệm</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">37%</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="mr-1 h-4 w-4" />
              +5% so với tháng trước
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="expenses">Chi tiêu</TabsTrigger>
          <TabsTrigger value="savings">Tiết kiệm</TabsTrigger>
          <TabsTrigger value="users">Người dùng</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Xu hướng tổng quan</CardTitle>
                <CardDescription>
                  Biểu đồ thể hiện xu hướng người dùng, chi tiêu và tiết kiệm theo thời gian
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="users"
                        stroke="#8884d8"
                        name="Người dùng"
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="savings"
                        stroke="#82ca9d"
                        name="Tiết kiệm"
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="expenses"
                        stroke="#ffc658"
                        name="Chi tiêu"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Chi tiêu theo danh mục</CardTitle>
                <CardDescription>
                  Phân bổ chi tiêu theo các danh mục khác nhau
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chi tiêu theo tháng</CardTitle>
                <CardDescription>
                  Biểu đồ thể hiện chi tiêu theo từng tháng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="expenses" fill="#ffc658" name="Chi tiêu" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="savings">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tiết kiệm theo mục tiêu</CardTitle>
                <CardDescription>
                  Phân bổ tiết kiệm theo các mục tiêu khác nhau
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={savingsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {savingsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tiết kiệm theo tháng</CardTitle>
                <CardDescription>
                  Biểu đồ thể hiện tiết kiệm theo từng tháng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="savings" fill="#82ca9d" name="Tiết kiệm" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tăng trưởng người dùng</CardTitle>
                <CardDescription>
                  Biểu đồ thể hiện số lượng người dùng theo thời gian
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#8884d8"
                        name="Người dùng"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Thống kê người dùng</CardTitle>
                  <CardDescription>Chi tiết về hoạt động người dùng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Người dùng mới</p>
                        <p className="text-2xl font-bold">245</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                        +22%
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Người dùng hoạt động</p>
                        <p className="text-2xl font-bold">1,890</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                        +15%
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Tỷ lệ duy trì</p>
                        <p className="text-2xl font-bold">85%</p>
                      </div>
                      <div className="flex items-center text-red-600">
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                        -2%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hoạt động người dùng</CardTitle>
                  <CardDescription>Thống kê hoạt động trong tháng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Giao dịch</p>
                        <p className="text-2xl font-bold">15,245</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                        +18%
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Mục tiêu đạt được</p>
                        <p className="text-2xl font-bold">458</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                        +32%
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Đánh giá & Phản hồi</p>
                        <p className="text-2xl font-bold">890</p>
                      </div>
                      <div className="flex items-center text-green-600">
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                        +12%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


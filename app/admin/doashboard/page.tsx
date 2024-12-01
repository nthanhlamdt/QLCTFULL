"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, CreditCard, DollarSign, AlertTriangle, Search, HelpCircle } from 'lucide-react'

// Mock data
const systemOverview = {
  totalUsers: 10000,
  totalTransactions: 50000,
  monthlyIncome: 1000000000,
  monthlyExpense: 800000000,
  activeAccounts: 9500,
  lockedAccounts: 500,
  systemBalance: 200000000
}

const cashFlowData = [
  { name: 'T1', income: 800000000, expense: 700000000 },
  { name: 'T2', income: 900000000, expense: 750000000 },
  { name: 'T3', income: 950000000, expense: 800000000 },
  { name: 'T4', income: 1000000000, expense: 800000000 },
  { name: 'T5', income: 1100000000, expense: 900000000 },
  { name: 'T6', income: 1000000000, expense: 800000000 },
]

const expenseCategories = [
  { name: 'Ăn uống', value: 300000000 },
  { name: 'Đi lại', value: 150000000 },
  { name: 'Mua sắm', value: 100000000 },
  { name: 'Giải trí', value: 80000000 },
  { name: 'Giáo dục', value: 120000000 },
  { name: 'Khác', value: 50000000 },
]

const userStatusData = [
  { name: 'Hoạt động', value: 9500 },
  { name: 'Không hoạt động', value: 400 },
  { name: 'Bị khóa', value: 100 },
]

const recentTransactions = [
  { id: 1, user: 'Nguyễn Văn A', type: 'Thu nhập', amount: 5000000, date: '2023-06-20' },
  { id: 2, user: 'Trần Thị B', type: 'Chi tiêu', amount: -1000000, date: '2023-06-19' },
  { id: 3, user: 'Lê Văn C', type: 'Thu nhập', amount: 3000000, date: '2023-06-18' },
  { id: 4, user: 'Phạm Thị D', type: 'Chi tiêu', amount: -500000, date: '2023-06-17' },
  { id: 5, user: 'Hoàng Văn E', type: 'Thu nhập', amount: 2000000, date: '2023-06-16' },
]

const newUsers = [
  { id: 1, name: 'Nguyễn Thị F', email: 'nguyenthif@example.com', date: '2023-06-20' },
  { id: 2, name: 'Trần Văn G', email: 'tranvang@example.com', date: '2023-06-19' },
  { id: 3, name: 'Lê Thị H', email: 'lethih@example.com', date: '2023-06-18' },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d']

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMetric, setSelectedMetric] = useState("totalUsers")

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Bảng điều khiển quản trị</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemOverview.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +20% so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số giao dịch</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemOverview.totalTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +15% so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thu nhập tháng này</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemOverview.monthlyIncome.toLocaleString()} ₫</div>
            <p className="text-xs text-muted-foreground">
              +10% so với tháng trước
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chi tiêu tháng này</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemOverview.monthlyExpense.toLocaleString()} ₫</div>
            <p className="text-xs text-muted-foreground">
              +5% so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mb-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Dòng tiền theo thời gian</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#8884d8" name="Thu nhập" />
                <Line type="monotone" dataKey="expense" stroke="#82ca9d" name="Chi tiêu" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Phân bổ chi tiêu theo danh mục</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Giao dịch gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Ngày</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>
                      <Badge variant={transaction.type === 'Thu nhập' ? 'default' : 'secondary'}>
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                      {transaction.amount.toLocaleString()} ₫
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Người dùng mới</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Ngày đăng ký</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Phân bổ người dùng theo trạng thái</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={userStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {userStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Thông báo & Cảnh báo</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Cảnh báo</AlertTitle>
              <AlertDescription>
                Phát hiện giao dịch bất thường từ người dùng ID: 1234
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Chức năng nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Input
                placeholder="Tìm kiếm người dùng, giao dịch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button>
                <Search className="mr-2 h-4 w-4" /> Tìm kiếm
              </Button>
              <Button variant="outline">Quản lý người dùng</Button>
              <Button variant="outline">Quản lý giao dịch</Button>
              <Button variant="outline">Quản lý danh mục</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Báo cáo nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Chi tiêu trung bình/người dùng:</span> 2,000,000 ₫
              </div>
              <div>
                <span className="font-medium">Tốc độ xử lý giao dịch:</span> 0.5 giây
              </div>
              <div>
                <span className="font-medium">Tình trạng hệ thống:</span> <Badge>Hoạt động tốt</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tùy chỉnh hiển thị</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn chỉ số hiển thị" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="totalUsers">Tổng số người dùng</SelectItem>
                  <SelectItem value="totalTransactions">Tổng số giao dịch</SelectItem>
                  <SelectItem value="monthlyIncome">Thu nhập tháng</SelectItem>
                  <SelectItem value="monthlyExpense">Chi tiêu tháng</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-2xl font-bold">
                {selectedMetric === 'totalUsers' && systemOverview.totalUsers.toLocaleString()}
                {selectedMetric === 'totalTransactions' && systemOverview.totalTransactions.toLocaleString()}
                {selectedMetric === 'monthlyIncome' && `${systemOverview.monthlyIncome.toLocaleString()} ₫`}
                {selectedMetric === 'monthlyExpense' && `${systemOverview.monthlyExpense.toLocaleString()} ₫`}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hệ thống trợ giúp</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <HelpCircle className="h-4 w-4" />
            <span>Hướng dẫn sử dụng nhanh cho admin mới</span>
          </div>
          <Button className="mt-2" variant="link">Truy cập trung tâm trợ giúp</Button>
        </CardContent>
      </Card>
    </div>
  )
}
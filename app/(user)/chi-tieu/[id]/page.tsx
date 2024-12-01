/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Pencil } from 'lucide-react'
import { format, subMonths, startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock data for demonstration
const generateMockData = (startDate: Date, endDate: Date) => {
  let currentDate = startDate;
  const data = [];
  while (currentDate <= endDate) {
    data.push({
      date: format(currentDate, 'yyyy-MM-dd'),
      amount: Math.floor(Math.random() * 100000) + 50000
    });
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }
  return data;
};

const categories = [
  { id: 1, name: 'Ăn uống', color: '#FF6384' },
  { id: 2, name: 'Di chuyển', color: '#36A2EB' },
  { id: 3, name: 'Mua sắm', color: '#FFCE56' },
  { id: 4, name: 'Giải trí', color: '#4BC0C0' },
  { id: 5, name: 'Hóa đơn', color: '#9966FF' },
]

export default function CategoryDetailPage() {
  const params = useParams()
  const categoryId = parseInt(params.id as string)
  const category = categories.find(cat => cat.id === categoryId)

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  })

  const [viewMode, setViewMode] = useState('month')
  const [expenseData, setExpenseData] = useState<any[]>([])
  const [editingExpense, setEditingExpense] = useState<any | null>(null)

  useEffect(() => {
    const start = startOfDay(dateRange.from);
    const end = endOfDay(dateRange.to);
    setExpenseData(generateMockData(start, end));
  }, [dateRange]);

  const handleViewModeChange = (mode: string) => {
    setViewMode(mode);
    const today = new Date();
    switch (mode) {
      case 'day':
        setDateRange({ from: startOfDay(today), to: endOfDay(today) });
        break;
      case 'month':
        setDateRange({ from: startOfMonth(today), to: endOfMonth(today) });
        break;
      case 'year':
        setDateRange({ from: startOfYear(today), to: endOfYear(today) });
        break;
    }
  };

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    if (range.from && range.to) {
      setDateRange({ from: range.from, to: range.to });
    }
  };

  const filteredData = expenseData.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= dateRange.from && itemDate <= dateRange.to;
  });

  const totalExpense = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const averageExpense = totalExpense / filteredData.length;

  const handleEditExpense = (expense: any) => {
    setEditingExpense(expense);
  };

  const handleUpdateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý cập nhật chi tiêu ở đây
    // Trong thực tế, bạn sẽ gọi API để cập nhật dữ liệu
    console.log("Cập nhật chi tiêu:", editingExpense);
    setEditingExpense(null);
  };

  if (!category) {
    return <div>Danh mục không tồn tại</div>
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Chi tiết Chi tiêu: {category.name}</h1>

      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tổng chi tiêu</CardTitle>
            <CardDescription>Trong khoảng thời gian đã chọn</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">
              {totalExpense.toLocaleString()} ₫
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chi tiêu trung bình</CardTitle>
            <CardDescription>{viewMode === 'day' ? 'Mỗi ngày' : viewMode === 'month' ? 'Mỗi tháng' : 'Mỗi năm'}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">
              {averageExpense.toLocaleString()} ₫
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thay đổi</CardTitle>
            <CardDescription>So với kỳ trước</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-red-500">+3.8%</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Biểu đồ chi tiêu</CardTitle>
            <div className="flex gap-4">
              <Select value={viewMode} onValueChange={handleViewModeChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn chế độ xem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Theo ngày</SelectItem>
                  <SelectItem value="month">Theo tháng</SelectItem>
                  <SelectItem value="year">Theo năm</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={handleDateRangeChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke={category.color} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử chi tiêu</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Ngày</th>
                <th className="text-left p-2">Mô tả</th>
                <th className="text-right p-2">Số tiền</th>
                <th className="text-right p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.date}</td>
                  <td className="p-2">Chi tiêu ngày {format(new Date(item.date), 'dd/MM/yyyy')}</td>
                  <td className="text-right p-2">{item.amount.toLocaleString()} ₫</td>
                  <td className="text-right p-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleEditExpense(item)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Chỉnh sửa chi tiêu</DialogTitle>
                          <DialogDescription>Cập nhật thông tin chi tiêu của bạn</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleUpdateExpense} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-date">Ngày</Label>
                            <Input
                              id="edit-date"
                              type="date"
                              value={editingExpense?.date}
                              onChange={(e) => setEditingExpense({...editingExpense, date: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-amount">Số tiền</Label>
                            <Input
                              id="edit-amount"
                              type="number"
                              value={editingExpense?.amount}
                              onChange={(e) => setEditingExpense({...editingExpense, amount: parseFloat(e.target.value)})}
                            />
                          </div>
                          <Button type="submit">Cập nhật</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}


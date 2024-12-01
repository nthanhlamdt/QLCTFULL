"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Plus, Search, ArrowUpRight, ArrowDownRight, X } from 'lucide-react'
import { format, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const borrowingsData = [
  { 
    id: 1, 
    lender: 'Nguyễn Văn A', 
    amount: 5000000, 
    remainingAmount: 3000000, 
    date: '2023-07-01', 
    dueDate: '2023-08-01', 
    status: 'Đang trả',
    interestRate: 5,
    transactions: [
      { id: 1, amount: 1000000, type: 'payment', date: '2023-07-15' },
      { id: 2, amount: 1000000, type: 'payment', date: '2023-07-30' },
    ]
  },
  { 
    id: 2, 
    lender: 'Trần Thị B', 
    amount: 2000000, 
    remainingAmount: 0, 
    date: '2023-07-10', 
    dueDate: '2023-08-10', 
    status: 'Đã trả',
    interestRate: 4.5,
    transactions: [
      { id: 1, amount: 2000000, type: 'payment', date: '2023-08-01' },
    ]
  },
  { 
    id: 3, 
    lender: 'Lê Văn C', 
    amount: 3000000, 
    remainingAmount: 3000000, 
    date: '2023-07-15', 
    dueDate: '2023-09-15', 
    status: 'Chưa trả',
    interestRate: 5.5,
    transactions: []
  },
]

export default function EnhancedBorrowingDetailPage() {
  const params = useParams()
  const borrowingId = parseInt(params.id as string)
  const [borrowing, setBorrowing] = useState<any>(null)
  const [newTransaction, setNewTransaction] = useState({ amount: '', type: 'payment', date: new Date() })
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filterType, setFilterType] = useState('all')
  const [filterDate, setFilterDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    const foundBorrowing = borrowingsData.find(b => b.id === borrowingId)
    if (foundBorrowing) {
      setBorrowing(foundBorrowing)
    }
  }, [borrowingId])

  if (!borrowing) {
    return <div className="flex items-center justify-center h-screen text-2xl font-semibold">Khoản mượn không tồn tại</div>
  }

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedBorrowing = { ...borrowing }
    const transactionAmount = parseFloat(newTransaction.amount)
    
    if (newTransaction.type === 'payment') {
      updatedBorrowing.remainingAmount -= transactionAmount
    } else {
      updatedBorrowing.remainingAmount += transactionAmount
      updatedBorrowing.amount += transactionAmount
    }

    updatedBorrowing.transactions.push({
      id: Date.now(),
      amount: transactionAmount,
      type: newTransaction.type,
      date: format(newTransaction.date, 'yyyy-MM-dd')
    })

    if (updatedBorrowing.remainingAmount <= 0) {
      updatedBorrowing.status = 'Đã trả'
    } else if (updatedBorrowing.remainingAmount < updatedBorrowing.amount) {
      updatedBorrowing.status = 'Đang trả'
    }

    setBorrowing(updatedBorrowing)
    setNewTransaction({ amount: '', type: 'payment', date: new Date() })
    setIsDialogOpen(false)
  }

  const filteredTransactions = borrowing.transactions.filter((transaction: any) => {
    const matchesSearch = transaction.date.includes(searchTerm) ||
      transaction.amount.toString().includes(searchTerm) ||
      transaction.type.includes(searchTerm)
    
    const matchesType = filterType === 'all' || transaction.type === filterType
    
    const matchesDate = !filterDate || transaction.date === format(filterDate, 'yyyy-MM-dd')
    
    return matchesSearch && matchesType && matchesDate
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã trả':
        return 'bg-black'
      case 'Đang trả':
        return 'bg-gray-500'
      default:
        return 'bg-gray-300'
    }
  }

  const progressPercentage = ((borrowing.amount - borrowing.remainingAmount) / borrowing.amount) * 100

  const clearDateFilter = (e: React.MouseEvent) => {
    console.log('hello')
    e.stopPropagation()
    setFilterDate(undefined)
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Chi tiết khoản mượn</h1>

      <Card className="mb-8 rounded-lg overflow-hidden">
        <CardHeader className="bg-black text-white">
          <CardTitle className="text-2xl">{borrowing.lender}</CardTitle>
          <CardDescription className="text-gray-300">Thông tin khoản mượn</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Số tiền mượn</p>
              <p className="text-xl font-bold">{borrowing.amount.toLocaleString()} ₫</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Còn nợ</p>
              <p className="text-xl font-bold">{borrowing.remainingAmount.toLocaleString()} ₫</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Lãi suất</p>
              <p className="text-xl font-bold">{borrowing.interestRate}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Ngày mượn</p>
              <p className="text-lg">{borrowing.date}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Ngày đáo hạn</p>
              <p className="text-lg">{borrowing.dueDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Trạng thái</p>
              <Badge className={cn("text-white", getStatusColor(borrowing.status))}>{borrowing.status}</Badge>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <Progress value={progressPercentage} className="w-full h-2" />
            <p className="text-sm text-gray-500 text-right">{progressPercentage.toFixed(0)}% đã trả</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Lịch sử giao dịch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                placeholder="Tìm kiếm giao dịch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Lọc theo loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="payment">Trả nợ</SelectItem>
                <SelectItem value="borrow">Mượn thêm</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild onClick={clearDateFilter}>
                <Button variant="outline" className="relative w-full sm:w-[180px] pl-3 text-left font-normal">
                  {filterDate ? (
                    <span className="flex items-center justify-between w-full">
                      {format(filterDate, 'dd/MM/yyyy')}
                      <X className="absolute right-5 h-4 w-4 cursor-pointer" />
                    </span>
                  ) : (
                    <span className="flex items-center justify-between w-full">
                      Lọc theo ngày
                      <CalendarIcon className="h-4 w-4 opacity-50" />
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filterDate}
                  onSelect={setFilterDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm giao dịch
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Thêm giao dịch mới</DialogTitle>
                  <DialogDescription>Nhập thông tin cho giao dịch mới</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddTransaction} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Số tiền</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                      placeholder="Nhập số tiền"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Loại giao dịch</Label>
                    <Select
                      value={newTransaction.type}
                      onValueChange={(value) => setNewTransaction({...newTransaction, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại giao dịch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="payment">Trả nợ</SelectItem>
                        <SelectItem value="borrow">Mượn thêm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Ngày giao dịch</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newTransaction.date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {newTransaction.date ? format(newTransaction.date, "PPP") : <span>Chọn ngày</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={newTransaction.date}
                          onSelect={(date) => date && setNewTransaction({...newTransaction, date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Button type="submit" className="w-full">Thêm giao dịch</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead className="text-right">Số tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction: any) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {transaction.type === 'payment' ? (
                          <ArrowUpRight className="mr-2 h-4 w-4 text-black" />
                        ) : (
                          <ArrowDownRight className="mr-2 h-4 w-4 text-gray-500" />
                        )}
                        {transaction.type === 'payment' ? 'Trả nợ' : 'Mượn thêm'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {transaction.amount.toLocaleString()} ₫
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">Không có giao dịch nào</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
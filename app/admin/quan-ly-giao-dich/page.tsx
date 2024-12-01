"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Search, Plus, Download, Upload, AlertTriangle, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'

// Mock data for transactions
const mockTransactions = [
  { id: 1, user: "Nguyễn Văn A", type: "expense", amount: 500000, category: "Ăn uống", date: "2023-07-01", note: "Ăn tối với gia đình", status: "completed" },
  { id: 2, user: "Trần Thị B", type: "income", amount: 10000000, category: "Lương", date: "2023-07-02", note: "Lương tháng 6", status: "completed" },
  { id: 3, user: "Lê Văn C", type: "transfer", amount: 2000000, category: "Chuyển khoản", date: "2023-07-03", note: "Chuyển tiền cho bạn", status: "pending" },
  { id: 4, user: "Phạm Thị D", type: "expense", amount: 1500000, category: "Mua sắm", date: "2023-07-04", note: "Mua quần áo", status: "completed" },
  { id: 5, user: "Hoàng Văn E", type: "income", amount: 5000000, category: "Thưởng", date: "2023-07-05", note: "Thưởng dự án", status: "completed" },
]

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [selectedTransactions, setSelectedTransactions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    user: "",
    type: "expense",
    amount: "",
    category: "",
    date: new Date(),
    note: "",
  })

  const itemsPerPage = 10
  const totalPages = Math.ceil(transactions.length / itemsPerPage)

  const filteredTransactions = transactions.filter(transaction => 
    (searchTerm === "" || 
     transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
     transaction.note.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (typeFilter === "all" || transaction.type === typeFilter) &&
    (categoryFilter === "all" || transaction.category === categoryFilter) &&
    (!dateRange.from || new Date(transaction.date) >= dateRange.from) &&
    (!dateRange.to || new Date(transaction.date) <= dateRange.to)
  )

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    const transaction = {
      id: transactions.length + 1,
      ...newTransaction,
      status: "completed"
    }
    setTransactions([...transactions, transaction])
    setIsAddTransactionOpen(false)
    setNewTransaction({
      user: "",
      type: "expense",
      amount: "",
      category: "",
      date: new Date(),
      note: "",
    })
  }

  const handleDeleteTransactions = () => {
    const updatedTransactions = transactions.filter(
      transaction => !selectedTransactions.includes(transaction.id)
    )
    setTransactions(updatedTransactions)
    setSelectedTransactions([])
  }

  const handleExportTransactions = () => {
    // Implement export functionality here
    console.log("Exporting transactions...")
  }

  const handleImportTransactions = () => {
    // Implement import functionality here
    console.log("Importing transactions...")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Quản lý giao dịch</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tìm kiếm và lọc giao dịch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Tìm kiếm</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Tìm kiếm giao dịch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex-1">
              <Label htmlFor="date-range">Khoảng thời gian</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date-range"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
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
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1">
              <Label htmlFor="type-filter">Loại giao dịch</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type-filter">
                  <SelectValue placeholder="Chọn loại giao dịch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="expense">Chi tiêu</SelectItem>
                  <SelectItem value="income">Thu nhập</SelectItem>
                  <SelectItem value="transfer">Chuyển khoản</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="category-filter">Danh mục</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="category-filter">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="Ăn uống">Ăn uống</SelectItem>
                  <SelectItem value="Mua sắm">Mua sắm</SelectItem>
                  <SelectItem value="Giải trí">Giải trí</SelectItem>
                  <SelectItem value="Lương">Lương</SelectItem>
                  <SelectItem value="Thưởng">Thưởng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between mb-4">
        <div>
          <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" /> Thêm giao dịch mới</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm giao dịch mới</DialogTitle>
                <DialogDescription>Nhập thông tin cho giao dịch mới.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddTransaction}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="user" className="text-right">Người dùng</Label>
                    <Input
                      id="user"
                      value={newTransaction.user}
                      onChange={(e) => setNewTransaction({ ...newTransaction, user: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">Loại giao dịch</Label>
                    <Select
                      value={newTransaction.type}
                      onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value })}
                    >
                      <SelectTrigger id="type" className="col-span-3">
                        <SelectValue placeholder="Chọn loại giao dịch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expense">Chi tiêu</SelectItem>
                        <SelectItem value="income">Thu nhập</SelectItem>
                        <SelectItem value="transfer">Chuyển khoản</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">Số tiền</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Danh mục</Label>
                    <Input
                      id="category"
                      value={newTransaction.category}
                      onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">Ngày</Label>
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
                          {newTransaction.date ? format(newTransaction.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={newTransaction.date}
                          onSelect={(date) => setNewTransaction({ ...newTransaction, date: date || new Date() })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="note" className="text-right">Ghi chú</Label>
                    <Input
                      id="note"
                      value={newTransaction.note}
                      onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Thêm giao dịch</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-x-2">
          <Button onClick={handleExportTransactions}><Download className="mr-2 h-4 w-4" /> Xuất</Button>
          <Button onClick={handleImportTransactions}><Upload className="mr-2 h-4 w-4" /> Nhập</Button>
          <Button variant="destructive" onClick={handleDeleteTransactions} disabled={selectedTransactions.length === 0}>
            <Trash2 className="mr-2 h-4 w-4" /> Xóa ({selectedTransactions.length})
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách giao dịch</CardTitle>
          <CardDescription>Quản lý và xem chi tiết các giao dịch trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedTransactions.length === paginatedTransactions.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTransactions(paginatedTransactions.map(t => t.id))
                      } else {
                        setSelectedTransactions([])
                      }
                    }}
                  />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Người dùng</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Số tiền</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedTransactions.includes(transaction.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTransactions([...selectedTransactions, transaction.id])
                        } else {
                          setSelectedTransactions(selectedTransactions.filter(id => id !== transaction.id))
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.user}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.type === 'expense' ? 'destructive' : transaction.type === 'income' ? 'default' : 'secondary'}>
                      {transaction.type === 'expense' ? 'Chi tiêu' : transaction.type === 'income' ? 'Thu nhập' : 'Chuyển khoản'}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.amount.toLocaleString()} ₫</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                      {transaction.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Hiển thị {paginatedTransactions.length} / {filteredTransactions.length} giao dịch
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Trước
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((old) => Math.min(old + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Sau
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Cảnh báo giao dịch bất thường</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Cảnh báo</AlertTitle>
            <AlertDescription>
              Phát hiện giao dịch chi tiêu lớn: 10,000,000 ₫ vào ngày 2023-07-05 bởi người dùng Hoàng Văn E.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
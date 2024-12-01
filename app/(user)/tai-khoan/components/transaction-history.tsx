'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Transaction {
  id: number
  date: string
  amount: number
  category: string
  method: string
}

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, date: '2023-06-15', amount: 500000, category: 'Ăn uống', method: 'Thẻ tín dụng' },
    { id: 2, date: '2023-06-14', amount: 1000000, category: 'Mua sắm', method: 'Tiền mặt' },
    { id: 3, date: '2023-06-13', amount: 200000, category: 'Di chuyển', method: 'Ví điện tử' },
  ])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  const handleDelete = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lịch sử giao dịch</CardTitle>
        <CardDescription>Xem và quản lý các giao dịch của bạn.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ngày</TableHead>
              <TableHead>Số tiền</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Phương thức</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.method}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">Xem</Button>
                  <Button variant="outline" size="sm" className="mr-2">Sửa</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(transaction.id)}>Xóa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


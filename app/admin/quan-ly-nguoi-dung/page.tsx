"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Edit, Lock, Unlock, Trash2 } from 'lucide-react'

// Mock data for users
const initialUsers = [
  { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@example.com", balance: 1000000, status: "active", role: "user" },
  { id: 2, name: "Trần Thị B", email: "tranthib@example.com", balance: 2000000, status: "inactive", role: "admin" },
  { id: 3, name: "Lê Văn C", email: "levanc@example.com", balance: 1500000, status: "active", role: "user" },
  { id: 4, name: "Phạm Thị D", email: "phamthid@example.com", balance: 3000000, status: "active", role: "user" },
  { id: 5, name: "Hoàng Văn E", email: "hoangvane@example.com", balance: 500000, status: "inactive", role: "user" },
]

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" })
  const [editingUser, setEditingUser] = useState(null)
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    const newUserData = {
      id: Date.now(),
      ...newUser,
      balance: 0,
      status: "active"
    }
    setUsers([...users, newUserData])
    setNewUser({ name: "", email: "", role: "user" })
    setIsAddUserModalOpen(false)
  }

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault()
    setUsers(users.map(user => user.id === editingUser.id ? editingUser : user))
    setIsEditUserModalOpen(false)
  }

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    ))
  }

  const deleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (roleFilter === "all" || user.role === roleFilter) &&
    (statusFilter === "all" || user.status === statusFilter)
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Quản lý người dùng</CardTitle>
        <CardDescription>Quản lý tài khoản và quyền hạn của người dùng trong hệ thống</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <Input 
              placeholder="Tìm kiếm người dùng..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64"
            />
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Lọc theo vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vai trò</SelectItem>
                <SelectItem value="user">Người dùng</SelectItem>
                <SelectItem value="admin">Quản trị viên</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Không hoạt động</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
            <DialogTrigger asChild>
              <Button>Thêm người dùng mới</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm người dùng mới</DialogTitle>
                <DialogDescription>Nhập thông tin cho người dùng mới.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddUser}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Tên</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">Vai trò</Label>
                    <Select 
                      value={newUser.role} 
                      onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Chọn vai trò" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Người dùng</SelectItem>
                        <SelectItem value="admin">Quản trị viên</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Thêm người dùng</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Số dư</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.balance.toLocaleString()} ₫</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}>
                      {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </TableCell>
                  <TableCell>{user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Mở menu</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingUser(user)
                            setIsEditUserModalOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                          {user.status === 'active' ? (
                            <>
                              <Lock className="mr-2 h-4 w-4" />
                              Khóa tài khoản
                            </>
                          ) : (
                            <>
                              <Unlock className="mr-2 h-4 w-4" />
                              Mở khóa tài khoản
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => deleteUser(user.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa tài khoản
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <Dialog open={isEditUserModalOpen} onOpenChange={setIsEditUserModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin người dùng</DialogTitle>
            <DialogDescription>Cập nhật thông tin cho người dùng.</DialogDescription>
          </DialogHeader>
          {editingUser && (
            <form onSubmit={handleEditUser}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">Tên</Label>
                  <Input
                    id="edit-name"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-role" className="text-right">Vai trò</Label>
                  <Select 
                    value={editingUser.role} 
                    onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Người dùng</SelectItem>
                      <SelectItem value="admin">Quản trị viên</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Lưu thay đổi</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
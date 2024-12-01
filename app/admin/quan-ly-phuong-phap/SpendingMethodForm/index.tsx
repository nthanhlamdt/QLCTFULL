"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SpendingMethodForm({ method, onSave, onCancel }) {
  const [formData, setFormData] = useState(method || {
    name: '',
    description: '',
    advantages: '',
    disadvantages: '',
    externalApplication: '',
    internalApplication: '',
    isActive: true
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{method ? 'Chỉnh sửa phương pháp' : 'Thêm phương pháp mới'}</CardTitle>
        <CardDescription>Nhập thông tin chi tiết về phương pháp chi tiêu.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên phương pháp</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên phương pháp"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả chi tiết về phương pháp"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="advantages">Ưu điểm</Label>
            <Textarea
              id="advantages"
              name="advantages"
              value={formData.advantages}
              onChange={handleChange}
              placeholder="Liệt kê các ưu điểm, mỗi ưu điểm một dòng"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="disadvantages">Nhược điểm</Label>
            <Textarea
              id="disadvantages"
              name="disadvantages"
              value={formData.disadvantages}
              onChange={handleChange}
              placeholder="Liệt kê các nhược điểm, mỗi nhược điểm một dòng"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="externalApplication">Cách vận dụng bên ngoài</Label>
            <Textarea
              id="externalApplication"
              name="externalApplication"
              value={formData.externalApplication}
              onChange={handleChange}
              placeholder="Mô tả cách áp dụng phương pháp trong thực tế"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="internalApplication">Cách vận dụng vào ứng dụng</Label>
            <Textarea
              id="internalApplication"
              name="internalApplication"
              value={formData.internalApplication}
              onChange={handleChange}
              placeholder="Hướng dẫn áp dụng phương pháp này vào hệ thống hoặc app"
              rows={4}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData(prevData => ({ ...prevData, isActive: checked }))}
            />
            <Label htmlFor="isActive">Kích hoạt</Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>Hủy</Button>
            <Button type="submit">Lưu</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
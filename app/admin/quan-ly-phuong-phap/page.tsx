"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import SpendingMethodsList from './SpendingMethodsList'
import SpendingMethodForm from './SpendingMethodForm'
import SpendingMethodDetail from './SpendingMethodDetail'

// Mock data for initial state
const initialMethods = [
  {
    id: 1,
    name: "Quy tắc 50/30/20",
    description: "Phân bổ ngân sách theo tỷ lệ 50% cho nhu cầu, 30% cho mong muốn, và 20% cho tiết kiệm.",
    advantages: "- Đơn giản\n- Dễ áp dụng\n- Cân bằng giữa chi tiêu và tiết kiệm",
    disadvantages: "- Thiếu linh hoạt\n- Không phù hợp với mọi mức thu nhập",
    externalApplication: "Chia thu nhập hàng tháng thành 3 phần: 50% cho các nhu cầu cơ bản, 30% cho các mong muốn, và 20% để tiết kiệm hoặc trả nợ.",
    internalApplication: "Tạo 3 danh mục chính trong ứng dụng: Nhu cầu, Mong muốn, và Tiết kiệm. Tự động phân bổ ngân sách dựa trên tổng thu nhập người dùng nhập vào.",
    isActive: true
  },
  {
    id: 2,
    name: "Phương pháp phong bì",
    description: "Chia tiền vào các phong bì theo danh mục chi tiêu.",
    advantages: "- Trực quan\n- Kiểm soát chi tiêu tốt\n- Linh hoạt trong việc điều chỉnh ngân sách",
    disadvantages: "- Cồng kềnh khi sử dụng tiền mặt\n- Khó quản lý với số tiền lớn",
    externalApplication: "Chia tiền mặt vào các phong bì được gắn nhãn cho từng danh mục chi tiêu như thực phẩm, giải trí, đi lại, v.v.",
    internalApplication: "Tạo 'phong bì ảo' trong ứng dụng cho mỗi danh mục chi tiêu. Người dùng phân bổ ngân sách vào từng phong bì và theo dõi chi tiêu trong mỗi danh mục.",
    isActive: true
  },
]

export default function SpendingMethodsAdmin() {
  const [methods, setMethods] = useState(initialMethods)
  const [currentView, setCurrentView] = useState('list')
  const [currentMethod, setCurrentMethod] = useState(null)

  const handleAddNew = () => {
    setCurrentMethod(null)
    setCurrentView('form')
  }

  const handleEdit = (method) => {
    setCurrentMethod(method)
    setCurrentView('form')
  }

  const handleView = (method) => {
    setCurrentMethod(method)
    setCurrentView('detail')
  }

  const handleSave = (methodData) => {
    if (methodData.id) {
      setMethods(methods.map(m => m.id === methodData.id ? methodData : m))
    } else {
      setMethods([...methods, { ...methodData, id: Date.now() }])
    }
    setCurrentView('list')
  }

  const handleDelete = (id) => {
    setMethods(methods.filter(m => m.id !== id))
    setCurrentView('list')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Quản lý Phương pháp Chi tiêu</h1>
      
      {currentView === 'list' && (
        <>
          <Button onClick={handleAddNew} className="mb-4">
            <Plus className="mr-2 h-4 w-4" /> Thêm phương pháp mới
          </Button>
          <SpendingMethodsList 
            methods={methods} 
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />
        </>
      )}

      {currentView === 'form' && (
        <SpendingMethodForm 
          method={currentMethod} 
          onSave={handleSave}
          onCancel={() => setCurrentView('list')}
        />
      )}

      {currentView === 'detail' && currentMethod && (
        <SpendingMethodDetail 
          method={currentMethod}
          onEdit={() => handleEdit(currentMethod)}
          onDelete={() => handleDelete(currentMethod.id)}
          onBack={() => setCurrentView('list')}
        />
      )}
    </div>
  )
}
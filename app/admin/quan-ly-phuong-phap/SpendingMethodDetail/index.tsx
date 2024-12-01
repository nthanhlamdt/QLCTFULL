import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'

export default function SpendingMethodDetail({ method, onEdit, onDelete, onBack }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{method.name}</CardTitle>
            <CardDescription>Chi tiết phương pháp chi tiêu</CardDescription>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => onDelete(method.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Mô tả</h3>
          <p>{method.description}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Ưu điểm</h3>
          <ul className="list-disc pl-5">
            {method.advantages.split('\n').map((advantage, index) => (
              <li key={index}>{advantage.replace('-', '').trim()}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Nhược điểm</h3>
          <ul className="list-disc pl-5">
            {method.disadvantages.split('\n').map((disadvantage, index) => (
              <li key={index}>{disadvantage.replace('-', '').trim()}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Cách vận dụng bên ngoài</h3>
          <p>{method.externalApplication}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Cách vận dụng vào ứng dụng</h3>
          <p>{method.internalApplication}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Trạng thái</h3>
          <Badge variant={method.isActive ? "default" : "secondary"}>
            {method.isActive ? "Kích hoạt" : "Tạm dừng"}
          </Badge>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại danh sách
        </Button>
      </CardContent>
    </Card>
  )
}
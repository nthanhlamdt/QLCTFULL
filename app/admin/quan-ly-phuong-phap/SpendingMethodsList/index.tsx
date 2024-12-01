import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2 } from 'lucide-react'

export default function SpendingMethodsList({ methods, onEdit, onView, onDelete }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tên phương pháp</TableHead>
          <TableHead>Mô tả</TableHead>
          <TableHead>Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {methods.map((method) => (
          <TableRow key={method.id}>
            <TableCell className="font-medium">{method.name}</TableCell>
            <TableCell>{method.description}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={() => onView(method)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => onEdit(method)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => onDelete(method.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
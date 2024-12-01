'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Percent, Wallet, PiggyBank, BarChart4, Layers, Target, CheckCircle2, XCircle, Lightbulb, Smartphone, ArrowRight } from 'lucide-react'
const financeMethods = [
  {
    id: "50-30-20",
    name: "Phương pháp 50/30/20",
    description: "Phân chia thu nhập thành 3 phần: 50% cho nhu cầu, 30% cho mong muốn, và 20% cho tiết kiệm và đầu tư.",
    pros: [
      "Đơn giản và dễ áp dụng",
      "Cân bằng giữa chi tiêu và tiết kiệm",
      "Linh hoạt với nhiều mức thu nhập khác nhau"
    ],
    cons: [
      "Có thể không phù hợp với mọi tình huống tài chính",
      "Không tính đến các khoản nợ lớn",
      "Có thể khó áp dụng ở các thành phố có chi phí sinh hoạt cao"
    ],
    externalApplication: [
      "Lập bảng tính để theo dõi chi tiêu theo ba danh mục",
      "Sử dụng ứng dụng ngân hàng để tự động chuyển 20% thu nhập vào tài khoản tiết kiệm",
      "Đánh giá và điều chỉnh tỷ lệ hàng tháng để phù hợp với hoàn cảnh cá nhân"
    ],
    appApplication: [
      "Tạo ba danh mục chính trong ứng dụng: Nhu cầu, Mong muốn, và Tiết kiệm",
      "Thiết lập cảnh báo khi chi tiêu vượt quá tỷ lệ đã định",
      "Tạo báo cáo tự động để theo dõi việc tuân thủ quy tắc 50/30/20"
    ],
    icon: Percent,
  },
  {
    id: "envelope",
    name: "Phương pháp Phong bì",
    description: "Chia tiền mặt vào các phong bì khác nhau, mỗi phong bì đại diện cho một danh mục chi tiêu.",
    pros: [
      "Giúp kiểm soát chi tiêu bằng tiền mặt",
      "Dễ nhìn thấy số tiền còn lại trong mỗi danh mục",
      "Tăng nhận thức về thói quen chi tiêu"
    ],
    cons: [
      "Có thể không phù hợp với thời đại số hóa",
      "Rủi ro khi mang nhiều tiền mặt",
      "Cần thời gian để phân loại và quản lý tiền mặt"
    ],
    externalApplication: [
      "Chuẩn bị các phong bì riêng biệt cho từng danh mục chi tiêu",
      "Phân bổ tiền mặt vào mỗi phong bì theo ngân sách đã lên kế hoạch",
      "Theo dõi số tiền còn lại trong mỗi phong bì và điều chỉnh cho phù hợp"
    ],
    appApplication: [
      "Tạo 'phong bì ảo' cho mỗi danh mục chi tiêu trong ứng dụng",
      "Cập nhật số dư của mỗi 'phong bì' sau mỗi giao dịch",
      "Hiển thị cảnh báo khi 'phong bì' gần hết tiền"
    ],
    icon: Wallet,
  },
  {
    id: "zero-based",
    name: "Ngân sách Về Không",
    description: "Phân bổ mọi đồng thu nhập vào các danh mục cụ thể, đưa số dư về 0.",
    pros: [
      "Kiểm soát chặt chẽ mọi khoản chi tiêu",
      "Giúp xác định và cắt giảm chi tiêu không cần thiết",
      "Tối ưu hóa việc sử dụng thu nhập"
    ],
    cons: [
      "Tốn nhiều thời gian và công sức để lập kế hoạch",
      "Có thể gây căng thẳng nếu quá cứng nhắc",
      "Cần điều chỉnh thường xuyên khi có chi phí phát sinh"
    ],
    externalApplication: [
      "Lập kế hoạch chi tiêu chi tiết cho từng danh mục",
      "Phân bổ toàn bộ thu nhập vào các danh mục đã lên kế hoạch",
      "Theo dõi sát sao chi tiêu và điều chỉnh kế hoạch nếu cần"
    ],
    appApplication: [
      "Tạo công cụ lập kế hoạch ngân sách chi tiết trong ứng dụng",
      "Theo dõi chi tiêu thời gian thực và so sánh với kế hoạch",
      "Tạo báo cáo cuối tháng để phân tích hiệu quả của ngân sách"
    ],
    icon: BarChart4,
  },
  {
    id: "pay-yourself-first",
    name: "Trả tiền cho bản thân trước",
    description: "Ưu tiên tiết kiệm một phần thu nhập trước khi chi tiêu cho các khoản khác.",
    pros: [
      "Đảm bảo luôn có tiền tiết kiệm",
      "Giúp xây dựng thói quen tiết kiệm tốt",
      "Linh hoạt trong việc quyết định tỷ lệ tiết kiệm"
    ],
    cons: [
      "Có thể khó thực hiện nếu thu nhập thấp hoặc có nhiều khoản nợ",
      "Cần kỷ luật cao để duy trì",
      "Có thể bỏ qua việc quản lý chi tiêu hàng ngày"
    ],
    externalApplication: [
      "Quyết định tỷ lệ phần trăm thu nhập cần tiết kiệm",
      "Tự động chuyển khoản tiết kiệm ngay khi nhận lương",
      "Kiên trì thực hiện kế hoạch tiết kiệm dù thu nhập có thay đổi"
    ],
    appApplication: [
      "Tạo tính năng tự động trích tiết kiệm khi nhập thu nhập",
      "Hiển thị biểu đồ tiến độ tiết kiệm theo thời gian",
      "Tạo thông báo nhắc nhở và động viên người dùng duy trì thói quen tiết kiệm"
    ],
    icon: PiggyBank,
  },
  {
    id: "value-based",
    name: "Ngân sách dựa trên giá trị",
    description: "Phân bổ chi tiêu dựa trên những gì quan trọng nhất đối với bạn.",
    pros: [
      "Tập trung vào những gì thực sự quan trọng",
      "Giúp cân bằng giữa tiết kiệm và hưởng thụ",
      "Tăng sự hài lòng với cách chi tiêu"
    ],
    cons: [
      "Có thể khó xác định 'giá trị' cho mọi khoản chi tiêu",
      "Cần thời gian để đánh giá và điều chỉnh",
      "Có thể bỏ qua một số khoản chi tiêu cần thiết nhưng không 'có giá trị' cao"
    ],
    externalApplication: [
      "Xác định các giá trị cốt lõi và ưu tiên chi tiêu",
      "Phân bổ ngân sách dựa trên các giá trị đã xác định",
      "Đánh giá lại các giá trị và điều chỉnh ngân sách định kỳ"
    ],
    appApplication: [
      "Tạo công cụ đánh giá và xếp hạng giá trị cá nhân",
      "Gắn nhãn giá trị cho mỗi khoản chi tiêu",
      "Tạo báo cáo phân tích chi tiêu theo giá trị"
    ],
    icon: Target,
  },
  {
    id: "kakeibo",
    name: "Phương pháp Kakeibo (Nhật Bản)",
    description: "Phương pháp quản lý tài chính truyền thống của Nhật Bản, tập trung vào ghi chép chi tiết và suy ngẫm.",
    pros: [
      "Tăng cường nhận thức về thói quen chi tiêu",
      "Khuyến khích tiết kiệm và giảm chi tiêu không cần thiết",
      "Kết hợp quản lý tài chính với mindfulness"
    ],
    cons: [
      "Đòi hỏi nhiều thời gian và công sức để ghi chép",
      "Có thể gây áp lực khi phải đối mặt với chi tiêu hàng ngày",
      "Cần thời gian để thấy được kết quả rõ rệt"
    ],
    externalApplication: [
      "Ghi chép chi tiết mọi khoản thu chi vào sổ Kakeibo",
      "Phân loại chi tiêu theo bốn danh mục: cần thiết, muốn có, vui vẻ, bổ ích",
      "Suy ngẫm về thói quen chi tiêu và điều chỉnh kế hoạch cho phù hợp"
    ],
    appApplication: [
      "Tạo giao diện nhập liệu nhanh cho các khoản chi tiêu hàng ngày",
      "Tự động phân loại chi tiêu theo bốn danh mục Kakeibo",
      "Tạo công cụ reflection để người dùng suy ngẫm về chi tiêu cuối mỗi tháng"
    ],
    icon: Layers,
  }
]

export default function FinancialMethods() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  return (
    <div>
      <motion.h1 
        className="text-4xl font-bold mb-8 bg-gradient-to-r bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Các Phương Pháp Quản Lý Chi Tiêu
      </motion.h1>
      <ScrollArea className="w-full rounded-lg border p-6 bg-white">
        <Accordion 
          type="single" 
          collapsible 
          className="w-full space-y-4"
          value={selectedMethod}
          onValueChange={setSelectedMethod}
        >
          {financeMethods.map((method) => (
            <AccordionItem value={method.id} key={method.id} className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="p-4 bg-primary text-primary-foreground hover:brightness-110 transition-all duration-300">
                <div className="flex items-center text-left">
                  <div className="bg-white p-2 rounded-full mr-4">
                    {React.createElement(method.icon, { className: "h-6 w-6 text-gray-800" })}
                  </div>
                  <span className="text-xl font-semibold">{method.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <AnimatePresence>
                  {selectedMethod === method.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="mt-4 border-t-4 overflow-hidden">
                        <CardHeader className="bg-primary text-primary-foreground">
                          <CardTitle className="text-4xl">{method.name}</CardTitle>
                          <CardDescription className="text-lg text-primary-foreground">{method.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                              <div className="bg-secondary p-4 rounded-lg">
                                <h3 className="text-2xl font-semibold flex items-center mb-3 text-secondary-foreground">
                                  <CheckCircle2 className="mr-2 h-5 w-5" />
                                  Ưu điểm
                                </h3>
                                <ul className="space-y-2">
                                  {method.pros.map((pro, index) => (
                                    <li key={index} className="flex items-start">
                                      <ArrowRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                      <span className="text-xl text-secondary-foreground">{pro}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-secondary p-4 rounded-lg">
                                <h3 className="text-2xl font-semibold flex items-center mb-3 text-secondary-foreground">
                                  <XCircle className="mr-2 h-5 w-5" />
                                  Nhược điểm
                                </h3>
                                <ul className="space-y-2">
                                  {method.cons.map((con, index) => (
                                    <li key={index} className="flex items-start">
                                      <ArrowRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                      <span className="text-xl text-secondary-foreground">{con}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="space-y-6">
                              <div className="bg-secondary p-4 rounded-lg">
                                <h3 className="text-2xl font-semibold flex items-center mb-3 text-secondary-foreground">
                                  <Lightbulb className="mr-2 h-5 w-5" />
                                  Cách vận dụng bên ngoài
                                </h3>
                                <ul className="space-y-2">
                                  {method.externalApplication.map((app, index) => (
                                    <li key={index} className="flex items-start">
                                      <ArrowRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                      <span className="text-xl text-secondary-foreground">{app}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-secondary p-4 rounded-lg">
                                <h3 className="text-2xl font-semibold flex items-center mb-3 text-secondary-foreground">
                                  <Smartphone className="mr-2 h-5 w-5" />
                                  Cách vận dụng vào ứng dụng
                                </h3>
                                <ul className="space-y-2">
                                  {method.appApplication.map((app, index) => (
                                    <li key={index} className="flex items-start">
                                      <ArrowRight className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                      <span className="text-xl text-secondary-foreground">{app}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  )
}


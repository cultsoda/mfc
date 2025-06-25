"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CreditCard, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ShippingFormProps {
  onBack: () => void
  onComplete: () => void  // ✅ 이 prop 추가
  // selectedCount: number  // ✅ 이 prop 제거 (app/page.tsx에서 전달하지 않음)
}

export default function ShippingForm({ onBack, onComplete }: ShippingFormProps) {
  const [shippingType, setShippingType] = useState<"domestic" | "international">("domestic")

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 -ml-3">
          <ArrowLeft className="h-5 w-5 text-white" />
        </Button>
        <h2 className="text-xl font-bold">상품 정보</h2>
      </div>

      <div className="flex items-center gap-3 border-b border-gray-800 pb-4 mb-4">
        <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
          <img src="/placeholder.svg?height=48&width=48&text=MFC" alt="MFC" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-bold">MFC-화보모델</div>
          <div className="text-xs text-gray-400">실물 포토카드 + 선물용품</div>
        </div>
        <div className="ml-auto font-bold">200,000원</div>
      </div>

      <div className="mb-4">
        <div className="font-bold mb-2">구매 사유</div>
        <div className="flex justify-between items-center border border-gray-800 p-3 rounded-md">
          <span className="text-sm">구매용 선택해 주세요.</span>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="font-bold mb-2">결제 수단</div>
        <div className="flex items-center gap-2 border border-gray-800 p-3 rounded-md">
          <CreditCard className="h-5 w-5 text-blue-500" />
          <span className="text-sm">삼성카드 •••• 6888</span>
          <span className="text-xs text-gray-400 ml-auto">유효기간 12/29</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-down"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
        <Button variant="outline" className="w-full mt-2 border-dashed border-gray-600 text-gray-400">
          <Plus className="h-4 w-4 mr-2" />
          결제 수단 추가
        </Button>
      </div>

      <div className="mb-4">
        <div className="font-bold mb-2">배송지 입력</div>
        <RadioGroup defaultValue="domestic" className="flex mb-4">
          <div className="flex items-center space-x-2 mr-4">
            <RadioGroupItem value="domestic" id="domestic" onClick={() => setShippingType("domestic")} />
            <Label htmlFor="domestic">국내배송</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="international" id="international" onClick={() => setShippingType("international")} />
            <Label htmlFor="international">해외배송</Label>
          </div>
        </RadioGroup>

        <div className="space-y-3">
          <div>
            <Label htmlFor="name" className="text-sm">
              이름 <span className="text-red-500">*</span>
            </Label>
            <Input id="name" placeholder="이름을 입력해주세요." className="bg-transparent border-gray-700 mt-1" />
          </div>

          <div>
            <Label htmlFor="address" className="text-sm">
              전화번호 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              placeholder="-없이 휴대폰 번호를 입력해 주세요."
              className="bg-transparent border-gray-700 mt-1"
            />
          </div>

          <div>
            <Label htmlFor="address" className="text-sm">
              우편번호 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="zipcode"
              placeholder="우편번호를 입력해주세요."
              className="bg-transparent border-gray-700 mt-1"
            />
          </div>

          <div>
            <Label htmlFor="address" className="text-sm">
              주소 <span className="text-red-500">*</span>
            </Label>
            <Input id="address" placeholder="주소를 입력해주세요." className="bg-transparent border-gray-700 mt-1" />
          </div>

          <div>
            <Label htmlFor="detailAddress" className="text-sm">
              상세주소 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="detailAddress"
              placeholder="상세주소를 입력해주세요."
              className="bg-transparent border-gray-700 mt-1"
            />
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="mb-4">
          <div className="font-bold mb-2">최종 결제 금액</div>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm">상품 금액</div>
              <div className="text-xs text-gray-400">VAT 포함</div>
            </div>
            <div className="text-right">
              <div>200,000원</div>
              <div className="text-xs text-gray-400">2,000원</div>
            </div>
          </div>
          <div className="text-right font-bold text-lg mt-2">202,000원</div>
        </div>

        <Button 
          className="w-full py-6 bg-[#FF0844] hover:bg-[#FF0844]/90 text-white"
          onClick={() => {
            // 결제 처리 로직 (실제로는 결제 API 호출)
            console.log('배송 정보 및 결제 완료')
            
            // 마이페이지로 이동
            onComplete()
          }}
        >
          결제하기
        </Button>
        <div className="text-xs text-gray-400 text-center mt-2">
          약관 및 주의 사항을 확인하였으며, 결제 계속 동의합니다.
        </div>
      </div>
    </div>
  )
}

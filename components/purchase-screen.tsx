"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronDown } from "lucide-react"

interface PurchaseScreenProps {
  onBackToMain: () => void
}

export default function PurchaseScreen({ onBackToMain }: PurchaseScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const packages = [
    { id: "1", name: "뽑기권 1장", price: 1500, originalPrice: 1500 },
    { id: "10", name: "뽑기권 10장", price: 12000, originalPrice: 15000 },
    { id: "30", name: "뽑기권 30장", price: 30000, originalPrice: 45000 },
  ]

  const handleSelectPackage = (id: string) => {
    setSelectedPackage(id)
  }

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBackToMain} className="mr-2 -ml-3">
          <ArrowLeft className="h-5 w-5 text-white" />
        </Button>
        <h2 className="text-xl font-bold">뽑기권 구매</h2>
      </div>

      <div className="flex items-center gap-3 border-b border-gray-800 pb-4 mb-4">
        <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
          <img src="/placeholder.svg?height=48&width=48&text=MFC" alt="MFC" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-bold">MFC-화보모델</div>
          <div className="text-xs text-gray-400">엑스로메다 시즌명</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="font-bold mb-2">뽑기권 선택</div>
        <div className="border border-gray-800 rounded-md p-4 mb-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex justify-between items-center py-3 ${
                Number.parseInt(pkg.id) < packages.length ? "border-b border-gray-800" : ""
              } cursor-pointer ${selectedPackage === pkg.id ? "bg-gray-800/50" : ""}`}
              onClick={() => handleSelectPackage(pkg.id)}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border ${
                    selectedPackage === pkg.id ? "border-[#FF0844] bg-[#FF0844]" : "border-gray-600"
                  } mr-3 flex items-center justify-center`}
                >
                  {selectedPackage === pkg.id && <div className="w-3 h-3 rounded-full bg-white"></div>}
                </div>
                <span className="text-sm">{pkg.name}</span>
              </div>
              <div className="text-right">
                <div className="font-bold">{pkg.price.toLocaleString()}원</div>
                {pkg.price < pkg.originalPrice && (
                  <div className="text-xs text-gray-400 line-through">{pkg.originalPrice.toLocaleString()}원</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="font-bold mb-2">결제 수단</div>
        <div className="flex justify-between items-center border border-gray-800 p-3 rounded-md">
          <span className="text-sm">결제 수단을 선택해 주세요.</span>
          <div className="flex items-center gap-2">
            <ChevronDown size={16} />
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
              <div>
                {selectedPackage ? packages.find((p) => p.id === selectedPackage)?.price.toLocaleString() || "0" : "0"}
                원
              </div>
              <div className="text-xs text-gray-400">
                {selectedPackage
                  ? Math.round((packages.find((p) => p.id === selectedPackage)?.price || 0) * 0.1).toLocaleString()
                  : "0"}
                원
              </div>
            </div>
          </div>
          <div className="text-right font-bold text-lg mt-2">
            {selectedPackage ? packages.find((p) => p.id === selectedPackage)?.price.toLocaleString() || "0" : "0"}원
          </div>
        </div>

        <Button className="w-full py-6 bg-[#FF0844] hover:bg-[#FF0844]/90 text-white" disabled={!selectedPackage}>
          결제하기
        </Button>
        <div className="text-xs text-gray-400 text-center mt-2">
          약관 및 주의 사항을 확인하였으며, 결제 계속 동의합니다.
        </div>
      </div>
    </div>
  )
}

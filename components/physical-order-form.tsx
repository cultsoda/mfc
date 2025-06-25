"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Minus, MapPin, CreditCard, Package } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PhysicalOrderFormProps {
  selectedCards: any[]
  onBack: () => void
  onOrderComplete: (orderData: any) => void
}

interface OrderItem {
  cardId: number
  cardName: string
  cardImage: string
  quantity: number
  unitPrice: number
  frameType: string
}

interface ShippingAddress {
  name: string
  phone: string
  zipCode: string
  address: string
  detailAddress: string
  memo?: string
}

export default function PhysicalOrderForm({ selectedCards, onBack, onOrderComplete }: PhysicalOrderFormProps) {
  const [currentStep, setCurrentStep] = useState<"items" | "shipping" | "payment">("items")
  
  // 주문 아이템 설정
  const [orderItems, setOrderItems] = useState<OrderItem[]>(
    selectedCards.map(card => ({
      cardId: card.id,
      cardName: card.name,
      cardImage: card.image,
      quantity: 1,
      unitPrice: getCardPrice(card.grade),
      frameType: "basic"
    }))
  )

  // 배송 정보
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: "",
    phone: "",
    zipCode: "",
    address: "",
    detailAddress: "",
    memo: ""
  })

  // 결제 정보
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "phone">("card")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)

  // 프레임 타입별 가격
  const frameTypes = [
    { id: "basic", name: "기본 프레임", price: 0, description: "심플한 화이트 프레임" },
    { id: "premium", name: "프리미엄 프레임", price: 2000, description: "고급 메탈 프레임" },
    { id: "luxury", name: "럭셔리 프레임", price: 5000, description: "특수 가공 프레임" }
  ]

  // 등급별 기본 가격
  function getCardPrice(grade: string): number {
    switch (grade) {
      case "S": return 8000
      case "A": return 5000
      case "C": return 3000
      default: return 3000
    }
  }

  // 수량 변경
  const updateQuantity = (cardId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setOrderItems(items =>
      items.map(item =>
        item.cardId === cardId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  // 프레임 타입 변경
  const updateFrameType = (cardId: number, frameType: string) => {
    setOrderItems(items =>
      items.map(item =>
        item.cardId === cardId ? { ...item, frameType } : item
      )
    )
  }

  // 총 가격 계산
  const calculateTotal = () => {
    const itemsTotal = orderItems.reduce((total, item) => {
      const framePrice = frameTypes.find(f => f.id === item.frameType)?.price || 0
      return total + (item.unitPrice + framePrice) * item.quantity
    }, 0)
    
    const shippingFee = itemsTotal >= 50000 ? 0 : 3000 // 5만원 이상 무료배송
    
    return {
      itemsTotal,
      shippingFee,
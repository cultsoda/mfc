"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Minus, X, Gavel, ShoppingCart, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AuctionScreenProps {
  onBack: () => void
}

export default function AuctionScreen({ onBack }: AuctionScreenProps) {
  const [activeTab, setActiveTab] = useState<"auction" | "special">("auction")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showBidModal, setShowBidModal] = useState(false)
  const [showMyBids, setShowMyBids] = useState(false)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [bidAmount, setBidAmount] = useState(1260000)
  const [timeLeft, setTimeLeft] = useState({ days: 6, hours: 1, minutes: 15, seconds: 9 })

  // 경매 아이템 데이터
  const auctionItems = [
    {
      id: 1,
      title: "환승모델 애장품과 의상",
      description: "제목영역이죠 길면 말줄임표가...",
      currentBid: 50000,
      bidCount: 64,
      image: "/placeholder.svg?height=200&width=200&text=상품이미지",
      seller: "환승모델",
      endTime: "2025.07.31 09:00 (KST)",
      instantPrice: 2000000,
      bidUnit: 10000,
      isHot: true
    },
    {
      id: 2,
      title: "환승모델 애장품과 의상",
      description: "스페셜 포토카드 세트",
      currentBid: 75000,
      bidCount: 45,
      image: "/placeholder.svg?height=200&width=200&text=상품이미지",
      seller: "환승모델",
      endTime: "2025.07.31 09:00 (KST)",
      instantPrice: 150000,
      bidUnit: 5000,
      isHot: false
    }
  ]

  // 입찰 내역 데이터
  const bidHistory = [
    { id: 1, bidder: "Ja****", amount: 1250000, time: "2025.05.19 10:20", isWinning: true },
    { id: 2, bidder: "상신*", amount: 1150000, time: "2025.05.19 10:20", isWinning: false },
    { id: 3, bidder: "금*", amount: 830000, time: "2025.05.19 10:20", isWinning: false },
    { id: 4, bidder: "금*", amount: 810000, time: "2025.05.19 10:20", isWinning: false }
  ]

  // 나의 입찰 현황
  const myBids = [
    { item: "벨라가르텐", myBid: 1250000, currentBid: 1450000, status: "outbid" },
    { item: "정다별이", myBid: 1150000, currentBid: 1150000, status: "winning" },
    { item: "겨우디", myBid: 50000, currentBid: 60000, status: "outbid" }
  ]

  // HOT 경매 순위
  const hotRankings = [
    { rank: 1, title: "바비지니 애장품과 ...", bidCount: 64, price: 2000000 },
    { rank: 2, title: "바비지니 애장품과 ...", bidCount: 54, price: 2000000 },
    { rank: 3, title: "바비지니 애장품과 ...", bidCount: 54, price: 2000000 },
    { rank: 4, title: "바비지니 애장품과 ...", bidCount: 54, price: 2000000 },
    { rank: 5, title: "바비지니 애장품과 ...", bidCount: 54, price: 2000000 }
  ]

  // 스페셜 포카 상품
  const specialItems = [
    { id: 1, name: "올팩 (실물 포토카드 20장 + 포토북)", price: 75000, selected: true },
    { id: 2, name: "스페셜팩", price: 150000, selected: false }
  ]

  // 타이머 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 입찰하기 모달
  if (showBidModal && selectedItem) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold">입찰하기</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowBidModal(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <p className="font-medium mb-2">희망 입찰가</p>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setBidAmount(Math.max(selectedItem.currentBid + selectedItem.bidUnit, bidAmount - selectedItem.bidUnit))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input 
                  type="number" 
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  className="text-center text-xl font-bold"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setBidAmount(bidAmount + selectedItem.bidUnit)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button 
              onClick={() => {
                setShowBidModal(false)
                // 입찰 완료 처리
                alert("입찰이 완료되었습니다!")
              }}
              className="w-full py-3 bg-[#FF4968] hover:bg-[#FF4968]/90 text-white"
            >
              입찰하기
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // 구매하기 모달 (스페셜 포카)
  if (showPurchaseModal) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold">구매하기</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowPurchaseModal(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-6">
            <p className="mb-6">구매하실 상품을 선택하세요.</p>
            
            <div className="space-y-3 mb-6">
              {specialItems.map((item) => (
                <div 
                  key={item.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer ${
                    item.selected ? "border-pink-300 bg-pink-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      item.selected ? "border-pink-500 bg-pink-500" : "border-gray-300"
                    } flex items-center justify-center`}>
                      {item.selected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-pink-600 font-bold">{item.price.toLocaleString()}원</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm">선택 : 올팩 (배송비 별도)</span>
                <span className="text-sm font-bold">결제 금액 : 75,000원</span>
              </div>
            </div>

            <Button 
              onClick={() => {
                setShowPurchaseModal(false)
                // 결제 페이지로 이동
                alert("결제 페이지로 이동합니다!")
              }}
              className="w-full py-3 bg-[#FF4968] hover:bg-[#FF4968]/90 text-white"
            >
              결제하기
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // 나의 입찰 현황 모달
  if (showMyBids) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold">나의 입찰 현황</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowMyBids(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-6">
            {myBids.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-xs text-gray-600 font-medium border-b pb-2">
                  <span>상품</span>
                  <span className="text-center">나의 입찰가</span>
                  <span className="text-center">현재 최고가</span>
                </div>
                
                {myBids.map((bid, index) => (
                  <div key={index} className={`grid grid-cols-3 gap-4 items-center py-3 rounded-lg ${
                    bid.status === "winning" ? "bg-green-50" : "bg-red-50"
                  }`}>
                    <span className="font-medium">{bid.item}</span>
                    <span className="text-center font-bold">{bid.myBid.toLocaleString()}원</span>
                    <span className={`text-center font-bold ${
                      bid.status === "winning" ? "text-green-600" : "text-red-600"
                    }`}>
                      {bid.currentBid.toLocaleString()}원
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>입찰 내역이 없어요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-black p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
          <div className="text-center">
            <p className="text-sm text-gray-400">투표 종료까지 남은 시간</p>
            <div className="flex items-center space-x-1 text-lg font-bold">
              <span className="bg-white text-black px-2 py-1 rounded">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-gray-400">일</span>
              <span className="bg-white text-black px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-gray-400">시간</span>
              <span className="bg-white text-black px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-gray-400">분</span>
              <span className="bg-white text-black px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-gray-400">초</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">2025. 07. 14 09:00 (KST)</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="px-4 py-2">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "auction" | "special")}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-900">
            <TabsTrigger value="auction" className="data-[state=active]:bg-[#FF4968]">굿즈 경매</TabsTrigger>
            <TabsTrigger value="special" className="data-[state=active]:bg-[#FF4968]">스페셜 포카</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1">
        {activeTab === "auction" ? (
          <div className="p-4">
            {/* 메인 헤더 */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">그 순간, 지금 내 손에.</h1>
              <p className="text-gray-400 text-sm">착용 의상부터 포토카드까지</p>
              <p className="text-gray-400 text-sm mb-4">한정 굿즈, 지금 바로 입찰하거나 구매해보세요.</p>
              
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1 border-gray-600 text-gray-300">
                  굿즈 경매
                </Button>
                <Button className="flex-1 bg-white text-black hover:bg-gray-100">
                  스페셜 포카
                </Button>
              </div>
            </div>

            {/* HOT 경매 순위 */}
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold flex items-center">
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs mr-2">HOT</span>
                  경매 순위
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-400"
                  onClick={() => setShowMyBids(true)}
                >
                  나의 입찰 현황
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-4 text-xs text-gray-500 pb-2 border-b border-gray-700">
                  <span>순위</span>
                  <span>상품</span>
                  <span className="text-center">입찰수</span>
                  <span className="text-center">입찰가</span>
                </div>
                
                {hotRankings.map((item) => (
                  <div key={item.rank} className="grid grid-cols-4 gap-4 items-center text-sm">
                    <span className="font-bold text-[#FF4968]">{item.rank}</span>
                    <span className="truncate">{item.title}</span>
                    <span className="text-center">{item.bidCount}</span>
                    <span className="text-center font-bold text-[#FF4968]">{item.price.toLocaleString()}원</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 경매 상품 그리드 */}
            <div className="grid grid-cols-2 gap-4">
              {auctionItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => {
                    setSelectedItem(item)
                    setShowBidModal(true)
                  }}
                >
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-32 object-cover"
                    />
                    {item.isHot && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        HOT
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-1 truncate">{item.seller} 애장품과 의상</h3>
                    <p className="text-xs text-gray-400 mb-2">실시간 입찰가</p>
                    <p className="font-bold text-[#FF4968]">{item.currentBid.toLocaleString()}원</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 하단 안내 */}
            <div className="mt-8 text-center">
              <Button className="bg-[#FF4968] hover:bg-[#FF4968]/90 text-white px-8 py-2">
                미공개 화보영상 보러가기 &gt;
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            {/* 스페셜 포카 헤더 */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">그 순간, 지금 내 손에.</h1>
              <p className="text-gray-400 text-sm">착용 의상부터 포토카드까지</p>
              <p className="text-gray-400 text-sm mb-4">한정 굿즈, 지금 바로 입찰하거나 구매해보세요.</p>
            </div>

            {/* 상품 목록 제목 */}
            <h2 className="text-lg font-bold mb-4">상품 목록</h2>

            {/* 스페셜 포카 그리드 */}
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div 
                  key={index}
                  className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => setShowPurchaseModal(true)}
                >
                  <img 
                    src="/placeholder.svg?height=150&width=150&text=스페셜+포카" 
                    alt="환승모델 스페셜 포카"
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <p className="font-medium text-sm">환승모델 스페셜 포카</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 하단 안내 */}
            <div className="mt-8 text-center">
              <Button className="bg-[#FF4968] hover:bg-[#FF4968]/90 text-white px-8 py-2">
                미공개 화보영상 보러가기 &gt;
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
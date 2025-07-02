"use client"

import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
const confetti = require("canvas-confetti")
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ShippingForm from "./shipping-form"
import ShareButton from "./share-button"

interface ResultScreenProps {
  card: {
    id: number
    grade: string
    image: string
    name: string
    description: string
  } | null
  onBackToMain: () => void
  onAddToCollection: () => void
  onShowCollection: () => void  // 기존: 내 컬렉션 상세로 이동
  onGoToMyPage: () => void      // 추가: 마이페이지로 이동
  onShowPurchase: () => void
  onShowMission?: () => void
}

export default function ResultScreen({
  card,
  onBackToMain,
  onAddToCollection,
  onShowCollection,
  onGoToMyPage,        // 새로 추가된 prop
  onShowPurchase,
}: ResultScreenProps) {
  const [showShipping, setShowShipping] = useState(false)
  const [activeTab, setActiveTab] = useState("result")
  const [puzzleProgress, setPuzzleProgress] = useState(7) // 총 20개 중 7개 완료
  const [showTooltip, setShowTooltip] = useState<number | null>(null)

  // 더미 데이터 - 실제로는 상태 관리 라이브러리나 컨텍스트를 사용하여 관리
  const dummyCards = [
    {
      id: 1,
      grade: "S",
      image: "/placeholder.svg?height=300&width=200&text=MFC-S급",
      name: "MFC-S급화보",
      collected: true,
    },
    {
      id: 2,
      grade: "S",
      image: "/placeholder.svg?height=300&width=200&text=MFC-S급",
      name: "MFC-S급화보",
      collected: false,
    },
    {
      id: 3,
      grade: "S",
      image: "/placeholder.svg?height=300&width=200&text=MFC-S급",
      name: "MFC-S급화보",
      collected: false,
    },
    {
      id: 4,
      grade: "A",
      image: "/placeholder.svg?height=300&width=200&text=MFC-A급",
      name: "MFC-A급화보",
      collected: true,
    },
    {
      id: 5,
      grade: "A",
      image: "/placeholder.svg?height=300&width=200&text=MFC-A급",
      name: "MFC-A급화보",
      collected: true,
    },
    {
      id: 6,
      grade: "A",
      image: "/placeholder.svg?height=300&width=200&text=MFC-A급",
      name: "MFC-A급화보",
      collected: false,
    },
    {
      id: 7,
      grade: "A",
      image: "/placeholder.svg?height=300&width=200&text=MFC-A급",
      name: "MFC-A급화보",
      collected: false,
    },
    {
      id: 8,
      grade: "A",
      image: "/placeholder.svg?height=300&width=200&text=MFC-A급",
      name: "MFC-A급화보",
      collected: false,
    },
    {
      id: 9,
      grade: "A",
      image: "/placeholder.svg?height=300&width=200&text=MFC-A급",
      name: "MFC-A급화보",
      collected: false,
    },
    {
      id: 10,
      grade: "C",
      image: "/placeholder.svg?height=300&width=200&text=MFC-C급",
      name: "MFC-C급화보",
      collected: true,
    },
    {
      id: 11,
      grade: "C",
      image: "/placeholder.svg?height=300&width=200&text=MFC-C급",
      name: "MFC-C급화보",
      collected: true,
    },
    {
      id: 12,
      grade: "C",
      image: "/placeholder.svg?height=300&width=200&text=MFC-C급",
      name: "MFC-C급화보",
      collected: true,
    },
  ]

  // 5x4 그리드의 퍼즐 조각 상태
  const puzzlePieces = Array(20)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      collected: index < 7, // 7개는 이미 수집됨
      isSpecial: [3, 8, 15].includes(index + 1), // S급 카드로 얻는 특별 조각
    }))

  const handlePieceClick = (id: number, collected: boolean) => {
    if (!collected) {
      setShowTooltip(id)
      setTimeout(() => setShowTooltip(null), 3000)
    }
  }

  // 새로 획득한 카드를 포함한 컬렉션
  const updatedCollection = [...dummyCards]
  if (card) {
    // 새 카드가 이미 컬렉션에 있는지 확인
    const existingCardIndex = updatedCollection.findIndex((c) => c.grade === card.grade && c.name.includes(card.grade))

    if (existingCardIndex === -1) {
      // 컬렉션에 없으면 추가
      updatedCollection.push({
        id: Math.max(...updatedCollection.map((c) => c.id)) + 1,
        grade: card.grade,
        image: card.image,
        name: card.name,
        collected: true,
      })
    }
  }

  useEffect(() => {
    // S급 카드일 경우 컨페티 효과
    if (card?.grade === "S") {
      const duration = 3 * 1000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#FF0844", "#FFD700"],
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#FF0844", "#FFD700"],
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    }
  }, [card])

  if (showShipping) {
    return (
      <ShippingForm 
        onBack={() => setShowShipping(false)} 
        onComplete={() => {
          setShowShipping(false)
          // 완료 후 처리 (예: 성공 메시지 표시)
        }} 
      />
    )
  }

  if (!card) return null

  const gradeColors = {
    S: "from-yellow-400 to-yellow-600",
    A: "from-gray-300 to-gray-500",
    C: "from-gray-700 to-gray-900",
  }

  const gradeText = {
    S: "S급 레어 화보",
    A: "A급 화보",
    C: "C급 화보",
  }

  // 새로 획득한 카드의 ID 찾기
  const newCardId = updatedCollection.find((c) => c.grade === card.grade && c.name.includes(card.grade))?.id || -1

  return (
    <div className="flex flex-col h-full py-4 bg-black text-white">
      <Tabs defaultValue="result" className="w-full h-full flex flex-col" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="result" className="data-[state=active]:bg-[#FF0844]">
            획득 결과
          </TabsTrigger>
          <TabsTrigger value="mission" className="data-[state=active]:bg-[#FF0844]">
            미션 진행
          </TabsTrigger>
        </TabsList>

        <TabsContent value="result" className="flex-1 flex flex-col items-center justify-center">
          {/* 카드 등급 표시 */}
          <div
            className={`text-center mb-4 px-4 py-2 rounded-full bg-gradient-to-r ${gradeColors[card.grade as keyof typeof gradeColors]}`}
          >
            <span className="font-bold">{gradeText[card.grade as keyof typeof gradeText]}</span>
          </div>

          {/* 카드 표시 */}
          <div
            className={`relative w-64 h-96 mb-6 rounded-lg overflow-hidden border-2 ${
              card.grade === "S"
                ? "border-yellow-400 animate-pulse"
                : card.grade === "A"
                  ? "border-gray-400"
                  : "border-gray-700"
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-b ${
                card.grade === "S"
                  ? "from-yellow-400/20 to-transparent"
                  : card.grade === "A"
                    ? "from-gray-400/20 to-transparent"
                    : "from-gray-700/20 to-transparent"
              }`}
            ></div>

            {/* 카드 등급 뱃지 */}
            <div
              className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                card.grade === "S" ? "bg-yellow-500" : card.grade === "A" ? "bg-gray-400" : "bg-gray-700"
              }`}
            >
              <span className="font-bold text-white">{card.grade}</span>
            </div>

            {/* 카드 이미지 */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="/placeholder.svg?height=250&width=150&text=인물이미지"
                alt="화보"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 카드 정보 */}
          <div className="w-full text-center mb-6">
            <h3 className="text-xl font-bold">인플루언서명-{card.grade}급 화보</h3>
            <p className="text-sm text-gray-400">{card.description}</p>

            {/* 공유 버튼 */}
            <div className="flex justify-center mt-2">
              <ShareButton />
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="w-full grid grid-cols-1 gap-3 mt-auto">
            <Button
              className="py-6 bg-[#FF0844] hover:bg-[#FF0844]/90 text-white"
              onClick={() => setShowShipping(true)}
            >
              <Download className="mr-2 h-4 w-4" />
              포토카드 만들기
            </Button>
            <Button
              variant="outline"
              className="py-6 border-[#FF0844] text-[#FF0844] hover:bg-[#FF0844]/10"
              onClick={() => onGoToMyPage()} // 수정: onShowCollection() → onGoToMyPage()
            >
              내 컬렉션 보기
            </Button>
          </div>

          {/* 다시 뽑기 버튼 */}
          <Button onClick={onBackToMain} className="mt-4 bg-gray-800 hover:bg-gray-700 text-white w-full py-2">
            다시 뽑기
          </Button>
        </TabsContent>

        <TabsContent value="mission" className="flex-1 flex flex-col">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">미션 진행 상황</h2>
            <p className="text-sm text-gray-400">
              현재 <span className="font-bold text-white">{puzzleProgress}</span>/20 조각을 모았습니다
            </p>
          </div>

          {/* 미션 진행 상태 */}
          <div className="w-full bg-gray-900 rounded-lg p-3 mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm">미션 진행 상황</div>
              <div className="text-sm font-bold">{Math.round((puzzleProgress / 20) * 100)}%</div>
            </div>
            <Progress
              value={(puzzleProgress / 20) * 100}
              className="h-2 bg-gray-800"
              indicatorClassName="bg-[#FF0844]"
            />
          </div>

          {/* 퍼즐 그리드 */}
          <div className="flex-1 bg-gray-900 rounded-lg p-4 mb-4 relative">
            <div className="grid grid-cols-5 grid-rows-4 gap-2 h-full">
              {puzzlePieces.map((piece) => (
                <div
                  key={piece.id}
                  className={`relative rounded-lg overflow-hidden border cursor-pointer ${
                    piece.collected
                      ? piece.isSpecial
                        ? "border-yellow-500 bg-yellow-500/20"
                        : "border-[#FF0844] bg-[#FF0844]/20"
                      : "border-gray-700 bg-gray-800"
                  }`}
                  onClick={() => handlePieceClick(piece.id, piece.collected)}
                >
                  {piece.collected ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=60&width=60&text=조각"
                        alt="미션 조각"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full border-2 border-gray-700 flex items-center justify-center">
                        <span className="text-xs">?</span>
                      </div>
                    </div>
                  )}

                  {showTooltip === piece.id && (
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs p-2 rounded w-40 z-10">
                      화보 뽑기를 하시면 미션을 완성하실 수 있어요
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-black/90"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 다운로드 버튼 색상 수정 - 다시 흰색으로 변경 */}
          <Button
            className="w-full py-4 bg-[#FF0844] hover:bg-[#FF0844]/90 text-white font-medium"
            disabled={puzzleProgress < 20}
          >
            <Download className="mr-2 h-4 w-4" />
            미공개 컷 다운로드
          </Button>

          {puzzleProgress < 20 && (
            <div className="text-xs text-center text-gray-400 mt-2">모든 조각을 수집하면 미공개컷을 볼 수 있어요</div>
          )}

          {/* 다시 뽑기 버튼 */}
          <Button onClick={onBackToMain} className="mt-4 bg-gray-800 hover:bg-gray-700 text-white w-full py-2">
            다시 뽑기
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}
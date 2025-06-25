"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ArrowLeft, Home, Heart, Grid3X3, ShoppingBag, User } from "lucide-react"
// 상단에 ShareButton import 추가
import ShareButton from "./share-button"

interface InfluencerDetailScreenProps {
  influencerId: string
  onBack: () => void
  onStartDrawing: () => void
  onShowPurchase: () => void
}

export default function InfluencerDetailScreen({
  influencerId,
  onBack,
  onStartDrawing,
  onShowPurchase,
}: InfluencerDetailScreenProps) {
  const [isShaking, setIsShaking] = useState(false)
  const [puzzleProgress, setPuzzleProgress] = useState(7) // 총 20개 중 7개 완료
  const [points, setPoints] = useState(10) // 보유 뽑기권
  const scrollRef = useRef<HTMLDivElement>(null)

  // 인플루언서 정보 (실제로는 ID를 기반으로 데이터를 가져와야 함)
  const influencers = {
    inf1: {
      id: "inf1",
      name: "김민지",
      image: "/placeholder.svg?height=400&width=300&text=인물이미지",
      description: "화보 뽑기",
    },
    inf2: {
      id: "inf2",
      name: "이하은",
      image: "/placeholder.svg?height=400&width=300&text=인물이미지",
      description: "화보 뽑기",
    },
    inf3: {
      id: "inf3",
      name: "박서아",
      image: "/placeholder.svg?height=400&width=300&text=인물이미지",
      description: "화보 뽑기",
    },
    inf4: {
      id: "inf4",
      name: "정다현",
      image: "/placeholder.svg?height=400&width=300&text=인물이미지",
      description: "화보 뽑기",
    },
    inf5: {
      id: "inf5",
      name: "최유나",
      image: "/placeholder.svg?height=400&width=300&text=인물이미지",
      description: "화보 뽑기",
    },
    inf6: {
      id: "inf6",
      name: "한소희",
      image: "/placeholder.svg?height=400&width=300&text=인물이미지",
      description: "화보 뽑기",
    },
  }

  const influencer = influencers[influencerId as keyof typeof influencers] || {
    id: influencerId,
    name: "정다현",
    image: "/placeholder.svg?height=400&width=300&text=인물이미지",
    description: "화보 뽑기",
  }

  const handleDrawButton = () => {
    if (points > 0) {
      setIsShaking(true)
      setTimeout(() => {
        setIsShaking(false)
        setPoints(points - 1)
        onStartDrawing()
      }, 800)
    } else {
      // 뽑기권이 없는 경우 처리 (실제로는 모달 등으로 구현)
      alert("뽑기권이 부족합니다. 뽑기권을 구매하시겠습니까?")
      onShowPurchase()
    }
  }

  useEffect(() => {
    // 롤링 영역이 좁아지는 문제 수정
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    // 컨테이너의 너비와 내용물의 너비를 계산
    const containerWidth = scrollContainer.clientWidth
    const contentWidth = scrollContainer.scrollWidth

    // 내용물이 컨테이너보다 작으면 롤링하지 않음
    if (contentWidth <= containerWidth) return

    let position = 0
    const scrollSpeed = 1
    const gap = 20 // 아이템 간 간격

    const autoScroll = () => {
      position += scrollSpeed

      // 첫 번째 아이템이 완전히 사라지면 맨 뒤로 이동시키는 효과
      if (position >= contentWidth / 20 + gap) {
        position = 0
      }

      if (scrollContainer) {
        scrollContainer.scrollLeft = position
      }
    }

    const interval = setInterval(autoScroll, 50)
    return () => clearInterval(interval)
  }, [])

  // 화보 이미지 더미 데이터
  const photoCards = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    image: "/placeholder.svg?height=200&width=150&text=인물이미지",
  }))

  return (
    <div className="flex flex-col h-full relative bg-black text-white pb-16">
      {/* 헤더 */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="absolute top-2 left-2 z-10 bg-black/30 text-white hover:bg-black/50"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* 인플루언서 이미지 및 정보 */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 z-10"></div>

          {/* 색종이 효과 */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ["#FF0844", "#FFD700", "#00FF00", "#FF00FF"][i % 4],
                  top: `${Math.random() * 30}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `fall ${1 + Math.random() * 3}s linear ${Math.random() * 2}s infinite`,
                }}
              />
            ))}
          </div>

          <img
            src={influencer.image || "/placeholder.svg"}
            alt={influencer.name}
            className="w-full h-64 object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
            <h1 className="text-2xl font-bold text-[#FF0844]">{influencer.name}</h1>
            <p className="text-sm text-gray-300">화보 뽑기</p>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 p-4">
        {/* 보유 뽑기권 표시 및 구매 버튼 */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="bg-gray-900 rounded-lg p-3 flex-1 mr-2">
            <div className="text-sm text-gray-400">보유 뽑기권</div>
            <div className="font-bold text-lg">{points}장</div>
          </div>
          <Button onClick={onShowPurchase} className="h-full py-3 px-4 bg-[#FF0844] hover:bg-[#FF0844]/90 text-white">
            뽑기권 구매
          </Button>
        </div>

        {/* 블러 처리된 이미지 스크롤 */}
        <div className="w-full mb-6">
          <div className="relative w-full overflow-hidden rounded-lg bg-gray-800 p-4">
            <h3 className="text-center text-sm mb-2 text-gray-400">{influencer.name}의 화보를 뽑아보세요</h3>
            <div className="relative overflow-hidden">
              <div
                ref={scrollRef}
                className="flex overflow-x-auto pb-4 space-x-3 hide-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {photoCards.map((card) => (
                  <div key={card.id} className="flex-shrink-0 relative">
                    <div className="w-24 h-36 rounded-lg overflow-hidden">
                      <img
                        src={card.image || "/placeholder.svg"}
                        alt="화보 미리보기"
                        className="w-full h-full object-cover filter blur-sm"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center">
                        <span className="text-xl">?</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 rounded-full p-1">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 미션 진행 상황 */}
        <div className="w-full bg-gray-900 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-400">미션 진행 상황</div>
            <div className="text-sm font-bold">{puzzleProgress}/20</div>
          </div>
          <Progress value={(puzzleProgress / 20) * 100} className="h-2 bg-gray-800" indicatorClassName="bg-[#FF0844]" />
          <div className="mt-2 text-xs text-gray-400 text-center">20장 모두 수집 시 미공개 컷이 완성됩니다!</div>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="p-4 bg-black">
        {/* 공유 버튼 */}
        <div className="flex justify-center mb-3">
          <ShareButton />
        </div>

        {/* 뽑기 버튼 */}
        <Button
          onClick={handleDrawButton}
          className={`w-full py-6 text-lg font-bold bg-[#FF0844] hover:bg-[#FF0844]/90 text-white ${
            isShaking ? "animate-shake" : ""
          }`}
          disabled={points < 1}
        >
          화보 뽑기
        </Button>

        {points < 1 && (
          <div className="text-xs text-[#FF0844] mt-2 text-center">뽑기권이 부족합니다. 뽑기권을 충전해주세요.</div>
        )}
      </div>

      {/* 하단 네비게이션 바 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-2 px-4">
        <div className="flex justify-around max-w-md mx-auto">
          <button className="flex flex-col items-center justify-center w-1/5 text-white">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">홈</span>
          </button>
          <button className="flex flex-col items-center justify-center w-1/5 text-white">
            <Heart className="h-5 w-5" />
            <span className="text-xs mt-1">투표</span>
          </button>
          <button className="flex flex-col items-center justify-center w-1/5 text-[#FF0844]">
            <Grid3X3 className="h-5 w-5" />
            <span className="text-xs mt-1">화보</span>
          </button>
          <button className="flex flex-col items-center justify-center w-1/5 text-white">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs mt-1">굿즈</span>
          </button>
          <button className="flex flex-col items-center justify-center w-1/5 text-white">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">마이</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

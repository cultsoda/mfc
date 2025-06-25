import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ArrowLeft, X, Grid3X3, Eye } from "lucide-react"

interface InfluencerDetailScreenProps {
  influencerId: string | null
  onBack: () => void
  onStartDrawing: () => void
  onShowPurchase: () => void
  onGoToMyPage?: () => void
}

// 모달 컴포넌트들
const MyCollectionModal = ({ isOpen, onClose, myCards, onGoToMyPage }: { 
  isOpen: boolean
  onClose: () => void
  myCards: any[]
  onGoToMyPage: () => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-lg max-h-[80vh] overflow-hidden">
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold text-white">내가 뽑은 화보</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* 모달 내용 */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {myCards.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
              {myCards.map((card, index) => (
                <div key={index} className="relative">
                  <div className="w-full aspect-[3/4] rounded-lg overflow-hidden border-2 border-pink-500">
                    <img
                      src={card.image || "/placeholder.svg"}
                      alt={`화보 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-1 right-1 bg-pink-500 text-white text-xs px-1 rounded">
                    #{card.number}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Grid3X3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>아직 뽑은 화보가 없습니다</p>
              <p className="text-sm mt-1">화보를 뽑아보세요!</p>
            </div>
          )}
          
          {/* 포토카드 만들기 버튼 */}
          {myCards.length > 0 && (
            <div className="border-t border-gray-700 pt-4">
              <Button
                onClick={() => {
                  onClose()
                  onGoToMyPage()
                }}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
              >
                <Grid3X3 className="w-4 h-4" />
                포토카드 만들기
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const MissionProgressModal = ({ isOpen, onClose, progress, totalCards }: {
  isOpen: boolean
  onClose: () => void
  progress: number
  totalCards: number
}) => {
  if (!isOpen) return null

  // 미션 진행 상황 그리드 (4x5 = 20칸)
  const createProgressGrid = () => {
    const grid = []
    for (let i = 0; i < totalCards; i++) {
      const isCollected = i < progress
      grid.push(
        <div 
          key={i} 
          className={`aspect-[3/4] rounded-lg border-2 flex items-center justify-center ${
            isCollected 
              ? 'border-pink-500 bg-gray-700' 
              : 'border-gray-600 bg-gray-800'
          }`}
        >
          {isCollected ? (
            <div className="w-full h-full rounded-lg bg-gray-600 flex items-center justify-center">
              <Eye className="w-6 h-6 text-pink-500" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-lg text-gray-400">?</span>
            </div>
          )}
        </div>
      )
    }
    return grid
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-lg max-h-[80vh] overflow-hidden">
        {/* 모달 헤더 */}
        <div className="bg-red-600 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">미션 진행</h2>
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* 미션 진행 상황 */}
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-white font-bold mb-2">미션 진행 상황</h3>
            <p className="text-gray-400 text-sm mb-2">현재 {progress}/20 조각을 모았습니다</p>
            
            {/* 진행률 바 */}
            <div className="bg-gray-800 rounded-lg p-3 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-white">미션 진행 상황</span>
                <span className="text-sm font-bold text-white">35%</span>
              </div>
              <Progress 
                value={(progress / totalCards) * 100} 
                className="h-2 bg-gray-700" 
                indicatorClassName="bg-red-500" 
              />
            </div>
          </div>
          
          {/* 그리드 */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {createProgressGrid()}
          </div>
          
          {/* 하단 안내 */}
          <div className="bg-red-600 rounded-lg p-4 text-center">
            <div className="text-white text-sm mb-2">
              미공개 컷 다운로드
            </div>
            <div className="text-white/80 text-xs">
              모든 조각을 수집하면 미공개컷을 볼 수 있어요
            </div>
          </div>
          
          <div className="mt-4">
            <Button 
              onClick={onClose}
              className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white"
            >
              다시 뽑기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InfluencerDetailScreen({
  influencerId,
  onBack,
  onStartDrawing,
  onShowPurchase,
  onGoToMyPage,
}: InfluencerDetailScreenProps) {
  const [isShaking, setIsShaking] = useState(false)
  const [puzzleProgress, setPuzzleProgress] = useState(7) // 총 20개 중 7개 완료
  const [points, setPoints] = useState(10) // 보유 뽑기권
  const [showMyCollection, setShowMyCollection] = useState(false)
  const [showMissionProgress, setShowMissionProgress] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // 내가 뽑은 화보 데이터 (더미)
  const myCards = [
    { number: 1, image: "/placeholder.svg?height=300&width=200&text=화보1" },
    { number: 3, image: "/placeholder.svg?height=300&width=200&text=화보3" },
    { number: 5, image: "/placeholder.svg?height=300&width=200&text=화보5" },
    { number: 7, image: "/placeholder.svg?height=300&width=200&text=화보7" },
    { number: 12, image: "/placeholder.svg?height=300&width=200&text=화보12" },
    { number: 15, image: "/placeholder.svg?height=300&width=200&text=화보15" },
    { number: 18, image: "/placeholder.svg?height=300&width=200&text=화보18" },
  ]

  // 인플루언서 정보
  const influencers = {
    inf1: {
      id: "inf1",
      name: "김민지",
      image: "/placeholder.svg?height=400&width=300&text=인물이미지",
      description: "화보 뽑기",
    },
  }

  const influencer = influencers[influencerId as keyof typeof influencers] || {
    id: influencerId || "inf1",
    name: "김민지",
    image: "/placeholder.svg?height=400&width=300&text=인물이미지",
    description: "화보 뽑기",
  }

  // 화보 카드 더미 데이터
  const photoCards = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    image: `/placeholder.svg?height=300&width=200&text=화보${i + 1}`,
    isCollected: myCards.some(card => card.number === i + 1)
  }))

  const handleDrawButton = () => {
    if (points > 0) {
      setIsShaking(true)
      setTimeout(() => {
        setIsShaking(false)
        setPoints(points - 1)
        onStartDrawing()
      }, 800)
    } else {
      alert("뽑기권이 부족합니다. 뽑기권을 구매하시겠습니까?")
    }
  }

  if (!influencerId) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>인플루언서를 선택해주세요</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 컨테이너를 반응형으로 제한 - 최대 너비 설정 */}
      <div className="mx-auto max-w-sm lg:max-w-6xl xl:max-w-7xl">
        
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 bg-black sticky top-0 z-30">
          <button onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold">화보 뽑기</h1>
          <div className="w-6 h-6" />
        </div>

        {/* PC/태블릿용 2컬럼 레이아웃, 모바일용 1컬럼 */}
        <div className="lg:flex lg:gap-8 lg:p-6 lg:max-w-5xl lg:mx-auto">
          
          {/* 왼쪽 영역 - 인플루언서 정보 (모바일에서는 상단) */}
          <div className="lg:w-[40%] lg:max-w-[400px] lg:flex-shrink-0">
            {/* 상단 이미지 영역 */}
            <div className="relative h-64 lg:h-80 xl:h-96 overflow-hidden rounded-lg">
              <div className="absolute inset-0 z-10">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full opacity-70"
                    style={{
                      backgroundColor: ["#FFD700", "#00FF00", "#FF69B4", "#FF00FF"][i % 4],
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
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white bg-gradient-to-t from-black/70 to-transparent">
                <h1 className="text-xl lg:text-2xl font-bold text-[#FF0844]">{influencer.name}</h1>
                <p className="text-sm text-gray-300">화보 뽑기</p>
              </div>
            </div>

            {/* PC/태블릿에서는 여기에 뽑기 버튼들 위치 */}
            <div className="hidden lg:block mt-6 space-y-4">
              {/* 보유 뽑기권 표시 및 구매 버튼 */}
              <div className="flex items-center justify-between">
                <div className="bg-gray-900 rounded-lg p-3 flex-1 mr-2">
                  <div className="text-sm text-gray-400">보유 뽑기권</div>
                  <div className="font-bold text-lg">{points}장</div>
                </div>
                <Button onClick={onShowPurchase} className="py-3 px-4 bg-[#FF0844] hover:bg-[#FF0844]/90 text-white whitespace-nowrap">
                  뽑기권 구매
                </Button>
              </div>

              {/* 내가 뽑은 화보 보기 버튼 */}
              <Button
                onClick={() => setShowMyCollection(true)}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                내가 뽑은 화보 보기 ({myCards.length}장)
              </Button>

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
                <div className="text-xs text-[#FF0844] text-center">뽑기권이 부족합니다. 뽑기권을 충전해주세요.</div>
              )}

              {/* 공유 버튼 */}
              <div className="flex justify-center">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  공유하기
                </button>
              </div>
            </div>
          </div>

          {/* 오른쪽 영역 - 화보 미리보기 및 미션 정보 (모바일에서는 하단) */}
          <div className="lg:flex-1 p-4 lg:p-0">

            
            {/* 모바일에서만 보이는 뽑기권 정보 */}
            <div className="lg:hidden mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gray-900 rounded-lg p-3 flex-1 mr-2">
                  <div className="text-sm text-gray-400">보유 뽑기권</div>
                  <div className="font-bold text-lg">{points}장</div>
                </div>
                <Button onClick={onShowPurchase} className="py-3 px-4 bg-[#FF0844] hover:bg-[#FF0844]/90 text-white">
                  뽑기권 구매
                </Button>
              </div>

              {/* 내가 뽑은 화보 보기 버튼 */}
              <Button
                onClick={() => setShowMyCollection(true)}
                className="w-full py-3 mb-4 bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                내가 뽑은 화보 보기 ({myCards.length}장)
              </Button>
            </div>

            {/* 블러 처리된 이미지 스크롤 */}
            <div className="mb-6">
              <div className="relative overflow-hidden rounded-lg bg-gray-800 p-4">
                <h3 className="text-center text-sm mb-4 text-gray-400">{influencer.name}의 화보를 뽑아보세요</h3>
                <div className="relative overflow-hidden">
                  <div
                    ref={scrollRef}
                    className="flex overflow-x-auto pb-4 space-x-3 hide-scrollbar"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {photoCards.map((card) => (
                      <div key={card.id} className="flex-shrink-0 relative">
                        <div className="w-20 md:w-24 h-28 md:h-36 rounded-lg overflow-hidden">
                          <img
                            src={card.image || "/placeholder.svg"}
                            alt="화보 미리보기"
                            className={`w-full h-full object-cover ${!card.isCollected ? 'filter blur-sm' : ''}`}
                          />
                        </div>
                        {!card.isCollected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 md:w-8 h-6 md:h-8 bg-black/70 rounded-full flex items-center justify-center">
                              <span className="text-sm md:text-xl">?</span>
                            </div>
                          </div>
                        )}
                        {card.isCollected && (
                          <div className="absolute top-1 right-1 bg-pink-500 text-white text-xs px-1 rounded">
                            ✓
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 rounded-full p-1">
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </div>
            </div>

            {/* 미션 진행 상황 - 클릭 가능하게 수정 */}
            <div 
              className="bg-gray-900 rounded-lg p-4 cursor-pointer hover:bg-gray-800 transition-colors"
              onClick={() => setShowMissionProgress(true)}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-400">미션 진행 상황</div>
                <div className="text-sm font-bold">{puzzleProgress}/20</div>
              </div>
              <Progress value={(puzzleProgress / 20) * 100} className="h-2 bg-gray-800" indicatorClassName="bg-[#FF0844]" />
              <div className="mt-2 text-xs text-gray-400 text-center">20장 모두 수집 시 미공개 컷이 완성됩니다!</div>
            </div>
          </div>
        </div>

        {/* 모바일에서만 보이는 하단 고정 버튼 영역 */}
        <div className="lg:hidden sticky bottom-0 p-4 bg-black border-t border-gray-800">
          {/* 공유 버튼 */}
          <div className="flex justify-center mb-3">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              공유하기
            </button>
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
      </div>

      {/* 모달들 */}
      <MyCollectionModal 
        isOpen={showMyCollection}
        onClose={() => setShowMyCollection(false)}
        myCards={myCards}
        onGoToMyPage={() => onGoToMyPage && onGoToMyPage()}
      />
      
      <MissionProgressModal
        isOpen={showMissionProgress}
        onClose={() => setShowMissionProgress(false)}
        progress={puzzleProgress}
        totalCards={20}
      />

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        .animate-shake {
          animation: shake 0.8s;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  Download, 
  X,
  CheckCircle2
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

// 타입 정의
interface Card {
  id: number
  number: number
  grade: "S" | "A" | "C"
  image: string
}

interface Influencer {
  id: string
  name: string
  totalCards: number
  collectedCards: Card[]
}

interface Round {
  name: string
  influencers: Record<string, Influencer>
}

interface RoundsData {
  round1: Round
  round2: Round
  round3: Round
  round4: Round
}

// 더미 데이터
const roundsData: RoundsData = {
  round1: {
    name: "라운드 1",
    influencers: {
      kimMinji: {
        id: "kimMinji",
        name: "김민지",
        totalCards: 20,
        collectedCards: [
          { id: 1, number: 1, grade: "S", image: "/placeholder.svg?height=300&width=200&text=화보1" },
          { id: 3, number: 3, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보3" },
          { id: 5, number: 5, grade: "C", image: "/placeholder.svg?height=300&width=200&text=화보5" },
          { id: 7, number: 7, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보7" },
          { id: 12, number: 12, grade: "S", image: "/placeholder.svg?height=300&width=200&text=화보12" },
          { id: 15, number: 15, grade: "C", image: "/placeholder.svg?height=300&width=200&text=화보15" },
          { id: 18, number: 18, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보18" },
          { id: 20, number: 20, grade: "S", image: "/placeholder.svg?height=300&width=200&text=화보20" }
        ]
      },
      leeHaEun: {
        id: "leeHaEun",
        name: "이하은",
        totalCards: 20,
        collectedCards: [
          { id: 21, number: 2, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보2" },
          { id: 24, number: 4, grade: "C", image: "/placeholder.svg?height=300&width=200&text=화보4" },
          { id: 26, number: 6, grade: "S", image: "/placeholder.svg?height=300&width=200&text=화보6" },
          { id: 28, number: 8, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보8" },
          { id: 30, number: 10, grade: "C", image: "/placeholder.svg?height=300&width=200&text=화보10" }
        ]
      },
      parkSeoA: {
        id: "parkSeoA",
        name: "박서아",
        totalCards: 20,
        collectedCards: [
          { id: 41, number: 1, grade: "S", image: "/placeholder.svg?height=300&width=200&text=화보1" },
          { id: 43, number: 3, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보3" },
          { id: 45, number: 5, grade: "C", image: "/placeholder.svg?height=300&width=200&text=화보5" },
          { id: 47, number: 7, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보7" },
          { id: 49, number: 9, grade: "S", image: "/placeholder.svg?height=300&width=200&text=화보9" },
          { id: 51, number: 11, grade: "C", image: "/placeholder.svg?height=300&width=200&text=화보11" },
          { id: 53, number: 13, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보13" },
          { id: 55, number: 15, grade: "S", image: "/placeholder.svg?height=300&width=200&text=화보15" }
        ]
      },
      jungDaHyun: {
        id: "jungDaHyun",
        name: "정다현",
        totalCards: 20,
        collectedCards: [
          { id: 61, number: 2, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보2" },
          { id: 63, number: 4, grade: "C", image: "/placeholder.svg?height=300&width=200&text=화보4" },
          { id: 65, number: 6, grade: "S", image: "/placeholder.svg?height=300&width=200&text=화보6" },
          { id: 67, number: 8, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보8" }
        ]
      }
    }
  },
  round2: {
    name: "라운드 2",
    influencers: {
      kimMinji: {
        id: "kimMinji",
        name: "김민지",
        totalCards: 20,
        collectedCards: []
      },
      leeHaEun: {
        id: "leeHaEun", 
        name: "이하은",
        totalCards: 20,
        collectedCards: []
      }
    }
  },
  round3: {
    name: "라운드 3",
    influencers: {}
  },
  round4: {
    name: "라운드 4", 
    influencers: {}
  }
}

export default function ImprovedMyCollection() {
  const [activeRound, setActiveRound] = useState<keyof RoundsData>("round1")
  const [expandedInfluencers, setExpandedInfluencers] = useState<string[]>(["kimMinji"]) // 첫 번째만 펼친 상태
  const [showMyCollectionModal, setShowMyCollectionModal] = useState(false)
  const [showCardDetailModal, setShowCardDetailModal] = useState(false)
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  // 라운드별 컬렉션 현황 계산
  const calculateRoundStats = (roundKey: keyof RoundsData) => {
    const round = roundsData[roundKey]
    if (!round) return { S: "0/0", A: "0/0", C: "0/0", total: "0/0" }

    let totalCollected = 0
    let totalCards = 0
    const gradeStats = { S: 0, A: 0, C: 0 }
    const gradeTotals = { S: 0, A: 0, C: 0 }

    Object.values(round.influencers).forEach((influencer: Influencer) => {
      totalCards += influencer.totalCards
      totalCollected += influencer.collectedCards.length

      // 각 등급별 통계 계산 (가정: 각 인플루언서당 S:6, A:9, C:5)
      gradeTotals.S += 6
      gradeTotals.A += 9  
      gradeTotals.C += 5

      influencer.collectedCards.forEach((card: Card) => {
        gradeStats[card.grade]++
      })
    })

    return {
      S: `${gradeStats.S}/${gradeTotals.S}`,
      A: `${gradeStats.A}/${gradeTotals.A}`,
      C: `${gradeStats.C}/${gradeTotals.C}`,
      total: `${totalCollected}/${totalCards}`
    }
  }

  const currentRoundStats = calculateRoundStats(activeRound)

  // 인플루언서 펼치기/접기 토글
  const toggleInfluencer = (influencerId: string) => {
    setExpandedInfluencers(prev =>
      prev.includes(influencerId)
        ? prev.filter(id => id !== influencerId)
        : [...prev, influencerId]
    )
  }

  // 포토카드&다운로드 버튼 클릭
  const handlePhotocardDownload = (influencer: Influencer) => {
    setSelectedInfluencer(influencer)
    setShowMyCollectionModal(true)
  }

  // 화보 카드 클릭
  const handleCardClick = (card: Card) => {
    setSelectedCard(card)
    setShowCardDetailModal(true)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-4">
        {/* 헤더 */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2 -ml-3">
            <ArrowLeft className="h-5 w-5 text-white" />
          </Button>
          <h2 className="text-xl font-bold">마이페이지</h2>
        </div>

        {/* 탭 네비게이션 */}
        <Tabs defaultValue="my-collection" className="w-full">
          <TabsList className="bg-gray-900 w-full mb-6">
            <TabsTrigger value="purchase-history" className="flex-1 data-[state=active]:bg-[#FF0844]">
              구매 내역
            </TabsTrigger>
            <TabsTrigger value="my-collection" className="flex-1 data-[state=active]:bg-[#FF0844]">
              내 컬렉션
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-collection">
            {/* 라운드 구분 탭 */}
            <div className="mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {Object.entries(roundsData).map(([roundKey, round]) => (
                  <Button
                    key={roundKey}
                    variant={activeRound === roundKey ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveRound(roundKey as keyof RoundsData)}
                    className={
                      activeRound === roundKey
                        ? "bg-[#FF0844] text-white border-[#FF0844] whitespace-nowrap"
                        : "border-gray-600 text-gray-300 hover:bg-gray-800 whitespace-nowrap"
                    }
                  >
                    {round.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* 컬렉션 현황 */}
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm text-gray-400">컬렉션 현황</div>
                <div className="text-sm font-bold">{currentRoundStats.total} 수집</div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-800 p-3 rounded-lg text-center">
                  <div className="text-xs text-gray-400 mb-1">S급</div>
                  <div className="text-sm font-bold">{currentRoundStats.S}</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg text-center">
                  <div className="text-xs text-gray-400 mb-1">A급</div>
                  <div className="text-sm font-bold">{currentRoundStats.A}</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg text-center">
                  <div className="text-xs text-gray-400 mb-1">C급</div>
                  <div className="text-sm font-bold">{currentRoundStats.C}</div>
                </div>
              </div>
            </div>

            {/* 인플루언서별 컬렉션 (접이식) */}
            <div className="space-y-4">
              {Object.entries(roundsData[activeRound].influencers).map(([influencerId, influencer]) => {
                const isExpanded = expandedInfluencers.includes(influencerId)
                const completionPercentage = Math.round((influencer.collectedCards.length / influencer.totalCards) * 100)
                
                return (
                  <div key={influencerId} className="bg-gray-900 rounded-lg overflow-hidden">
                    {/* 인플루언서 헤더 */}
                    <div 
                      className="p-4 cursor-pointer hover:bg-gray-800 transition-colors"
                      onClick={() => toggleInfluencer(influencerId)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-lg">{influencer.name[0]}</span>
                          </div>
                          <div>
                            <div className="font-bold">{influencer.name}</div>
                            <div className="text-sm text-gray-400">
                              {influencer.collectedCards.length}/{influencer.totalCards} 수집
                              {influencer.collectedCards.length === influencer.totalCards && (
                                <CheckCircle2 className="w-4 h-4 text-green-400 inline ml-2" />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right text-sm">
                            <div className="font-bold text-[#FF0844]">{completionPercentage}%</div>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                      
                      {/* 진행률 바 */}
                      <div className="mt-3">
                        <Progress 
                          value={completionPercentage} 
                          className="h-2 bg-gray-800" 
                          indicatorClassName="bg-[#FF0844]" 
                        />
                      </div>
                    </div>

                    {/* 펼쳐진 내용 */}
                    {isExpanded && (
                      <div className="border-t border-gray-700">
                        {/* 포토카드&다운로드 버튼 */}
                        <div className="p-4 border-b border-gray-700">
                          <Button
                            onClick={() => handlePhotocardDownload(influencer)}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            포토카드 & 다운로드 ({influencer.collectedCards.length}장)
                          </Button>
                        </div>

                        {/* 화보 그리드 */}
                        <div className="p-4">
                          {influencer.collectedCards.length > 0 ? (
                            <div className="grid grid-cols-4 gap-3">
                              {influencer.collectedCards.map((card) => (
                                <div
                                  key={card.id}
                                  className="relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#FF0844] transition-all"
                                  onClick={() => handleCardClick(card)}
                                  style={{ aspectRatio: '3/4' }}
                                >
                                  {/* 화보 이미지 */}
                                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                    <img
                                      src={card.image}
                                      alt={`화보 ${card.number}`}
                                      className="w-full h-full object-cover"
                                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        const target = e.currentTarget
                                        const sibling = target.nextElementSibling as HTMLElement | null
                                        target.style.display = 'none'
                                        if (sibling) {
                                          sibling.style.display = 'flex'
                                        }
                                      }}
                                    />
                                    {/* 이미지 로드 실패 시 플레이스홀더 */}
                                    <div 
                                      className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 text-xs" 
                                      style={{ display: 'none' }}
                                    >
                                      화보 {card.number}
                                    </div>
                                  </div>
                                  
                                  {/* 등급 배지 */}
                                  <div className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                    card.grade === 'S' ? 'bg-yellow-500 text-black' :
                                    card.grade === 'A' ? 'bg-blue-500 text-white' :
                                    'bg-gray-500 text-white'
                                  }`}>
                                    {card.grade}
                                  </div>
                                  
                                  {/* 화보 번호 */}
                                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                    #{card.number}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-400">
                              아직 수집한 화보가 없습니다.
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 내가 뽑은 화보 모달 */}
      {showMyCollectionModal && selectedInfluencer && (
        <MyCollectionModal
          isOpen={showMyCollectionModal}
          onClose={() => setShowMyCollectionModal(false)}
          influencer={selectedInfluencer}
        />
      )}

      {/* 화보 상세 모달 */}
      {showCardDetailModal && selectedCard && (
        <CardDetailModal
          isOpen={showCardDetailModal}
          onClose={() => setShowCardDetailModal(false)}
          card={selectedCard}
        />
      )}
    </div>
  )
}

// 내가 뽑은 화보 모달 컴포넌트
interface MyCollectionModalProps {
  isOpen: boolean
  onClose: () => void
  influencer: Influencer
}

const MyCollectionModal = ({ isOpen, onClose, influencer }: MyCollectionModalProps) => {
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([])

  if (!isOpen) return null

  const handleCardSelect = (cardId: number) => {
    setSelectedCardIds(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    )
  }

  const isAllCollected = influencer.collectedCards.length === influencer.totalCards
  const isAnyCardSelected = selectedCardIds.length > 0

  const handleDownload = () => {
    if (isAllCollected) {
      alert('일괄 다운로드(ZIP)가 시작됩니다.')
    } else {
      alert(`${selectedCardIds.length}개의 화보를 개별 다운로드합니다.`)
    }
  }

  const handleCreatePhotocard = () => {
    alert(`${selectedCardIds.length}개의 포토카드를 제작합니다.`)
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-lg max-h-[80vh] flex flex-col">
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
          <h2 className="text-lg font-bold text-white">{influencer.name}의 화보</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 모달 내용 */}
        <div className="p-4 overflow-y-auto flex-1">
          {influencer.collectedCards.length > 0 ? (
            <>
              {/* 전체 선택 체크박스 */}
              <div className="flex items-center gap-2 mb-4 p-3 bg-gray-800 rounded-lg">
                <Checkbox
                  id="selectAll"
                  checked={selectedCardIds.length === influencer.collectedCards.length && influencer.collectedCards.length > 0}
                  onCheckedChange={(checked: boolean) => {
                    if (checked) {
                      setSelectedCardIds(influencer.collectedCards.map((card: Card) => card.id))
                    } else {
                      setSelectedCardIds([])
                    }
                  }}
                />
                <label htmlFor="selectAll" className="text-sm cursor-pointer">
                  전체 선택 ({selectedCardIds.length}/{influencer.collectedCards.length})
                </label>
              </div>

              {/* 화보 그리드 */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {influencer.collectedCards.map((card) => (
                  <div key={card.id} className="relative">
                    <div 
                      className="bg-gray-800 rounded-lg overflow-hidden relative cursor-pointer hover:ring-2 hover:ring-[#FF0844] transition-all"
                      style={{ aspectRatio: '3/4' }}
                    >
                      {/* 화보 이미지 */}
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <img
                          src={card.image}
                          alt={`화보 ${card.number}`}
                          className="w-full h-full object-cover"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            const target = e.currentTarget
                            const sibling = target.nextElementSibling as HTMLElement | null
                            target.style.display = 'none'
                            if (sibling) {
                              sibling.style.display = 'flex'
                            }
                          }}
                        />
                        {/* 이미지 로드 실패 시 플레이스홀더 */}
                        <div 
                          className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 text-sm" 
                          style={{ display: 'none' }}
                        >
                          화보 {card.number}
                        </div>
                      </div>
                      
                      {/* 등급 배지 */}
                      <div className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        card.grade === 'S' ? 'bg-yellow-500 text-black' :
                        card.grade === 'A' ? 'bg-blue-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {card.grade}
                      </div>
                      
                      {/* 화보 번호 */}
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        #{card.number}
                      </div>
                    </div>
                    
                    {/* 체크박스 */}
                    <div className="absolute top-1 right-1">
                      <Checkbox
                        checked={selectedCardIds.includes(card.id)}
                        onCheckedChange={() => handleCardSelect(card.id)}
                        className="bg-white/90"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <div className="text-4xl mb-4">📸</div>
              <p>아직 수집한 화보가 없습니다.</p>
              <p className="text-sm mt-2">화보 뽑기를 해보세요!</p>
            </div>
          )}
        </div>

        {/* 모달 푸터 */}
        {influencer.collectedCards.length > 0 && (
          <div className="p-4 border-t border-gray-700 flex-shrink-0">
            <div className="flex gap-2">
              <Button
                onClick={handleDownload}
                disabled={!isAllCollected && !isAnyCardSelected}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                {isAllCollected ? '일괄 다운로드' : `다운로드 (${selectedCardIds.length})`}
              </Button>
              <Button
                onClick={handleCreatePhotocard}
                disabled={!isAnyCardSelected}
                className="flex-1 bg-[#FF0844] hover:bg-[#FF0844]/90 disabled:bg-gray-600 text-white"
              >
                포토카드 제작 ({selectedCardIds.length})
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// 화보 상세 모달 컴포넌트  
interface CardDetailModalProps {
  isOpen: boolean
  onClose: () => void
  card: Card
}

const CardDetailModal = ({ isOpen, onClose, card }: CardDetailModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md">
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold text-white">화보 상세</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 화보 이미지 */}
        <div className="p-4">
          <div className="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden relative mb-4">
            <img
              src={card.image}
              alt={`화보 ${card.number}`}
              className="w-full h-full object-cover"
            />
            <div className={`absolute top-2 right-2 px-2 py-1 text-sm rounded font-bold ${
              card.grade === 'S' ? 'bg-yellow-500 text-black' :
              card.grade === 'A' ? 'bg-blue-500 text-white' :
              'bg-gray-500 text-white'
            }`}>
              {card.grade}급
            </div>
          </div>

          {/* 화보 정보 */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">화보 번호:</span>
              <span>#{card.number}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">등급:</span>
              <span className={
                card.grade === 'S' ? 'text-yellow-400' :
                card.grade === 'A' ? 'text-blue-400' :
                'text-gray-400'
              }>
                {card.grade}급
              </span>
            </div>
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-[#FF0844] hover:bg-[#FF0844]/90 text-white"
              onClick={() => alert('포토카드 제작 페이지로 이동합니다.')}
            >
              포토카드 제작
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
              onClick={() => alert('다운로드가 시작됩니다.')}
            >
              <Download className="w-4 h-4" />
              다운로드
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
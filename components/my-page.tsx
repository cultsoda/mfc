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
  grade: "S" | "A" | "C"
  image: string
}

interface Influencer {
  id: string
  name: string
  totalCards: number
  collectedCards: Card[]
}

interface PurchasedContent {
  id: string
  name: string
  bCutPhotos?: string[] // B컷 화보 (20장)
  allPackPhotos?: string[] // 올팩 (2장)
  specialPackPhotos?: string[] // 스페셜팩 (1,2라운드: 3장 / 3,4라운드: 1장)
}

interface Round {
  name: string
  influencers: Record<string, Influencer>
  purchasedContent: Record<string, PurchasedContent>
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
          { id: 1, grade: "S", image: "/placeholder.svg?height=300&width=200&text=화보1" },
          { id: 3, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보3" },
          { id: 5, grade: "C", image: "/placeholder.svg?height=300&width=200&text=화보5" },
          { id: 7, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보7" },
          { id: 12, grade: "S", image: "/placeholder.svg?height=300&width=200&text=화보12" },
          { id: 15, grade: "C", image: "/placeholder.svg?height=300&width=200&text=화보15" },
          { id: 18, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보18" },
          { id: 20, grade: "S", image: "/placeholder.svg?height=300&width=200&text=화보20" }
        ]
      },
      leeHaEun: {
        id: "leeHaEun",
        name: "이하은",
        totalCards: 20,
        collectedCards: [
          { id: 21, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보2" },
          { id: 24, grade: "C", image: "/placeholder.svg?height=300&width=200&text=화보4" },
          { id: 26, grade: "S", image: "/placeholder.svg?height=300&width=200&text=화보6" },
          { id: 28, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보8" },
          { id: 30, grade: "C", image: "/placeholder.svg?height=300&width=200&text=화보10" }
        ]
      },
      parkSeoA: {
        id: "parkSeoA",
        name: "박서아",
        totalCards: 20,
        collectedCards: [
          { id: 41, grade: "S", image: "/placeholder.svg?height=300&width=200&text=화보1" },
          { id: 43, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보3" },
          { id: 45, grade: "C", image: "/placeholder.svg?height=300&width=200&text=화보5" },
          { id: 47, grade: "A", image: "/placeholder.svg?height=300&width=200&text=화보7" }
        ]
      }
    },
    purchasedContent: {
      kimMinji: {
        id: "kimMinji",
        name: "김민지",
        specialPackPhotos: [
          "/placeholder.svg?height=300&width=200&text=민지스페셜1",
          "/placeholder.svg?height=300&width=200&text=민지스페셜2",
          "/placeholder.svg?height=300&width=200&text=민지스페셜3"
        ]
      },
      leeHaEun: {
        id: "leeHaEun",
        name: "이하은",
        specialPackPhotos: [
          "/placeholder.svg?height=300&width=200&text=하은스페셜1",
          "/placeholder.svg?height=300&width=200&text=하은스페셜2",
          "/placeholder.svg?height=300&width=200&text=하은스페셜3"
        ]
      },
      parkSeoA: {
        id: "parkSeoA",
        name: "박서아",
        specialPackPhotos: [
          "/placeholder.svg?height=300&width=200&text=서아스페셜1",
          "/placeholder.svg?height=300&width=200&text=서아스페셜2",
          "/placeholder.svg?height=300&width=200&text=서아스페셜3"
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
      },
      parkSeoA: {
        id: "parkSeoA",
        name: "박서아",
        totalCards: 20,
        collectedCards: []
      }
    },
    purchasedContent: {
      kimMinji: {
        id: "kimMinji",
        name: "김민지",
        bCutPhotos: Array.from({ length: 20 }, (_, i) => 
          `/placeholder.svg?height=300&width=200&text=민지B컷${i + 1}`
        ),
        specialPackPhotos: [
          "/placeholder.svg?height=300&width=200&text=민지스페셜1",
          "/placeholder.svg?height=300&width=200&text=민지스페셜2",
          "/placeholder.svg?height=300&width=200&text=민지스페셜3"
        ]
      },
      leeHaEun: {
        id: "leeHaEun",
        name: "이하은",
        bCutPhotos: Array.from({ length: 20 }, (_, i) => 
          `/placeholder.svg?height=300&width=200&text=하은B컷${i + 1}`
        ),
        specialPackPhotos: [
          "/placeholder.svg?height=300&width=200&text=하은스페셜1",
          "/placeholder.svg?height=300&width=200&text=하은스페셜2",
          "/placeholder.svg?height=300&width=200&text=하은스페셜3"
        ]
      }
    }
  },
  round3: {
    name: "라운드 3",
    influencers: {},
    purchasedContent: {
      kimMinji: {
        id: "kimMinji",
        name: "김민지",
        bCutPhotos: Array.from({ length: 20 }, (_, i) => 
          `/placeholder.svg?height=300&width=200&text=민지B컷${i + 1}`
        ),
        allPackPhotos: [
          "/placeholder.svg?height=300&width=200&text=민지올팩1",
          "/placeholder.svg?height=300&width=200&text=민지올팩2"
        ],
        specialPackPhotos: [
          "/placeholder.svg?height=300&width=200&text=민지미공개셀카1"
        ]
      },
      leeHaEun: {
        id: "leeHaEun",
        name: "이하은",
        bCutPhotos: Array.from({ length: 20 }, (_, i) => 
          `/placeholder.svg?height=300&width=200&text=하은B컷${i + 1}`
        ),
        allPackPhotos: [
          "/placeholder.svg?height=300&width=200&text=하은올팩1",
          "/placeholder.svg?height=300&width=200&text=하은올팩2"
        ],
        specialPackPhotos: [
          "/placeholder.svg?height=300&width=200&text=하은미공개셀카1"
        ]
      },
      parkSeoA: {
        id: "parkSeoA",
        name: "박서아",
        allPackPhotos: [
          "/placeholder.svg?height=300&width=200&text=서아올팩1",
          "/placeholder.svg?height=300&width=200&text=서아올팩2"
        ],
        specialPackPhotos: [
          "/placeholder.svg?height=300&width=200&text=서아미공개셀카1"
        ]
      }
    }
  },
  round4: {
    name: "라운드 4",
    influencers: {},
    purchasedContent: {}
  }
}

export default function ImprovedMyPage() {
  const [activeTab, setActiveTab] = useState<"photos" | "purchased">("photos")
  const [activeRound, setActiveRound] = useState<keyof RoundsData>("round1")
  const [expandedInfluencers, setExpandedInfluencers] = useState<string[]>(["kimMinji"])
  
  // 구매 상품 탭의 펼쳐진 상태 - 라운드별로 첫 번째 인플루언서 자동 펼침
  const [expandedPurchased, setExpandedPurchased] = useState<Record<string, string[]>>({
    round1: ["kimMinji"],
    round2: ["kimMinji"], 
    round3: ["kimMinji"],
    round4: []
  })
  
  // 모달 상태들
  const [showMyCollectionModal, setShowMyCollectionModal] = useState(false)
  const [showCardDetailModal, setShowCardDetailModal] = useState(false)
  const [showMissionModal, setShowMissionModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  
  // 선택된 항목들
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null)
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [missionInfluencer, setMissionInfluencer] = useState<Influencer | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>("")

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

  // 토글 함수들
  const toggleInfluencer = (influencerId: string) => {
    setExpandedInfluencers(prev =>
      prev.includes(influencerId)
        ? prev.filter(id => id !== influencerId)
        : [...prev, influencerId]
    )
  }

  const togglePurchasedInfluencer = (influencerId: string) => {
    setExpandedPurchased(prev => ({
      ...prev,
      [activeRound]: prev[activeRound].includes(influencerId)
        ? prev[activeRound].filter(id => id !== influencerId)
        : [...prev[activeRound], influencerId]
    }))
  }

  // 이벤트 핸들러들
  const handlePhotocardDownload = (influencer: Influencer) => {
    setSelectedInfluencer(influencer)
    setShowMyCollectionModal(true)
  }

  const handleCardClick = (card: Card) => {
    setSelectedCard(card)
    setShowCardDetailModal(true)
  }

  const handleMissionClick = (influencer: Influencer, e: React.MouseEvent) => {
    e.stopPropagation()
    setMissionInfluencer(influencer)
    setShowMissionModal(true)
  }

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc)
    setShowImageModal(true)
  }

  const handleDownloadImage = () => {
    const link = document.createElement('a')
    link.href = selectedImage
    link.download = `image_${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleBulkDownload = (influencerName: string, images: string[]) => {
    alert(`${influencerName}의 B컷 화보 ${images.length}장을 일괄 다운로드합니다.`)
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

        {/* 메인 탭 네비게이션 */}
        <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as "photos" | "purchased")}
 className="w-full">
          <TabsList className="bg-gray-900 w-full mb-6">
            <TabsTrigger value="photos" className="flex-1 data-[state=active]:bg-[#FF0844]">
              화보 뽑기
            </TabsTrigger>
            <TabsTrigger value="purchased" className="flex-1 data-[state=active]:bg-[#FF0844]">
              구매 상품
            </TabsTrigger>
          </TabsList>

          {/* 화보 뽑기 탭 */}
          <TabsContent value="photos">
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

            {/* 인플루언서별 컬렉션 */}
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
                          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
                            {influencer.name.charAt(0)}
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
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => handleMissionClick(influencer, e)}
                            className="text-xs px-2 py-1 h-6 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                          >
                            미션
                          </Button>
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
                        {/* 버튼 영역 */}
                        <div className="p-4 border-b border-gray-700">
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handlePhotocardDownload(influencer)}
                              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              포토카드 & 다운로드 ({influencer.collectedCards.length}장)
                            </Button>
                            <Button
                              onClick={() => {
                                alert(`${influencer.name}의 화보 뽑기 페이지로 이동합니다.`)
                              }}
                              className="bg-[#FF0844] hover:bg-[#FF0844]/90 text-white px-4 whitespace-nowrap"
                            >
                              화보 뽑기
                            </Button>
                          </div>
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
                                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                    <img
                                      src={card.image}
                                      alt={`${influencer.name} 화보`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  
                                  <div className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                    card.grade === 'S' ? 'bg-yellow-500 text-black' :
                                    card.grade === 'A' ? 'bg-blue-500 text-white' :
                                    'bg-gray-500 text-white'
                                  }`}>
                                    {card.grade}
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

          {/* 구매 상품 탭 */}
          <TabsContent value="purchased">
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
                        ? "bg-[#FF0844] text-white hover:bg-[#FF0844]/90 whitespace-nowrap"
                        : "text-gray-400 border-gray-600 hover:text-white hover:border-gray-400 whitespace-nowrap"
                    }
                  >
                    {round.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* 구매 상품 리스트 */}
            <div className="space-y-4">
              {Object.keys(roundsData[activeRound].purchasedContent).length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p>구매한 상품이 없습니다.</p>
                </div>
              ) : (
                Object.values(roundsData[activeRound].purchasedContent).map((content) => (
                  <div key={content.id} className="bg-gray-900 rounded-lg overflow-hidden">
                    <button
                      onClick={() => togglePurchasedInfluencer(content.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
                          {content.name.charAt(0)}
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold">{content.name}</h3>
                          <p className="text-sm text-gray-400">
                            구매한 상품 보기
                          </p>
                        </div>
                      </div>
                      <div className="text-gray-400">
                        {expandedPurchased[activeRound]?.includes(content.id) ? "▲" : "▼"}
                      </div>
                    </button>

                    {expandedPurchased[activeRound]?.includes(content.id) && (
                      <div className="p-4 border-t border-gray-800 space-y-6">
                        {/* B컷 화보 */}
                        {content.bCutPhotos && content.bCutPhotos.length > 0 && (
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">B컷 화보 ({content.bCutPhotos.length}장)</h4>
                              <Button
                                size="sm"
                                onClick={() => handleBulkDownload(content.name, content.bCutPhotos!)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                <Download className="w-4 h-4 mr-1" />
                                일괄 다운로드
                              </Button>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                              {content.bCutPhotos.map((image, index) => (
                                <div
                                  key={index}
                                  className="aspect-[3/4] rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                                  onClick={() => handleImageClick(image)}
                                >
                                  <img
                                    src={image}
                                    alt={`B컷 ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 올팩 */}
                        {content.allPackPhotos && content.allPackPhotos.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3">스페셜 포카 &gt; 올팩 ({content.allPackPhotos.length}장)</h4>
                            <div className="grid grid-cols-4 gap-3">
                              {content.allPackPhotos.map((image, index) => (
                                <div
                                  key={index}
                                  className="aspect-[3/4] rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                                  onClick={() => handleImageClick(image)}
                                >
                                  <img
                                    src={image}
                                    alt={`올팩 ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 스페셜팩 */}
                        {content.specialPackPhotos && content.specialPackPhotos.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3">스페셜 포카 &gt; 스페셜팩 ({content.specialPackPhotos.length}장)</h4>
                            <div className="grid grid-cols-4 gap-3">
                              {content.specialPackPhotos.map((image, index) => (
                                <div
                                  key={index}
                                  className="aspect-[3/4] rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                                  onClick={() => handleImageClick(image)}
                                >
                                  <img
                                    src={image}
                                    alt={`스페셜팩 ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* 모달들 */}
        {showMyCollectionModal && selectedInfluencer && (
          <MyCollectionModal
            isOpen={showMyCollectionModal}
            onClose={() => setShowMyCollectionModal(false)}
            influencer={selectedInfluencer}
          />
        )}

        {showCardDetailModal && selectedCard && (
          <CardDetailModal
            isOpen={showCardDetailModal}
            onClose={() => setShowCardDetailModal(false)}
            card={selectedCard}
          />
        )}

        {showMissionModal && missionInfluencer && (
          <MissionProgressModal
            isOpen={showMissionModal}
            onClose={() => setShowMissionModal(false)}
            influencer={missionInfluencer}
          />
        )}

        {/* 이미지 모달 (구매 상품용) */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-3xl w-full">
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              
              <div className="bg-white rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt="확대 이미지"
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="p-4 bg-gray-100 flex justify-center">
                  <Button
                    onClick={handleDownloadImage}
                    className="bg-[#FF0844] hover:bg-[#FF0844]/90 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    다운로드
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
                {influencer.collectedCards.map((card: Card) => (
                  <div key={card.id} className="relative">
                    <div 
                      className="bg-gray-800 rounded-lg overflow-hidden relative cursor-pointer hover:ring-2 hover:ring-[#FF0844] transition-all"
                      style={{ aspectRatio: '3/4' }}
                    >
                      {/* 화보 이미지 */}
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <img
                          src={card.image}
                          alt={`${influencer.name} 화보`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* 등급 배지 */}
                      <div className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        card.grade === 'S' ? 'bg-yellow-500 text-black' :
                        card.grade === 'A' ? 'bg-blue-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {card.grade}
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

// 미션 진행상황 모달 컴포넌트
interface MissionProgressModalProps {
  isOpen: boolean
  onClose: () => void
  influencer: Influencer
}

const MissionProgressModal = ({ isOpen, onClose, influencer }: MissionProgressModalProps) => {
  if (!isOpen) return null

  const progress = influencer.collectedCards.length
  const totalCards = influencer.totalCards
  const progressPercentage = Math.round((progress / totalCards) * 100)
  const isCompleted = progress === totalCards

  // 퍼즐 조각 상태 생성 (5x4 그리드)
  const puzzlePieces = Array(totalCards)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      collected: index < progress,
      isSpecial: [3, 8, 15].includes(index + 1), // S급 카드로 얻는 특별 조각 (예시)
    }))

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-[#FF0844] text-white rounded-t-lg">
          <h2 className="text-lg font-bold">{influencer.name} - 미션 진행</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 모달 내용 */}
        <div className="p-4">
          {/* 전체 진행도 */}
          <div className="mb-6 text-center">
            <div className="text-2xl font-bold text-[#FF0844] mb-2">
              {progress}/{totalCards} 완료
            </div>
            <div className="text-lg text-gray-300 mb-3">
              {progressPercentage}% 달성
            </div>
            <Progress 
              value={progressPercentage} 
              className="h-3 bg-gray-800" 
              indicatorClassName="bg-[#FF0844]" 
            />
            {!isCompleted && (
              <div className="text-sm text-gray-400 mt-2">
                {totalCards - progress}개 더 수집하면 미션 완료!
              </div>
            )}
          </div>

          {/* 퍼즐 그리드 */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 text-center">컬렉션 진행 상황</h3>
            <div className="grid grid-cols-5 gap-2 p-4 bg-gray-800 rounded-lg">
              {puzzlePieces.map((piece) => (
                <div
                  key={piece.id}
                  className={`aspect-square rounded-lg border-2 flex items-center justify-center ${
                    piece.collected
                      ? piece.isSpecial
                        ? "border-yellow-500 bg-yellow-500/20"
                        : "border-[#FF0844] bg-[#FF0844]/20"
                      : "border-gray-600 bg-gray-700"
                  }`}
                >
                  {piece.collected ? (
                    <div className="w-full h-full flex items-center justify-center">
                      {piece.isSpecial ? (
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-black font-bold">★</span>
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-[#FF0844] rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">✓</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-500 flex items-center justify-center">
                      <span className="text-xs text-gray-500">?</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 미션 정보 */}
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <h3 className="font-bold mb-3 flex items-center text-[#FF0844]">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              미션 완료 보상
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF0844]"></div>
                <span>{influencer.name}의 모든 화보를 모으면 특별한 미공개 화보를 획득</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span>S급 화보를 뽑으면 특별 조각(★) 획득</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>디지털 화보와 실물 포토카드 제작 할인 쿠폰 제공</span>
              </div>
            </div>
          </div>

          {/* 완료 상태에 따른 버튼 */}
          {isCompleted ? (
            <Button 
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-[#FF0844] hover:from-yellow-600 hover:to-[#FF0844]/90 text-white font-bold text-lg"
              onClick={() => alert(`${influencer.name} 미션 완료 보상을 받았습니다!`)}
            >
              🎉 미션 완료 보상 받기 🎉
            </Button>
          ) : (
            <div className="text-center text-gray-400 text-sm">
              {influencer.name}의 화보 뽑기를 계속해서 미션을 완성해보세요!
            </div>
          )}
        </div>
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
        <div className="p-6">
          <div className="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden relative mb-6 border-2 border-gray-600 max-h-96">
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <img
                src={card.image}
                alt={`${card.grade}급 화보`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`absolute top-3 right-3 px-3 py-1.5 text-sm rounded font-bold ${
              card.grade === 'S' ? 'bg-yellow-500 text-black' :
              card.grade === 'A' ? 'bg-blue-500 text-white' :
              'bg-gray-500 text-white'
            }`}>
              {card.grade}급
            </div>
          </div>

          {/* 화보 정보 */}
          <div className="space-y-3 text-sm">
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
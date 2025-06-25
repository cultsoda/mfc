"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, ArrowLeft, Square, CheckSquare, ChevronDown, ChevronRight } from "lucide-react"
import PhotocardMaker from "@/components/photocard-maker"

interface CollectionScreenProps {
  onBackToMain: () => void
  onShowPurchase: () => void
  onShowPhysicalOrder: (cards: any) => void
}

export default function CollectionScreen({ onBackToMain, onShowPurchase, onShowPhysicalOrder }: CollectionScreenProps) {
  const [selectMode, setSelectMode] = useState(false)
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [gradeFilter, setGradeFilter] = useState<"all" | "S" | "A" | "C">("all")
  const [expandedInfluencer, setExpandedInfluencer] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [showDownloadConfirm, setShowDownloadConfirm] = useState(false)
  const [showPhotocardMaker, setShowPhotocardMaker] = useState(false)

  // 더미 데이터 - 실제로는 상태 관리 라이브러리나 컨텍스트를 사용하여 관리
  const influencers = [
    {
      id: "inf1",
      name: "김민지",
      totalCards: 12,
      collectedCards: 5,
    },
    {
      id: "inf2",
      name: "이하은",
      totalCards: 10,
      collectedCards: 3,
    },
    {
      id: "inf3",
      name: "박서아",
      totalCards: 8,
      collectedCards: 2,
    },
    {
      id: "inf4",
      name: "정다현",
      totalCards: 10,
      collectedCards: 4,
    },
  ]

  // 인플루언서별 카드 데이터
  const cardsByInfluencer = {
    inf1: [
      {
        id: 1,
        grade: "S",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+S급",
        name: "김민지-S급화보",
        collected: true,
        influencer: "김민지"
      },
      {
        id: 2,
        grade: "S",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+S급",
        name: "김민지-S급화보",
        collected: false,
        influencer: "김민지"
      },
      {
        id: 3,
        grade: "A",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+A급",
        name: "김민지-A급화보",
        collected: true,
        influencer: "김민지"
      },
      {
        id: 4,
        grade: "A",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+A급",
        name: "김민지-A급화보",
        collected: true,
        influencer: "김민지"
      },
      {
        id: 5,
        grade: "A",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+A급",
        name: "김민지-A급화보",
        collected: false,
        influencer: "김민지"
      },
      {
        id: 6,
        grade: "C",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+C급",
        name: "김민지-C급화보",
        collected: true,
        influencer: "김민지"
      },
      {
        id: 7,
        grade: "C",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+C급",
        name: "김민지-C급화보",
        collected: true,
        influencer: "김민지"
      },
      {
        id: 8,
        grade: "C",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+C급",
        name: "김민지-C급화보",
        collected: false,
        influencer: "김민지"
      },
    ],
    inf2: [
      {
        id: 9,
        grade: "S",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+S급",
        name: "이하은-S급화보",
        collected: false,
        influencer: "이하은"
      },
      {
        id: 10,
        grade: "A",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+A급",
        name: "이하은-A급화보",
        collected: true,
        influencer: "이하은"
      },
      {
        id: 11,
        grade: "A",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+A급",
        name: "이하은-A급화보",
        collected: false,
        influencer: "이하은"
      },
      {
        id: 12,
        grade: "C",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+C급",
        name: "이하은-C급화보",
        collected: true,
        influencer: "이하은"
      },
      {
        id: 13,
        grade: "C",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+C급",
        name: "이하은-C급화보",
        collected: true,
        influencer: "이하은"
      },
    ],
    inf3: [
      {
        id: 14,
        grade: "S",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+S급",
        name: "박서아-S급화보",
        collected: false,
        influencer: "박서아"
      },
      {
        id: 15,
        grade: "A",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+A급",
        name: "박서아-A급화보",
        collected: true,
        influencer: "박서아"
      },
      {
        id: 16,
        grade: "C",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+C급",
        name: "박서아-C급화보",
        collected: true,
        influencer: "박서아"
      },
    ],
    inf4: [
      {
        id: 17,
        grade: "S",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+S급",
        name: "정다현-S급화보",
        collected: false,
        influencer: "정다현"
      },
      {
        id: 18,
        grade: "A",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+A급",
        name: "정다현-A급화보",
        collected: true,
        influencer: "정다현"
      },
      {
        id: 19,
        grade: "A",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+A급",
        name: "정다현-A급화보",
        collected: true,
        influencer: "정다현"
      },
      {
        id: 20,
        grade: "C",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+C급",
        name: "정다현-C급화보",
        collected: true,
        influencer: "정다현"
      },
      {
        id: 21,
        grade: "C",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+C급",
        name: "정다현-C급화보",
        collected: true,
        influencer: "정다현"
      },
    ],
  }

  const toggleCardSelection = (id: number) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id))
    } else {
      setSelectedCards([...selectedCards, id])
    }
  }

  const toggleSelectMode = () => {
    setSelectMode(!selectMode)
    if (selectMode) {
      setSelectedCards([])
    }
  }

  const selectAll = () => {
    const allCollectedIds: number[] = []
    Object.values(cardsByInfluencer).forEach((cards) =>
      cards.forEach((card) => {
        if (card.collected && (gradeFilter === "all" || card.grade === gradeFilter)) {
          allCollectedIds.push(card.id)
        }
      }),
    )
    setSelectedCards(allCollectedIds)
  }

  const toggleInfluencer = (influencerId: string) => {
    if (expandedInfluencer === influencerId) {
      setExpandedInfluencer(null)
    } else {
      setExpandedInfluencer(influencerId)
    }
  }

  // 전체 수집 통계 계산
  const totalStats = {
    total: 0,
    collected: 0,
    byGrade: {
      S: { total: 0, collected: 0 },
      A: { total: 0, collected: 0 },
      C: { total: 0, collected: 0 },
    },
  }

  Object.values(cardsByInfluencer).forEach((cards) => {
    cards.forEach((card) => {
      totalStats.total++
      if (card.collected) totalStats.collected++

      totalStats.byGrade[card.grade as keyof typeof totalStats.byGrade].total++
      if (card.collected) {
        totalStats.byGrade[card.grade as keyof typeof totalStats.byGrade].collected++
      }
    })
  })

  // 선택된 카드들의 데이터 가져오기
  const getSelectedCardsData = () => {
    const selectedCardsData: any[] = []
    Object.values(cardsByInfluencer).forEach((cards) => {
      cards.forEach((card) => {
        if (selectedCards.includes(card.id)) {
          selectedCardsData.push(card)
        }
      })
    })
    return selectedCardsData
  }

  // 포토카드 제작 버튼 클릭
  const handleMakePhotocard = () => {
    if (selectedCards.length > 0) {
      setShowPhotocardMaker(true)
    }
  }

  // 포토카드 다운로드 완료
  const handleDownloadComplete = (cards: any[]) => {
    setShowPhotocardMaker(false)
    setSelectMode(false)
    setSelectedCards([])
    // 성공 메시지 표시
    alert(`${cards.length}장의 포토카드가 다운로드되었습니다.`)
  }

  // 실물 주문 처리
  const handlePhysicalOrder = (cards: any[]) => {
    setShowPhotocardMaker(false)
    onShowPhysicalOrder(cards)
  }

  // 포토카드 메이커가 활성화된 경우
  if (showPhotocardMaker) {
    return (
      <PhotocardMaker
        selectedCards={getSelectedCardsData()}
        onBack={() => setShowPhotocardMaker(false)}
        onDownload={handleDownloadComplete}
        onOrderPhysical={handlePhysicalOrder}
      />
    )
  }

  const renderCardGrid = (cards: (typeof cardsByInfluencer)["inf1"]) => {
    const filteredCards = gradeFilter === "all" ? cards : cards.filter((card) => card.grade === gradeFilter)

    if (filteredCards.length === 0) {
      return <div className="py-4 text-center text-gray-500 text-sm">{gradeFilter} 등급 화보가 없습니다.</div>
    }

    return (
      <div className="grid grid-cols-3 gap-3 py-2">
        {filteredCards.map((card) => (
          <div key={card.id} className="relative">
            <div
              className={`aspect-[2/3] rounded-lg overflow-hidden cursor-pointer ${
                !card.collected ? "opacity-50 grayscale" : ""
              }`}
              onClick={() => card.collected && (selectMode ? toggleCardSelection(card.id) : setSelectedImage(card))}
            >
              <img src={card.image || "/placeholder.svg"} alt={card.name} className="w-full h-full object-cover" />

              {/* 선택 체크박스 표시 */}
              {card.collected && selectMode && (
                <div className="absolute top-2 left-2 z-20">
                  {selectedCards.includes(card.id) ? (
                    <CheckSquare className="h-6 w-6 text-[#FF0844] bg-white/80 rounded" />
                  ) : (
                    <Square className="h-6 w-6 text-gray-400 bg-black/50 rounded" />
                  )}
                </div>
              )}

              {/* 선택 오버레이 */}
              {card.collected && selectedCards.includes(card.id) && (
                <div className="absolute inset-0 bg-[#FF0844]/20 border-2 border-[#FF0844] rounded-lg"></div>
              )}

              {/* 등급 뱃지 */}
              {card.grade === "S" && card.collected && (
                <div className="absolute top-1 right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">S</span>
                </div>
              )}
              {card.grade === "A" && card.collected && (
                <div className="absolute top-1 right-1 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">A</span>
                </div>
              )}
              {card.grade === "C" && card.collected && (
                <div className="absolute top-1 right-1 w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">C</span>
                </div>
              )}

              {/* 미수집 표시 */}
              {!card.collected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center">
                    <span className="text-xl">?</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <div className="sticky top-0 z-10 bg-black pt-4 pb-2">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBackToMain} className="mr-2 -ml-3">
              <ArrowLeft className="h-5 w-5 text-white" />
            </Button>
            <h2 className="text-xl font-bold">내 컬렉션 상세</h2>
          </div>
          <div className="text-sm text-gray-400">
            <span className="font-bold">{totalStats.collected}</span>/{totalStats.total} 수집
          </div>
        </div>

        {/* 선택 모드 컨트롤 */}
        <div className="flex justify-between items-center mb-4">
          <Button
            variant={selectMode ? "default" : "outline"}
            size="sm"
            onClick={toggleSelectMode}
            className={selectMode ? "bg-[#FF0844]" : "border-gray-600 text-gray-400"}
          >
            {selectMode ? "제작 취소" : "포토카드 제작"}
          </Button>

          {selectMode && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={selectAll} className="border-gray-600 text-gray-400">
                전체 선택
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCards([])}
                className="border-gray-600 text-gray-400"
              >
                선택 해제
              </Button>
            </div>
          )}
        </div>

        {/* 등급 필터 */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <Tabs
              defaultValue="all"
              className="w-full"
              value={gradeFilter}
              onValueChange={(value) => setGradeFilter(value as "all" | "S" | "A" | "C")}
            >
              <TabsList className="bg-gray-900 w-full">
                <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-[#FF0844]">
                  전체
                </TabsTrigger>
                <TabsTrigger value="S" className="flex-1 data-[state=active]:bg-[#FF0844]">
                  S급
                  <span className="ml-1 text-xs">
                    ({totalStats.byGrade.S.collected}/{totalStats.byGrade.S.total})
                  </span>
                </TabsTrigger>
                <TabsTrigger value="A" className="flex-1 data-[state=active]:bg-[#FF0844]">
                  A급
                  <span className="ml-1 text-xs">
                    ({totalStats.byGrade.A.collected}/{totalStats.byGrade.A.total})
                  </span>
                </TabsTrigger>
                <TabsTrigger value="C" className="flex-1 data-[state=active]:bg-[#FF0844]">
                  C급
                  <span className="ml-1 text-xs">
                    ({totalStats.byGrade.C.collected}/{totalStats.byGrade.C.total})
                  </span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* 인플루언서별 화보 목록 */}
      <div className="flex-1 overflow-y-auto">
        {influencers.map((influencer) => {
          const cards = cardsByInfluencer[influencer.id as keyof typeof cardsByInfluencer] || []
          const filteredCards = gradeFilter === "all" ? cards : cards.filter((card) => card.grade === gradeFilter)

          if (filteredCards.length === 0) return null

          const collectedCount = filteredCards.filter((card) => card.collected).length

          return (
            <div key={influencer.id} className="mb-4 bg-gray-900 rounded-lg overflow-hidden">
              <div
                className="p-3 flex justify-between items-center cursor-pointer border-b border-gray-800"
                onClick={() => toggleInfluencer(influencer.id)}
              >
                <div className="flex items-center">
                  <div className="font-bold">{influencer.name}</div>
                  <div className="ml-2 text-sm text-gray-400">
                    {collectedCount}/{filteredCards.length} 수집
                  </div>
                </div>
                <div className="flex items-center">
                  {expandedInfluencer === influencer.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>

              {expandedInfluencer === influencer.id && renderCardGrid(cards)}
            </div>
          )
        })}
      </div>

      {/* 선택된 카드가 있을 때 하단 제작 버튼 */}
      {selectedCards.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 p-4 bg-black border-t border-gray-800">
          <Button onClick={handleMakePhotocard} className="w-full py-4 bg-[#FF0844] hover:bg-[#FF0844]/90 text-white">
            <ShoppingBag className="mr-2 h-4 w-4" />
            선택한 {selectedCards.length}개 포토카드 만들기
          </Button>
        </div>
      )}

      {/* 이미지 상세보기 모달 */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
          <div className="fixed top-0 left-0 right-0 bg-black/80 p-4 flex items-center z-50">
            <Button variant="ghost" size="icon" onClick={() => setSelectedImage(null)} className="mr-2">
              <ArrowLeft className="h-5 w-5 text-white" />
            </Button>
            <h2 className="text-lg font-bold">{selectedImage.name}</h2>
          </div>

          <div className="relative w-full max-w-sm mt-16">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="relative aspect-[2/3] w-full">
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedImage.grade === "S"
                      ? "bg-yellow-500"
                      : selectedImage.grade === "A"
                        ? "bg-gray-400"
                        : "bg-gray-700"
                  }`}
                >
                  <span className="font-bold text-white">{selectedImage.grade}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{selectedImage.name}</h3>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button 
                    onClick={() => {
                      setSelectedCards([selectedImage.id])
                      setSelectedImage(null)
                      setShowPhotocardMaker(true)
                    }} 
                    className="bg-[#FF0844] hover:bg-[#FF0844]/90 text-white"
                  >
                    포토카드 제작
                  </Button>
                  <Button
                    onClick={() => setShowDownloadConfirm(true)}
                    variant="outline"
                    className="border-gray-600 text-black bg-white hover:bg-gray-100"
                  >
                    다운로드
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 다운로드 확인 모달 */}
      {showDownloadConfirm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4 text-center">다운로드 확인</h3>
            <p className="text-sm text-gray-300 mb-6 text-center">
              개인 감상용으로만 이용해주세요. 무단 유포시 법적 책임이 따를 수 있습니다.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-600"
                onClick={() => setShowDownloadConfirm(false)}
              >
                취소
              </Button>
              <Button
                className="flex-1 bg-[#FF0844]"
                onClick={() => {
                  // 실제 다운로드 로직
                  const link = document.createElement('a')
                  link.download = `${selectedImage.name}.jpg`
                  link.href = selectedImage.image
                  link.click()
                  setShowDownloadConfirm(false)
                  setSelectedImage(null)
                }}
              >
                동의
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Grid3X3, Filter, Check, X } from "lucide-react"
import PhotocardMaker from "./photocard-maker"

interface CollectionScreenProps {
  onBack?: () => void
  onShowPhysicalOrder: (cards: any[]) => void
  onBackToMain?: () => void
  onShowPurchase?: () => void
}

export default function CollectionScreen({ onBack, onShowPhysicalOrder, onBackToMain, onShowPurchase }: CollectionScreenProps) {
  const [gradeFilter, setGradeFilter] = useState<"all" | "S" | "A" | "C">("all")
  const [expandedInfluencer, setExpandedInfluencer] = useState<string | null>(null)
  const [selectMode, setSelectMode] = useState(false)
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [showDownloadConfirm, setShowDownloadConfirm] = useState(false)
  const [showPhotocardMaker, setShowPhotocardMaker] = useState(false)

  // 인플루언서별 카드 데이터 (김민지 전체 수집 완료로 설정)
  const cardsByInfluencer = {
    inf1: [
      // 김민지 - 모든 카드 수집 완료 (20/20)
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        grade: i % 7 === 0 ? "S" : i % 3 === 0 ? "A" : "C",
        image: `/placeholder.svg?height=300&width=200&text=김민지-${i + 1}`,
        name: `김민지-${i % 7 === 0 ? "S" : i % 3 === 0 ? "A" : "C"}급화보-${i + 1}`,
        collected: true, // 모든 카드 수집 완료
        influencer: "김민지"
      }))
    ],
    inf2: [
      // 이하은 - 일부만 수집 (5/20)
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 21,
        grade: i % 7 === 0 ? "S" : i % 3 === 0 ? "A" : "C",
        image: `/placeholder.svg?height=300&width=200&text=이하은-${i + 1}`,
        name: `이하은-${i % 7 === 0 ? "S" : i % 3 === 0 ? "A" : "C"}급화보-${i + 1}`,
        collected: i < 5, // 처음 5장만 수집
        influencer: "이하은"
      }))
    ],
    inf3: [
      // 박서아 - 일부만 수집 (8/20)
      ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 41,
        grade: i % 7 === 0 ? "S" : i % 3 === 0 ? "A" : "C",
        image: `/placeholder.svg?height=300&width=200&text=박서아-${i + 1}`,
        name: `박서아-${i % 7 === 0 ? "S" : i % 3 === 0 ? "A" : "C"}급화보-${i + 1}`,
        collected: i < 8, // 처음 8장만 수집
        influencer: "박서아"
      }))
    ]
  }

  // 인플루언서 정보
  const influencers = [
    { 
      id: "inf1", 
      name: "김민지", 
      image: "/placeholder.svg?height=300&width=200&text=김민지",
      totalCards: 20,
      collectedCards: 20 // 전체 수집 완료
    },
    { 
      id: "inf2", 
      name: "이하은", 
      image: "/placeholder.svg?height=300&width=200&text=이하은",
      totalCards: 20,
      collectedCards: 5
    },
    { 
      id: "inf3", 
      name: "박서아", 
      image: "/placeholder.svg?height=300&width=200&text=박서아",
      totalCards: 20,
      collectedCards: 8
    }
  ]

  const toggleSelectMode = () => {
    setSelectMode(!selectMode)
    setSelectedCards([])
  }

  const toggleCardSelection = (cardId: number) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter((id) => id !== cardId))
    } else {
      setSelectedCards([...selectedCards, cardId])
    }
  }

  const selectAllCollected = () => {
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

  // 인플루언서별 일괄 다운로드
  const handleBulkDownload = (influencerId: string) => {
    const cards = cardsByInfluencer[influencerId as keyof typeof cardsByInfluencer]
    const collectedCards = cards.filter(card => card.collected)
    
    // 실제로는 zip 파일 다운로드 또는 개별 파일들 다운로드
    alert(`${collectedCards[0].influencer}의 화보 ${collectedCards.length}장을 일괄 다운로드합니다.`)
    
    // 실제 다운로드 로직 구현
    collectedCards.forEach((card, index) => {
      setTimeout(() => {
        const link = document.createElement('a')
        link.download = `${card.influencer}-${card.name}.jpg`
        link.href = card.image
        link.click()
      }, index * 100) // 100ms 간격으로 다운로드
    })
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
              <img src={card.image} alt={card.name} className="w-full h-full object-cover" />

              {/* 등급 뱃지 */}
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  card.grade === "S"
                    ? "bg-yellow-500"
                    : card.grade === "A"
                      ? "bg-gray-400"
                      : "bg-gray-700"
                }`}
              >
                <span className="text-white">{card.grade}</span>
              </div>

              {/* 선택 모드일 때 체크박스 */}
              {selectMode && card.collected && (
                <div className="absolute top-1 right-1">
                  <div
                    className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
                      selectedCards.includes(card.id) ? "bg-[#FF0844]" : "bg-black/50"
                    }`}
                  >
                    {selectedCards.includes(card.id) && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              )}

              {/* 미수집 카드 표시 */}
              {!card.collected && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center">
                    <span className="text-gray-400">?</span>
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
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-black p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onBack || onBackToMain} className="mr-2 -ml-3">
              <ArrowLeft className="h-5 w-5 text-white" />
            </Button>
            <h2 className="text-xl font-bold">내 컬렉션 상세</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSelectMode}
            className={selectMode ? "bg-[#FF0844] text-white" : "text-gray-400"}
          >
            <Grid3X3 className="h-5 w-5" />
          </Button>
        </div>

        {/* 등급 필터 */}
        <div className="flex gap-2 mb-4">
          {["all", "S", "A", "C"].map((grade) => (
            <Button
              key={grade}
              variant={gradeFilter === grade ? "default" : "outline"}
              size="sm"
              onClick={() => setGradeFilter(grade as "all" | "S" | "A" | "C")}
              className={
                gradeFilter === grade
                  ? "bg-[#FF0844] text-white border-[#FF0844]"
                  : "border-gray-600 text-gray-300 hover:bg-gray-800"
              }
            >
              {grade === "all" ? "전체" : `${grade}급`}
            </Button>
          ))}
        </div>

        {/* 선택 모드 컨트롤 */}
        {selectMode && (
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={selectAllCollected} className="border-gray-600 text-gray-300">
              전체 선택
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedCards([])} className="border-gray-600 text-gray-300">
              선택 해제
            </Button>
            {selectedCards.length > 0 && (
              <Button
                size="sm"
                onClick={handleMakePhotocard}
                className="bg-[#FF0844] hover:bg-[#FF0844]/90 text-white"
              >
                포토카드 제작 ({selectedCards.length})
              </Button>
            )}
          </div>
        )}
      </div>

      {/* 컬렉션 통계 */}
      <div className="px-4 pb-4">
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <h3 className="font-bold mb-2">전체 수집 현황</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">전체 진행률:</span>
              <span className="ml-2 font-bold text-[#FF0844]">
                {totalStats.collected}/{totalStats.total} ({Math.round((totalStats.collected / totalStats.total) * 100)}%)
              </span>
            </div>
            <div className="space-y-1">
              {Object.entries(totalStats.byGrade).map(([grade, stats]) => (
                <div key={grade}>
                  <span className="text-gray-400">{grade}급:</span>
                  <span className="ml-2 font-bold">
                    {stats.collected}/{stats.total}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 인플루언서별 컬렉션 */}
      <div className="flex-1 px-4 pb-4 overflow-auto">
        {influencers.map((influencer) => {
          const cards = cardsByInfluencer[influencer.id as keyof typeof cardsByInfluencer]
          const isFullyCollected = influencer.collectedCards === influencer.totalCards

          return (
            <div key={influencer.id} className="mb-4">
              <div
                className="bg-gray-900 rounded-lg p-4 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => toggleInfluencer(influencer.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={influencer.image}
                      alt={influencer.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold">{influencer.name}</h3>
                      <p className="text-sm text-gray-400">
                        {influencer.collectedCards}/{influencer.totalCards} 수집
                        {isFullyCollected && (
                          <span className="ml-2 text-green-500 text-xs">✓ 완성</span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* 전체 수집 완료한 인플루언서만 일괄 다운로드 버튼 표시 */}
                    {isFullyCollected && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleBulkDownload(influencer.id)
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        일괄 다운로드
                      </Button>
                    )}
                    
                    <div className="text-right">
                      <div className="text-sm font-bold">
                        {Math.round((influencer.collectedCards / influencer.totalCards) * 100)}%
                      </div>
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            isFullyCollected ? 'bg-green-500' : 'bg-[#FF0844]'
                          }`}
                          style={{
                            width: `${(influencer.collectedCards / influencer.totalCards) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {expandedInfluencer === influencer.id && (
                <div className="mt-2 bg-gray-800 rounded-lg p-4">
                  {renderCardGrid(cards)}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 상세 이미지 모달 */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-sm w-full">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 z-10 bg-black/50 text-white hover:bg-black/70"
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="aspect-[2/3] rounded-t-lg overflow-hidden">
                <img src={selectedImage.image} alt={selectedImage.name} className="w-full h-full object-cover" />
              </div>

              <div
                className={`absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
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
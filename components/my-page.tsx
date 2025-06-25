"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowLeft, Grid3X3, Download } from "lucide-react"

interface MyPageProps {
  activeTab: "purchase-history" | "my-collection"
  onTabChange: (tab: "purchase-history" | "my-collection") => void
  onBackToMain: () => void
  onShowCollection: () => void
  onGoToPhotos: () => void
}

// 간단한 날짜 포맷 함수
const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

const formatTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export default function MyPage({ activeTab, onTabChange, onBackToMain, onShowCollection, onGoToPhotos }: MyPageProps) {
  // 더미 구매 내역 데이터
  const purchaseHistory = [
    {
      id: 1,
      date: new Date(2023, 4, 15, 14, 30),
      type: "뽑기권",
      name: "뽑기권 10장",
      originalPrice: 15000,
      price: 12000,
      status: "결제완료",
    },
    {
      id: 2,
      date: new Date(2023, 4, 10, 9, 15),
      type: "포토카드",
      name: "S급 화보 포토카드",
      originalPrice: 5000,
      price: 5000,
      status: "제작중",
    },
    {
      id: 3,
      date: new Date(2023, 4, 5, 18, 45),
      type: "뽑기권",
      name: "뽑기권 30장",
      originalPrice: 45000,
      price: 30000,
      status: "결제완료",
    },
    {
      id: 4,
      date: new Date(2023, 3, 28, 11, 20),
      type: "포토카드",
      name: "A급 화보 포토카드",
      originalPrice: 3000,
      price: 3000,
      status: "배송완료",
    },
    {
      id: 5,
      date: new Date(2023, 3, 20, 16, 10),
      type: "뽑기권",
      name: "뽑기권 1장",
      originalPrice: 1500,
      price: 1500,
      status: "결제완료",
    },
  ]

  // 더미 컬렉션 데이터 - 김민지 전체 수집 완료로 업데이트
  const influencers = [
    {
      id: "inf1",
      name: "김민지",
      totalCards: 20,
      collectedCards: 20, // 전체 수집 완료
    },
    {
      id: "inf2",
      name: "이하은",
      totalCards: 20,
      collectedCards: 5,
    },
    {
      id: "inf3",
      name: "박서아",
      totalCards: 20,
      collectedCards: 8,
    },
    {
      id: "inf4",
      name: "정다현",
      totalCards: 20,
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
      },
      {
        id: 2,
        grade: "S",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+S급",
        name: "김민지-S급화보",
        collected: true, // 모든 카드 수집 완료
      },
      // ... 다른 카드들
    ],
    // ... 다른 인플루언서들
  }

  // 전체 수집 통계 계산 - 김민지 완성 반영
  const totalStats = {
    total: 80, // 4명 * 20장
    collected: 37, // 20 + 5 + 8 + 4
    byGrade: {
      S: { total: 16, collected: 8 },
      A: { total: 32, collected: 15 },
      C: { total: 32, collected: 14 },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 반응형 컨테이너 */}
      <div className="mx-auto max-w-sm md:max-w-2xl lg:max-w-4xl">
        <div className="flex flex-col h-full bg-black text-white">
          <div className="sticky top-0 z-10 bg-black pt-4 pb-2 px-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={onBackToMain} className="mr-2 -ml-3">
                  <ArrowLeft className="h-5 w-5 text-white" />
                </Button>
                <h2 className="text-xl font-bold">마이페이지</h2>
              </div>
            </div>

            <Tabs
              defaultValue={activeTab}
              className="w-full"
              value={activeTab}
              onValueChange={(value: string) => onTabChange(value as "purchase-history" | "my-collection")}
            >
              <TabsList className="bg-gray-900 w-full">
                <TabsTrigger value="purchase-history" className="flex-1 data-[state=active]:bg-[#FF0844]">
                  구매 내역
                </TabsTrigger>
                <TabsTrigger value="my-collection" className="flex-1 data-[state=active]:bg-[#FF0844]">
                  내 컬렉션
                </TabsTrigger>
              </TabsList>

              <TabsContent value="purchase-history" className="mt-4">
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-gray-400 border-b border-gray-800">
                        <tr>
                          <th scope="col" className="px-3 py-3">
                            일시
                          </th>
                          <th scope="col" className="px-3 py-3">
                            유형
                          </th>
                          <th scope="col" className="px-3 py-3">
                            상품명
                          </th>
                          <th scope="col" className="px-3 py-3 text-right">
                            금액
                          </th>
                          <th scope="col" className="px-3 py-3 text-center">
                            상태
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {purchaseHistory.map((item) => (
                          <tr key={item.id} className="border-b border-gray-800">
                            <td className="px-3 py-3 text-xs">
                              {formatDate(item.date)}
                              <br />
                              {formatTime(item.date)}
                            </td>
                            <td className="px-3 py-3">{item.type}</td>
                            <td className="px-3 py-3">
                              <div className="max-w-32 md:max-w-none truncate">{item.name}</div>
                            </td>
                            <td className="px-3 py-3 text-right">
                              {item.price.toLocaleString()}원
                              {item.originalPrice > item.price && (
                                <div className="text-xs text-gray-400 line-through">
                                  {item.originalPrice.toLocaleString()}원
                                </div>
                              )}
                            </td>
                            <td className="px-3 py-3">
                              <div
                                className={`text-center text-xs px-2 py-1 rounded-full ${
                                  item.status === "결제완료"
                                    ? "bg-green-900/30 text-green-400"
                                    : item.status === "제작중"
                                      ? "bg-blue-900/30 text-blue-400"
                                      : "bg-gray-900/30 text-gray-400"
                                }`}
                              >
                                {item.status}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {purchaseHistory.length === 0 && (
                    <div className="py-8 text-center text-gray-400">구매 내역이 없습니다.</div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="my-collection" className="mt-4">
                {/* PC/태블릿용 2컬럼, 모바일용 1컬럼 레이아웃 */}
                <div className="lg:grid lg:grid-cols-3 lg:gap-6">
                  
                  {/* 왼쪽 영역 - 통계 정보 */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-900 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm">컬렉션 현황</div>
                        <div className="text-sm font-bold">
                          {totalStats.collected}/{totalStats.total} 수집
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <div className="bg-gray-800 p-2 rounded-lg">
                          <div className="text-xs text-gray-400">S급</div>
                          <div className="text-sm font-bold">
                            {totalStats.byGrade.S.collected}/{totalStats.byGrade.S.total}
                          </div>
                        </div>
                        <div className="bg-gray-800 p-2 rounded-lg">
                          <div className="text-xs text-gray-400">A급</div>
                          <div className="text-sm font-bold">
                            {totalStats.byGrade.A.collected}/{totalStats.byGrade.A.total}
                          </div>
                        </div>
                        <div className="bg-gray-800 p-2 rounded-lg">
                          <div className="text-xs text-gray-400">C급</div>
                          <div className="text-sm font-bold">
                            {totalStats.byGrade.C.collected}/{totalStats.byGrade.C.total}
                          </div>
                        </div>
                      </div>
                      
                      {/* 진행률 바 */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>전체 진행률</span>
                          <span>{Math.round((totalStats.collected / totalStats.total) * 100)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FF0844] transition-all duration-300"
                            style={{
                              width: `${(totalStats.collected / totalStats.total) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* PC/태블릿에서는 여기에 액션 버튼들 */}
                    <div className="hidden lg:block space-y-3">
                      <Button className="w-full py-4 bg-[#FF0844] hover:bg-[#FF0844]/90 text-white" onClick={onShowCollection}>
                        <Download className="mr-2 h-4 w-4" />
                        포토카드 제작 & 다운로드
                      </Button>
                      <Button className="w-full py-4 bg-gray-800 hover:bg-gray-700 text-white" onClick={onGoToPhotos}>
                        <Grid3X3 className="mr-2 h-4 w-4" />
                        화보 뽑기
                      </Button>
                    </div>
                  </div>

                  {/* 오른쪽 영역 - 인플루언서 목록 */}
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {influencers.map((influencer) => {
                        const isFullyCollected = influencer.collectedCards === influencer.totalCards
                        const progressPercent = Math.round((influencer.collectedCards / influencer.totalCards) * 100)

                        return (
                          <div key={influencer.id} className="bg-gray-900 rounded-lg overflow-hidden">
                            <div className="p-3 border-b border-gray-800">
                              <div className="flex justify-between items-start mb-2">
                                <div className="font-bold">{influencer.name}</div>
                                {isFullyCollected && (
                                  <span className="text-green-500 text-xs bg-green-500/20 px-2 py-0.5 rounded-full">
                                    ✓ 완성
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-400 mb-2">
                                {influencer.collectedCards}/{influencer.totalCards} 수집 ({progressPercent}%)
                              </div>
                              
                              {/* 개별 진행률 바 */}
                              <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className={`h-full transition-all duration-300 ${
                                    isFullyCollected ? 'bg-green-500' : 'bg-[#FF0844]'
                                  }`}
                                  style={{
                                    width: `${progressPercent}%`,
                                  }}
                                />
                              </div>
                            </div>
                            <div className="p-3 grid grid-cols-3 gap-1">
                              {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="aspect-[2/3] rounded-lg overflow-hidden">
                                  <img
                                    src="/placeholder.svg?height=100&width=70&text=화보"
                                    alt="화보 미리보기"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* 모바일에서만 보이는 하단 액션 버튼들 */}
                <div className="lg:hidden grid grid-cols-2 gap-3 px-4 pb-4">
                  <Button className="py-4 bg-[#FF0844] hover:bg-[#FF0844]/90 text-white" onClick={onShowCollection}>
                    <Download className="mr-2 h-4 w-4" />
                    포토카드 제작 & 다운로드
                  </Button>
                  <Button className="py-4 bg-gray-800 hover:bg-gray-700 text-white" onClick={onGoToPhotos}>
                    <Grid3X3 className="mr-2 h-4 w-4" />
                    화보 뽑기
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
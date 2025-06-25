"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface MainScreenProps {
  onStartDrawing: () => void
  onShowPurchase: () => void
}

export default function MainScreen({ onStartDrawing, onShowPurchase }: MainScreenProps) {
  const [isShaking, setIsShaking] = useState(false)
  const [points, setPoints] = useState(10)
  const [puzzleProgress, setPuzzleProgress] = useState(7) // 총 20개 중 7개 완료
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showNotice, setShowNotice] = useState(false)

  const handleDrawButton = () => {
    if (points >= 1) {
      setIsShaking(true)
      setTimeout(() => {
        setIsShaking(false)
        setPoints((prev) => prev - 1)
        onStartDrawing()
      }, 800)
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

  return (
    <div className="flex flex-col items-center justify-between h-full py-4">
      {/* 뽑기권 표시 및 구매 버튼 */}
      <div className="w-full flex items-center justify-between mb-4">
        <div className="bg-gray-900 rounded-lg p-3 flex-1 mr-2">
          <div className="text-sm text-gray-400">보유 뽑기권</div>
          <div className="font-bold text-lg">{points}장</div>
        </div>
        <Button onClick={onShowPurchase} className="h-full py-3 px-4 bg-[#FF0844] hover:bg-[#FF0844]/90 text-white">
          뽑기권 구매
        </Button>
      </div>

      {/* 블러 처리된 이미지 스크롤 - 롤링 수정 */}
      <div className="w-full mb-6">
        <div className="relative w-full overflow-hidden rounded-lg bg-gray-900 p-4">
          <h3 className="text-center text-sm mb-2 text-gray-400">인플루언서명 의 화보를 뽑아보세요</h3>
          <div className="relative overflow-hidden">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto pb-4 space-x-3 hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* 더 많은 아이템을 추가하여 무한 스크롤 효과 */}
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 relative">
                  <div className="w-24 h-36 rounded-lg overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=144&width=96&text=화보${(i % 20) + 1}`}
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

      {/* 컬렉션 진행 상황 */}
      <div className="w-full bg-gray-900 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-400">컬렉션 진행 상황</div>
          <div className="text-sm font-bold">{puzzleProgress}/20</div>
        </div>
        <Progress value={(puzzleProgress / 20) * 100} className="h-2 bg-gray-800" indicatorClassName="bg-[#FF0844]" />
        <div className="mt-2 text-xs text-gray-400 text-center">20장 모두 수집 시 미공개 컷이 완성됩니다!</div>
      </div>

      {/* 뽑기 버튼 */}
      <div className="w-full mt-4">
        <Button
          onClick={handleDrawButton}
          className="w-full py-6 text-lg font-bold bg-[#FF0844] hover:bg-[#FF0844]/90 text-white"
          disabled={points < 1}
        >
          화보 뽑기
        </Button>

        {points < 1 && (
          <div className="text-xs text-[#FF0844] mt-2 text-center">뽑기권이 부족합니다. 뽑기권을 충전해주세요.</div>
        )}
      </div>

      {/* 안내 및 확률 고지 */}
      <div className="w-full mt-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="notice" className="border-gray-800">
            <AccordionTrigger className="py-2 text-gray-300 hover:text-white text-sm font-bold bg-gray-900 px-4 rounded-t-lg">
              NOTICE
            </AccordionTrigger>
            <AccordionContent className="bg-gray-900 p-4 rounded-b-lg text-sm text-gray-300">
              <p className="mb-3 text-white">
                셀럽별로 가챠 구성은 다를 수 있으며, 실물 수령을 원하신다면 반드시 배송 신청이 필요합니다.
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  구매 즉시 사용되는 상품으로 청약철회(구매 이후 취소 신청 및 환불)가 불가능합니다. 미등의 시 구매가
                  불가한 점 양해 바랍니다.
                </li>
                <li>확률성 뽑기형 상품으로 중복 상품이 있을 수 있으며, 이로 인한 교환, 환불이 불가합니다.</li>
                <li>
                  수량 소진형 상품의 경우 실시간 재고량에 따라 화물이 변동되며, 이는 각 가차의 상세 페이지 하단
                  확률표에서 확인 가능합니다.
                </li>
                <li>개인 간 거래 또는 재판매가 절대 불가합니다. 개인 간의 거래로 인한 책임은 당사자에게 있습니다.</li>
                <li>기차 상품은 판매 종료 후 일괄 제작 및 발송되며 약 3주~1달가량 소요됩니다. (※상품에 따라 상이)</li>
                <li>배송 신청 기간이 종료된 후에는 배송 신청이 불가합니다.</li>
                <li>상품은 시장에 따라 판매 기간 및 중정 내용이 변경될 수 있으며, 변경 시 별도로 안내됩니다.</li>
                <li>해외 배송의 경우 별도의 배송비가 추가 발생합니다.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="probability" className="border-gray-800 mt-2">
            <AccordionTrigger className="py-2 text-gray-300 hover:text-white text-sm font-bold bg-gray-900 px-4 rounded-t-lg">
              가챠 확률표
            </AccordionTrigger>
            <AccordionContent className="bg-gray-900 p-0 rounded-b-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                  <thead className="text-xs text-gray-400 border-b border-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center">
                        등급
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        개수
                      </th>
                      <th scope="col" className="px-6 py-3 text-center">
                        확률
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="px-6 py-3 text-center">SSS</td>
                      <td className="px-6 py-3 text-center">1</td>
                      <td className="px-6 py-3 text-center">0.5%</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="px-6 py-3 text-center">SS</td>
                      <td className="px-6 py-3 text-center">1</td>
                      <td className="px-6 py-3 text-center">1.5%</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="px-6 py-3 text-center">S</td>
                      <td className="px-6 py-3 text-center">1</td>
                      <td className="px-6 py-3 text-center">4%</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="px-6 py-3 text-center">A</td>
                      <td className="px-6 py-3 text-center">2</td>
                      <td className="px-6 py-3 text-center">16%</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="px-6 py-3 text-center">B</td>
                      <td className="px-6 py-3 text-center">3</td>
                      <td className="px-6 py-3 text-center">30%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3 text-center">C</td>
                      <td className="px-6 py-3 text-center">4</td>
                      <td className="px-6 py-3 text-center">48%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

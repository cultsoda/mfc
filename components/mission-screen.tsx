"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Gift, ArrowLeft } from "lucide-react"

interface MissionScreenProps {
  onBackToMain: () => void
}

export default function MissionScreen({ onBackToMain }: MissionScreenProps) {
  // 더미 데이터 - 실제로는 상태 관리 라이브러리나 컨텍스트를 사용하여 관리
  const [puzzleProgress, setPuzzleProgress] = useState(7) // 총 20개 중 7개 완료
  const [showTooltip, setShowTooltip] = useState<number | null>(null)

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

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onBackToMain} className="mr-2 -ml-3">
            <ArrowLeft className="h-5 w-5 text-white" />
          </Button>
          <h2 className="text-xl font-bold">미션</h2>
        </div>
        <div className="text-sm text-gray-400">
          <span className="font-bold">{puzzleProgress}</span>/20 완료
        </div>
      </div>

      <div className="w-full bg-gray-900 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm">미션 진행 상황</div>
          <div className="text-sm font-bold">{Math.round((puzzleProgress / 20) * 100)}%</div>
        </div>
        <Progress value={(puzzleProgress / 20) * 100} className="h-2 bg-gray-800" indicatorClassName="bg-[#FF0844]" />
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

      {/* 미션 정보 */}
      <div className="bg-gray-900 rounded-lg p-4 mb-4">
        <h3 className="font-bold mb-2 flex items-center">
          <Gift className="w-4 h-4 mr-2 text-[#FF0844]" />
          미션 완료 보상
        </h3>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• 모든 퍼즐 조각을 모으면 특별한 미공개 화보를 획득할 수 있습니다.</li>
          <li>• S급 화보를 뽑으면 특별 퍼즐 조각을 획득합니다.</li>
          <li>• 미션 완료 시 디지털 화보와 실물 포토카드 제작 할인 쿠폰을 드립니다.</li>
        </ul>
      </div>

      {puzzleProgress === 20 && (
        <Button className="w-full py-6 bg-[#FF0844] hover:bg-[#FF0844]/90 text-white">미션 보상 받기</Button>
      )}

      <Button onClick={onBackToMain} variant="ghost" className="mt-4 text-gray-400">
        돌아가기
      </Button>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Sparkles, Star } from "lucide-react"

interface DrawingProcessProps {
  onDrawComplete: (card: any) => void // 이 prop 추가
}

// ✅ 여기를 수정! props를 받도록 변경
export default function DrawingProcess({ onDrawComplete }: DrawingProcessProps) {
  const [stage, setStage] = useState<"initial" | "glow" | "silhouette" | "reveal">("initial")

  useEffect(() => {
    // 단계적 애니메이션 효과
    const timer1 = setTimeout(() => setStage("glow"), 500)
    const timer2 = setTimeout(() => setStage("silhouette"), 1500)
    const timer3 = setTimeout(() => setStage("reveal"), 2500)
    
    // ✅ 여기에 추가! reveal 단계 후에 onDrawComplete 호출
    const timer4 = setTimeout(() => {
      // 더미 카드 데이터
      const card = {
        id: 1,
        grade: "A",
        name: "환승모델-A급화보",
        image: "/placeholder.svg?height=300&width=200&text=인물+이미지+A급"
      }
      onDrawComplete(card)
    }, 3500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4) // ✅ 이것도 추가
    }
  }, [onDrawComplete]) 

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* 배경 효과 */}
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center overflow-hidden">
        {stage !== "initial" && (
          <>
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-float"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* 카드 효과 */}
      <div className="relative z-10 w-64 h-96 flex items-center justify-center">
        {stage === "initial" && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-t-[#FF0844] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {stage === "glow" && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-48 h-72 bg-gradient-to-r from-[#FF0844] via-yellow-500 to-[#FF0844] animate-pulse rounded-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-white animate-ping" />
            </div>
          </div>
        )}

        {stage === "silhouette" && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-48 h-72 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="w-32 h-48 bg-gray-700 rounded-full"></div>
            </div>
            <div className="absolute top-0 right-0">
              <Star className="w-12 h-12 text-yellow-400 animate-pulse" />
            </div>
          </div>
        )}

        {stage === "reveal" && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-48 h-72 bg-gradient-to-b from-[#FF0844]/20 to-transparent rounded-lg overflow-hidden border-2 border-[#FF0844] animate-reveal">
              <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                S급
              </div>
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=250&width=150&text=S급-화보"
                  alt="화보"
                  className="w-40 h-60 object-cover rounded"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 텍스트 */}
      <div className="mt-8 text-center z-10">
        {stage === "initial" && <p className="text-lg animate-pulse">화보를 뽑는 중...</p>}
        {stage === "glow" && <p className="text-lg font-bold animate-pulse">A급 화보가 나올 것 같아요!</p>}
        {stage === "silhouette" && (
          <p className="text-xl font-bold text-[#FF0844] animate-pulse">와! 특별한 화보입니다!</p>
        )}
        {stage === "reveal" && (
          <p className="text-2xl font-bold text-yellow-400 animate-bounce">S급 화보는 오늘 당신이 주인이에요!</p>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, RotateCcw, Palette, Move, ZoomIn, ZoomOut } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PhotocardMakerProps {
  selectedCards: any[]
  onBack: () => void
  onDownload: (cards: any[]) => void
  onOrderPhysical: (cards: any[]) => void
}

// 프레임 템플릿 데이터
const frameTemplates = [
  {
    id: "basic",
    name: "기본 프레임",
    image: "/frames/basic-frame.png",
    style: "border-4 border-white rounded-lg shadow-lg"
  },
  {
    id: "gradient",
    name: "그라데이션",
    image: "/frames/gradient-frame.png", 
    style: "border-4 border-gradient-to-r from-pink-500 to-purple-500 rounded-lg shadow-lg"
  },
  {
    id: "vintage",
    name: "빈티지",
    image: "/frames/vintage-frame.png",
    style: "border-8 border-amber-200 rounded-lg shadow-xl"
  },
  {
    id: "neon",
    name: "네온",
    image: "/frames/neon-frame.png",
    style: "border-4 border-cyan-400 rounded-lg shadow-lg shadow-cyan-400/50"
  }
]

export default function PhotocardMaker({ selectedCards, onBack, onDownload, onOrderPhysical }: PhotocardMakerProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [selectedFrame, setSelectedFrame] = useState("basic")
  const [cardTransform, setCardTransform] = useState({
    scale: 1,
    rotation: 0,
    x: 0,
    y: 0
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const currentCard = selectedCards[currentCardIndex]

  // 카드 변형 제어
  const handleScale = (delta: number) => {
    setCardTransform(prev => ({
      ...prev,
      scale: Math.max(0.5, Math.min(2, prev.scale + delta))
    }))
  }

  const handleRotation = () => {
    setCardTransform(prev => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360
    }))
  }

  const resetTransform = () => {
    setCardTransform({ scale: 1, rotation: 0, x: 0, y: 0 })
  }

  // 캔버스에 포토카드 그리기
  const generatePhotocard = (card: any, frameId: string): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current
      if (!canvas) return resolve("")

      const ctx = canvas.getContext('2d')
      if (!ctx) return resolve("")

      // 포토카드 표준 사이즈 (86mm x 54mm를 300DPI로 변환)
      canvas.width = 1020  // 86mm * 300DPI / 25.4
      canvas.height = 640  // 54mm * 300DPI / 25.4

      // 배경 그리기
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 카드 이미지 로드 및 그리기
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        // 이미지 변형 적용
        ctx.save()
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.scale(cardTransform.scale, cardTransform.scale)
        ctx.rotate((cardTransform.rotation * Math.PI) / 180)
        ctx.translate(cardTransform.x, cardTransform.y)
        
        // 이미지 그리기 (중앙 정렬)
        const imgWidth = canvas.width * 0.8
        const imgHeight = canvas.height * 0.8
        ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight)
        ctx.restore()

        // 프레임 그리기
        drawFrame(ctx, frameId, canvas.width, canvas.height)

        // 카드 정보 텍스트 추가
        drawCardInfo(ctx, card, canvas.width, canvas.height)

        resolve(canvas.toDataURL('image/png', 1.0))
      }
      img.src = card.image || "/placeholder.svg?height=400&width=300&text=카드이미지"
    })
  }

  // 프레임 그리기 함수
  const drawFrame = (ctx: CanvasRenderingContext2D, frameId: string, width: number, height: number) => {
    ctx.strokeStyle = getFrameColor(frameId)
    ctx.lineWidth = getFrameWidth(frameId)
    
    switch (frameId) {
      case "gradient":
        const gradient = ctx.createLinearGradient(0, 0, width, 0)
        gradient.addColorStop(0, '#ec4899')
        gradient.addColorStop(1, '#8b5cf6')
        ctx.strokeStyle = gradient
        break
      case "vintage":
        ctx.strokeStyle = '#fbbf24'
        ctx.lineWidth = 12
        break
      case "neon":
        ctx.strokeStyle = '#06b6d4'
        ctx.lineWidth = 8
        ctx.shadowColor = '#06b6d4'
        ctx.shadowBlur = 10
        break
      default:
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 6
    }
    
    ctx.strokeRect(10, 10, width - 20, height - 20)
    ctx.shadowBlur = 0
  }

  // 카드 정보 텍스트 그리기
  const drawCardInfo = (ctx: CanvasRenderingContext2D, card: any, width: number, height: number) => {
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 24px Arial'
    ctx.textAlign = 'center'
    
    // 카드명
    ctx.fillText(card.name || "포토카드", width / 2, height - 40)
    
    // 등급 뱃지
    ctx.fillStyle = getGradeColor(card.grade)
    ctx.fillRect(width - 60, 20, 40, 40)
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 20px Arial'
    ctx.fillText(card.grade, width - 40, 45)
  }

  const getFrameColor = (frameId: string) => {
    switch (frameId) {
      case "gradient": return "#ec4899"
      case "vintage": return "#fbbf24"
      case "neon": return "#06b6d4"
      default: return "#ffffff"
    }
  }

  const getFrameWidth = (frameId: string) => {
    switch (frameId) {
      case "vintage": return 12
      case "neon": return 8
      default: return 6
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "S": return "#fbbf24"
      case "A": return "#9ca3af"
      default: return "#6b7280"
    }
  }

  // 개별 카드 다운로드
  const handleSingleDownload = async () => {
    const dataUrl = await generatePhotocard(currentCard, selectedFrame)
    const link = document.createElement('a')
    link.download = `${currentCard.name || 'photocard'}-${Date.now()}.png`
    link.href = dataUrl
    link.click()
  }

  // 전체 카드 다운로드
  const handleBatchDownload = async () => {
    const downloadPromises = selectedCards.map(async (card, index) => {
      const dataUrl = await generatePhotocard(card, selectedFrame)
      return { card, dataUrl, index }
    })
    
    const results = await Promise.all(downloadPromises)
    results.forEach(({ card, dataUrl, index }) => {
      const link = document.createElement('a')
      link.download = `${card.name || 'photocard'}-${index + 1}.png`
      link.href = dataUrl
      link.click()
    })
    
    onDownload(selectedCards)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          뒤로가기
        </Button>
        <h1 className="text-lg font-bold">포토카드 제작</h1>
        <div className="w-20"></div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="design" className="h-full flex flex-col">
          <TabsList className="mx-4 mt-4 grid w-auto grid-cols-2 bg-gray-900">
            <TabsTrigger value="design" className="data-[state=active]:bg-[#FF0844]">
              디자인
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-[#FF0844]">
              미리보기
            </TabsTrigger>
          </TabsList>

          <TabsContent value="design" className="flex-1 overflow-y-auto px-4">
            {/* 카드 선택 */}
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3">제작할 카드 ({selectedCards.length}장)</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {selectedCards.map((card, index) => (
                  <div
                    key={card.id}
                    className={`flex-shrink-0 w-16 h-24 rounded-lg overflow-hidden border-2 cursor-pointer ${
                      index === currentCardIndex ? "border-[#FF0844]" : "border-gray-600"
                    }`}
                    onClick={() => setCurrentCardIndex(index)}
                  >
                    <img
                      src={card.image || "/placeholder.svg"}
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 프레임 선택 */}
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3">프레임 선택</h3>
              <div className="grid grid-cols-2 gap-3">
                {frameTemplates.map((frame) => (
                  <div
                    key={frame.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedFrame === frame.id
                        ? "border-[#FF0844] bg-[#FF0844]/10"
                        : "border-gray-600 bg-gray-800"
                    }`}
                    onClick={() => setSelectedFrame(frame.id)}
                  >
                    <div className="w-full h-20 bg-gray-700 rounded mb-2 flex items-center justify-center">
                      <Palette className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-xs text-center">{frame.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 이미지 조정 */}
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3">이미지 조정</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" onClick={() => handleScale(0.1)}>
                  <ZoomIn className="w-4 h-4 mr-1" />
                  확대
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleScale(-0.1)}>
                  <ZoomOut className="w-4 h-4 mr-1" />
                  축소
                </Button>
                <Button variant="outline" size="sm" onClick={handleRotation}>
                  <RotateCcw className="w-4 h-4 mr-1" />
                  회전
                </Button>
                <Button variant="outline" size="sm" onClick={resetTransform}>
                  <Move className="w-4 h-4 mr-1" />
                  초기화
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="flex-1 overflow-y-auto px-4">
            {/* 미리보기 */}
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3">미리보기</h3>
              <div className="bg-gray-800 rounded-lg p-4 flex justify-center">
                <div 
                  className="relative bg-white rounded-lg shadow-lg"
                  style={{
                    width: "200px",
                    height: "320px",
                    transform: `scale(${cardTransform.scale}) rotate(${cardTransform.rotation}deg)`,
                  }}
                >
                  <img
                    src={currentCard?.image || "/placeholder.svg"}
                    alt="미리보기"
                    className="w-full h-5/6 object-cover rounded-t-lg"
                  />
                  <div className="p-2 text-black text-center">
                    <p className="text-xs font-bold">{currentCard?.name}</p>
                  </div>
                  <div 
                    className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      currentCard?.grade === "S" ? "bg-yellow-500" : 
                      currentCard?.grade === "A" ? "bg-gray-400" : "bg-gray-600"
                    }`}
                  >
                    {currentCard?.grade}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 하단 액션 버튼 */}
      <div className="p-4 space-y-3 border-t border-gray-800">
        <Button
          onClick={handleSingleDownload}
          className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          현재 카드 다운로드
        </Button>
        
        <Button
          onClick={handleBatchDownload}
          className="w-full py-3 bg-[#FF0844] hover:bg-[#FF0844]/90 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          전체 카드 다운로드 ({selectedCards.length}장)
        </Button>
        
        <Button
          onClick={() => onOrderPhysical(selectedCards)}
          variant="outline"
          className="w-full py-3 border-[#FF0844] text-[#FF0844] hover:bg-[#FF0844]/10"
        >
          실물 포토카드 주문하기
        </Button>
      </div>

      {/* 숨겨진 캔버스 */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
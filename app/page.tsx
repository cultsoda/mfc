"use client"

import { useState } from "react"
import { ArrowLeft, Home, User, Grid3X3, ShoppingBag, Heart } from "lucide-react"
import DrawingProcess from "@/components/drawing-process"
import ResultScreen from "@/components/result-screen"
import CollectionScreen from "@/components/collection-screen"
import MissionScreen from "@/components/mission-screen"
import PurchaseScreen from "@/components/purchase-screen"
import ShippingForm from "@/components/shipping-form"
import InfluencerListScreen from "@/components/influencer-list-screen"
import InfluencerDetailScreen from "@/components/influencer-detail-screen"
import VotingScreen from "@/components/voting-screen"
import MyPage from "@/components/my-page"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [screen, setScreen] = useState<
    | "influencer-list"
    | "influencer-detail"
    | "drawing"
    | "result"
    | "collection"
    | "mission"
    | "purchase"
    | "shipping"
    | "voting"
    | "my-page"
  >("influencer-list")

  // 이전 화면을 저장하는 상태 추가
  const [previousScreen, setPreviousScreen] = useState<string | null>(null)

  // 마이 페이지의 활성 탭을 저장하는 상태 추가
  const [myPageActiveTab, setMyPageActiveTab] = useState<"purchase-history" | "my-collection">("purchase-history")

  const [selectedInfluencer, setSelectedInfluencer] = useState<string | null>(null)
  const [currentCard, setCurrentCard] = useState<any>(null)

  // 현재 활성화된 탭을 결정하는 함수
  const getActiveTab = () => {
    switch (screen) {
      case "influencer-list":
      case "influencer-detail":
      case "drawing":
      case "result":
        return "photos"
      case "voting":
        return "voting"
      case "my-page":
      case "collection":
        return "my"
      default:
        return "photos"
    }
  }

  // 화면 전환 함수 - 이전 화면 저장 기능 추가
  const navigateTo = (nextScreen: typeof screen) => {
    setPreviousScreen(screen)
    setScreen(nextScreen)
  }

  const handleSelectInfluencer = (id: string) => {
    setSelectedInfluencer(id)
    navigateTo("influencer-detail")
  }

  const handleStartDrawing = () => {
    navigateTo("drawing")

    // 3초 후에 결과 화면으로 이동
    setTimeout(() => {
      // 랜덤하게 카드 등급 결정 (S, A, C)
      const grades = [
        "S",
        "S",
        "S",
        "A",
        "A",
        "A",
        "A",
        "A",
        "A",
        "C",
        "C",
        "C",
        "C",
        "C",
        "C",
        "C",
        "C",
        "C",
        "C",
        "C",
      ]
      const randomIndex = Math.floor(Math.random() * grades.length)
      const grade = grades[randomIndex]

      // 카드 정보 설정
      setCurrentCard({
        id: Math.floor(Math.random() * 1000),
        grade,
        image: `/placeholder.svg?height=400&width=300&text=MFC-${grade}급`,
        name: `인플루언서명-${grade}급 화보`,
        description: "엑스로메다 MFC 이벤트",
      })

      navigateTo("result")
    }, 3000)
  }

  // 내 컬렉션 보기 클릭 시 마이 페이지의 내 컬렉션 탭으로 이동
  const handleShowMyCollection = () => {
    setMyPageActiveTab("my-collection")
    navigateTo("my-page")
  }

  // 뒤로가기 처리 함수
  const handleBack = () => {
    if (previousScreen) {
      setScreen(previousScreen)
      setPreviousScreen(null)
    } else {
      setScreen("influencer-list")
    }
  }

  const renderScreen = () => {
    switch (screen) {
      case "influencer-list":
        return <InfluencerListScreen onSelectInfluencer={handleSelectInfluencer} />
      case "influencer-detail":
        return (
          <InfluencerDetailScreen
            influencerId={selectedInfluencer || ""}
            onBack={() => navigateTo("influencer-list")}
            onStartDrawing={handleStartDrawing}
            onShowPurchase={() => navigateTo("purchase")}
          />
        )
      case "drawing":
        return <DrawingProcess />
      case "result":
        return (
          <ResultScreen
            card={currentCard}
            onBackToMain={() => navigateTo("influencer-detail")}
            onAddToCollection={() => navigateTo("collection")}
            onShowCollection={handleShowMyCollection}
            onShowPurchase={() => navigateTo("shipping")}
          />
        )
      case "collection":
        return (
          <CollectionScreen onBackToMain={() => navigateTo("my-page")} onShowPurchase={() => navigateTo("shipping")} />
        )
      case "mission":
        return <MissionScreen onBackToMain={() => navigateTo("influencer-list")} />
      case "purchase":
        return <PurchaseScreen onBackToMain={handleBack} />
      case "shipping":
        return <ShippingForm onBack={handleBack} selectedCount={1} />
      case "voting":
        return <VotingScreen onBack={() => navigateTo("influencer-list")} />
      case "my-page":
        return (
          <MyPage
            activeTab={myPageActiveTab}
            onTabChange={setMyPageActiveTab}
            onBackToMain={() => navigateTo("influencer-list")}
            onShowCollection={() => navigateTo("collection")}
            onGoToPhotos={() => navigateTo("influencer-list")}
          />
        )
      default:
        return <InfluencerListScreen onSelectInfluencer={handleSelectInfluencer} />
    }
  }

  // 바텀 네비게이션 렌더링 함수
  const renderBottomNav = () => {
    // 인플루언서 상세 페이지에서는 바텀 탭바 표시하지 않음
    if (screen === "influencer-detail") return null

    const activeTab = getActiveTab()

    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 py-2 px-4">
        <div className="flex justify-around max-w-md mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateTo("influencer-list")}
            className={`${activeTab === "home" ? "text-[#FF0844]" : "text-white"} flex flex-col items-center`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">홈</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateTo("voting")}
            className={`${activeTab === "voting" ? "text-[#FF0844]" : "text-white"} flex flex-col items-center`}
          >
            <Heart className="h-5 w-5" />
            <span className="text-xs mt-1">투표</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateTo("influencer-list")}
            className={`${activeTab === "photos" ? "text-[#FF0844]" : "text-white"} flex flex-col items-center`}
          >
            <Grid3X3 className="h-5 w-5" />
            <span className="text-xs mt-1">화보</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-white flex flex-col items-center">
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs mt-1">굿즈</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateTo("my-page")}
            className={`${activeTab === "my" ? "text-[#FF0844]" : "text-white"} flex flex-col items-center`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">마이</span>
          </Button>
        </div>
      </nav>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white pb-16">
      {/* 헤더 */}
      {screen !== "influencer-list" && screen !== "voting" && screen !== "my-page" && (
        <header className="w-full bg-black p-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
              <ArrowLeft className="h-5 w-5 text-white" />
            </Button>
            <h1 className="text-2xl font-bold text-[#FF0844]">MFC</h1>
          </div>
          <div className="text-sm text-gray-400">엑스로메다 MFC 이벤트</div>
        </header>
      )}

      {/* 메인 콘텐츠 */}
      <div className="flex-1 w-full max-w-md mx-auto p-4">{renderScreen()}</div>

      {/* 하단 네비게이션 */}
      {screen !== "purchase" && screen !== "shipping" && renderBottomNav()}
    </main>
  )
}

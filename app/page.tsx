"use client"

import { useState } from "react"
import { Home, Users, Grid3X3, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"

// 기존 컴포넌트들 import
import DrawingProcess from "@/components/drawing-process"
import ResultScreen from "@/components/result-screen"
import CollectionScreen from "@/components/collection-screen"
import MissionScreen from "@/components/mission-screen"
import PurchaseScreen from "@/components/purchase-screen"
import ShippingForm from "@/components/shipping-form"
import InfluencerListScreen from "@/components/influencer-list-screen"
import InfluencerDetailScreen from "@/components/influencer-detail-screen"
import ImprovedMyCollection from "@/components/my-page"

// 새로운 컴포넌트들 (실제 프로젝트에서는 해당 파일들을 생성해야 함)
// import VotingScreen from "@/components/voting-screen-updated"
// import AuctionScreen from "@/components/auction-screen" 
// import PhotocardMaker from "@/components/photocard-maker"
// import PhysicalOrderForm from "@/components/physical-order-form"

// 임시 컴포넌트들 (실제로는 위의 새로운 컴포넌트들로 교체)
const VotingScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-4">
    <button onClick={onBack} className="mb-4 p-2 bg-gray-200 rounded">← 뒤로가기</button>
    <h1 className="text-2xl font-bold text-center">투표하기 (구현 예정)</h1>
    <p className="text-center text-gray-600 mt-4">투표 기능이 여기에 구현됩니다.</p>
  </div>
)

const AuctionScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-black text-white p-4">
    <button onClick={onBack} className="mb-4 p-2 bg-gray-800 rounded text-white">← 뒤로가기</button>
    <h1 className="text-2xl font-bold text-center">굿즈 경매 (구현 예정)</h1>
    <p className="text-center text-gray-400 mt-4">굿즈 경매 기능이 여기에 구현됩니다.</p>
  </div>
)

const PhotocardMaker = ({ selectedCards, onBack, onDownload, onOrderPhysical }: any) => (
  <div className="min-h-screen bg-black text-white p-4">
    <button onClick={onBack} className="mb-4 p-2 bg-gray-800 rounded">← 뒤로가기</button>
    <h1 className="text-2xl font-bold text-center">포토카드 제작 (구현 예정)</h1>
    <p className="text-center text-gray-400 mt-4">포토카드 제작 기능이 여기에 구현됩니다.</p>
  </div>
)

const PhysicalOrderForm = ({ selectedCards, onBack, onOrderComplete }: any) => (
  <div className="min-h-screen bg-black text-white p-4">
    <button onClick={onBack} className="mb-4 p-2 bg-gray-800 rounded">← 뒤로가기</button>
    <h1 className="text-2xl font-bold text-center">실물 주문 (구현 예정)</h1>
    <p className="text-center text-gray-400 mt-4">실물 주문 기능이 여기에 구현됩니다.</p>
  </div>
)

export default function MainApp() {
  const [screen, setScreen] = useState<
    | "home"
    | "influencer-list"
    | "influencer-detail"
    | "drawing"
    | "result"
    | "collection"
    | "mission"
    | "purchase"
    | "shipping"
    | "voting"
    | "auction"
    | "my-page"
    | "photocard-maker"
    | "physical-order"
  >("home")

  // 상태 관리
  const [selectedInfluencer, setSelectedInfluencer] = useState<string | null>(null)
  const [currentCard, setCurrentCard] = useState<any>(null)
  const [selectedCards, setSelectedCards] = useState<any[]>([])
  

  // 현재 활성 탭 결정
  const getActiveTab = () => {
    switch (screen) {
      case "home":
      case "influencer-list":
      case "influencer-detail":
      case "drawing":
      case "result":
        return "photos"
      case "voting":
        return "voting"
      case "auction":
        return "auction"
      case "my-page":
      case "collection":
        return "my"
      default:
        return "photos"
    }
  }

  // 홈 화면 (화보뽑기 메인)
  const renderHomeScreen = () => (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* 헤더 */}
      <div className="bg-black p-4 text-center border-b border-gray-800">
        <h1 className="text-2xl font-bold text-[#FF0844]">MFC</h1>
        <p className="text-sm text-gray-500">엑스로메다 MFC 이벤트</p>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 p-4">
        {/* 화보 뽑기 안내 */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 rounded-lg mb-6 text-center">
          <h2 className="text-xl font-bold mb-2">화보 뽑기 이벤트</h2>
          <p className="text-sm opacity-90 mb-4">
            인플루언서의 화보를 뽑고 미션을 완성하여 미공개 화보를 획득하세요!
          </p>
          <Button 
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => setScreen("influencer-list")}
          >
            화보뽑기 시작하기
          </Button>
        </div>

        {/* 퀵 액션 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div 
            className="bg-gray-900 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-800"
            onClick={() => setScreen("voting")}
          >
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <p className="font-medium">투표하기</p>
            <p className="text-xs text-gray-400">응원 투표 참여</p>
          </div>
          
          <div 
            className="bg-gray-900 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-800"
            onClick={() => setScreen("auction")}
          >
            <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <p className="font-medium">굿즈 경매</p>
            <p className="text-xs text-gray-400">한정 굿즈 경매</p>
          </div>
        </div>

        {/* 최근 업데이트 */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="font-bold mb-3">최근 업데이트</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">• 새로운 포토카드 제작 기능 추가</span>
              <span className="text-gray-500 text-xs">2일 전</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">• 투표 시스템 개선</span>
              <span className="text-gray-500 text-xs">1주일 전</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">• 굿즈 경매 서비스 오픈</span>
              <span className="text-gray-500 text-xs">2주일 전</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // 화면 렌더링
  const renderScreen = () => {
    switch (screen) {
      case "home":
        return renderHomeScreen()
      
      case "influencer-list":
        return (
          <InfluencerListScreen 
            onSelectInfluencer={(id) => {
              setSelectedInfluencer(id)
              setScreen("influencer-detail")
            }}
          />
        )
      
      case "influencer-detail":
        return selectedInfluencer ? (
          <InfluencerDetailScreen
            influencerId={selectedInfluencer}
            onBack={() => setScreen("influencer-list")}
            onStartDrawing={() => setScreen("drawing")}
            onShowPurchase={() => setScreen("purchase")} // ✅ 이 줄 추가
          />
        ) : null
      
      case "drawing":
        return (
          <DrawingProcess
            onDrawComplete={(card) => {
              setCurrentCard(card)
              setScreen("result")
            }}
          />
        )
      
      case "result":
        return (
          <ResultScreen
            card={currentCard}
            onBackToMain={() => setScreen("influencer-detail")}
            onShowCollection={() => setScreen("collection")}
            onGoToMyPage={() => setScreen("my-page")} // ✅ 추가
            onShowMission={() => setScreen("mission")}
            onAddToCollection={() => {  // ✅ 파라미터 제거
              // 컬렉션에 카드 추가 로직
              console.log('카드 추가:', currentCard) // currentCard 사용
            }}
            onShowPurchase={() => setScreen("purchase")}
          />
        )
      
      case "collection":
        return (
          <CollectionScreen
            onBackToMain={() => setScreen("home")}
            onShowPurchase={() => setScreen("purchase")}
            onShowPhysicalOrder={(cards) => {
              setSelectedCards(cards)
              setScreen("physical-order")
            }}
          />
        )
      
      case "mission":
        return (
          <MissionScreen
            onBackToMain={() => setScreen("home")}
          />
        )
      
      case "purchase":
        return (
          <PurchaseScreen
            onBack={() => setScreen("influencer-detail")} // ✅ 수정: 바로 전 페이지로 이동
            onShowShipping={() => setScreen("shipping")}
          />
        )
      
      case "shipping":
        return (
          <ShippingForm
            onBack={() => setScreen("purchase")}
            onComplete={() => setScreen("my-page")}
          />
        )
      
      case "voting":
        return (
          <VotingScreen
            onBack={() => setScreen("home")}
          />
        )
      
      case "auction":
        return (
          <AuctionScreen
            onBack={() => setScreen("home")}
          />
        )
      
      case "photocard-maker":
        return (
          <PhotocardMaker
            selectedCards={selectedCards}
            onBack={() => setScreen("collection")}
            onDownload={(cards: any) => {  // ✅ any 타입 명시
              setScreen("collection")
              // 다운로드 완료 처리
            }}
            onOrderPhysical={(cards: any) => {  // ✅ any 타입 명시
              setSelectedCards(cards)
              setScreen("physical-order")
            }}
          />
        )

      case "physical-order":
        return (
          <PhysicalOrderForm
            selectedCards={selectedCards}
            onBack={() => setScreen("collection")}
            onOrderComplete={(orderData: any) => {  // ✅ any 타입 명시
              setScreen("my-page")
              // 주문 완료 처리
            }}
          />
        )
      
      case "my-page":
      return (
        <ImprovedMyCollection 
          onNavigateToInfluencer={(influencerId) => {
            setSelectedInfluencer(influencerId)
            setScreen("influencer-detail")
          }}
        />
      )
      
      default:
        return renderHomeScreen()
    }
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* 메인 콘텐츠 - 모바일 우선, PC에서는 최대 너비 제한 */}
      <div className="pb-20 max-w-md lg:max-w-5xl mx-auto min-h-screen bg-black">
        {renderScreen()}
      </div>

      {/* 하단 탭 네비게이션 - PC에서도 모바일 너비로 제한 */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md lg:max-w-5xl bg-black border-t border-gray-800 z-50">
        <div className="grid grid-cols-5 h-16">
          {/* 홈 */}
          <button
            onClick={() => setScreen("home")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              getActiveTab() === "photos" && screen === "home" 
                ? "text-[#FF4968]" 
                : "text-gray-500"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">홈</span>
          </button>

          {/* 투표하기 */}
          <button
            onClick={() => setScreen("voting")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              getActiveTab() === "voting" 
                ? "text-[#FF4968]" 
                : "text-gray-500"
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">투표하기</span>
          </button>

          {/* 화보뽑기 */}
          <button
            onClick={() => setScreen("influencer-list")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              getActiveTab() === "photos" && screen !== "home"
                ? "text-[#FF4968]" 
                : "text-gray-500"
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
            <span className="text-xs">화보뽑기</span>
          </button>

          {/* 굿즈 */}
          <button
            onClick={() => setScreen("auction")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              getActiveTab() === "auction" 
                ? "text-[#FF4968]" 
                : "text-gray-500"
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs">굿즈</span>
          </button>

          {/* 마이페이지 */}
          <button
            onClick={() => setScreen("my-page")}
            className={`flex flex-col items-center justify-center space-y-1 ${
              getActiveTab() === "my" 
                ? "text-[#FF4968]" 
                : "text-gray-500"
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">마이페이지</span>
          </button>
        </div>
      </div>
    </div>
  )
}
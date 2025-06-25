"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Users, Crown, X, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface VotingScreenProps {
  onBack: () => void
}

export default function VotingScreen({ onBack }: VotingScreenProps) {
  const [selectedInfluencer, setSelectedInfluencer] = useState<string | null>("inf1")
  const [votingType, setVotingType] = useState<"team" | "individual">("individual")
  const [showMembership, setShowMembership] = useState(false)
  const [showPaidVoting, setShowPaidVoting] = useState(false)
  const [showVoteComplete, setShowVoteComplete] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [showRanking, setShowRanking] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [transferStep, setTransferStep] = useState<"select" | "target">("select")

  // 인플루언서 데이터
  const influencers = [
    {
      id: "inf1",
      name: "정다별이",
      rank: 1,
      votes: 18642,
      image: "/placeholder.svg?height=400&width=300&text=인물+이미지",
      teamVotes: 2222
    },
    {
      id: "inf2", 
      name: "한승모델",
      rank: 2,
      votes: 18642,
      image: "/placeholder.svg?height=400&width=300&text=인물+이미지",
      teamVotes: 1820
    },
    {
      id: "inf3",
      name: "환승모델",
      rank: 3,
      votes: 18642,
      image: "/placeholder.svg?height=400&width=300&text=인물+이미지",
      teamVotes: 1642
    }
  ]

  // 투표 티켓 종류
  const tickets = [
    { id: "bronze", name: "브론즈 티켓", votes: 5, price: 2000, color: "bg-orange-400" },
    { id: "silver", name: "실버 티켓", votes: 30, price: 10000, color: "bg-gray-400" },
    { id: "gold", name: "골드 티켓", votes: 180, price: 50000, color: "bg-yellow-500", badge: "BEST" },
    { id: "diamond", name: "다이아 티켓", votes: 400, price: 100000, color: "bg-blue-400" },
    { id: "master", name: "마스터 티켓", votes: 1000, price: 150000, color: "bg-purple-500" }
  ]

  // 멤버십 플랜
  const memberships = [
    {
      id: "silver",
      name: "실버",
      price: 10000,
      benefits: [
        "유료투표권 실버(1만원)권 증정",
        "유료투표 구매 권한 실버 ~ 골드",
        "펀딩 참가 권한 부여",
        "유튜브에 있는 무삭제 영상 제공"
      ],
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      id: "gold", 
      name: "골드",
      price: 20000,
      benefits: [
        "유료투표권 골드(5만원)권 증정",
        "유료투표 구매 권한 전체",
        "펀딩 참가 권한 부여",
        "유튜브에 있는 무삭제 영상 제공",
        "월 1회 오프라인 팬미팅 우선권"
      ],
      gradient: "from-yellow-400 to-orange-500"
    }
  ]

  // 랭킹 데이터
  const rankings = [
    { rank: 1, username: "고구****", votes: 8300 },
    { rank: 2, username: "KJ**", votes: 4200 },
    { rank: 3, username: "삼*", votes: 1200 }
  ]

  const currentInfluencer = influencers.find(inf => inf.id === selectedInfluencer) || influencers[0]

  // 무료 투표
  const handleFreeVote = () => {
    setShowVoteComplete(true)
  }

  // 유료 투표
  const handlePaidVote = () => {
    setShowPaidVoting(true)
  }

  // 투표 완료 처리
  const handleVoteSubmit = () => {
    setShowPaidVoting(false)
    setShowVoteComplete(true)
  }

  // 환승 투표
  const handleTransfer = () => {
    setShowTransfer(true)
    setTransferStep("select")
  }

  // 투표 완료 모달
  if (showVoteComplete) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-sm w-full text-center">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-pink-600" />
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2">투표가 완료되었어요!</h2>
          <p className="text-gray-600 mb-2">2위와 1,800표 차이에요</p>
          <p className="text-gray-600 mb-8">당신의 응원이 큰 힘이 되었어요!</p>
          
          <Button 
            onClick={() => setShowVoteComplete(false)}
            className="w-full py-3 bg-[#FF4968] hover:bg-[#FF4968]/90 text-white rounded-lg"
          >
            한번 더 투표하기
          </Button>
        </div>
      </div>
    )
  }

  // 환승 투표 모달
  if (showTransfer) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
          <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold">환승하기</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowTransfer(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {transferStep === "select" && (
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="font-medium mb-2">환승 가능한 티켓을 선택하고,</p>
                <p className="text-gray-600">다음 단계에서 환승할 모델을 선택하세요.</p>
              </div>

              <div className="space-y-3">
                {[
                  { model: "환승모델", ticket: "골드 티켓 180표", count: "1 장" },
                  { model: "환승모델", ticket: "골드 티켓 540표", count: "3 장" },
                  { model: "환승모델", ticket: "골드 티켓 1,260표", count: "7 장" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      index === 0 ? "border-pink-300 bg-pink-50" : "border-gray-200"
                    }`}
                    onClick={() => setTransferStep("target")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          index === 0 ? "border-pink-500 bg-pink-500" : "border-gray-300"
                        } flex items-center justify-center`}>
                          {index === 0 && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <img 
                          src="/placeholder.svg?height=40&width=40" 
                          alt={item.model}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{item.model}</p>
                          <p className="text-sm text-gray-600">{item.ticket}</p>
                        </div>
                      </div>
                      <span className="font-bold text-lg">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center space-x-4 mt-6">
                <Button variant="outline" size="icon">-</Button>
                <span className="text-2xl font-bold">1</span>
                <Button variant="outline" size="icon">+</Button>
              </div>

              <Button 
                onClick={() => setTransferStep("target")}
                className="w-full mt-6 py-3 bg-[#FF4968] hover:bg-[#FF4968]/90 text-white"
              >
                다음
              </Button>
            </div>
          )}

          {transferStep === "target" && (
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="font-medium mb-2">환승 가능한 티켓을 선택하고,</p>
                <p className="text-pink-600 font-medium">환승모델 골드티켓 1장 180표가 환승됩니다.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {influencers.slice(0, 4).map((inf, index) => (
                  <div 
                    key={inf.id}
                    className={`relative p-3 rounded-lg border-2 cursor-pointer ${
                      index === 1 ? "border-pink-500" : "border-gray-200"
                    } ${index === 2 ? "opacity-50" : ""}`}
                  >
                    <img 
                      src={inf.image} 
                      alt={inf.name}
                      className="w-full aspect-[3/4] object-cover rounded-lg mb-2"
                    />
                    <div className={`absolute top-1 right-1 w-8 h-6 rounded flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? "bg-pink-500" : index === 1 ? "bg-purple-400" : "bg-gray-400"
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    {index === 1 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                          <Check className="w-6 h-6 text-pink-600" />
                        </div>
                      </div>
                    )}
                    
                    {index === 2 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                        <span className="text-white text-sm font-medium">선택할 수 없습니다</span>
                      </div>
                    )}
                    
                    <p className="font-medium text-sm">{inf.name}</p>
                    <p className="text-pink-600 text-sm font-bold">{inf.votes.toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setTransferStep("select")}
                >
                  이전
                </Button>
                <Button 
                  className="flex-1 bg-[#FF4968] hover:bg-[#FF4968]/90 text-white"
                  onClick={() => {
                    setShowTransfer(false)
                    setShowVoteComplete(true)
                  }}
                >
                  환승 하기
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // 유료 투표 모달
  if (showPaidVoting) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
          <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold">유료 투표</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowPaidVoting(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6">
            <p className="text-center text-gray-600 mb-6">응원하실 티켓을 선택하세요.</p>

            <div className="space-y-3 mb-6">
              {tickets.map((ticket) => (
                <div 
                  key={ticket.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedTicket === ticket.id ? "border-pink-300 bg-pink-50" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedTicket(ticket.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        selectedTicket === ticket.id ? "border-pink-500 bg-pink-500" : "border-gray-300"
                      } flex items-center justify-center`}>
                        {selectedTicket === ticket.id && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{ticket.name} / {ticket.votes}표</span>
                          {ticket.badge && (
                            <span className="px-2 py-1 bg-pink-500 text-white text-xs rounded font-bold">
                              {ticket.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">{ticket.price.toLocaleString()}원</p>
                      </div>
                    </div>
                    
                    {(ticket.id === "diamond" || ticket.id === "master") && (
                      <Button size="sm" className="bg-black text-white text-xs">
                        멤버십 가입
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span>선택 : {tickets.find(t => t.id === selectedTicket)?.name || "브론즈 티켓"} / {tickets.find(t => t.id === selectedTicket)?.votes || 5}표</span>
                <span>결제 금액 : {(tickets.find(t => t.id === selectedTicket)?.price || 2000).toLocaleString()}원</span>
              </div>
            </div>

            <Button 
              onClick={handleVoteSubmit}
              className="w-full py-3 bg-[#FF4968] hover:bg-[#FF4968]/90 text-white"
              disabled={!selectedTicket}
            >
              결제하기
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // 멤버십 모달
  if (showMembership) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
          <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold">멤버십</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowMembership(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {memberships.map((membership) => (
              <div key={membership.id} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <div className={`h-32 bg-gradient-to-r ${membership.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold capitalize">{membership.name}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-2xl font-bold mb-1">₩{membership.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 mb-4">/ 월 (추가 세금: VAT)</div>
                  
                  <Button className="w-full mb-4 bg-black text-white">가입</Button>
                  
                  <ul className="space-y-2">
                    {membership.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 랭킹 모달
  if (showRanking) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold">열성팬 랭킹</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowRanking(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-6">
            {rankings.map((rank) => (
              <div key={rank.rank} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    rank.rank === 1 ? "bg-yellow-500" : rank.rank === 2 ? "bg-gray-400" : "bg-orange-400"
                  }`}>
                    {rank.rank}
                  </div>
                  <span className="font-medium">{rank.username}</span>
                </div>
                <span className="font-bold text-pink-600">{rank.votes.toLocaleString()}표</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* 헤더 */}
      <div className="relative">
        <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-10" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="text-center pt-16 pb-6">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-pink-500 rounded-full" />
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </div>
          
          <h1 className="text-3xl font-bold text-pink-600 mb-2">{currentInfluencer.name}</h1>
          <p className="text-gray-600">이번 라운드의 주인공으로!</p>
        </div>
      </div>

      {/* 메인 이미지 영역 */}
      <div className="relative px-4 mb-6">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-blue-100 p-8">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          <img 
            src={currentInfluencer.image}
            alt={currentInfluencer.name}
            className="w-full h-96 object-cover rounded-xl"
          />
          
          {/* 좌우 네비게이션 버튼 */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
            onClick={() => {
              const currentIndex = influencers.findIndex(inf => inf.id === selectedInfluencer)
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : influencers.length - 1
              setSelectedInfluencer(influencers[prevIndex].id)
            }}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
            onClick={() => {
              const currentIndex = influencers.findIndex(inf => inf.id === selectedInfluencer)
              const nextIndex = currentIndex < influencers.length - 1 ? currentIndex + 1 : 0
              setSelectedInfluencer(influencers[nextIndex].id)
            }}
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Button>

          {/* 오버레이 정보 */}
          <div className="absolute bottom-4 left-4 space-y-2">
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-1">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-bold">1위 : 고구****</span>
                <span className="text-pink-300 font-bold">8,300표</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-orange-400 rounded" />
                <span className="text-sm font-bold">2위 : KJ**</span>
                <span className="text-pink-300 font-bold">4,200표</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-blue-400 rounded" />
                <span className="text-sm font-bold">3위 : 삼*</span>
                <span className="text-pink-300 font-bold">1,200표</span>
              </div>
            </div>
          </div>

          {/* 우측 액션 버튼들 */}
          <div className="absolute bottom-4 right-4 space-y-3">
            <Button 
              size="sm" 
              className="bg-white/90 text-gray-900 hover:bg-white"
              onClick={() => window.location.href = "/photos"}
            >
              <div className="w-4 h-4 mr-2 bg-pink-500 rounded" />
              화보뽑기
            </Button>
            <Button 
              size="sm" 
              className="bg-white/90 text-gray-900 hover:bg-white"
              onClick={() => window.location.href = "/auction"}
            >
              <div className="w-4 h-4 mr-2 bg-yellow-500 rounded" />
              굿즈경매
            </Button>
            <Button 
              size="sm" 
              className="bg-white/90 text-gray-900 hover:bg-white"
              onClick={() => window.location.href = "/channels"}
            >
              <div className="w-4 h-4 mr-2 bg-green-500 rounded" />
              채널이동
            </Button>
          </div>
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/90 text-gray-600 hover:bg-white text-xs"
          onClick={() => setShowRanking(true)}
        >
          열성팬 랭킹 접기
        </Button>
      </div>

      {/* 현재 순위 */}
      <div className="px-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Crown className="w-6 h-6 text-pink-500" />
            <span className="text-2xl font-bold">현재 1위</span>
            <span className="text-3xl font-bold text-pink-600">{currentInfluencer.votes.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* 투표 버튼 */}
      <div className="px-4 space-y-3 mb-8">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="py-6 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={handleFreeVote}
          >
            무료투표
          </Button>
          <Button 
            className="py-6 bg-[#FF4968] hover:bg-[#FF4968]/90 text-white"
            onClick={handlePaidVote}
          >
            유료투표
          </Button>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"

interface InfluencerListScreenProps {
  onSelectInfluencer: (id: string) => void
}

export default function InfluencerListScreen({ onSelectInfluencer }: InfluencerListScreenProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // 인플루언서 더미 데이터 - 동일한 이미지로 교체
  const influencers = [
    {
      id: "inf1",
      name: "김민지",
      image: "/placeholder.svg?height=300&width=200&text=인물+이미지",
      collectedCount: 5,
      totalCount: 20,
    },
    {
      id: "inf2",
      name: "이하은",
      image: "/placeholder.svg?height=300&width=200&text=인물+이미지",
      collectedCount: 3,
      totalCount: 20,
    },
    {
      id: "inf3",
      name: "박서아",
      image: "/placeholder.svg?height=300&width=200&text=인물+이미지",
      collectedCount: 0,
      totalCount: 20,
    },
    {
      id: "inf4",
      name: "정다현",
      image: "/placeholder.svg?height=300&width=200&text=인물+이미지",
      collectedCount: 4,
      totalCount: 20,
    },
    {
      id: "inf5",
      name: "최유나",
      image: "/placeholder.svg?height=300&width=200&text=인물+이미지",
      collectedCount: 0,
      totalCount: 20,
    },
    {
      id: "inf6",
      name: "한소희",
      image: "/placeholder.svg?height=300&width=200&text=인물+이미지",
      collectedCount: 0,
      totalCount: 20,
    },
  ]

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white pb-16">
      {/* 헤더 */}
      <div className="bg-black p-4 text-center border-b border-gray-800">
        <h1 className="text-2xl font-bold text-[#FF0844]">MFC</h1>
        <p className="text-sm text-gray-500">엑스로메다 MFC 이벤트</p>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1">
        {/* 화보 뽑기 안내 */}
        <div className="bg-gray-900 p-4 mb-2 rounded-lg mx-4 mt-4">
          <h2 className="text-lg font-bold mb-2">화보 뽑기 안내</h2>
          <p className="text-sm text-gray-400 mb-2">
            인플루언서의 화보를 뽑고 미션을 완성하여 미공개 화보를 획득하세요!
          </p>
        </div>

        {/* 인플루언서 리스트 */}
        <div className="bg-gray-900 mb-2 rounded-lg mx-4">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-lg font-bold">화보 뽑을 인플루언서</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 p-3">
            {influencers.map((influencer) => (
              <div
                key={influencer.id}
                className="border border-gray-800 rounded-lg overflow-hidden bg-gray-800 relative"
                onClick={() => onSelectInfluencer(influencer.id)}
              >
                <div className="relative">
                  <img
                    src={influencer.image || "/placeholder.svg"}
                    alt={influencer.name}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <div className="text-white font-bold">{influencer.name}</div>
                  </div>
                </div>
                <div className="p-2 flex justify-between items-center">
                  <div className="text-xs text-gray-400">획득한 화보</div>
                  <div className="text-sm font-bold text-[#FF0844]">
                    {influencer.collectedCount}/{influencer.totalCount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 유의사항 */}
        <div className="bg-gray-900 mb-2 rounded-lg mx-4">
          <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => toggleSection("notice")}>
            <h2 className="text-sm font-bold text-gray-300">유의사항</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${expandedSection === "notice" ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          {expandedSection === "notice" && (
            <div className="px-4 pb-4">
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• 인플루언서별로 화보 구성은 다를 수 있으며, 실물 포토카드 수령을 원하신다면 반드시 배송 신청이 필요합니다.</li>
                <li>• 구매 즉시 사용되는 상품으로 청약철회(구매 이후 취소 신청 및 환불)가 불가능합니다.</li>
                <li>• 확률성 뽑기형 상품으로 중복 상품이 있을 수 있으며, 이로 인한 교환, 환불이 불가합니다.</li>
                <li>• 개인 간 거래 또는 재판매가 절대 불가합니다.</li>
                <li>• 기차 상품은 판매 종료 후 일괄 제작 및 발송되며 약 7일 소요됩니다.</li>
              </ul>
            </div>
          )}
        </div>

        {/* 뽑기 확률표 */}
        <div className="bg-gray-900 rounded-lg mx-4">
          <div
            className="p-4 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection("probability")}
          >
            <h2 className="text-sm font-bold text-gray-300">뽑기 확률표</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${expandedSection === "probability" ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          {expandedSection === "probability" && (
            <div className="px-4 pb-4">
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="py-2 px-3 text-center">등급</th>
                      <th className="py-2 px-3 text-center">개수</th>
                      <th className="py-2 px-3 text-center">확률</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-700">
                      <td className="py-2 px-3 text-center">S</td>
                      <td className="py-2 px-3 text-center">3</td>
                      <td className="py-2 px-3 text-center">15%</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="py-2 px-3 text-center">A</td>
                      <td className="py-2 px-3 text-center">6</td>
                      <td className="py-2 px-3 text-center">30%</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="py-2 px-3 text-center">C</td>
                      <td className="py-2 px-3 text-center">11</td>
                      <td className="py-2 px-3 text-center">55%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

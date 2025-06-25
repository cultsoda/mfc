"use client"

import { useState, useEffect } from "react"

interface VotingScreenProps {
  onBack: () => void
}

export default function VotingScreen({ onBack }: VotingScreenProps) {
  const [days, setDays] = useState(6)
  const [hours, setHours] = useState(1)
  const [minutes, setMinutes] = useState(15)
  const [seconds, setSeconds] = useState(9)

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          if (hours > 0) {
            setHours(hours - 1)
            setMinutes(59)
            setSeconds(59)
          } else {
            if (days > 0) {
              setDays(days - 1)
              setHours(23)
              setMinutes(59)
              setSeconds(59)
            }
          }
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [days, hours, minutes, seconds])

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF5F7] text-black pb-16">
      {/* 헤더 */}
      <div className="bg-[#FF0844] p-4 text-center">
        <h1 className="text-xl font-bold text-white">환승모델</h1>
        <p className="text-sm text-white/80">
          1라운드 투표 마감 시간
          <br />
          오직 15명만 2라운드에 진출합니다!
        </p>
      </div>

      {/* VS 섹션 */}
      <div className="flex justify-center items-center p-4">
        <div className="bg-[#E8FFE0] rounded-full p-3 flex items-center">
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
            <span className="text-sm">VS</span>
          </div>
          <div className="ml-2 text-sm">
            <span className="font-bold">현재의 배우와 투표해</span>
          </div>
        </div>
      </div>

      {/* 버튼 섹션 */}
      <div className="px-4 space-y-2">
        <button className="w-full bg-white rounded-lg p-3 flex justify-between items-center border border-gray-200">
          <span className="font-bold">TOP15 진출 경쟁현황</span>
          <span className="text-[#FF0844]">확인하기</span>
        </button>
        <button className="w-full bg-white rounded-lg p-3 flex justify-between items-center border border-gray-200">
          <span className="font-bold">투표권 모으는 방법보기</span>
          <span className="text-[#FF0844]">확인하기</span>
        </button>
      </div>

      <div className="text-center text-sm text-gray-500 my-2">그래픽은 다음 라운드에, 당신의 투표로 결정됩니다.</div>

      {/* 탭 메뉴 */}
      <div className="flex border-b border-gray-200 mt-2">
        <button className="flex-1 py-2 text-center text-[#FF0844] border-b-2 border-[#FF0844]">1 라운드</button>
        <button className="flex-1 py-2 text-center text-gray-500">2 라운드</button>
        <button className="flex-1 py-2 text-center text-gray-500">3 라운드</button>
        <button className="flex-1 py-2 text-center text-gray-500">4 라운드</button>
      </div>

      {/* 카운트다운 타이머 */}
      <div className="flex justify-center space-x-2 my-4">
        <div className="flex flex-col items-center">
          <div className="bg-black text-white w-10 h-10 rounded flex items-center justify-center font-bold">
            {days.toString().padStart(2, "0")}
          </div>
          <span className="text-xs mt-1">일</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-black text-white w-10 h-10 rounded flex items-center justify-center font-bold">
            {hours.toString().padStart(2, "0")}
          </div>
          <span className="text-xs mt-1">시간</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-black text-white w-10 h-10 rounded flex items-center justify-center font-bold">
            {minutes.toString().padStart(2, "0")}
          </div>
          <span className="text-xs mt-1">분</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-black text-white w-10 h-10 rounded flex items-center justify-center font-bold">
            {seconds.toString().padStart(2, "0")}
          </div>
          <span className="text-xs mt-1">초</span>
        </div>
      </div>

      {/* 투표 버튼 */}
      <div className="flex justify-center space-x-2 px-4">
        <button className="flex-1 bg-[#FF0844] text-white py-2 rounded-lg font-bold">투표하기</button>
        <button className="flex-1 bg-gray-200 text-gray-500 py-2 rounded-lg font-bold">응원하기</button>
      </div>

      {/* 투표 현황 */}
      <div className="px-4 mt-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm">투표수</div>
          <div className="flex items-center space-x-2">
            <div className="bg-purple-100 rounded-lg px-2 py-1">
              <span className="text-xs font-bold">Model A</span>
            </div>
            <div className="font-bold">2,222</div>
            <div className="text-sm">VS</div>
            <div className="font-bold">1,820</div>
            <div className="bg-pink-100 rounded-lg px-2 py-1">
              <span className="text-xs font-bold">Model B</span>
            </div>
          </div>
        </div>
      </div>

      {/* 모델 그리드 */}
      <div className="px-4 mt-2">
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex mb-2">
              <div className="w-1/2 pr-1 relative">
                <img
                  src="/placeholder.svg?height=200&width=150&text=인물이미지"
                  alt={`모델 ${i * 2 - 1}`}
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
                <div className="absolute top-1 left-1 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">A</div>
                <div className="text-center mt-1">
                  <div className="text-xs">윤소현</div>
                  <div className="text-[#FF0844] text-xs font-bold">18,642</div>
                </div>
              </div>
              <div className="w-1/2 pl-1 relative">
                <img
                  src="/placeholder.svg?height=200&width=150&text=인물이미지"
                  alt={`모델 ${i * 2}`}
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
                <div className="absolute top-1 left-1 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">B</div>
                <div className="text-center mt-1">
                  <div className="text-xs">한소희</div>
                  <div className="text-[#FF0844] text-xs font-bold">18,642</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 더보기 버튼 */}
      <div className="px-4 mt-4 mb-8">
        <button className="w-full bg-[#FF0844] text-white py-3 rounded-lg font-bold">
          마감에 참여하실 분 보러가기 &gt;
        </button>
      </div>

      {/* 유의사항 */}
      <div className="px-4 mt-2 mb-20">
        <h3 className="text-sm font-bold mb-2">유의사항</h3>
        <ul className="text-xs text-gray-500 space-y-1">
          <li>• 투표는 1일 1회 가능하며, 추가 투표권은 이벤트를 통해 획득할 수 있습니다.</li>
          <li>• 투표 결과는 실시간으로 반영되며, 최종 결과는 마감 시간에 확정됩니다.</li>
          <li>• 부정 투표가 확인될 경우 해당 투표는 무효 처리됩니다.</li>
          <li>• 투표 기간 및 방식은 운영 사정에 따라 변경될 수 있습니다.</li>
        </ul>
      </div>
    </div>
  )
}

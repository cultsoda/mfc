"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import ToastMessage from "./toast-message"

interface ShareButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function ShareButton({ variant = "ghost", size = "sm", className = "text-gray-400" }: ShareButtonProps) {
  const [showToast, setShowToast] = useState(false)

  const handleShare = async () => {
    try {
      // 현재 URL을 클립보드에 복사
      await navigator.clipboard.writeText(window.location.href)
      setShowToast(true)
    } catch (error) {
      console.error("클립보드 복사 실패:", error)
    }
  }

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={handleShare}>
        <Share2 className="mr-1 h-4 w-4" />
        <span>공유하기</span>
      </Button>
      <ToastMessage
        message="주소가 클립보드에 복사되었어요. 원하는 곳에 공유하세요"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  )
}

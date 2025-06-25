"use client"

import { useEffect } from "react"

interface ToastMessageProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export default function ToastMessage({ message, isVisible, onClose }: ToastMessageProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 flex justify-center items-center px-4">
      <div className="bg-[#FF0844] text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-up max-w-md w-full">
        <div className="flex items-center">
          <div className="w-1 h-6 bg-white rounded-full mr-3"></div>
          <p className="text-sm font-medium">{message}</p>
        </div>
      </div>
    </div>
  )
}

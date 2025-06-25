// utils/downloadManager.ts

export interface PhotocardData {
  id: string
  name: string
  image: string
  grade: string
  influencer?: string
}

export interface FrameTemplate {
  id: string
  name: string
  borderColor: string
  borderWidth: number
  backgroundColor?: string
  pattern?: string
}

export class DownloadManager {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')!
  }

  // 고화질 포토카드 생성 (300DPI)
  async generateHighQualityPhotocard(
    card: PhotocardData,
    frame: FrameTemplate,
    options: {
      width?: number
      height?: number
      quality?: number
      format?: 'png' | 'jpeg'
    } = {}
  ): Promise<string> {
    const {
      width = 1020,  // 86mm at 300DPI
      height = 640,  // 54mm at 300DPI
      quality = 1.0,
      format = 'png'
    } = options

    this.canvas.width = width
    this.canvas.height = height

    // 배경 그리기
    this.drawBackground(frame, width, height)

    // 카드 이미지 로드 및 그리기
    const cardImageData = await this.loadAndDrawCardImage(card, width, height)
    
    // 프레임 및 장식 그리기
    this.drawFrame(frame, width, height)
    
    // 텍스트 및 정보 그리기
    this.drawCardInfo(card, width, height)

    // 품질 검증 및 최적화
    return this.optimizeAndExport(format, quality)
  }

  // 배경 그리기
  private drawBackground(frame: FrameTemplate, width: number, height: number) {
    // 기본 배경
    this.ctx.fillStyle = frame.backgroundColor || '#ffffff'
    this.ctx.fillRect(0, 0, width, height)

    // 패턴이나 그라데이션 배경
    if (frame.pattern) {
      this.drawPattern(frame.pattern, width, height)
    }
  }

  // 패턴 그리기
  private drawPattern(pattern: string, width: number, height: number) {
    switch (pattern) {
      case 'gradient':
        const gradient = this.ctx.createLinearGradient(0, 0, width, height)
        gradient.addColorStop(0, '#FF0844')
        gradient.addColorStop(1, '#8b5cf6')
        this.ctx.fillStyle = gradient
        this.ctx.fillRect(0, 0, width, height)
        break
      
      case 'dots':
        this.ctx.fillStyle = 'rgba(255, 8, 68, 0.1)'
        for (let x = 0; x < width; x += 30) {
          for (let y = 0; y < height; y += 30) {
            this.ctx.beginPath()
            this.ctx.arc(x, y, 3, 0, Math.PI * 2)
            this.ctx.fill()
          }
        }
        break
    }
  }

  // 카드 이미지 로드 및 그리기
  private async loadAndDrawCardImage(card: PhotocardData, width: number, height: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        // 이미지 영역 계산 (프레임 영역 제외)
        const padding = 40
        const imgX = padding
        const imgY = padding
        const imgWidth = width - (padding * 2)
        const imgHeight = height - (padding * 2) - 60 // 하단 텍스트 영역 확보

        // 이미지 비율 유지하며 그리기
        this.drawImageWithAspectRatio(img, imgX, imgY, imgWidth, imgHeight)
        resolve()
      }

      img.onerror = () => reject(new Error('이미지 로드 실패'))
      img.src = card.image
    })
  }

  // 비율 유지하며 이미지 그리기
  private drawImageWithAspectRatio(
    img: HTMLImageElement,
    x: number,
    y: number,
    maxWidth: number,
    maxHeight: number
  ) {
    const imgRatio = img.width / img.height
    const areaRatio = maxWidth / maxHeight

    let drawWidth = maxWidth
    let drawHeight = maxHeight
    let drawX = x
    let drawY = y

    if (imgRatio > areaRatio) {
      // 이미지가 더 넓음 - 높이를 기준으로 조정
      drawWidth = maxHeight * imgRatio
      drawX = x + (maxWidth - drawWidth) / 2
    } else {
      // 이미지가 더 높음 - 너비를 기준으로 조정
      drawHeight = maxWidth / imgRatio
      drawY = y + (maxHeight - drawHeight) / 2
    }

    // 둥근 모서리 클리핑
    this.ctx.save()
    this.roundRect(drawX, drawY, drawWidth, drawHeight, 10)
    this.ctx.clip()
    this.ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
    this.ctx.restore()
  }

  // 프레임 그리기
  private drawFrame(frame: FrameTemplate, width: number, height: number) {
    this.ctx.strokeStyle = frame.borderColor
    this.ctx.lineWidth = frame.borderWidth
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'

    // 외곽 프레임
    this.roundRect(10, 10, width - 20, height - 20, 15)
    this.ctx.stroke()

    // 내부 장식 프레임 (선택적)
    if (frame.id === 'luxury') {
      this.ctx.strokeStyle = frame.borderColor
      this.ctx.lineWidth = 2
      this.roundRect(25, 25, width - 50, height - 50, 10)
      this.ctx.stroke()
    }
  }

  // 카드 정보 텍스트 그리기
  private drawCardInfo(card: PhotocardData, width: number, height: number) {
    // 카드명
    this.ctx.fillStyle = '#000000'
    this.ctx.font = 'bold 28px Arial, sans-serif'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    
    const cardName = card.name || '포토카드'
    this.ctx.fillText(cardName, width / 2, height - 35)

    // 인플루언서명 (부제)
    if (card.influencer) {
      this.ctx.font = '18px Arial, sans-serif'
      this.ctx.fillStyle = '#666666'
      this.ctx.fillText(card.influencer, width / 2, height - 15)
    }

    // 등급 뱃지
    this.drawGradeBadge(card.grade, width - 70, 25)
  }

  // 등급 뱃지 그리기
  private drawGradeBadge(grade: string, x: number, y: number) {
    const badgeSize = 50
    const badgeColor = this.getGradeColor(grade)

    // 뱃지 배경 (원형)
    this.ctx.fillStyle = badgeColor
    this.ctx.beginPath()
    this.ctx.arc(x + badgeSize/2, y + badgeSize/2, badgeSize/2, 0, Math.PI * 2)
    this.ctx.fill()

    // 뱃지 테두리
    this.ctx.strokeStyle = '#ffffff'
    this.ctx.lineWidth = 3
    this.ctx.stroke()

    // 등급 텍스트
    this.ctx.fillStyle = '#ffffff'
    this.ctx.font = 'bold 24px Arial, sans-serif'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(grade, x + badgeSize/2, y + badgeSize/2)
  }

  // 등급별 색상
  private getGradeColor(grade: string): string {
    switch (grade.toUpperCase()) {
      case 'SSS': return '#ff6b00'
      case 'SS': return '#ff9500'
      case 'S': return '#fbbf24'
      case 'A': return '#9ca3af'
      case 'B': return '#6b7280'
      default: return '#4b5563'
    }
  }

  // 둥근 사각형 그리기 헬퍼
  private roundRect(x: number, y: number, width: number, height: number, radius: number) {
    this.ctx.beginPath()
    this.ctx.moveTo(x + radius, y)
    this.ctx.lineTo(x + width - radius, y)
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    this.ctx.lineTo(x + width, y + height - radius)
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    this.ctx.lineTo(x + radius, y + height)
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    this.ctx.lineTo(x, y + radius)
    this.ctx.quadraticCurveTo(x, y, x + radius, y)
    this.ctx.closePath()
  }

  // 최적화 및 내보내기
  private optimizeAndExport(format: 'png' | 'jpeg', quality: number): string {
    if (format === 'jpeg') {
      return this.canvas.toDataURL('image/jpeg', quality)
    }
    return this.canvas.toDataURL('image/png')
  }

  // 일괄 다운로드
  async downloadMultipleCards(
    cards: PhotocardData[],
    frame: FrameTemplate,
    options?: { format?: 'png' | 'jpeg'; quality?: number }
  ): Promise<void> {
    const downloadPromises = cards.map(async (card, index) => {
      const dataUrl = await this.generateHighQualityPhotocard(card, frame, options)
      
      // 파일명 생성
      const filename = `${card.influencer || 'photocard'}-${card.name}-${index + 1}.${options?.format || 'png'}`
      
      // 다운로드 트리거
      this.triggerDownload(dataUrl, filename)
      
      // 연속 다운로드를 위한 지연
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    await Promise.all(downloadPromises)
  }

  // 다운로드 트리거
  private triggerDownload(dataUrl: string, filename: string) {
    const link = document.createElement('a')
    link.download = filename
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // ZIP 파일로 일괄 다운로드 (추후 구현)
  async downloadAsZip(cards: PhotocardData[], frame: FrameTemplate): Promise<void> {
    // JSZip 라이브러리를 사용한 ZIP 파일 생성
    // 추후 구현 예정
    console.log('ZIP 다운로드 기능은 추후 구현 예정입니다.')
  }

  // 메모리 정리
  cleanup() {
    this.canvas.width = 0
    this.canvas.height = 0
  }
}

// 싱글톤 인스턴스
export const downloadManager = new DownloadManager()
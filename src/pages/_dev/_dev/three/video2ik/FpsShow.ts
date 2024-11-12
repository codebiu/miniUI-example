class FpsShow {
    private fps: number
    private startTime: number
    private frameCount: number
    constructor() {
      this.fps = 0
      this.startTime = Date.now()
      this.frameCount = 0
    }
    update() {
      this.frameCount++
      const currentTime = Date.now()
      const elapsedTime = currentTime - this.startTime
      if (elapsedTime >= 1000) {
        this.fps = this.frameCount / (elapsedTime / 1000)
        this.startTime = currentTime
        this.frameCount = 0
      }
    }
    getFps() {
      return this.fps
    }
  }

  export{FpsShow}
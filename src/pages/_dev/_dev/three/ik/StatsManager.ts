import Stats from 'stats.js'
class StatsManager {
    statsMap: Map<string, Stats>
    constructor() {
        this.statsMap = new Map()
    }

    add(dom: string) {
        const container = document.getElementById(dom) as HTMLCanvasElement
        const stats = new Stats()
        container.appendChild(stats.dom)
        this.statsMap.set(dom, stats)
        // 设置监视器位置
        stats.dom.style.left = 'auto'
        stats.dom.style.right = '0px'
        return stats
    }
}


export { StatsManager }
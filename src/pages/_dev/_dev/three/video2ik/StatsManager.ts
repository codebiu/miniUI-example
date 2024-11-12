import Stats from 'stats.js';
class StatsManager {
  statsMap: Map<string, Stats>;
  constructor() {
    this.statsMap = new Map();
  }

  add(dom: string) {
    const container = document.getElementById(dom) as unknown as HTMLCanvasElement;
    const stats = new Stats();
    container.parentElement && container.parentElement.appendChild(stats.dom);
    this.statsMap.set(dom, stats);
    // 设置监视器位置
    stats.dom.style.left = 'auto';
    stats.dom.style.right = '0px';
    stats.dom.style.position = 'absolute';
    return stats;
  }

  remove(dom: string) {
    const stats = this.statsMap.get(dom);
    if (!stats) return;
    stats.dom.parentElement && stats.dom.parentElement.removeChild(stats.dom);
    this.statsMap.delete(dom);
  }
}

export { StatsManager };

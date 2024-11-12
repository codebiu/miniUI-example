import * as echarts from 'echarts'

interface DataItem {
    name: string
    value: number[];
}

class DataShowEchart {
    data: DataItem[] = []
    option: echarts.EChartsOption | null = null
    myChart: echarts.ECharts
    startTime: Date | null = null
    constructor(dom: HTMLElement) {
        // this.init();
        this.myChart = echarts.init(dom)
    }

    /**
     * 动态数据
     */
    initDynamicData() {
        this.startTime = null
        this.option = {
            title: {
                text: 'pose'
            },
            grid : {
                top:'24px',
                left: '24px',
                right: '24px',
                bottom: '24px',
            },
            // 鼠标悬停显示数据
            tooltip: {
                trigger: 'axis',
                formatter: function (params: any) {
                    params = params[0]
                    // const date = new Date(params.name)
                    return (
                        params.name +
                        ' : ' +
                        params.value[1]
                    )
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'value',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                // 上下分割线
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    name: 'Fake Data',
                    type: 'line',
                    showSymbol: false,
                    data: this.data
                }
            ]
        }

        this.option && this.myChart.setOption(this.option)
        // 更新数据
        setInterval(() => {
            this.myChart.setOption<echarts.EChartsOption>({
                series: [
                    {
                        data: this.data
                    }
                ]
            })
        }, 1000)
    }

    updateDynamicData(value: number) {
        if (!this.startTime) this.startTime = new Date()
        const timeDifferenceMs = (new Date().getTime() - this.startTime.getTime()) / 1000
        const result = {
            name: timeDifferenceMs.toString(),
            value: [timeDifferenceMs, value]
        }
        this.data.push(result)
    }
}

export { DataShowEchart }

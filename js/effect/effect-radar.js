$(function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('radar'));
    option = {
        title: {
            text: '细粒度影响力指数',
            textStyle: {
                color: 'white'
            }
        },
        tooltip: {},
        legend: {
            data: ['预算分配', '实际开销'],
            textStyle: {
                color: 'white'
            }
        },
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: [
                { name: '传播度', max: 100 },
                { name: '权威度', max: 100 },
                { name: '丰富度', max: 100 },
                { name: '好评度', max: 100 },
                { name: '显著度', max: 100 }
            ]
        },
        series: [{
            name: '细粒度影响力指数',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
                {
                    value: [78, 44, 90, 23, 66, 88]
                    // name: '预算分配（Allocated Budget）'
                }
            ]
        }]
    };
    myChart.setOption(option, true);
})
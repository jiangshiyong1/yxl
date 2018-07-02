$(function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('line'));
    // 指定图表的配置项和数据
    var option = {
        backgroundColor: ['#2B2B2B'],
        textStyle: {
            color: 'white'
        },
        title: {
            text: '舆情热度走势',
            x: 'center',
            y: 'top',
            textStyle: {
                color: 'white'
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        legend: {
            data: ['评论数', '转发数'],
            textStyle: {
                color: 'white'
            },
            padding: 10,
            x: 'right', // 'center' | 'left' | {number},
            y: 'top' // 'center' | 'bottom' | {number}
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '评论数',
            data: [820, 932, 401, 134, 1090, 330, 1300],
            type: 'line',
            smooth: true
        },
        {
            name: '转发数',
            data: [82, 932, 901, 904, 1290, 1300, 820],
            type: 'line',
            smooth: true,
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: '#1E90FF'
                    }
                }
            },
        }]
    };
    myChart.setOption(option, true);
})
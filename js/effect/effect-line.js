$(function () {
    var address = localStorage.getItem("address")
    var id = window.location.href.split("?")[1]
    $.ajax({
        type: "POST",
        url: address + "select_task_trend",
        dataType: "json",
        data: { id: id },
        error: function (msg) {
            layer.msg("出错啦！")
        },
        success: function (data) {
            var xAxisData = []
            var seriesData = []
            var commentObj = []
            var forwardObj = []
            for (var i in data) {
                xAxisData[i] = data[i].execution_time
                commentObj[i] = data[i].comment_number
                forwardObj[i] = data[i].forward_number
            }
            seriesData.push({
                name: '评论数',
                data: commentObj,
                type: 'line',
                smooth: true
            },
                {
                    name: '转发数',
                    data: forwardObj,
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: '#1E90FF'
                            }
                        }
                    },
                })
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
                    data: xAxisData
                },
                yAxis: {
                    type: 'value'
                },
                series: seriesData
            };
            myChart.setOption(option, true);
        }
    })
})
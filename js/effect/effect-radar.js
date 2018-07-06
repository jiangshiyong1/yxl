$(function () {
    var address = localStorage.getItem("address")
    var id = window.location.href.split("?")[1]
    $.ajax({
        type: "POST",
        url: address + "select_task_result_score_with_id",
        dataType: "json",
        data: { id: id },
        error: function (msg) {
            layer.msg("出错啦！")
        },
        success: function (data) {
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
                // legend: {
                //     data: ['细粒度影响力指数'],
                //     textStyle: {
                //         color: 'white'
                //     }
                // },
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
                            value: [data[0].propagation_score, data[0].authority_score, data[0].richness_score, data[0].praise_score, data[0].prominence_score],
                        }
                    ]
                }]
            };
            myChart.setOption(option, true);
        }
    })
})
$(function () {
    var address = localStorage.getItem("address")
    var id = window.location.href.split("?")[1]
    $.ajax({
        type: "POST",
        url: address + "select_tendentiousness",
        dataType: "json",
        data: { task_id: id },
        success: function (data) {
            var arr = []
            for (var i in data) {
                if (data[i].tendentiousness === 0) {
                    arr.push({
                        value: data[i].count,
                        name: '正面'
                    })
                } else if (data[i].tendentiousness === 1) {
                    arr.push({
                        value: data[i].count,
                        name: '中性'
                    })
                } else if (data[i].tendentiousness === 2) {
                    arr.push({
                        value: data[i].count,
                        name: '负面'
                    })
                }
            }
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('pie'));
            option = {
                title: {
                    text: '评论倾向分布',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 20,
                    bottom: 20,
                    data: data.legendData,

                    selected: data.selected
                },
                series: [
                    {
                        name: '倾向性',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '55%'],
                        data: arr.sort(function (a, b) { return a.value - b.value; }),
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option, true);
        }
    })
})
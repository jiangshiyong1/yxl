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
                } else {
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
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [
                    {
                        name: '评论倾向分布',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: arr.sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            };
            myChart.setOption(option, true);
        }
    })
})
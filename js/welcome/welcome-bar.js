$(function () {
    layui.use('layer', function () { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        var address = localStorage.getItem('address')
        $.ajax({
            type: "POST",
            url: address + "select_task_info",
            dataType: "json",
            error: function (msg) {
                layer.msg("出错啦！")
            },
            success: function (data) {
                var xAxisData = []
                var seriesData = []
                for (var i in data) {
                    xAxisData[i] = data[i].task_location
                    seriesData[i] = data[i].count
                }
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('mainBar'));
                // 指定图表的配置项和数据
                var option = {
                    backgroundColor: ['#2B2B2B'],
                    textStyle: {
                        color: 'white'
                    },
                    title: {
                        text: '五省稿件数量分布',
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
                    xAxis: [
                        {
                            type: 'category',
                            data: xAxisData,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '五省稿件数量分布',
                            type: 'bar',
                            barWidth: '20%',
                            data: seriesData,
                            //配置样式
                            itemStyle: {
                                //通常情况下：
                                normal: {
                                    //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                    color: function (params) {
                                        var colorList = ['#00FFFF', '#1E90FF', '#00FFFF', '#1E90FF', '#00FFFF'];
                                        return colorList[params.dataIndex];
                                    }
                                }
                            }
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        })
    });

})
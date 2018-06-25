$(function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('mainBar'));
    // 指定图表的配置项和数据
    var option = {
        backgroundColor: ['#2B2B2B'],
        textStyle: {
            color: 'white'
        },
        title:{
            text:'五省稿件数量分布',
            x:'center',
            y:'top',
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
                data: ['甘肃', '西藏', '青海', '四川', '云南'],
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
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [52, 200, 334, 390, 330],
                //配置样式
                itemStyle: {
                    //通常情况下：
                    normal: {
                        //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                        color: function (params) {
                            var colorList = ['#00FFFF', '#1E90FF','#00FFFF', '#1E90FF','#00FFFF'];
                            return colorList[params.dataIndex];
                        }
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
})
$(function () {
    layui.use(['layer', 'carousel'], function () { //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        var carousel = layui.carousel;
        var address = localStorage.getItem('address')
        // 查询5个id
        $.ajax({
            type: "POST",
            url: address + "select_top5",
            dataType: "json",
            error: function (msg) {
                layer.msg("出错啦！")
            },
            success: function (data) {
                var count = 0
                for (var i in data) {
                    $('#rootCarousel').append('<div style="width: 100%;height:300px;" id="mainLine'+i+'"></div>')
                    $.ajax({
                        type: "POST",
                        url: address + "select_task_with_id",
                        data: { id: data[i].task_id },
                        dataType: "json",
                        error: function (msg) {
                            layer.msg("出错啦！")
                        },
                        success: function (res) {
                            var title = ''
                            var firstLine = []
                            var secondLine = []
                            var seriesData = []
                            var xAxisData = []
                            for (var j in res) {
                                title = res[j].task_title
                                firstLine[j] = res[j].forward_number
                                secondLine[j] = res[j].comment_number
                                xAxisData[j] = res[j].execution_time
                            }
                            // 轮播
                            var ins3 = carousel.render({
                                elem: '#carousel'
                                , width: '100%' //设置容器宽度
                                , arrow: 'always' //始终显示箭头
                            })
                            seriesData.push({
                                data: firstLine,
                                type: 'line',
                                smooth: true,
                                name: '转发数'
                            }, {
                                    data: secondLine,
                                    type: 'line',
                                    smooth: true,
                                    name: '评论数'
                                })
                            // 将第一dom的宽度赋给其它的dom，已解决echart图width为100的问题
                            var o = document.getElementById("mainLine0");
                            var dom = document.getElementById('mainLine' + count);
                            dom.style.width = o.offsetWidth + 'px';
                            // 基于准备好的dom，初始化echarts实例
                            var myChart = echarts.init(dom);
                            count++
                            // 指定图表的配置项和数据
                            var option = {
                                backgroundColor: ['#2B2B2B'],
                                textStyle: {
                                    color: 'white'
                                },
                                title: {
                                    text: '高影响力TOP5稿件热度走势',
                                    subtext: title,
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
                                xAxis: {
                                    type: 'category',
                                    data: xAxisData
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                series: seriesData
                            };
                            // 使用刚指定的配置项和数据显示图表。
                            myChart.setOption(option);
                            myChart.resize()
                        }
                    })
                }
            }
        })
    })
})
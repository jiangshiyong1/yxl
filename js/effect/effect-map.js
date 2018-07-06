$(function () {
    var address = localStorage.getItem("address")
    var id = window.location.href.split("?")[1]
    $.ajax({
        type: "POST",
        url: address + "select_media_location",
        dataType: "json",
        data: { task_id: id },
        success: function (data) {
            var arr = []
            for (let i in data) {
                arr.push({
                    name: data[i].home_location,
                    value: data[i].count,
                    tipData: 3
                })
            }
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('map'));
            option = {
                visualMap: {
                    min: 0,
                    max: 1000,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'],
                    calculable: false,
                    orient: 'horizontal',
                    inRange: {
                        color: ['#e0ffff', '#006edd'],
                        symbolSize: [30, 100]
                    },
                    textStyle: {
                        color: 'white'
                    }
                },
                tooltip: {
                    padding: 0,
                    enterable: true,
                    transitionDuration: 1,
                    textStyle: {
                        color: '#fff',
                        decoration: 'none',
                    },
                    // position: function (point, params, dom, rect, size) {
                    //   return [point[0], point[1]];
                    // },
                },
                series: [{
                    name: '信源数',
                    type: 'map',
                    mapType: 'china',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    data: arr
                },]
            }
            myChart.setOption(option, true);
            var count = 0;
            var timeTicket = null;
            var dataLength = option.series[0].data.length;
            timeTicket && clearInterval(timeTicket);
            timeTicket = setInterval(function () {
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                });
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: (count) % dataLength
                });
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: (count) % dataLength
                });
                count++;
            }, 1000);

            myChart.on('mouseover', function (params) {
                console.log(params)
                clearInterval(timeTicket);
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0
                });
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: params.dataIndex
                });
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: params.dataIndex,
                });
            });
            myChart.on('mouseout', function (params) {
                timeTicket && clearInterval(timeTicket);
                timeTicket = setInterval(function () {
                    myChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                    });
                    myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: (count) % dataLength
                    });
                    myChart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: (count) % dataLength
                    });
                    count++;
                }, 1000);
            });
        }
    })
})
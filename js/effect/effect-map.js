$(function () {
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
            name: 'iphone4',
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
            data: [{
                name: '北京',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '天津',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '上海',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '重庆',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '河北',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '河南',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '云南',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '辽宁',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '黑龙江',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '湖南',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '安徽',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '山东',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '新疆',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '江苏',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '浙江',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '江西',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '湖北',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '广西',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '甘肃',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '山西',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '内蒙古',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '陕西',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '吉林',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '福建',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '贵州',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '广东',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '青海',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '西藏',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '四川',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '宁夏',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '海南',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '台湾',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '香港',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            {
                name: '澳门',
                value: Math.round(Math.random() * 1000),
                tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)]
            },
            ]
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
})
$(function () {
    // 进度条
    layui.use('element', function () {
        var $ = layui.jquery
            , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

    });
    layui.use('carousel', function () {
        var carousel = layui.carousel;
        //建造实例
        carousel.render({
            elem: '#carousel'
            , width: '100%' //设置容器宽度
            , arrow: 'always' //始终显示箭头
            //,anim: 'updown' //切换动画方式
        });
    });
    layui.use('laydate', function () {
        var laydate = layui.laydate
        var ip = localStorage.getItem('address')
        var obj = {
            time_range: 30,
            news_type: "",
            media_location: ""
        }
        var address = ip + "select_task_today"
        loadTable(address, obj)
        $('#day-4').addClass("btn-focus")
        $('#class-1').addClass("btn-focus")
        $('#address-1').addClass("btn-focus")
        $("button[id^='day-']").click(function (event) {
            var day = event.currentTarget.value
            $("button[id^='day-']").removeClass("btn-focus")
            $('#' + event.currentTarget.id).addClass("btn-focus")
            if (day === "more") {
                laydate.render({
                    elem: '#date'
                    , range: true
                    , done: function (value, date) {
                        var arr = value.split(' - ')
                        obj.start_time = arr[0]
                        obj.end_time = arr[1]
                        address = ip + "select_with_define"
                        delete obj.time_range
                        loadTable(address, obj)
                    }
                });
                $("#moreDay").show()
                console.log(obj)
            } else {
                obj.time_range = day
                delete obj.start_time
                delete obj.end_time
                address = ip + "select_task_today"
                $("#moreDay").hide()
                loadTable(address, obj)
            }
        })
        $("button[id^='class-']").click(function (event) {
            var classB = event.currentTarget.value
            obj.news_type = classB
            $("button[id^='class-']").removeClass("btn-focus")
            $('#' + event.currentTarget.id).addClass("btn-focus")
            if (classB === 'more') {
                $("#moreClass").show()
                $("button[id^='moreClass-']").click(function (event) {
                    obj.news_type = event.currentTarget.value
                    $("button[id^='moreClass-']").removeClass("btn-focus")
                    $('#' + event.currentTarget.id).addClass("btn-focus")
                    loadTable(address, obj)
                })
            } else {
                $("#moreClass").hide()
                $("button[id^='moreClass-']").removeClass("btn-focus")
                loadTable(address, obj)
            }
        })
        $("button[id^='address-']").click(function (event) {
            var location = event.currentTarget.value
            obj.media_location = location
            $("button[id^='address-']").removeClass("btn-focus")
            $('#' + event.currentTarget.id).addClass("btn-focus")
            if (location === 'more') {
                layui.use('form', function () {
                    var form = layui.form
                    form.on('select(province)', function (data) {
                        obj.media_location = data.value
                        loadTable(address, obj)
                    });
                })
                $("#moreAddress").show()
            } else {
                $("#moreAddress").hide()
                loadTable(address, obj)
            }
        })
    })
})
function loadTable(url, obj) {
    layui.use('table', function () {
        var table = layui.table;
        $.ajax({
            type: "POST",
            url: url,
            data: obj,
            dataType: "json",
            error: function (msg) {
                layer.msg("出错啦！")
            },
            success: function (res) {
                for (var i in res) {
                    res[i].ranking = parseInt(i) + 1
                }
                table.render({
                    elem: '#indexTable'
                    // , url: './json/table.json'
                    , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , cols: [[
                        { field: 'ranking', width: 80, title: '排名' }
                        , { field: 'task_title', width: '20%', minWidth: 100, title: '文章标题' }
                        , { field: 'task_location', width: 80, title: '省份' }
                        , { field: 'task_add_time', width: '10%', minWidth: 100, title: '时间' }
                        , { field: 'influence_score', title: '影响力指数', width: '20%', minWidth: 100, templet: '#progress', unresize: false } //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
                        , { field: 'propagation_score', title: '传播度' }
                        , { field: 'prominence_score', title: '显著度' }
                        , { field: 'praise_score', title: '好评度' }
                        , { field: 'authority_score', title: '权威度' }
                        , { field: 'richness_score', title: '丰富度' }
                    ]]
                    , data: res
                    , done: function (res, curr, count) {
                        $('.layui-table-body').find("table").find("tbody").children("tr").on('dblclick', function (event) {
                            var id = JSON.stringify($('.layui-table-body').find("table").find("tbody").find(".layui-table-hover").data('index'));
                            var obj = res.data[id];
                            parent.showPage("./effect.html?" + obj.id)
                        })
                    }
                });
                // 进度条赋值
                setTimeout(function () {
                    for (var i in res) {
                        $('#' + res[i].id).css('width', res[i].influence_score + '%')
                        $('#' + res[i].id).append('<span class="layui-progress-text">' + res[i].influence_score + '%</span>')
                    }
                }, 300)
            }
        });
    });
}
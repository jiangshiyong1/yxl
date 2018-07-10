$(function () {
    layui.use(['laydate', 'laypage'], function () {
        var laydate = layui.laydate,
            laypage = layui.laypage
        var ip = localStorage.getItem('address')
        var obj = {
            time_range: 0,
            news_type: "",
            media_location: "",
            task_title: '',
            task_location: '',
            offset_value: 1
        }
        var address = ip + "select_task_for_management"
        var pageUrl = ip + "page_task_for_management"
        loadTable(address, obj, pageUrl)
        $('#day-1').addClass("btn-focus")
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
                        address = ip + "select_task_for_management_with_definetime"
                        pageUrl = ip + "page_task_for_management_with_definetime"
                        delete obj.time_range
                        loadTable(address, obj, pageUrl)
                    }
                });
                $("#moreDay").show()
                console.log(obj)
            } else {
                obj.time_range = day
                delete obj.start_time
                delete obj.end_time
                address = ip + "select_task_for_management"
                pageUrl = ip + "page_task_for_management"
                $("#moreDay").hide()
                loadTable(address, obj, pageUrl)
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
                    loadTable(address, obj, pageUrl)
                })
            } else {
                $("#moreClass").hide()
                $("button[id^='moreClass-']").removeClass("btn-focus")
                loadTable(address, obj, pageUrl)
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
                        loadTable(address, obj, pageUrl)
                    });
                })
                $("#moreAddress").show()
            } else {
                $("#moreAddress").hide()
                loadTable(address, obj, pageUrl)
            }
        })

    })
})
function copyObj(obj) {
    let res = {}
    for (var key in obj) {
        res[key] = obj[key]
    }
    return res
}
function loadTable(url, obj, pageUrl, page) {
    layui.use(['table', 'laypage'], function () {
        var laypage = layui.laypage
        var pageObj = copyObj(obj)
        delete pageObj.task_location
        delete pageObj.offset_value
        $.ajax({
            type: "POST",
            url: pageUrl,
            data: pageObj,
            dataType: "json",
            error: function (msg) {
                layer.msg("出错啦！")
            },
            success: function (pageObj) {
                laypage.render({
                    elem: 'page'
                    , count: pageObj[0].total
                    , curr: 1
                    , limit: 10
                    , theme: '#1E9FFF'
                    , jump: function (res, first) {
                        if (!first) {
                            if (obj === undefined) return
                            obj.offset_value = res.curr
                        }
                        loadData(url, obj, pageUrl);
                    }
                })
            }
        })
    })
}
function loadData(url, obj, pageUrl) {
    layui.use(['table', 'laypage'], function () {
        var table = layui.table
        var laypage = layui.laypage
        $.ajax({
            type: "POST",
            url: url,
            data: obj,
            dataType: "json",
            error: function (msg) {
                layer.msg("出错啦！")
            },
            success: function (res) {
                table.render({
                    elem: '#taskTable'
                    , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                    , cols: [[
                        { type: 'checkbox' }
                        , { field: 'task_title', title: '文章标题' }
                        , { field: 'media', title: '网站' }
                        , { field: 'task_url', title: 'URL' }
                        , { field: 'task_add_time', title: '录入时间' } //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
                        , { field: 'username', title: '录入人' }
                        , { field: '操作', templet: '#barBtn', unresize: false, title: '操作' }
                    ]]
                    , data: res
                });
            }
        })
    })
}
$(function () {
    layui.use(['laypage', 'layer', 'table', 'laydate', 'form'], function () {
        var laypage = layui.laypage
            , layer = layui.layer
            , table = layui.table
            , laydate = layui.laydate
            , form = layui.form
        var address = localStorage.getItem('address')
        var url = address + "select_operator_log_management"
        var pageUrl = address + "page_operator_log_management"
        // 角色列表
        $.ajax({
            type: "POST",
            url: address + 'select_user_info',
            data: {
                user_name: '',
                role_id: 0,
                home_location: '',
                offset_value: 0
            },
            dataType: "json",
            error: function (msg) {
                // layer.msg("出错啦！")
            },
            success: function (res) {
                var select = document.getElementById("user")
                select.options.add(new Option('--请选择--', 0));
                for (var i = 1; i < res.length; i++) {
                    select.options.add(new Option(res[i].user_name, res[i].id));
                }
                form.render('select');
            }
        })
        var obj = {
            start_time: getNowFormatDate(),
            end_time: getNowFormatDate(),
            operator_entity: 'task',
            user_id: 0,
            offset_value: 1
        }
        loadTable(url, obj, pageUrl)
        // 检索
        form.on('select(user)', function (data) {
            obj.user_id = data.value
            loadTable(url, obj, pageUrl)
        })
        form.on('select(operator)', function (data) {
            obj.operator_entity = data.value
            loadTable(url, obj, pageUrl)
        })
        laydate.render({
            elem: '#date'
            , type: 'datetime'
            , range: true
            , done: function (value, date, endDate) {
                obj.start_time = value.split(" - ")[0]
                obj.end_time = value.split(" - ")[1]
                if (obj.start_tim === undefined) {
                    obj.start_time =  getNowFormatDate()
                    obj.end_time = getNowFormatDate()
                }
                loadTable(url, obj, pageUrl)
            }
        });
    });
})
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}
function loadTable(url, obj, pageUrl) {
    layui.use(['table', 'laypage', 'form'], function () {
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
                        loadData(url, obj);
                    }
                })
            }
        })
    })
}
function loadData(url, obj) {
    layui.use(['table', 'laypage', 'form'], function () {
        var table = layui.table
        var laypage = layui.laypage,
            form = layui.form
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
                        { field: 'id', title: '序号' }
                        , { field: 'operator_entity', title: '操作模块' }
                        , { field: 'description', title: '操作事项' }
                        , { field: 'username', title: '操作人' }
                        , { field: 'operator_time', title: '操作时间' }
                        , { field: 'ip', title: '登录IP' }
                    ]]
                    , data: res
                });
            }
        })
    })
}

$(function () {
    var address = localStorage.getItem("address")
    var id = window.location.href.split("?")[1]
    $.ajax({
        type: "POST",
        url: address + "select_influence_score_three_days",
        dataType: "json",
        data: { id: id },
        error: function (msg) {
            layer.msg("出错啦！")
        },
        success: function (data) {
            $("#appendProgress").empty()
            for (var i in data) {
                var index = parseInt(i) + 1
                var node = '<div class="progress-title" style="padding-bottom:3px;">' +
                    '<span> ' + index + '.' + data[i].task_title + '</span></div >' +
                    '<div class="layui-progress layui-progress-big" lay-showPercent="yes">' +
                    '<div class="layui-progress-bar layui-bg-green" lay-percent="' + data[i].influence_score + '%"></div>' +
                    '</div>'
                $("#appendProgress").append(node)
            }
        }
    })
})
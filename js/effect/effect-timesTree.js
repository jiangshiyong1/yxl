$(function () {
    var address = localStorage.getItem("address")
    var id = window.location.href.split("?")[1]
    $.ajax({
        type: "POST",
        url: address + "select_media_trace",
        dataType: "json",
        data: { id: id },
        success: function (data) {
            for (var i in data) {
                var node = '<li class="layui-timeline-item">' +
                    '<i class="layui-icon layui-timeline-axis"></i> ' +
                    '<div class="layui-timeline-content layui-text">' +
                    '<h3 class="layui-timeline-title">' + data[i].news_publich_time + '</h3>' +
                    '<p>' + data[i].news_title + '</p>' +
                    '<p>' + data[i].website + '/影响力指数：' + data[i].influence_score + '</p>' +
                    '</div>' +
                    '</li > '
                $("#treeRoot").append(node)
            }
            $("#treeRoot").append('<li class="layui-timeline-item">' +
                '<i class="layui-icon layui-timeline-axis"></i>' +
                '<div class="layui-timeline-content layui-text">' +
                '<div class="layui-timeline-title">' +
                '<h3 class="layui-timeline-title">过去</h3>' +
                '</div>' +
                '</div>' +
                '</li>'
            )
        }
    })
})
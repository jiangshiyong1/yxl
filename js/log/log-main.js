$(function () {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#taskTable'
            , url: './json/log.json'
            , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            , cols: [[
                 { field: 'id', title: '序号' }
                , { field: 'model', title: '操作模块' }
                , { field: 'items',  title: '操作事项' }
                , { field: 'person',  title: '操作人' }
                , { field: 'times',  title: '操作时间' }
                , { field: 'ip', title: '登录IP' }
            ]]
        });
    });
    layui.use(['laypage', 'layer'], function () {
        var laypage = layui.laypage
            , layer = layui.layer;

        //总页数低于页码总数
        laypage.render({
            elem: 'page'
            , count: 50 //数据总数
            ,theme: '#1E9FFF'
        });
    });
})
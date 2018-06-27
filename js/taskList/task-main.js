$(function () {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#taskTable'
            , url: './json/task.json'
            , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            , cols: [[
                {type:'checkbox'}
                , { field: 'title', title: '文章标题' }
                , { field: 'website', title: '网站' }
                , { field: 'url',  title: 'URL' }
                , { field: 'times', title: '录入时间'} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
                , { field: 'person', title: '录入人' }
                , { field: '操作', templet: '#barBtn', unresize: false, title: '操作' }
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
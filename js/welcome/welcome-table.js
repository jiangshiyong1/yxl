$(function () {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#indexTable'
            , url: './json/table.json'
            , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            , cols: [[
                { field: 'ranking', width: 80, title: '排名' }
                , { field: 'title', width: '20%', minWidth: 100, title: '文章标题' }
                , { field: 'province', width: 80, title: '省份' }
                , { field: 'times', width: '10%', minWidth: 100, title: '时间' }
                , { field: 'effect', title: '影响力指数', width: '20%', minWidth: 100, templet: '#progress', unresize: false } //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
                , { field: 'spread', title: '传播度' }
                , { field: 'remarkable', title: '显著度' }
                , { field: 'praise', title: '好评度' }
                , { field: 'authority', title: '权威度' }
                , { field: 'rich', title: '丰富度' }

            ]]
        });
    });
})
$(function () {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#indexTable', cellMinWidth: 400, cols: [
                [
                {type:'checkbox'},
            {field:'tool',  title: '服务器资源'}
            ,{field:'web',  title: '支付手段'}
            ,{field:'introduce',  title: '联系方式'}
            ,{field:'experience', title: '操作',align:'center', toolbar: '#barDemo' }
                ]
            ]
            ,data: [{
            "tool": "服务器资源1，服务器资源2，服务器资源3",
            "web": "支付宝，微信，银联。。。",
            "introduce": "13000000000"
        },
        {
            "tool": "服务器资源1，服务器资源2，服务器资源3",
            "web": "支付宝，微信，银联。。。",
            "introduce": "13000000000"
        },
        {
            "tool": "服务器资源1，服务器资源2，服务器资源3",
            "web": "支付宝，微信，银联。。。",
            "introduce": "13000000000"
        }]
        ,page: false
        });
    });
})
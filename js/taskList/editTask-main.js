$(function () {
    var address = localStorage.getItem('address')
    var data = unescape(window.location.href).split("?")[1]
    $('#closeWindow').click(function () {
        var index = parent.layer.getFrameIndex(window.name);
        //关闭当前frame
        parent.layer.close(index);
    })
    layui.use(['form', 'layer', 'laydate'], function () {
        $ = layui.jquery;
        var form = layui.form
            , layer = layui.layer
            , laydate = layui.laydate
        if (!!data) {
            form.val('myForm', JSON.parse(data))
        }
        //监听提交
        form.on('submit(edit)', function (data) {
            var obj = data.field
            obj.user_id = localStorage.getItem('user_id')
            obj.username = localStorage.getItem('username')
            obj.task_location = localStorage.getItem('task_location')
            $.ajax({
                type: "POST",
                url: address + 'update_task_info_with_id',
                data: obj,
                dataType: "json",
                error: function (msg) {
                    layer.msg("出错啦！")
                },
                success: function (res) {
                    if (res === 1) {
                        layer.alert("修改成功", { icon: 6 }, function () {
                            // 获得frame索引
                            var index = parent.layer.getFrameIndex(window.name);
                            //关闭当前frame
                            var obj = {
                                'description': '修改了id为' + data.field.id + '的任务',
                                'operator_entity' : 'task',
                                'unique_id': 26,
                                'operator_type': 'update',
                            }
                            insertLog(obj)
                            parent.layer.close(index);
                            parent.location.reload();
                        });
                    } else {
                        layer.msg("出错啦！")
                    }
                }
            })
            return false;
        });
    });
})
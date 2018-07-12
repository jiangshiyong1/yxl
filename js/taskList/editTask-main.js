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
        //自定义验证规则
        form.verify({
            limitString: function (value) {
                if (value.length < 2) {
                    return '至少2个字符';
                }
            }
            , pass: [/(.+){6,12}$/, '密码必须6到12位']
            , repass: function (value) {
                if ($('#pass').val() != $('#repass').val()) {
                    return '两次密码不一致';
                }
            }
        });

        //监听提交
        form.on('submit(add)', function (data) {
            var obj = data.field
            for (var i in roleObj) {
                if (obj.role_name === roleObj[i].role_name) {
                    obj.role_id = roleObj[i].id
                }
            }
            if (obj.is_using === 'on') {
                obj.is_using = 1
            } else {
                obj.is_using = 0
            }
            $.ajax({
                type: "POST",
                url: address + 'update_user_info_with_id',
                data: obj,
                dataType: "json",
                error: function (msg) {
                    layer.msg("出错啦！")
                },
                success: function (res) {
                    layer.alert("修改成功", { icon: 6 }, function () {
                        // 获得frame索引
                        var index = parent.layer.getFrameIndex(window.name);
                        //关闭当前frame
                        parent.layer.close(index);
                        parent.location.reload();
                    });
                }
            })
            return false;
        });
    });
})
$(function () {
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
        //日期
        laydate.render({
            elem: '#date'
        });
        laydate.render({
            elem: '#date1'
        });
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
        var role_id = ''
        form.on('select(newRoles)', function (data) {
            role_id = data.elem[data.elem.selectedIndex].id;
        })
        var is_using = 0
        //监听指定开关
        form.on('switch(is_using)', function (data) {
            if (this.checked) {
                is_using = 1
            }
        });
        //监听提交
        form.on('submit(add)', function (data) {
            var address = localStorage.getItem('address')
            var obj = data.field
            obj.is_using = is_using
            obj.role_id = role_id
            $.ajax({
                type: "POST",
                url: address + 'insert_user_info',
                data: obj,
                dataType: "json",
                error: function (msg) {
                    // layer.msg("出错啦！")
                },
                success: function (res) {
                    layer.alert("增加成功", { icon: 6 }, function () {
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
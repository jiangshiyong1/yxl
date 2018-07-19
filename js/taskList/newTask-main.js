$(function () {
    $('#day-1').addClass("btn-focus")
    $('#entry-1').addClass("btn-focus")
    $("button[id^='day-']").click(function (event) {
        $("button[id^='day-']").removeClass("btn-focus")
        $('#' + event.currentTarget.id).addClass("btn-focus")
    })
    $("button[id^='entry-']").click(function (event) {
        $("button[id^='entry-']").removeClass("btn-focus")
        $('#' + event.currentTarget.id).addClass("btn-focus")
    })
    $('#urlTask').hide()
    layui.use(['form', 'layer', 'laydate'], function () {
        $ = layui.jquery;
        var form = layui.form
            , layer = layui.layer
            , laydate = layui.laydate
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
        form.on('radio(erweima)', function (data) {
            if (data.value === '0') {
                $('#urlTask').hide()
                $('#keywordsTask').show()
            } else {
                $('#urlTask').show()
                $('#keywordsTask').hide()
            }
        });
        //监听提交
        form.on('submit(urlAdd)', function (data) {
            var obj = {
                "_source": [
                    "field_type",
                    "pt",
                    "url",
                    "title",
                    "cont",
                    "i_sn",
                    "i_bn",
                    "loc"
                ],
                "query": {
                    "bool": {
                        "must": [
                            {
                                "term": {
                                    "url": data.field.url
                                }
                            }
                        ]
                    }
                }
            }
            parent.parent.showPage("./confirmTask.html?" + escape(JSON.stringify(obj)))
            return false;
        });
    });
})
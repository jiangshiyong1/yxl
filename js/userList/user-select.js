$(function () {
    var address = localStorage.getItem('address')
    // 角色列表
    $.ajax({
        type: "POST",
        url: address + 'select_role_info',
        dataType: "json",
        error: function (msg) {
            // layer.msg("出错啦！")
        },
        success: function (res) {
            $("#roles").empty()
            $("#roles").append('<option value="0">--请选择--</option>')
            for (var i in res) {
                $("#roles").append('<option value='+res[i].id+'>'+res[i].role_name+'</option>')
            }
            $("#newRoles").empty()
            $("#newRoles").append('<option value="">--请选择--</option>')
            for (var i in res) {
                $("#newRoles").append('<option id='+res[i].id+' value='+res[i].role_name+'>'+res[i].role_name+'</option>')
            }
        }
    })
})
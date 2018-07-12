$(function () {
  layui.use(['form', 'laypage', 'layer', 'layedit', 'laydate'], function () {
    var laypage = layui.laypage
      , form = layui.form
      , layer = layui.layer
      , layedit = layui.layedit
      , laydate = layui.laydate;
    var url = localStorage.getItem('address') + "select_user_info"
    var pageUrl = localStorage.getItem('address') + "page_user_info"
    var obj = {
      user_name: "",
      role_id: 0,
      home_location: "",
      offset_value: 1
    }
    loadTable(url, obj, pageUrl)
    // 检索
    form.on('select(roles)', function (data) {
      obj.role_id = data.value
      loadTable(url, obj, pageUrl)
    })
    form.on('select(location)', function (data) {
      obj.home_location = data.value
      loadTable(url, obj, pageUrl)
    })
    $("#userName").bind('input propertychange', function (data) {
      obj.user_name = $("#userName").val()
      loadTable(url, obj, pageUrl)
    });
    //总页数低于页码总数
    laypage.render({
      elem: 'page'
      , count: 50 //数据总数
      , theme: '#1E9FFF'
    });
  });
})
function copyObj(obj) {
  let res = {}
  for (var key in obj) {
    res[key] = obj[key]
  }
  return res
}
function loadTable(url, obj, pageUrl) {
  layui.use(['table', 'laypage', 'form'], function () {
    var laypage = layui.laypage
    var pageObj = copyObj(obj)
    delete pageObj.task_location
    delete pageObj.offset_value
    $.ajax({
      type: "POST",
      url: pageUrl,
      data: pageObj,
      dataType: "json",
      error: function (msg) {
        layer.msg("出错啦！")
      },
      success: function (pageObj) {
        laypage.render({
          elem: 'page'
          , count: pageObj[0].total
          , curr: 1
          , limit: 10
          , theme: '#1E9FFF'
          , jump: function (res, first) {
            if (!first) {
              if (obj === undefined) return
              obj.offset_value = res.curr
            }
            loadData(url, obj);
          }
        })
      }
    })
  })
}
function loadData(url, obj) {
  layui.use(['table', 'laypage', 'form'], function () {
    var table = layui.table
    var laypage = layui.laypage,
      form = layui.form
    $.ajax({
      type: "POST",
      url: url,
      data: obj,
      dataType: "json",
      error: function (msg) {
        layer.msg("出错啦！")
      },
      success: function (res) {
        table.render({
          elem: '#taskTable'
          , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
          , cols: [[
            { field: 'id', title: '序号' }
            , { field: 'user_name', title: '用户名' }
            , { field: 'role_name', title: '用户角色' }
            , { field: 'is_using', title: '账号状态', templet: '#switchTp', unresize: false, } //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
            , { field: 'expirydate', title: '账号到期时间' }
            , { field: '操作', templet: '#barBtn', unresize: false, title: '操作' }
          ]]
          , data: res
        });
      }
    })
    //监听工具条
    table.on('tool(demo)', function (obj) {
      var data = obj.data;
      if (obj.event === 'detail') {
        layer.msg('ID：' + data.id + ' 的查看操作');
      } else if (obj.event === 'del') {
        layer.confirm('真的删除行么', function (index) {
          $.ajax({
            type: "POST",
            url: localStorage.getItem('address') + 'delete_user_info_with_id',
            data: {id: data.id},
            dataType: "json",
            error: function (msg) {
              layer.msg("出错啦！")
            },
            success: function (res) {
              location.reload()
            }
          })
          layer.close(index);
        });
      } else if (obj.event === 'edit') {
        x_admin_show('编辑用户', 'editUser.html?' + escape(JSON.stringify(data)), 700, 400)
      }
    });
  })
}
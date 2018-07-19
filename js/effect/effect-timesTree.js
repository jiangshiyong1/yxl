var treeData = []
var id = ''
var address = ''
$(function () {
    address = localStorage.getItem("address")
    id = window.location.href.split("?")[1]
    initRequest()
})
function edit(element, index, flag) {
    console.log(treeData)
    var oldhtml = element.innerHTML;
    //如果已经双击过，内容已经存在input，不做任何操作
    if (oldhtml.indexOf('type="text"') > 0) {
        return;
    }
    //创建新的input元素
    var newobj = document.createElement('input');
    //为新增元素添加类型
    newobj.type = 'text';
    //为新增元素添加value值
    newobj.value = oldhtml;
    newobj.style.color = "#fff"
    //为新增元素添加光标离开事件
    newobj.onblur = function () {
        //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值 
        // element.innerHTML = this.value == oldhtml ? oldhtml : this.value;
        if (this.value != oldhtml) {
            var obj = {}
            if (flag === 0) {
                obj = {
                    news_title: treeData[index].news_title,
                    news_publich_time: this.value,
                    id: treeData[index].id
                }
            } else if (flag === 1) {
                obj = {
                    news_title: this.value,
                    news_publich_time: treeData[index].news_publich_time,
                    id: treeData[index].id
                }
            }
            sendRequest(obj)
        } else {
            element.innerHTML = oldhtml
        }
    }
    //设置该标签的子节点为空
    element.innerHTML = '';
    //添加该标签的子节点，input对象
    element.appendChild(newobj);
    //设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
    newobj.setSelectionRange(0, oldhtml.length);
    //设置获得光标
    newobj.focus();
}
function initRequest() {
    $.ajax({
        type: "POST",
        url: address + "select_media_trace",
        dataType: "json",
        data: { id: id },
        success: function (data) {
            treeData = data
            initTree(data)
        }
    })
}
function initTree(data) {
    $("#treeRoot").empty()
    for (var i in data) {
        var node = '<li class="layui-timeline-item">' +
            '<i class="layui-icon layui-timeline-axis"></i> ' +
            '<div class="layui-timeline-content layui-text">' +
            '<h3 ondblclick="edit(this,' + i + ', 0)" id="editTitle-' + i + '" class="layui-timeline-title">' + data[i].news_publich_time + '</h3>' +
            '<button onclick="del(' + i + ')" style="float:right;margin-right:20px;" class="layui-btn layui-btn-danger layui-btn-sm"><i class="layui-icon">&#xe640;</i></button>' +
            '<p ondblclick="edit(this,' + i + ', 1)">' + data[i].news_title + '</p>' +
            '<p>' + data[i].website + '/影响力指数：' + data[i].influence_score + '</p>' +
            '</div>' +
            '</li > '
        $("#treeRoot").append(node)
    }
    $("#treeRoot").append('<li class="layui-timeline-item">' +
        '<i class="layui-icon layui-timeline-axis"></i>' +
        '<div class="layui-timeline-content layui-text">' +
        '<div class="layui-timeline-title">' +
        '<h3 class="layui-timeline-title">过去</h3>' +
        '</div>' +
        '</div>' +
        '</li>'
    )
}
function sendRequest(obj) {
    $.ajax({
        type: "POST",
        url: address + "update_media_trace",
        dataType: "json",
        data: obj,
        success: function (data) {
            if (data === 1) {
                initRequest()
            }
        }
    })
}
function add() {
    x_admin_show('新增时间轨迹', 'newTree.html?' + id, 700, 400)
}
function del(index) {
    $.ajax({
        type: "POST",
        url: address + "delete_media_trace",
        dataType: "json",
        data: { id: treeData[index].id },
        success: function (data) {
            initRequest()
        }
    })
}
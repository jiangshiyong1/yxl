$(function () {
    layui.use('table', function () {
        var table = layui.table;
        table.render({
            elem: '#taskTable'
            , url: './json/user.json'
            , cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
            , cols: [[
                 { field: 'id', title: '序号' }
                , { field: 'username', title: '用户名' }
                , { field: 'roles',  title: '用户角色' }
                , { field: 'status', title: '账号状态',templet: '#switchTp', unresize: false,} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
                , { field: 'times', title: '账号到期时间' }
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
    layui.use(['form', 'layedit', 'laydate'], function(){
        var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate;
        
        //日期
        laydate.render({
          elem: '#date'
        });
        laydate.render({
          elem: '#date1'
        });
        
        //创建一个编辑器
        var editIndex = layedit.build('LAY_demo_editor');
       
        //自定义验证规则
        form.verify({
          title: function(value){
            if(value.length < 5){
              return '标题至少得5个字符啊';
            }
          }
          ,pass: [/(.+){6,12}$/, '密码必须6到12位']
          ,content: function(value){
            layedit.sync(editIndex);
          }
        });
        
        //监听指定开关
        form.on('switch(switchTest)', function(data){
          layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
            offset: '6px'
          });
          layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
        });
        
        //监听提交
        form.on('submit(demo1)', function(data){
          layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
          })
          return false;
        });
       
        //表单初始赋值
        form.val('example', {
          "username": "贤心" // "name": "value"
          ,"password": "123456"
          ,"interest": 1
          ,"like[write]": true //复选框选中状态
          ,"close": true //开关状态
          ,"sex": "女"
          ,"desc": "我爱 layui"
        })
        
        
      });
})
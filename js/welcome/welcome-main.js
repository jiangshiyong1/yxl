$(function(){
    // 进度条
    layui.use('element', function () {
        var $ = layui.jquery
            , element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

    });
    setTimeout(function(){
        $('#1').css('width','90%')
        $('#1').append('<span class="layui-progress-text">90%</span>')
        $('#2').css('width','80%')
        $('#2').append('<span class="layui-progress-text">80%</span>')
        $('#3').css('width','70%')
        $('#3').append('<span class="layui-progress-text">70%</span>')
        $('#4').css('width','60%')
        $('#4').append('<span class="layui-progress-text">60%</span>')
        $('#5').css('width','50%')
        $('#5').append('<span class="layui-progress-text">50%</span>')
        $('#6').css('width','40%')
        $('#6').append('<span class="layui-progress-text">40%</span>')
        $('#7').css('width','30%')
        $('#7').append('<span class="layui-progress-text">30%</span>')
        $('#8').css('width','20%')
        $('#8').append('<span class="layui-progress-text">20%</span>')
    },500)
})
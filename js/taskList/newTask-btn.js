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
})
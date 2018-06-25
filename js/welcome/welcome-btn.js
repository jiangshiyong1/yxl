$(function () {
    $('#day-1').addClass("btn-focus")
    $('#class-1').addClass("btn-focus")
    $('#address-1').addClass("btn-focus")
    $("button[id^='day-']").click(function (event) {
        console.log(event.currentTarget.id)
        $("button[id^='day-']").removeClass("btn-focus")
        $('#' + event.currentTarget.id).addClass("btn-focus")
    })
    $("button[id^='class-']").click(function (event) {
        console.log(event.currentTarget.id)
        $("button[id^='class-']").removeClass("btn-focus")
        $('#' + event.currentTarget.id).addClass("btn-focus")
    })
    $("button[id^='address-']").click(function (event) {
        console.log(event.currentTarget.id)
        $("button[id^='address-']").removeClass("btn-focus")
        $('#' + event.currentTarget.id).addClass("btn-focus")
    })
})

function dayClick (evet) {
    console.log(evet)
}


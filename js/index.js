$(function () {})
function showTaskList () {
    $('#mainPage').empty()
    $('#mainPage').append('<iframe src="./taskList.html" frameborder="0" scrolling="yes" class="x-iframe"></iframe>')
}
function showPage (page) {
    $('#mainPage').empty()
    $('#mainPage').append('<iframe src="./'+ page +'" frameborder="0" scrolling="yes" class="x-iframe"></iframe>')
}
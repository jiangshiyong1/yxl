$(function () {
    $('#query').click(function (){
        showPage('queryList.html?'+escape($('#keywords').val()))
    })
})
function showPage (page) {
    $('#mainPage').empty()
    $('#mainPage').append('<iframe src="./'+ page +'" frameborder="0" scrolling="yes" class="x-iframe"></iframe>')
}
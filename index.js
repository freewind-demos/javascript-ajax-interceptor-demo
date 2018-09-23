const AjaxInterceptor = require('./ajax-interceptor')

AjaxInterceptor.addRequestCallback(function (xhr, args) {
    console.log('request', xhr, args)
})
AjaxInterceptor.addResponseCallback(function (xhr) {
    console.log('response', xhr)
})

AjaxInterceptor.wire()

const $ = window.$

function displayData(data) {
    $('#data').text(JSON.stringify(data, null, 2))
}

$(() => {
    $('#xhr-trigger').click(() => {
        const request = new XMLHttpRequest()
        request.open('POST', '/data.json', true)
        request.onload = function () {
            const data = JSON.parse(request.responseText)
            displayData(data)
        }
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        request.send('username=freewind')
    })

    $('#jquery-ajax-trigger').click(() => {
        $.ajax({
            url: '/data.json',
            method: 'POST',
            data: {
                username: 'freewind'
            },
            success: (data) => {
                displayData(data)
            }
        })
    })
})

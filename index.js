var AjaxInterceptor = require('./ajax-interceptor');

AjaxInterceptor.addRequestCallback(function (xhr, args) {
  console.log('request', xhr, args)
});
AjaxInterceptor.addResponseCallback(function (xhr) {
  console.log('response', xhr)
});

AjaxInterceptor.wire();

var $ = window.$;

function displayData(data) {
  $('#data').text(JSON.stringify(data, null, 2))
}

$(function () {
  $('#xhr-trigger').click(function () {
    var request = new XMLHttpRequest();
    request.open('POST', '/data.json', true);
    request.onload = function () {
      var data = JSON.parse(request.responseText);
      displayData(data)
    };
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send('username=freewind')
  });

  $('#jquery-ajax-trigger').click(function () {
    $.ajax({
      url: '/data.json',
      method: 'POST',
      data: {
        username: 'freewind'
      },
      success: function (data) {
        displayData(data)
      }
    })
  })
});

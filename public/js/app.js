var d = new Date();
var timeH = d.getHours();

$(function() {
    $.get('http://localhost:3000/api/movies')
        .fail(function(jqXHR, textStatus, errorThrown) {
            logAjaxFail(jqXHR, textStatus, errorThrown);
        })
        .done(function(data, textStatus, jqXHR) {
            logAjaxDone(data, textStatus, jqXHR);
            $('.movies-container .movie:first-child').css('background-image', 'url(' + data[0] + ')');
            $('.movies-container .movie:last-child').css('background-image', 'url(' + data[1] + ')');
        });
});

$(function() {
    $.get('http://localhost:3000/api/weather/conditions')
        .fail(function(jqXHR, textStatus, errorThrown) {
            logAjaxFail(jqXHR, textStatus, errorThrown);
        })
        .done(function(data, textStatus, jqXHR) {
            logAjaxDone(data, textStatus, jqXHR);
            $('.weather-degree').text(data.temperature + ' ºC');
            $('.weather-description').text(data.description);
            if (timeH < 7 || timeH > 20) {
                data.icon = 'nt_' + data.icon;
            }
            $('.weather-current img').attr('src', '/images/weather/' + data.icon + '.svg');
        });
});

// Utils
// Logs failed ajax requests
var logAjaxFail = function(jqXHR, textStatus, errorThrown) {
    console.log('jqXHR:');
    console.log(jqXHR);
    console.log('textStatus:');
    console.log(textStatus);
    console.log('errorThrown:');
    console.log(errorThrown);
}

// Logs successful ajax requests
var logAjaxDone = function(data, textStatus, jqXHR) {
    console.log('jqXHR:');
    console.log(jqXHR);
    console.log('textStatus:');
    console.log(textStatus);
    console.log('data:');
    console.log(data);
}

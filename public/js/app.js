var d = new Date();
var timeH = d.getHours();
// var newDate = new Date(Date.now() + 24*60*60*1000);

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
            $('.location').text(data.location);
            $('.weather-degree').text(data.temperature + ' ºC');
            $('.weather-description').text(data.description);
            if (timeH < 7 || timeH > 20) {
                data.icon = 'nt_' + data.icon;
            }
            $('.weather-current img').attr('src', '/images/weather/' + data.icon + '.svg');
        });
});

$(function() {
    $.get('http://localhost:3000/api/weather/forecast')
        .fail(function(jqXHR, textStatus, errorThrown) {
            logAjaxFail(jqXHR, textStatus, errorThrown);
        })
        .done(function(data, textStatus, jqXHR) {
            logAjaxDone(data, textStatus, jqXHR);
            for (var i = 0; i < 4; i++) {
                $('.weather-forecast ul li[data-day="'+i+'"]').find('img').attr('src', '/images/weather/'+data.forecastday[i].icon+'.svg');
                $('.weather-forecast ul li[data-day="'+i+'"]').find('span.hi').text(data.forecastday[i].high.celsius + 'º');
                $('.weather-forecast ul li[data-day="'+i+'"]').find('span.lo').text(data.forecastday[i].low.celsius + 'º');
                $('.weather-forecast ul li[data-day="'+i+'"]').find('p.cond-text').text(data.forecastday[i].conditions);
                $('.weather-forecast ul li[data-day="'+i+'"]').find('div span:last-child').text(' ' + data.forecastday[i].avehumidity + ' % / ' + data.forecastday[i].qpf_allday.mm + ' mm');
            }
        });
});

// LOGIN FORM
$(function() {

    $('#login-form-link').click(function(e) {
        e.preventDefault();
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
	});

	$('#register-form-link').click(function(e) {
        e.preventDefault();
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
	});

});

// LOGIN REQ
$(function() {
    $('#login-form').submit(function(e) {
        e.preventDefault();
        // ajax post req
    });
});

// SIGN-UP REQ
$(function() {
    $('#register-form').submit(function(e) {
        e.preventDefault();
        // ajax post req
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

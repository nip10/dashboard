/*
---------------------------
---------- VARS -----------
---------------------------
*/

// module settings overlay animation duration
var animationTime = 1000;

/*
---------------------------
----- LOGIN / SIGN-UP -----
---------------------------
*/

// toggles login form
$('#login-form-link').click(function(e) {
    e.preventDefault();
    $("#login-form").delay(100).fadeIn(100);
    $("#signup-form").fadeOut(90);
    $('#signup-form-link').removeClass('active');
    $(this).addClass('active');
});

// toggles signup form
$('#signup-form-link').click(function(e) {
    e.preventDefault();
    $("#signup-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(90);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
});

// login form handler
$('#login-form').submit(function(e) {
    e.preventDefault();

    $('.alert-login').hide();
    $('.alert-login > p').empty();

    var email = $( "input[name='login-email']" ).val();
    var password = $( "input[name='login-password']" ).val();

    $.post('http://localhost:3000/api/auth/login', { email, password }, "json")
        .fail(function(jqXHR, textStatus, errorThrown) {
            logAjaxFail(jqXHR, textStatus, errorThrown);
            const error = jqXHR.responseJSON.error;
            if (error) {
                $('.alert-login').show().children().show();
                $('.alert-login').append('<p> ' + error + '</p>');
            }
        })
        .done(function(data, textStatus, jqXHR) {
            logAjaxDone(data, textStatus, jqXHR);
            if (data.status === 'success') window.location.href = '/dashboard';
        });
});

// signup form handler
$('#signup-form').submit(function(e) {
    e.preventDefault();

    $('.alert-login').hide();
    $('.alert-login > p').empty();

    var email = $( "input[name='signup-email']" ).val();
    var password = $( "input[name='signup-password']" ).val();

    $.post('http://localhost:3000/api/auth/signup', { email, password })
        .fail(function(jqXHR, textStatus, errorThrown) {
            logAjaxFail(jqXHR, textStatus, errorThrown);
            const error = jqXHR.responseJSON.error;
            if (error) {
                $('.alert-login').show().children().show();
                $('.alert-login').append('<p> ' + error + '</p>');
            }
        })
        .done(function(data, textStatus, jqXHR) {
            logAjaxDone(data, textStatus, jqXHR);
            $("#login-form").delay(100).fadeIn(100);
            $("#signup-form").fadeOut(80);
            $('#signup-form-link').removeClass('active');
            $('#login-form-link').addClass('active');
            $("#login-form input[type=email]").val(email);
            $("#login-form input[type=password]").val(password);
        });
});

/*
---------------------------
--------- MODULES ---------
---------------------------
*/

// toggles left-side module settings overlay
function toggleLeftModuleSettings(el, moduleName) {
    var moduleSettings = $(el).closest('div').siblings('[class^="module-content"]').children('.module-settings');
    // class 'attr contains' is a temporary hack to select both module-content and module-content-flex
    if (!moduleSettings.is(':animated')) {
        if (moduleSettings.is(':visible')) {
            $(moduleSettings).animate({ left: "-=1000", right: "+=1000" }, animationTime, function() {
                $(this).hide();
                idModule(moduleName);
            });
        } else {
            $(moduleSettings).show().animate({ left: "+=1000", right: "-=1000" }, animationTime, function() {
                idModule(moduleName);
                if(moduleName === 'weather') {
                    var userSettings = Cookies.getJSON('userSettings');
                    var userLocation = {
                        lat: parseFloat(userSettings.weather.location.lat),
                        lng: parseFloat(userSettings.weather.location.lng)
                    }
                    initMap(userLocation);
                }
            });
        }
    } 
};

// toggles right-side module settings overlay
function toggleRightModuleSettings(el, moduleName) {
    var moduleSettings = $(el).closest('div').siblings('[class^="module-content"]').children('.module-settings');
    // class 'attr contains' is a temporary hack to select both module-content and module-content-flex
    if (!moduleSettings.is(':animated')) {
        if (moduleSettings.is(':visible')) {
            $(moduleSettings).animate({ left: "+=1000", right: "-=1000" }, animationTime, function() {$(this).hide(); idModule(moduleName);});
        } else {            
            $(moduleSettings).show().animate({ left: "-=1000", right: "+=1000" }, animationTime, function() {idModule(moduleName);});
        }
    }
};

// toggles module (show/hide) when opening/closing settings overlay
function idModule(moduleName) {
    if (moduleName === 'weather') $('.weather-current, .weather-forecast, .location').toggle();
    // if (moduleName === 'email')
    if (moduleName === 'tv') $('.tv-list').toggle();
    if (moduleName === 'movies') $('.movies-container').toggle();
};

/*
---------------------------
----------- TV ------------
---------------------------
*/

// populates quality + source checkboxes from userSettings cookie
function populateCheckboxes() {
    var userSettings = Cookies.getJSON('userSettings');
    var parentEl = $('.tv-settings-content-downloads');
    var quality = userSettings.tvshows.quality;
    for (var i = 0; i < quality.length; i++) {
        $(parentEl).find("input:checkbox[value=" + quality[i] + "]").prop('checked', true);
    }
    var sources = userSettings.tvshows.source;
    for (var i = 0; i < sources.length; i++) {
        $(parentEl).find("input:checkbox[value=" + sources[i] + "]").prop('checked', true);
    }
};

// populates language select from userSettings cookie
function populateSelect() {
    var userSettings = Cookies.getJSON('userSettings');
    var parentEl = $('.tv-settings-content-subtitles');
    var language = getLanguageNativeName(userSettings.language);
    $('.subtitles-language').val(language);
}

// toggles 'manage' tab
$('.tv-settings-primary li:first-child').click(function(e) {
    if ($(this).hasClass('active')) return;
    $('.tv-settings-primary li:last-child').removeClass('active');
    $(this).addClass('active');
    $('.tv-settings-secondary').hide();
    $('.tv-settings-content-downloads').hide();
    $('.tv-settings-content-subtitles').hide();
    $('.tv-settings-content-showlist').show();
});

// toggles 'options' tab
$('.tv-settings-primary li:last-child').click(function(e) {
    if ($(this).hasClass('active')) return;
    $('.tv-settings-content-showlist').hide();
    $('.tv-settings-primary li:first-child').removeClass('active');
    $(this).addClass('active');
    $('.tv-settings-secondary').show();

     if ($('.tv-settings-secondary li:last-child').hasClass('active-sub')) {
        $('.tv-settings-content-downloads').show();
     } else {
        $('.tv-settings-content-subtitles').show();
     }
});

// toggles 'subtitles' tab
$('.tv-settings-secondary li:first-child').click(function(e) {
    if ($(this).hasClass('active-sub')) return;
    $('.tv-settings-secondary li:last-child').removeClass('active-sub');
    $(this).addClass('active-sub');
    $('.tv-settings-content-downloads').hide();
    $('.tv-settings-content-downloads *').hide();
    $('.tv-settings-content-subtitles').show();
    $('.tv-settings-content-subtitles *').show();
});

// toggles 'download' tab
$('.tv-settings-secondary li:last-child').click(function(e) {
    if ($(this).hasClass('active-sub')) return;
    $('.tv-settings-secondary li:first-child').removeClass('active-sub');
    $(this).addClass('active-sub');
    $('.tv-settings-content-subtitles').hide();
    $('.tv-settings-content-subtitles *').hide();
    $('.tv-settings-content-downloads').show();
    $('.tv-settings-content-downloads *').show();
});

// deletes tvshow from userSettings (both json and cookies) and the list itself
$('.tv-settings-delete').click(function(e) {
    var tvshowToRemove = $(this).parent().data("tvshow");
    var that = this;

    $.ajax({
        url: 'http://localhost:3000/api/user/settings',
        type: 'DELETE',
        data: {settingName: 'tvshows.shows', settingData: tvshowToRemove}
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        logAjaxFail(jqXHR, textStatus, errorThrown);
    })
    .done(function(data, textStatus, jqXHR) {
        logAjaxDone(data, textStatus, jqXHR);
        $(that).parent().fadeOut(90).remove();
    });
});

// updates source and quality settings
$('#tv-settings-source').click(function(e) {
    var quality = [];
    $(".tv-settings-content-downloads input:checkbox[name='quality']:checked").each(function(){
        quality.push($(this).val());
    });
    
    var source = [];
    $(".tv-settings-content-downloads input:checkbox[name='source']:checked").each(function(){
        source.push($(this).val());
    });

    $.ajax({
        url: 'http://localhost:3000/api/user/settings',
        type: 'PUT',
        data: {settingName: ['tvshows.quality', 'tvshows.source'], settingData: [quality, source]},
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        logAjaxFail(jqXHR, textStatus, errorThrown);
    })
    .done(function(data, textStatus, jqXHR) {
        logAjaxDone(data, textStatus, jqXHR);        
    });
});

/*
---------------------------
--------- WEATHER ---------
---------------------------
*/

// populates weather location country + city inputs from userSettings cookie
$('.weather .fa-cog').click(function(e) {
    var userSettings = Cookies.getJSON('userSettings');
    $("input[name='weather-country']").val(userSettings.weather.location.country);
    $("input[name='weather-city']").val(userSettings.weather.location.city);
});

// autocomplete coutries input
$("#autocomplete-countries").focus(function() {
    var listOfCountries = listOfLocations.map(function(el) {return el.country;});
    $("#autocomplete-countries").autocomplete({
        source: listOfCountries
    });
});

// autocomplete cities input
$("#autocomplete-cities").focus(function() {
  var selectedCountry = $("input[name=weather-country]").val();
  if (!selectedCountry || selectedCountry === '') {
      console.log('You need to select a Country first !');
      // append error message
      return;
  }
  var listOfCities = listOfLocations.filter(function(el) {return el.country === selectedCountry}).map(function(el) {return el.states;});
  $("#autocomplete-cities").autocomplete({
    source: listOfCities[0]
  });
});

// update weather location (using coords from the map marker)
// gets the city + name from geocoder, updates settings (json and cookies, server-side)
$("#weather-settings-submit").click((e) => {
    
    var location = {
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
    };

    geocoder.geocode({'location': location}, function(results, status) {
        if (status === 'OK') {
            if (results[1]) {
                var components = results[0].address_components;
                var info = [];
                for (var i=0 ; i < components.length ; i++) {
                    if(components[i].types[0]=="country") location.country = components[i].long_name;
                    if(components[i].types[0]=="locality") location.city = components[i].long_name;
                }
                console.log(location);
                changeSettings(location);
            } else {
            console.log('No results found');
            }
        } else {
            console.log('Geocoder failed due to: ' + status);
        }
    });

    function changeSettings(location) {
        $.ajax({
        url: 'http://localhost:3000/api/user/settings',
        type: 'PUT',
        data: {settingName: ['weather.location'], settingData: [location]},
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            logAjaxFail(jqXHR, textStatus, errorThrown);
        })
        .done(function(data, textStatus, jqXHR) {
            logAjaxDone(data, textStatus, jqXHR);
            // update weather conditions for new location
            $.get('http://localhost:3000/api/weather/conditions')
                .fail(function(jqXHR, textStatus, errorThrown) {
                    logAjaxFail(jqXHR, textStatus, errorThrown);
                })
                .done(function(data, textStatus, jqXHR) {
                    logAjaxDone(data, textStatus, jqXHR);
                    data.geolocation = location;
                    updateWeatherConditions(data);
                });
            // update weather forecast for new location
            $.get('http://localhost:3000/api/weather/forecast')
                .fail(function(jqXHR, textStatus, errorThrown) {
                    logAjaxFail(jqXHR, textStatus, errorThrown);
                })
                .done(function(data, textStatus, jqXHR) {
                    logAjaxDone(data, textStatus, jqXHR);
                    updateWeatherForecast(data);
                });
        
        });
    }
});


// geolocation api and updates marker in map
$('#weather-autolocation').click(function(e) {
    if (!navigator.geolocation) {
        return console.log('Geolocation is not supported by your browser.');
    }
    navigator.geolocation.getCurrentPosition((position) => {
        var latlng = {
            lat: parseFloat(position.coords.latitude), 
            lng: parseFloat(position.coords.longitude)
        };      
        map.panTo(latlng);
        marker.setPosition(latlng);
    }, () => {
        console.log('Unable to get your location');
        // append error to div
    });
});

// displays location on the map
$('#weather-search-location').click(function(e) {
    geocodeAddress(geocoder);
});

// initialize map
// note: map, marker and geocoder are set as global variables
function initMap(location) {
    var userSettings = Cookies.getJSON('userSettings');
    var userLocation = {
        lat: parseFloat(userSettings.weather.location.lat),
        lng: parseFloat(userSettings.weather.location.lng)
    }

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: location,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
    });

    var geocoder = new google.maps.Geocoder;

    var marker = new google.maps.Marker({
        position: userLocation,
        map: map,
        draggable: true,
        title: 'Drag me!'
    });

    google.maps.event.addListener(marker, 'position_changed', function() {
        var position = {
            lat: this.getPosition().lat(),
            lng: this.getPosition().lng()
        };
    });

    google.maps.event.addDomListener(window, 'resize', function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    });

    window.map = map;
    window.marker = marker;
    window.geocoder = geocoder;
}

// converts city+country in coords and updates marker in map
function geocodeAddress(geocoder) {
    var country = $("input[name='weather-country']").val();
    var city = $("input[name='weather-city']").val();
    var location = city.concat(', ', country);
    geocoder.geocode({'address': location}, function(results, status) {
        if (status === 'OK') {
            map.panTo(results[0].geometry.location);
            marker.setPosition(results[0].geometry.location);
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
            // append error to div
        }
    });
}

// updates weather conditions (and location) after changing location
function updateWeatherConditions(conditions) {
    // conditions
    $('.weather-degree').text(conditions.temperature + " ºC");
    $('.weather-description').text(conditions.description);
    $('weather-current > img').attr("src","./images/weather/" + conditions.icon + ".svg");
    // missing nt_
    // avoid using momentjs if possible
    // $('.location').text(conditions.location);
    $('.location').text(conditions.geolocation.city + ', ' + conditions.geolocation.country);
}

// updates weather forecast after changing location
function updateWeatherForecast(forecast) {
    // forecast
    for (var i = 0; i < 4; i++) {
        var el = $('.weather-forecast li[data-day="' + i + '"]');
        $(el).find('.hi').text(forecast.forecastday[i].high.celsius + 'ºC');
        $(el).find('.lo').text(forecast.forecastday[i].low.celsius + 'ºC');
        $(el).find('img').attr("src","./images/weather/" + forecast.forecastday[i].icon + ".svg");
        $(el).find('.cond-text').text(forecast.forecastday[i].conditions);
        $(el).find('.hura').text(forecast.forecastday[i].avehumidity + ' % /' + forecast.forecastday[i].qpf_allday.mm + ' mm');
    }
}

/*
---------------------------
---------- UTILS ----------
---------------------------
*/

// Logs failed ajax requests
var logAjaxFail = function(jqXHR, textStatus, errorThrown) {
    console.error('Ajax request failed !');
    console.log('jqXHR:');
    console.log(jqXHR);
    console.log('textStatus:');
    console.log(textStatus);
    console.log('errorThrown:');
    console.log(errorThrown);
}

// Logs successful ajax requests
var logAjaxDone = function(data, textStatus, jqXHR) {
    console.log('Ajax request successful !');
    console.log('jqXHR:');
    console.log(jqXHR);
    console.log('textStatus:');
    console.log(textStatus);
    console.log('data:');
    console.log(data);
}

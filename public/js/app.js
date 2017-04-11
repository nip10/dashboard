// LOGIN FORM
$('#login-form-link').click(function(e) {
    e.preventDefault();
    $("#login-form").delay(100).fadeIn(100);
    $("#signup-form").fadeOut(90);
    $('#signup-form-link').removeClass('active');
    $(this).addClass('active');
});

$('#signup-form-link').click(function(e) {
    e.preventDefault();
    $("#signup-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(90);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
});

// LOGIN AJAX
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
                $('.alert-login').append('<p>' + error + '</p>');
            }
        })
        .done(function(data, textStatus, jqXHR) {
            logAjaxDone(data, textStatus, jqXHR);
            if (data.status === 'success') window.location.href = '/dashboard';
        });
});


// SIGN-UP AJAX
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
                $('.alert-login').append('<p>' + error + '</p>');
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

// Module Toggle Animations Settings
var animationTime = 1000;

// Left Modules
function toggleLeftModuleSettings(el, moduleName) {
    var moduleSettings = $(el).closest('div').children('.module-settings-left');
    if (!moduleSettings.is(':animated')) {
        if (moduleSettings.is(':visible')) {            
            $(moduleSettings).animate({ left: "-=1000", right: "+=1000" }, animationTime, function() {$(this).hide(); idModule(moduleName);});
        } else {            
            $(moduleSettings).show().animate({ left: "+=1000", right: "-=1000" }, animationTime, function() {idModule(moduleName);});
        }
    } 
};

// Right Modules
function toggleRightModuleSettings(el, moduleName) {
    var moduleSettings = $(el).closest('div').children('.module-settings-right');
    if (!moduleSettings.is(':animated')) {
        if (moduleSettings.is(':visible')) {
            $(moduleSettings).animate({ left: "+=1000", right: "-=1000" }, animationTime, function() {$(this).hide(); idModule(moduleName);});
        } else {            
            $(moduleSettings).show().animate({ left: "-=1000", right: "+=1000" }, animationTime, function() {idModule(moduleName);});
        }
    }
};

// Toggle module when we are editing that module's settings
function idModule(moduleName) {
    if (moduleName === 'weather') $('.weather-current, .weather-forecast, .location').toggle();
    // if (moduleName === 'email')
    if (moduleName === 'tv') $('.tv-list').toggle();
    if (moduleName === 'movies') $('.movies-container').toggle();
};

// Tv Shows Module
// Options > Downloads (checkboxes)
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

// Options > Subtitles (select)
function populateSelect() {
    var userSettings = Cookies.getJSON('userSettings');
    var parentEl = $('.tv-settings-content-subtitles');
    var language = getLanguageNativeName(userSettings.language);
    $('.subtitles-language').val(language);
}

// Tv-shows settings
// 'Manage'
$('.tv-settings-primary li:first-child').click(function(e) {
    if ($(this).hasClass('active')) return;
    $('.tv-settings-primary li:last-child').removeClass('active');
    $(this).addClass('active');
    $('.tv-settings-secondary').hide();
    $('.tv-settings-content-downloads').hide();
    $('.tv-settings-content-subtitles').hide();
    $('.tv-settings-content-showlist').show();
});

// 'Options'
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

// 'Subtitles'
$('.tv-settings-secondary li:first-child').click(function(e) {
    if ($(this).hasClass('active-sub')) return;
    $('.tv-settings-secondary li:last-child').removeClass('active-sub');
    $(this).addClass('active-sub');
    $('.tv-settings-content-downloads').hide();
    $('.tv-settings-content-downloads *').hide();
    $('.tv-settings-content-subtitles').show();
    $('.tv-settings-content-subtitles *').show();
});

// 'Download'
$('.tv-settings-secondary li:last-child').click(function(e) {
    if ($(this).hasClass('active-sub')) return;
    $('.tv-settings-secondary li:first-child').removeClass('active-sub');
    $(this).addClass('active-sub');
    $('.tv-settings-content-subtitles').hide();
    $('.tv-settings-content-subtitles *').hide();
    $('.tv-settings-content-downloads').show();
    $('.tv-settings-content-downloads *').show();
});


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

$('#tv-settings-language').click(function(e) {
});

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

// AUTO-COMPLETE (weather location)
$("#autocomplete-countries").focus(function() {
    var listOfCountries = listOfLocations.map(function(el) {return el.country;});
    $("#autocomplete-countries").autocomplete({
        source: listOfCountries
    });
});

$("#autocomplete-cities").focus(function() {
  var selectedCountry = $("input[name=weather-country]").val();
  if (!selectedCountry || selectedCountry === '') {
      console.log('You need to select a Country first !');
      return;
  }
  var listOfCities = foo.filter(function(el) {return el.country === selectedCountry}).map(function(el) {return el.states;});
  $("#autocomplete-cities").autocomplete({
    source: listOfCities[0]
  });
});

$("#weather-settings").submit((e) => {
    e.preventDefault();
});

// UTILS
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

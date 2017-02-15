// LOGIN FORM
$('#login-form-link').click(function(e) {
    e.preventDefault();
    $("#login-form").delay(100).fadeIn(100);
    $("#signup-form").fadeOut(100);
    $('#signup-form-link').removeClass('active');
    $(this).addClass('active');
});

$('#signup-form-link').click(function(e) {
    e.preventDefault();
    $("#signup-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
});

// LOGIN AJAX
$('#login-form').submit(function(e) {
    e.preventDefault();

    var email = $( "input[name='login-email']" ).val();
    var password = $( "input[name='login-password']" ).val();

    $.post('http://localhost:3000/api/auth/login', { email: email, password: password })
        .fail(function(jqXHR, textStatus, errorThrown) {
            logAjaxFail(jqXHR, textStatus, errorThrown);
        })
        .done(function(data, textStatus, jqXHR) {
            logAjaxDone(data, textStatus, jqXHR);
            if (data.status === 'success') window.location.href = '/dashboard'
        });
});


// SIGN-UP AJAX
$('#signup-form').submit(function(e) {
    e.preventDefault();

    var email = $( "input[name='signup-email']" ).val();
    var password = $( "input[name='signup-password']" ).val();

    $.post('http://localhost:3000/api/auth/signup', { email: email, password: password })
        .fail(function(jqXHR, textStatus, errorThrown) {
            logAjaxFail(jqXHR, textStatus, errorThrown);
        })
        .done(function(data, textStatus, jqXHR) {
            logAjaxDone(data, textStatus, jqXHR);
        });
});


// UTILS
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

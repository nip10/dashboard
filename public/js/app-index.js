// LOGIN FORM
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

// LOGIN REQ

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
        });
});


// SIGN-UP REQ
$('#register-form').submit(function(e) {
    e.preventDefault();

    var email = $( "input[name='register-email']" ).val();
    console.log('Email: ' + email);
    var password = $( "input[name='register-password']" ).val();
    console.log('Password: ' + password);

    $.post('http://localhost:3000/api/auth/register', { email: email, password: password })
        .fail(function(jqXHR, textStatus, errorThrown) {
            logAjaxFail(jqXHR, textStatus, errorThrown);
        })
        .done(function(data, textStatus, jqXHR) {
            logAjaxDone(data, textStatus, jqXHR);
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

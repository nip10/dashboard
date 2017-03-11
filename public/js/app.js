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
            if (data.status === 'success') window.location.href = '/dashboard'
        });
});


// SIGN-UP AJAX
$('#signup-form').submit(function(e) {
    e.preventDefault();

    $('.alert-login').hide();
    $('.alert-login > p').empty();

    var email = $( "input[name='signup-email']" ).val();
    var password = $( "input[name='signup-password']" ).val();

    $.post('http://localhost:3000/api/auth/signup', { email: email, password: password })
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

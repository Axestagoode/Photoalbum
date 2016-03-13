var app = app || {};

app.registerViews = (function() {
    function showRegisterPage(selector){
        $.get('templates/register.html', function (templ) {
            var output = Mustache.render(templ);
            $(selector).html(output);
            $('#register').on('click', function (e) {
                var username = $('#username').val(),
                    email = $('#email').val(),
                    password = $('#password').val(),
                    repeatPass = $('#repeatPass').val();

                if(password === repeatPass){
                    Sammy(function() {
                        this.trigger('register', {username: username, email: email, password: password});
                    });
                }

            })
        })
    }

    return {
        load: function() {
            return {
                showRegisterPage: showRegisterPage
            }
        }
    }
}());

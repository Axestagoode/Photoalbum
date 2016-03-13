var app = app || {};

app.loginViews = (function() {
    function showLoginPage(selector) {
        $.get('templates/login.html', function(template) {
            var output = Mustache.render(template);
            $(selector).html(output);

            $('#login').on('click', function () {
                var username = $('#username').val(),
                    password = $('#password').val();

                //trigger custom event
                $.sammy(function() {
                    this.trigger('login', {username: username, password: password});
                });
            })
        })
    }

    return {
        load: function() {
            return {
                showLoginPage: showLoginPage
            }
        }
    }
}());

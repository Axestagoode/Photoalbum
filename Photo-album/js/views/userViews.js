var app = app || {};

app.userViews = (function() {
    function showUsersPage(selector) {
        $.get('templates/users.html', function (templ) {

            $(selector).html(templ);
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
                showUsersPage: showUsersPage
            }
        }
    }
}());

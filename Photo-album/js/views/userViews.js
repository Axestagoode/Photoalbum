var app = app || {};

app.userViews = (function() {
    function showUsersPage(selector, data) {
        $.get('templates/users.html', function (templ) {
            var output = Mustache.render(templ, data);
            $(selector).html(output);
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

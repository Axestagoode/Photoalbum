var app = app || {};

app.usersView = (function() {
    function UsersView(selector, data) {
        $.get('templates/users.html', function(template) {
            var output = Mustache.render(template, data);

            $(selector).html(output);
        })
    }

    return {
        load: function (selector, data) {
            return new UsersView(selector, data);
        }
    }
}());

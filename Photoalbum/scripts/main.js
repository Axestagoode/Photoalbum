var app = app || {};

(function() {
    var model = app.model.load('kid_W1-EIBMS1W', '2ca76dc7f93547c6aab27095735bacad');
    var controller = app.controller.load(model);

    app.router = Sammy(function () {
        var selector = '#wrapper',
            greeting = '#greeting';

        this.get('#/', function () {
            controller.getHomePage(selector);
            $('title').text('Photoalbum - Home Page')
        });

        this.get('#/Login', function () {
            controller.getLoginPage(selector);
            $('title').text('Photoalbum - Login')
        });

        this.get('#/Register', function () {
            controller.getRegisterPage(selector);
            $('title').text('Photoalbum - Register')
        });
    });

    app.router.run('#/');
}());

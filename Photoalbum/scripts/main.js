var app = app || {};

(function() {
    var model = app.model.load('https://baas.kinvey.com/appdata/kid_W1-EIBMS1W/');
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

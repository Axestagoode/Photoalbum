var app = app || {};

(function() {
    var model = app.model.load('kid_W1-EIBMS1W', 'af951f4856d647b59a1b30da5bf7fbfb');
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

        this.get('#/Pictures', function () {
            controller.getPicturesPage(selector);
            $('title').text('Photoalbum - Pictures')
        });
    });

    app.router.run('#/');
}());

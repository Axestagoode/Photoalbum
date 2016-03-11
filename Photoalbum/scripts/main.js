var app = app || {};

(function() {
    var modelOne = app.picturesModel.load('kid_W1-EIBMS1W', 'af951f4856d647b59a1b30da5bf7fbfb');
    var modelTwo = app.categoryModel.load('kid_W1-EIBMS1W', 'af951f4856d647b59a1b30da5bf7fbfb');
    var controllerOne = app.controller.load(modelOne);
    var controllerTwo = app.controller.load(modelTwo);

    app.router = Sammy(function () {
        var selector = '#wrapper',
            greeting = '#greeting',
            category = "#category";

        this.get('#/', function () {
            controllerOne.getHomePage(selector);
            $('title').text('Photoalbum - Home Page')
        });

        this.get('#/Login', function () {
            controllerOne.getLoginPage(selector);
            $('title').text('Photoalbum - Login')
        });

        this.get('#/Register', function () {
            controllerOne.getRegisterPage(selector);
            $('title').text('Photoalbum - Register')
        });

        this.get('#/Pictures', function () {
            controllerOne.getPicturesPage(selector);
            $('title').text('Photoalbum - Pictures')
        });

        this.get('#/Pictures-by-category', function () {
            controllerOne.getPicturesByCategoryPage(selector, category);
            $('title').text('Photoalbum - Pictures')
        });

        this.get('#/Categories', function () {
            controllerTwo.getCategoriesPage(selector);
            $('title').text('Photoalbum - Categories')
        });
    });

    app.router.run('#/');
}());

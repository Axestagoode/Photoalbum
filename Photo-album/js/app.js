//user: pesho; pass: 123456


var app = app || {};

(function() {
    //app_key, app_secret:
    var requester = app.requester.config('kid_W1-EIBMS1W', '2ca76dc7f93547c6aab27095735bacad');

    var userModel = app.usersModel.load(requester);
    var categoryModel = app.categoriesModel.load(requester);
    var pictureModel = app.picturesModel.load(requester);

    var userViewBag = app.userViews.load();
    var categoryViewBag = app.categoryViews.load();
    var pictureViewBag = app.pictureViews.load();
    var homeViewBag =app.homeViews.load();
    var loginViewBag =app.loginViews.load();
    var registerViewBag =app.registerViews.load();

    var userController = app.usersController.load(userModel, userViewBag);
    var loginController = app.usersController.load(userModel, loginViewBag);
    var registerController = app.usersController.load(userModel, registerViewBag);
    var categoryController = app.categoriesController.load(categoryModel, categoryViewBag);
    var pictureController = app.picturesController.load(pictureModel, pictureViewBag);
    var homeController = app.homeController.load(homeViewBag);


    app.router = $.sammy(function () {
        var selector = '#wrapper';

        //this.before({except: {path: '#\/(register|login)?'}}, function () {
        //    var sessionId = sessionStorage['sessionAuth'];
        //    if (!sessionId) {
        //        this.redirect('#/login');
        //        return false;
        //    } else {
        //        this.redirect('#/pictures');
        //    }
        //});

        this.get('#/', function () {
            homeController.loadHomePage(selector);
            $('title').text('PhotoAlbum - Home Page')
        });

        this.get('#/login', function () {
            loginController.loadLoginPage(selector);
            $('title').text('PhotoAlbum - Login Page')
        });

        this.get('#/register', function () {
            registerController.loadRegisterPage(selector);
            $('title').text('PhotoAlbum - Register Page')
        });

        this.get('#/logout', function () {
            var _this = this;
            userController.logout()
                .then(function() {
                    _this.redirect('#/');
                })
        });

        this.get('#/categories', function () {
            categoryController.getAllCategories(selector);
            $('title').text('PhotoAlbum - Categories')
        });

        this.get('#/pictures', function () {
            pictureController.getAllPictures(selector);
            $('title').text('PhotoAlbum - Pictures')
        });

        this.get('#/users', function () {
            userController.getAllUsers(selector);
            $('title').text('PhotoAlbum - Pictures')
        });

        //listen to custom events
        this.bind('redirectUrl', function(e, data) {
            this.redirect(data.url);
        });

        this.bind('login', function(e, data) {
            loginController.login(data)
        });

        this.bind('register', function(e, data) {
            registerController.register(data)
        });

        this.bind('get-pictures', function (e, data) {
            pictureController.getAllPicturesByCategoryId(selector, data);
        });

        this.bind('add-picture', function (e, data) {
            pictureController.addPicture(data);
        });
    });

    app.router.run('#/');
}());

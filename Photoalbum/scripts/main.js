var app = app || {};

(function() {
    var picturesModel = app.picturesModel.load('kid_W1-EIBMS1W', 'af951f4856d647b59a1b30da5bf7fbfb');
    var categoriesModel = app.categoryModel.load('kid_W1-EIBMS1W', 'af951f4856d647b59a1b30da5bf7fbfb');
    var usersModel = app.userModel.load('kid_W1-EIBMS1W', 'af951f4856d647b59a1b30da5bf7fbfb');
    var controllerOne = app.controller.load(picturesModel);
    var controllerTwo = app.controller.load(categoriesModel);
    var controllerThree = app.controller.load(usersModel);
    var category ='';

    app.router = Sammy(function () {
        var selector = '#wrapper',
            greeting = '#greeting';

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

        this.get('#/Categories', function () {
            controllerTwo.getCategoriesPage(selector);
            $('title').text('Photoalbum - Categories');
        });

        this.get('#/Pictures-by-category', function () {
            $('a[href="#/Pictures-by-category"]').click(function(event){
                var div = event.target,
                    $div = $(div);
                category = $div.attr("id");
                console.log(category);
            });

            controllerOne.getPicturesByCategoryPage(selector, category);
            $('title').text('Photoalbum - Pictures')
        });

        this.get('#/Users', function () {
            controllerThree.getUsersPage(selector);
            $('title').text('Photoalbum - Users');
        });
    });

    app.router.run('#/');
}());

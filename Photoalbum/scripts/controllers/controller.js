var app = app || {};

app.controller = (function() {
    function Controller(model) {
        this.model = model;
    }

    Controller.prototype.getHomePage = function (selector) {
        app.homeView.load(selector);
    };

    Controller.prototype.getLoginPage = function (selector) {
        app.loginView.load(selector);
    };

    Controller.prototype.getRegisterPage = function (selector) {
        app.registerView.load(selector);
    };

    Controller.prototype.getPicturesPage = function (selector) {
        this.model.getPictures()
            .then(function (data) {
                app.picturesView.load(selector, data);
            }, function (error) {
                console.log(error);
            })
    };

    Controller.prototype.getCategoriesPage = function (selector) {
        this.model.getCategories()
            .then(function (data) {
                app.categoriesView.load(selector, data);
            }, function (error) {
                console.log(error);
            })
    };

    Controller.prototype.getPicturesByCategoryPage = function (selector, category) {
        this.model.getPicturesByCategory(category)
            .then(function (data) {
                app.picturesView.load(selector, data);
            }, function (error) {
                console.log(error);
            })
    };

    Controller.prototype.getUsersPage = function (selector, category) {
        this.model.getUsers(category)
            .then(function (data) {
                app.usersView.load(selector, data);
            }, function (error) {
                console.log(error);
            })
    };

    return {
        load: function (model) {
            return new Controller(model);
        }
    }
}());

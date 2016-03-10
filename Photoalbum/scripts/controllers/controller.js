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

    return {
        load: function (model) {
            return new Controller(model);
        }
    }
}());

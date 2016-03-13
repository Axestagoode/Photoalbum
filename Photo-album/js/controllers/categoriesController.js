var app = app || {};

app.categoriesController = (function() {
    function CategoriesController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag; // views of this controller
    }

    CategoriesController.prototype.getAllCategories = function(selector) {
        var _this =this;

        this._model.getAllCategories()
            .then(function (categories) {
                var result = {
                    categories: []
                };

                categories.forEach(function (category) {
                    result.categories.push(new Category(
                        category.name,
                        category._id,
                        category.pictures));
                });

                _this._viewBag.showCategories(selector, result);
            }).done();
    };

    CategoriesController.prototype.addCategory = function(data) {
        var _this = this;

        var category = {
            name: data.name
        };

        this._model.addCategory(category)
            .then(function() {
                _this.getAllCategories();
            })
    };

    return {
        load: function(model, viewBag) {
            return new CategoriesController(model, viewBag);
        }
    };
}());

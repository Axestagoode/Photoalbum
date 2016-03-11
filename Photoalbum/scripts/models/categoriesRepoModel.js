var app = app || {};

app.categoryModel = (function() {
    function CategoriesRepoModel(appId, appSecret) {
        this._requester = app.requester.load(appId, appSecret);
        this.categoriesRepo = {
            categories: []
        };
    }

    CategoriesRepoModel.prototype.getCategories = function () {
        var deffer = Q.defer();
        var _this = this;
        this.categoriesRepo['categories'].length = 0;

        this._requester.makeRequest('GET', 'https://baas.kinvey.com/appdata/kid_W1-EIBMS1W/categories')
            .then(function (data) {
                data.forEach(function(categoryData) {
                    console.log(categoryData);
                    var category =
                        new Category(categoryData.name, categoryData._id);
                    _this.categoriesRepo['categories'].push(category);
                });

                deffer.resolve(_this.categoriesRepo);
            }, function (error) {
                deffer.reject(error);
            });

        return deffer.promise;
    };


    return {
        load: function (appId, appSecret) {
            return new CategoriesRepoModel(appId, appSecret);
        }
    }
}());

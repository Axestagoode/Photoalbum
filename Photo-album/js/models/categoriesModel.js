var app = app || {};

app.categoriesModel = (function () {
    function CategoriesModel(requester) {
        this.requester = requester; //define own requester
        this.serviceUrl = this.requester.baseUrl +
        'appdata/' +
        this.requester.appId +
        '/categories';
    }

    CategoriesModel.prototype.getAllCategories = function () {
        return this.requester.get(this.serviceUrl, true);
    };

    CategoriesModel.prototype.addCategory = function(data) {
        return this.requester.post(this.serviceUrl, data, true);
    };

    return {
        load: function(requester) {
            return new CategoriesModel(requester);
        }
    }
}());

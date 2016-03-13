var app = app || {};

app.picturesModel = (function() {
    function PicturesModel(requester) {
        this.requester = requester;
        this.serviceUrl = this.requester.baseUrl +
        'appdata/' +
        this.requester.appId +
        '/pictures';
    }

    PicturesModel.prototype.getAllPictures = function () {
        return this.requester.get(this.serviceUrl, true);
    };

    PicturesModel.prototype.getAllPicturesByCategoryId = function (categoryId) {
        var requestUrl = this.serviceUrl + '?query={"category._id":"' + categoryId + '"}';
        return this.requester.get(requestUrl, true);
    };

    PicturesModel.prototype.addPicture = function(data) {
        return this.requester.post(this.serviceUrl, data, true)
    };

    return {
        load: function(requester) {
            return new PicturesModel(requester);
        }
    }
}());

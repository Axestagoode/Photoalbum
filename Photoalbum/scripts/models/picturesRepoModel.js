var app = app || {};

app.picturesModel = (function() {
    function PicturesRepoModel(appId, appSecret) {
        this._requester = app.requester.load(appId, appSecret);
        this.picturesRepo = {
            pictures: []
        };
    }

    PicturesRepoModel.prototype.getPictures = function () {
        var deffer = Q.defer();
        var _this = this;
        this.picturesRepo['pictures'].length = 0;

        this._requester.makeRequest('GET', 'https://baas.kinvey.com/appdata/kid_W1-EIBMS1W/pictures')
            .then(function (data) {
                data.forEach(function(pictureData) {
                    console.log(pictureData);
                    var picture =
                        new Picture(pictureData.name,
                            pictureData.url,
                            pictureData.category,
                            pictureData.author,
                            pictureData._id,
                            pictureData.likes
                            //pictureData.comments,
                            );
                    _this.picturesRepo['pictures'].push(picture);
                });

                deffer.resolve(_this.picturesRepo);
            }, function (error) {
                deffer.reject(error);
            });

        return deffer.promise;
    };


    PicturesRepoModel.prototype.getPicturesByCategory = function (category) {
        var deffer = Q.defer();
        var _this = this;
        this.picturesRepo['pictures'].length = 0;
        var query = '?query={"category.name":' + category + '}';
        console.log(query);

        this._requester.makeRequest('GET', 'https://baas.kinvey.com/appdata/kid_W1-EIBMS1W/pictures/?query={"category.name":' + category + '}')
            .then(function (data) {
                data.forEach(function(pictureData) {
                    console.log(pictureData);
                    var picture =
                        new Picture(pictureData.name,
                            pictureData.url,
                            pictureData.category,
                            pictureData.author,
                            pictureData._id,
                            pictureData.likes
                            //pictureData.comments,
                            );
                    _this.picturesRepo['pictures'].push(picture);
                });

                deffer.resolve(_this.picturesRepo);
            }, function (error) {
                deffer.reject(error);
            });

        return deffer.promise;
    };


    PicturesRepoModel.prototype.getPictureById = function (id) {
        var deffer = Q.defer();
        var _this = this;
        this.picturesRepo['pictures'].length = 0;

        this._requester.makeRequest('GET', 'https://baas.kinvey.com/appdata/kid_W1-EIBMS1W/pictures/' + id)
            .then(function (data) {
                data.forEach(function(pictureData) {
                    console.log(pictureData);
                    var picture =
                        new Picture(pictureData.name,
                            pictureData.url,
                            pictureData.category,
                            pictureData.author,
                            pictureData._id,
                            pictureData.likes
                            //pictureData.comments,
                            );
                    _this.picturesRepo['pictures'].push(picture);
                });

                deffer.resolve(_this.picturesRepo);
            }, function (error) {
                deffer.reject(error);
            });

        return deffer.promise;
    };


    return {
        load: function (appId, appSecret) {
            return new PicturesRepoModel(appId, appSecret);
        }
    }
}());

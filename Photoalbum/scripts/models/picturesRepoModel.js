var app = app || {};

app.model = (function() {
    function PicturesRepoModel(baseUrl) {
        this._requester = app.requester.load(baseUrl);
        this.picturesRepo = {
            pictures: []
        };
    }

    PicturesRepoModel.prototype.getPictures = function () {
        var deffer = Q.defer();
        var _this = this;
        this.picturesRepo['pictures'].length = 0;

        this._requester.get('pictures')
            .then(function (data) {
                data['results'].forEach(function(pictureData) {
                    var picture =
                        new Picture(pictureData.name,
                            pictureData.url,
                            pictureData.author,
                            pictureData._id);
                    _this.picturesRepo['pictures'].push(picture);
                });

                deffer.resolve(_this.picturesRepo);
            }, function (error) {
                deffer.reject(error);
            });

        return deffer.promise;
    };


    return {
        load: function (baseUrl) {
            return new PicturesRepoModel(baseUrl);
        }
    }
}());

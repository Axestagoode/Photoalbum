var app = app || {};

app.picturesController = (function () {
    function PicturesController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    PicturesController.prototype.getAllPictures = function(selector) {
        var _this = this;

        this._model.getAllPictures()
            .then(function (pictures) {
                var result = {
                    pictures: []
                };

                pictures.forEach(function (picture) {
                    result.pictures.push(new Picture(
                        picture.name,
                        picture.url,
                        picture.category._id,
                        picture.author._id,
                        picture._id,
                        picture.likes,
                        picture.comments.length));
                });

                _this._viewBag.showPictures(selector, result);
            }).done();
    };


    PicturesController.prototype.getAllPicturesByCategoryId = function(selector, data) {
        var _this = this;

        this._model.getAllPicturesByCategoryId(data.categoryId)
            .then(function (pictures) {
                var result = {
                    pictures: []
                };

                pictures.forEach(function (picture) {
                    result.pictures.push(new Picture(
                        picture.name,
                        picture.url,
                        picture.category._id,
                        picture.author._id,
                        picture.likes,
                        picture.comments.length));
                });

                 _this._viewBag.showPictures(selector, result);
            }).done();
    };

    PicturesController.prototype.addPicture = function(data) {
        var _this = this;
        var picture = {
            content: data.content,
            question: {
                _type: 'KinveyRef',
                _id: data.categoryId,
                _collection: 'categories'
            }
        };

        this._model.addPicture(picture)
            .then(function() {
                //reload page with all books after added new one
                _this.getAllPicturesByCategoryId(data);

                //Sammy(function(){
                //    this.trigger('redirectUrl', {url: '#/pictures'});
                //});
            })
    };

    return {
        load: function (model, viewBag, router) {
            return new PicturesController(model, viewBag, router);
        }
    }
}());

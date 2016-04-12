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

                //sort by rating
                pictures = pictures.sort(function (a, b) {
                    return b.likes - a.likes
                });

                pictures.forEach(function (picture) {
                    result.pictures.push(new Picture(
                        picture.name,
                        picture.url,
                        picture.category._id,
                        picture.author._id,
                        picture.author._username,
                        picture._id,
                        picture.likes,
                        picture.comments));
                });

                //var sortedByLikes = _.sortBy(result.pictures, 'likes');
                //_this._viewBag.showPictures(selector, sortedByLikes.reverse());

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
                        picture.author._username,
                        picture._id,
                        picture.likes,
                        picture.comments));
                });

                 _this._viewBag.showPictures(selector, result);
            }).done();
    };

    PicturesController.prototype.addPicture = function(data) {
        var _this = this;
        //var shortname = data.url.slice(-30);

        var picture = {
            url: data.url,
            //name: shortname,
            name: data.name,
            category: {
                _type: 'KinveyRef',
                _id: data.categoryId,
                _collection: 'categories'
            },
            author: {
                _type: 'KinveyRef',
                _id: sessionStorage.userId,
                _username: sessionStorage.username,
                _collection: 'users'
            },
            likes: 0,
            comments: []
        };

        this._model.addPicture(picture)
            .then(function() {
                //reload page with all books after added new one
                var parent = $(this).parent();
                $.sammy(function () {
                    this.trigger('get-pictures', {parent: parent, categoryId: data.categoryId})
                })
            })
    };

    PicturesController.prototype.updatePicture = function(pictureId, data) {
        var _this = this;
        var newPicture = {
            name: data.name,
            url: data.url,
            category: {
                _type: 'KinveyRef',
                _id: data.categoryId,
                _collection: 'categories'
            },
            author: {
                _type: 'KinveyRef',
                _id: sessionStorage.userId,
                _username: sessionStorage.username,
                _collection: 'users'
            },
            _id: data._id,
            likes: data.likes + 1,
            comments: data.comments
        };

        this._model.updatePicture(newPicture._id, newPicture)
            .then(function() {
                //reload page with all books after added new one
                var parent = $(this).parent();
                $.sammy(function () {
                    this.trigger('get-pictures', {parent: parent, categoryId: data.categoryId})
                })
            })
    };

    PicturesController.prototype.getPictureById = function(selector, pictureId) {
        var _this = this;

        this._model.getPictureById(pictureId)
            .then(function (data) {
                var picture = new Picture(
                    data.name,
                    data.url,
                    data.category._id,
                    data.author._id,
                    data.author._username,
                    data._id,
                    data.likes,
                    data.comments);

                _this._viewBag.enlargePicture(selector, picture);
            }).done();
    };

    return {
        load: function (model, viewBag, router) {
            return new PicturesController(model, viewBag, router);
        }
    }
}());

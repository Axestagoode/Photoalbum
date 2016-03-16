var Picture = (function() {
    function Picture(name, url, categoryId, authorId, id, likes, comments) {
        this.name = name;
        this.url = url;
        this.categoryId = categoryId;
        this.authorId = authorId;
        this._id = id;
        this.likes = likes || 0;
        this.comments = comments || [];
    }

    Picture.prototype.getPictureInputModel = function getPictureInputModel(){
        return {
            base64data: this.url,
            comment: this.comments,
            rating: this.likes,
            albumId: this.categoryId,
            name: this.name,
            id: this._id,
            author: this.authorId
        }
    };

    return Picture;
}());
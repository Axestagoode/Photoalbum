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

    return Picture;
}());
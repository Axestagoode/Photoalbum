var Category = (function() {
    function Category (name, id, pictures) {
        this.name = name;
        this._id = id;
        this.pictures = pictures || [];
    }

    return Category
}());

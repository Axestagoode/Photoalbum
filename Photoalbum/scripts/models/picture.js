var Picture = (function() {
    function Picture (name, url, category, author, id) {
        this.name = name;
        this.url = url;
        this.category = category;
        this.author = author;
        this.likes = 0;
        this.comments = [];
        this.id = id;
    }

    return Picture
}());

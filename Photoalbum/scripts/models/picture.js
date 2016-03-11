var Picture = (function() {
    function Picture (name, url, category, author, id, likes) {
        this.name = name;
        this.url = url;
        this.category = category;
        this.author = author;
        this.id = id;
        this.likes = likes || 0;
        this.comments = [];
    }

    return Picture
}());

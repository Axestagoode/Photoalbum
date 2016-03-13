var User = (function() {
    function User (username, email, id) {
        this.username = username;
        this.email = email;
        this._id = id;
    }

    return User
}());

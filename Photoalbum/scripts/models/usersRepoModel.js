var app = app || {};

app.userModel = (function() {
    function UsersRepoModel(appId, appSecret) {
        this._requester = app.requester.load(appId, appSecret);
        this.usersRepo = {
            users: []
        };
    }

    UsersRepoModel.prototype.getUsers = function () {
        var deffer = Q.defer();
        var _this = this;
        this.usersRepo['users'].length = 0;

        this._requester.makeRequest('GET', 'https://baas.kinvey.com/user/kid_W1-EIBMS1W/')
            .then(function (data) {
                data.forEach(function(userData) {
                    console.log(userData);
                    var user =
                        new User(userData.username,
                            userData.email,
                            userData._id);
                    _this.usersRepo['users'].push(user);
                });

                deffer.resolve(_this.usersRepo);
            }, function (error) {
                deffer.reject(error);
            });

        return deffer.promise;
    };


    return {
        load: function (appId, appSecret) {
            return new UsersRepoModel(appId, appSecret);
        }
    }
}());

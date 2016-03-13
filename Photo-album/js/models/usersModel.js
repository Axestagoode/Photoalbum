var app = app || {};

app.usersModel = (function () {
    function UsersModel(requester) {
        this.requester = requester; //define own requester
        this.serviceUrl = this.requester.baseUrl + 'user/' + this.requester.appId;
    }

    UsersModel.prototype.register = function (data) {
        var requestUrl = this.serviceUrl;
        return this.requester.post(requestUrl, data);
    };

    UsersModel.prototype.login = function (data) {
        var requestUrl = this.serviceUrl + '/login';
        return this.requester.post(requestUrl, data)
    };

    UsersModel.prototype.logout = function () {
        var requestUrl = this.serviceUrl + '/_logout';
        return this.requester.post(requestUrl, null, true);
    };

    UsersModel.prototype.getUsers = function () {
        //var requestUrl = this.requester.baseUrl +
        //'appdata/' +
        //this.requester.appId +
        //'/users';
        return this.requester.get(this.serviceUrl, true);
    };

    return {
        load: function(requester) {
            return new UsersModel(requester);
        }
    };
}());


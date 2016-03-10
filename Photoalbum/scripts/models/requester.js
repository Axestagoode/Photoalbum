var app = app || {};

app.requester = (function() {
    function Requester(appId, appSecret) {
        this.appId = appId;
        this.appSecret = appSecret;
        this.baseUrl = 'https://baas.kinvey.com/';
    }

    Requester.prototype.makeRequest = function(method, url, data, useSession) {
        var token,
            defer = Q.defer(),
            _this = this,
            options = {
                method: method,
                url: url,
                success: function (data) {
                    defer.resolve(data);
                },
                error: function (error) {
                    defer.reject(error);
                }
            };

        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!useSession) {
                    token = _this.appId + ':' + _this.appSecret;
                    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(token));
                } else {
                    token = sessionStorage['sessionAuth'];
                    xhr.setRequestHeader('Authorization', 'Kinvey ' + token);
                }
                if(data) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    settings.data = JSON.stringify(data);
                    return true;
                }
            }
        });

        $.ajax(options);

        return defer.promise;
    };

    return {
        load: function (appId, appSecret) {
            return new Requester(appId, appSecret);
        }
    }
}());

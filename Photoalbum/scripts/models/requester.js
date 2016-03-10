var app = app || {};

app.requester = (function() {
    function Requester(baseUrl) {
        this._baseUrl = baseUrl;
    }

    Requester.prototype.get = function (serviceUrl) {
        var headers = getHeaders();
        var url = this._baseUrl + serviceUrl;

        return makeRequest('GET', headers, url);
    };

    function makeRequest(method, headers, url, data) {
        var deffer = Q.defer();

        $.ajax({
            method: method,
            headers: headers,
            url: url,
            data: JSON.stringify(data),
            success: function (data) {
                deffer.resolve(data);
            },
            error: function (error) {
                deffer.reject(error);
            }
        });

        return deffer.promise;
    }

    function getHeaders() {
        var headers = {
            'APP_KEY' : 'kid_W1-EIBMS1W',
            'APP_SECRET' : '2ca76dc7f93547c6aab27095735bacad',
            'Content-Type' : 'application/json'
        };

        if(sessionStorage['logged-in']) {
            headers['Session-Token'] = sessionStorage['logged-in'];
        }

        return headers;
    }

    return {
        load: function (baseUrl) {
            return new Requester(baseUrl);
        }
    }
}());

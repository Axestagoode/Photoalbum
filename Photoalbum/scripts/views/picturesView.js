var app = app || {};

app.picturesView = (function() {
    function PicturesView(selector, data) {
        $.get('templates/pictures.html', function(template) {
            var output = Mustache.render(template, data);

            $(selector).html(output);
        })
    }

    return {
        load: function (selector, data) {
            return new PicturesView(selector, data);
        }
    }
}());

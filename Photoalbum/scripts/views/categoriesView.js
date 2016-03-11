var app = app || {};

app.categoriesView = (function() {
    function CategoriesView(selector, data) {
        $.get('templates/categories.html', function(template) {
            var output = Mustache.render(template, data);

            $(selector).html(output);
        })
    }

    return {
        load: function (selector, data) {
            return new CategoriesView(selector, data);
        }
    }
}());

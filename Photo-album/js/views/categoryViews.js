var app = app || {};

app.categoryViews = (function () {
    function showCategories(selector, data) {
        $.get('templates/categories.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);

            $('.getPictures').on('click', function (event) {
                var parent = $(this).parent(),
                    div = event.target,
                    $div = $(div),
                    categoryId = $div.attr("id");

                $.sammy(function () {
                    this.trigger('get-pictures', {parent: parent, categoryId: categoryId})
                })
            });

            $('.addPicture').on('click', function () {
                var parent = $(this).parent(),
                    categoryId = parent.children('div:first').attr('id'),
                    url = prompt('Add picture url');

                $.sammy(function () {
                    this.trigger('add-picture', {parent: parent, categoryId: categoryId, url: url})
                });
            })

            $('.enlarge').on('click', function () {
                var parent = $(this).parent(),
                    div = event.target,
                    $div = $(div),
                    categoryId = $div.attr("id");

                $.sammy(function () {
                    this.trigger('get-pictures', {parent: parent, categoryId: categoryId})
                })
            })
        })
    }

    return {
        load: function () {
            return {
                showCategories: showCategories
            }
        }
    }
}());





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

            //$('.addPicture').on('click', function () {
            //    var parent = $(this).parent(),
            //        categoryId = parent.children('div:first').attr('id'),
            //        url = prompt('Add picture url');
            //
            //    $.sammy(function () {
            //        this.trigger('add-picture', {parent: parent, categoryId: categoryId, url: url})
            //    });
            //});

            $('.addPicture').on('click', function () {
                var parent = $(this).parent(),
                    categoryId = parent.children('div:first').attr('id');

                var createPictureDiv = $('<div>').addClass('add-picture-form');
                var nameLabel = $('<label>').attr('for', 'picture-name').text('Picture title:');
                var pictureName = $('<input>').attr('id', 'picture-name').addClass('picture-name');
                var uploadLabel = $('<label>').attr('for', 'picture-upload').addClass('picture-upload').text('Choose File');
                var pictureFile = $('<input>').attr({
                    type: 'file',
                    id: 'picture-upload'
                }).addClass('picture-input').change(function () {
                    var reader = new FileReader(),
                        file = this.files[0];

                    reader.addEventListener("load", function () {

                        $.sammy(function () {
                            this.trigger('add-picture', {parent: parent, categoryId: categoryId, url: reader.result, name:pictureName.val()})
                        })
                    }, false);

                    if (file) {
                        reader.readAsDataURL(file);
                    }
                });

                pictureFile.append($('<span>Upload picture</span>'));
                uploadLabel.append(pictureFile);
                createPictureDiv.append(nameLabel, pictureName, uploadLabel);
                $(this).parent().empty().append(createPictureDiv);
            });


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





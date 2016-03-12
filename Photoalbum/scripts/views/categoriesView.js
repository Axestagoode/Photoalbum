var app = app || {};

app.categoriesView = (function() {
    function CategoriesView(selector, data, controller) {
        $.get('templates/categories.html', function(template) {
            var output = Mustache.render(template, data);

            $(selector).html(output);
        })
            .then(function(){
                $('a[href="#/Pictures-by-category"]').click(function(event){
                    var div = event.target,
                        $div = $(div),
                        category = $div.attr("id");

                    $.ajax({
                        method: "GET",
                        headers: {
                            "Authorization": "Basic cGVzaG86MTIzNDU2"
                        },

                        url: 'https://baas.kinvey.com/appdata/kid_W1-EIBMS1W/categories/?query={"name":' + '"' +category + '"}'
                    }).success(function(data) {
                        var categoryId = data[0]._id;
                        $.ajax({
                            method: "GET",
                            headers: {
                                "Authorization": "Basic cGVzaG86MTIzNDU2"
                            },

                            url: 'https://baas.kinvey.com/appdata/kid_W1-EIBMS1W/pictures/?query={"category._id":' + '"' +categoryId + '"}'
                        }).success(function(data) {
                            //$.get('templates/pictures.html', function(template) {
                            //    var output = Mustache.render(template, data);
                            //
                            //    $('#wrapper').html(output);
                            //})

                            var ul = $('<ul>');
                            var h2 = $('<h2>');
                            h2.text(category);
                            ul.append(h2);
                            data.forEach(function(picture){
                                var li = $('<li>');
                                li.attr('id', picture._id);
                                var nameDiv = $('<div>');
                                nameDiv.text(picture.name);
                                var img = $('<img>');
                                img.attr('src', picture.url);
                                img.attr('width', 300);
                                img.attr('height', 200);
                                var authorDiv = $('<div>');
                                authorDiv.text('Author:' + picture.author);
                                var span = $('<span>');
                                span.html('<img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcScbfEp6KAd1T9ZgOXLt4BF_pyX5rvHh-QWU87FCs7qqVlm0VTJ">');
                                authorDiv.append(span);
                                var likesDiv = $('<div>');
                                likesDiv.text('Likes:' + picture.likes);
                                var commentsDiv = $('<div>');
                                commentsDiv.text('Comments:' + picture.comments.length);

                                li.append(nameDiv);
                                li.append(img);
                                li.append(authorDiv);
                                li.append(likesDiv);
                                li.append(commentsDiv);
                                li.append($('<br/>'));
                                ul.append(li)
                            });

                            $('#wrapper').html(ul)

                        }).error(function() {
                            console.log('Cannot load pictures.');
                        })

                    }).error(function() {
                        console.log('Cannot load category.');
                    })



                });

            })
    }

    return {
        load: function (selector, data) {
            return new CategoriesView(selector, data);
        }
    }
}());

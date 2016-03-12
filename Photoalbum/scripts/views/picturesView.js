var app = app || {};

app.picturesView = (function() {

    function PicturesView(selector, data) {
        $.get('templates/pictures.html', function(template) {
            var output = Mustache.render(template, data);

            $(selector).html(output);

            var likes = $('span img');
            likes.click(likeClicked);

            function likeClicked() {
                var id = $(this).parent()
                    .parent()
                    .parent()
                    .attr('id');

                $.ajax({
                    method: "GET",
                    headers: {
                        "Authorization": "Basic cGVzaG86MTIzNDU2"
                    },

                    url: "https://baas.kinvey.com/appdata/kid_W1-EIBMS1W/pictures/" + id
                }).success(function(data) {
                    var picture = data;
                    picture.likes += 1;
                    console.log(picture.likes);
                    $.ajax({
                        method: "PUT",
                        headers: {
                            "Authorization": "Basic cGVzaG86MTIzNDU2",
                            "Content-Type": "application/json"
                        },

                        data : JSON.stringify(picture),
                        url: "https://baas.kinvey.com/appdata/kid_W1-EIBMS1W/pictures/" + id,
                        success: votedSuccessfully,
                        error: ajaxError

                    });
                }).error(function() {
                    alert('Cannot load pictures.');
                })
            }

            function votedSuccessfully() {
                noty({
                        text: 'Voting successfully!',
                        layout: 'topCenter',
                        timeout: 2000}
                );
            }

            function ajaxError() {
                noty({
                        text: 'Cannot load AJAX data.',
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 5000}
                );
            }
        })
    }

    return {
        load: function (selector, data) {
            return new PicturesView(selector, data);
        }
    }
}());

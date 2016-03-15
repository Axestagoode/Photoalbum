var app = app || {};

app.pictureViews = (function() {
    var _this = this;
    function showPictures(selector, data) {
        $.get('templates/pictures.html', function(templ){
            var outputHtml = Mustache.render(templ, data);
            $(selector).html(outputHtml);

            //var likes = $('span img');
            //likes.click(likeClicked);

            $('.vote').on('click', likeClicked);

            function likeClicked() {
                var id = $(this).parent()
                    .parent()
                    .parent()
                    .attr('id');
                var categoryId = $('.catId').text();

                $.ajax({
                    method: "GET",
                    headers: {
                        "Authorization": "Basic cGVzaG86MTIzNDU2"
                    },

                    url: "https://baas.kinvey.com/appdata/kid_W1-EIBMS1W/pictures/" + id
                }).success(function(data) {
                    var picture = data;
                    var userId = sessionStorage.userId;

                    if(localStorage[picture._id] != userId){
                        localStorage.setItem(picture._id, userId);
                        picture.likes += 1;
                        $.ajax({
                            method: "PUT",
                            headers: {
                                "Authorization": "Basic cGVzaG86MTIzNDU2",
                                "Content-Type": "application/json"
                            },

                            data : JSON.stringify(picture),
                            url: "https://baas.kinvey.com/appdata/kid_W1-EIBMS1W/pictures/" + id,
                            success: votedSuccessfully(picture._id, picture.likes),
                            error: ajaxError
                        });
                    } else{
                        alreadyVoted();
                    }

                }).error(function() {
                    console.log('Cannot load pictures.');
                })
            }

            function votedSuccessfully(pictureId, likes) {
                noty({
                        text: 'Voting successfully!',
                        layout: 'topCenter',
                        timeout: 2000}
                );
                var likeSpan = $('span[data-id *=' + pictureId + ']');
                likeSpan.text(likes);
            }

            function alreadyVoted() {
                noty({
                        text: 'You have voted already!',
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 2000}
                );
            }

            function ajaxError() {
                //noty({
                //        text: 'Cannot load AJAX data.',
                //        type: 'error',
                //        layout: 'topCenter',
                //        timeout: 5000}
                //);
                console.log('Cannot load AJAX data.')
            }

            $('.enlarge').on('click', function() {
                var parent = $(this).parent(),
                    pictureId = parent.attr("id");

                $.sammy(function () {
                    this.trigger('enlarge-picture', {parent: parent, pictureId: pictureId})
                })
            });
        });
    }

    function enlargePicture(selector, data) {
        $.get('templates/picture-details.html', function(templ){
            var outputHtml = Mustache.render(templ, data);
            $(selector).html(outputHtml);
        });
    }

    return {
        load: function() {
            return {
                showPictures: showPictures,
                enlargePicture: enlargePicture
            }
        }
    }
}());

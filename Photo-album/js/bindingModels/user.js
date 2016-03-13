var User = (function() {
    function User (username, email, id) {
        this.username = username;
        this.email = email;
        this._id = id;
    }

    return User
}());

//var $users = $(".User");
///* LOADING USERS */
//
//fetch_users(function success_callback(users) {
//
//    var $all_users = $("<ul>").addClass("users_content");
//
//    $.each(users, function(i, user) {
//        var $name = $("<p>").html(user.username);
//        var $email = $("<p>").html(user.email);
//        var $id = $("<p>").html(user.id);
//        var $user = $("<li>")
//            .data("id", user.id)
//            .append($name)
//            .append($email)
//            .append($id);
//
//        $all_users.append($user);
//    });
//    $users.append($all_users);
//});

var app = app || {};

(function (scope) {

    scope.base64EncodePicture = function () {

        $('input[type=file]').change(getFile);

        function getFile() {
            var reader = new FileReader(),
                file = this.files[0];

            reader.readAsDataURL(file);
        }
    }

})(app);

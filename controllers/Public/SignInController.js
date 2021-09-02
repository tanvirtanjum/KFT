$(document).ready(function () {
    var base_URL = "http://127.0.0.1:5500";

    $('#topLayout').load("../Layouts/_SharedLayout.html");
        
    // $('#msg').attr('hidden', 'hidden'); //Also Works
    $('#msg').attr('hidden', true);
    // $('#msg').removeAttr('hidden'); //For Remove
});
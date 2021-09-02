$(document).ready(function () {
    var base_URL = "http://127.0.0.1:5500";

    $('#homeTab').attr("href", base_URL+"/views/Public/Home.html");
    $('#loginTab').attr("href", base_URL+"/views/Public/SignIn.html");
});
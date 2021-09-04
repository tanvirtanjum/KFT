$(document).ready(function () {
    var base_URL = "http://127.0.0.1:5500";

    $('#homeTab').attr("href", base_URL+"/views/Public/Home.html");
    $('#kftTrustTab').attr("href", base_URL+"/views/Public/AboutKFTTrust.html");
    $('#kftSchoolTab').attr("href", base_URL+"/views/Public/AboutKFTCollegiateSchool.html");

    $('#conatctTab').attr("href", base_URL+"/views/Public/ContactUs.html");
    $('#loginTab').attr("href", base_URL+"/views/Public/SignIn.html");
});
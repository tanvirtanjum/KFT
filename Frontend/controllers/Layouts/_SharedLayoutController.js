$(document).ready(function () {
    var base_URL = "http://127.0.0.1:5500";
    var api_base_URL = "http://localhost:3000";

    $('#homeTab').attr("href", base_URL+"/views/Public/Home.html");
    $('#kftTrustTab').attr("href", base_URL+"/views/Public/AboutKFTTrust.html");
    $('#kftSchoolTab').attr("href", base_URL+"/views/Public/AboutKFTCollegiateSchool.html");

    $('#admissionTab').attr("href", base_URL+"/views/Public/Admission.html");
    $('#conatctTab').attr("href", base_URL+"/views/Public/ContactUs.html");
    $('#loginTab').attr("href", base_URL+"/views/Public/SignIn.html");
});
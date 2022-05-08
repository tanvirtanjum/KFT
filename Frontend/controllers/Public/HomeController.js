$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#topLayout').load("../Layouts/_SharedLayout.html");
    $('#bottomLayout').load("../Layouts/_BottomLayout.html");

    var first = '<p class="h2" style="color: #f2f5f3;">KFT-Hazi Abdul Kader Molla-Fatema Begum Trust</p>'+
                '<i class="h6" style="color: #e1e3e1;">"Dream for a better society"</i>';

    var second = '<p class="h2" style="color: #f2f5f3;">KFT Collegiate School</p>'+ 
                 '<i class="h6" style="color: #e1e3e1;">"Faith | Confidence | Integrity | Creativity"</i>';

    var third = '<p class="h2" style="color: #f2f5f3;">কেএফটি-হাজী আব্দুল কাদের মোল্লা-ফাতেমা বেগম ট্রাস্ট</p>'+ 
                '<i class="h6" style="color: #e1e3e1;">"একটি উন্নত সমাজের স্বপ্ন"</i>';

    var fourth = '<p class="h2" style="color: #f2f5f3;">কেএফটি কলেজিয়েট স্কুল</p>'+ 
                 '<i class="h6" style="color: #e1e3e1;">"বিশ্বাস | আত্মবিশ্বাস | অখণ্ডতা | সৃজনশীলতা"</i>';


    $('#writeSection').typer([first, second, third, fourth]);
});
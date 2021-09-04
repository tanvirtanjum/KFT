$(document).ready(function () {
    var base_URL = "http://127.0.0.1:5500";

    var first = '<p class="h1" id="tittleName">KFT-Hazi Abdul Kader Molla-Fatema Begum Trust</p> <i id="mottoText">"Dream for a better society"</i>';
    var second = '<p class="h1" id="tittleName">KFT Collegiate School</p> <i id="mottoText">"Faith | Confidence | Integrity | Creativity"</i>';
    var third = '<p class="h1" id="tittleName">কেএফটি-হাজী আব্দুল কাদের মোল্লা-ফাতেমা বেগম ট্রাস্ট</p> <i id="mottoText">"একটি উন্নত সমাজের স্বপ্ন"</i>';
    var fourth = '<p class="h1" id="tittleName">কেএফটি কলেজিয়েট স্কুল</p> <i id="mottoText">"বিশ্বাস | আত্মবিশ্বাস | অখণ্ডতা | সৃজনশীলতা"</i>';

    $('#topLayout').load("../Layouts/_SharedLayout.html");

    // $("#tittleName").typer(['KFT-Hazi Abdul Kader Molla-Fatema Begum Trust', 'KFT Collegiate School', 'কেএফটি কলেজিয়েট স্কুল']);
    // $("#mottoText").typer(['"Dream for a better society"', '"Faith | Confidence | Integrity | Creativity"', '"বিশ্বাস | আত্মবিশ্বাস | অখণ্ডতা | সৃজনশীলতা"']);
    $('#writeSection').typer([first, second, third, fourth]);
});
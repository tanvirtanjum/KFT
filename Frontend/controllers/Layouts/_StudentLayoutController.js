$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#homeTab').attr("href", base_URL+"/views/Public/Home.html");
    $('#dashboardTab').attr("href", base_URL+"/views/Student/Dashboard.html");
    $('#changepassTab').attr("href", base_URL+"/views/Common/ChangePassword.html");
    $('#profileTab').attr("href", base_URL+"/views/Student/Profile.html");
    $('#classTab').attr("href", base_URL+"/views/Student/Classroom.html");
    $('#resultTab').attr("href", base_URL+"/views/Student/Result.html");
    

    function activeSection()
    {
        if(window.location.href == base_URL+"/views/Student/Dashboard.html")
        {
            $('#dashboardTab').addClass("active");
            $('#settingTab').removeClass("active");
            $('#classTab').removeClass("active");
            $('#resultTab').removeClass("active");
        }
        if(window.location.href == base_URL+"/views/Common/ChangePassword.html"|| window.location.href == base_URL+"/views/Student/Profile.html")
        {
            $('#settingTab').addClass("active");
            $('#dashboardTab').removeClass("active");
            $('#classTab').removeClass("active");
            $('#resultTab').removeClass("active");
        }
        if(window.location.href == base_URL+"/views/Student/Classroom.html")
        {
            $('#classTab').addClass("active");
            $('#settingTab').removeClass("active");
            $('#dashboardTab').removeClass("active");
            $('#resultTab').removeClass("active");
        }
        if(window.location.href == base_URL+"/views/Student/Result.html")
        {
            $('#resultTab').addClass("active");
            $('#settingTab').removeClass("active");
            $('#classTab').removeClass("active");
            $('#dashboardTab').removeClass("active");
        }
    }

    activeSection();

    var decryptLocal = function(secret) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(secret, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        return decryptLoginInfo;
    }

    var userLogout = function () {
        // var decryptLoginInfo = decryptLocal(localStorage.getItem('loginInfo'));

        $.ajax({
            url: api_base_URL+"/api/logins/authenticated-user/logout",
            method: "GET",
            // headers: {
            //     role : decryptLoginInfo.role_id,
            // },
            
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    localStorage.clear();

                    window.location.href = base_URL+"/views/Public/SignIn.html";
                   
                }
                else {
                    alert(data['data']);
                }
            }
        });
    }

    $("#logoutTab").click(function () {
        userLogout();
    });
});
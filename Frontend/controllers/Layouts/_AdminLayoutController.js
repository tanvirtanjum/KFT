$(document).ready(function () {
    var base_URL = "http://127.0.0.1:5500";
    var api_base_URL = "http://localhost:3000";

    $('#homeTab').attr("href", base_URL+"/views/Public/Home.html");
    $('#dashboardTab').attr("href", base_URL+"/views/Admin/Dashboard.html");
    $('#changepassTab').attr("href", base_URL+"/views/Common/ChangePassword.html");
    

    function activeSection()
    {
        if(window.location.href == base_URL+"/views/Admin/Dashboard.html")
        {
            $('#dashboardTab').addClass("active");
            $('#settingTab').removeClass("active");
            // $('#academicOptionTab').removeClass("active");
            // $('#admissionTab').removeClass("active");
            // $('#conatctTab').removeClass("active");
            // $('#noticeTab').removeClass("active");
            // $('#loginTab').removeClass("active");
        }
        if(window.location.href == base_URL+"/views/Common/ChangePassword.html")
        {
            $('#settingTab').addClass("active");
            $('#dashboardTab').removeClass("active");
            // $('#academicOptionTab').removeClass("active");
            // $('#admissionTab').removeClass("active");
            // $('#conatctTab').removeClass("active");
            // $('#noticeTab').removeClass("active");
            // $('#loginTab').removeClass("active");
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
        var decryptLoginInfo = decryptLocal(localStorage.getItem('loginInfo'));

        $.ajax({
            url: api_base_URL+"/api/logins/authenticated-user/logout",
            method: "GET",
            headers: {
                role : decryptLoginInfo.role_id,
            },
            
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
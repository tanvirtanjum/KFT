$(document).ready(function () {
    var base_URL = "http://127.0.0.1:5500";
    var api_base_URL = "http://localhost:3000";

    $('#topLayout').load("../Layouts/_SharedLayout.html");
    $('#bottomLayout').load("../Layouts/_BottomLayout.html");
        
    $('#msg').attr('hidden', true);

    var validateLogin = function() {
        var validate = true;
        if($.trim($("#email").val()).length <= 0)
        {
            validate = false;
            $("#email").addClass("is-invalid");
        }
        else
        {
            $("#email").removeClass("is-invalid");
        }
        if($.trim($("#password").val()).length <= 0)
        {
            validate = false;
            $("#password").addClass("is-invalid");
        }
        else
        {
            $("#password").removeClass("is-invalid");
        }

        return validate;
    }

    var userLogin = function () {
        $.ajax({
            url: api_base_URL+"/api/logins/get-user-authentication",
            method: "POST",
            data: {
                email : $("#email").val(),
                password : $("#password").val(),
            },
            
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    localStorage.loginInfo = CryptoJS.AES.encrypt(JSON.stringify(data), '333');
                    // var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
                    // decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
                    // decryptLoginInfo = JSON.parse(decryptLoginInfo);
                    // alert(decryptLoginInfo);

                    $('#msg').attr('hidden', true);

                    //USER TYPE WISE REDIRECTION
                   
                }
                else {
                    var data = xhr.responseJSON;
                    $('#msg').removeAttr('hidden');
                    alert(data['data']);
                }
            }
        });
    }

    $("#loginBTN").click(function () {
        if(validateLogin())
        {
            userLogin();
        }
    });
});
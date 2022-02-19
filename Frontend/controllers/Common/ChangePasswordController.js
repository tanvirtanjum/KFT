$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    // $('#topLayout').load("../Layouts/_SharedLayout.html");
    $('#bottomLayout').load("../Layouts/_BottomLayout.html");
        
    $('#msg').attr('hidden', true);

    $('#recoverLink').attr("href", base_URL+"/views/Public/RecoverPassword.html");

    var redirect = function(role) {
        if(role == null)
        {
            window.location.href = base_URL+"/views/Public/SignIn.html";
        }
        if(role == 1)
        {
            window.location.href = base_URL+"/views/Admin/Dashboard.html";
        }
        if(role == 2)
        {
            window.location.href = base_URL+"/views/Teacher/Dashboard.html";
        }
        if(role == 3)
        {
            window.location.href = base_URL+"/views/Student/Dashboard.html";
        }       
    }

    var loadLayout = function(role) {
        if(role == null)
        {
            redirect(null);
        }
        if(role == 1)
        {
            $('#topLayout').load("../Layouts/_AdminLayout.html");
        }
        if(role == 2)
        {
            $('#topLayout').load("../Layouts/_TeacherLayout.html");
        }
        if(role == 3)
        {
            $('#topLayout').load("../Layouts/_StudentLayout.html");
        }
    }
    
    var checkLocalStorage = function() {
        if(localStorage.getItem('loginInfo') === null) 
        {
            redirect(null);
        }
        else
        {
            var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);
            
            loadLayout(decryptLoginInfo.role_id);
        }
    }

    checkLocalStorage();

    var validatePassword = function() {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var validate = true;

        if($.trim($("#oldpass").val()).length <= 0 || $("#oldpass").val() != decryptLoginInfo.password)
        {
            validate = false;
            $("#oldpass").addClass("is-invalid");
        }
        else
        {
            $("#oldpass").removeClass("is-invalid");
        }
        if($.trim($("#newpass").val()).length <= 6)
        {
            validate = false;
            $("#newpass").addClass("is-invalid");
        }
        else
        {
            $("#newpass").removeClass("is-invalid");
        }
        if($.trim($("#conpass").val()).length <= 6 || $("#conpass").val() != $("#newpass").val())
        {
            validate = false;
            $("#conpass").addClass("is-invalid");
        }
        else
        {
            $("#conpass").removeClass("is-invalid");
        }

        if(validate)
        {
            validate = confirm("You have to login again with your new password on password change. Agree?");
        }

        return validate;
    }

    var changePassword = function () {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/logins/update-user-authentication-password",
            method: "PUT",
            data: {
                id : decryptLoginInfo.id,
                password : $("#newpass").val(),
            },
            headers: {
                role : decryptLoginInfo.role_id,
            },
            
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data[0].changedRows >= 1)
                    {
                        localStorage.clear();

                        //LOGOUT
                        redirect(null);
                    }
                    else
                    {
                        $('#msg').removeAttr('hidden');
                    }
                   
                }
                else {
                    $('#msg').removeAttr('hidden');
                }
            }
        });
    }

    $("#proccedBTN").click(function () {
        if(validatePassword())
        {
            changePassword();
        }
    });
});
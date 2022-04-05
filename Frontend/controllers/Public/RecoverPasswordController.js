$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#topLayout').load("../Layouts/_SharedLayout.html");
    $('#bottomLayout').load("../Layouts/_BottomLayout.html");
        
    $('#msg').attr('hidden', true);

    $('#loginLink').attr("href", base_URL+"/views/Public/SignIn.html");

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

        return validate;
    }

    var recoverPassword = function () {
        $.ajax({
            url: api_base_URL+"/api/logins/get-user-authentication-password",
            method: "POST",
            data: {
                email : $("#email").val(),
            },
            
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    $("#msg").removeClass("alert-danger");
                    $("#msg").addClass("alert-success");
                    $('#msg').html('<small><b>'+data["data"]+'</b></small>');
                    $('#msg').removeAttr('hidden');
                   
                }
                else {
                    var data = xhr.responseJSON;
                    $("#msg").removeClass("alert-success");
                    $("#msg").addClass("alert-danger");
                    $('#msg').html('<small><b>Something went wrong.<br>Check if valid email and try again.</b></small>');
                    $('#msg').removeAttr('hidden');
                }
            }
        });
    }

    $("#proccedBTN").click(function () {
        $('#msg').attr('hidden', true);
        if(validateLogin())
        {
            recoverPassword();
        }
    });
});
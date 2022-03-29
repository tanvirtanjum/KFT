$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#topLayout').load("../Layouts/_TeacherLayout.html");
    $('#bottomLayout').load("../Layouts/_BottomLayout.html");

    var redirect = function(role) {
        if(role == null)
        {
            window.location.href = base_URL+"/views/Public/Home.html";
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
    
    var checkLocalStorage = function() {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        if(localStorage.loginInfo != null && decryptLoginInfo.role_id == 2) 
        {

        }
        else
        {   
            redirect(null);
        }
    }

    checkLocalStorage();



    var LoadProfile = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/teachers/get-teacher/login/"+decryptLoginInfo.id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#name').html(data.name);
                   $('#sex').html(data.sex);
                   $('#rel').html(data.religion);
                   $('#fname').html(data.father_name);
                   $('#mname').html(data.mother_name);
                   $('#contact').html(data.contact);
                   $('#email').html(data.email);
                   $('#bg').html(data.bg);
                   $('#pra').html(data.present_address);
                   $('#pea').html(data.permanent_address);
                   $('#designation').html("Teacher");
                   $('#salary').html(data.salary);
                   $('#file').html(data.file_no);
                   $('#avater').attr('src', api_base_URL+"/"+data.img_path);
                }
                else {}
            }
        });
    }

    LoadProfile();

});
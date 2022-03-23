$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#topLayout').load("../Layouts/_AdminLayout.html");
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

        if(localStorage.loginInfo != null && decryptLoginInfo.role_id == 1) 
        {

        }
        else
        {   
            redirect(null);
        }
    }

    checkLocalStorage();

    var LoadAllSessionStatusOptions = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/session_status/get-all-status",
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '';

                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += '<option value="'+data[i].id+'">'+data[i].status_name+'</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#session_statusP").html(str);
                    $("#session_statusU").html(str);
                }
                else 
                {
                    str += "";
                    $("#session_statusP").html(str);
                    $("#session_statusU").html(str);
                }
            }
        });
    }
    LoadAllSessionStatusOptions();

    var LoadAllSessions = function(){
        $.ajax({
            url: api_base_URL+"/api/academic_sessions/get-all-session",
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '';
                    var sl = 1;
                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += "<tr>"+
                                        "<th>"+ sl + "</th>"+
                                        "<td>"+ data[i].year_name  +"</td>"+
                                        "<td>"+ data[i].status_name  +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateAcademicSessionModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i></button></td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#sesssionTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                    $("#sesssionTable tbody").html(str);
                }
            }
        });
    }
    LoadAllSessions();

    var InsertSession = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/academic_sessions/insert-session",
            method: "POST",
            data : {
                year_name: $('#year_nameP').val(),
                session_status_id: $('#session_statusP').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    LoadAllSessions();

                    alert("Session Inserted");
                }
                else 
                {
                    alert("Something Went Wrong");
                }
            }
        });
    }

    var validateSessionInsert= function() {
        var validate = true;
        if($.trim($('#year_nameP').val()).length <= 0)
        {
            validate = false;
            $('#year_nameP').addClass("is-invalid");
        }
        else
        {
            $("#year_nameP").removeClass("is-invalid");
        }

        return validate;
    }

    $("#addSessionBTN").click(function () {
        if(validateSessionInsert())
        {
            InsertSession();
        }
        else
        {

        }
    });

    var LoadAllSessionsByName = function (name) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            $.ajax({
                url: api_base_URL+"/api/academic_sessions/get-all-session/"+name,
                method: "GET",
                headers : {
                    role : decryptLoginInfo.role_id,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        var data = xhr.responseJSON;
    
                        var str = '';
                        var sl = 1;
                        if(data.length > 0)
                        {
                            for (var i = 0; i < data.length; i++) 
                            {
                                str += "<tr>"+
                                            "<th>"+ sl + "</th>"+
                                            "<td>"+ data[i].year_name  +"</td>"+
                                            "<td>"+ data[i].status_name  +"</td>"+
                                            "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateAcademicSessionModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i></button></td>"+
                                    "</tr>";
                                sl++;
                            }
                        }
                        else
                        {
                            str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                        }
    
                        $("#sesssionTable tbody").html(str);
                    }
                    else 
                    {
                        str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                        $("#sesssionTable tbody").html(str);
                    }
                }
            });
    }
    $("#search").on("keyup change",function(){
        if($.trim($("#search").val()).length > 0)
        {
            LoadAllSessionsByName($("#search").val());
        }
        else
        {
            LoadAllSessions();
        }
    });

    var LoadSession = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/academic_sessions/get-session/"+id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#id_u').val(data.id);
                   $('#year_nameU').val(data.year_name);
                   $('#session_statusU').val(data.session_status_id);
                }
                else {}
            }
        });
    }

    $('#updateAcademicSessionModal').on('show.bs.modal', function(e) {
        $('#msgU').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadSession(id);
    });

    var UpdateSession = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/academic_sessions/update-session/"+id,
            method: "PUT",
            data : {
                year_name: $('#year_nameU').val(),
                session_status_id: $('#session_statusU').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    LoadAllSessions();
                    LoadSession($('#id_u').val());

                    alert("Session Updated");
                }
                else 
                {
                    LoadAllSessions();
                    LoadSession($('#id_u').val());
                    alert("Something Went Wrong");
                }
            }
        });
    }

    var validateSessionUpdate= function() {
        var validate = true;
        if($.trim($('#year_nameU').val()).length <= 0)
        {
            validate = false;
            $('#year_nameU').addClass("is-invalid");
        }
        else
        {
            $("#year_nameU").removeClass("is-invalid");
        }

        return validate;
    }

    $("#updateSessionBTN").click(function () {
        if(validateSessionUpdate())
        {
            UpdateSession($('#id_u').val());
        }
        else
        {

        }
    });


    




    


    

    var UpdateTeacherAccess = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var access_id = 1;
        var role = $('#roleU4').val();

        if($('#accessU4').val() == 1)
        {
            access_id = 2;

        }
        else
        {
            access_id = 1;
        }

        $.ajax({
            url: api_base_URL+"/api/logins/update-user-authentication-role",
            method: "PUT",
            data: {
                id: $('#idU4').val(),
                role_id: role,
                access_id: access_id,
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                // console.log($('#nemailU2').val()+"   "+ $('#idu3').val())
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        $("#msgU4").removeClass("alert-danger");
                        $("#msgU4").addClass("alert-success");
                        $('#msgU4').html('<small>Role Updated.</small>');
                        $('#msgU4').removeAttr('hidden');
                    }
                    else 
                    {
                        $("#msgU4").removeClass("alert-success");
                        $("#msgU4").addClass("alert-danger");
                        $('#msgU4').html('<small>Something Went Wrong.</small>');
                        $('#msgU4').removeAttr('hidden');
                    }
                }
                else 
                {
                    $("#msgU4").removeClass("alert-success");
                    $("#msgU4").addClass("alert-danger");
                    $('#msgU4').html('<small>Something Went Wrong.</small>');
                    $('#msgU4').removeAttr('hidden');
                }
                LoadAllTeachers();
                LoadTeacher($('#id').val());
                LoadTeacherImage($('#id').val());
                LoadTeacherLoginDetails($('#idu3').val());
                LoadTeacherLoginDetails2($('#idU4').val());
            }
        });
    }

    $("#updateRoleBTN").click(function () {
        UpdateTeacherAccess();
    });

    var loadAllTeachersByEmail = function (email) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            $.ajax({
                url: api_base_URL+"/api/logins/checkemail/"+email,
                method: "GET",
                headers : {
                    role : decryptLoginInfo.role_id,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        var data = xhr.responseJSON;

                        $('#nemailU2').addClass("is-invalid");
                    }
                    
                    else {
                        $('#nemailU2').removeClass("is-invalid");
                    }
                }
            });
    }
    $("#nemailU2").on("keyup change",function(){
        if($.trim($("#nemailU2").val()).length > 0)
        {
            $('#nemailU2').removeClass("is-invalid");
            loadAllTeachersByEmail($("#nemailU2").val());
        }
        else
        {
            $('#nemailU2').addClass("is-invalid");
        }
    });

    var UpdateTeacherEmail = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);


        $.ajax({
            url: api_base_URL+"/api/logins/update-user-authentication-email",
            method: "PUT",
            data: {
                id: $('#idu3').val(),
                email: $('#nemailU2').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                console.log($('#nemailU2').val()+"   "+ $('#idu3').val())
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        $("#msgU3").removeClass("alert-danger");
                        $("#msgU3").addClass("alert-success");
                        $('#msgU3').html('<small>Email Updated.</small>');
                        $('#msgU3').removeAttr('hidden');
                    }
                    else 
                    {
                        alert("this")
                        $("#msgU3").removeClass("alert-success");
                        $("#msgU3").addClass("alert-danger");
                        $('#msgU3').html('<small>Something Went Wrong.</small>');
                        $('#msgU3').removeAttr('hidden');
                    }
                }
                else 
                {
                    $("#msgU3").removeClass("alert-success");
                    $("#msgU3").addClass("alert-danger");
                    $('#msgU3').html('<small>Something Went Wrong.</small>');
                    $('#msgU3').removeAttr('hidden');
                }
                LoadAllTeachers();
                LoadTeacher($('#id').val());
                LoadTeacherImage($('#id').val());
                LoadTeacherLoginDetails($('#idu3').val());
            }
        });
    }

    $("#updateEmailBTN").click(function () {
        if($('#nemailU2').hasClass("is-invalid"))
        {
            $('#nemailU2').addClass("is-invalid");
        }
        else
        {
            UpdateTeacherEmail();
        }
    });

    var UpdateTeacherImage = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var data = new FormData($('#uploadForm')[0]);

        $.ajax({
            url: api_base_URL+"/api/teachers/update-teacher-image/"+id,
            method: "PUT",
            contentType: false,
            processData: false,
            cache: false,
            data: data,
            headers : {
                role : decryptLoginInfo.role_id,
                path: $('#pathU2').val(),
            },
            complete: function (xhr, status) {
                console.log(xhr)
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        $("#msgU2").removeClass("alert-danger");
                        $("#msgU2").addClass("alert-success");
                        $('#msgU2').html('<small>Image Updated.</small>');
                        $('#msgU2').removeAttr('hidden');
                    }
                    else 
                    {
                        $("#msgU2").removeClass("alert-success");
                        $("#msgU2").addClass("alert-danger");
                        $('#msgU2').html('<small>Something Went Wrong.</small>');
                        $('#msgU2').removeAttr('hidden');
                    }
                }
                else 
                {
                    $("#msgU2").removeClass("alert-success");
                    $("#msgU2").addClass("alert-danger");
                    $('#msgU2').html('<small>Something Went Wrong.</small>');
                    $('#msgU2').removeAttr('hidden');
                }
                LoadAllTeachers();
                LoadTeacher(id);
                LoadTeacherImage(id);
            }
        });
    }

    $("#updateImageBTN").click(function () {
        UpdateTeacherImage($('#id2').val());
    });

    var validateTeacherUpdate= function() {
        var validate = true;
        if($.trim($('#nameU').val()).length <= 0)
        {
            validate = false;
            $('#nameU').addClass("is-invalid");
        }
        else
        {
            $("#nameU").removeClass("is-invalid");
        }

        if($.trim($("#fatherU").val()).length <= 0)
        {
            validate = false;
            $("#fatherU").addClass("is-invalid");
        }
        else
        {
            $("#fatherU").removeClass("is-invalid");
        }

        if($.trim($("#motherU").val()).length <= 0)
        {
            validate = false;
            $("#motherU").addClass("is-invalid");
        }
        else
        {
            $("#motherU").removeClass("is-invalid");
        }

        if($.trim($("#contactU").val()).length <= 10)
        {
            validate = false;
            $("#contactU").addClass("is-invalid");
        }
        else
        {
            $("#contactU").removeClass("is-invalid");
        }

        if($.trim($("#pradU").val()).length <= 0)
        {
            validate = false;
            $("#pradU").addClass("is-invalid");
        }
        else
        {
            $("#pradU").removeClass("is-invalid");
        }

        if($.trim($("#peadU").val()).length <= 0)
        {
            validate = false;
            $("#peadU").addClass("is-invalid");
        }
        else
        {
            $("#peadU").removeClass("is-invalid");
        }

        if($("#salaryU").val() <= 0)
        {
            validate = false;
            $("#salaryU").addClass("is-invalid");
        }
        else
        {
            $("#salaryU").removeClass("is-invalid");
        }

        if($.trim($("#fileU").val()).length <= 0)
        {
            validate = false;
            $("#fileU").addClass("is-invalid");
        }
        else
        {
            $("#fileU").removeClass("is-invalid");
        }

        if(!validate)
        {
            $('#msgU').attr('hidden', true);
        }

        return validate;
    }

    var UpdateTeacher = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/teachers/update-teacher/"+id,
            method: "PUT",
            data : {
                id: $('#id').val(),
                name: $('#nameU').val(),
                sex: $('#sexU').val(),
                religion: $('#relU').val(),
                father_name: $('#fatherU').val(),
                mother_name: $('#motherU').val(),
                contact: $('#contactU').val(),
                bg: $('#bgU').val(),
                present_address: $('#pradU').val(),
                permanent_address: $('#peadU').val(),
                subject_id: $('#designU').val(),
                salary: $('#salaryU').val(),
                file_no: $('#fileU').val(),
                employment_status_id: $('#statusU').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        $("#msgU").removeClass("alert-danger");
                        $("#msgU").addClass("alert-success");
                        $('#msgU').html('<small>Information Updated.</small>');
                        $('#msgU').removeAttr('hidden');
                    }
                    else 
                    {
                        $("#msgU").removeClass("alert-success");
                        $("#msgU").addClass("alert-danger");
                        $('#msgU').html('<small>Something Went Wrong.</small>');
                        $('#msgU').removeAttr('hidden');
                    }
                }
                else 
                {
                    $("#msgU").removeClass("alert-success");
                    $("#msgU").addClass("alert-danger");
                    $('#msgU').html('<small>Something Went Wrong.</small>');
                    $('#msgU').removeAttr('hidden');
                }
                LoadAllTeachers();
                LoadTeacher(id);
                LoadTeacherImage(id);
            }
        });
    }

    $("#updateBTN").click(function () {
        if(validateTeacherUpdate())
        {
            UpdateTeacher($('#id').val());
        }
    });



    var loadAllTeachersByEmail2 = function (email) {
        var result = true;
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            $.ajax({
                url: api_base_URL+"/api/logins/checkemail/"+email,
                method: "GET",
                headers : {
                    role : decryptLoginInfo.role_id,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        var data = xhr.responseJSON;

                        result = true;

                        $('#emailP').addClass("is-invalid");
                    }
                    
                    else {

                        result = false;
                        $('#emailP').removeClass("is-invalid");
                    }
                }
            });

            return result;
    }
    $("#emailP").on("keyup change",function(){
        if($.trim($("#emailP").val()).length > 0)
        {
            $('#emailP').removeClass("is-invalid");
            loadAllTeachersByEmail2($("#emailP").val());
        }
        else
        {
            $('#emailP').addClass("is-invalid");
        }
    });

    var loadAllTeachersByContact2 = function (contact) {
        var result = true;
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            $.ajax({
                url: api_base_URL+"/api/teachers/checkcontact/"+contact,
                method: "GET",
                headers : {
                    role : decryptLoginInfo.role_id,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        var data = xhr.responseJSON;

                        $('#contactP').addClass("is-invalid");
                        result = true;
                    }
                    
                    else {
                        $('#contactP').removeClass("is-invalid");
                        result = false;
                    }
                }
            });

            return result;
    }
    $("#contactP").on("keyup change",function(){
        if($.trim($("#contactP").val()).length > 0)
        {
            $('#emailP').removeClass("is-invalid");
            loadAllTeachersByContact2($("#contactP").val());
        }
        else
        {
            $('#contactP').addClass("is-invalid");
        }
    });

    var loadAllTeachersByFileNo2 = function (fileno) {
        var result = true;
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            $.ajax({
                url: api_base_URL+"/api/teachers/checkfileno/"+fileno,
                method: "GET",
                headers : {
                    role : decryptLoginInfo.role_id,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        var data = xhr.responseJSON;

                        $('#fileP').addClass("is-invalid");
                        result = true;
                    }
                    
                    else {
                        $('#fileP').removeClass("is-invalid");
                        result = false;
                    }
                }
            });

            return result;
    }
    $("#fileP").on("keyup change",function(){
        if($.trim($("#fileP").val()).length > 0)
        {
            $('#fileP').removeClass("is-invalid");
            loadAllTeachersByFileNo2($("#fileP").val());
        }
        else
        {
            $('#fileP').addClass("is-invalid");
        }
    });
   

});
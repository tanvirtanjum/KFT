$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#topLayout').load("../Layouts/_AdminLayout.html");
    $('#bottomLayout').load("../Layouts/_BottomLayout.html");

    $('#msg').attr('hidden', true);
    $('#msgP').attr('hidden', true);

    $("#msgI").addClass("alert-info");
    $('#msgI').html('<small>You will be able to attach files after posting the circular.</small>');
    $('#msgI').removeAttr('hidden');

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

    var LoadAllClassOptions = function(){
        $.ajax({
            url: api_base_URL+"/api/classes/get-all-classes",
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '';

                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += '<option value="'+data[i].id+'">'+data[i].class_name+'</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#acP").html(str);
                    $("#ccP").html(str);

                    $("#acU").html(str);
                    $("#ccU").html(str);
                }
                else 
                {
                    str += "";
                    $("#acP").html(str);
                    $("#ccP").html(str);

                    $("#acU").html(str);
                    $("#ccU").html(str);
                }
            }
        });
    }
    LoadAllClassOptions();

    var LoadWingsOptions = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/wings/get-all-wings",
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
                            str += '<option value="'+data[i].id+'">'+data[i].wing_name+'</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#wingP").html(str);

                    $("#wingU").html(str);
                }
                else 
                {
                    str += "";
                    $("#wingP").html(str);

                    $("#wingU").html(str);
                }
            }
        });
    }

    LoadWingsOptions();

    var LoadGroupsOptions = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/groups/get-all-groups",
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
                            str += '<option value="'+data[i].id+'">'+data[i].group_name+'</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#agP").html(str);
                    $("#cgP").html(str);

                    $("#agU").html(str);
                    $("#cgU").html(str);
                }
                else 
                {
                    str += "";
                    $("#agP").html(str);
                    $("#cgP").html(str);

                    $("#agU").html(str);
                    $("#cgU").html(str);
                }
            }
        });
    }

    LoadGroupsOptions();

    var LoadStudentStatusOptions = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/student_status/get-all-status",
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

                    $("#statusP").html(str);

                    $("#statusU").html(str);
                }
                else 
                {
                    str += "";
                    $("#statusP").html(str);

                    $("#statusU").html(str);
                }
            }
        });
    }

    LoadStudentStatusOptions();

    var LoadAllStudents = function(){
        $.ajax({
            url: api_base_URL+"/api/students/get-all-students",
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
                                        "<td>"+ data[i].name +"</td>"+
                                        "<td>"+ data[i].student_id  +"</td>"+
                                        "<td>"+ data[i].contact  +"</td>"+
                                        "<td>"+ data[i].status_name  +"</td>"+
                                        "<td>"+ data[i].class_name +"</td>"+
                                        "<td>"+ data[i].group_name +"</td>"+
                                        "<td>"+ data[i].wing_name +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateStudentModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button></td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='9' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#studentTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='9' align='middle'>NO DATA FOUND</td></tr>";
                    $("#studentTable tbody").html(str);
                }
            }
        });
    }
    LoadAllStudents();

    var LoadStudent = function(id){
        $.ajax({
            url: api_base_URL+"/api/students/get-student/"+id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#nameU').val(data.name);
                   $('#idU').val(data.student_id);
                   $('#sexU').val(data.sex);
                   $('#relU').val(data.religion);
                   $('#fatherU').val(data.father_name);
                   $('#motherU').val(data.mother_name);
                   $('#contactU').val(data.contact);
                   $('#emailU').val(data.email);
                   $('#pradU').val(data.present_address);
                   $('#peadU').val(data.permanent_address);
                   $('#acU').val(data.admission_class_id);
                   $('#agU').val(data.admission_group_id);
                   $('#ccU').val(data.cur_class_id);
                   $('#cgU').val(data.cur_group_id);
                   $('#statusU').val(data.studentship_id);
                   $('#avatarU').attr('src', api_base_URL+"/"+data.img_path);
                   $('#id').val(data.id);
                   $('#renderUpdate').html("<button type='button' data-bs-toggle='modal' data-bs-target='#updateStudentImageModal' data-bs-id='"+data.id+"' class='btn btn-sm btn-danger'>Update Image</button>");
                   $('#renderEmBtn').html("<button type='button' data-bs-toggle='modal' data-bs-target='#updateStudentEmailModal' data-bs-id='"+data.login_id+"' class='btn btn-dark'>Update Email</button>");

                }
                else {}
            }
        });
    }

    $('#updateStudentModal').on('show.bs.modal', function(e) {
        $('#msgU').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadStudent(id);
    });


    var LoadStudentImage = function(id){
        $.ajax({
            url: api_base_URL+"/api/students/get-student/"+id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#nameU2').val(data.name);
                   $('#avatarU2').attr('src', api_base_URL+"/"+data.img_path);
                   $('#id2').val(data.id);
                   $('#pathU2').val(data.img_path);
                }
                else 
                {
                
                }
            }
        });
    }

    $('#updateStudentImageModal').on('show.bs.modal', function(e) {
        $('#msgU2').attr('hidden', true);
        $('#uploaded_file').val(null);
        var id = $(e.relatedTarget).data('bs-id');
        LoadStudentImage(id);
    });


    $('#addStudentModal').on('show.bs.modal', function(e) {
        $('#msgP').attr('hidden', true);
        $('#uploaded_update_file').val(null);
    });



    var LoadStudentLoginDetails = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/logins/get-login/id/"+id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#emailU2').val(data.email);
                   $('#idu3').val(data.id);
                }
                else {}
            }
        });
    }

    $('#updateStudentEmailModal').on('show.bs.modal', function(e) {
        $('#msgU3').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadStudentLoginDetails(id);
    });


    var loadAllStudentsByEmail = function (email) {
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
            loadAllStudentsByEmail($("#nemailU2").val());
        }
        else
        {
            $('#nemailU2').addClass("is-invalid");
        }
    });

    var sendPasswordOnUpdate = function (id) {
        $.ajax({
            url: api_base_URL+"/api/logins/send-user-authentication-password",
            method: "POST",
            data: {
                id : id,
            },
            
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;                 
                }
                else {
                    var data = xhr.responseJSON;
                }
            }
        });
    }

    var UpdateStudentEmail = function(){
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
                LoadAllStudents();
                LoadStudent($('#id').val());
                LoadStudentImage($('#id').val());
                LoadStudentLoginDetails($('#idu3').val());
                sendPasswordOnUpdate($('#idu3').val());
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
            UpdateStudentEmail();
        }
    });

    var UpdateStudentImage = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var data = new FormData($('#uploadForm')[0]);

        $.ajax({
            url: api_base_URL+"/api/students/update-student-image/"+id,
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
                LoadAllStudents();
                LoadStudent(id);
                LoadStudentImage(id);
            }
        });
    }

    $("#updateImageBTN").click(function () {
        UpdateStudentImage($('#id2').val());
    });

    var validateStudentUpdate= function() {
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

        if($.trim($('#idU').val()).length <= 0)
        {
            validate = false;
            $('#idU').addClass("is-invalid");
        }
        else
        {
            $("#idU").removeClass("is-invalid");
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


        if(!validate)
        {
            $('#msgU').attr('hidden', true);
        }

        return validate;
    }

    var UpdateStudent = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/students/update-student/"+id,
            method: "PUT",
            data : {
                id: $('#id').val(),
                name: $('#nameU').val(),
                student_id: $('#idU').val(),
                admission_class_id: $('#acU').val(),
                admission_group_id: $('#agU').val(),               
                sex: $('#sexU').val(),
                religion: $('#relU').val(),
                father_name: $('#fatherU').val(),
                mother_name: $('#motherU').val(),
                contact: $('#contactU').val(),
                present_address: $('#pradU').val(),
                permanent_address: $('#peadU').val(),
                cur_class_id: $('#ccU').val(),
                cur_group_id: $('#cgU').val(),
                wing_id: $('#wingU').val(),
                studentship_id: $('#statusU').val(),
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
                LoadAllStudents();
                LoadStudent(id);
                LoadStudentImage(id);
            }
        });
    }

    $("#updateBTN").click(function () {
        if(validateStudentUpdate())
        {
            UpdateStudent($('#id').val());
        }
    });

    var loadAllStudentByNameOrID = function (para) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            $.ajax({
                url: api_base_URL+"/api/students/nameid/"+para,
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
                                        "<td>"+ data[i].name +"</td>"+
                                        "<td>"+ data[i].student_id  +"</td>"+
                                        "<td>"+ data[i].contact  +"</td>"+
                                        "<td>"+ data[i].status_name  +"</td>"+
                                        "<td>"+ data[i].class_name +"</td>"+
                                        "<td>"+ data[i].group_name +"</td>"+
                                        "<td>"+ data[i].wing_name +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateStudentModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button></td>"+
                                "</tr>";
                                sl++;
                            }
                        }
                        else
                        {
                            str += "<tr><td colspan='9' align='middle'>NO DATA FOUND</td></tr>";
                        }
    
                        $("#studentTable tbody").html(str);
                    }
                    else {
                        str += "<tr><td colspan='9' align='middle'>NO DATA FOUND</td></tr>";
                        $("#studentTable tbody").html(str);
                    }
                }
            });
    }
    $("#search").on("keyup change",function(){
        if($.trim($("#search").val()).length > 0)
        {
            loadAllStudentByNameOrID($("#search").val());
        }
        else
        {
            LoadAllStudents();
        }
    });

    var loadAllStudentsByEmail2 = function (email) {
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
            loadAllStudentsByEmail2($("#emailP").val());
        }
        else
        {
            $('#emailP').addClass("is-invalid");
        }
    });

    var loadAllStudentsByStudentID = function (student_id) {
        var result = true;
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            $.ajax({
                url: api_base_URL+"/api/students/student_id/"+student_id,
                method: "GET",
                headers : {
                    role : decryptLoginInfo.role_id,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        var data = xhr.responseJSON;

                        result = true;

                        $('#idP').addClass("is-invalid");
                    }
                    
                    else {

                        result = false;
                        $('#idP').removeClass("is-invalid");
                    }
                }
            });

            return result;
    }
    $("#idP").on("keyup change",function(){
        if($.trim($("#idP").val()).length > 0)
        {
            $('#idP').removeClass("is-invalid");
            loadAllStudentsByStudentID($("#idP").val());
        }
        else
        {
            $('#idP').addClass("is-invalid");
        }
    });

    var loadAllStudentsByStudentID2 = function (student_id) {
        var result = true;
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            $.ajax({
                url: api_base_URL+"/api/students/student_id/"+student_id,
                method: "GET",
                headers : {
                    role : decryptLoginInfo.role_id,
                },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        var data = xhr.responseJSON;

                        result = true;

                        $('#idU').addClass("is-invalid");
                    }
                    
                    else {

                        result = false;
                        $('#idU').removeClass("is-invalid");
                    }
                }
            });

            return result;
    }
    $("#idU").on("keyup change",function(){
        if($.trim($("#idU").val()).length > 0)
        {
            $('#idU').removeClass("is-invalid");
            loadAllStudentsByStudentID2($("#idU").val());
        }
        else
        {
            $('#idU').addClass("is-invalid");
        }
    });

    var validateStudentInsert= function() {
        var validate = true;
        if($.trim($('#nameP').val()).length <= 0)
        {
            validate = false;
            $('#nameP').addClass("is-invalid");
        }
        else
        {
            $("#nameP").removeClass("is-invalid");
        }

        if($.trim($('#idP').val()).length <= 0)
        {
            validate = false;
            $('#idP').addClass("is-invalid");
        }
        else
        {
            $("#idP").removeClass("is-invalid");
        }

        if($.trim($("#fatherP").val()).length <= 0)
        {
            validate = false;
            $("#fatherP").addClass("is-invalid");
        }
        else
        {
            $("#fatherP").removeClass("is-invalid");
        }

        if($.trim($("#motherP").val()).length <= 0)
        {
            validate = false;
            $("#motherP").addClass("is-invalid");
        }
        else
        {
            $("#motherP").removeClass("is-invalid");
        }

        if($.trim($("#contactP").val()).length <= 10)
        {
            validate = false;
            $("#contactP").addClass("is-invalid");
        }
        else
        {
            $("#contactP").removeClass("is-invalid");
        }

        if($.trim($("#pradP").val()).length <= 0)
        {
            validate = false;
            $("#pradP").addClass("is-invalid");
        }
        else
        {
            $("#pradP").removeClass("is-invalid");
        }

        if($.trim($("#peadP").val()).length <= 0)
        {
            validate = false;
            $("#peadP").addClass("is-invalid");
        }
        else
        {
            $("#peadP").removeClass("is-invalid");
        }


        if(!validate)
        {
            $('#msgU').attr('hidden', true);
        }

        return validate;
    }

    var InsertTeacherImage = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var data = new FormData($('#uploadForm')[0]);

        $.ajax({
            url: api_base_URL+"/api/students/insert-student-image/"+id,
            method: "PUT",
            contentType: false,
            processData: false,
            cache: false,
            data: data,
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                console.log(xhr)
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1){}
                    else 
                    {
                        // alert("Something Went Wrong.");
                    }
                }
                else 
                {
                    // alert("No Image Uploaded");
                }
            }
        });
    }

    var InsertStudent = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        // console.log(login_id);
        $.ajax({
            url: api_base_URL+"/api/students/insert-student",
            method: "POST",
            data : {
                login_id: id,
                name: $('#nameP').val(),
                student_id: $('#idP').val(),
                admission_class_id: $('#acP').val(),
                admission_group_id: $('#agP').val(),               
                sex: $('#sexP').val(),
                religion: $('#relP').val(),
                father_name: $('#fatherP').val(),
                mother_name: $('#motherP').val(),
                contact: $('#contactP').val(),
                present_address: $('#pradP').val(),
                permanent_address: $('#peadP').val(),
                cur_class_id: $('#ccP').val(),
                cur_group_id: $('#cgP').val(),
                wing_id: $('#wingP').val(),
                studentship_id: $('#statusP').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    if(data.insertId >= 1)
                    {
                        $("#msgP").removeClass("alert-danger");
                        $("#msgP").addClass("alert-success");
                        $('#msgP').html('<small>Student Added.</small>');
                        $('#msgP').removeAttr('hidden');

                        InsertTeacherImage(data.insertId);
                    }
                    else 
                    {
                        $("#msgP").removeClass("alert-success");
                        $("#msgP").addClass("alert-danger");
                        $('#msgP').html('<small>Something Went Wrong.</small>');
                        $('#msgP').removeAttr('hidden');
                    }
                }
                else 
                {
                    $("#msgP").removeClass("alert-success");
                    $("#msgP").addClass("alert-danger");
                    $('#msgP').html('<small>Something Went Wrong.</small>');
                    $('#msgP').removeAttr('hidden');
                }
                LoadAllStudents();
            }
        });
    }

    var sendPassword = function (id) {
        $.ajax({
            url: api_base_URL+"/api/logins/send-user-authentication-password",
            method: "POST",
            data: {
                id : id,
            },
            
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;
                   
                    InsertStudent(id);
                }
                else {
                    var data = xhr.responseJSON;
                    alert("...");
                }
            }
        });
    }

    var InsertLogin = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/logins/insert-user",
            method: "POST",
            data : {
                email: $('#emailP').val(),
                password: Math.floor(100000 + Math.random() * 900000),
                role_id: 3,
                access_id: 1,
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    // console.log(data.insertId);
                    sendPassword(data.insertId);
                }
                else 
                {
                    // $("#msgP").removeClass("alert-success");
                    // $("#msgP").addClass("alert-danger");
                    // $('#msgP').html('<small>Something Went Wrong.</small>');
                    // $('#msgP').removeAttr('hidden');
                }
            }
        });
    }

    $("#postBTN").click(function () {
        if(validateStudentInsert())
        {
            InsertLogin();
        }
        else
        {

        }
    });

});
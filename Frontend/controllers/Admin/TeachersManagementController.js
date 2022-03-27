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

    var LoadAllSubjectOptions = function(){
        $.ajax({
            url: api_base_URL+"/api/subjects/get-all-subjects",
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '';

                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += '<option value="'+data[i].id+'">'+data[i].subject_code+'-'+data[i].subject_name+'</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#designP").html(str);
                    $("#designU").html(str);
                }
                else 
                {
                    str += "";
                    $("#designP").html(str);
                    $("#designU").html(str);
                }
            }
        });
    }
    LoadAllSubjectOptions();

    var LoadAllEmpStatusOptions = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/employment_status/get-all-status",
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

                    $("#statusU").html(str);
                }
                else 
                {
                    str += "";
                    $("#statusU").html(str);
                }
            }
        });
    }

    LoadAllEmpStatusOptions();

    var LoadAllTeachers = function(){
        $.ajax({
            url: api_base_URL+"/api/teachers/get-all-teachers",
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
                                        "<td>"+ data[i].subject_name  +"</td>"+
                                        "<td>"+ data[i].status_name  +"</td>"+
                                        "<td>"+ data[i].role_name  +"</td>"+
                                        "<td>"+ data[i].contact +"</td>"+
                                        "<td>"+ data[i].email +"</td>"+
                                        "<td>"+ data[i].file_no +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i></button></td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='9' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#empTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='9' align='middle'>NO DATA FOUND</td></tr>";
                    $("#empTable tbody").html(str);
                }
            }
        });
    }
    LoadAllTeachers();

    var LoadTeacher = function(id){
        $.ajax({
            url: api_base_URL+"/api/teachers/get-teacher/"+id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#nameU').val(data.name);
                   $('#sexU').val(data.sex);
                   $('#relU').val(data.religion);
                   $('#fatherU').val(data.father_name);
                   $('#motherU').val(data.mother_name);
                   $('#contactU').val(data.contact);
                   $('#emailU').val(data.email);
                   $('#bgU').val(data.bg);
                   $('#pradU').val(data.present_address);
                   $('#peadU').val(data.permanent_address);
                   $('#designU').val(data.subject_id);
                   $('#salaryU').val(data.salary);
                   $('#fileU').val(data.file_no);
                   $('#statusU').val(data.employment_status_id);
                   $('#avatarU').attr('src', api_base_URL+"/"+data.img_path);
                   $('#id').val(data.id);
                   $('#renderUpdate').html("<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeImageModal' data-bs-id='"+data.id+"' class='btn btn-sm btn-danger'>Update Image</button>");
                   $('#renderEmBtn').html("<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeEmailModal' data-bs-id='"+data.login_id+"' class='btn btn-dark'>Update Email</button>");

                   if(data.access_id == 2)
                   {
                        $('#renderRole').html("<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeRoleModal' data-bs-id='"+data.login_id+"' class='btn btn-primary'>Enable Login</button>")
                   }
                   else
                   {
                        $('#renderRole').html("<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeRoleModal' data-bs-id='"+data.login_id+"' class='btn btn-danger'>Restrict Login</button>")
                   }
                }
                else {}
            }
        });
    }

    $('#updateEmployeeModal').on('show.bs.modal', function(e) {
        $('#msgU').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadTeacher(id);
    });


    var LoadTeacherImage = function(id){
        $.ajax({
            url: api_base_URL+"/api/teachers/get-teacher/"+id,
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

    $('#updateEmployeeImageModal').on('show.bs.modal', function(e) {
        $('#msgU2').attr('hidden', true);
        $('#uploaded_file').val(null);
        var id = $(e.relatedTarget).data('bs-id');
        LoadTeacherImage(id);
    });


    $('#addEmployeeModal').on('show.bs.modal', function(e) {
        $('#msgP').attr('hidden', true);
        $('#uploaded_update_file').val(null);
    });



    var LoadTeacherLoginDetails = function(id){
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

    $('#updateEmployeeEmailModal').on('show.bs.modal', function(e) {
        $('#msgU3').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadTeacherLoginDetails(id);
    });


    var LoadTeacherLoginDetails2 = function(id){
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
                
                   $('#idU4').val(data.id);
                   $('#roleU4').val(data.role_id);
                   $('#accessU4').val(data.access_id);
                }
                else {}
            }
        });
    }

    $('#updateEmployeeRoleModal').on('show.bs.modal', function(e) {
        $('#msgU4').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadTeacherLoginDetails2(id);
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

    var loadAllTeachersByName = function (name) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            $.ajax({
                url: api_base_URL+"/api/teachers/name/"+name,
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
                                            "<td>"+ data[i].subject_name  +"</td>"+
                                            "<td>"+ data[i].status_name  +"</td>"+
                                            "<td>"+ data[i].role_name  +"</td>"+
                                            "<td>"+ data[i].contact +"</td>"+
                                            "<td>"+ data[i].email +"</td>"+
                                            "<td>"+ data[i].file_no +"</td>"+
                                            "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i></button></td>"+
                                    "</tr>";
                                sl++;
                            }
                        }
                        else
                        {
                            str += "<tr><td colspan='9' align='middle'>NO DATA FOUND</td></tr>";
                        }
    
                        $("#empTable tbody").html(str);
                    }
                    else {
                        str += "<tr><td colspan='9' align='middle'>NO DATA FOUND</td></tr>";
                        $("#empTable tbody").html(str);
                    }
                }
            });
    }
    $("#search").on("keyup change",function(){
        if($.trim($("#search").val()).length > 0)
        {
            loadAllTeachersByName($("#search").val());
        }
        else
        {
            LoadAllTeachers();
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

    var validateTeacherInsert= function() {
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

        if($.trim($('#emailP').val()).length <= 0)
        {
            validate = false;
            $('#emailP').addClass("is-invalid");
        }
        else
        {
            // if(loadAllTeachersByEmail2($('#emailP').val()))
            // {
            //     validate = false;
            //     $('#emailP').addClass("is-invalid");
            // }
            // else
            // {
            //     $("#emailP").removeClass("is-invalid");
            // }
            $("#emailP").removeClass("is-invalid");
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
            // if(loadAllTeachersByContact2($("#contactP").val()))
            // {
            //     validate = false;
            //     $("#contactP").addClass("is-invalid");
            // }
            // else
            // {
            //     $("#contactP").removeClass("is-invalid");
            // }
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

        if($("#salaryP").val() <= 0)
        {
            validate = false;
            $("#salaryP").addClass("is-invalid");
        }
        else
        {
            $("#salaryP").removeClass("is-invalid");
        }

        if($.trim($("#fileP").val()).length <= 0)
        {
            validate = false;
            $("#fileP").addClass("is-invalid");
        }
        else
        {
            // if(loadAllTeachersByFileNo2($('#fileP').val()))
            // {
            //     validate = false;
            //     $('#fileP').addClass("is-invalid");
            // }
            // else
            // {
            //     $("#fileP").removeClass("is-invalid");
            // }
            $("#fileP").removeClass("is-invalid");
        }

        // if($('#emailP').hasClass("is-invalid"))
        // {
        //     validate = false;
        // }
        // if($('#contactP').hasClass("is-invalid"))
        // {
        //     validate = false;
        // }
        // if($('#fileP').hasClass("is-invalid"))
        // {
        //     validate = false;
        // }
        

        if(!validate)
        {
            $('#msgP').attr('hidden', true);
        }

        return validate;
    }

    var InsertTeacherImage = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var data = new FormData($('#uploadForm')[0]);

        $.ajax({
            url: api_base_URL+"/api/teachers/insert-teacher-image/"+id,
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

    var InsertTeacher = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        // console.log(login_id);
        $.ajax({
            url: api_base_URL+"/api/teachers/insert-teacher",
            method: "POST",
            data : {
                login_id: id,
                name: $('#nameP').val(),
                sex: $('#sexP').val(),
                religion: $('#relP').val(),
                father_name: $('#fatherP').val(),
                mother_name: $('#motherP').val(),
                contact: $('#contactP').val(),
                bg: $('#bgP').val(),
                present_address: $('#pradP').val(),
                permanent_address: $('#peadP').val(),
                subject_id: $('#designP').val(),
                salary: $('#salaryP').val(),
                img_path: '',
                file_no: $('#fileP').val(),
                employment_status_id: 1,
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
                        $('#msgP').html('<small>Teacher Added.</small>');
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
                LoadAllTeachers();
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
                   
                    InsertTeacher(id);
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
                role_id: 2,
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
        if(validateTeacherInsert())
        {
            InsertLogin();
        }
        else
        {

        }
    });

});
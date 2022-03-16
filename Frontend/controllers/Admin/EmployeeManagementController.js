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

    var LoadAllDesignationOptions = function(){
        $.ajax({
            url: api_base_URL+"/api/designations/get-all-designations",
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '';

                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += '<option value="'+data[i].id+'">'+data[i].designation_name+'</option>';
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
    LoadAllDesignationOptions();

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

    var LoadAllEmployees = function(){
        $.ajax({
            url: api_base_URL+"/api/employees/get-all-employees",
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
                                        "<td>"+ data[i].designation_name  +"</td>"+
                                        "<td>"+ data[i].status_name  +"</td>"+
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
                        str += "<tr><td colspan='8' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#empTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='8' align='middle'>NO DATA FOUND</td></tr>";
                    $("#empTable tbody").html(str);
                }
            }
        });
    }
    LoadAllEmployees();

    var LoadEmployee = function(id){
        $.ajax({
            url: api_base_URL+"/api/employees/get-employee/"+id,
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
                   $('#designU').val(data.designation_id);
                   $('#salaryU').val(data.salary);
                   $('#fileU').val(data.file_no);
                   $('#statusU').val(data.employment_status_id);
                   $('#avatarU').attr('src', api_base_URL+"/"+data.img_path);
                   $('#id').val(data.id);
                   $('#renderUpdate').html("<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeImageModal' data-bs-id='"+data.id+"' class='btn btn-sm btn-danger'>Update Image</button>");
                   $('#renderEmBtn').html("<button type='button' data-bs-toggle='modal' data-bs-target='#updateEmployeeEmailModal' data-bs-id='"+data.login_id+"' class='btn btn-danger'>Update Email</button>")
                }
                else {}
            }
        });
    }

    $('#updateEmployeeModal').on('show.bs.modal', function(e) {
        $('#msgU').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadEmployee(id);
    });


    var LoadEmployeeImage = function(id){
        $.ajax({
            url: api_base_URL+"/api/employees/get-employee/"+id,
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
        var id = $(e.relatedTarget).data('bs-id');
        LoadEmployeeImage(id);
    });


    var LoadEmployeeLoginDetails = function(id){
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
        LoadEmployeeLoginDetails(id);
    });

    var loadAllEmployeesByEmail = function (email) {
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
            loadAllEmployeesByEmail($("#nemailU2").val());
        }
        else
        {
            $('#nemailU2').addClass("is-invalid");
        }
    });

    var UpdateEmployeeEmail = function(){
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
                LoadAllEmployees();
                LoadEmployee($('#id').val());
                LoadEmployeeImage($('#id').val());
                LoadEmployeeLoginDetails($('#idu3').val());
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
            UpdateEmployeeEmail();
        }
    });

    var UpdateEmployeeImage = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var data = new FormData($('#uploadForm')[0]);

        $.ajax({
            url: api_base_URL+"/api/employees/update-employee-image/"+id,
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
                LoadAllEmployees();
                LoadEmployee(id);
                LoadEmployeeImage(id);
            }
        });
    }

    $("#updateImageBTN").click(function () {
        UpdateEmployeeImage($('#id2').val());
    });

    var validateEmployeeUpdate= function() {
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

    var UpdateEmployee = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/employees/update-employee/"+id,
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
                designation_id: $('#designU').val(),
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
                LoadAllEmployees();
                LoadEmployee(id);
                LoadEmployeeImage(id);
            }
        });
    }

    $("#updateBTN").click(function () {
        if(validateEmployeeUpdate())
        {
            UpdateEmployee($('#id').val());
        }
    });

    var loadAllEmployeesByName = function (name) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            $.ajax({
                url: api_base_URL+"/api/employees/name/"+name,
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
                                            "<td>"+ data[i].designation_name  +"</td>"+
                                            "<td>"+ data[i].status_name  +"</td>"+
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
                            str += "<tr><td colspan='8' align='middle'>NO DATA FOUND</td></tr>";
                        }
    
                        $("#empTable tbody").html(str);
                    }
                    else {
                        str += "<tr><td colspan='8' align='middle'>NO DATA FOUND</td></tr>";
                        $("#empTable tbody").html(str);
                    }
                }
            });
    }
    $("#search").on("keyup change",function(){
        if($.trim($("#search").val()).length > 0)
        {
            loadAllEmployeesByName($("#search").val());
        }
        else
        {
            LoadAllEmployees();
        }
    });

    

});
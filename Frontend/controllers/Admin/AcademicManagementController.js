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


    //________________________________________-
    var LoadAllSubjects = function(){
        $.ajax({
            url: api_base_URL+"/api/subjects/get-all-subjects",
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
                                        "<td>"+ data[i].subject_code  +"</td>"+
                                        "<td>"+ data[i].subject_name  +"</td>"+
                                        "<td>"+ data[i].group_name  +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateAcademicSessionModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i></button></td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#subjectTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
                    $("#subjectTable tbody").html(str);
                }
            }
        });
    }
    LoadAllSubjects(); 

});
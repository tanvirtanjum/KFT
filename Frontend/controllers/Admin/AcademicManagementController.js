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

    var LoadAllClasses = function(){
        $.ajax({
            url: api_base_URL+"/api/classes/get-all-classes",
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
                                        "<td>"+ data[i].class_name  +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateClassModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button></td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='3' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#classTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='3' align='middle'>NO DATA FOUND</td></tr>";
                    $("#classTable tbody").html(str);
                }
            }
        });
    }
    LoadAllClasses();

    var InsertClass = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/classes/insert-class",
            method: "POST",
            data : {
                class_name: $('#class_nameP').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    LoadAllClasses();

                    alert("Class Inserted");
                }
                else 
                {
                    alert("Something Went Wrong");
                }
            }
        });
    }

    var validateClassInsert= function() {
        var validate = true;
        if($.trim($('#class_nameP').val()).length <= 0)
        {
            validate = false;
            $('#class_nameP').addClass("is-invalid");
        }
        else
        {
            $("#class_nameP").removeClass("is-invalid");
        }

        return validate;
    }

    $("#addClassBTN").click(function () {
        if(validateClassInsert())
        {
            InsertClass();
        }
        else
        {

        }
    });


    var LoadClass = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/classes/get-class/"+id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#id_u3').val(data.id);
                   $('#class_nameU').val(data.class_name);
                }
                else {}
            }
        });
    }

    $('#updateClassModal').on('show.bs.modal', function(e) {
        $('#msgU').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadClass(id);
    });

    var UpdateClass = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/classes/update-class/"+id,
            method: "PUT",
            data : {
                class_name: $('#class_nameU').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    LoadAllClasses();
                    LoadClass($('#id_u3').val());

                    alert("Class Updated");
                }
                else 
                {
                    LoadAllClasses();
                    LoadClass($('#id_u3').val());
                    alert("Something Went Wrong");
                }
            }
        });
    }

    var validateClassUpdate= function() {
        var validate = true;
        if($.trim($('#class_nameU').val()).length <= 0)
        {
            validate = false;
            $('#class_nameU').addClass("is-invalid");
        }
        else
        {
            $("#class_nameU").removeClass("is-invalid");
        }

        return validate;
    }

    $("#updateClassBTN").click(function () {
        if(validateClassUpdate())
        {
            UpdateClass($('#id_u3').val());
        }
        else
        {

        }
    });


// ________________________________________

    var LoadAllSessionSectionSubjects = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/subjects/get-all-subjects",
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
                            str += '<option value="'+data[i].id+'">'+data[i].subject_name+'</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#subjectUSS").html(str);
                    $("#subjectPSS").html(str);
                }
                else 
                {
                    str += "";
                    $("#subjectUSS").html(str);
                    $("#subjectPSS").html(str);
                }
            }
        });
    }
    LoadAllSessionSectionSubjects();

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
                    $("#session_statusUS").html(str);
                }
                else 
                {
                    str += "";
                    $("#session_statusP").html(str);
                    $("#session_statusU").html(str);
                    $("#session_statusUS").html(str);
                }
            }
        });
    }
    LoadAllSessionStatusOptions();

    var LoadAllSectionClassOptions = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/classes/get-all-classes",
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
                            str += '<option value="'+data[i].id+'">'+data[i].class_name+'</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#classUS").html(str);
                    $("#classPS").html(str);
                }
                else 
                {
                    str += "";
                    $("#classUS").html(str);
                    $("#classPS").html(str);
                }
            }
        });
    }
    LoadAllSectionClassOptions();

    var LoadAllSectionGroupOptions = function(){
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

                    $("#groupUS").html(str);
                    $("#groupPS").html(str);
                }
                else 
                {
                    str += "";
                    $("#groupUS").html(str);
                    $("#groupPS").html(str);
                }
            }
        });
    }
    LoadAllSectionGroupOptions();

    var LoadAllSectionWingOptions = function(){
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

                    $("#wingUS").html(str);
                    $("#wingPS").html(str);
                }
                else 
                {
                    str += "";
                    $("#wingUS").html(str);
                    $("#wingPS").html(str);
                }
            }
        });
    }
    LoadAllSectionWingOptions();

    var LoadAllSectionTeacherOptions = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/teachers/get-all-teachers",
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
                            str += '<option value="'+data[i].id+'">'+data[i].name+' ('+data[i].subject_name+')</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#teacherUS").html(str);
                    $("#teacherPS").html(str);
                    $("#teacherUSS").html(str);
                    $("#teacherPSS").html(str);
                }
                else 
                {
                    str += "";
                    $("#teacherUS").html(str);
                    $("#teacherPS").html(str);
                    $("#teacherUSS").html(str);
                    $("#teacherPSS").html(str);
                }
            }
        });
    }
    LoadAllSectionTeacherOptions();

    
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
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateAcademicSessionSectionModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-success'><i class='fas fa-edit'></i> Manage Sections & Courses</button></td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateAcademicSessionModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button></td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#sesssionTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
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
                                            "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateAcademicSessionSectionModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-success'><i class='fas fa-edit'></i> Manage Sections & Courses</button></td>"+
                                            "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateAcademicSessionModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button></td>"+
                                    "</tr>";
                                sl++;
                            }
                        }
                        else
                        {
                            str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
                        }
    
                        $("#sesssionTable tbody").html(str);
                    }
                    else 
                    {
                        str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
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

    var LoadSession2 = function(id){
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

                   $('#id_us').val(data.id);
                   $('#idUS').val(data.id);
                   $('#year_nameUS').val(data.year_name);
                   $('#session_statusUS').val(data.session_status_id);
                }
                else {}
            }
        });
    }

    var LoadSessionSections = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);
            

        $.ajax({
            url: api_base_URL+"/api/academic_session_sections/get-sections/session/"+id,
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
                                        "<td>"+ data[i].section_name  +"</td>"+
                                        "<td>"+ data[i].class_name  +"</td>"+
                                        "<td>"+ data[i].group_name  +"</td>"+
                                        "<td>"+ data[i].wing_name  +"</td>"+
                                        "<td>"+ data[i].name  +"</td>"+
                                        "<td>"+
                                            "<button type='button' data-bs-toggle='modal' data-bs-target='#updateAcademicSessionSectionDetailsModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button>   "+
                                            "<button type='button' data-bs-toggle='modal' data-bs-target='#detailsAcademicSessionSectionModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-success'><i class='fas fa-edit'></i> Manage Courses</button>"+
                                        "</td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='7' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#secTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='7' align='middle'>NO DATA FOUND</td></tr>";
                    $("#secTable tbody").html(str);
                }
            }
        });
    }

    $('#updateAcademicSessionSectionModal').on('show.bs.modal', function(e) {
        $('#msgUS').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadSession2(id);
        LoadSessionSections(id);
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


    //________________________________________
    var LoadAllGroupsOptions = function(){
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

                    $("#groupP").html(str);
                    $("#groupU").html(str);
                }
                else 
                {
                    str += "";
                    $("#groupP").html(str);
                    $("#groupU").html(str);
                }
            }
        });
    }
    LoadAllGroupsOptions();

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
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateAcademicSubjectModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button></td>"+
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

    var InsertSubject = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/subjects/insert-subject",
            method: "POST",
            data : {
                subject_code: $('#subject_codeP').val(),
                subject_name: $('#subject_nameP').val(),
                group_id: $('#groupP').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    LoadAllSubjects();

                    alert("Subject Inserted");
                }
                else 
                {
                    alert("Something Went Wrong");
                }
            }
        });
    }

    var validateSubjectInsert= function() {
        var validate = true;
        if($.trim($('#subject_codeP').val()).length <= 0)
        {
            validate = false;
            $('#subject_codeP').addClass("is-invalid");
        }
        else
        {
            $("#subject_codeP").removeClass("is-invalid");
        }

        if($.trim($('#subject_nameP').val()).length <= 0)
        {
            validate = false;
            $('#subject_nameP').addClass("is-invalid");
        }
        else
        {
            $("#subject_nameP").removeClass("is-invalid");
        }

        return validate;
    }

    $("#addSubjectBTN").click(function () {
        if(validateSubjectInsert())
        {
            InsertSubject();
        }
        else
        {

        }
    });

    var LoadAllSubjectsByName = function (name) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            $.ajax({
                url: api_base_URL+"/api/subjects/get-all-subjects/"+name,
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
                                            "<td>"+ data[i].subject_code  +"</td>"+
                                            "<td>"+ data[i].subject_name  +"</td>"+
                                            "<td>"+ data[i].group_name  +"</td>"+
                                            "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateAcademicSubjectModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button></td>"+
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
    $("#search2").on("keyup change",function(){
        if($.trim($("#search2").val()).length > 0)
        {
            LoadAllSubjectsByName($("#search2").val());
        }
        else
        {
            LoadAllSubjects();
        }
    });

    var LoadSubject = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/subjects/get-subject/"+id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#id_u2').val(data.id);
                   $('#subject_codeU').val(data.subject_code);
                   $('#subject_nameU').val(data.subject_name);
                   $('#groupU').val(data.group_id);
                }
                else {}
            }
        });
    }

    $('#updateAcademicSubjectModal').on('show.bs.modal', function(e) {
        $('#msgU').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadSubject(id);
    });

    var UpdateSubject = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/subjects/update-subject/"+id,
            method: "PUT",
            data : {
                subject_code: $('#subject_codeU').val(),
                subject_name: $('#subject_nameU').val(),
                group_id: $('#groupU').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    LoadAllSubjects();
                    LoadSubject($('#id_u2').val());

                    alert("Subject Updated");
                }
                else 
                {
                    LoadAllSubjects();
                    LoadSubject($('#id_u2').val());
                    alert("Something Went Wrong");
                }
            }
        });
    }

    var validateSubjectUpdate= function() {
        var validate = true;
        if($.trim($('#subject_codeU').val()).length <= 0)
        {
            validate = false;
            $('#subject_codeU').addClass("is-invalid");
        }
        else
        {
            $("#subject_codeU").removeClass("is-invalid");
        }

        if($.trim($('#subject_nameU').val()).length <= 0)
        {
            validate = false;
            $('#subject_nameU').addClass("is-invalid");
        }
        else
        {
            $("#subject_nameU").removeClass("is-invalid");
        }

        return validate;
    }

    $("#updateSubjectBTN").click(function () {
        if(validateSubjectUpdate())
        {
            UpdateSubject($('#id_u2').val());
        }
        else
        {

        }
    });


    var InsertSessionSection = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/academic_session_sections/insert-section",
            method: "POST",
            data : {
                section_name: $('#section_nameUS').val(),
                class_id: $('#classUS').val(),
                group_id: $('#groupUS').val(),
                wing_id: $('#wingUS').val(),
                session_id: $('#idUS').val(),
                class_teacher_id: $('#teacherUS').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    LoadSessionSections($('#idUS').val());

                    alert("Section Inserted");
                }
                else 
                {
                    alert("Something Went Wrong");
                }
            }
        });
    }

    var validateSessionSectionInsert= function() {
        var validate = true;
        if($.trim($('#section_nameUS').val()).length <= 0)
        {
            validate = false;
            $('#section_nameUS').addClass("is-invalid");
        }
        else
        {
            $("#section_nameUS").removeClass("is-invalid");
        }

        return validate;
    }

    $("#addSessionSectionBTN").click(function () {
        if(validateSessionSectionInsert())
        {
            InsertSessionSection();
        }
        else
        {
            console.log("Something Went Wrong");
        }
    });

    var LoadSessionSectionByID = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/academic_session_sections/get-section/"+id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#idPS').val(data.id);
                   $('#section_namePS').val(data.section_name);
                   $('#classPS').val(data.class_id);
                   $('#groupPS').val(data.group_id);
                   $('#wingPS').val(data.wing_id);
                   $('#teacherPS').val(data.class_teacher_id);
                }
                else {}
            }
        });
    }

    $('#updateAcademicSessionSectionDetailsModal').on('show.bs.modal', function(e) {
        $('#msgU').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadSessionSectionByID(id);
    });

    var UpdateSessionSection = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/academic_session_sections/update-section/"+id,
            method: "PUT",
            data : {
                section_name: $('#section_namePS').val(),
                class_id: $('#classPS').val(),
                group_id: $('#groupPS').val(),
                wing_id: $('#wingPS').val(),
                class_teacher_id: $('#teacherPS').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        LoadSessionSections($('#idUS').val());
                        LoadSessionSectionByID($('#idPS').val());

                        alert("Section Updated.");
                    }

                    else
                    {
                        LoadSessionSections($('#idUS').val());
                        LoadSessionSectionByID($('#idPS').val());

                        alert("Something Went Wrong");
                    }
                }
                else 
                {
                    alert("Something Went Wrong");
                }
            }
        });
    }

    var validateSessionSectionUpdate= function() {
        var validate = true;
        if($.trim($('#section_namePS').val()).length <= 0)
        {
            validate = false;
            $('#section_namePS').addClass("is-invalid");
        }
        else
        {
            $("#section_namePS").removeClass("is-invalid");
        }

        return validate;
    }

    $("#updateSessionSectionBTN").click(function () {
        if(validateSessionSectionUpdate())
        {
            UpdateSessionSection($('#idPS').val());
        }
        else
        {
            console.log("Something Went Wrong");
        }
    });


    // _____________________________________________________--

    var LoadSessionSectionSubjects = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);
            

        $.ajax({
            url: api_base_URL+"/api/section_courses/get-courses/section/"+id,
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
                                        "<td>"+ data[i].subject_name  +"</td>"+
                                        "<td>"+ data[i].class_timing  +"</td>"+
                                        "<td>"+ data[i].name  +"</td>"+
                                        "<td>"+
                                            "<button type='button' data-bs-toggle='modal' data-bs-target='#updateCourseModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button>   "+
                                        "</td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#subTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
                    $("#subTable tbody").html(str);
                }
            }
        });
    }

    var LoadSection = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/academic_session_sections/get-section/"+id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#id_uss').val(data.id);
                   $('#sec_name').html(data.section_name);
                   $('#session_name').html(data.year_name);
                   $('#class_name').html(data.class_name);
                   $('#wing_name').html(data.wing_name);
                   $('#group_name').html(data.group_name);
                   $('#teacher_name').html(data.name);

                   LoadSessionSectionSubjects(id);
                }
                else {}
            }
        });
    }



    $('#detailsAcademicSessionSectionModal').on('show.bs.modal', function(e) {
        $('#msgU').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadSection(id);
    });

    var InsertCourse = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/section_courses/insert-course",
            method: "POST",
            data : {
                section_id: $('#id_uss').val(),
                subject_id: $('#subjectUSS').val(),
                class_timing: $('#timimgUSS').val(),
                teacher_id: $('#teacherUSS').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    LoadSessionSectionSubjects($('#id_uss').val());

                    alert("Course Inserted");
                }
                else 
                {
                    alert("Something Went Wrong");
                }
            }
        });
    }

    var validateCourseInsert= function() {
        var validate = true;
        if($.trim($('#timimgUSS').val()).length <= 0)
        {
            validate = false;
            $('#timimgUSS').addClass("is-invalid");
        }
        else
        {
            $("#timimgUSS").removeClass("is-invalid");
        }

        return validate;
    }

    $("#addCourseBTN").click(function () {
        if(validateCourseInsert())
        {
            InsertCourse();
        }
        else
        {
            console.log("Something Went Wrong");
        }
    });

    
    var LoadCourse = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/section_courses/get-courses/"+id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#id_pss').val(data.id);
                   $('#subjectPSS').val(data.subject_id);
                   $('#timimgPSS').val(data.class_timing);
                   $('#teacherPSS').val(data.teacher_id);
                   
                }
                else {}
            }
        });
    }



    $('#updateCourseModal').on('show.bs.modal', function(e) {
        $('#msgU').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadCourse(id);
    });

    var UpdateCourse = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/section_courses/update-course/"+id,
            method: "PUT",
            data : {
                id: id,
                subject_id: $('#subjectPSS').val(),
                class_timing: $('#timimgPSS').val(),
                teacher_id: $('#teacherPSS').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        LoadSessionSectionSubjects($('#id_uss').val());

                        alert("Course Updated");
                    }
                    else 
                    {
                        alert("Something Went Wrong");
                    }
                    
                }
                else 
                {
                    alert("Something Went Wrong");
                }
            }
        });
    }

    var validateCourseUpdate= function() {
        var validate = true;
        if($.trim($('#timimgPSS').val()).length <= 0)
        {
            validate = false;
            $('#timimgPSS').addClass("is-invalid");
        }
        else
        {
            $("#timimgPSS").removeClass("is-invalid");
        }

        return validate;
    }

    $("#updateCourseBTN").click(function () {
        if(validateCourseUpdate())
        {
            UpdateCourse($('#id_pss').val());
        }
        else
        {
            console.log("Something Went Wrong");
        }
    });


    var DeleteCourse = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/section_courses/delete-course/"+id,
            method: "DELETE",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 204) {
                    var data = xhr.responseJSON;

                    LoadSessionSectionSubjects($('#id_uss').val());
                   
                    alert("Course Deleted");

                    $('#updateCourseModal').modal('toggle');
                    
                    
                }
                else 
                {
                    alert("Something Went Wrong");
                }
            }
        });
    }

    $("#deleteCourseBTN").click(function () {
        DeleteCourse($('#id_pss').val());
    });

});
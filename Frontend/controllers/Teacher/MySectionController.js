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


    let searchParams = new URLSearchParams(window.location.search);
    var sectionID = atob(searchParams.get('section'));
    var sessionID = atob(searchParams.get('session'));

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

                    $("#acU").html(str);
                    $("#ccU").html(str);
                }
                else 
                {
                    str += "";

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


                    $("#wingU").html(str);
                }
                else 
                {
                    str += "";

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

                    $("#agU").html(str);
                    $("#cgU").html(str);
                }
                else 
                {
                    str += "";

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

    LoadStudentStatusOptions();


    var LoadTeachingProfile = function(){
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
                   $('#teacherID').val(data.id);                   
                }
                else {}
            }
        });
    }


    LoadTeachingProfile();

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

                   $('#sec_name').html(data.section_name);
                   $('#session_name').html(data.year_name);
                   $('#class_name').html(data.class_name);
                   $('#wing_name').html(data.wing_name);
                   $('#group_name').html(data.group_name);
                   $('#teacher_name').html(data.name);


                   $('#sectionID').val(data.id);
                   $('#academicSessionID').val(data.session_id);
                   $('#classID').val(data.class_id);
                   $('#groupID').val(data.group_id);
                }
                else {}
            }
        });
    }
    LoadSection(sectionID);


    var LoadRoutine = function(id){
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
                                   "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#routineTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                    $("#routineTable tbody").html(str);
                }
            }
        });
    }

    LoadRoutine(sectionID);

    var LoadStudents = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/section_students/get-students/section/"+id,
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
                                        "<td>"+ data[i].name  +"</td>"+
                                        "<td>"+ data[i].roll  +"</td>"+
                                        "<td>"+ data[i].father_name  +"</td>"+
                                        "<td>"+ data[i].mother_name  +"</td>"+
                                        "<td>"+ data[i].contact  +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateStudentModal' data-bs-id='"+data[i].student_id+"' class='btn btn-sm btn-dark'><i class='fas fa-eye'></i> View</button></td>"+
                                   "</tr>";
                            sl++;
                        }
                        
                    }
                    else
                    {
                        str += "<tr><td colspan='7' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#studentsTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='7' align='middle'>NO DATA FOUND</td></tr>";
                    $("#studentsTable tbody").html(str);
                }
            }
        });
    }

    LoadStudents(sectionID);

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
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#confirmAddStudentModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-plus'></i> Add</button></td>"+
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
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#confirmAddStudentModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-plus'></i> Add</button></td>"+
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


    $('#confirmAddStudentModal').on('show.bs.modal', function(e) {
        $('#msgU3').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        $('#studentID').val(id);
    });

    var UpdateMyInfo = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/students/update-student-class-group/"+id,
            method: "PUT",
            data : {
                cur_class_id: $('#classID').val(),
                cur_group_id: $('#groupID').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                console.log(xhr)
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        alert("Student Added");
                        LoadStudents(sectionID);
                        LoadAllStudents();
                    }
                    else 
                    {
                        alert("Something Went Wrong.");
                    }
                }
                else 
                {
                    alert("Something Went Wrong.");
                }
            }
        });
    }
    
    var InsertToMySession = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/my_academic_sessions/insert-session",
            method: "POST",
            data : {
                academic_session_id: sessionID,
                section_id: sectionID,
                student_id: $('#studentID').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    UpdateMyInfo($('#studentID').val());
                }
                else {

                }
            }
        });
    }

    var InsertToSection = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/section_students/insert-student",
            method: "POST",
            data : {
                section_id: sectionID,
                student_id: $('#studentID').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;
                    InsertToMySession();
                }
                else {
                    alert("Something Went Wrong.");
                }
            }
        });
    }

    var checkMySessions = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/my_academic_sessions/get-session/student/"+$('#studentID').val()+"/session/"+sessionID,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.length > 0)
                    {
                        alert("Student already enrolled in your or other section.");
                    }
                    else
                    {
                        InsertToSection();
                    }
                }
                else 
                {
                    alert("Something Went Wrong.");
                }
            }
        });
    }

    $("#confirmBTN").click(function () {
        checkMySessions();
    });

    var LoadStudentDetails = function(id){
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
                }
                else {}
            }
        });
    }

    $('#updateStudentModal').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('bs-id');
        LoadStudentDetails(id);
    });

    var DeleteMySession = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/my_academic_sessions/delete-session/session/"+sessionID+"/student/"+id+"/section/"+sectionID,
            method: "DELETE",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 204) {
                    var data = xhr.responseJSON;

                    alert("Student Removed");

                    LoadStudents(sectionID);

                    $('#updateStudentModal').modal('toggle');

                }
                else {
                    alert("Something Went Wrong.");
                }
            }
        });
    }

    var DeleteFromSection = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/section_students/delete-student/section/"+sectionID+"/student/"+id,
            method: "DELETE",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 204) {
                    var data = xhr.responseJSON;

                    DeleteMySession(id);
                    
                }
                else {
                    alert("Something Went Wrong.");
                }
            }
        });
    }


    $("#removeBTN").click(function () {
        DeleteFromSection($('#id').val());
    });


    var LoadSectionFiles = function(id){
        $.ajax({
            url: api_base_URL+"/api/section_files/get-all-files/section/"+id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;
                    var str = '';
                    var sl = 1;
                    if(data.length > 0 && data[0].file_path != '')
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += "<tr>"+
                                        "<th>"+ sl + "</th>"+
                                        "<td>"+ data[i].file_name +"</td>"+
                                        "<td>"+ '<a class="btn btn-primary btn-sm" href="'+api_base_URL+'/api/download?path='+data[i].file_path+'" target="_blank" role="button" download><i class="fas fa-download"></i> Download</a>' +"</td>"+
                                        "<td>"+ "<button type='button' data-bs-toggle='modal' data-bs-target='#deleteNoticeFileModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-danger'><i class='fas fa-trash-alt'></i> Delete</button>" +"</td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                    }

                   $("#filelistTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                    $("#filelistTable tbody").html(str);
                }
            }
        });
    }
    LoadSectionFiles(sectionID);


    var PostSectionFile = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var data = new FormData($('#uploadForm')[0]);

        $.ajax({
            url: api_base_URL+"/api/section_files/post-files/section/"+id,
            method: "POST",
            contentType: false,
            processData: false,
            cache: false,
            data: data,
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                       alert("File Uploaded.");
                       $('#uploaded_file').val(null);
                    }
                    else 
                    {
                        console.log(data)
                        alert("Something Went Wrong.");
                    }
                }
                else 
                {
                    alert("Something Went Wrong.");
                }
                LoadSectionFiles(id);
             }
        });
    }

    $("#uploadFileBTN").click(function () {
        PostSectionFile(sectionID);
    });


    

    ////////
    var LoadFileByID = function LoadFileByID(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var data;

        $.ajax({
            url: api_base_URL+"/api/section_files/get-files/file_id/"+id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    data = xhr.responseJSON[0];
                    //alert(encodeURIComponent(data.file_path.toString()));
                    $('#fileid').val(data.id);
                    $('#filepath').val(data.file_path.toString());
                    $('#filename').html(data.file_name.toString());
                }
            }
        });
    }
    $('#deleteNoticeFileModal').on('show.bs.modal', function(e) {
        $('#msg').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadFileByID(id);
    });


    var DeleteFileByID = function(id, path){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/section_files/delete/id/"+id,
            method: "DELETE",
            headers : {
                role : decryptLoginInfo.role_id,
                path: path,
            },
            complete: function (xhr, status) {
                $('#deleteNoticeFileModal').modal('toggle');
                LoadSectionFiles(sectionID);
            }
        });
    }

    $("#deletefileBTN").click(function () {
        DeleteFileByID($('#fileid').val(), $('#filepath').val());
    });
});
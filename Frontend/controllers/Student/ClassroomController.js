$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#topLayout').load("../Layouts/_StudentLayout.html");
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

        if(localStorage.loginInfo != null && decryptLoginInfo.role_id == 3) 
        {

        }
        else
        {   
            redirect(null);
        }
    }

    checkLocalStorage();



    var LoadAllSessionOptions = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/my_academic_sessions/get-session/student/"+id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '<option value="0">Select Session</option>';

                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += '<option value="'+data[i].section_id+'">'+data[i].year_name+' ('+data[i].class_name+')'+'</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#session").html(str);
                }
                else 
                {
                    str += "";
                    $("#session").html(str);
                }
            }
        });
    }

    var LoadStudentProfile = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/students/get-student/login/"+decryptLoginInfo.id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {                  
                   var data = xhr.responseJSON;
                   $('#studentID').val(data.id); 
                   LoadAllSessionOptions(data.id);                  
                }
                else {}
            }
        });
    }
    LoadStudentProfile();

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

                   
                    LoadStudents(data.id);
                    LoadRoutine(data.id);
                    LoadStudents(data.id);
                    LoadSectionFiles(data.id);
                }
                else {}
            }
        });
    }


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
                        
                                   "</tr>";
                            sl++;
                        }
                        
                    }
                    else
                    {
                        str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#studentsTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                    $("#studentsTable tbody").html(str);
                }
            }
        });
    }

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
    


    $('#session').change(function() {
        LoadSection($('#session').val());
    });
});
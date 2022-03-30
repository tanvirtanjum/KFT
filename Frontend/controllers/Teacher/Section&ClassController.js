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

                //    alert($('#teacherID').val());

                   
                }
                else {}
            }
        });
    }


    LoadTeachingProfile();

    var LoadAllSessionOptions = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/academic_sessions/get-all-session",
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
                            str += '<option value="'+data[i].id+'">'+data[i].year_name+'</option>';
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
    LoadAllSessionOptions();


    var LoadMySections = function(session_id, teacher_id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/academic_session_sections/get-sections/session/"+session_id+"/teacher/"+teacher_id,
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
                                        "<td>"+ data[i].class_name  +"</td>"+
                                        "<td>"+ data[i].section_name  +"</td>"+
                                        "<td>"+ data[i].wing_name  +"</td>"+
                                        "<td>"+ data[i].group_name  +"</td>"+
                                        "<td>"+
                                            "<a class='btn btn-sm btn-primary' href="+base_URL+"/views/Teacher/MySection.html?section="+btoa(data[i].id)+"&session="+btoa(data[i].session_id)+" role='button'><i class='fas fa-sitemap'></i> Manage Section</a>"+
                                        "</td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#secTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                    $("#secTable tbody").html(str);
                }
            }
        });
    }

    var LoadMySchedule = function(session_id, teacher_id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/section_courses/get-courses/session/"+session_id+"/teacher/"+teacher_id,
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
                                        "<td>"+ data[i].class_name  +"</td>"+
                                        "<td>"+ data[i].section_name  +"</td>"+
                                        "<td>"+ data[i].subject_name  +"</td>"+                                       
                                        "<td>"+ data[i].class_timing  +"</td>"+
                                        "<td>"+ data[i].wing_name  +"</td>"+
                                        "<td>"+ data[i].group_name  +"</td>"+
                                        "<td>"+
                                            "<a class='btn btn-sm btn-secondary' href="+base_URL+"/views/Teacher/Classroom.html?section="+btoa(data[i].section_id)+"&session="+btoa(data[i].session_id)+" role='button'><i class='fas fa-eye'></i> View Classroom</a>"+
                                        "</td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='8' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#schTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='8' align='middle'>NO DATA FOUND</td></tr>";
                    $("#schTable tbody").html(str);
                }
            }
        });
    }
    

    $('#session').change(function() {
        LoadMySections($('#session').val(), $('#teacherID').val());
        LoadMySchedule($('#session').val(), $('#teacherID').val());
    });
});
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

        if(decryptLoginInfo.role_id == 3) 
        {

        }
        else
        {   
            redirect(decryptLoginInfo.role_id);
        }
    }

    if(localStorage.getItem('loginInfo') == null)
    {
        redirect(null);
    }
    else
    {
        checkLocalStorage();
    }


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
                            str += '<option value="'+data[i].academic_session_id+'">'+data[i].year_name+' ('+data[i].class_name+')'+'</option>';
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

    var LoadAllTermsOptions = function(){
        $.ajax({
            url: api_base_URL+"/api/terms/get-all-terms",
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '<option value= "0">Select Term</option>';

                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += '<option value="'+data[i].id+'">'+data[i].term_name+'</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#term").html(str);
                }
                else 
                {
                    str += "";

                    $("#term").html(str);
                }
            }
        });
    }
    LoadAllTermsOptions();

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
                   $('#name_r').html(data.name);
                   $('#student_id_r').html(data.student_id);
                   $('#father_name_r').html(data.father_name);
                   $('#mother_name_r').html(data.mother_name);
                   $('#contact_r').html(data.contact);
                   $('#email_r').html(data.email);
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
                }
                else {
                   $('#sec_name').html(null);
                   $('#session_name').html(null);
                   $('#class_name').html(null);
                   $('#wing_name').html(null);
                   $('#group_name').html(null);
                   $('#teacher_name').html(null);
                }
            }
        });
    }
    

    var LoadResultsOfMyStudent = function(session, student, term){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/section_course_results/get-result/student/"+student+"/session/"+session+"/term/"+term,
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
                        var sub_total = 0;
                        LoadSection(data[0].section_id);
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += "<tr>"+
                                        "<th>"+ sl + "</th>"+
                                        "<td>"+ data[i].subject_name  +"</td>"+
                                        "<td>"+ data[i].term_name  +"</td>"+
                                        "<td>"+ data[i].ct1  +"</td>"+
                                        "<td>"+ data[i].ct2  +"</td>"+
                                        "<td>"+ data[i].termfinal  +"</td>"+
                                        "<td>"+ (data[i].ct1 + data[i].ct2 + data[i].termfinal)  +"</td>"+
                                        "<td>"+ data[i].remark_name  +"</td>"+
                                   "</tr>";
                            sub_total = sub_total+(data[i].ct1 + data[i].ct2 + data[i].termfinal);
                            sl++;
                        }
                        str += "<tr class='table-info'>"+
                               "<td colspan='6' align='right'>Sub Total</td>"+
                               "<td colspan='2' align='left'>"+sub_total+"</td>"+
                               "</tr>";
                    }
                    else
                    {
                        LoadSection(0);
                        str += "<tr><td colspan='8' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#resultsTable tbody").html(str);
                }
                else 
                {
                    LoadSection(0);
                    str += "<tr><td colspan='8' align='middle'>NO DATA FOUND</td></tr>";
                    $("#resultsTable tbody").html(str);
                }
            }
        });
    }

    $('#session').change(function() {
        LoadResultsOfMyStudent($('#session').val(), $('#studentID').val(), $('#term').val());
    });

    $('#term').change(function() {
        LoadResultsOfMyStudent($('#session').val(), $('#studentID').val(), $('#term').val());
    });

});
$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#topLayout').load("../Layouts/_TeacherLayout.html");
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

        if(decryptLoginInfo.role_id == 2) 
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
                                        "<td>"+
                                            "<button type='button' data-bs-toggle='modal' data-bs-target='#updateStudentModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-eye'></i> View</button>"+
                                            "&nbsp;<button type='button' data-bs-toggle='modal' data-bs-target='#viewResultModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-warning'><i class='fas fa-chart-bar'></i> View Results</button>"+
                                        "</td>"+
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
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateStudentModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-eye'></i> View</button>"+
                                        "&nbsp;<button type='button' data-bs-toggle='modal' data-bs-target='#viewResultModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-warning'><i class='fas fa-chart-bar'></i> View Results</button>"+
                                        "</td>"+
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

    // 
    // 
    // 
    // 
    // 
    // 
    // 
    // 
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
   
    var LoadStudentForResult = function(id){
        $.ajax({
            url: api_base_URL+"/api/students/get-student/"+id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
            
                   $('#id_r').val(data.id);

                   $('#name_r').html(data.name);
                   $('#student_id_r').html(data.student_id);
                   $('#father_name_r').html(data.father_name);
                   $('#mother_name_r').html(data.mother_name);
                   $('#contact_r').html(data.contact);
                   $('#email_r').html(data.email);
                   $('#status_r').html(data.status_name);

                   LoadAllSessionOptions(id);
                }
                else {}
            }
        });
    }

    $('#viewResultModal').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('bs-id');
        LoadStudentForResult(id);
        LoadResultsOfMyStudent(0, id);
    });

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
    

    var LoadResultsOfMyStudent = function(session, student){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/section_course_results/get-result/student/"+student+"/session/"+session,
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
                        LoadSection(data[0].section_id);
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += "<tr>"+
                                        "<th>"+ sl + "</th>"+
                                        "<td>"+ data[i].name  +"</td>"+
                                        "<td>"+ data[i].roll  +"</td>"+
                                        "<td>"+ data[i].subject_name  +"</td>"+
                                        "<td>"+ data[i].term_name  +"</td>"+
                                        "<td>"+ data[i].ct1  +"</td>"+
                                        "<td>"+ data[i].ct2  +"</td>"+
                                        "<td>"+ data[i].termfinal  +"</td>"+
                                        "<td>"+ (data[i].ct1 + data[i].ct2 + data[i].termfinal)  +"</td>"+
                                        "<td>"+ data[i].remark_name  +"</td>"+
                                   "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        LoadSection(0);
                        str += "<tr><td colspan='10' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#resultsTable tbody").html(str);
                }
                else 
                {
                    LoadSection(0);
                    str += "<tr><td colspan='10' align='middle'>NO DATA FOUND</td></tr>";
                    $("#resultsTable tbody").html(str);
                }
            }
        });
    }

    $('#session').change(function() {
        LoadResultsOfMyStudent($('#session').val(), $('#id_r').val());
    });
});
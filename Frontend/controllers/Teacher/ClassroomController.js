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
    var courseID = atob(searchParams.get('course'));

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

                    $("#termP").html(str);
                    $("#termU").html(str);
                    $("#termS").html(str);
                }
                else 
                {
                    str += "";

                    $("#termP").html(str);
                    $("#termU").html(str);
                    $("#termS").html(str);
                }
            }
        });
    }
    LoadAllTermsOptions();

    var LoadAllRemarksOptions = function(){
        $.ajax({
            url: api_base_URL+"/api/remarks/get-all-remarks",
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '';

                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += '<option value="'+data[i].id+'">'+data[i].remark_name+'</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#remarkP").html(str);
                    $("#remarkU").html(str);
                }
                else 
                {
                    str += "";

                    $("#remarkP").html(str);
                    $("#remarkU").html(str);
                }
            }
        });
    }
    LoadAllRemarksOptions();

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


    var LoadMySubject = function(id){
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

                   $('#subject_name').html(data.subject_name);
                   $('#class_time').html(data.class_timing);
                }
                else {}
            }
        });
    }
    LoadMySubject(courseID);


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
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateStudentModal' data-bs-id='"+data[i].student_id+"' class='btn btn-sm btn-dark'><i class='fas fa-eye'></i> View</button>"+
                                               "&nbsp;<button type='button' data-bs-toggle='modal' data-bs-target='#addStudentResultModal' data-bs-id='"+data[i].student_id+"' class='btn btn-sm btn-warning'><i class='fas fa-flag'></i> Submit Result</button></td>"+
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
                                        // "<td>"+ "<button type='button' data-bs-toggle='modal' data-bs-target='#deleteNoticeFileModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-danger'><i class='fas fa-trash-alt'></i> Delete</button>" +"</td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='3' align='middle'>NO DATA FOUND</td></tr>";
                    }

                   $("#filelistTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='3' align='middle'>NO DATA FOUND</td></tr>";
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
                       alert("File Uploaded. To Delete contact class teacher.");
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

    var LoadStudentDetailsForResult = function(id){
        $.ajax({
            url: api_base_URL+"/api/students/get-student/"+id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#id_r_p').val(data.id);
                   $('#student_name').html(data.name);
                   $('#student_id').html(data.student_id);
                   $('#subject').html($('#subject_name').html());

                }
                else {}
            }
        });
    }

    $('#addStudentResultModal').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('bs-id');
        LoadStudentDetailsForResult(id);
    });


    
    var PostResult = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/section_course_results/insert-result",
            method: "POST",
            data: {
                student_id : $('#id_r_p').val(),
                ct1 : $('#CT1P').val(),
                ct2 : $('#CT2P').val(),
                termfinal : $('#FinalP').val(),
                session_id : sessionID,
                section_id : sectionID,
                section_course_id : courseID,
                term_id : $('#termP').val(),
                remark_id : $('#remarkP').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                       alert("Result Published.");
                       LoadResultsOfMyCourse();
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
                // LoadSectionFiles(id);
             }
        });
    }

    var VerifyResult = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/section_course_results/get-result/course/"+courseID+"/term/"+$('#termP').val()+"/student/"+$('#id_r_p').val()+"/section/"+sectionID,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   alert("This Result is already published.");
                }
                else {
                    PostResult();
                }
            }
        });
    }

    var validateResultPost= function() {
        var validate = true;
        if(!$.isNumeric($("#CT1P").val()) || $("#CT1P").val() < 0)
        {
            validate = false;
            $("#CT1P").addClass("is-invalid");
        }
        else
        {
            $("#CT1P").removeClass("is-invalid");
        }

        if(!$.isNumeric($("#CT2P").val()) || $("#CT2P").val() < 0)
        {
            validate = false;
            $("#CT2P").addClass("is-invalid");
        }
        else
        {
            $("#CT2P").removeClass("is-invalid");
        }

        if(!$.isNumeric($("#FinalP").val()) || $("#FinalP").val() < 0)
        {
            validate = false;
            $("#FinalP").addClass("is-invalid");
        }
        else
        {
            $("#FinalP").removeClass("is-invalid");
        }

        if($("#termP").val() <= 0)
        {
            validate = false;
            $("#termP").addClass("is-invalid");
        }
        else
        {
            $("#termP").removeClass("is-invalid");
        }

        return validate;
    }

    $("#publishBTN").click(function () {
        if(validateResultPost())
        {
            VerifyResult();
        }
    });


    var LoadResultsOfMyCourse = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/section_course_results/get-result/course/"+courseID+"/term/"+$('#termS').val()+"/section/"+sectionID,
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
                                        "<td>"+ data[i].subject_name  +"</td>"+
                                        "<td>"+ data[i].term_name  +"</td>"+
                                        "<td>"+ data[i].ct1  +"</td>"+
                                        "<td>"+ data[i].ct2  +"</td>"+
                                        "<td>"+ data[i].termfinal  +"</td>"+
                                        "<td>"+ (data[i].ct1 + data[i].ct2 + data[i].termfinal)  +"</td>"+
                                        "<td>"+ data[i].remark_name  +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateStudentResultModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-success'><i class='fas fa-edit'></i> Edit</button></td>"+
                                   "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='11' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#resultsTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='11' align='middle'>NO DATA FOUND</td></tr>";
                    $("#resultsTable tbody").html(str);
                }
            }
        });
    }

    $('#termS').change(function() {
        LoadResultsOfMyCourse();
    });


    var LoadStudentResultForUpdate = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/section_course_results/get-result/"+id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#id_r_u').val(data.id);
                   $('#student_name_u').html(data.name);
                   $('#student_id_u').html(data.roll);
                   $('#subject_u').html(data.subject_name);

                   $('#CT1U').val(data.ct1);
                   $('#CT2U').val(data.ct2);
                   $('#FinalU').val(data.termfinal);
                   $('#termU').val(data.term_id);
                   $('#remarkU').val(data.remark_id);
                }
                else {}
            }
        });
    }

    $('#updateStudentResultModal').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('bs-id');
        LoadStudentResultForUpdate(id);
    });

});
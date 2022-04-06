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

    var LoadAllEmpStatusCount = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/employees/get-count",
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    
                    $("#ae").html(data.active_emp);
                    $("#oe").html(data.on_break_emp);
                    $("#le").html(data.left_emp);
                    $("#re").html(data.retired_emp);
                }
            }
        });
    }

    LoadAllEmpStatusCount();

    var LoadAllTeaStatusCount = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/teachers/get-count",
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    
                    $("#at").html(data.active_emp);
                    $("#ot").html(data.on_break_emp);
                    $("#lt").html(data.left_emp);
                    $("#rt").html(data.retired_emp);
                }
            }
        });
    }

    LoadAllTeaStatusCount();

    var LoadAllStuStatusCount = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/students/get-count",
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    
                    $("#as").html(data.active_stu);
                    $("#ags").html(data.ag_stu);
                    $("#atns").html(data.atn_stu);
                    $("#atds").html(data.atd_stu);
                }
            }
        });
    }

    LoadAllStuStatusCount();



    // -------------------

    var LoadAllNotice = function(){
        $.ajax({
            url: api_base_URL+"/api/notices/get-all-notices",
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
                            var Post_Date = new Date(data[i].created_at);
                            var Update_Date = new Date(data[i].updated_at);
                            
                            str += '<div class="card text-center mb-4 opacity-75">'+
                                        '<div class="card-header" id="postTime">'+
                                            "Posted At: "+Post_Date.toDateString()+
                                        "</div>"+
                                        '<div class="card-body">'+
                                            '<h5 class="card-title" id="subject">'+data[i].subject+'</h5>'+
                                            '<div id="view">'+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateNoticeModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-dark'><i class='fas fa-eye'></i>&nbsp;View</button>"+'</div>'+
                                        '</div>'+
                                        '<div class="card-footer text-muted" id="lastUpdate">'+
                                            "Last Update: <span style='color: blue;'>"+Update_Date.toUTCString()+"</span>"+
                                        '</div>'+
                                "</div>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<div align='middle' style='color: #9B0505;'><b>NO DATA FOUND</b></div>";
                    }

                    $("#notices").html(str);
                }
                else 
                {
                    str = "<div align='middle' style='color: #9B0505;'><b>NO DATA FOUND</b></div>";
                    $("#notices").html(str);
                }
            }
        });
    }
    LoadAllNotice();

    var LoadNotice = function(id){
        $.ajax({
            url: api_base_URL+"/api/notices/get-notice/"+id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;

                   $('#subjectU').val(data.subject);
                   $('#contentU').val(data.content);
                   $('#id').val(data.id);

                   LoadNoticeFiles(id);
                }
                else 
                {
                    str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
                    $("#noticeTable tbody").html(str);
                }
            }
        });
    }

    var LoadNoticeFiles = function(id){
        $.ajax({
            url: api_base_URL+"/api/notice_files/get-all-files/notice/"+id,
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
                        str += "<tr><td colspan='3' align='middle'>NO DATA FOUND</td></tr>";
                    }

                   $("#filelistU tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='3' align='middle'>NO DATA FOUND</td></tr>";
                    $("#filelistU tbody").html(str);
                }
            }
        });
    }

    $('#updateNoticeModal').on('show.bs.modal', function(e) {
        $('#msg').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadNotice(id);
    });


});
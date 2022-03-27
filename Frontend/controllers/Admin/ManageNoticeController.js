$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#topLayout').load("../Layouts/_AdminLayout.html");
    $('#bottomLayout').load("../Layouts/_BottomLayout.html");

    $('#msg').attr('hidden', true);
    $('#msgP').attr('hidden', true);

    $("#msgI").addClass("alert-info");
    $('#msgI').html('<small>You will be able to attach files after posting the notice.</small>');
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

                            str += "<tr>"+
                                        "<th>"+ sl + "</th>"+
                                        "<td>"+ data[i].subject +"</td>"+
                                        "<td>"+ Post_Date.toDateString() +"</td>"+
                                        "<td>"+ Update_Date.toUTCString() +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateNoticeModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button></td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#noticeTable tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
                    $("#noticeTable tbody").html(str);
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
                                        "<td>"+ "<button type='button' data-bs-toggle='modal' data-bs-target='#deleteNoticeFileModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-danger'><i class='fas fa-trash-alt'></i> Delete</button>" +"</td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
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

    $('#deleteNoticeFileModal').on('show.bs.modal', function(e) {
        $('#msg').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadFileByID(id);
    });

    ////////
    var LoadFileByID = function LoadFileByID(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var data;

        $.ajax({
            url: api_base_URL+"/api/notice_files/get-files/file_id/"+id,
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

    var DeleteNoticeFileByID = function(id, path){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/notice_files/delete/id/"+id,
            method: "DELETE",
            headers : {
                role : decryptLoginInfo.role_id,
                path: path,
            },
            complete: function (xhr, status) {
                $('#deleteNoticeFileModal').modal('toggle');
                LoadNoticeFiles($('#id').val());
            }
        });
    }
    $("#deletefileBTN").click(function () {
        DeleteNoticeFileByID($('#fileid').val(), $('#filepath').val());
    });
    

    var DeleteNoticeFilesForNoticeDelete = function async(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var complete = false;
        $.ajax({
            url: api_base_URL+"/api/notice_files/get-all-files/notice/"+id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;
                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            $.ajax({
                                url: api_base_URL+"/api/notice_files/delete/id/"+data[i].id,
                                method: "DELETE",
                                headers : {
                                    role : decryptLoginInfo.role_id,
                                    path: data[i].file_path,
                                },
                                complete: function (xhr, status) {
                                    console.log("file removed");
                                }
                            });
                        
                            if(i == data.length-1)
                            {
                                complete = true;
                            }
                        }

                        if(complete)
                        {
                            DeleteNotice(id);
                        }
                    }
                    else
                    {
                        DeleteNotice(id);
                    }
                }
                else
                {
                    DeleteNotice(id);
                }
            }
        });
        
    }

    var DeleteNotice = function async(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/notices/delete-notice/"+id,
            method: "DELETE",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 204) {
                    $('#updateNoticeModal').modal('toggle');
                    alert("Notice Deleted.");
                }
                else 
                {
                    alert("Something Went Wrong.");
                }
                LoadAllNotice();
            }
        });
    }
    $("#deleteBTN").click(function () {
        if(confirm("Are you sure you want to delete?"))
        {
            DeleteNoticeFilesForNoticeDelete($('#id').val());
    
        }
    });
  

    // var DeleteNotice = function(id){
    //     var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
    //     decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
    //     decryptLoginInfo = JSON.parse(decryptLoginInfo);
    //     $.ajax({
    //         url: api_base_URL+"/api/notices/delete-notice/"+id,
    //         method: "DELETE",
    //         headers : {
    //             role : decryptLoginInfo.role_id,
    //         },
    //         complete: function (xhr, status) {
    //             if (xhr.status == 204) {
    //                 $('#updateNoticeModal').modal('toggle');
    //                 alert("Notice Deleted.");
    //             }
    //             else 
    //             {
    //                 alert("Something Went Wrong.");
    //             }
    //             LoadAllNotice();
    //         }
    //     });
    // }
    // $("#deleteBTN").click(function () {
    //     if(confirm("Are you sure you want to delete?"))
    //     {
    //         DeleteNotice($('#id').val());
    //     }
    // });

    var validateNoticeUpdate= function() {
        var validate = true;
        if($.trim($("#subjectU").val()).length <= 0)
        {
            validate = false;
            $("#subjectU").addClass("is-invalid");
        }
        else
        {
            $("#subjectU").removeClass("is-invalid");
        }
        if($.trim($("#contentU").val()).length <= 0)
        {
            validate = false;
            $("#contentU").addClass("is-invalid");
        }
        else
        {
            $("#contentU").removeClass("is-invalid");
        }
        if(!validate)
        {
            $('#msg').attr('hidden', true);
        }

        return validate;
    }

    var UpdateNotice = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/notices/update-notice/"+id,
            method: "PUT",
            data : {
                subject : $('#subjectU').val(),
                content : $('#contentU').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        $("#msg").removeClass("alert-danger");
                        $("#msg").addClass("alert-success");
                        $('#msg').html('<small>Notice Updated.</small>');
                        $('#msg').removeAttr('hidden');
                    }
                    else 
                    {
                        $("#msg").removeClass("alert-success");
                        $("#msg").addClass("alert-danger");
                        $('#msg').html('<small>Something Went Wrong.</small>');
                        $('#msg').removeAttr('hidden');
                    }
                }
                else 
                {
                    $("#msg").removeClass("alert-success");
                    $("#msg").addClass("alert-danger");
                    $('#msg').html('<small>Something Went Wrong.</small>');
                    $('#msg').removeAttr('hidden');
                }
                LoadAllNotice();
                LoadNotice(id);
                LoadNoticeFiles(id);
            }
        });
    }

    $("#updateBTN").click(function () {
        if(validateNoticeUpdate())
        {
            UpdateNotice($('#id').val());
        }
    });

    var validateNoticePost= function() {
        var validate = true;
        if($.trim($("#subjectP").val()).length <= 0)
        {
            validate = false;
            $("#subjectP").addClass("is-invalid");
        }
        else
        {
            $("#subjectP").removeClass("is-invalid");
        }
        if($.trim($("#contentP").val()).length <= 0)
        {
            validate = false;
            $("#contentP").addClass("is-invalid");
        }
        else
        {
            $("#contentP").removeClass("is-invalid");
        }
        if(!validate)
        {
            $('#msgP').attr('hidden', true);
        }

        return validate;
    }

    var PostNotice = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/notices/post-notice",
            method: "POST",
            data : {
                subject : $('#subjectP').val(),
                content : $('#contentP').val(),
            },
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        $("#msgP").removeClass("alert-danger");
                        $("#msgP").addClass("alert-success");
                        $('#msgP').html('<small>Notice Posted.</small>');
                        $('#msgP').removeAttr('hidden');

                        $("#msgI").removeClass("alert-info");
                        $("#msgI").addClass("alert-success");
                        $('#msgI').html('<small>Now you can add files. For adding- <br>Go to "EDIT" of this notice.</small>');
                        $('#msgI').removeAttr('hidden');
                    }
                    else 
                    {
                        $("#msgP").removeClass("alert-success");
                        $("#msgP").addClass("alert-danger");
                        $('#msgP').html('<small>Something Went Wrong.</small>');
                        $('#msgP').removeAttr('hidden');

                        $("#msgI").removeClass("alert-success");
                        $("#msgI").addClass("alert-info");
                        $('#msgI').html('<small>You will be able to attach files after posting the notice.</small>');
                        $('#msgI').removeAttr('hidden');
                    }
                }
                else 
                {
                    $("#msgP").removeClass("alert-success");
                    $("#msgP").addClass("alert-danger");
                    $('#msgP').html('<small>Something Went Wrong.</small>');
                    $('#msgP').removeAttr('hidden');

                    $("#msgI").removeClass("alert-success");
                    $("#msgI").addClass("alert-info");
                    $('#msgI').html('<small>You will be able to attach files after posting the notice.</small>');
                    $('#msgI').removeAttr('hidden');
                }
                LoadAllNotice();
            }
        });
    }

    $("#postBTN").click(function () {
        if(validateNoticePost())
        {
            PostNotice();
        }
    });

    $('#addNoticeModal').on('show.bs.modal', function(e) {
        $('#msg').attr('hidden', true);
        $('#msgP').attr('hidden', true);
    
        $("#msgI").addClass("alert-info");
        $('#msgI').html('<small>You will be able to attach files after posting the notice.</small>');
        $('#msgI').removeAttr('hidden');
    });

    var PostNoticeFile = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var data = new FormData($('#uploadForm')[0]);

        $.ajax({
            url: api_base_URL+"/api/notice_files/post-files/notice/"+id,
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
                        $("#msgP").removeClass("alert-danger");
                        $("#msgP").addClass("alert-success");
                        $('#msgP').html('<small>Notice Posted.</small>');
                        $('#msgP').removeAttr('hidden');

                        $("#msgI").removeClass("alert-info");
                        $("#msgI").addClass("alert-success");
                        $('#msgI').html('<small>Now you can add files. For adding- <br>Go to "EDIT" of this notice.</small>');
                        $('#msgI').removeAttr('hidden');
                    }
                    else 
                    {
                        $("#msgP").removeClass("alert-success");
                        $("#msgP").addClass("alert-danger");
                        $('#msgP').html('<small>Something Went Wrong.</small>');
                        $('#msgP').removeAttr('hidden');

                        $("#msgI").removeClass("alert-success");
                        $("#msgI").addClass("alert-info");
                        $('#msgI').html('<small>You will be able to attach files after posting the notice.</small>');
                        $('#msgI').removeAttr('hidden');
                    }
                }
                else 
                {
                    $("#msgP").removeClass("alert-success");
                    $("#msgP").addClass("alert-danger");
                    $('#msgP').html('<small>Something Went Wrong.</small>');
                    $('#msgP').removeAttr('hidden');

                    $("#msgI").removeClass("alert-success");
                    $("#msgI").addClass("alert-info");
                    $('#msgI').html('<small>You will be able to attach files after posting the notice.</small>');
                    $('#msgI').removeAttr('hidden');
                }
                LoadNoticeFiles(id);
             }
        });
    }

    $("#attachBTN").click(function () {
        PostNoticeFile($('#id').val());
    });

});
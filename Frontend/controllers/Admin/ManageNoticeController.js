$(document).ready(function () {
    var base_URL = "http://127.0.0.1:5500";
    var api_base_URL = "http://localhost:3000";

    $('#topLayout').load("../Layouts/_AdminLayout.html");
    $('#bottomLayout').load("../Layouts/_BottomLayout.html");

    $('#msg').attr('hidden', true);
        
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
                            str += "<tr>"+
                                        "<th>"+ sl + "</th>"+
                                        "<td>"+ data[i].subject +"</td>"+
                                        "<td>"+ data[i].created_at +"</td>"+
                                        "<td>"+ data[i].updated_at +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateNoticeModal' data-bs-id='"+data[i].id+"' class='btn btn-primary rounded-pill'><i class='fas fa-edit'></i></button></td>"+
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
                }
                else 
                {
                    str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
                    $("#noticeTable tbody").html(str);
                }
            }
        });
    }

    $('#updateNoticeModal').on('show.bs.modal', function(e) {
        $('#msg').attr('hidden', true);
        var id = $(e.relatedTarget).data('bs-id');
        LoadNotice(id);
    });
    

    var DeleteNotice = function(id){
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
            DeleteNotice($('#id').val());
        }
    });

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
            }
        });
    }

    $("#updateBTN").click(function () {
        if(validateNoticeUpdate())
        {
            UpdateNotice($('#id').val());
        }
    });

});
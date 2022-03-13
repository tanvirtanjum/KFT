$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#topLayout').load("../Layouts/_SharedLayout.html");
    $('#bottomLayout').load("../Layouts/_BottomLayout.html");
    
    var LoadAllNotice = function(){
        $.ajax({
            url: api_base_URL+"/api/admission_notices/get-all-notices",
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
                            var Deadline = new Date(data[i].dead_line);
                            
                            str += '<div class="card bg-white bg-opacity-75 text-black text-center w-75" style="margin-bottom:2vh">'+
                                        '<div class="card-header">'+
                                            '<h5 class="card-title"><i class="fas fa-bullhorn"></i>&nbsp;Admission Notification</h5>'+
                                        '</div>'+
                                        '<div class="card-body">'+
                                            '<p class="card-text">'+data[i].title+'</p>'+
                                            '<p class="card-text"> Application Deadline: <span style="color:#9B0505">'+Deadline.toDateString()+'</span></p>'+
                                        '</div>'+
                                        '<div class="card-footer text-muted">'+
                                            '<p> Posted At: '+Update_Date.toUTCString()+' </p>'+
                                            "<button type='button' data-bs-toggle='modal' data-bs-target='#updateNoticeModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-dark'><i class='fas fa-eye'></i>&nbsp;View Details</button>"+
                                        '</div>'+
                                    '</div>';
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
            url: api_base_URL+"/api/admission_notices/get-notice/"+id,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;

                   var Deadline = new Date(data.dead_line);

                   $('#subjectU').val(data.title);
                   $('#deadlineU').val(Deadline.toDateString());
                   $('#contentU').val(data.details);
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
            url: api_base_URL+"/api/admission_notice_files/get-all-files/notice/"+id,
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
                                        "<td>"+ '<a class="btn btn-primary btn-sm" href="'+api_base_URL+'/api/download?path='+data[i].file_path+'" target="_blank" role="button" download><i class="fas fa-download"></i></a>' +"</td>"+
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
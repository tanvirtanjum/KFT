$(document).ready(function () {
    // var base_URL = "http://127.0.0.1:5500";
    // var api_base_URL = "http://localhost:3000";

    $('#topLayout').load("../Layouts/_SharedLayout.html");
    $('#bottomLayout').load("../Layouts/_BottomLayout.html");
        
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
                            
                            // OLD STYLE------
                            // str += '<div class="card text-center mb-4 opacity-75">'+
                            //             '<div class="card-header" id="postTime">'+
                            //                 "Posted At: "+Post_Date.toDateString()+
                            //             "</div>"+
                            //             '<div class="card-body">'+
                            //                 '<h5 class="card-title" id="subject">'+data[i].subject+'</h5>'+
                            //                 '<div id="view">'+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateNoticeModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-dark'><i class='fas fa-eye'></i>&nbsp;View</button>"+'</div>'+
                            //             '</div>'+
                            //             '<div class="card-footer text-muted" id="lastUpdate">'+
                            //                 "Last Update: <span style='color: blue;'>"+Update_Date.toUTCString()+"</span>"+
                            //             '</div>'+
                            //     "</div>";
                            // sl++;

                            str += '<div class="container-fluid bg-light opacity-75 mb-1 pb-1 pt-1">'+
                                        '<div class="row align-items-center">'+
                                            '<div class="col-3">'+
                                                '<small class="fw-light">'+
                                                    '<i class="fas fa-clock"></i> Posted At: '+Post_Date.toDateString()+
                                                '</small>'+
                                            '</div>'+
                                            '<div class="col-6 border-start border-end border-dark">'+
                                                '<span class="fw-bold fs-5">'+data[i].subject+'</span><br>'+
                                                '<small class="fw-light"><i class="fas fa-history"></i> Last Update: '+
                                                    '<span class="text-info">'+Update_Date.toDateString()+'</span>'+
                                                '</small>'+              
                                            '</div>'+
                                            '<div class="col-3">'+
                                                "<button type='button' data-bs-toggle='modal' data-bs-target='#updateNoticeModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-dark'><i class='fas fa-eye'></i>&nbsp;View</button>"+
                                            '</div>'+
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

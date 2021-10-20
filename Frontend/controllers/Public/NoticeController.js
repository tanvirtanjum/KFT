$(document).ready(function () {
    var base_URL = "http://127.0.0.1:5500";
    var api_base_URL = "http://localhost:3000";

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
                            
                            str += '<div class="card text-center mb-4 opacity-75">'+
                                        '<div class="card-header" id="postTime">'+
                                            "Posted At: "+Post_Date.toDateString()+
                                        "</div>"+
                                        '<div class="card-body">'+
                                            '<h5 class="card-title" id="subject">'+data[i].subject+'</h5>'+
                                            '<div id="view">'+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateNoticeModal' data-bs-id='"+data[i].id+"' class='btn btn-primary'><i class='fas fa-eye'></i>&nbsp;View</button>"+'</div>'+
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
                        str += "<div align='middle'>NO DATA FOUND</div>";
                    }

                    $("#notices").html(str);
                }
                else 
                {
                    str += "<div align='middle'>NO DATA FOUND</div>";
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
});

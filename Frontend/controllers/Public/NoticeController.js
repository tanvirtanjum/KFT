$(document).ready(function () {
    var base_URL = "http://127.0.0.1:5500";
    var api_base_URL = "http://localhost:3000";

    $('#topLayout').load("../Layouts/_SharedLayout.html");
    $('#bottomLayout').load("../Layouts/_BottomLayout.html");
        
    var loadAllNotice = function () {
        $.ajax({
            url: api_base_URL+"/api/roles/get-all-roles",
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;
                    data = data["data"];
                    console.log(data);
                    // console.log(data['data'][0].role_name);
                }
                else 
                {
                   
                }
            }
        });
    }
    loadAllNotice();
});

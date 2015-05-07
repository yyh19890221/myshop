

$(function() {
    $("#Opinition_Submit").click(function() {
        var submitTime = $("#hidTime").val();
        if (submitTime != '') {
            var d1 = new Date(submitTime);
            var d2 = new Date();
            var dif = d2.getTime() - d1.getTime();
            var getminits = dif / (60 * 1000);
            if (getminits < 1) {
                $("#sResultInfo").css("color", "red").html(store_Back.ErrorTimeInfo);
                return false;
            }
            else {
                $("#sResultInfo").css("color", "black").html("");
            }
        }
        var strtxtContent = $String.Trim($("#txtContent").val());
        var strEmail = $String.Trim($("#txtPhoneOrEmail").val());
        if (strtxtContent == '' || strtxtContent == store_Back.ContentInfo) {
            $("#sResultInfo").css("color", "red").html(store_Back.ErrorContentInfo);
            return false;
        }
        else {
            $("#sResultInfo").css("color", "black").html("");
        }
        if (strEmail == '' || strEmail == store_Back.EmailInfo) {
            $("#sResultInfo").css("color", "red").html(store_Back.ErrorEmailInfo);
            return false;
        }
        else {
            $("#sResultInfo").css("color", "black").html("");
        }
        var thisHtml = $(this).html();
        $.ajax({
            type: "post",
            url: $.newegg.buildWWW("Ajax/Common/AjaxOpinitionStore.aspx"),
            dataType: "json",
            timeout: 30000,
            data: {
                Content: escape(strtxtContent),
                Email: escape(strEmail)
            },
            beforeSend: function(XMLHttpRequest) {
                $("#Opinition_Submit").hide();
                $("#asubmiting").show();
            },
            success: function(data, textStatus) {
                if (data.Description == 'YES') {
                    $("#sResultInfo").css("color", "green").html("信息提交成功。");
                    $("#txtContent").val("");
                    $("#txtPhoneOrEmail").val("");
                    $("#Opinition_Submit").show();
                    $("#asubmiting").hide();
                    $("#hidTime").val(new Date().toString());

                }
                else {
                    $("#sResultInfo").css("color", "red").html(data.Description);
                    return false;
                }
            },
            complete: function(XMLHttpRequest, textStatus) {
                $("#Opinition_Submit").show();
                $("#asubmiting").hide();
            },
            error: function(msg) {

            }
        });
    });

});
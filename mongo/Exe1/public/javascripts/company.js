$(document).ready(function () {
  $("#createNewComp").click(function () {
    $("#myForm").submit();
  });
});

$(document).ready(() => {
  $(".deleteBtn").click(function () {
    $.ajax({
      method: "delete",
      url: `/company/deleteCompany/${$(this).attr("companyId")}`,
      success: function (data) {
        window.location.reload();
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

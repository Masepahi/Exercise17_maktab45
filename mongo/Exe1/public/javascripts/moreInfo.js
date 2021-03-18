$('.updBtn').on('click', function() {
    console.log(1);
    $('.updForm').removeClass('d-none')
});


$('.submitBtn').on('click', function() {
    console.log($(this).attr('companyId'));
    $.ajax({
        type: "POST",
        url: `/company/updateCompany/${$(this).attr('companyId')}`,
        success: function (response) {
            console.log(response);
            
        },
        error: function (error) {
            console.log(error);
        }
    });
})
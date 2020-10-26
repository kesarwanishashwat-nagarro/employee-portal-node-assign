(function () {
    var submit = $('#btnSubmit');
    function onsubmit(event) {
        event.preventDefault();
        submit.prop('disabled', true);
        window.showLoader();
        $.ajax('/api/auth/login',
            {
                type: 'POST',
                data: $("#loginForm").serialize(),
                success: function (res, status, xhr) {
                    if(res.metadata.status === 'success'){
                        window.location.href="/";
                    }
                    window.hideLoader();
                },
                error: function (jqXhr, textStatus, errorMessage) {
                    const errorRibbon = $('.alert-warning');
                    const errorObj = jqXhr.responseJSON;
                    errorRibbon.find('.text').html(errorObj.metadata && errorObj.metadata.errors && errorObj.metadata.errors.map(err => err.message + '<br />'))
                    errorRibbon.show();
                    submit.prop('disabled', false);
                    window.hideLoader();
                }
            });
    }

    function init() {
        $('.alert-warning').hide();
        $('.close').on('click', () => $('.alert-warning').hide())
        submit.on('click', onsubmit);
    }

    init();
})();
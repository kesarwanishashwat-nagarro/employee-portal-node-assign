(function () {
    const submit = $('#btnSubmit');
    function onsubmit(event) {
        event.preventDefault();
        submit.prop('disabled', true);
        hideRibbons();
        window.showLoader();
        $.ajax('/api/auth/register',
            {
                type: 'POST',
                data: $("#registerSubmit").serialize(),
                success: function (res, status, xhr) {
                    if(res.metadata.status === 'success'){
                        const successRibbon = $('.alert-success');
                        successRibbon.find('.text').html('You have been registered successfully, Please <a href="/auth/login">login</a> to continue');
                        successRibbon.show();
                        $("#registerSubmit")[0].reset();
                    }
                    submit.prop('disabled', false);
                    window.hideLoader();
                },
                error: function (jqXhr, textStatus, errorMessage) {
                    const errorRibbon = $('#validation-ribbon');
                    const errorObj = jqXhr.responseJSON;
                    errorRibbon.find('.text').html(errorObj.metadata && errorObj.metadata.errors && errorObj.metadata.errors.map(err => err.message + '<br />'))
                    errorRibbon.show();
                    submit.prop('disabled', false);
                    window.hideLoader();
                }
            });
    }

    function hideRibbons(){
        $('#validation-ribbon').hide();
        $('.alert-success').hide();
    }

    function init() {
        hideRibbons();
        $('.close').on('click', () =>  hideRibbons());
        $('.close').on('click', () => $('#validation-ribbon').hide())
        submit.on('click', onsubmit);
    }

    init();
})();
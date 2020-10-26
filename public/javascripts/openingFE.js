(function () {
    const submit = $('#btnSubmit');
    function onFormSubmit(event) {
        window.showLoader();
        hideRibbons();
        submit.prop('disabled', true);
        if (window.location.href.indexOf('update') >= 0) {
            addOpening(submit);
        } else if (window.location.href.indexOf('add') >= 0) {
            updateOpening();
        }
    }

    function updateOpening() {
        $.ajax('/api/opening/add/',
            {
                type: 'POST',
                data: $("#openingForm").serialize(),
                success: function (res, status, xhr) {
                    if (res && res.metadata && res.metadata.status === 'success') {
                        const successRibbon = $('.alert-success');
                        successRibbon.find('.text').html(res.metadata.message + ', redirecting to the main page.');
                        successRibbon.show();
                    }
                    window.hideLoader();
                    setTimeout(() => {
                        window.location.href = '/';
                        submit.prop('disabled', false);
                    }, 2000);
                },
                error: function (jqXhr, textStatus, errorMessage) {
                    const errorRibbon = $('.alert-danger');
                    const errorObj = jqXhr.responseJSON;
                    if (errorObj.metadata && errorObj.metadata.errors) {
                        errorRibbon.find('.text').html(errorObj.metadata.errors.map(err => err.message + '<br />'));
                        errorRibbon.show();
                        scrollTo(0, 0);
                    }
                    submit.prop('disabled', false);
                    window.hideLoader();
                }
            });
    }

    function hideRibbons() {
        $('.alert-success').hide();
        $('.alert-danger').hide();
    }

    function addOpening(submit) {
        const openingId = window.location.href.split('/')[5];
        $.ajax('/api/opening/update/' + openingId,
            {
                type: 'PUT',
                data: $("#openingForm").serialize(),
                success: function (res, status, xhr) {
                    if (res && res.metadata && res.metadata.status === 'success') {
                        const successRibbon = $('.alert-success');
                        successRibbon.find('.text').html(res.metadata.message + ', redirecting to the main page.');
                        successRibbon.show();
                        scrollTo(0, 0);
                    }
                    setTimeout(() => {
                        submit.prop('disabled', false);
                        window.location.href = '/';
                    }, 3000);
                    window.hideLoader();
                },
                error: function (jqXhr, textStatus, errorMessage) {
                    const errorRibbon = $('.alert-warning');
                    const errorObj = jqXhr.responseJSON;
                    if (errorObj.metadata && errorObj.metadata.errors) {
                        errorRibbon.find('.text').html(errorObj.metadata.errors.map(err => err.message + '<br />'));
                        errorRibbon.show();
                        scrollTo(0, 0);
                    }
                    setTimeout(() => {
                        submit.prop('disabled', false);
                        window.location.href = '/';
                    }, 3000);
                    window.hideLoader();
                }
            });
    }

    function init() {
        hideRibbons();
        submit.on('click', onFormSubmit);
        $('.close').on('click', () =>  hideRibbons());
    }


    init();
})();

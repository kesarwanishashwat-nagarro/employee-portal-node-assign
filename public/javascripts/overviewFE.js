(function () {

    function onApplyClick(event) {
        const openingId = $(event.currentTarget).attr('data-openingid');
        window.showLoader();
        hideRibbons();
        $.ajax('/api/opening/apply/' + openingId,
            {
                // type: 'GET',
                success: function (res, status, xhr) {
                    if (res && res.metadata && res.metadata.status === 'success') {
                        const successRibbon = $('.alert-success');
                        successRibbon.find('.text').html(res.metadata.message);
                        successRibbon.show();
                    }
                    window.hideLoader();
                },
                error: function (jqXhr, textStatus, errorMessage) {
                    const errorRibbon = $('.alert-warning');
                    const errorObj = jqXhr.responseJSON;
                    if (errorObj.metadata && errorObj.metadata.errors) {
                        errorRibbon.find('.text').html(errorObj.metadata.errors.map(err => err.message + '<br />'))
                        errorRibbon.show();
                    }
                    window.hideLoader();
                }
            });
    }

    function hideRibbons(){
        $('.alert-success').hide();
        $('.alert-warning').hide();
    }

    function init() {
        hideRibbons();
        $('.apply').click(onApplyClick)
        $('.close').on('click', () =>  hideRibbons());
    }

    init();
})();
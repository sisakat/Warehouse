function loadReports() {
    getTemplate('template-reports', function (reportsTemplate) {
        $('main').html(reportsTemplate);
    });
}
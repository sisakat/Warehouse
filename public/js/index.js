var page = "index";

$(document).ready(function () {
    setup();
    setupPageChangers();
});

function setupPageChangers() {
    $('a.warehouse').click(function() {
        page = "index";
        setup();
    });

    $('a.report').click(function() {
        page = "reports";
        setup();
    });
}

function changePage(newpage) {
    page = newpage;
    setup();
}

function setup() {
    switch(page) {
        case "index":
            loadIndex();
            break;
        case "reports":
            loadReports();
            break;
    }
}

function loadIndex() {
    getTemplate('template-index', function (indexTemplate) {
        $('main').html(indexTemplate);
    });
    loadArticles();
}


function getTemplate(templateName, callback) {
    $.get('/templates/templates.html', function (templates) {
        let template = $(templates).filter('#' + templateName).html();
        callback(template);
    });
}
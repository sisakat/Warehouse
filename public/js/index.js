var page = "index";
var first_load = true;

$(document).ready(function () {
    setup();
    setupPageChangers();
});

function setupCollapsible() {
    $(".collapsible").find("div.title").click(function () {
        $(this).parent().find("div.content").slideToggle();
    });
}

function setupPageChangers() {
    $('a.warehouse').click(function () {
        changePage("index");
    });

    $('a.report').click(function () {
        changePage("reports");
    });
}

function changePage(newpage) {
    page = newpage;
    first_load = true;
    setup();
}

function setup() {
    switch (page) {
        case "index":
            loadIndex();
            break;
        case "reports":
            loadReports();
            break;
    }
    first_load = false;
}

function loadIndex() {
    if (first_load) {
        getTemplate('template-index', function (indexTemplate) {
            $('main').html(indexTemplate);
            registerIndexActions();
            setupCollapsible();
        });
    }
    loadArticles();
}

function registerIndexActions() {
    $("input[name='storage']").keypress(function (e) {
        if (e.which == 32) {
            return false;
        }
    });

    $("#form-new-article").submit(function (e) {
        e.preventDefault();
        let form = $(this);
        let article = objectifyForm(form.serializeArray());
        putArticle(article);
    });
}

function objectifyForm(formArray) {

    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

function getTemplate(templateName, callback) {
    $.get('/templates/templates.html', function (templates) {
        let template = $(templates).filter('#' + templateName).html();
        callback(template);
    });
}
/* **************************************
    Main JS file
    Controlling the whole site
***************************************** */

var previous_page = "";
var page = "index";
var first_load = true;
var token = "";


$(document).ready(function () {
    token = getCookie("token");
    if (token === "") {
        window.location.href = "login.html";
    }

    setupAjaxHeader();

    getArticleTypes(function(types) {
        articleTypes = types;
            
        setup();
        setupPageChangers();
    });

    // allow user to use the back button from browser
    if (window.history && window.history.pushState) {
        window.history.pushState('forward', null, null);
        $(window).on('popstate', function() {
            changePage(previous_page);
        });
    }
});

/*
    Setup AJAX to send authorization header with every request
*/
function setupAjaxHeader() {
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        }
    });
}

/*
    Setup the collapsible elements with jQuery
*/
function setupCollapsible() {
    $(".collapsible").find("div.title").click(function () {
        $(this).parent().find("div.content").slideToggle();
    });
}

/*
    Setup the navigation bar click handlers
*/
function setupPageChangers() {
    $('a.warehouse').click(function () {
        event.preventDefault(); 
        changePage("index");
    });

    $('a.report').click(function () {
        event.preventDefault(); 
        changePage("reports");
    });

    $('a.logout').click(function (event) {
        event.preventDefault();
        logout();
    });
}

/*
    Logout the current logged-in token
*/
function logout() {
    let url = '/api/logout/';
    $.ajax({
        url: url,
        type: 'POST',
        data: {},
        success: function (result) {
            setCookie("token", "", .5);
            window.location.href = "login.html";
        }
    }).fail(function () {
        console.log("Could not log out token");
        setCookie("token", "", .5);
    });
}

/*
    Change the current displayed page to another page
*/
function changePage(newpage, param = null) {
    previous_page = page;
    page = newpage;
    first_load = true;
    setup(param);
}

/*
    Setup/Initialize the given page
*/
function setup(param) {
    switch (page) {
        case "index":
            loadIndex();
            break;
        case "reports":
            loadReports();
            break;
        case "detail":
            openArticle(param);
            break;
    }
    first_load = false;
}

/*
    Setup the index site
*/
function loadIndex() {
    if (first_load) {
        getTemplate('template-index', function (indexTemplate) {
            $('main').html(indexTemplate);
            registerIndexActions();
            setupCollapsible();
            fillArticleTypes();
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

/*
    Generates a JSON-Object out of the form data
*/
function objectifyForm(formArray) {

    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}


/*
    Loads the specified template from templates.html to use with Mustache
*/
function getTemplate(templateName, callback) {
    $.get('/templates/templates.html', function (templates) {
        let template = $(templates).filter('#' + templateName).html();
        callback(template);
    });
}
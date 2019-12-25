function loadArticles() {
    $.getJSON("/api/articles", articlesRetrieved);
}

function openArticle(id) {
    $.getJSON("/api/articles/" + id, detailArticleRetrieved);
}

function articlesRetrieved(data) {
    createStorages(data);
    populateStorages(data);
}

function detailArticleRetrieved(data) {
    getTemplate('template-article-detail', function (detailTemplate) {
        $('main').html(Mustache.render(detailTemplate, data));
        registerDetailActions();
        fillArticleTypes();
    });
}

function createStorages(data) {
    let storages = [];
    let storageId = '#storages';
    $(storageId).empty();
    getTemplate('template-storage', function (storageTemplate) {
        for (let i = 0; i < data.length; i++) {
            if (!storages.includes(data[i].storage)) {
                $(storageId).append(Mustache.render(storageTemplate, data[i]));
                storages.push(data[i].storage);
            }
        }
    });
}

function populateStorages(data) {
    getTemplate('template-article', function (articleTemplate) {
        for (let i = 0; i < data.length; i++) {
            $('#storage-' + data[i].storage + ' > .content').empty();
        }
        for (let i = 0; i < data.length; i++) {
            $('#storage-' + data[i].storage + ' > .content').append(Mustache.render(articleTemplate, data[i]));
        }
    });
}

function putArticle(article) {
    $.ajax({
        url: '/api/articles/',
        type: 'PUT',
        data: article,
        success: function (result) {
            setup();
        }
    }).fail(function () {
        setup();
        alert('Could not insert article');
    });
}

function deleteArticle(id) {
    if (confirm("Are you sure you want to delete this article?")) {
        let url = '/api/articles/' + id;
        $.ajax({
            url: url,
            type: 'DELETE',
            success: function (result) {
                setup();
            }
        }).fail(function () {
            setup();
            alert('Could not delete article');
        });
    }
}

function postArticle(article, returnToIndex = true) {
    let url = '/api/articles/' + article.articleId;
    $.ajax({
        url: url,
        type: 'POST',
        data: article,
        success: function (result) {
            if (returnToIndex) {
                changePage("index");
            }
        }
    }).fail(function () {
        setup();
        alert('Could not update article');
    });
}

function registerDetailActions() {
    $("input[name='storage']").keypress(function (e) {
        if (e.which == 32) {
            return false;
        }
    });

    $("#form-article-detail").submit(function (e) {
        e.preventDefault();
        let form = $(this);
        let article = objectifyForm(form.serializeArray());
        postArticle(article);
    });
}

function changeArticleQuantity(id, qty) {
    $.getJSON("/api/articles/" + id, function(data) {
        data.quantity += Number(qty);
        postArticle(data, false);
        $("#article-" + id + "-qty").html(data.quantity);
    });
}

function getArticleTypes(callback) {
    $.getJSON("/api/articles/types", function(types) {
        callback(types);
    });
}

function fillArticleTypes() {
    $('select.types').each(function() {
        for(let i = 0; i < articleTypes.length; i++) {
            $(this).append('<option value="' + articleTypes[i].type_id + '">' + articleTypes[i].caption + '</option>');
        }
    });
}
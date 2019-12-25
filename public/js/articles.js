function loadArticles() {
    $.getJSON("/api/articles", articlesRetrieved);
}

function articlesRetrieved(data) {
    createStorages(data);
    populateStorages(data);
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
        success: function(result) {
            setup();
        }
    }).fail(function() {
        setup();
        alert('Could not insert article');
    });
}

function deleteArticle(id) {
    let url = '/api/articles/' + id;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result) {
            setup();
        }
    }).fail(function() {
        setup();
        alert('Could not delete article');
    });
}
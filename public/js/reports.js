function loadReports() {
    getTemplate('template-reports', function (reportsTemplate) {
        $('main').html(reportsTemplate);
        loadHistoryItems();
    });
}

function loadHistoryItems() {
    $.getJSON("/api/articles/changes/", historyItemsRetrieved);
}

function historyItemsRetrieved(data) {
    populateHistory(data);
}

function populateHistory(data) {
    getTemplate("template-history-item", function(historyItemTemplate) {
        $("#historyItems").empty();
        for (let i = 0; i < data.length; i++) {
            $("#historyItems").append(Mustache.render(historyItemTemplate, data[i]));
        }
    });
}
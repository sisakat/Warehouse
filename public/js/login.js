$(document).ready(function () {
    $("#form-login").submit(function (e) {
        e.preventDefault();
        let password = $("input[name='password']").val();
        login(password);
    });
});

function login(password) {
    let url = '/api/login/';
    let data = {
        password: password
    };
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function (result) {
            alert(result.token)
        }
    }).fail(function () {
        alert('Login incorrect');
    });
}
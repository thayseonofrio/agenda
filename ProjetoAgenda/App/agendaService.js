//factory que busca todos os dados na api
app.factory('AgendaService', function ($http) {
    var fac = {};
    fac.GetAllDados = function () {
        return $http.get(window.location.protocol + "//" + window.location.host + '/' + 'api/Agenda/GetAllCompromissos');
    }
    return fac;
});
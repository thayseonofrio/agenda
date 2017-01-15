//factory que busca todos os dados na api
app.factory('AgendaService', function ($http) {
    var fac = {};
    fac.GetAllDados = function () {
        return $http.get('api/Agenda/GetAllCompromissos');
    }
    return fac;
});
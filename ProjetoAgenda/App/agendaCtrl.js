// faz a injeção de dependência do service (AgendaService) e faz as operações de CRUD
app.controller('agendaCtrl', function ($scope, $http, AgendaService) {

    $scope.dadosAgenda = null;
    AgendaService.GetAllDados().then(function (d) {
        $scope.dadosAgenda = d.data;
        angular.forEach($scope.dadosAgenda, function (value, key) {
            $scope.dadosAgenda[key].DataFinal = new Date(value.DataFinal);
      
            $scope.dadosAgenda[key].DataInicio = new Date(value.DataInicio);
            $scope.dadosAgenda[key].DataParaComparacao = value.DataInicio.toLocaleDateString();

        });
    }, function () {
        alert('Erro ao buscar os dados'); // se der errado, emite alerta --trocar depois
    });

    // Calcula o número de compromissos na agenda
    $scope.total = function () {
        var total = 0;
        angular.forEach($scope.dadosAgenda, function (item) {
            total += 1;
        })
        return total;
    }
    //inicializa o objeto compromisso no escopo
    $scope.Compromisso = {
        ID: '',
        Titulo: '',
        DataInicio: new Date(),
        DataParaComparacao: '',
        DataFinal: new Date(),
        HorarioInicio: new Date(),
        HorarioFinal: new Date(),
        Detalhes: ''
    };

    // função para limpar as propriedades 
    $scope.clear = function () {
        $scope.Compromisso.ID = '';
        $scope.Compromisso.Titulo = '';
        $scope.Compromisso.DataInicio = new Date();
        $scope.Compromisso.DataFinal = new Date();
        $scope.Compromisso.DataParaComparacao = $scope.Compromisso.DataInicio.toLocaleDateString();
        $scope.Compromisso.HorarioInicio = new Date();
        $scope.Compromisso.HorarioFinal = new Date();
        $scope.Compromisso.Detalhes = '';
    }

    //Adicionar um compromisso novo
    $scope.save = function () {
        if ($scope.Compromisso.Titulo != "" && $scope.Compromisso.DataInicio != "" && $scope.Compromisso.DataFinal != "" && $scope.Compromisso.HorarioInicio != "" && $scope.Compromisso.HorarioFinal != "") {
           
            
            $http({
                method: 'POST',
                url: 'api/Agenda/PostCompromisso/',
                data: $scope.Compromisso
            }).then(function successCallback(response) {
                
                var compromisso = response.data;
                compromisso.DataParaComparacao = (new Date(compromisso.DataInicio)).toLocaleDateString();
                
                $scope.dadosAgenda.push(response.data);
                $scope.clear();
                alert("Compromisso adicionado com sucesso");
            }, function errorCallback(response) {
                
                alert("Erro : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Insira todos valores');
        }
    };

    //GET para editar o compromisso
    //$scope.edit = function (data) {
    //    $scope.Compromisso = { ID: data.ID, Titulo: data.Titulo, DataInicio: new Date(data.DataInicio), DataFinal: new Date(data.DataFinal), HorarioInicio: data.HorarioInicio, HorarioFinal: data.HorarioFinal, Detalhes: data.Detalhes };
    //}
    $scope.edit = function (id) {
        $http({
            method: 'GET',
            url: 'api/Agenda/GetCompromisso/' + id,
        }).then(function successCallback(response) {
            $scope.Compromisso = response.data;
            $scope.Compromisso.DataInicio = new Date(response.data.DataInicio);
     
            $scope.Compromisso.DataFinal = new Date(response.data.DataFinal);
            //$scope.Compromisso.DataParaComparacao = response.data.DataInicio.toLocaleDateString();

        }, function errorCallback(response) {
            alert("Erro : " + response.data.ExceptionMessage);
        });
    }

    // Cancelar
    $scope.cancel = function () {
        $scope.clear();
    }

    //PUT para editar o compromisso
    $scope.update = function () {
        if ($scope.Compromisso.Titulo != "" && $scope.Compromisso.DataInicio != "" && $scope.Compromisso.DataFinal != "" && $scope.Compromisso.HorarioInicio != "" && $scope.Compromisso.HorarioFinal != "") {
            
            $http({
                method: 'PUT',
                url: 'api/Agenda/PutCompromisso/' + $scope.Compromisso.ID,
                data: $scope.Compromisso
            }).then(function successCallback(response) {
                $scope.dadosAgenda = response.data;
                $scope.dadosAgenda.DataInicio = new Date(response.data.DataInicio);
                $scope.dadosAgenda.DataFinal = new Date(response.data.DataFinal);
                $scope.dadosAgenda.DataParaComparacao = response.data.DataInicio.toLocaleDateString();
                $scope.clear();
                alert("Compromisso alterado com sucesso!");
            }, function errorCallback(response) {
                alert("Erro : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Insira todos os valores');
        }
    };

    // Deletar detalhes do compromisso
    //$scope.delete = function (index) {
    //    $http({
    //        method: 'DELETE',
    //        url: 'api/Agenda/DeleteCompromisso/' + $scope.dadosAgenda[index].ID,
    //    }).then(function successCallback(response) {
    //        $scope.dadosAgenda.splice(index, 1);
    //        alert("Compromisso deletado com sucesso");
    //    }, function errorCallback(response) {
    //        alert("Erro : " + response.data.ExceptionMessage);
    //    });
    //};
    $scope.delete = function (id) {
        $http({
            method: 'DELETE',
            url: 'api/Agenda/DeleteCompromisso/' + id,
        }).then(function successCallback(response) {
            $scope.dadosAgenda = null;
            AgendaService.GetAllDados().then(function (d) {
                $scope.dadosAgenda = d.data;
                angular.forEach($scope.dadosAgenda, function (value, key) {
                    $scope.dadosAgenda[key].DataFinal = new Date(value.DataFinal);
                    $scope.dadosAgenda[key].DataInicio = new Date(value.DataInicio);
                    $scope.dadosAgenda[key].DataParaComparacao = value.DataInicio.toLocaleDateString();
                });
            }, function () {
                alert('Erro ao buscar os dados'); // se der errado, emite alerta --trocar depois
            });
            alert("Compromisso deletado com sucesso");
        }, function errorCallback(response) {
            alert("Erro : " + response.data.ExceptionMessage);
        });
    };

});

angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http) {
    $scope.app = "Lista Telefonica";
    $scope.contatos = [
        {nome: "Ana", telefone: "9999-8888", operadora: "Oi", data: Date.now()},
        {nome: "João", telefone: "9999-7777", operadora: "Tim", data: Date.now()},
        {nome: "Maria", telefone: "9999-6666", operadora: "Claro", data: Date.now()}
    ];
    $scope.operadoras = [
        {nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
        {nome: "Tim", codigo: 41, categoria: "Celular", preco: 1},
        {nome: "Vivo", codigo: 15, categoria: "Celular", preco: 3},
        {nome: "GVT", codigo: 25, categoria: "Fixo", preco: 1},
        {nome: "Embratel", codigo: 21, categoria: "Fixo", preco: 2}
    ];

    var loadContatos = function(){
        $http({
            method: 'GET',
            url: 'http://localhost:63342/contatos'
        }).then(function (response) {
            $scope.contatos = response.data;
        }, function (error) {
            $scope.message = error;
        });
    };

    var loadOperadoras = function(){
        $http({
            method: 'GET',
            url: 'http://localhost:63342/operadoras'
        }).then(function (response) {
            $scope.operadoras = response.data;
        }, function (error) {
            $scope.message = error;
        });
    };

    $scope.addContato = function (contato) {
        contato.data = new Date();
        $http.post('http://localhost:63342/contatos', contato).then(function (response) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            loadContatos();
        });

    };
    $scope.apagarContato = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado) return contato;
        });
    };
    $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
            return contato.selecionado;
        });
    };
    $scope.ordenarPor = function (campo){
        $scope.ordena = campo;
        $scope.direcao = !$scope.direcao;
    };

    loadContatos();
    loadOperadoras();
});
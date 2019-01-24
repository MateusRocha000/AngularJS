angular.module("listaTelefonica").factory("contatosAPI", function ($http, config) {
    var _getContatos = function () {
        return $http({
            method: 'GET',
            url: config.baseUrl + '/contatos'
    });

    var _saveContato = function (contato) {
        return $http.post(config.baseUrl + '/contatos', contato);
    };

        return
        {
            getContatos: _getContatos,
            saveContato: _saveContato
        }
    }
});
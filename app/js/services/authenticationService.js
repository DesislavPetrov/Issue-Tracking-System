app.factory('authenticationService', ['$http', '$q', 'headerService', 'BASE_SERVICE_URL',
    function ($http, $q, headerService, BASE_SERVICE_URL){
        function login (user){
            var deferred = $q.defer();
            var data = 'grant_type=password&username=' + user.email + '&password=' + user.password;
            $http.post(BASE_SERVICE_URL + 'api/token', data, headerService.getWWWContentHeader())
                .then(function(success){
                    deferred.resolve(success);
                }, function (error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function register (user){
            var deferred = $q.defer();
            $http.post(BASE_SERVICE_URL + 'api/account/register', user)
                .then (function (success){
                    deferred.resolve(success.data);
                }, function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return {
            register : register,
            login : login
        }
    }]);
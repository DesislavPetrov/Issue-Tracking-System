app.factory('authenticationService', ['$http', '$q', 'headerService', 'notifyService', 'BASE_SERVICE_URL',
    function ($http, $q, headerService, notifyService, BASE_SERVICE_URL){
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

        function login (user){
            var deferred = $q.defer();
            var data = 'grant_type=password&username=' + user.email + '&password=' + user.password;
            $http.post(BASE_SERVICE_URL + 'api/token', data, headerService.getAuthHeader())
                .then(function(success){
                    deferred.resolve(success);
                }, function (error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getCurrent(){
            var deferred = $q.defer();
            $http.get(BASE_SERVICE_URL + 'users/me', headerService.getAuthHeader())
                .then(function (success){
                    deferred.resolve(success.data);
                }, function (error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function changePassword (oldPassword, newPassword, confirmNewPassword){
            if(newPassword != confirmNewPassword){
                notifyService.showInfo('Passwords do not match');
                return;
            }

            var deferred = $q.defer();
            var data = 'OldPassword=' + oldPassword + '&NewPassword=' + newPassword + '&ConfirmPassword=' + confirmNewPassword;
            $http.post(BASE_SERVICE_URL + 'api/account/changePassword', data, headerService.getAuthAndWWWContentHeader())
                .then(function(success){
                    deferred.resolve(success);
                }, function(error){
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getAllUsers (){
            var deferred = $q.defer();
            var usersUrl = BASE_SERVICE_URL + 'users/';
            $http.get(usersUrl, headerService.getAuthHeader())
                .then(function(success){
                    var users = success.data.sort(function(a,b){
                        return a.Username.localeCompare(b.Username);
                    });
                    deferred.resolve(users);
                }, function (error){
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        return {
            register : register,
            login : login,
            getCurrent : getCurrent,
            changePassword : changePassword,
            getAllUsers : getAllUsers
        }
    }]);
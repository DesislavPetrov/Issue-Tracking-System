app.factory('authService', ['$http', 'BASE_SERVICE_URL',
    function ($http, BASE_SERVICE_URL){
        return {
            login: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: BASE_SERVICE_URL + '/api/account/login',
                    data: userData
                };
                $http(request).success(function(data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            },

            register: function(userData, success, error) {
                var request = {
                    method: 'POST',
                    url: BASE_SERVICE_URL + '/api/account/register',
                    data: userData
                };
                $http(request).success(function(data) {
                    sessionStorage['currentUser'] = JSON.stringify(data);
                    success(data);
                }).error(error);
            }
        }
    }]);
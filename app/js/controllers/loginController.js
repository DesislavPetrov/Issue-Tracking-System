app.controller('LoginController', ['$scope', '$location', 'authenticationService', 'notifyService',
    function($scope, $location, authenticationService, notifyService){
        $scope.login = function(loginUser) {
            authenticationService.login(loginUser)
                .then(function(success){
                    sessionStorage['authToken'] = success.data['access_token'];
                    notifyService.showInfo("Login successful");
                    $location.path('/');
                }, function (error) {
                    notifyService.showError("Login failed", error);
                });
        };

        $scope.register = function (regUser) {
            authenticationService.register(regUser)
                .then(function (success) {
                    sessionStorage['authToken'] = success.data['access_token'];
                    notifyService.showInfo("Registration successful");
                    $location.path('/');
                }, function (error) {
                    notifyService.showError("Registration failed", error);
                })
        };
    }]);
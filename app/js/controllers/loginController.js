app.controller('LoginController', ['$scope', '$location', 'authenticationService', 'notifyService',
    function($scope, $location, authenticationService, notifyService){
        $scope.login = function(loginUser) {
            authenticationService.login(loginUser)
                .then(function(success){
                    sessionStorage['authToken'] = success.data['access_token'];
                    $location.path('/');
                    authenticationService.getCurrent().then(function(userDetails) {
                        notifyService.showInfo('Login successful');
                        sessionStorage['userId'] = userDetails.Id;
                        sessionStorage['isAdmin'] = userDetails.isAdmin;
                        sessionStorage['username'] = userDetails.Username;
                    });
                }, function (error) {
                    notifyService.showError("Login failed", error);
                });
        };
    }]);
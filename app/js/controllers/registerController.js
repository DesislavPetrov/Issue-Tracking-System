app.controller('RegisterController', ['$scope', '$rootScope', '$location', 'notifyService', 'authService', 'PASSWORD_MAX_LENGTH', 'PASSWORD_MIN_LENGTH',
    function($scope, $rootScope, $location, notifyService, authService, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH){
        $scope.passwordMinLength = PASSWORD_MIN_LENGTH;
        $scope.passwordMaXLength = PASSWORD_MAX_LENGTH;

        $scope.register = function(userData) {
            authService.register(userData,
                function success() {
                    notifyService.showInfo("User registered successfully");
                    $location.path("/");
                },
                function error(err) {
                    notifyService.showError("User registration failed", err);
                }
            );
        };
    }]);
app.controller('PasswordChangeController', ['$scope', '$route', 'authenticationService',
    function ($scope, $route, authenticationService){
        authenticationService.getCurrent()
            .then(function (success) {
                $scope.currentUser = success;
            });

        $scope.changePassword = function(){
            authenticationService.changePassword(
                $scope.oldPassword,
                $scope.newPassword,
                $scope.confirmPassword
            ).then(function(success){
                $route.reload();
            })
        }
    }
]);
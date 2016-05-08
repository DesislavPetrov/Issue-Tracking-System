app.controller('PasswordChangeController', ['$scope', '$route', 'authenticationService','notifyService',
    function ($scope, $route, authenticationService, notifyService){
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
                notifyService.showInfo('Password has been changed');
                $route.reload();
            })
        }
    }
]);
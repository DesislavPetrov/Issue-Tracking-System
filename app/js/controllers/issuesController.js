app.controller('IssuesController', ['$scope', '$routeParams', 'issuesService', '$location', '$route', 'projectService', 'notifyService',
    function($scope, $routeParams, issuesService, $location, $route, projectService, notifyService){
        $scope.getIssueById = function(){
            issuesService.getIssueById($routeParams.id)
                .then(function (success) {
                    $scope.currentIssue = success;
                    //$scope.isAssignee = success.Assignee.Id == sessionStorage['userId'] && sessionStorage['userId'];
                    projectService.getProjectById(success.Project.Id)
                        .then(function(project){
                            $scope.isLead = project.Lead.Id == sessionStorage['userId'];
                        })
                })
        };
        $scope.getIssueById();

        $scope.openEditIssue = function(){
            $location.path('/issues/' + $routeParams.id + '/edit');
        };

        function getComments(){
            issuesService.getComments($routeParams.id)
                .then(function(success){
                    $scope.issueComments = success;
                })
        }
        getComments();

        $scope.addComment = function(){
            issuesService.addComment($routeParams.id, $scope.addCommentDescription)
                .then(function(){
                    getComments();
                    notifyService.showInfo('Comment has been added');
                    $route.reload();
                }, function(error){
                    console.error(error);
                })
        };

        $scope.changeStatus = function(){
            var newStatus = $scope.newStatus;
            issuesService.changeStatus($routeParams.id, newStatus)
                .then(function(){
                    notifyService.showInfo('Status has been changed');
                    $route.reload();
                }, function(error){
                    console.error(error);
                })
        };

        $scope.goToHomepage = function(){
            $location.path('/');
        };
    }
]);
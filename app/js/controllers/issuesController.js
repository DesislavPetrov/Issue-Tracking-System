app.controller('IssuesController', ['$scope', '$routeParams', 'issuesService', '$location', '$route', 'projectService',
    function($scope, $routeParams, issuesService, $location, $route, projectService){
        $scope.getIssueById = function(){
            issuesService.getIssueById($routeParams.id)
                .then(function (success) {
                    $scope.currentIssue = success;
                    $scope.isAssignee = success.Assignee.Id == sessionStorage['userId'] && sessionStorage['userId'];
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

        $scope.goToHomepage = function(){
            $location.path('/');
        };
    }
]);
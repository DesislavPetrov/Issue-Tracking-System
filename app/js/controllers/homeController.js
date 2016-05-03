app.controller ('HomeController', ['$scope', '$location', 'authenticationService', 'ISSUES_PER_PAGE', 'issuesService', 'projectService',
    function($scope, $location, authenticationService, ISSUES_PER_PAGE, issuesService, projectService){
        if (!sessionStorage['authToken']) {
            $location.path('/login');
        }

        $scope.projectsParams1 = {
            'startPage': 1,
            'pageSize': ISSUES_PER_PAGE,
            'filter': ''
        };

        $scope.projectsParams2 = {
            'startPage': 1,
            'pageSize': ISSUES_PER_PAGE,
            'filter': ''
        };

        $scope.projectsParams3 = {
            'startPage': 1,
            'pageSize': ISSUES_PER_PAGE,
            'filter': ''
        };

        // The backend supports descending sorting, just add “desc” after the property (for example “IssueKey desc”)
        $scope.getIssues = function (){
            issuesService.getCurrentUserAssignedIssues('DueDate desc', $scope.projectsParams1.pageSize, $scope.projectsParams1.startPage)
                .then(function(success){
                    $scope.assignedIssues = success.Issues;
                    $scope.assignedIssuesTotalNumber = success.TotalCount;
                });
        };
        $scope.getIssues();

        $scope.getProjectsWithAssignedIssues = function(){
            $scope.totalProjectsWithAssignedIssues = [];
            issuesService.getCurrentUserAssignedIssues('DueDate', $scope.projectsParams2.pageSize, $scope.projectsParams2.startPage)
                .then(function(success){
                    var uniqueProjectIds = [];
                    if(success.Issues.length > 0){
                        success.Issues.forEach(function(issue){
                            uniqueProjectIds[issue.Project.Id] = issue.Project.Id;
                        });
                    }

                    if(uniqueProjectIds){
                        uniqueProjectIds.forEach(function(id){
                            projectService.getProjectById(id)
                                .then(function(success){
                                    $scope.totalProjectsWithAssignedIssues.push(success)
                                }, function(error){
                                    console.error(error);
                                })
                        })
                    }
                    $scope.totalProjectsIssues = $scope.totalProjectsWithAssignedIssues.count || 0;
                }, function(error){
                    console.error(error);
                })
        };
        $scope.getProjectsWithAssignedIssues();

        $scope.getLedProjects = function(){
            $scope.projectsWithAssignedIssues = [];
            authenticationService.getCurrent()
                .then(function(currentUserData){
                    projectService.getProjectsByFilter('Lead.Username', currentUserData.Username, $scope.projectsParams3.pageSize, $scope.projectsParams3.startPage)
                        .then(function(projects){
                            $scope.totalLedProjects = projects.data.TotalCount;
                            $scope.projectsLead = projects.data.Projects;
                        }, function(error){
                            console.error(error);
                        })
                })
        };
        $scope.getLedProjects();
    }]);
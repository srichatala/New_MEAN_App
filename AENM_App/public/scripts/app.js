function serverClients($scope, $http) {
    
    //Get value from front-end
    $scope.create = function () {
        $http.post('/serviceClients', $scope.serverClient)
        .success(function (response) {
            $scope.all_info();
            $scope.successTextAlert = "Patient record inserted";
        });
    }
    
    $scope.renderserviceClients = function (response) {
        $scope.serviceClients = response;
    };
    
    $scope.delete = function (id) {
        $http.delete('/serviceClients/' + id)
        .success(function (response) {
            $scope.all_info();
        });
    };
    
    $scope.select = function (id) {
        $http.get('/serviceClients/' + id)
        .success(function (response) {
            $scope.serverClient = response;
        });
    };
    
    $scope.update = function () {
        $http.put('/serviceClients/' + $scope.serverClient._id, $scope.serverClient)
        .success(function (response) {
            $scope.all_info();
            $scope.successTextAlert = "Patient record updated";
        });
    };
    
    $scope.all_info = function () {
        $http.get('/serviceClients')
        .success($scope.renderserviceClients);
    }
    
    $scope.all_info();
}
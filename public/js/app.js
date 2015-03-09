var app = angular.module("Application", []);

app.controller("AppCtrl",
    function ($scope, $http) {
        // $scope.hello = "hello from AppCtrl";

        //$scope.selectedIndex = null;
        //$scope.select = function (id) {
        //    $scope.selectedIndex = id;
            
        //    $scope.player = $scope.players[index];
        //}

        $scope.selectedIndex = null;
        $scope.select = function (id) {
            $scope.selectedIndex = id;
            $http.get("/api/players/" + id)
            .success(function (response) {
                $scope.player = response;
            });
        }

        $scope.update = function (player) {
            $http.put("/api/players/" + $scope.selectedIndex, player)
             .success(function (response) {
                 $scope.players = response;
             });
        }

        $scope.add = function (player) {
            $http.post("/api/players/", player)
            .success(function (response) {
                $scope.players = response;
            });
        }

        $scope.remove = function (id) {
            $http.delete("/api/players/" + id)
            .success(function (response) {
                $scope.players = response;
            });
        }

        $http.get("/api/players")
        .success(function (response) {
            $scope.players = response;
        });
    });
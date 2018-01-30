myApp.controller("MyInfoCtl", function($scope, $http, $rootScope, $state) {
    $rootScope.indexID = 0;
    $scope.ckNav("my_info");
    $scope.initPage = function() {
        $scope.$emit("checkLogin", "查看我的信息");
    }

    $scope.modify = function() {
        $state.go("my_modify");
    }

    $scope.edit = function() {
        $state.go("my_edit");
    }
});
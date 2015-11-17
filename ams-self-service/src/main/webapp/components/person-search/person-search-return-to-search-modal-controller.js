/**
 * Created by tonte on 12/7/15.
 */
vaPersonSearchModule.controller('PersonSearchReturnToSearchModalController', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.ok = function () {
        $uibModalInstance.close(true);
    };

    $scope.cancel = function () {
        $uibModalInstance.close(false);
    };
}]);
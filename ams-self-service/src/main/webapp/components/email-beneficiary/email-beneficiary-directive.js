vaEmailModule.directive('veteranBeneficiaryEmail', [function () {
    return {
        restrict: 'E',
        scope: {
            veteranBeneficiaryInfo: '=beneficiaryInfo',
            veteranInfo: '=',
            action: '@',
            pathInfo: '@'
        },
        controller: 'BeneficiaryController',
        controllerAs: 'emailBeneficiaryController',
        templateUrl: 'components/email-beneficiary/partials/email-beneficiary-template.html'
    }
}]);
/**
 * Created by tonte on 10/19/15.
 */
vaPersonSearchModule.directive('veteranPersonSearch', [function () {
    return {
        restrict: 'E',
        scope: {
            staffInfo: '=',
            veteranInfo: '=',
            pathInfo: '@'
        },
        controller: 'PersonSearchController',
        controllerAs: 'personSearchController',
        templateUrl: 'components/person-search/partials/person-search-template.html'
    }
}]);
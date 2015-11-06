/**
 * Created by tonte on 10/15/15.
 */
'use strict';

var vaPersonSearchModule = angular.module('gov.va.person.search.module', ['ngRoute', 'ngTable', 'ui.bootstrap'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/person-search', {
            templateUrl: 'components/person-search/person-search.html'
        });
    }])
    .run(['ngTableDefaults', function(ngTableDefaults) {
        ngTableDefaults.params.count = 1;
        ngTableDefaults.settings.counts = [];
    }]);
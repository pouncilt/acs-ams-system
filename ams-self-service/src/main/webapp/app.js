'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'ngTable',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'gov.va.email.beneficiary.module',
    'gov.va.person.search.module'
])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
}]);

myApp.appendTransform = function (defaults, transform) {

    // We can't guarantee that the default transformation is an array
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    // Append the new transformation to the defaults
    return defaults.concat(transform);
};

myApp.value('MessageHandler', new VA_AMS.handlers.MessageHandler());

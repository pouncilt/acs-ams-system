/**
 * Created by tonte on 11/16/15.
 */
vaPersonSearchModule.controller('DelegationAccordionController', ['$scope', function ($scope) {
    $scope.enableOnePanelAtATime = true;

    $scope.accordionPanels = [
        {
            title: "Step 1: Establish Delegation Type",
            contentUrl: "components/delegation/partials/step1.html",
            isOpen: true,
            isDisabled: false
        },
        {
            title: "Step 2: Establish Delegate",
            contentUrl: "components/delegation/partials/step2.html",
            isOpen: false,
            isDisabled: true
        },
        {
            title: "Step 3: Establish Delegation Preferences",
            contentUrl: "components/delegation/partials/step3.html",
            isOpen: false,
            isDisabled: true
        },
        {
            title: "Step 4: Sign Delegation Form",
            contentUrl: "components/delegation/partials/step4.html",
            isOpen: false,
            isDisabled: true
        },
        {
            title: "Step 5: Submit Delegation",
            contentUrl: "components/delegation/partials/step5.html",
            isOpen: false,
            isDisabled: true
        }
    ];

    $scope.toggleOpen = function (panel, panels) {
        //panel.isOpen = !panel.isOpen;
        panels.some(function (somePanel) {
            if (panel === somePanel) {
                somePanel.isOpen = !somePanel.isOpen;
                return true;
            }
        });
    };
}]);
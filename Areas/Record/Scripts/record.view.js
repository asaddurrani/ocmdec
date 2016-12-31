/*
    View for the Vehicle. Used to keep the viewmodel clear of UI related logic
*/
define("record/record.view",
    ["jquery", "record/record.viewModel"], function ($, recordViewModel) {

        var ist = window.ist || {};

        // View 
        ist.record.view = (function (specifiedViewModel) {
            var
                // View model 
                viewModel = specifiedViewModel,
                // Binding root used with knockout
                bindingRoot = $("#recordBinding")[0],
                //Show Record Dialog
                showRecordDialog = function () {
                    $("#recordDialog").modal("show");
                },
                 // Hide Record the dialog
                hideRecordDialog = function () {
                    $("#recordDialog").modal("hide");
                },
                //Show Oil Section
                showOilSection = function () {
                    $("#OilSection").show(700);
                },
                 // Hide Oil Section
                hideOilSection = function () {
                    $("#OilSection").hide(700);
                },
                //Show Air Filter Section
                showAirFilterSection = function () {
                    $("#AirFilterSection").show(700);
                },
                 // Hide Air Filter Section
                hideAirFilterSection = function () {
                    $("#AirFilterSection").hide(700);
                },
                //Show Oil Filter Section
                showOilFilterSection = function () {
                    $("#OilFilterSection").show(700);
                },
                 // Hide Oil Filter Section
                hideOilFilterSection = function () {
                    $("#OilFilterSection").hide(700);
                },
                
                //Show Brake Oil Section
                showBrakeOilSection = function () {
                    $("#BrakeOilSection").show(700);
                },
                 // Hide Brake Oil Section
                hideBrakeOilSection = function () {
                    $("#BrakeOilSection").hide(700);
                },
                
                //Show Power Sterring Oil Section
                showPowerSteeringOilSection = function () {
                    $("#PowerSteeringOilSection").show(700);
                },
                 // Hide Power Steering Oil Section
                hidePowerSteeringOilSection = function () {
                    $("#PowerSteeringOilSection").hide(700);
                },

                // Initialize
                initialize = function () {
                    if (!bindingRoot) {
                        return;
                    }

                    // Handle Sorting
                    handleSorting("recordTable", viewModel.sortOn, viewModel.sortIsAsc, viewModel.getVehicles);
                };

            initialize();


            return {
                bindingRoot: bindingRoot,
                showRecordDialog: showRecordDialog,
                hideRecordDialog: hideRecordDialog,
                showOilSection: showOilSection,
                hideOilSection: hideOilSection,
                showAirFilterSection: showAirFilterSection,
                hideAirFilterSection: hideAirFilterSection,
                showOilFilterSection: showOilFilterSection,
                hideOilFilterSection: hideOilFilterSection,
                showBrakeOilSection: showBrakeOilSection,
                hideBrakeOilSection: hideBrakeOilSection,
                showPowerSteeringOilSection: showPowerSteeringOilSection,
                hidePowerSteeringOilSection: hidePowerSteeringOilSection,
                viewModel: viewModel
            };
        })(recordViewModel);

        // Initialize the view model
        if (ist.record.view.bindingRoot) {
            recordViewModel.initialize(ist.record.view);
        }

        return ist.record.view;
    });
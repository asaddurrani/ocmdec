define(["ko", "underscore", "underscore-ko"], function (ko) {

    var
    //#region Vehicle Maker entity
    // ReSharper disable InconsistentNaming
    VehicleMaker = function (specifiedVehicleMakerId, specifiedVehicleMakerName) {
        // ReSharper restore InconsistentNaming
        var // Reference to this object
            self,
            // Unique key
            vehicleMakerId = ko.observable(specifiedVehicleMakerId),
            // Vehicle Maker Name
            vehicleMakerName = ko.observable(specifiedVehicleMakerName),

            // Errors
            errors = ko.validation.group({
                vehicleMakerId: vehicleMakerId,
                vehicleMakerName: vehicleMakerName
            }),
            // Is Valid
            isValid = ko.computed(function () {
                return errors().length === 0;
            }),
            // True if the booking has been changed
            // ReSharper disable InconsistentNaming
            dirtyFlag = new ko.dirtyFlag({
                // ReSharper restore InconsistentNaming
                vehicleMakerId: vehicleMakerId,
                vehicleMakerName: vehicleMakerName
            }),
            // Has Changes
            hasChanges = ko.computed(function () {
                return dirtyFlag.isDirty();
            }),
            // Reset
            reset = function () {
                dirtyFlag.reset();
            },
            // Convert to server
            convertToServerData = function () {
                return {
                    VehicleMakerId: vehicleMakerId(),
                    VehicleMakerName: vehicleMakerName()
                };
            };

        self = {
            vehicleMakerId: vehicleMakerId,
            vehicleMakerName: vehicleMakerName,
            errors: errors,
            isValid: isValid,
            dirtyFlag: dirtyFlag,
            hasChanges: hasChanges,
            reset: reset,
            convertToServerData: convertToServerData
        };
        return self;
    };

    // Vehicle Maker Factory
    VehicleMaker.Create = function (source) {
        return new VehicleMaker(source.VehicleMakerId, source.VehicleMakerName);
    };
    //#endregion


    //#region Vehicle Vehicle Model Maker entity
    // ReSharper disable once AssignToImplicitGlobalInFunctionScope
    VehicleModelMaker = function (specifiedVehicleId, specifiedVehicleMakerId, specifiedVehicleModelName, specifiedFuilingTypeId, specifiedVehicleMakerName) {
        // ReSharper restore InconsistentNaming
        var // Reference to this object
            self,
            // Unique key
            vehicleId = ko.observable(specifiedVehicleId),
            // Vehicle Maker Id
            vehicleMakerId = ko.observable(specifiedVehicleMakerId),
            // Vehicle Model Name
            vehicleModelName = ko.observable(specifiedVehicleModelName).extend({ required: true }),
            // Vehicle Fuiling Type Id
            fuilingTypeId = ko.observable(specifiedFuilingTypeId),
            //Vehicle Maker Name
            vehicleMakerName = ko.observable(specifiedVehicleMakerName),

            // Errors
            errors = ko.validation.group({
                vehicleId: vehicleId,
                vehicleMakerId: vehicleMakerId,
                vehicleModelName: vehicleModelName,
                fuilingTypeId: fuilingTypeId
            }),
            // Is Valid
            isValid = ko.computed(function () {
                return errors().length === 0;
            }),
            // True if the booking has been changed
            // ReSharper disable InconsistentNaming
            dirtyFlag = new ko.dirtyFlag({
                vehicleId: vehicleId,
                vehicleMakerId: vehicleMakerId,
                vehicleModelName: vehicleModelName,
                fuilingTypeId: fuilingTypeId
            }),
            // Has Changes
            hasChanges = ko.computed(function () {
                return dirtyFlag.isDirty();
            }),
            // Reset
            reset = function () {
                dirtyFlag.reset();
            },
            // Convert to server
            convertToServerData = function () {
                return {
                    VehicleId: vehicleId(),
                    VehicleMakerId: vehicleMakerId(),
                    VehicleModelName: vehicleModelName(),
                    FuilingTypeId: fuilingTypeId(),
                };
            };

        self = {
            vehicleId: vehicleId,
            vehicleMakerId: vehicleMakerId,
            vehicleModelName: vehicleModelName,
            fuilingTypeId: fuilingTypeId,
            vehicleMakerName: vehicleMakerName,
            errors: errors,
            isValid: isValid,
            dirtyFlag: dirtyFlag,
            hasChanges: hasChanges,
            reset: reset,
            convertToServerData: convertToServerData
        };
        return self;
    };

    // Vehicle Maker Factory
    VehicleModelMaker.Create = function (source) {
        return new VehicleModelMaker(source.VehicleId, source.VehicleMakerId, source.VehicleModelName, source.FuilingTypeId, source.VehicleMakerName);
    };
    //#endregion

    return {
        VehicleMaker: VehicleMaker,
        VehicleModelMaker: VehicleModelMaker
    };
});
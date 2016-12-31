define(["ko", "underscore", "underscore-ko"], function (ko) {

    var
    //#region Vehicle Maker entity
    // ReSharper disable InconsistentNaming
    OilMakerCompany = function (specifiedOilMakerId, specifiedOilMakerName) {
        // ReSharper restore InconsistentNaming
        var // Reference to this object
            self,
            // Unique key
            oilMakerId = ko.observable(specifiedOilMakerId),
            // Oil Maker Name
            oilMakerName = ko.observable(specifiedOilMakerName),

            // Errors
            errors = ko.validation.group({
                oilMakerId: oilMakerId,
                oilMakerName: oilMakerName
            }),
            // Is Valid
            isValid = ko.computed(function () {
                return errors().length === 0;
            }),
            // True if the booking has been changed
            // ReSharper disable InconsistentNaming
            dirtyFlag = new ko.dirtyFlag({
                // ReSharper restore InconsistentNaming
                oilMakerId: oilMakerId,
                oilMakerName: oilMakerName
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
                    OilMakerId: oilMakerId(),
                    OilMakerName: oilMakerName()
                };
            };

        self = {
            oilMakerId: oilMakerId,
            oilMakerName: oilMakerName,
            errors: errors,
            isValid: isValid,
            dirtyFlag: dirtyFlag,
            hasChanges: hasChanges,
            reset: reset,
            convertToServerData: convertToServerData
        };
        return self;
    };

    // Oil Maker Factory
    OilMakerCompany.Create = function (source) {
        return new OilMakerCompany(source.OilMakerId, source.OilMakerName);
    };
    //#endregion

    //#region Oil entity
    // ReSharper disable once AssignToImplicitGlobalInFunctionScope
    Oil = function (specifiedOilId, specifiedOilName, specifiedOilMakerId, specifiedOilAverageMilage, specifiedOilPower, specifiedOilPrice, specifiedOilDescription, specifiedOilNetWeightId, specifiedOilMakerCompanyName) {
        // ReSharper restore InconsistentNaming
        var // Reference to this object
            self,
            // Unique key
            oilId = ko.observable(specifiedOilId),
            // oil Name
            oilName = ko.observable(specifiedOilName),
            // oil Maker Id
            oilMakerId = ko.observable(specifiedOilMakerId).extend({ required: true }),
            // oil Average Milage
            oilAverageMilage = ko.observable(specifiedOilAverageMilage),
            //oil Power
            oilPower = ko.observable(specifiedOilPower),
            //oil Price
            oilPrice = ko.observable(specifiedOilPrice),
            //oil Description
            oilDescription = ko.observable(specifiedOilDescription),
            //oil Net Weight Id
            oilNetWeightId = ko.observable(specifiedOilNetWeightId),
            //Oil Maker Company Name
            oilMakerCompanyName = ko.observable(specifiedOilMakerCompanyName),

            // Errors
            errors = ko.validation.group({
                oilId: oilId,
                oilName: oilName,
                oilMakerId: oilMakerId,
                oilAverageMilage: oilAverageMilage,
                oilPower: oilPower,
                oilPrice: oilPrice,
                oilDescription: oilDescription,
                oilNetWeightId: oilNetWeightId,
            }),
            // Is Valid
            isValid = ko.computed(function () {
                return errors().length === 0;
            }),
            // True if the booking has been changed
            // ReSharper disable InconsistentNaming
            dirtyFlag = new ko.dirtyFlag({
                oilId: oilId,
                oilName: oilName,
                oilMakerId: oilMakerId,
                oilAverageMilage: oilAverageMilage,
                oilPower: oilPower,
                oilPrice: oilPrice,
                oilDescription: oilDescription,
                oilNetWeightId: oilNetWeightId,
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
                    OilId: oilId(),
                    OilName: oilName(),
                    OilMakerId: oilMakerId(),
                    OilAverageMilage: oilAverageMilage(),
                    OilPower: oilPower(),
                    OilPrice: oilPrice(),
                    OilDescription: oilDescription(),
                    OilNetWeightId: oilNetWeightId(),
                };
            };

        self = {
            oilId: oilId,
            oilName: oilName,
            oilMakerId: oilMakerId,
            oilAverageMilage: oilAverageMilage,
            oilPower: oilPower,
            oilPrice: oilPrice,
            oilDescription: oilDescription,
            oilNetWeightId: oilNetWeightId,
            oilMakerCompanyName: oilMakerCompanyName,
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
    Oil.Create = function (source) {
        return new Oil(source.OilId, source.OilName, source.OilMakerId, source.OilAverageMilage, source.OilPower, source.OilPrice, source.OilDescription, source.OilNetWeightId, source.OilMakerCompanyName);
    };
    //#endregion

    return {
        OilMakerCompany: OilMakerCompany,
        Oil: Oil
    };
});
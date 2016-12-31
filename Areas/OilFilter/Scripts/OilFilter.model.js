define(["ko", "underscore", "underscore-ko"], function (ko) {

    var
    //#region Oil Filter entity
    // ReSharper disable InconsistentNaming
    OilFilter = function (specifiedOilFilterId, specifiedOilFilterName, specifiedOilFilterPrice, specifiedOilFilterMakerCompanyId, specifiedOilFilterMakerCompanyName) {
        // ReSharper restore InconsistentNaming
        var // Reference to this object
            self,
            // Unique key
            oilFilterId = ko.observable(specifiedOilFilterId),
            // Oil Filter Name
            oilFilterName = ko.observable(specifiedOilFilterName),
            //Oil Filter Price
            oilFilterPrice = ko.observable(specifiedOilFilterPrice),
            //Oil Filter Maker CompanyId
            oilFilterMakerCompanyId = ko.observable(specifiedOilFilterMakerCompanyId),
            //oil Filter Maker COmpany Name
            oilFilterMakerCompanyName = ko.observable(specifiedOilFilterMakerCompanyName),
        // Errors
            errors = ko.validation.group({
                oilFilterId: oilFilterId,
                oilFilterName: oilFilterName,
                oilFilterPrice: oilFilterPrice,
                oilFilterMakerCompanyId: oilFilterMakerCompanyId,
                oilFilterMakerCompanyName: oilFilterMakerCompanyName
            }),
            // Is Valid
            isValid = ko.computed(function () {
                return errors().length === 0;
            }),
            // True if the booking has been changed
            // ReSharper disable InconsistentNaming
            dirtyFlag = new ko.dirtyFlag({
                // ReSharper restore InconsistentNaming
                oilMakerId: oilFilterId,
                oilFilterName: oilFilterName,
                oilFilterPrice: oilFilterPrice,
                oilFilterMakerCompanyId: oilFilterMakerCompanyId,
                oilFilterMakerCompanyName: oilFilterMakerCompanyName
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
                    OilFilterId: oilFilterId(),
                    OilFilterName: oilFilterName(),
                    OilFilterPrice: oilFilterPrice(),
                    OilFilterMakerCompanyId: oilFilterMakerCompanyId(),
                    OilFilterMakerCompanyName: oilFilterMakerCompanyName()
                };
            };

        self = {
            oilFilterId: oilFilterId,
            oilFilterName: oilFilterName,
            oilFilterPrice: oilFilterPrice,
            oilFilterMakerCompanyId: oilFilterMakerCompanyId,
            oilFilterMakerCompanyName: oilFilterMakerCompanyName,
            errors: errors,
            isValid: isValid,
            dirtyFlag: dirtyFlag,
            hasChanges: hasChanges,
            reset: reset,
            convertToServerData: convertToServerData
        };
        return self;
    };

    // Oil Filter Factory
    OilFilter.Create = function (source) {
        return new OilFilter(source.OilFilterId, source.OilFilterName, source.OilFilterPrice, source.OilFilterMakerCompanyId, source.OilFilterMakerCompanyName);
    },
    //#endregion

    //#region Oil Filter Maker entity
    // ReSharper disable InconsistentNaming
    OilFilterMakerCompany = function (specifiedOilFilterMakerId, specifiedOilFilterMakerName) {
        // ReSharper restore InconsistentNaming
        var // Reference to this object
            self,
            // Unique key
            oilFilterMakerId = ko.observable(specifiedOilFilterMakerId),
            // Oil Maker Name
            oilFilterMakerName = ko.observable(specifiedOilFilterMakerName),

            // Errors
            errors = ko.validation.group({
                oilFilterMakerId: oilFilterMakerId,
                oilFilterMakerName: oilFilterMakerName
            }),
            // Is Valid
            isValid = ko.computed(function () {
                return errors().length === 0;
            }),
            // True if the booking has been changed
            // ReSharper disable InconsistentNaming
            dirtyFlag = new ko.dirtyFlag({
                // ReSharper restore InconsistentNaming
                oilFilterMakerId: oilFilterMakerId,
                oilFilterMakerName: oilFilterMakerName
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
                    OilFilterMakerId: oilFilterMakerId(),
                    OilFilterMakerName: oilFilterMakerName()
                };
            };

        self = {
            oilFilterMakerId: oilFilterMakerId,
            oilFilterMakerName: oilFilterMakerName,
            errors: errors,
            isValid: isValid,
            dirtyFlag: dirtyFlag,
            hasChanges: hasChanges,
            reset: reset,
            convertToServerData: convertToServerData
        };
        return self;
    },

    // Oil Maker Factory
    OilFilterMakerCompany.Create = function (source) {
        return new OilFilterMakerCompany(source.OilFilterMakerCompanyId, source.OilFilterMakerCompanyName);
    };
    //#endregion
    return {
        OilFilter: OilFilter,
        OilFilterMakerCompany: OilFilterMakerCompany
    };
});
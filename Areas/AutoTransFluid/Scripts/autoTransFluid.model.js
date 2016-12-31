define(["ko", "underscore", "underscore-ko"], function (ko) {

    var
    //#region Vehicle Maker entity
    // ReSharper disable InconsistentNaming
    AutoTransFluidMakerCompany = function (specifiedAutoTransFluidMakerId, specifiedAutoTransFluidMakerName) {
        // ReSharper restore InconsistentNaming
        var // Reference to this object
            self,
            // Unique key
            autoTransFluidMakerId = ko.observable(specifiedAutoTransFluidMakerId),
            // AutoTransFluid Maker Name
            autoTransFluidMakerName = ko.observable(specifiedAutoTransFluidMakerName),

            // Errors
            errors = ko.validation.group({
                autoTransFluidMakerId: autoTransFluidMakerId,
                autoTransFluidMakerName: autoTransFluidMakerName
            }),
            // Is Valid
            isValid = ko.computed(function () {
                return errors().length === 0;
            }),
            // True if the booking has been changed
            // ReSharper disable InconsistentNaming
            dirtyFlag = new ko.dirtyFlag({
                // ReSharper restore InconsistentNaming
                autoTransFluidMakerId: autoTransFluidMakerId,
                autoTransFluidMakerName: autoTransFluidMakerName
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
                    AutoTransFluidMakerId: autoTransFluidMakerId(),
                    AutoTransFluidMakerName: autoTransFluidMakerName()
                };
            };

        self = {
            autoTransFluidMakerId: autoTransFluidMakerId,
            autoTransFluidMakerName: autoTransFluidMakerName,
            errors: errors,
            isValid: isValid,
            dirtyFlag: dirtyFlag,
            hasChanges: hasChanges,
            reset: reset,
            convertToServerData: convertToServerData
        };
        return self;
    };

    // AutoTransFluid Maker Factory
    AutoTransFluidMakerCompany.Create = function (source) {
        return new AutoTransFluidMakerCompany(source.AutoTransFluidMakerId, source.AutoTransFluidMakerName);
    };
    //#endregion

    //#region AutoTransFluid entity
    // ReSharper disable once AssignToImplicitGlobalInFunctionScope
    AutoTransFluid = function (specifiedAutoTransFluidId, specifiedAutoTransFluidName, specifiedAutoTransFluidMakerId, specifiedAutoTransFluidAverageMilage, specifiedAutoTransFluidPower, specifiedAutoTransFluidPrice, specifiedAutoTransFluidDescription, specifiedAutoTransFluidNetWeightId, specifiedAutoTransFluidMakerCompanyName) {
        // ReSharper restore InconsistentNaming
        var // Reference to this object
            self,
            // Unique key
            autoTransFluidId = ko.observable(specifiedAutoTransFluidId),
            // autoTransFluid Name
            autoTransFluidName = ko.observable(specifiedAutoTransFluidName),
            // autoTransFluid Maker Id
            autoTransFluidMakerId = ko.observable(specifiedAutoTransFluidMakerId).extend({ required: true }),
            // autoTransFluid Average Milage
            autoTransFluidAverageMilage = ko.observable(specifiedAutoTransFluidAverageMilage),
            //autoTransFluid Power
            autoTransFluidPower = ko.observable(specifiedAutoTransFluidPower),
            //autoTransFluid Price
            autoTransFluidPrice = ko.observable(specifiedAutoTransFluidPrice),
            //autoTransFluid Description
            autoTransFluidDescription = ko.observable(specifiedAutoTransFluidDescription),
            //autoTransFluid Net Weight Id
            autoTransFluidNetWeightId = ko.observable(specifiedAutoTransFluidNetWeightId),
            //AutoTransFluid Maker Company Name
            autoTransFluidMakerCompanyName = ko.observable(specifiedAutoTransFluidMakerCompanyName),

            // Errors
            errors = ko.validation.group({
                autoTransFluidId: autoTransFluidId,
                autoTransFluidName: autoTransFluidName,
                autoTransFluidMakerId: autoTransFluidMakerId,
                autoTransFluidAverageMilage: autoTransFluidAverageMilage,
                autoTransFluidPower: autoTransFluidPower,
                autoTransFluidPrice: autoTransFluidPrice,
                autoTransFluidDescription: autoTransFluidDescription,
                autoTransFluidNetWeightId: autoTransFluidNetWeightId,
            }),
            // Is Valid
            isValid = ko.computed(function () {
                return errors().length === 0;
            }),
            // True if the booking has been changed
            // ReSharper disable InconsistentNaming
            dirtyFlag = new ko.dirtyFlag({
                autoTransFluidId: autoTransFluidId,
                autoTransFluidName: autoTransFluidName,
                autoTransFluidMakerId: autoTransFluidMakerId,
                autoTransFluidAverageMilage: autoTransFluidAverageMilage,
                autoTransFluidPower: autoTransFluidPower,
                autoTransFluidPrice: autoTransFluidPrice,
                autoTransFluidDescription: autoTransFluidDescription,
                autoTransFluidNetWeightId: autoTransFluidNetWeightId,
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
                    AutoTransFluidId: autoTransFluidId(),
                    AutoTransFluidName: autoTransFluidName(),
                    AutoTransFluidMakerId: autoTransFluidMakerId(),
                    AutoTransFluidAverageMilage: autoTransFluidAverageMilage(),
                    AutoTransFluidPower: autoTransFluidPower(),
                    AutoTransFluidPrice: autoTransFluidPrice(),
                    AutoTransFluidDescription: autoTransFluidDescription(),
                    AutoTransFluidNetWeightId: autoTransFluidNetWeightId(),
                };
            };

        self = {
            autoTransFluidId: autoTransFluidId,
            autoTransFluidName: autoTransFluidName,
            autoTransFluidMakerId: autoTransFluidMakerId,
            autoTransFluidAverageMilage: autoTransFluidAverageMilage,
            autoTransFluidPower: autoTransFluidPower,
            autoTransFluidPrice: autoTransFluidPrice,
            autoTransFluidDescription: autoTransFluidDescription,
            autoTransFluidNetWeightId: autoTransFluidNetWeightId,
            autoTransFluidMakerCompanyName: autoTransFluidMakerCompanyName,
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
    AutoTransFluid.Create = function (source) {
        return new AutoTransFluid(source.AutoTransFluidId, source.AutoTransFluidName, source.AutoTransFluidMakerId, source.AutoTransFluidAverageMilage, source.AutoTransFluidPower, source.AutoTransFluidPrice, source.AutoTransFluidDescription, source.AutoTransFluidNetWeightId, source.AutoTransFluidMakerCompanyName);
    };
    //#endregion

    return {
        AutoTransFluidMakerCompany: AutoTransFluidMakerCompany,
        AutoTransFluid: AutoTransFluid
    };
});
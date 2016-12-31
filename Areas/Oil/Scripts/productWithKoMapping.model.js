define(["ko", "underscore", "underscore-ko"], function (ko) {

    var

    // Product entity - Using Knockout Mapping
    // ReSharper disable InconsistentNaming
    Product = function (data) {
        // ReSharper restore InconsistentNaming
        var // Reference to this object
            self = {},
            // 
            mapping = {
                // customize the creation of the name property so that it provides validation
                Name: {
                    create: function (options) {
                        return ko.observable(options.data).extend({ required: true });
                    }
                },
                Price: {
                    create: function (options) {
                        return ko.observable(options.data).extend({ required: true });
                    }
                },
                CategoryId: {
                    create: function (options) {
                        return ko.observable(options.data).extend({ required: true });
                    }
                }
            };

        // Map data to self
        ko.mapping.fromJS(data, mapping, self);

        // Extend Product
        // Categoreis
        self.categories = ko.observableArray([]),
        // Category Name
        self.categoryName = ko.computed(function () {
            if (!self.CategoryId()) {
                return "";
            }
            var categoryResult = self.categories.find(function (category) {
                return category.Id === self.CategoryId();
            });

            return categoryResult ? categoryResult.Name : "";
        }),
        // Assign Categories
        self.assignCategories = function (categoryList) {
            self.categories.removeAll();
            if (!categoryList) {
                return;
            }
            ko.utils.arrayPushAll(self.categories(), categoryList);
            self.categories.valueHasMutated();
        },
        // Errors
        self.errors = ko.validation.group({
            name: self.Name,
            price: self.Price,
            categoryId: self.CategoryId
        }),
        // Is Valid
        self.isValid = ko.computed(function () {
            return self.errors().length === 0;
        }),
        // True if the booking has been changed
        // ReSharper disable InconsistentNaming
        self.dirtyFlag = new ko.dirtyFlag({
            // ReSharper restore InconsistentNaming
            name: self.Name,
            price: self.Price,
            categoryId: self.CategoryId,
            description: self.Description
        }),
        // Has Changes
        self.hasChanges = ko.computed(function () {
            return self.dirtyFlag.isDirty();
        }),
        // Reset
        self.reset = function () {
            self.dirtyFlag.reset();
        };

        return {
            name: self.Name,
            id: self.Id,
            price: self.Price,
            description: self.Description,
            categoryId: self.CategoryId,
            categoryName: self.categoryName,
            assignCategories: self.assignCategories,
            categories: self.categories,
            hasChanges: self.hasChanges,
            reset: self.reset,
            errors: self.errors,
            isValid: self.isValid
        };
    };

    return {
        Product: Product
    };
});
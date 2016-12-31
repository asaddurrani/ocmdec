/*
    Module with the view model for the Product
*/
define("product/product.viewModel",
    ["jquery", "amplify", "ko", "product/product.dataservice", "product/productWithKoMapping.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.product = {
            viewModel: (function () {
                var// the view 
                    view,
                    // Active Product
                    selectedProduct = ko.observable(),
                    // #region Arrays
                    // Products
                    products = ko.observableArray([]),
                    categories = ko.observableArray([]),
                    // #endregion Arrays
                    // #region Busy Indicators
                    isLoadingProducts = ko.observable(false),
                    // #endregion Busy Indicators
                    // #region Observables
                    // Sort On
                    sortOn = ko.observable(1),
                    // Sort Order -  true means asc, false means desc
                    sortIsAsc = ko.observable(true),
                    // Is Product Editor Visible
                    isProductEditorVisible = ko.observable(false),
                    // Is Editable
                    isEditable = ko.observable(false),
                    // Pagination
                    pager = ko.observable(),
                    // search filter
                    searchFilter = ko.observable(),
                    // category Filter
                    categoryFilter = ko.observable(),
                    // est price total
                    totalPrice = ko.computed(function () {
                        if (products().length === 0) {
                            return 0;
                        }
                        var total = 0;
                        _.each(products(), function (product) {
                            total += product.price();
                        });
                        return total;
                    }),
                    // #region Utility Functions
                    // Select a Product
                    selectProduct = function(product) {
                        if (selectedProduct() && selectedProduct().hasChanges()) {
                            onSaveProduct(product);
                            return;
                        }
                        if (selectedProduct() !== product) {
                            selectedProduct(product);
                        }
                        isEditable(false);
                    },
                    // Edit a Product
                    onEditProductInline = function(product, e) {
                        selectProduct(product);
                        isEditable(true);
                        e.stopImmediatePropagation();
                    },
                    // Edit a Product - In a Form
                    onEditProduct = function (product, e) {
                        selectProduct(product);
                        showProductEditor();
                        e.stopImmediatePropagation();
                    },
                    // Show Product Editor
                    showProductEditor = function() {
                        isProductEditorVisible(true);
                    },
                    // close Product Editor
                    onCloseProductEditor = function() {
                        if (selectedProduct().hasChanges()) {
                            confirmation.messageText("Do you want to save changes?");
                            confirmation.afterProceed(onSaveProduct);
                            confirmation.afterCancel(function() {
                                selectedProduct().reset();
                                closeProductEditor();
                            });
                            confirmation.show();
                            return;
                        }
                        closeProductEditor();
                    },
                    // close Product Editor
                    closeProductEditor = function() {
                        isProductEditorVisible(false);
                    },
                    // Delete a product
                    onDeleteProduct = function(product) {
                        if (!product.id()) {
                            products.remove(product);
                            return;
                        }

                        // Ask for confirmation
                        confirmation.afterProceed(function() {
                            deleteProduct(product);
                        });
                        confirmation.show();
                    },
                    // Create Product
                    createProduct = function () {
                        var product = new model.Product({ Name: "", CategoryId: undefined, Price: "", Id: 0, Description: "" });
                        product.assignCategories(categories());
                        products.splice(0, 0, product);
                        // Select the newly added product
                        selectedProduct(product);
                    },
                    // Create Product - In Form
                    createProductInForm = function() {
                        createProduct();
                        showProductEditor();
                    },
                    // Save Product
                    onSaveProduct = function(product){
                        if (doBeforeSelect()) {
                            // Commits and Selects the Row
                            saveProduct(product);
                        }
                    },
                    // Do Before Logic
                    doBeforeSelect = function() {
                        var flag = true;
                        if(!selectedProduct().isValid()) {
                            selectedProduct().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },
                    // Initialize the view model
                    initialize = function(specifiedView) {
                        view = specifiedView;

                        ko.applyBindings(view.viewModel, view.bindingRoot);

                        getBase();

                        // Set Pager
                        pager(pagination.Pagination({}, products, getProducts));

                        getProducts();
                    },
                    // Template Chooser
                    templateToUse = function(product) {
                        return (product === selectedProduct() ? 'editProductTemplate' : 'itemProductTemplate');
                    },
                    // Map Products - Server to Client
                    mapProducts = function (data) {
                        var productList = [];
                        _.each(data.Products, function (item) {
                            var product = new model.Product(item);
                            product.assignCategories(categories());
                            productList.push(product);
                        });
                        
                        ko.utils.arrayPushAll(products(), productList);
                        products.valueHasMutated();
                    },
                    // Get Base
                    getBase = function () {
                        dataservice.getProductBase({
                            success: function (data) {
                                categories.removeAll();
                                ko.utils.arrayPushAll(categories(), data);
                                categories.valueHasMutated();
                            },
                            error: function () {
                                toastr.error("Failed to load base data");
                            }
                        });
                    },
                    // Search 
                    search = function () {
                        pager().reset();
                        getProducts();
                    },
                    // Get Products
                    getProducts = function () {
                        isLoadingProducts(true);
                        dataservice.getProducts({
                            SearchString: searchFilter(), CategoryId: categoryFilter(), PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(), SortBy: sortOn(), IsAsc: sortIsAsc() 
                        }, {
                            success: function(data) {
                                pager().totalCount(data.TotalCount);
                                products.removeAll();
                                mapProducts(data);
                                isLoadingProducts(false);
                            },
                            error: function() {
                                isLoadingProducts(false);
                                toastr.error("Failed to load products!");
                            }
                        });
                    },
                    // Delete Product
                    deleteProduct = function (product) {
                        dataservice.deleteProduct(product.convertToServerData(), {
                            success: function () {
                                products.remove(product);
                                toastr.success("Product removed successfully");
                            },
                            error: function () {
                                toastr.error("Failed to remove product!");
                            }
                        });
                    },
                    // Save Product
                    saveProduct = function(product) {
                        var method = "updateProduct";
                        if (!selectedProduct().id()) {
                            method = "createProduct";
                        }
                        // Ignore additional properties
                        var mapping = {
                            'ignore': ["categories", "categoryName", "assignCategories", "dirtyFlag", "hasChanges", "errors", "isValid",
                                "reset"]
                        }; 
                        dataservice[method](ko.mapping.toJS(selectedProduct(), mapping), {
                            success: function () {
                                // Reset Changes
                                selectedProduct().reset();
                                // If Product is specified then select it
                                if (product) {
                                    selectProduct(product);
                                }
                                if (isProductEditorVisible) {
                                    closeProductEditor();
                                }
                                toastr.success("Product saved successfully");
                            },
                            error: function () {
                                toastr.error('Failed to save product!');
                            }
                        });
                    };
                // #endregion Service Calls

                return {
                    // Observables
                    selectedProduct: selectedProduct,
                    isLoadingProducts: isLoadingProducts,
                    categories: categories,
                    products: products,
                    totalPrice: totalPrice,
                    searchFilter: searchFilter,
                    categoryFilter: categoryFilter,
                    sortOn: sortOn,
                    sortIsAsc: sortIsAsc,
                    // Observables
                    // Utility Methods
                    onSaveProduct: onSaveProduct,
                    createProduct: createProduct,
                    onDeleteProduct: onDeleteProduct,
                    initialize: initialize,
                    templateToUse: templateToUse,
                    selectProduct: selectProduct,
                    search: search,
                    getProducts: getProducts,
                    pager: pager,
                    onEditProductInline: onEditProductInline,
                    onEditProduct: onEditProduct,
                    showProductEditor: showProductEditor,
                    onCloseProductEditor: onCloseProductEditor,
                    isProductEditorVisible: isProductEditorVisible,
                    createProductInForm: createProductInForm
                    // Utility Methods
                };
            })()
        };
        return ist.product.viewModel;
    });

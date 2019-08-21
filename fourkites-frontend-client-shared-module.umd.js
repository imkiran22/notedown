(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ngx-cookie-service'), require('ngx-webstorage'), require('lodash'), require('moment'), require('@angular/common/http'), require('@angular/platform-browser'), require('typescript-mix'), require('ngx-toastr'), require('@ngx-translate/core'), require('class-transformer'), require('rxjs'), require('rxjs/operators'), require('@angular/material/dialog'), require('@angular/material'), require('@angular/cdk/portal'), require('primeng/calendar'), require('@angular/forms'), require('@angular/animations'), require('primeng/components/dom/domhandler'), require('rxjs/internal/observable/of'), require('@ng-select/ng-select'), require('@angular/router'), require('@angular/common'), require('@angular/core/testing')) :
    typeof define === 'function' && define.amd ? define('@fourkites/frontend-client-shared-module', ['exports', '@angular/core', 'ngx-cookie-service', 'ngx-webstorage', 'lodash', 'moment', '@angular/common/http', '@angular/platform-browser', 'typescript-mix', 'ngx-toastr', '@ngx-translate/core', 'class-transformer', 'rxjs', 'rxjs/operators', '@angular/material/dialog', '@angular/material', '@angular/cdk/portal', 'primeng/calendar', '@angular/forms', '@angular/animations', 'primeng/components/dom/domhandler', 'rxjs/internal/observable/of', '@ng-select/ng-select', '@angular/router', '@angular/common', '@angular/core/testing'], factory) :
    (factory((global.fourkites = global.fourkites || {}, global.fourkites['frontend-client-shared-module'] = {}),global.ng.core,global.ngxCookieService,global.ngxWebstorage,global._,global._moment,global.ng.common.http,global.ng.platformBrowser,global.typescriptMix,global.ngxToastr,global.core,global.classTransformer,global.rxjs,global.rxjs.operators,global.ng.material.dialog,global.ng.material,global.ng.cdk.portal,global.calendar,global.ng.forms,global.ng.animations,global.domhandler,global.rxjs['internal/observable/of'],global.ngSelect,global.ng.router,global.ng.common,global.ng.core.testing));
}(this, (function (exports,i0,ngxCookieService,ngxWebstorage,_,_moment,http,platformBrowser,typescriptMix,ngxToastr,core,classTransformer,rxjs,operators,dialog,material,portal,calendar,forms,animations,domhandler,of,ngSelect,router,common,testing) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var SharedModuleConfig = /** @class */ (function () {
        function SharedModuleConfig(config) {
            if (config && config.environment) {
                this.environment = config.environment;
            }
        }
        return SharedModuleConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment = _moment;
    var StorageService = /** @class */ (function () {
        function StorageService(localStorage, cookieStore) {
            this.localStorage = localStorage;
            this.cookieStore = cookieStore;
            this.cookieParams = { expiry: 30, path: '/' };
            this.storageType = 'localStorage';
            this.expiryTimeType = 'days';
            this.cookieDomain = '/';
            this.isLocalStorageSupported = this.localStorage.isStorageAvailable();
            this.prefix = 'tf';
        }
        /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
        StorageService.prototype.store = /**
         * @param {?} key
         * @param {?} value
         * @return {?}
         */
            function (key, value) {
                if (!value) {
                    value = null;
                }
                if (!this.isLocalStorageSupported || this.storageType === 'cookie') {
                    return this.storeInCookie(key, value, true);
                }
                this.localStorage.store(this.deriveQualifiedKey(key), value);
                return true;
            };
        /**
         * @param {?} key
         * @return {?}
         */
        StorageService.prototype.retrive = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                if (!this.isLocalStorageSupported || this.storageType === 'cookie') {
                    return this.retriveFromCookie(key, true);
                }
                return this.localStorage.retrieve(this.deriveQualifiedKey(key));
            };
        /**
         * @param {?} key
         * @return {?}
         */
        StorageService.prototype.clear = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                if (!this.isLocalStorageSupported || this.storageType === 'cookie') {
                    return this.clearFromCookie(key);
                }
                this.localStorage.clear(this.deriveQualifiedKey(key));
                return true;
            };
        /**
         * @param {?} key
         * @param {?} value
         * @param {?=} encode
         * @return {?}
         */
        StorageService.prototype.storeInCookie = /**
         * @param {?} key
         * @param {?} value
         * @param {?=} encode
         * @return {?}
         */
            function (key, value, encode) {
                if (encode === void 0) {
                    encode = false;
                }
                if (_.isObject(value) || _.isArray(value) || _.isNumber(value)) {
                    value = JSON.stringify(value);
                }
                if (encode) {
                    value = encodeURIComponent(value);
                }
                /** @type {?} */
                var expiry = this.getExpiry(value);
                this.cookieStore.set(key, value, expiry, this.cookieParams.path, this.cookieDomain);
                return true;
            };
        /**
         * @param {?} key
         * @param {?=} decode
         * @return {?}
         */
        StorageService.prototype.retriveFromCookie = /**
         * @param {?} key
         * @param {?=} decode
         * @return {?}
         */
            function (key, decode) {
                if (decode === void 0) {
                    decode = false;
                }
                /** @type {?} */
                var value = this.cookieStore.get(key);
                if (decode) {
                    value = decodeURIComponent(value);
                }
                try {
                    value = JSON.parse(value);
                }
                catch (e) {
                }
                return value;
            };
        /**
         * @param {?} key
         * @return {?}
         */
        StorageService.prototype.clearFromCookie = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                this.cookieStore.delete(key, this.cookieDomain);
                return true;
            };
        /**
         * @return {?}
         */
        StorageService.prototype.deleteAllCookies = /**
         * @return {?}
         */
            function () {
                this.cookieStore.deleteAll();
            };
        /**
         * @param {?} val
         * @return {?}
         */
        StorageService.prototype.setExpiryType = /**
         * @param {?} val
         * @return {?}
         */
            function (val) {
                this.expiryTimeType = val;
            };
        /**
         * @param {?} expiry
         * @param {?=} path
         * @return {?}
         */
        StorageService.prototype.setExpiry = /**
         * @param {?} expiry
         * @param {?=} path
         * @return {?}
         */
            function (expiry, path) {
                if (path === void 0) {
                    path = '/';
                }
                this.cookieParams.expiry = expiry;
                this.cookieParams.path = path;
            };
        /**
         * @param {?} domain
         * @return {?}
         */
        StorageService.prototype.setDomain = /**
         * @param {?} domain
         * @return {?}
         */
            function (domain) {
                this.cookieDomain = domain;
            };
        /**
         * @param {?} value
         * @return {?}
         */
        StorageService.prototype.getExpiry = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (value == null) {
                    return moment().subtract(1, 'days').toDate().valueOf();
                }
                if (this.expiryTimeType === 'minutes') {
                    return moment().add(this.cookieParams.expiry, 'minutes').toDate().valueOf();
                }
                return moment().add(this.cookieParams.expiry, 'days').toDate().valueOf();
            };
        /**
         * @param {?} key
         * @return {?}
         */
        StorageService.prototype.deriveQualifiedKey = /**
         * @param {?} key
         * @return {?}
         */
            function (key) {
                return this.prefix + key;
            };
        StorageService.decorators = [
            { type: i0.Injectable }
        ];
        StorageService.ctorParameters = function () {
            return [
                { type: ngxWebstorage.LocalStorageService },
                { type: ngxCookieService.CookieService }
            ];
        };
        return StorageService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var StorageModule = /** @class */ (function () {
        function StorageModule() {
        }
        StorageModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            ngxWebstorage.Ng2Webstorage.forRoot({ prefix: '', separator: '', caseSensitive: true })
                        ],
                        providers: [
                            StorageService,
                            ngxCookieService.CookieService
                        ],
                        exports: [
                            ngxWebstorage.Ng2Webstorage
                        ]
                    },] }
        ];
        return StorageModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var AuthConfig = {
        AUTH: "auth-token",
        USER: "current-user",
        DEVICE_ID: "device-id",
        USER_ID: "user-id",
        FRONT_END_VERSION: "front_end_version",
        COMPANY_TIME: 'comany_time',
        EMAIL_REGEXP: /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
        ENABLE_2FA: 'enable-2fa'
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var ConfigHelper = /** @class */ (function () {
        function ConfigHelper() {
        }
        /**
         * @param {?} env
         * @return {?}
         */
        ConfigHelper.setEnvironment = /**
         * @param {?} env
         * @return {?}
         */
            function (env) {
                ConfigHelper.environment = env;
            };
        ConfigHelper.environment = null;
        return ConfigHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var CompanyService = /** @class */ (function () {
        function CompanyService(http$$1) {
            this.http = http$$1;
            this.companiesAutocompleteUrl = '/api/v1/companies/autocomplete';
            this.customersAutocompleteUrl = '/api/v1/companies/:companyId/customers/autocomplete_v2';
            this.relationshipsUrl = '/api/v1/companies/:shipper/relationships';
            this.companyUrl = '/api/v1/companies/:companyId';
        }
        /**
         * @param {?} query
         * @param {?=} companyType
         * @param {?=} options
         * @return {?}
         */
        CompanyService.prototype.getCompaniesAutocomplete = /**
         * @param {?} query
         * @param {?=} companyType
         * @param {?=} options
         * @return {?}
         */
            function (query, companyType, options) {
                if (options === void 0) {
                    options = {
                        demoOnlyCompany: false,
                        isCompanyIdNeeded: true
                    };
                }
                if (!query) {
                    return null;
                }
                /** @type {?} */
                var params = {
                    'q': query
                };
                if (companyType) {
                    params['type'] = companyType;
                }
                if (options.demoOnlyCompany) {
                    params['demo_company_only'] = true;
                }
                params['interceptorOptions'] = { isCompanyIdNeeded: options.isCompanyIdNeeded };
                return this.http.get(this.fullCompaniesAutocompleteUrl(), { params: params })
                    .toPromise()
                    .then(function (response) { return response; })
                    .catch(this.handleError);
            };
        /**
         * @param {?} companyId
         * @param {?} q
         * @return {?}
         */
        CompanyService.prototype.getCustomersAutoComplete = /**
         * @param {?} companyId
         * @param {?} q
         * @return {?}
         */
            function (companyId, q) {
                if (q && q.trim() !== '') {
                    /** @type {?} */
                    var params = { q: q };
                    return this.http.get(this.fullCompanyCustomerAutocompleteUrl(companyId), { params: params });
                }
            };
        /**
         * @param {?} companyId
         * @return {?}
         */
        CompanyService.prototype.getCompany = /**
         * @param {?} companyId
         * @return {?}
         */
            function (companyId) {
                return this.http.get(this.fullCompanyUrl(companyId))
                    .toPromise()
                    .then(function (response) { return response; })
                    .catch(this.handleError);
            };
        /**
         * @param {?} shipper
         * @param {?} carrier
         * @return {?}
         */
        CompanyService.prototype.getRelationships = /**
         * @param {?} shipper
         * @param {?} carrier
         * @return {?}
         */
            function (shipper, carrier) {
                /** @type {?} */
                var url = this.fullRelationshipUrl(shipper);
                return this.http.get(url, {
                    params: {
                        related_company_id: carrier
                    }
                });
            };
        /**
         * @param {?} shipper
         * @return {?}
         */
        CompanyService.prototype.fullRelationshipUrl = /**
         * @param {?} shipper
         * @return {?}
         */
            function (shipper) {
                /** @type {?} */
                var preparedUrl = this.relationshipsUrl.replace(':shipper', shipper);
                return "" + this.companyServiceUrl + preparedUrl;
            };
        /**
         * @param {?} companyId
         * @return {?}
         */
        CompanyService.prototype.fullCompanyUrl = /**
         * @param {?} companyId
         * @return {?}
         */
            function (companyId) {
                /** @type {?} */
                var preparedCompanyUrl = this.companyUrl.replace(':companyId', companyId);
                return "" + this.companyServiceUrl + preparedCompanyUrl;
            };
        /**
         * @return {?}
         */
        CompanyService.prototype.fullCompaniesAutocompleteUrl = /**
         * @return {?}
         */
            function () {
                return "" + this.companyServiceUrl + this.companiesAutocompleteUrl;
            };
        /**
         * @param {?} companyId
         * @return {?}
         */
        CompanyService.prototype.fullCompanyCustomerAutocompleteUrl = /**
         * @param {?} companyId
         * @return {?}
         */
            function (companyId) {
                /** @type {?} */
                var url = this.customersAutocompleteUrl.replace(':companyId', companyId);
                return "" + this.companyServiceUrl + url;
            };
        Object.defineProperty(CompanyService.prototype, "companyServiceUrl", {
            get: /**
             * @return {?}
             */ function () {
                return ConfigHelper.environment.companyServiceUrl;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} error
         * @return {?}
         */
        CompanyService.prototype.handleError = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                console.error('An error occurred', error);
                return Promise.reject(error.message || error);
            };
        CompanyService.decorators = [
            { type: i0.Injectable }
        ];
        CompanyService.ctorParameters = function () {
            return [
                { type: http.HttpClient }
            ];
        };
        return CompanyService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var COMPANY_CONFIG_STORE = 'tfCompanyConfig';
    /** @type {?} */
    var COMPANY_CONTEXT_ID_STORE = 'companyContextId';
    /** @type {?} */
    var COMPANY_DIRECT_ASSIGNMENT_GUID = 'direct_assignment_guid';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var CompanyContextService = /** @class */ (function () {
        function CompanyContextService(companyService) {
            this.companyService = companyService;
        }
        Object.defineProperty(CompanyContextService.prototype, "companyType", {
            get: /**
             * @return {?}
             */ function () {
                var e_1, _a;
                /** @type {?} */
                var priorityOrder = ['shipper', '3pl', 'carrier'];
                if (!this.currentCompany || !this.currentCompany.type) {
                    return null;
                }
                try {
                    for (var priorityOrder_1 = __values(priorityOrder), priorityOrder_1_1 = priorityOrder_1.next(); !priorityOrder_1_1.done; priorityOrder_1_1 = priorityOrder_1.next()) {
                        var type = priorityOrder_1_1.value;
                        if (_.contains(this.currentCompany.type, type)) {
                            return type;
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (priorityOrder_1_1 && !priorityOrder_1_1.done && (_a = priorityOrder_1.return))
                            _a.call(priorityOrder_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                return this.currentCompany.type[0];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} companyId
         * @return {?}
         */
        CompanyContextService.prototype.setSessionCompany = /**
         * @param {?} companyId
         * @return {?}
         */
            function (companyId) {
                var _this = this;
                return this.companyService.getCompany(companyId)
                    .then(function (response) {
                    _this.currentCompany = response.company;
                    _this.directGuid = response.company.directTrackingInfoAssignmentGuid;
                    return true;
                }).catch(function (err) {
                    return false;
                });
            };
        /**
         * @return {?}
         */
        CompanyContextService.prototype.getCompanyContext = /**
         * @return {?}
         */
            function () {
                if (this.companyContextModel) {
                    return this.companyContextModel.id;
                }
                return "";
            };
        /**
         * @return {?}
         */
        CompanyContextService.prototype.getCompanyContextName = /**
         * @return {?}
         */
            function () {
                if (this.companyContextModel) {
                    return this.companyContextModel.description;
                }
                return "";
            };
        /**
         * @param {?} companyContext
         * @return {?}
         */
        CompanyContextService.prototype.setCompanyContext = /**
         * @param {?} companyContext
         * @return {?}
         */
            function (companyContext) {
                this.companyContextModel = companyContext;
            };
        Object.defineProperty(CompanyContextService.prototype, "isRailEventFiltersApplicable", {
            get: /**
             * @return {?}
             */ function () {
                return this.checkRailConfiguration('showRailEventFilters');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompanyContextService.prototype, "isOceanEventFiltersApplicable", {
            get: /**
             * @return {?}
             */ function () {
                return this.checkRailConfiguration('showOceanEventFilters');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompanyContextService.prototype, "isLatestEventFiltersApplicable", {
            get: /**
             * @return {?}
             */ function () {
                return this.checkRailConfiguration('showLatestEvent');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompanyContextService.prototype, "isDisplayReportingRailroadApplicable", {
            get: /**
             * @return {?}
             */ function () {
                return this.checkRailConfiguration('displayReportingRailroad');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompanyContextService.prototype, "isDisplayEventOnCheckcallApplicable", {
            get: /**
             * @return {?}
             */ function () {
                return this.checkRailConfiguration("displayEventOnCheckcall");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompanyContextService.prototype, "isDisplayTrainIdApplicable", {
            get: /**
             * @return {?}
             */ function () {
                return this.checkRailConfiguration('displayTrainId');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompanyContextService.prototype, "isDisplayLoadedOrEmptyApplicable", {
            get: /**
             * @return {?}
             */ function () {
                return this.checkRailConfiguration('displayLoadedOrEmpty');
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} configName
         * @return {?}
         */
        CompanyContextService.prototype.checkRailConfiguration = /**
         * @param {?} configName
         * @return {?}
         */
            function (configName) {
                return this.currentCompany && this.currentCompany.railConfiguration && this.currentCompany.railConfiguration[configName];
            };
        CompanyContextService.decorators = [
            { type: i0.Injectable }
        ];
        CompanyContextService.ctorParameters = function () {
            return [
                { type: CompanyService }
            ];
        };
        __decorate([
            ngxWebstorage.SessionStorage(COMPANY_CONTEXT_ID_STORE),
            __metadata("design:type", Object)
        ], CompanyContextService.prototype, "companyContextModel", void 0);
        __decorate([
            ngxWebstorage.LocalStorage(COMPANY_CONFIG_STORE),
            __metadata("design:type", Object)
        ], CompanyContextService.prototype, "currentCompany", void 0);
        __decorate([
            ngxWebstorage.LocalStorage(COMPANY_DIRECT_ASSIGNMENT_GUID),
            __metadata("design:type", String)
        ], CompanyContextService.prototype, "directGuid", void 0);
        return CompanyContextService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var SecurityService = /** @class */ (function () {
        function SecurityService(companyContextService, tfStorage, http$$1, document) {
            this.companyContextService = companyContextService;
            this.tfStorage = tfStorage;
            this.http = http$$1;
            this.document = document;
            this.loginUrl = "/api/v1/users/login";
            this.tokenUrl = "/sso/user_by_token";
            this.logoutUrl = "/api/v1/users/logout";
            this.validateTokenUrl = "/api/v1/users/validate_auth_token";
            this.currentHost = this.document.location.origin + (this.document.location.hostname.indexOf('localhost') > -1 ? '/build' : '');
        }
        Object.defineProperty(SecurityService.prototype, "userServiceUrl", {
            get: /**
             * @return {?}
             */ function () {
                return ConfigHelper.environment.userServiceUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SecurityService.prototype, "companyTime", {
            get: /**
             * @return {?}
             */ function () {
                return SecurityService.companyTime;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        SecurityService.prototype.shouldRedirectToZendeskSupport = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var url = document.location.href;
                /** @type {?} */
                var pattern = new RegExp("return_to");
                /** @type {?} */
                var str = pattern.test(url);
                return str;
            };
        /**
         * @return {?}
         */
        SecurityService.prototype.isRedirectFromThirdPartySSO = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var companyName = this.tfStorage.retriveFromCookie('inputCompanyName');
                /** @type {?} */
                var isAllowed = this.isAuthenticated();
                if (companyName && isAllowed) {
                    this.tfStorage.setDomain('fourkites.com');
                    this.tfStorage.clearFromCookie('inputCompanyName');
                    return true;
                }
                return false;
            };
        /**
         * @return {?}
         */
        SecurityService.prototype.redirectToZendeskSupport = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var url = this.userServiceUrl + "/api/v1/users/get_jwt";
                sessionStorage.setItem('IS_ZENDESK_REDIRECT_IN_PROGRESS', "true");
                return this.http.get(url).toPromise().then(function (res) {
                    if (res && res.status === 200) {
                        window.location.href = res.data.redirectUri;
                    }
                }, function (err) {
                    console.log('ERROR REDIRECTING TO ZENDESK', new Date());
                    throw err;
                });
            };
        /**
         * @param {?} loginParams
         * @return {?}
         */
        SecurityService.prototype.login = /**
         * @param {?} loginParams
         * @return {?}
         */
            function (loginParams) {
                var _this = this;
                /** @type {?} */
                var requestBody = {
                    username: loginParams.email,
                    password: loginParams.password,
                    rememberMe: loginParams.remember,
                    deviceId: this.tfStorage.retrive(AuthConfig.DEVICE_ID)
                };
                return this.http.post(this.getFullLoginUrl(), requestBody)
                    .toPromise()
                    .then(function (response) {
                    if (response && response['statusCode'] === 200) {
                        SecurityService.currentUser = _this.updateWithComputedAttributes(response['user']);
                        _this.tfStorage.storeInCookie(AuthConfig.AUTH, response['authToken']);
                        _this.tfStorage.storeInCookie(AuthConfig.USER, SecurityService.currentUser);
                        _this.tfStorage.storeInCookie(AuthConfig.USER_ID, SecurityService.currentUser['userId']);
                        if (loginParams.remember) {
                            _this.tfStorage.store(AuthConfig.AUTH, response['authToken']);
                            _this.tfStorage.store(AuthConfig.USER, SecurityService.currentUser);
                            _this.tfStorage.store(AuthConfig.USER_ID, SecurityService.currentUser["userId"]);
                        }
                        else {
                            _this.tfStorage.clear(AuthConfig.AUTH);
                            _this.tfStorage.clear(AuthConfig.USER);
                            _this.tfStorage.clear(AuthConfig.USER_ID);
                        }
                        _this.tfStorage.store(AuthConfig.DEVICE_ID, response['deviceId']);
                    }
                    return _.extend(response, {
                        loggedIn: _this.isAuthenticated()
                    });
                })
                    .catch(function (error) {
                    _this.handleError(error);
                    return _.extend(error, {
                        loggedIn: _this.isAuthenticated()
                    });
                });
            };
        /**
         * @param {?} token
         * @return {?}
         */
        SecurityService.prototype.getUserByToken = /**
         * @param {?} token
         * @return {?}
         */
            function (token) {
                var _this = this;
                this.companyContextService.setCompanyContext(null);
                /** @type {?} */
                var params = { token: token };
                return this.http.get(this.getFullTokenUrl(), { params: params })
                    .toPromise()
                    .then(function (response) {
                    if (response && response['statusCode'] === 200) {
                        SecurityService.currentUser = _this.updateWithComputedAttributes(response['user']);
                        _this.tfStorage.store(AuthConfig.DEVICE_ID, response['deviceId']);
                        _this.tfStorage.storeInCookie(AuthConfig.USER, SecurityService.currentUser);
                        _this.tfStorage.storeInCookie(AuthConfig.USER_ID, SecurityService.currentUser['userId']);
                        _this.tfStorage.storeInCookie(AuthConfig.AUTH, response['authToken']);
                        _this.tfStorage.store(AuthConfig.AUTH, response['authToken']);
                        _this.tfStorage.store(AuthConfig.USER, SecurityService.currentUser);
                        _this.tfStorage.store(AuthConfig.USER_ID, SecurityService.currentUser["userId"]);
                    }
                    return response;
                })
                    .catch(function (error) {
                    _this.isAuthenticated();
                    _this.handleError(error);
                    return error;
                });
            };
        /**
         * @return {?}
         */
        SecurityService.prototype.logout = /**
         * @return {?}
         */
            function () {
                var _this = this;
                return this.http.delete(this.getFullLogoutUrl())
                    .toPromise()
                    .then(function (response) {
                    _this.deleteAuthToken(response);
                    return response;
                })
                    .catch(function (error) {
                    _this.deleteAuthToken({});
                    _this.handleError(error);
                    return error;
                });
            };
        /**
         * @return {?}
         */
        SecurityService.prototype.validateAuthToken = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var body = {};
                if (this.companyContextService.companyContextModel) {
                    body['company_id'] = this.companyContextService.getCompanyContext();
                }
                return this.http.post(this.getFullValidateTokenUrl(), body)
                    .toPromise()
                    .then(function (response) {
                    if (response && response['statusCode'] === 200) {
                        SecurityService.currentUser = _this.updateWithComputedAttributes(response['user']);
                        SecurityService.companyTime = {
                            companyTimeFormat: response['companyTimeFormat'],
                            companyTimeZoneName: response['companyTimeZoneName'],
                            companyTimeZoneOffset: response['companyTimeZoneOffset']
                        };
                        _this.tfStorage.storeInCookie(AuthConfig.COMPANY_TIME, SecurityService.companyTime);
                        _this.tfStorage.store(AuthConfig.DEVICE_ID, response['deviceId']);
                        _this.tfStorage.storeInCookie(AuthConfig.USER, SecurityService.currentUser);
                        _this.tfStorage.storeInCookie(AuthConfig.USER_ID, SecurityService.currentUser['userId']);
                        _this.tfStorage.storeInCookie(AuthConfig.AUTH, response['authToken']);
                        _this.tfStorage.store(AuthConfig.AUTH, response['authToken']);
                        _this.tfStorage.store(AuthConfig.USER, SecurityService.currentUser);
                        _this.tfStorage.store(AuthConfig.USER_ID, SecurityService.currentUser["userId"]);
                        _this.tfStorage.store(AuthConfig.COMPANY_TIME, SecurityService.companyTime);
                    }
                    return response;
                })
                    .catch(function (error) {
                    if (error && error.status && error.status === 403) {
                        _this.deleteAuthToken({});
                    }
                    _this.handleError(error);
                    return error;
                });
            };
        /**
         * @param {?} user
         * @return {?}
         */
        SecurityService.prototype.updateWithComputedAttributes = /**
         * @param {?} user
         * @return {?}
         */
            function (user) {
                /** @type {?} */
                var modules = user.modules || [];
                /** @type {?} */
                var permissions = user.permissions || {};
                /** @type {?} */
                var packageRestrictions = user.packageRestrictions || this.defaultPackageRestrictions;
                /** @type {?} */
                var isRealTimeNotificationEnabled = user.realTimeNotification && user.realTimeNotification.enabled && user.realTimeNotification.subscriptionKey;
                /** @type {?} */
                var insightsLiscensedBuckets = user.insightsLicensedBuckets || [];
                /** @type {?} */
                var computedAttributes = this.computeAttributes(user, modules, permissions, packageRestrictions, insightsLiscensedBuckets);
                return _.extend(user, computedAttributes);
            };
        /**
         * @return {?}
         */
        SecurityService.prototype.isAuthenticated = /**
         * @return {?}
         */
            function () {
                if (this.tfStorage.retrive(AuthConfig.USER_ID)) {
                    /** @type {?} */
                    var userId = this.tfStorage.retrive(AuthConfig.USER_ID);
                    this.tfStorage.storeInCookie(AuthConfig.USER_ID, userId);
                }
                if (this.tfStorage.retrive(AuthConfig.AUTH)) {
                    /** @type {?} */
                    var auth = this.tfStorage.retrive(AuthConfig.AUTH);
                    this.tfStorage.storeInCookie(AuthConfig.AUTH, auth);
                }
                if (this.tfStorage.retrive(AuthConfig.USER)) {
                    /** @type {?} */
                    var user = this.tfStorage.retrive(AuthConfig.USER);
                    this.tfStorage.storeInCookie(AuthConfig.USER, user);
                }
                if (this.tfStorage.retrive(AuthConfig.COMPANY_TIME)) {
                    /** @type {?} */
                    var companyTime = this.tfStorage.retrive(AuthConfig.COMPANY_TIME);
                    this.tfStorage.storeInCookie(AuthConfig.COMPANY_TIME, companyTime);
                }
                return !!this.currentUser;
            };
        Object.defineProperty(SecurityService.prototype, "deviceId", {
            get: /**
             * @return {?}
             */ function () {
                return this.tfStorage.retrive(AuthConfig.DEVICE_ID) || null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SecurityService.prototype, "userId", {
            get: /**
             * @return {?}
             */ function () {
                return this.tfStorage.retriveFromCookie(AuthConfig.USER_ID) || null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SecurityService.prototype, "currentUser", {
            get: /**
             * @return {?}
             */ function () {
                if (_.isEmpty(SecurityService.currentUser)) {
                    SecurityService.currentUser = this.tfStorage.retrive(AuthConfig.USER);
                }
                return SecurityService.currentUser;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SecurityService.prototype, "isSuperAdmin", {
            get: /**
             * @return {?}
             */ function () {
                if (!this.currentUser) {
                    return false;
                }
                return this.currentUser.superAdmin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SecurityService.prototype, "defaultPackageRestrictions", {
            get: /**
             * @return {?}
             */ function () {
                return {
                    showUserAccessAndRolesModule: true,
                    showOtherDetailsInLoad: true,
                    allowCreatingNotificationRules: true,
                    allowCreatingUsers: true,
                    allowSingleSignOn: true
                };
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} value
         * @return {?}
         */
        SecurityService.prototype.mandateTwoFactor = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.tfStorage.store("enable-2fa", value);
            };
        Object.defineProperty(SecurityService.prototype, "enableTwoFactor", {
            get: /**
             * @return {?}
             */ function () {
                return this.tfStorage.retrive("enable-2fa");
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} modules
         * @param {?} module_to_check
         * @return {?}
         */
        SecurityService.prototype.isModuleEnabled = /**
         * @param {?} modules
         * @param {?} module_to_check
         * @return {?}
         */
            function (modules, module_to_check) {
                return modules.indexOf(module_to_check) != -1;
            };
        /**
         * @param {?} logoutResponse
         * @return {?}
         */
        SecurityService.prototype.deleteAuthToken = /**
         * @param {?} logoutResponse
         * @return {?}
         */
            function (logoutResponse) {
                /** @type {?} */
                var user = this.tfStorage.retriveFromCookie(AuthConfig.USER);
                SecurityService.currentUser = null;
                this.tfStorage.clear(AuthConfig.AUTH);
                this.tfStorage.clear(AuthConfig.USER);
                this.tfStorage.clear(AuthConfig.USER_ID);
                this.tfStorage.clear(AuthConfig.COMPANY_TIME);
                this.tfStorage.clearFromCookie(AuthConfig.AUTH);
                this.tfStorage.clearFromCookie(AuthConfig.USER);
                this.tfStorage.clearFromCookie(AuthConfig.COMPANY_TIME);
                this.tfStorage.clearFromCookie(AuthConfig.USER_ID);
                this.tfStorage.clear(AuthConfig.ENABLE_2FA);
                if (logoutResponse && logoutResponse.redirectUri) ;
                else {
                    this.goToSignin();
                }
            };
        /**
         * @return {?}
         */
        SecurityService.prototype.goToSignin = /**
         * @return {?}
         */
            function () {
                this.document.location.href = this.currentHost + "/#/signin";
            };
        /**
         * @param {?} user
         * @param {?} modules
         * @param {?} permissions
         * @param {?} packageRestrictions
         * @param {?} insightsLiscensedBuckets
         * @return {?}
         */
        SecurityService.prototype.computeAttributes = /**
         * @param {?} user
         * @param {?} modules
         * @param {?} permissions
         * @param {?} packageRestrictions
         * @param {?} insightsLiscensedBuckets
         * @return {?}
         */
            function (user, modules, permissions, packageRestrictions, insightsLiscensedBuckets) {
                /** @type {?} */
                var computedAttributes = {
                    showTrackingModule: this.isModuleEnabled(modules, "tracking") && permissions['loads']['view'],
                    showToolsModule: user.superAdmin,
                    showAdminModule: this.isModuleEnabled(modules, "admin"),
                    showReportsModule: this.isModuleEnabled(modules, "tracking-reports") && permissions.trackingReports && permissions.trackingReports.execute,
                    showAnalyticsModule: user.isAnalyticsEnabled && ((user.superAdmin && this.companyContextService.getCompanyContext()) || this.isModuleEnabled(modules, "insights")),
                    showTrackingConsistency: insightsLiscensedBuckets.indexOf("TC") != -1,
                    showBenchMarking: insightsLiscensedBuckets.indexOf("BM") != -1,
                    showPerformanceAnalytics: insightsLiscensedBuckets.indexOf("PA") != -1,
                    showSubscription: !_.isEmpty(_.intersection(user.companyType, ['shipper', '3pl', 'carrier'])) && !_.isEmpty(_.intersection(insightsLiscensedBuckets, ['TC', 'PA'])),
                    showUserGroupsModule: user.superAdmin || this.isModuleEnabled(modules, 'custom-user-groups'),
                    showApplessManagement: this.isModuleEnabled(modules, 'app-less-management') && permissions['loads'] && permissions['loads']['update'] || user.superAdmin,
                    showUserAccessAndRolesModule: packageRestrictions.showUserAccessAndRolesModule,
                    showCompleteTrackingInfo: this.isModuleEnabled(modules, "tracking-eld"),
                    showOtherDetailsInLoad: packageRestrictions.showOtherDetailsInLoad,
                    allowCreatingNotificationRules: packageRestrictions.allowCreatingNotificationRules,
                    allowCreatingUsers: packageRestrictions.allowCreatingUsers,
                    allowSingleSignOn: packageRestrictions.allowSingleSignOn,
                    showFacilityManagerModule: this.isModuleEnabled(modules, 'facility-manager') && user.superAdmin,
                    showAppoinmentManagerModule: this.isModuleEnabled(modules, 'appointment-manager'),
                    showCarrierField: !_.isEmpty(_.intersection(user.companyType, ['shipper', '3pl', 'broker'])),
                    isRealTimeNotificationEnabled: user.realTimeNotification && user.realTimeNotification.enabled && user.realTimeNotification.subscriptionKey,
                    showMapAutoRefresh: user.realTimeNotification && user.realTimeNotification.enabled && user.realTimeNotification.subscriptionKey && this.isModuleEnabled(modules, 'map-auto-refresh-loads'),
                    showTemperatureTrackingModule: this.isModuleEnabled(modules, 'temperature-tracking') && permissions.temperatureTrackingSettings && permissions.temperatureTrackingSettings.view,
                    editTemperatureTrackingModule: this.isModuleEnabled(modules, 'temperature-tracking') && permissions.temperatureTrackingSettings && permissions.temperatureTrackingSettings.create,
                    showWeatherAlertsModule: this.isModuleEnabled(modules, 'weather-alerts'),
                    showSMSModule: this.isModuleEnabled(modules, 'sms-notification'),
                    defaultRoute: '/dashboard',
                    showUpstreamVisibility: this.isModuleEnabled(modules, 'upstream-visibility')
                };
                // DEFAULT ROUTES BASED ON PERMISSIONS
                if (computedAttributes.showToolsModule) {
                    computedAttributes.defaultRoute = '/tools/createCheckCall';
                }
                if (computedAttributes.showAdminModule) {
                    computedAttributes.defaultRoute = '/admin/companies';
                }
                if (computedAttributes.showTrackingModule) {
                    computedAttributes.defaultRoute = '/loads';
                }
                if (user.groupAdmin) {
                    computedAttributes.defaultRoute = '/admin/users';
                }
                return computedAttributes;
            };
        /**
         * @return {?}
         */
        SecurityService.prototype.getFullLoginUrl = /**
         * @return {?}
         */
            function () {
                return this.userServiceUrl + this.loginUrl;
            };
        /**
         * @return {?}
         */
        SecurityService.prototype.getFullTokenUrl = /**
         * @return {?}
         */
            function () {
                return this.userServiceUrl + this.tokenUrl;
            };
        /**
         * @return {?}
         */
        SecurityService.prototype.getFullLogoutUrl = /**
         * @return {?}
         */
            function () {
                return this.userServiceUrl + this.logoutUrl;
            };
        /**
         * @return {?}
         */
        SecurityService.prototype.getFullValidateTokenUrl = /**
         * @return {?}
         */
            function () {
                return this.userServiceUrl + this.validateTokenUrl;
            };
        /**
         * @param {?} error
         * @return {?}
         */
        SecurityService.prototype.handleError = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                console.error('Error at Security Service', error);
                return Promise.reject(error.message || error);
            };
        SecurityService.currentUser = null;
        SecurityService.companyTime = null;
        SecurityService.decorators = [
            { type: i0.Injectable }
        ];
        SecurityService.ctorParameters = function () {
            return [
                { type: CompanyContextService },
                { type: StorageService },
                { type: http.HttpClient },
                { type: undefined, decorators: [{ type: i0.Inject, args: [platformBrowser.DOCUMENT,] }] }
            ];
        };
        return SecurityService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var UserResourceService = /** @class */ (function () {
        function UserResourceService(http$$1, tfStorage, securityService) {
            this.http = http$$1;
            this.tfStorage = tfStorage;
            this.securityService = securityService;
            this.userResourceUrl = "/api/v1/users/:id/:action";
            this.forgotPasswordUrl = "/api/v1/users/:action";
            this.userJwtTokenUrl = "/api/v1/users/get_jwt";
            this.intialise2faSubmissionLimits();
        }
        Object.defineProperty(UserResourceService.prototype, "userServiceUrl", {
            get: /**
             * @return {?}
             */ function () {
                return ConfigHelper.environment.userServiceUrl;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} type
         * @param {?} key
         * @return {?}
         */
        UserResourceService.prototype.getCount = /**
         * @param {?} type
         * @param {?} key
         * @return {?}
         */
            function (type, key) {
                return (this.tfaSubmissionLimits[type][key] || 0);
            };
        /**
         * @return {?}
         */
        UserResourceService.prototype.isTwoFactorAuthRequired = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var params = {
                    email: this.securityService.currentUser['emailAddress'],
                    deviceId: this.securityService.deviceId
                };
                return this.http.post(this.getFullTwoFactorAuthenticationRequiredUrl(this.securityService.userId), {}, { params: params })
                    .toPromise()
                    .then(function (response) { return (response); })
                    .catch(function (error) { return _this.handleError(error); });
            };
        /**
         * @param {?} authType
         * @return {?}
         */
        UserResourceService.prototype.sendOTPviaEmail = /**
         * @param {?} authType
         * @return {?}
         */
            function (authType) {
                var _this = this;
                if (authType === 'email' && this.tfaSubmissionLimits.email.resendCount < 5) {
                    /** @type {?} */
                    var params = {
                        email: this.securityService.currentUser['emailAddress'],
                        deviceId: this.securityService.deviceId
                    };
                    return this.http.post(this.getFullTwoFactorAuthenticationEmailCodeUrl(this.securityService.userId), {}, { params: params })
                        .toPromise()
                        .then(function (response) {
                        _this.tfaSubmissionLimits.email.resendCount = _this.tfaSubmissionLimits.email.resendCount + 1;
                        _this.tfStorage.store('emailResendCount', _this.tfaSubmissionLimits.email.resendCount);
                        return response;
                    })
                        .catch(function (error) { return _this.handleError(error); });
                }
            };
        /**
         * @param {?} token
         * @return {?}
         */
        UserResourceService.prototype.verifyOTPfromEmail = /**
         * @param {?} token
         * @return {?}
         */
            function (token) {
                var _this = this;
                /** @type {?} */
                var params = {
                    email: this.securityService.currentUser['emailAddress'],
                    deviceId: this.securityService.deviceId,
                    token: token
                };
                return this.http.post(this.getFullTwoFactorAuthenticationVerifyEmailCodeUrl(this.securityService.userId), {}, { params: params })
                    .toPromise()
                    .then(function (response) {
                    return response;
                })
                    .catch(function (error) { return _this.handleError(error); })
                    .catch(function () { return _this.incrementSubmitCount(); });
            };
        /**
         * @param {?} value
         * @return {?}
         */
        UserResourceService.prototype.sendPasswordViaEmail = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                var _this = this;
                return this.http.post(this.getPasswordResetUrl(this.securityService.userId), { 'emailAddress': value.email }, {})
                    .toPromise()
                    .then(function (response) {
                    return response;
                })
                    .catch(function (error) { return _this.handleError(error); });
            };
        /**
         * @param {?} params
         * @return {?}
         */
        UserResourceService.prototype.sendApplessManagementOptInSms = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                /** @type {?} */
                var url = this.userServiceUrl + "/api/v1/app_less_subscription";
                return this.http.post(url, params);
            };
        /**
         * @param {?} params
         * @return {?}
         */
        UserResourceService.prototype.getDeviceDetailsForSuperAdmin = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                /** @type {?} */
                var url = this.userServiceUrl + "/api/v1/users/get_device_details_super_admin";
                return this.http.post(url, { phone: params.phone, interceptorOptions: { isCompanyIdNeeded: false } });
            };
        /**
         * @param {?} params
         * @return {?}
         */
        UserResourceService.prototype.getFilters = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                return this.http.get(this.getUserFiltersResourceUrl(this.securityService.currentUser.userId), { params: params });
            };
        /**
         * @param {?} params
         * @return {?}
         */
        UserResourceService.prototype.createFilter = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                return this.http.post(this.getUserFiltersResourceUrl(this.securityService.currentUser.userId), params);
            };
        /**
         * @param {?} params
         * @return {?}
         */
        UserResourceService.prototype.deleteFilter = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                /** @type {?} */
                var url = this.getUserFilterUrl(params.filterId);
                return this.http.delete(url);
            };
        /**
         * @param {?} params
         * @return {?}
         */
        UserResourceService.prototype.updateFilter = /**
         * @param {?} params
         * @return {?}
         */
            function (params) {
                /** @type {?} */
                var url = this.getUserFilterUrl(params.filterId);
                return this.http.patch(url, { user_filter: params.user_filter });
            };
        /**
         * @return {?}
         */
        UserResourceService.prototype.getUserJwtToken = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var url = this.getUserJwtUrl();
                return this.http.get(url);
            };
        /**
         * @param {?} filterId
         * @return {?}
         */
        UserResourceService.prototype.getUserFilterUrl = /**
         * @param {?} filterId
         * @return {?}
         */
            function (filterId) {
                return this.getUserFiltersResourceUrl(this.securityService.currentUser.userId) + "/" + filterId;
            };
        /**
         * @return {?}
         */
        UserResourceService.prototype.getUserJwtUrl = /**
         * @return {?}
         */
            function () {
                return "" + this.userServiceUrl + this.userJwtTokenUrl;
            };
        /**
         * @param {?} id
         * @return {?}
         */
        UserResourceService.prototype.getUserFiltersResourceUrl = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                return "" + this.userServiceUrl + this.userResourceUrl.replace(":action", "filter").replace(":id", id);
            };
        /**
         * @param {?} id
         * @return {?}
         */
        UserResourceService.prototype.getFullTwoFactorAuthenticationRequiredUrl = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                return "" + this.userServiceUrl + this.userResourceUrl.replace(":action", "need_2fa_login").replace(":id", id);
            };
        /**
         * @param {?} id
         * @return {?}
         */
        UserResourceService.prototype.getFullTwoFactorAuthenticationEmailCodeUrl = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                return "" + this.userServiceUrl + this.userResourceUrl.replace(":action", "send_2fa_secret_mail").replace(":id", id);
            };
        /**
         * @param {?} id
         * @return {?}
         */
        UserResourceService.prototype.getFullTwoFactorAuthenticationVerifyEmailCodeUrl = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                return "" + this.userServiceUrl + this.userResourceUrl.replace(":action", "verify_2fa_code_email").replace(":id", id);
            };
        /**
         * @param {?} id
         * @return {?}
         */
        UserResourceService.prototype.getPasswordResetUrl = /**
         * @param {?} id
         * @return {?}
         */
            function (id) {
                return "" + this.userServiceUrl + this.forgotPasswordUrl.replace(":action", "forgot_password");
            };
        /**
         * @param {?} error
         * @return {?}
         */
        UserResourceService.prototype.handleError = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                console.error('Error at User Resource Service', error);
                if (error.data && error.data.statusCode === 403) {
                    this.authError = "Your Account is Locked. You have reached the maximum limit of invalid login attempts. Kindly try logging in after an hour.";
                    this.securityService.deleteAuthToken({});
                }
                return Promise.reject(error.message || error);
            };
        /**
         * @return {?}
         */
        UserResourceService.prototype.incrementSubmitCount = /**
         * @return {?}
         */
            function () {
                this.tfaSubmissionLimits.email.submitCount = this.tfaSubmissionLimits.email.submitCount + 1;
                this.tfStorage.store('emailSubmitCount', this.tfaSubmissionLimits.email.submitCount);
                return false;
            };
        /**
         * @return {?}
         */
        UserResourceService.prototype.intialise2faSubmissionLimits = /**
         * @return {?}
         */
            function () {
                this.tfaSubmissionLimits = {
                    email: {
                        submitCount: parseInt(this.tfStorage.retrive('emailSubmitCount')) || 0,
                        resendCount: parseInt(this.tfStorage.retrive('emailResendCount')) || 0
                    },
                    app: {
                        submitCount: parseInt(this.tfStorage.retrive('appSubmitCount')) || 0
                    }
                };
                return false;
            };
        UserResourceService.decorators = [
            { type: i0.Injectable }
        ];
        UserResourceService.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: StorageService },
                { type: SecurityService }
            ];
        };
        return UserResourceService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var UnitConversionHelper = /** @class */ (function () {
        function UnitConversionHelper() {
        }
        /**
         * @param {?} meter
         * @return {?}
         */
        UnitConversionHelper.prototype.meterToMile = /**
         * @param {?} meter
         * @return {?}
         */
            function (meter) {
                return meter * 0.000621371;
            };
        /**
         * @param {?} miles
         * @return {?}
         */
        UnitConversionHelper.prototype.milesToMeters = /**
         * @param {?} miles
         * @return {?}
         */
            function (miles) {
                return miles * 1609.34;
            };
        return UnitConversionHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var DataPresenterService = /** @class */ (function () {
        function DataPresenterService() {
        }
        /**
         * @param {?} data
         * @param {?=} numDigits
         * @return {?}
         */
        DataPresenterService.prototype.transformLargeData = /**
         * @param {?} data
         * @param {?=} numDigits
         * @return {?}
         */
            function (data, numDigits) {
                if (numDigits === void 0) {
                    numDigits = 2;
                }
                /** @type {?} */
                var formatArray = [
                    { value: 1, symbol: "" },
                    { value: 1E3, symbol: "K" },
                    { value: 1E6, symbol: "M" },
                    { value: 1E9, symbol: "G" },
                    { value: 1E12, symbol: "T" },
                    { value: 1E15, symbol: "P" },
                    { value: 1E18, symbol: "E" }
                ];
                /** @type {?} */
                var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
                /** @type {?} */
                var i;
                for (i = formatArray.length - 1; i > 0; i--) {
                    if (data >= formatArray[i].value) {
                        break;
                    }
                }
                return (data / formatArray[i].value).toFixed(numDigits).replace(rx, "$1") + formatArray[i].symbol;
            };
        DataPresenterService.decorators = [
            { type: i0.Injectable }
        ];
        DataPresenterService.ctorParameters = function () { return []; };
        __decorate([
            typescriptMix.delegate(UnitConversionHelper.prototype.meterToMile),
            __metadata("design:type", Function)
        ], DataPresenterService.prototype, "meterToMile", void 0);
        __decorate([
            typescriptMix.delegate(UnitConversionHelper.prototype.milesToMeters),
            __metadata("design:type", Function)
        ], DataPresenterService.prototype, "milesToMeters", void 0);
        return DataPresenterService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var AlertService = /** @class */ (function () {
        function AlertService(toastrService, translateService) {
            this.toastrService = toastrService;
            this.translateService = translateService;
        }
        /**
         * @param {?} severity
         * @param {?} summaryKey
         * @param {?=} detailKey
         * @param {?=} options
         * @return {?}
         */
        AlertService.prototype.displayMessage = /**
         * @param {?} severity
         * @param {?} summaryKey
         * @param {?=} detailKey
         * @param {?=} options
         * @return {?}
         */
            function (severity, summaryKey, detailKey, options) {
                var _this = this;
                if (detailKey === void 0) {
                    detailKey = "";
                }
                if (options === void 0) {
                    options = {};
                }
                this.translateService.get([
                    summaryKey,
                    detailKey
                ]).subscribe(function (translations) {
                    _this.display(severity, translations[summaryKey], translations[detailKey], options);
                });
            };
        /**
         * @param {?} severity
         * @param {?} summaryKey
         * @param {?=} detailKey
         * @param {?=} options
         * @return {?}
         */
        AlertService.prototype.display = /**
         * @param {?} severity
         * @param {?} summaryKey
         * @param {?=} detailKey
         * @param {?=} options
         * @return {?}
         */
            function (severity, summaryKey, detailKey, options) {
                if (detailKey === void 0) {
                    detailKey = "";
                }
                if (options === void 0) {
                    options = {};
                }
                try {
                    this.toastrService[severity](detailKey, summaryKey, options);
                }
                catch (e) {
                    this.toastrService.show(detailKey, summaryKey, options);
                }
            };
        AlertService.decorators = [
            { type: i0.Injectable }
        ];
        AlertService.ctorParameters = function () {
            return [
                { type: ngxToastr.ToastrService },
                { type: core.TranslateService }
            ];
        };
        return AlertService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var LocationProviderResponse = /** @class */ (function () {
        function LocationProviderResponse() {
            this.locationProvider = [];
        }
        return LocationProviderResponse;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var LocationProviderService = /** @class */ (function () {
        function LocationProviderService(http$$1) {
            this.http = http$$1;
            this.providersAutocompleteUrl = "/api/v1/location_providers/autocomplete";
        }
        Object.defineProperty(LocationProviderService.prototype, "trackingServiceUrl", {
            get: /**
             * @return {?}
             */ function () {
                return ConfigHelper.environment.trackingServiceUrl;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} query
         * @return {?}
         */
        LocationProviderService.prototype.getProvidersAutocomplete = /**
         * @param {?} query
         * @return {?}
         */
            function (query) {
                if (!query) {
                    return null;
                }
                /** @type {?} */
                var params = {
                    'q': query
                };
                return this.http.get(this.fullProvidersAutocompleteUrl(), { params: params })
                    .toPromise()
                    .then(function (response) { return classTransformer.plainToClass(LocationProviderResponse, response); })
                    .catch(this.handleError);
            };
        /**
         * @return {?}
         */
        LocationProviderService.prototype.fullProvidersAutocompleteUrl = /**
         * @return {?}
         */
            function () {
                return "" + this.trackingServiceUrl + this.providersAutocompleteUrl;
            };
        /**
         * @param {?} error
         * @return {?}
         */
        LocationProviderService.prototype.handleError = /**
         * @param {?} error
         * @return {?}
         */
            function (error) {
                return Promise.reject(error.message || error);
            };
        LocationProviderService.decorators = [
            { type: i0.Injectable }
        ];
        LocationProviderService.ctorParameters = function () {
            return [
                { type: http.HttpClient }
            ];
        };
        return LocationProviderService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var LoaderService = /** @class */ (function () {
        function LoaderService() {
            this.loaderQueue = [];
            this.loaderSubject = new rxjs.Subject();
            this.LoadingState = this.loaderSubject.asObservable();
        }
        /**
         * @return {?}
         */
        LoaderService.prototype.show = /**
         * @return {?}
         */
            function () {
                this.queue();
            };
        /**
         * @return {?}
         */
        LoaderService.prototype.hide = /**
         * @return {?}
         */
            function () {
                this.dequeue();
            };
        /**
         * @return {?}
         */
        LoaderService.prototype.queue = /**
         * @return {?}
         */
            function () {
                this.loaderQueue.push(1);
                if (this.loaderQueue.length) {
                    this.loaderSubject.next(( /** @type {?} */({ show: true })));
                }
            };
        /**
         * @return {?}
         */
        LoaderService.prototype.dequeue = /**
         * @return {?}
         */
            function () {
                this.loaderQueue.pop();
                if (!this.loaderQueue.length) {
                    this.loaderSubject.next(( /** @type {?} */({ show: false })));
                }
            };
        LoaderService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        LoaderService.ctorParameters = function () { return []; };
        /** @nocollapse */ LoaderService.ngInjectableDef = i0.defineInjectable({ factory: function LoaderService_Factory() { return new LoaderService(); }, token: LoaderService, providedIn: "root" });
        return LoaderService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var CustomHttpInterceptor = /** @class */ (function () {
        function CustomHttpInterceptor(storageService, security, companyContextService, loaderService) {
            this.storageService = storageService;
            this.security = security;
            this.companyContextService = companyContextService;
            this.loaderService = loaderService;
            this.isSuperAdmin = security.isSuperAdmin;
            this.companyId = companyContextService.getCompanyContext();
        }
        /**
         * @param {?} request
         * @param {?} httpHandler
         * @return {?}
         */
        CustomHttpInterceptor.prototype.intercept = /**
         * @param {?} request
         * @param {?} httpHandler
         * @return {?}
         */
            function (request, httpHandler) {
                var _this = this;
                /** @type {?} */
                var options = Object.assign({}, request.params.get('interceptorOptions'));
                /** @type {?} */
                var requestParams = request.params;
                // MultiParams along with arrayParams
                if (options && options['hasArrayParams']) {
                    /** @type {?} */
                    var arrayParams = options['arrayParams'];
                    /** @type {?} */
                    var preparedArray = this.prepareArrayParams(request.params, arrayParams);
                    requestParams = preparedArray;
                }
                if (typeof request.url === "string" && request.url.indexOf('fourkites.com') != -1 ||
                    request.url.indexOf('fourkites.in') != -1 || request.url.indexOf('localhost') != -1) {
                    if (options && !options['hideLoader']) {
                        // TODO: Implementation for FourKites loader show action
                        this.loaderService.show();
                    }
                    if (this.isSuperAdmin && this.companyId && options['isCompanyIdNeeded'] !== false) {
                        requestParams = requestParams.set("company_id", this.companyId);
                    }
                    /** @type {?} */
                    var AUTH = this.storageService.retrive(AuthConfig.AUTH) || this.storageService.retriveFromCookie(AuthConfig.AUTH);
                    /** @type {?} */
                    var USER_ID = this.storageService.retrive(AuthConfig.USER_ID) || this.storageService.retriveFromCookie(AuthConfig.USER_ID);
                    /** @type {?} */
                    var DEVICE_ID = this.storageService.retrive(AuthConfig.DEVICE_ID);
                    //LOCALE
                    requestParams = requestParams.set("locale", localStorage.getItem("NG_TRANSLATE_LANG_KEY") || 'en');
                    // interceptorOptions is for internal purpose
                    // requestParams = requestParams.delete('interceptorOptions');
                    /** @type {?} */
                    var authReq = request.clone({
                        setHeaders: {
                            'Cache-control': "no-cache no-store",
                            'Pragma': "no-cache",
                            'Expires': "0",
                            'Authorization': "Bearer " + AUTH,
                            'X-FourKitesUserId': "" + USER_ID,
                            'X-FourKitesDeviceId': "" + DEVICE_ID
                        },
                        params: requestParams
                    });
                    return httpHandler.handle(authReq)
                        .pipe(operators.catchError(function (response) {
                        return rxjs.throwError(response);
                    }), operators.finalize(function () {
                        // TODO: Implementation for FourKites loader hide action
                        _this.loaderService.hide();
                    }));
                }
                else {
                    return httpHandler.handle(request);
                }
            };
        /**
         * @param {?} filterParams
         * @param {?} arrayParams
         * @return {?}
         */
        CustomHttpInterceptor.prototype.prepareArrayParams = /**
         * @param {?} filterParams
         * @param {?} arrayParams
         * @return {?}
         */
            function (filterParams, arrayParams) {
                // for the API compatibility, Converting array key into "key[]"
                /** @type {?} */
                var params = new http.HttpParams();
                /** @type {?} */
                var paramKeys = filterParams.keys();
                paramKeys.forEach(function (key) {
                    /** @type {?} */
                    var value = filterParams.map.get(key);
                    if (arrayParams.indexOf(key) != -1) {
                        value.forEach(function (valueKey) {
                            params = params.append(key + "[]", valueKey);
                        });
                    }
                    else {
                        params = params.append(key, value);
                    }
                });
                return params;
            };
        CustomHttpInterceptor.decorators = [
            { type: i0.Injectable }
        ];
        CustomHttpInterceptor.ctorParameters = function () {
            return [
                { type: StorageService },
                { type: SecurityService },
                { type: CompanyContextService },
                { type: LoaderService }
            ];
        };
        return CustomHttpInterceptor;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var ActionFooterComponent = /** @class */ (function () {
        function ActionFooterComponent() {
            this.year = new Date().getFullYear();
        }
        /**
         * @return {?}
         */
        ActionFooterComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        ActionFooterComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'action-footer',
                        template: "<div  class=\"address-items-pagination\">\n  <div class=\"col-sm-4 text-left fk_copyrights\">\n    <i class=\"fa fa-copyright\"></i>\n    <span>{{year}} {{'generic.copyright' | translate}}</span>\n  </div>\n  <div>\n    <ng-content select=\"mat-paginator\"></ng-content>\n  </div>\n</div>\n",
                        styles: [".fk_copyrights{padding:15px;color:#ddd;font-size:12px}"]
                    }] }
        ];
        ActionFooterComponent.ctorParameters = function () { return []; };
        return ActionFooterComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    //@dynamic
    var ConfirmationDialogComponent = /** @class */ (function () {
        function ConfirmationDialogComponent(dialogRef, data) {
            this.dialogRef = dialogRef;
            this.data = data;
        }
        /**
         * @return {?}
         */
        ConfirmationDialogComponent.prototype.onNoClick = /**
         * @return {?}
         */
            function () {
                if (this.data.rejectAction) {
                    this.data.rejectAction();
                }
                this.dialogRef.close();
            };
        /**
         * @return {?}
         */
        ConfirmationDialogComponent.prototype.onYesClick = /**
         * @return {?}
         */
            function () {
                if (this.data.acceptAction) {
                    this.data.acceptAction();
                }
                this.dialogRef.close();
            };
        ConfirmationDialogComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'confirmation-dialog',
                        template: "<h1 mat-dialog-title>{{data.title | translate}}</h1>\n<div mat-dialog-content>\n  <p>{{data.content | translate}}</p>\n</div>\n<div mat-dialog-actions>\n  <button mat-button class=\"dialog-button mat-raised-button mat-primary\" (click)=\"onYesClick()\">{{data.acceptText | translate}}</button>\n  <button mat-button class=\"dialog-button mat-raised-button mat-primary\" cdkFocusInitial (click)=\"onNoClick()\">{{data.rejectText | translate}}</button>\n</div>\n",
                        styles: [".dialog-button{width:140px;margin:15px}"]
                    }] }
        ];
        ConfirmationDialogComponent.ctorParameters = function () {
            return [
                { type: dialog.MatDialogRef },
                { type: undefined, decorators: [{ type: i0.Inject, args: [dialog.MAT_DIALOG_DATA,] }] }
            ];
        };
        return ConfirmationDialogComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var ExpandableListItem = /** @class */ (function () {
        function ExpandableListItem(expandableList, cdr) {
            this.expandableList = expandableList;
            this.cdr = cdr;
            this.isOpened = false;
            this.isOpenedChange = new i0.EventEmitter();
            this.disabled = false;
            this.onOpen = new i0.EventEmitter();
            this.onClose = new i0.EventEmitter();
        }
        /**
         * @param {?} event
         * @return {?}
         */
        ExpandableListItem.prototype.onClickToggle = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (this.disabled) {
                    return;
                }
                /** @type {?} */
                var isOpenedBeforeWeChange = this.isOpened;
                this.expandableList.closeAll({ newOpened: !isOpenedBeforeWeChange });
                this.isOpened = !isOpenedBeforeWeChange;
                if (this.isOpened) {
                    this.onOpen.emit();
                }
                else {
                    this.onClose.emit();
                }
                this.isOpenedChange.emit(this.isOpened);
            };
        /**
         * @return {?}
         */
        ExpandableListItem.prototype.openOnInitialization = /**
         * @return {?}
         */
            function () {
                this.isOpened = true;
                this.cdr.detectChanges();
            };
        ExpandableListItem.decorators = [
            { type: i0.Component, args: [{
                        selector: 'expandable-list-item',
                        template: "<div class=\"list-item-wrapper clearfix\" [ngClass]=\"{ 'list-expanded': isOpened }\">\n  <div (click)=\"onClickToggle($event)\">\n    <ng-content select=\"[role=content]\"></ng-content>\n  </div>\n  <div *ngIf=\"isOpened\">\n    <ng-content select=\"[role=expanded-content]\"></ng-content>\n  </div>\n</div>\n",
                        styles: [".list-item-wrapper{margin:6px 15px;border:1px solid #b7b7b9;border-radius:3px;background:#fff;transition:margin 225ms cubic-bezier(.4,0,.2,1)}.list-item-wrapper:hover{border:1px solid #09c;box-shadow:0 0 5px 0 #09c}.list-expanded{border:1px solid #09c;box-shadow:0 0 3px 0 #09c}"]
                    }] }
        ];
        ExpandableListItem.ctorParameters = function () {
            return [
                { type: ExpandableList, decorators: [{ type: i0.Host }, { type: i0.Inject, args: [i0.forwardRef(function () { return ExpandableList; }),] }] },
                { type: i0.ChangeDetectorRef }
            ];
        };
        ExpandableListItem.propDecorators = {
            isOpened: [{ type: i0.Input }],
            isOpenedChange: [{ type: i0.Output }],
            disabled: [{ type: i0.Input }],
            onOpen: [{ type: i0.Output }],
            onClose: [{ type: i0.Output }]
        };
        return ExpandableListItem;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var ExpandableList = /** @class */ (function () {
        function ExpandableList() {
            this.closeOthers = true;
            this.showArrows = false;
            this.expandAll = false;
            this.onToggle = new i0.EventEmitter();
        }
        /**
         * @return {?}
         */
        ExpandableList.prototype.ngAfterContentInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.expandAll) {
                    this.closeOthers = false;
                    this.oldStates = this.listItems.toArray();
                    this.oldStates.forEach(function (listItem) {
                        listItem.openOnInitialization();
                    });
                    // we subscribe for changes, and if new listItems are added we open them automatically
                    this.subscription = this.listItems.changes.subscribe(function (change) {
                        /** @type {?} */
                        var newStates = _this.listItems.toArray().filter(function (listItem) {
                            return _this.oldStates.indexOf(listItem) === -1;
                        });
                        newStates.forEach(function (listItem) {
                            listItem.openOnInitialization();
                        });
                        _this.oldStates = _this.listItems.toArray();
                    });
                }
            };
        /**
         * @return {?}
         */
        ExpandableList.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                if (this.subscription) {
                    this.subscription.unsubscribe();
                }
            };
        /**
         * @param {?=} event
         * @return {?}
         */
        ExpandableList.prototype.closeAll = /**
         * @param {?=} event
         * @return {?}
         */
            function (event) {
                if (event === void 0) {
                    event = {};
                }
                event.existingClosed = false;
                if (this.closeOthers) {
                    this.listItems.toArray().forEach(function (listItem) {
                        event.existingClosed = event.existingClosed || listItem.isOpened;
                        listItem.isOpened = false;
                    });
                }
                this.onToggle.emit(event);
            };
        ExpandableList.decorators = [
            { type: i0.Component, args: [{
                        selector: 'expandable-list',
                        template: "<ng-content></ng-content>"
                    }] }
        ];
        ExpandableList.propDecorators = {
            closeOthers: [{ type: i0.Input }],
            showArrows: [{ type: i0.Input }],
            expandAll: [{ type: i0.Input }],
            onToggle: [{ type: i0.Output }],
            listItems: [{ type: i0.ContentChildren, args: [i0.forwardRef(function () { return ExpandableListItem; }), { descendants: true },] }]
        };
        return ExpandableList;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var FilterToggleComponent = /** @class */ (function () {
        function FilterToggleComponent() {
        }
        FilterToggleComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'filter-toggle',
                        template: "<button class=\"filter-toggle-btn\">\n    <i aria-hidden=\"true\" class=\"fas fa-filter ff-icon\"></i>\n</button>\n",
                        styles: [".filter-toggle-btn{position:fixed;top:89px;right:10px;padding:10px;background:#fff;border:1px solid #58595b;border-radius:4px;font-size:17px;outline:0;margin:1px 0}"]
                    }] }
        ];
        FilterToggleComponent.ctorParameters = function () { return []; };
        return FilterToggleComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var ViewSwitcherComponent = /** @class */ (function () {
        function ViewSwitcherComponent() {
            if (!this.type) {
                this.type = 'list';
            }
        }
        ViewSwitcherComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'view-switcher',
                        template: "<ng-container [ngSwitch]=\"type\">\n  <ng-container *ngSwitchCase=\"'list'\">\n    <ng-content select=\"[view-type=list]\"></ng-content>\n  </ng-container>\n  <ng-container *ngSwitchCase=\"'data'\">\n    <ng-content select=\"[view-type=data]\"></ng-content>\n  </ng-container>\n  <ng-container *ngSwitchDefault>\n    <ng-content select=\"[view-type=list]\"></ng-content>\n  </ng-container>\n</ng-container>\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        styles: [""]
                    }] }
        ];
        ViewSwitcherComponent.ctorParameters = function () { return []; };
        ViewSwitcherComponent.propDecorators = {
            type: [{ type: i0.Input, args: ['type',] }]
        };
        return ViewSwitcherComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    //@dynamic
    var FullPageModalComponent = /** @class */ (function () {
        function FullPageModalComponent(dialogRef, data) {
            this.dialogRef = dialogRef;
            this.data = data;
        }
        /**
         * @return {?}
         */
        FullPageModalComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.portal = new portal.ComponentPortal(this.data.component);
            };
        FullPageModalComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'full-page-modal',
                        template: "<div class=\"modal_container\">\n  <div mat-dialog-title>\n    <div class=\"modal-title\">{{data.title}}</div>\n  </div>\n  <div mat-dialog-content>\n    <ng-template [cdkPortalOutlet]=\"portal\"></ng-template>\n  </div>\n</div>\n",
                        styles: [".modal_container{position:relative}.modal_container .mat-dialog-title{height:60px;margin:0 10px}.modal_container .mat-dialog-title .modal-title{float:left;margin:10px;font-size:24px;font-weight:300}.modal_container .mat-dialog-title .mat-dialog-actions{float:right}.modal_container .mat-dialog-title .mat-dialog-actions .dialog-button{width:140px}.modal_container .mat-dialog-content{height:inherit;max-height:72vh;height:inherit;width:97vw}"]
                    }] }
        ];
        FullPageModalComponent.ctorParameters = function () {
            return [
                { type: material.MatDialogRef },
                { type: undefined, decorators: [{ type: i0.Inject, args: [material.MAT_DIALOG_DATA,] }] }
            ];
        };
        return FullPageModalComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var FKDialogComponent = /** @class */ (function () {
        function FKDialogComponent(dialogRef, data) {
            this.dialogRef = dialogRef;
            this.data = data;
        }
        /**
         * @return {?}
         */
        FKDialogComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                if (this.data && !this.data.type) {
                    this.data.type = 'default-accept';
                }
            };
        /**
         * @return {?}
         */
        FKDialogComponent.prototype.onNoClick = /**
         * @return {?}
         */
            function () {
                if (this.data.rejectAction) {
                    this.data.rejectAction();
                }
                this.dialogRef.close();
            };
        /**
         * @return {?}
         */
        FKDialogComponent.prototype.onYesClick = /**
         * @return {?}
         */
            function () {
                if (this.data.acceptAction) {
                    this.data.acceptAction();
                }
                this.dialogRef.close();
            };
        FKDialogComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'fk-dialog',
                        template: "<div [ngClass]=\"{ 'dialog-center': (!data.title) }\">\n  <div class=\"dialog-close\" (click)=\"onNoClick()\">\n    <i class=\"fal fa-times\"></i>\n  </div>\n  <div>\n    <i *ngIf=\"data.type  && data.type == 'success'\" class=\"far fa-check\"></i>\n    <i *ngIf=\"data.type  && data.type == 'warning'\" class=\"fas fa-exclamation-triangle\"></i>\n    <h1 class=\"mat-dialog-title\" *ngIf=\"data.title\" mat-dialog-title>{{data.title}}</h1>\n  </div>\n  <div [ngClass]=\"{'content-center mat-dialog-content': (!data.title), 'mat-dialog-content': (data.title) }\" mat-dialog-content>\n    <p>{{data.content}}</p>\n  </div>\n  <div mat-dialog-actions>\n    <button mat-button class=\"dialog-button {{data.type}}-button\" (click)=\"onYesClick()\">{{data.acceptText}}</button>\n    <button mat-button class=\"dialog-button\" (click)=\"onNoClick()\">{{data.rejectText}}</button>\n  </div>\n</div>\n",
                        styles: [".mat-dialog-container{width:450px;font-family:Poppins,sans-serif}.fa-exclamation-triangle{color:#ffa32b;float:left;margin:10px 15px 5px 0}.fa-check{color:#7bbb71;float:left;font-size:22px;margin:5px 15px 5px 0}.mat-dialog-title{font-size:20px;font-weight:600;margin:0 -1px 10px;font-family:Poppins,sans-serif}.dialog-close{float:right;cursor:pointer;margin:-14px}.dialog-close .fa-times{color:#58595b;font:14px/1 \"Font Awesome 5 Pro\"}.mat-dialog-content{color:#76777a;font-family:Montserrat,sans-serif}.dialog-button{width:140px;margin:35px 15px 15px 0;height:40px;box-shadow:none;border:1px solid #dededf;border-radius:2px;color:#9a9b9d;background-color:#fff;font-family:Poppins,sans-serif}.dialog-button.warning-button{background-color:#ffa32b;color:#fff}.dialog-button.alert-button{background-color:#db5749;color:#fff;border:none}.dialog-button.default-accept-button{background-color:#09c;color:#fff;border:none}.dialog-button.success-button{background-color:#7bbb71;color:#fff;border:none}.dialog-center{text-align:center;width:100%}.dialog-center .content-center{font-weight:500;overflow:unset;padding-top:30px;line-height:1.5}"]
                    }] }
        ];
        FKDialogComponent.ctorParameters = function () {
            return [
                { type: material.MatDialogRef },
                { type: undefined, decorators: [{ type: i0.Inject, args: [material.MAT_DIALOG_DATA,] }] }
            ];
        };
        return FKDialogComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CALENDAR_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return DatePickerComponent; }),
        multi: true
    };
    var DatePickerComponent = /** @class */ (function (_super) {
        __extends(DatePickerComponent, _super);
        function DatePickerComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.dateFormat = 'dd/mm/yy';
            _this.hourFormat = '12';
            _this.yearNavigator = true;
            _this.showEndTime = true;
            _this.startTime = { hour: 0, minute: 0, format: "AM", pm: false };
            _this.endTime = { hour: 11, minute: 59, format: "PM", pm: true };
            _this.timeFormat = ["AM", "PM"];
            _this._locale = {
                firstDayOfWeek: 0,
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: 'Today',
                clear: 'Clear'
            };
            return _this;
        }
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var today = new Date();
                /** @type {?} */
                var currentYear = today.getUTCFullYear();
                this.yearRange = (currentYear - 1) + ":" + (currentYear + 10);
                _super.prototype.ngOnInit.call(this);
                if (this.selectionMode === "range") {
                    this.value = [];
                    if (this.selectedDateRange) {
                        this.updateValue(this.selectedDateRange.value);
                        this.updateInputfield();
                    }
                }
                if (this.selectionMode === "single") {
                    this.value = "";
                    if (this.selectedDateRange && this.selectedDateRange.get("start_time") && this.selectedDateRange.get("start_time").value) {
                        this.updateValue({ start_time: this.selectedDateRange.get("start_time").value }, true);
                        this.updateInputfield();
                    }
                }
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.selectedDateRange) {
                    this.selectedDateRange.get("start_time").valueChanges.subscribe(function (data) {
                        _this.updateValue({ "start_time": data });
                        _this.updateInputfield();
                    });
                    this.selectedDateRange.get("end_time").valueChanges.subscribe(function (data) {
                        _this.updateValue({ "end_time": data });
                        _this.updateInputfield();
                    });
                }
            };
        /**
         * @param {?} data
         * @param {?=} byPass
         * @return {?}
         */
        DatePickerComponent.prototype.updateValue = /**
         * @param {?} data
         * @param {?=} byPass
         * @return {?}
         */
            function (data, byPass) {
                if (byPass === void 0) {
                    byPass = false;
                }
                if (this.selectionMode === "range" || byPass) {
                    if ((data.start_time || data.end_time) && !this.value) {
                        this.value = [];
                    }
                    if (data.start_time) {
                        /** @type {?} */
                        var start_date = new Date(data.start_time);
                        if (typeof data.start_time === "string" && data.start_time.indexOf("Z") !== -1) {
                            start_date = new Date(start_date.getUTCFullYear(), start_date.getUTCMonth(), start_date.getUTCDate(), start_date.getUTCHours(), start_date.getUTCMinutes());
                        }
                        if (this.isSingleSelection()) {
                            this.value = start_date;
                        }
                        else {
                            this.value[0] = start_date;
                        }
                        if (start_date.getHours() <= 12 && !this.startTime.pm) {
                            this.startTime.hour = start_date.getHours();
                        }
                        else if (start_date.getHours() >= 12 && this.startTime.pm) {
                            this.startTime.hour = start_date.getHours() === 12 ? start_date.getHours() : (start_date.getHours() - 12);
                        }
                        this.startTime.minute = start_date.getMinutes();
                    }
                    else if (data.start_time === null && this.inputFieldValue && this.clearIcon && this.clearIcon.nativeElement) {
                        this.clearIcon.nativeElement.click();
                    }
                    if (data.end_time) {
                        /** @type {?} */
                        var end_date = new Date(data.end_time);
                        if (data.end_time.indexOf("Z") !== -1) {
                            end_date = new Date(end_date.getUTCFullYear(), end_date.getUTCMonth(), end_date.getUTCDate(), end_date.getUTCHours(), end_date.getUTCMinutes());
                        }
                        this.value[1] = end_date;
                        if (end_date.getHours() <= 12 && !this.endTime.pm) {
                            this.endTime.hour = end_date.getHours();
                        }
                        else if (end_date.getHours() >= 12 && this.endTime.pm) {
                            this.endTime.hour = end_date.getHours() === 12 ? end_date.getHours() : (end_date.getHours() - 12);
                        }
                        this.endTime.minute = end_date.getMinutes();
                    }
                    if (this.value && this.value.length) {
                        this.updateInputfield();
                    }
                }
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.isRangeSelected = /**
         * @return {?}
         */
            function () {
                return this.isRangeSelection() && this.value && this.value[0] && this.value[1];
            };
        /**
         * @param {?} dateMeta
         * @return {?}
         */
        DatePickerComponent.prototype.isRangeStartDate = /**
         * @param {?} dateMeta
         * @return {?}
         */
            function (dateMeta) {
                return this.isRangeSelected() && this.isDateEquals(this.value[0], dateMeta);
            };
        /**
         * @param {?} dateMeta
         * @return {?}
         */
        DatePickerComponent.prototype.isRangeEndDate = /**
         * @param {?} dateMeta
         * @return {?}
         */
            function (dateMeta) {
                return this.isRangeSelected() && this.isDateEquals(this.value[1], dateMeta);
            };
        /**
         * @param {?} dateMeta
         * @return {?}
         */
        DatePickerComponent.prototype.isDateBetweenRange = /**
         * @param {?} dateMeta
         * @return {?}
         */
            function (dateMeta) {
                return this.isRangeSelected() && this.isSelected(dateMeta);
            };
        /**
         * @param {?} event
         * @param {?} date
         * @return {?}
         */
        DatePickerComponent.prototype.dateSelect = /**
         * @param {?} event
         * @param {?} date
         * @return {?}
         */
            function (event, date) {
                if (this.isSingleSelection()) {
                    this.setTimeFormat();
                }
                this.onDateSelect(event, date);
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.updateInputfield = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var formattedValue;
                if (this.value && this.value.length) {
                    if (this.isRangeSelection()) {
                        if (!this.value[1]) {
                            formattedValue = this.formatDate(this.value[0], this.dateFormat);
                        }
                        else {
                            /** @type {?} */
                            var startDateObj = this.value[0];
                            /** @type {?} */
                            var startDate = startDateObj.getDate();
                            /** @type {?} */
                            var startMonth = startDateObj.getMonth();
                            /** @type {?} */
                            var startYear = startDateObj.getFullYear();
                            /** @type {?} */
                            var endDateObj = this.value[1];
                            /** @type {?} */
                            var endDate = endDateObj.getDate();
                            /** @type {?} */
                            var endMonth = endDateObj.getMonth();
                            /** @type {?} */
                            var endYear = endDateObj.getFullYear();
                            /** @type {?} */
                            var monthsInShort = this._locale.monthNamesShort;
                            if (startDate === endDate && startMonth === endMonth && startYear === endYear) {
                                formattedValue = this.formatDate(this.value[0], this.dateFormat);
                            }
                            else if (startDate !== endDate && startMonth === endMonth && startYear === endYear) {
                                formattedValue = monthsInShort[startMonth] + " " + startDate + "-" + endDate + " " + startYear;
                            }
                            else if (startMonth !== endMonth && startYear === endYear) {
                                formattedValue = monthsInShort[startMonth] + " " + startDate + " - " + monthsInShort[endMonth] + " " + endDate + " " + startYear;
                            }
                            else if (startYear !== endYear) {
                                formattedValue = monthsInShort[startMonth] + " " + startDate + " " + startYear + " - " + monthsInShort[endMonth] + " " + endDate + " " + endYear;
                            }
                        }
                    }
                }
                else if (this.isSingleSelection() && this.value) {
                    this.updateValue({ start_time: this.value }, true);
                    formattedValue = this.formatDateTime(this.value);
                    if (this.showTime) {
                        formattedValue = formattedValue.replace(formattedValue.slice(-2), (this.startTime.pm ? "PM" : "AM"));
                    }
                }
                else {
                    _super.prototype.updateInputfield.call(this);
                }
                if (formattedValue) {
                    this.inputFieldValue = formattedValue;
                    this.updateFilledState();
                    if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
                        this.inputfieldViewChild.nativeElement.value = this.inputFieldValue;
                    }
                }
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.bindDocumentClickListener = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.documentClickListener) {
                    this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
                        /** @type {?} */
                        var value = _this.value;
                        if (!_this.datepickerClick && _this.overlayVisible) {
                            _this.overlayVisible = false;
                            _this.checkRangeSelection();
                            if (_this.isRangeSelection() && _this.value && _this.value.length) {
                                /** @type {?} */
                                var startDate = new Date(_this.value[0]);
                                /** @type {?} */
                                var endDate = new Date(_this.value[1]);
                                /** @type {?} */
                                var startUnit = _this.startTime.format.toLocaleLowerCase();
                                /** @type {?} */
                                var endUnit = _this.endTime.format.toLocaleLowerCase();
                                if (startUnit === "am") {
                                    startDate.setHours(_this.startTime.hour, _this.startTime.minute, 0, 0);
                                }
                                else if (startUnit === "pm") {
                                    startDate.setHours(_this.startTime.hour + 12, _this.startTime.minute, 0, 0);
                                }
                                if (endUnit === "am") {
                                    endDate.setHours(_this.endTime.hour, _this.endTime.minute, 0, 0);
                                }
                                else if (endUnit === "pm") {
                                    endDate.setHours(_this.endTime.hour + 12, _this.endTime.minute, 0, 0);
                                }
                                value = [startDate, endDate];
                            }
                            _this.onClose.emit({ "event": event, "value": value, "startTime": _this.startTime, "endTime": _this.endTime });
                        }
                        _this.datepickerClick = false;
                        _this.cd.detectChanges();
                    });
                }
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.checkRangeSelection = /**
         * @return {?}
         */
            function () {
                if (this.isRangeSelection()) {
                    if (this.value && this.value.length) {
                        /** @type {?} */
                        var startDate = this.value[0];
                        /** @type {?} */
                        var endDate = this.value[1];
                        if (!endDate) {
                            endDate = new Date(new Date(startDate).setHours(12, 0, 0, 0));
                            this.updateModel([startDate, endDate]);
                        }
                    }
                }
            };
        /**
         * @param {?} origin
         * @return {?}
         */
        DatePickerComponent.prototype.setHours = /**
         * @param {?} origin
         * @return {?}
         */
            function (origin) {
                /** @type {?} */
                var timeObj = (origin === "am") ? this.startTime : this.endTime;
                this.currentHour = timeObj.hour;
                return timeObj;
            };
        /**
         * @param {?} event
         * @param {?=} origin
         * @return {?}
         */
        DatePickerComponent.prototype.incrementHour = /**
         * @param {?} event
         * @param {?=} origin
         * @return {?}
         */
            function (event, origin) {
                /** @type {?} */
                var timeObj = this.setHours(origin);
                this.switchAMPM(timeObj, true);
                _super.prototype.incrementHour.call(this, event);
                timeObj.format = timeObj.pm ? "PM" : "AM";
                timeObj.hour = this.currentHour;
            };
        /**
         * @param {?} event
         * @param {?=} origin
         * @return {?}
         */
        DatePickerComponent.prototype.decrementHour = /**
         * @param {?} event
         * @param {?=} origin
         * @return {?}
         */
            function (event, origin) {
                /** @type {?} */
                var timeObj = this.setHours(origin);
                this.switchAMPM(timeObj);
                _super.prototype.decrementHour.call(this, event);
                timeObj.format = timeObj.pm ? "PM" : "AM";
                timeObj.hour = this.currentHour;
            };
        /**
         * @param {?} obj
         * @param {?=} increment
         * @return {?}
         */
        DatePickerComponent.prototype.switchAMPM = /**
         * @param {?} obj
         * @param {?=} increment
         * @return {?}
         */
            function (obj, increment) {
                if (increment === void 0) {
                    increment = false;
                }
                if (this.hourFormat === '12') {
                    /** @type {?} */
                    var prevHour = this.currentHour;
                    /** @type {?} */
                    var newHour = this.currentHour + this.stepHour;
                    if (prevHour < 12 && newHour > 11 && increment) {
                        obj.pm = !obj.pm;
                    }
                    else if (prevHour === 12 && !increment) {
                        obj.pm = !obj.pm;
                    }
                }
            };
        /**
         * @param {?} origin
         * @return {?}
         */
        DatePickerComponent.prototype.setMinutes = /**
         * @param {?} origin
         * @return {?}
         */
            function (origin) {
                /** @type {?} */
                var timeObj = (origin === "am") ? this.startTime : this.endTime;
                this.currentMinute = timeObj.minute;
                return timeObj;
            };
        /**
         * @param {?} event
         * @param {?=} origin
         * @return {?}
         */
        DatePickerComponent.prototype.incrementMinute = /**
         * @param {?} event
         * @param {?=} origin
         * @return {?}
         */
            function (event, origin) {
                /** @type {?} */
                var timeObj = this.setMinutes(origin);
                _super.prototype.incrementMinute.call(this, event);
                timeObj.minute = this.currentMinute;
            };
        /**
         * @param {?} event
         * @param {?=} origin
         * @return {?}
         */
        DatePickerComponent.prototype.decrementMinute = /**
         * @param {?} event
         * @param {?=} origin
         * @return {?}
         */
            function (event, origin) {
                /** @type {?} */
                var timeObj = this.setMinutes(origin);
                _super.prototype.decrementMinute.call(this, event);
                timeObj.minute = this.currentMinute;
            };
        /**
         * @param {?} value
         * @param {?} from
         * @return {?}
         */
        DatePickerComponent.prototype.onFormatDropdownChange = /**
         * @param {?} value
         * @param {?} from
         * @return {?}
         */
            function (value, from) {
                /** @type {?} */
                var unit = from === "start" ? "am" : "pm";
                if (from === "start") {
                    this.startTime.pm = this.pm = (value === "PM");
                    this.startTime.format = value;
                    this.setHours(unit);
                }
                else if (from === "end") {
                    this.endTime.pm = this.pm = (value === "PM");
                    this.endTime.format = value;
                    this.setHours(unit);
                }
                this.updateTime();
            };
        /**
         * @param {?} event
         * @return {?}
         */
        DatePickerComponent.prototype.onClearButtonClick = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.startTime = { hour: 0, minute: 0, format: "AM", pm: false };
                this.endTime = { hour: 11, minute: 59, format: "PM", pm: true };
                _super.prototype.onClearButtonClick.call(this, event);
            };
        /**
         * @return {?}
         */
        DatePickerComponent.prototype.setTimeFormat = /**
         * @return {?}
         */
            function () {
                this.startTime.pm = this.pm;
                this.startTime.format = this.startTime.pm ? "PM" : "AM";
            };
        DatePickerComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'fk-date-picker',
                        template: "<!-- TEMPLATE STRUCTURE COPIED FROM `p-calendar` COMPOENT AND ALTERED AS PER OUR UI REQUIREMENTS  -->\n\n<span [ngClass]=\"{'ui-calendar':true, 'ui-calendar-w-btn':(showIcon || inputFieldValue)}\" \n      [ngStyle]=\"style\" \n      [class]=\"styleClass\">\n\n    <ng-template [ngIf]=\"!inline\">\n        <input #inputfield type=\"text\" \n            [attr.id]=\"inputId\"\n            [attr.name]=\"name\"\n            [attr.required]=\"required\"\n            [value]=\"inputFieldValue\"\n            (focus)=\"onInputFocus($event)\"\n            (keydown)=\"onInputKeydown($event)\" \n            (click)=\"onInputClick($event)\" \n            (blur)=\"onInputBlur($event)\"\n            [readonly]=\"readonlyInput\" \n            (input)=\"onUserInput($event)\" \n            [ngStyle]=\"inputStyle\" \n            [class]=\"inputStyleClass\"\n            [placeholder]=\"placeholder||''\" \n            [disabled]=\"disabled\" \n            [attr.tabindex]=\"tabindex\" \n            [ngClass]=\"'ui-inputtext ui-widget ui-state-default ui-corner-all'\"\n            autocomplete=\"off\">\n        <div class=\"icon-placeholder\" *ngIf=\"showIcon || inputFieldValue\">\n            <ng-container *ngIf=\"!inputFieldValue\">\n                <svg width=\"16px\" height=\"16px\" (click)=\"onButtonClick($event,inputfield)\" *ngIf=\"showIcon && !showTime\">\n                    <use xlink:href=\"#datepicker_calendar\"></use>\n                </svg>\n                <svg width=\"16px\" height=\"16px\" (click)=\"onButtonClick($event,inputfield)\" *ngIf=\"showIcon && showTime\" >\n                    <use xlink:href=\"#datepicker_time\"></use>\n                </svg>\n            </ng-container>\n            <i #clearIcon class=\"fa fa-times-circle clear-icon\" *ngIf=\"inputFieldValue\" (click)=\"onClearButtonClick($event)\"></i>\n        </div>\n    </ng-template>\n    \n    <div #datepicker [class]=\"panelStyleClass\" \n                     [ngClass]=\"{'ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all': true, 'ui-datepicker-inline':inline,'ui-shadow':!inline,'ui-state-disabled':disabled,'ui-datepicker-timeonly':timeOnly}\"\n                     [ngStyle]=\"{'display': inline ? 'inline-block' : (overlayVisible ? 'block' : 'none')}\" \n                     (click)=\"onDatePickerClick($event)\"\n                     [@overlayState]=\"inline ? 'visible' : (overlayVisible ? 'visible' : 'hidden')\">\n\n        <div class=\"ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all\" *ngIf=\"!timeOnly && (overlayVisible || inline)\">\n            <ng-content select=\"p-header\"></ng-content>\n            <a class=\"ui-datepicker-prev ui-corner-all\" href=\"javascript:;\" (click)=\"prevMonth($event)\">\n                <span class=\"fa fa-caret-left\"></span>\n            </a>\n            <a class=\"ui-datepicker-next ui-corner-all\" href=\"javascript:;\" (click)=\"nextMonth($event)\">\n                <span class=\"fa fa-caret-right\"></span>\n            </a>\n            <div class=\"ui-datepicker-title\">\n                <span class=\"ui-datepicker-month\" *ngIf=\"!monthNavigator\">{{locale.monthNames[currentMonth]}}</span>\n                <select class=\"ui-datepicker-month\" *ngIf=\"monthNavigator\" (change)=\"onMonthDropdownChange($event.target.value)\">\n                    <option [value]=\"i\" *ngFor=\"let month of locale.monthNames;let i = index\" [selected]=\"i == currentMonth\">{{month}}</option>\n                </select>\n                <select class=\"ui-datepicker-year\" *ngIf=\"yearNavigator\" (change)=\"onYearDropdownChange($event.target.value)\">\n                    <option [value]=\"year\" *ngFor=\"let year of yearOptions\" [selected]=\"year == currentYear\">{{year}}</option>\n                </select>\n                <span class=\"ui-datepicker-year\" *ngIf=\"!yearNavigator\">{{currentYear}}</span>\n            </div>\n        </div>\n        <table class=\"ui-datepicker-calendar\" *ngIf=\"!timeOnly && (overlayVisible || inline)\">\n            <thead>\n                <tr>\n                    <th scope=\"col\" *ngFor=\"let weekDay of weekDays;let begin = first; let end = last\">\n                        <span>{{weekDay}}</span>\n                    </th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let week of dates\">\n                    <td *ngFor=\"let date of week\" [ngClass]=\"{'ui-datepicker-other-month ui-state-disabled':date.otherMonth, 'ui-datepicker-current-day':isSelected(date),'ui-datepicker-today':date.today, 'ui-datepicker-range-start': isRangeStartDate(date), 'ui-datepicker-range-end': isRangeEndDate(date), 'ui-datepicker-within-range': isDateBetweenRange(date)}\">\n                        <a class=\"ui-state-default\" href=\"javascript:;\" \n                            *ngIf=\"date.otherMonth ? showOtherMonths : true\"\n                            [ngClass]=\"{'ui-state-active':isSelected(date), 'ui-state-highlight':date.today, 'ui-state-disabled':!date.selectable}\"\n                            (click)=\"dateSelect($event,date)\" draggable=\"false\">\n                            <ng-container *ngIf=\"!dateTemplate\">{{date.day}}</ng-container>\n                            <ng-container *ngTemplateOutlet=\"dateTemplate; context: {$implicit: date}\"></ng-container>\n                        </a>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n\n        <div class=\"ui-timepicker ui-widget-header ui-corner-all am-time-container\" [class.single-time]=\"!showEndTime\" *ngIf=\"showTime||timeOnly\">\n            <div class=\"ui-hour-picker\">\n                <div class=\"ui-hour-picker-value\">\n                    <span [ngStyle]=\"{'display': startTime.hour < 10 ? 'inline': 'none'}\">0</span><span>{{startTime.hour}}</span>\n                </div>\n                <div class=\"ui-hour-picker-control\">\n                    <a href=\"javascript:;\" class=\"ui-control-inc\" (click)=\"incrementHour($event, 'am')\">\n                        <span class=\"fa fa-angle-up\"></span>\n                    </a>\n                    <a href=\"javascript:;\" class=\"ui-control-dec\" (click)=\"decrementHour($event, 'am')\">\n                        <span class=\"fa fa-angle-down\"></span>\n                    </a>\n                </div>\n            </div>\n            <div class=\"ui-separator\"> : </div>\n            <div class=\"ui-minute-picker\">\n                <div class=\"ui-minute-picker-value\">\n                    <span [ngStyle]=\"{'display': startTime.minute < 10 ? 'inline': 'none'}\">0</span><span>{{startTime.minute}}</span>\n                </div>\n                <div class=\"ui-minute-picker-control\">\n                    <a href=\"javascript:;\" class=\"ui-control-inc\" (click)=\"incrementMinute($event, 'am')\">\n                        <span class=\"fa fa-angle-up\"></span>\n                    </a>\n                    <a href=\"javascript:;\" class=\"ui-control-dec\" (click)=\"decrementMinute($event, 'am')\">\n                        <span class=\"fa fa-angle-down\"></span>\n                    </a>\n                </div>\n            </div>\n            <select class=\"ui-datepicker-time-format\" (change)=\"onFormatDropdownChange($event.target.value, 'start')\">\n                <option [value]=\"format\" *ngFor=\"let format of timeFormat\" [selected]=\"format == startTime.format\">{{format}}</option>\n            </select>\n        </div>\n        <div class=\"ui-timepicker ui-widget-header ui-corner-all pm-time-container\" *ngIf=\"(showTime||timeOnly) && showEndTime\">\n            <div class=\"ui-hour-picker\">\n                <div class=\"ui-hour-picker-value\">\n                    <span [ngStyle]=\"{'display': endTime.hour < 10 ? 'inline': 'none'}\">0</span><span>{{endTime.hour}}</span>\n                </div>\n                <div class=\"ui-hour-picker-control\">\n                    <a href=\"javascript:;\" class=\"ui-control-inc\" (click)=\"incrementHour($event, 'pm')\">\n                        <span class=\"fa fa-angle-up\"></span>\n                    </a>\n                    <a href=\"javascript:;\" class=\"ui-control-dec\" (click)=\"decrementHour($event, 'pm')\">\n                        <span class=\"fa fa-angle-down\"></span>\n                    </a>\n                </div>\n            </div>\n            <div class=\"ui-separator\"> : </div>\n            <div class=\"ui-minute-picker\">\n                <div class=\"ui-minute-picker-value\">\n                    <span [ngStyle]=\"{'display': endTime.minute < 10 ? 'inline': 'none'}\">0</span><span>{{endTime.minute}}</span>\n                </div>\n                <div class=\"ui-minute-picker-control\">\n                    <a href=\"javascript:;\" class=\"ui-control-inc\" (click)=\"incrementMinute($event, 'pm')\">\n                        <span class=\"fa fa-angle-up\"></span>\n                    </a>\n                    <a href=\"javascript:;\" class=\"ui-control-dec\" (click)=\"decrementMinute($event, 'pm')\">\n                        <span class=\"fa fa-angle-down\"></span>\n                    </a>\n                </div>\n            </div>\n            <select class=\"ui-datepicker-time-format\" (change)=\"onFormatDropdownChange($event.target.value, 'end')\">\n                <option [value]=\"format\" *ngFor=\"let format of timeFormat\" [selected]=\"format == endTime.format\">{{format}}</option>\n            </select>\n        </div>\n\n        <div class=\"ui-datepicker-buttonbar ui-widget-header\" *ngIf=\"showButtonBar\">\n            <div class=\"ui-g\">\n                <div class=\"ui-g-6\">\n                    <button type=\"button\" [label]=\"_locale.today\" (click)=\"onTodayButtonClick($event)\" pButton [ngClass]=\"[todayButtonStyleClass]\"></button>\n                </div>\n                <div class=\"ui-g-6\">\n                    <button type=\"button\" [label]=\"_locale.clear\" (click)=\"onClearButtonClick($event)\" pButton [ngClass]=\"[clearButtonStyleClass]\"></button>\n                </div>\n            </div>\n        </div>\n        <ng-content select=\"p-footer\"></ng-content>\n    </div>\n</span>\n",
                        animations: [
                            animations.trigger('overlayState', [
                                animations.state('hidden', animations.style({
                                    opacity: 0
                                })),
                                animations.state('visible', animations.style({
                                    opacity: 1
                                })),
                                animations.transition('visible => hidden', animations.animate('400ms ease-in')),
                                animations.transition('hidden => visible', animations.animate('400ms ease-out'))
                            ])
                        ],
                        host: {
                            '[class.ui-inputwrapper-filled]': 'filled',
                            '[class.ui-inputwrapper-focus]': 'focus',
                            '[class.calendar-active]': 'overlayVisible'
                        },
                        providers: [domhandler.DomHandler, CALENDAR_VALUE_ACCESSOR],
                        styles: [":host{border:1px solid transparent;display:inline-block}:host *{font-family:Poppins,sans-serif}:host .fa{font-family:\"Font Awesome 5 Pro\"}:host .ui-calendar{border-radius:2px;height:100%}:host.calendar-active{border-color:#09c;border-radius:4px}:host.calendar-active .ui-calendar{border:1px solid #09c}:host.calendar-active .ui-calendar>input::-webkit-input-placeholder{color:#3a3b3c}:host.calendar-active .ui-calendar>input:-ms-input-placeholder{color:#3a3b3c}:host.calendar-active .ui-calendar>input::-ms-input-placeholder{color:#3a3b3c}:host.calendar-active .ui-calendar>input::placeholder{color:#3a3b3c}.ui-widget-content.ui-datepicker{background:#fff;box-shadow:0 3px 4px 0 rgba(10,31,68,.1),0 0 1px 0 rgba(10,31,68,.08);border:0;border-radius:4px;width:290px}.ui-widget-content.ui-datepicker.ui-datepicker-timeonly{height:75px}.ui-widget-content.ui-datepicker.ui-datepicker-timeonly .ui-timepicker{background:#fff}.ui-datepicker .ui-datepicker-header{background:#fff!important;border-radius:0!important;border:0!important;margin-top:12px;margin-bottom:9px;padding:0!important}.ui-datepicker table{margin:0 6px;font-size:12px;border-collapse:collapse}.ui-datepicker table th{color:#76777a;font-size:12px;font-family:'Work Sans';font-weight:400;height:20px}.ui-datepicker table tbody tr{font-family:'Work Sans'}.ui-datepicker table tbody tr td{width:40px;padding:4px 0}.ui-datepicker table tbody tr td:not(.ui-state-disabled) a{color:#1c1c1d;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}.ui-datepicker table tbody tr td.ui-state-disabled a{color:#dededf}.ui-datepicker table tbody tr td a{border-radius:50%;font-size:12px;height:30px;line-height:28px;margin:0 5px;text-align:center;width:30px}.ui-datepicker table tbody tr td a.ui-state-active{color:#fff}.ui-datepicker table tbody tr td.ui-state-disabled a.ui-state-active{background-color:#09c!important;opacity:.5}.ui-datepicker table tbody tr td:not(.ui-state-disabled) a:not(.ui-state-active).ui-state-highlight{background-color:#f4f4f4!important;font-weight:700}.ui-datepicker table tbody tr td:not(.ui-state-disabled) a.ui-state-active{background-color:#09c!important}.ui-datepicker .ui-datepicker-title .ui-datepicker-month{color:#2e2e2e;font-family:Poppins,sans-serif;font-size:12px;font-weight:600;margin-right:8px}.ui-datepicker .ui-datepicker-title select.ui-datepicker-year{background:#fff;border:1px solid #dddbda;border-radius:2px!important;font-size:12px;height:32px;margin:0;width:66px}.ui-timepicker{background:#f8f9fb;border-radius:2px;height:75px;padding:20px 0}.ui-timepicker .ui-hour-picker,.ui-timepicker .ui-minute-picker{background:#fff;border:1px solid #dededf;height:33px;position:relative;width:58px;margin:0 5px}.ui-hour-picker-value,.ui-minute-picker-value{width:30px;height:100%;float:left;line-height:32px;font-family:\"Work Sans\";padding-left:10px;font-size:12px}.ui-hour-picker-control,.ui-minute-picker-control{width:18px;float:right;font-size:12px;height:100%}.ui-hour-picker-control a,.ui-minute-picker-control a{color:#3a3b3c}.ui-hour-picker-control .ui-control-inc,.ui-minute-picker-control .ui-control-inc{height:50%;position:relative;top:6px}.ui-hour-picker-control .ui-control-dec,.ui-minute-picker-control .ui-control-dec{bottom:3px;height:50%;position:relative}.ui-time-label{position:relative;top:-7px;color:#3a3b3c;font-size:14px;display:inline-block}.ui-datepicker table tbody tr td.ui-datepicker-current-day.ui-datepicker-within-range a.ui-state-active{border-radius:0;width:40px;margin:0}.ui-datepicker-current-day.ui-datepicker-range-start .ui-state-active,.ui-datepicker-current-day.ui-datepicker-within-range:first-child .ui-state-active{border-top-left-radius:20px!important;border-bottom-left-radius:20px!important}.ui-datepicker-current-day.ui-datepicker-range-end .ui-state-active,.ui-datepicker-current-day.ui-datepicker-within-range:last-child .ui-state-active{border-top-right-radius:20px!important;border-bottom-right-radius:20px!important}.ui-timepicker{width:100%;text-align:center}.ui-timepicker.am-time-container{padding-bottom:0;height:auto}.ui-timepicker.am-time-container.single-time{padding-bottom:17px}.ui-timepicker.pm-time-container{padding-top:6px;height:auto}.ui-timepicker .ui-separator{position:relative;top:-15px}.ui-timepicker .am-pm-placeholder{width:auto;padding-right:10px}.ui-timepicker .am-pm-placeholder .ui-minute-picker-value{padding-right:10px}.ui-timepicker .am-pm-placeholder .ui-minute-picker-value>span{display:block}.ui-calendar{position:relative;display:table;border-radius:2px;border:1px solid #dededf;background-color:#fff;width:100%;box-sizing:border-box}.ui-calendar>input{border:0;height:100%;outline:0;color:#3a3b3c;padding:7px;font-size:12px;-webkit-transform:none!important;transform:none!important;display:table-cell;vertical-align:middle;box-sizing:border-box;float:left}.ui-calendar.ui-calendar-w-btn>input{width:calc(100% - 25px)}.ui-calendar:not(.ui-calendar-w-btn)>input{width:100%}.ui-calendar>input::-webkit-input-placeholder{color:#76777a;opacity:1}.ui-calendar>input:-ms-input-placeholder{color:#76777a;opacity:1}.ui-calendar>input::-ms-input-placeholder{color:#76777a;opacity:1}.ui-calendar>input::placeholder{color:#76777a;opacity:1}.ui-calendar>.icon-placeholder{position:relative;float:left;height:100%;width:16px;margin:0 7px 0 2px;display:inherit;cursor:pointer}.ui-calendar>.icon-placeholder>.fa.fa-calendar{font-size:16px;opacity:.8}.ui-calendar>.icon-placeholder>.clear-icon{font-size:16px;color:#9a9b9d;font-weight:500;cursor:pointer}.ui-calendar>.icon-placeholder>*{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.ui-calendar .ui-datepicker>table>thead>tr>th{text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}.ui-calendar .ui-calendar-button{position:absolute;height:100%;border-top-left-radius:0;border-bottom-left-radius:0;width:2em;border-left:0}.ui-calendar .ui-calendar-button:enabled:hover,.ui-calendar .ui-calendar-button:focus{border-left:0}.ui-fluid .ui-calendar{width:100%}.ui-fluid .ui-calendar-button{width:2em}.ui-fluid .ui-datepicker-buttonbar button{width:auto}.ui-fluid .ui-calendar.ui-calendar-w-btn .ui-inputtext{width:calc(100% - 2em)}.ui-datepicker{width:17em;display:none;position:absolute;margin-top:5px}.ui-datepicker.ui-datepicker-inline{display:inline-block;position:static}.ui-datepicker .ui-datepicker-header{position:relative}.ui-datepicker .ui-datepicker-next,.ui-datepicker .ui-datepicker-prev{position:absolute;top:.125em;width:1.8em;height:1.8em}.ui-datepicker .ui-datepicker-prev{left:.125em}.ui-datepicker .ui-datepicker-next{right:.125em}.ui-datepicker .ui-datepicker-next span,.ui-datepicker .ui-datepicker-prev span{color:#706e6b;display:block;position:absolute;left:50%;top:50%;margin-top:-.5em}.ui-datepicker .ui-datepicker-prev span{margin-left:-.25em}.ui-datepicker .ui-datepicker-next span{margin-left:-.125em}.ui-datepicker .ui-datepicker-title{margin:0 2.3em;line-height:1.8em;text-align:center}.ui-datepicker .ui-datepicker-title select{font-size:1em;margin:.125em 0;vertical-align:middle}.ui-datepicker select.ui-datepicker-month{width:55%;margin-right:.25em}.ui-datepicker select.ui-datepicker-year{width:35%}.ui-datepicker th{text-align:center;font-weight:700;border:0}.ui-datepicker td{border:0}.ui-datepicker td a,.ui-datepicker td span{display:block;text-align:right;text-decoration:none}.ui-datepicker .ui-datepicker-buttonpane{background-image:none;margin:.7em 0 0;padding:0 .2em;border-left:0;border-right:0;border-bottom:0}.ui-datepicker .ui-datepicker-buttonpane button{float:right;margin:.5em .2em .4em;cursor:pointer;padding:.2em .6em .3em;width:auto;overflow:visible}.ui-datepicker .ui-datepicker-buttonpane button.ui-datepicker-current{float:left}.ui-datepicker.ui-datepicker-multi{width:auto}.ui-datepicker-multi .ui-datepicker-group{float:left}.ui-datepicker-multi .ui-datepicker-group table{width:95%;margin:0 auto .4em}.ui-datepicker-multi-2 .ui-datepicker-group{width:50%}.ui-datepicker-multi-3 .ui-datepicker-group{width:33.3%}.ui-datepicker-multi-4 .ui-datepicker-group{width:25%}.ui-datepicker-multi .ui-datepicker-group-last .ui-datepicker-header,.ui-datepicker-multi .ui-datepicker-group-middle .ui-datepicker-header{border-left-width:0}.ui-datepicker-multi .ui-datepicker-buttonpane{clear:left}.ui-datepicker-row-break{clear:both;width:100%;font-size:0}.ui-datepicker .ui-datepicker-buttonbar{border-left:0;border-right:0;border-bottom:0;padding:.2em}.ui-datepicker .ui-datepicker-buttonbar>.ui-g>div:last-child{text-align:right}.ui-datepicker .ui-datepicker-buttonbar>.ui-g>div{padding:0}.ui-calendar.ui-calendar-w-btn input{border-radius:4px}.ui-timepicker>div{display:inline-block;position:relative;margin-left:.5em;min-width:1.5em}.ui-timepicker>.ui-second-picker{margin-left:0}.ui-timepicker>.ui-separator{margin-left:0;min-width:.75em}.ui-timepicker>.ui-separator a{visibility:hidden}.ui-timepicker>div a{display:block;opacity:.7;filter:Alpha(Opacity=70)}.ui-timepicker>div a:hover{display:block;opacity:1;filter:Alpha(Opacity=100)}.ui-datepicker-time-format{-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:0;background:#fff;border:1px solid #dededf;height:33px;margin:0 5px;font-size:12px;padding:0 11px;vertical-align:top}"]
                    }] }
        ];
        DatePickerComponent.propDecorators = {
            clearIcon: [{ type: i0.ViewChild, args: ["clearIcon",] }],
            dateFormat: [{ type: i0.Input }],
            hourFormat: [{ type: i0.Input }],
            yearNavigator: [{ type: i0.Input }],
            yearRange: [{ type: i0.Input }],
            selectedDateRange: [{ type: i0.Input }],
            showEndTime: [{ type: i0.Input }]
        };
        return DatePickerComponent;
    }(calendar.Calendar));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var ComponentsIconComponent = /** @class */ (function () {
        function ComponentsIconComponent() {
        }
        /**
         * @return {?}
         */
        ComponentsIconComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        ComponentsIconComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'components-icon',
                        template: "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <symbol id=\"fk-expanded-arrow\" viewBox=\"0 0 20 13\">\n        <path d=\"M0 6.067L8.333 0v5.2h10.834c.46 0 .833.388.833.867 0 .478-.372.866-.833.866H8.333v5.2L0 6.067z\" fill=\"currentColor\" fill-rule=\"nonzero\"/>\n    </symbol>\n    <symbol id=\"datepicker_time\" viewBox=\"0 0 16 16\">\n        <defs>\n            <path d=\"M8 0a8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8zm4.86 12.86a6.84 6.84 0 0 1-2.185 1.474c-.847.36-1.747.541-2.675.541a6.835 6.835 0 0 1-4.86-2.012 6.84 6.84 0 0 1-1.474-2.186A6.822 6.822 0 0 1 1.125 8a6.835 6.835 0 0 1 2.013-4.86 6.84 6.84 0 0 1 2.185-1.474A6.822 6.822 0 0 1 8 1.125a6.835 6.835 0 0 1 4.86 2.013 6.84 6.84 0 0 1 1.474 2.185c.36.849.541 1.749.541 2.677a6.835 6.835 0 0 1-2.014 4.86zm-1.407-4.985h-2.89v-3.75a.562.562 0 1 0-1.126 0v3.75C7.438 8.497 7.941 9 8.563 9h2.891a.562.562 0 1 0 0-1.125z\" id=\"a\"/>\n        </defs>\n        <use fill=\"currentColor\" fill-rule=\"nonzero\" xlink:href=\"#a\"/>\n    </symbol>\n    <symbol id=\"datepicker_calendar\" viewBox=\"0 0 15 15\">\n        <g stroke=\"currentColor\" fill=\"none\" fill-rule=\"evenodd\" stroke-linecap=\"square\">\n            <path d=\"M14 5.063H1M11.4 2.625H14V14H1V2.625h2.6M5.063 2.625h4.875\"/>\n            <path d=\"M3.438 1h1.625v2.438H3.438zM9.938 1h1.625v2.438H9.938zM3.438 7.5v4.062h5.416v-2.03h2.709V7.5zM9.125 7.5v2.438M5.875 8.313v4.062M8.313 9.938H3.436\"/>\n        </g>\n    </symbol>\n</svg>",
                        styles: [""]
                    }] }
        ];
        return ComponentsIconComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NgDisabledDirective = /** @class */ (function () {
        function NgDisabledDirective(ngControl) {
            this.ngControl = ngControl;
        }
        Object.defineProperty(NgDisabledDirective.prototype, "ngDisabled", {
            set: /**
             * @param {?} condition
             * @return {?}
             */ function (condition) {
                /** @type {?} */
                var action = condition ? 'disable' : 'enable';
                this.ngControl.control[action]();
            },
            enumerable: true,
            configurable: true
        });
        NgDisabledDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[ngDisabled]'
                    },] }
        ];
        NgDisabledDirective.ctorParameters = function () {
            return [
                { type: forms.NgControl }
            ];
        };
        NgDisabledDirective.propDecorators = {
            ngDisabled: [{ type: i0.Input }]
        };
        return NgDisabledDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var PendoAnalyticsDirective = /** @class */ (function () {
        function PendoAnalyticsDirective() {
            this.isPendoInitiated = false;
            this.link();
        }
        /**
         * @return {?}
         */
        PendoAnalyticsDirective.prototype.link = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var userData = JSON.parse(localStorage.getItem('tfcurrent-user') || "{}");
                if (!this.isPendoInitiated && userData && Object.keys(userData).length) {
                    this.inititate();
                }
            };
        /**
         * @return {?}
         */
        PendoAnalyticsDirective.prototype.inititate = /**
         * @return {?}
         */
            function () {
                this.isPendoInitiated = true;
                try {
                    /** @type {?} */
                    var pendoFn = "(function(apiKey) {\n        (\n          function(p,e,n,d,o) {\n          var v,w,x,y,z;o=p[d]=p[d]||{};\n          o._q=[];\n          v=['initialize','identify','updateOptions','pageLoad'];\n          for(w=0,x=v.length;w<x;++w)\n          (function(m){\n            o[m]=o[m]||function(){\n              o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)))}})(v[w]);\n              y=e.createElement(n);y.async=!0;\n              y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z)})(window,document,'script','pendo'); \n              var userData = JSON.parse(localStorage.getItem('tfcurrent-user') || '{}');\n              console.log('PENDO INITIATED');\n              if(userData){\n              pendo.initialize({visitor:{id:userData.userId||'CURRENT-USER',email:userData.emailAddress||'',role:userData.role||''},account:{id:userData.company.id||'',name:userData.company||''\n            }\n          })\n        }\n        })('b73a0f4f-e842-4107-5c7b-c9f6fc21eda2')";
                    /** @type {?} */
                    var Func = Function;
                    new Func(pendoFn)();
                }
                catch (e) {
                    console.log('EXCEPTION IN PENDO', e);
                }
            };
        PendoAnalyticsDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: "[pendo-analytics]"
                    },] }
        ];
        PendoAnalyticsDirective.ctorParameters = function () { return []; };
        return PendoAnalyticsDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var HighlightDirective = /** @class */ (function () {
        function HighlightDirective(el) {
            this.el = el;
            this.searchTerm = undefined;
            this.caseSensitive = true;
            this.viewRendered = false;
            this.WRAPPER_TOKEN = '==--==##';
        }
        Object.defineProperty(HighlightDirective.prototype, "caseSensitivity", {
            get: /**
             * @return {?}
             */ function () { return this.caseSensitive ? '' : 'i'; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        HighlightDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                this.highlightSearchTerm();
            };
        /**
         * @return {?}
         */
        HighlightDirective.prototype.ngAfterViewChecked = /**
         * @return {?}
         */
            function () {
                this.viewRendered = true;
            };
        /**
         * @return {?}
         */
        HighlightDirective.prototype.highlightSearchTerm = /**
         * @return {?}
         */
            function () {
                // initial ngChage call will result with null \ undefined.
                if (!this.searchTerm) {
                    // when user deletes all text the searchTerm is set to '' we need to remove all marks.
                    if (this.viewRendered) {
                        this.removePreviouslyMarkedTextInNode();
                    }
                    return;
                }
                if (this.el.nativeElement) {
                    this.removePreviouslyMarkedTextInNode();
                    this.markMatchedTextTokens(this.el.nativeElement);
                }
            };
        /**
         * @param {?} htmlNode
         * @return {?}
         */
        HighlightDirective.prototype.markMatchedTextTokens = /**
         * @param {?} htmlNode
         * @return {?}
         */
            function (htmlNode) {
                var _this = this;
                /** @type {?} */
                var _searchTerm = this.getSearchTerm();
                /** @type {?} */
                var searchRegex = new RegExp(_searchTerm, 'gmi');
                /** @type {?} */
                var _searchTermUniqueTokens = this.getUniqueTokenWrappedSearchTerm();
                /** @type {?} */
                var searchRegexUniqueTokens = new RegExp(_searchTermUniqueTokens, 'gmi');
                this.traverseHtmlElementsTree(htmlNode, function (e) {
                    _this.traverseNodesInElement(htmlNode.childNodes, function (node) { return _this.wrapUniqueTokensAroundMatchedText(node, searchRegex); });
                });
                this.markMatchedTextAndRemoveUniqueTokens(htmlNode, searchRegexUniqueTokens);
            };
        /**
         * @param {?} htmlNode
         * @param {?} searchRegex
         * @return {?}
         */
        HighlightDirective.prototype.markMatchedTextAndRemoveUniqueTokens = /**
         * @param {?} htmlNode
         * @param {?} searchRegex
         * @return {?}
         */
            function (htmlNode, searchRegex) {
                var _this = this;
                if (htmlNode.innerHTML) {
                    /** @type {?} */
                    var innerHtml = htmlNode.innerHTML;
                    /** @type {?} */
                    var newHtml = innerHtml.replace(searchRegex, function (match) {
                        /** @type {?} */
                        var wrapperLength = _this.WRAPPER_TOKEN.length;
                        /** @type {?} */
                        var markedStr = match.substr(wrapperLength, match.length - (wrapperLength * 2));
                        return "<mark class=\"highlighted\" class=\"marked\">" + markedStr + "</mark>";
                    });
                    htmlNode.innerHTML = newHtml;
                }
            };
        /**
         * @param {?} nodes
         * @param {?} visitCallback
         * @return {?}
         */
        HighlightDirective.prototype.traverseNodesInElement = /**
         * @param {?} nodes
         * @param {?} visitCallback
         * @return {?}
         */
            function (nodes, visitCallback) {
                for (var i = 0; i < nodes.length; i++) {
                    /** @type {?} */
                    var node = nodes[i];
                    if (node.nodeType === 3) {
                        visitCallback(node);
                    }
                }
            };
        /**
         * @param {?} htmlNode
         * @param {?} searchRegex
         * @return {?}
         */
        HighlightDirective.prototype.wrapUniqueTokensAroundMatchedText = /**
         * @param {?} htmlNode
         * @param {?} searchRegex
         * @return {?}
         */
            function (htmlNode, searchRegex) {
                /** @type {?} */
                var innerText = htmlNode.nodeValue;
                /** @type {?} */
                var newText = innerText.replace(searchRegex, this.WRAPPER_TOKEN + "$&" + this.WRAPPER_TOKEN);
                htmlNode.nodeValue = newText;
            };
        /**
         * @param {?} currentNode
         * @param {?} visitCallback
         * @return {?}
         */
        HighlightDirective.prototype.traverseHtmlElementsTree = /**
         * @param {?} currentNode
         * @param {?} visitCallback
         * @return {?}
         */
            function (currentNode, visitCallback) {
                if (currentNode) {
                    visitCallback(currentNode);
                }
                for (var i = 0; i < currentNode.children.length; i++) {
                    /** @type {?} */
                    var childElement = currentNode.children[i];
                    if (!childElement.classList.contains('no-highlight')) {
                        this.markMatchedTextTokens(( /** @type {?} */(childElement)));
                    }
                }
            };
        /**
         * @return {?}
         */
        HighlightDirective.prototype.removePreviouslyMarkedTextInNode = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var node = this.el.nativeElement;
                /** @type {?} */
                var markingPattern = new RegExp('<mark class="highlighted">|<\/mark>', 'g');
                /** @type {?} */
                var cleanText = node.innerHTML.replace(markingPattern, '');
                node.innerHTML = cleanText;
            };
        /**
         * @return {?}
         */
        HighlightDirective.prototype.getSearchTerm = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var escapedSearchTerm = "" + this.escapeRegExp(this.searchTerm);
                /** @type {?} */
                var spaceToMultiMatchRegex = new RegExp(' ', 'gm');
                escapedSearchTerm = escapedSearchTerm.replace(spaceToMultiMatchRegex, '|');
                return escapedSearchTerm;
            };
        /**
         * @return {?}
         */
        HighlightDirective.prototype.getUniqueTokenWrappedSearchTerm = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var escapedSearchTerm = this.escapeRegExp(this.searchTerm);
                /** @type {?} */
                var spaceToMultiMatchRegex = new RegExp(' ', 'gm');
                escapedSearchTerm = escapedSearchTerm.replace(spaceToMultiMatchRegex, this.WRAPPER_TOKEN + "|" + this.WRAPPER_TOKEN);
                escapedSearchTerm = "" + this.WRAPPER_TOKEN + escapedSearchTerm + this.WRAPPER_TOKEN;
                return escapedSearchTerm;
            };
        /**
         * @param {?} str
         * @return {?}
         */
        HighlightDirective.prototype.escapeRegExp = /**
         * @param {?} str
         * @return {?}
         */
            function (str) {
                return str.replace('/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g', '\\$&');
            };
        HighlightDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[highlight]'
                    },] }
        ];
        HighlightDirective.ctorParameters = function () {
            return [
                { type: i0.ElementRef }
            ];
        };
        HighlightDirective.propDecorators = {
            searchTerm: [{ type: i0.Input, args: ['highlight',] }],
            caseSensitive: [{ type: i0.Input }]
        };
        return HighlightDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    // @dynamic
    var KeyBlockDirective = /** @class */ (function () {
        function KeyBlockDirective(ngControl) {
            this.ngControl = ngControl;
            this.delay = null;
            this.el = ngControl;
        }
        // Listen for the input event to also handle copy and paste.
        // Listen for the input event to also handle copy and paste.
        /**
         * @param {?} value
         * @return {?}
         */
        KeyBlockDirective.prototype.onInput =
            // Listen for the input event to also handle copy and paste.
            /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _this = this;
                try {
                    //Delay is added for firefox to accept the decimal point
                    if (window.navigator.userAgent.indexOf("Firefox") > -1) {
                        if (this.delay) {
                            clearTimeout(this.delay);
                        }
                        this.delay = setTimeout(function () {
                            _this.validateRegex(value);
                        }, 1500);
                    }
                    else {
                        this.validateRegex(value);
                    }
                }
                catch (e) {
                    console.error('Invalid RegExp or Pattern Config', e);
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        KeyBlockDirective.prototype.validateRegex = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (this.pattern) {
                    this.el.control.patchValue(_.first(value.match(this.pattern)));
                }
            };
        Object.defineProperty(KeyBlockDirective.prototype, "pattern", {
            get: /**
             * @return {?}
             */ function () {
                if (this._pattern) {
                    return this._pattern;
                }
                if (this.isPatternHash) {
                    return this._pattern = KeyBlockDirective.PATTERNS[_.first(this.key)](_.last(this.key));
                }
                if (typeof this.key == "string") {
                    return this._pattern = KeyBlockDirective.PATTERNS[this.key];
                }
                if (_.isRegExp(this.key)) {
                    return this._pattern = ( /** @type {?} */(this.key));
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyBlockDirective.prototype, "isPatternHash", {
            get: /**
             * @return {?}
             */ function () {
                return _.isArray(this.key) && _.size(this.key) == 2 && typeof _.first(this.key) == "string" && typeof _.last(this.key) == "number" ? true : false;
            },
            enumerable: true,
            configurable: true
        });
        KeyBlockDirective.PATTERNS = {
            pvdecimal: function (precision) {
                return (new RegExp(/\d*\.?\d{1}?/g));
            },
            decimal: function (precision) {
                return (new RegExp('(\-{0,\\d+((\\.\\d{${precision}})|\\.)?)', 'g'));
            }
        };
        KeyBlockDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[keyBlock]'
                    },] }
        ];
        KeyBlockDirective.ctorParameters = function () {
            return [
                { type: forms.NgControl }
            ];
        };
        KeyBlockDirective.propDecorators = {
            key: [{ type: i0.Input, args: ['keyBlock',] }],
            onInput: [{ type: i0.HostListener, args: ['input', ['$event.target.value'],] }]
        };
        return KeyBlockDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var LicensingConfig = {
        PRODUCT: {
            INSIGHTS: 'insights'
        },
        INSIGHTS: {
            ADVANCED_ANALYTICS_DASHBOARD: 'advanced_analytics_dashboard',
            ADVANCED_ANALYTICS_DASHBOARD_OCEAN: 'advanced_analytics_dashboard_ocean',
            ADVANCED_ANALYTICS_SUBSCRIPTION: 'advanced_analytics_subscription',
            ANALYTICS_API: 'analytics_api',
            ANALYTICS_DASHBOARD: 'analytics_dashboard',
            ANALYTICS_DASHBOARD_OCEAN: 'analytics_dashboard_ocean',
            ANALYTICS_SUBSCRIPTION: 'analytics_subscription',
            BENCHMARKING_DASHBOARD: 'benchmarking_dashboard',
            CONSISTENCY_API: 'consistency_api',
            CONSISTENCY_DASHBOARD: 'consistency_dashboard',
            CONSISTENCY_SUBSCRIPTION: 'consistency_subscription',
            ADVANCED_ANALYTICS_EXEC_DASH: 'advanced_analytics_exec_dash',
            RECO_ARRIVAL_EXEC_DASH: 'reco_arrival_exec_dash',
            RECO_ARRIVAL_RECOMMENDATION: 'reco_arrival_recommendation',
            RECO_DEPARTURE_EXEC_DASH: 'reco_departure_exec_dash',
            RECO_DEPARTURE_RECOMMENDATION: 'reco_departure_recommendation',
            RECO_DEPARTURE_TRACKING: 'reco_departure_tracking',
            RESCHEDULES_EXEC_DASH: 'reschedules_exec_dash',
            RESCHEDULES_RECOMMENDATION: 'reschedules_recommendation',
            TRANSIT_RISK_EXEC_DASH: 'transit_risk_exec_dash',
            TRANSIT_RISK_RECOMMENDATION: 'transit_risk_recommendation'
        },
        INSIGHTS_LICENSE_FLAG: 'insights-licensing'
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var headerFeatures = {
        'dev': [
            {
                name: 'insights-api',
                enabled: true
            },
            {
                name: 'load-framework-update',
                enabled: false
            },
            {
                name: 'bulk-notification-upload',
                enabled: true
            },
            {
                name: 'new-air-page',
                enabled: true
            }
        ],
        'fkdev': [
            {
                name: 'insights-api',
                enabled: true
            },
            {
                name: LicensingConfig.INSIGHTS_LICENSE_FLAG,
                enabled: true
            },
            {
                name: 'load-framework-update',
                enabled: false
            },
            {
                name: 'bulk-notification-upload',
                enabled: true
            },
            {
                name: 'new-air-page',
                enabled: false
            },
            {
                name: 'reco-engine',
                enabled: false,
                superAdmins: true,
                userIds: [
                    'mabdtestuser'
                ]
            },
            {
                name: 'user-licensing',
                enabled: true,
                superAdmins: false,
                userIds: [
                    'mathan',
                    'harish',
                    'gouthamelangeswaran',
                    'ananthakrishnang',
                    'rich-dube',
                    'ganesh'
                ]
            }
        ],
        'uat': [
            {
                name: 'load-framework-update',
                enabled: false
            },
            {
                name: 'new-ocean-page',
                enabled: true
            },
            {
                name: 'bulk-notification-upload',
                enabled: true
            },
            {
                name: 'new-air-page',
                enabled: true
            }
        ],
        'staging': [
            {
                name: 'load-framework-update',
                enabled: false
            },
            {
                name: 'facility-manager',
                enabled: false,
                superAdmins: true,
                userIds: [
                    'mail-samyu',
                    'admin-withfm',
                    'pure-beverages',
                    'cargilldemo',
                    'xpoldemo'
                ]
            },
            {
                name: 'bulk-notification-upload',
                enabled: true
            },
            {
                name: 'new-air-page',
                enabled: false
            }
        ],
        'mirror': [
            {
                name: 'load-framework-update',
                enabled: true
            },
            {
                name: 'new-ocean-page',
                enabled: true
            },
            {
                name: 'bulk-notification-upload',
                enabled: true
            },
            {
                name: 'new-air-page',
                enabled: false
            }
        ],
        'production': [
            {
                name: 'insights-api',
                enabled: false,
                companyIds: [
                    'tyson',
                    'sysco',
                    'demo-org'
                ]
            },
            {
                name: LicensingConfig.INSIGHTS_LICENSE_FLAG,
                enabled: true
            },
            {
                name: 'load-framework-update',
                enabled: false
            },
            {
                name: 'facility-manager',
                enabled: false,
                superAdmins: true,
                userIds: [
                    'april-moser',
                    'vincent-koleck',
                    'rob-haddock',
                    'with-fm',
                    'robert-regnier',
                    'jason-wicklund',
                    'anne-mariekane',
                    'mike-mckeown',
                    'mike-provo',
                    'shad-johnson',
                    'chad-seideneck',
                    'john-borsch',
                    'mike-carrozza',
                    'lou-germano',
                    'mckinsey-cocacola',
                    'mckinsey-lol',
                    'mckinsey-wegmans',
                    'mckinsey-gianteagle',
                    'don-wermerskirchen',
                    'steven-moore-1977',
                    'rafael-rodriguez-7946'
                ]
            },
            {
                name: 'bulk-notification-upload',
                enabled: true
            },
            {
                name: 'new-ocean-page',
                enabled: true
            },
            {
                name: 'new-air-page',
                enabled: false
            },
            {
                name: 'user-licensing',
                enabled: true,
                superAdmins: false,
                userIds: [
                    'hari-hara',
                    'mathankumar-r',
                    'ananthakrishnang',
                    'goutham',
                    'ganesh',
                    'rich-dube'
                ]
            },
            {
                name: 'reco-engine',
                enabled: false,
                superAdmins: true,
                userIds: [
                    'craig-byers',
                    'jane-kennedy',
                    'kerri-kaiser',
                    'charles-joyner',
                    'rob-haddock',
                    'jeff-coggles',
                    'andy-scharff',
                    'walter-morris-5400',
                    'milan-byrd',
                    'christopher-armstrong',
                    'kaley-gilmore',
                    'matt-michels',
                    'jason-frerich',
                    'scott-ponsford',
                    'dawn-goudie',
                    'ryan-ono',
                    'austin-fradette',
                    'brian-stoufer',
                    'klay-dalton',
                    'john-reynolds',
                    'john-williams-7001',
                    'joe-depaola',
                    'jason-kim',
                    'don-wermerskirchen',
                    'timothy-denofa',
                    'ilse-pacheco',
                    'rich-dube-9615'
                ]
            }
        ]
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var FeatureFlagService = /** @class */ (function () {
        function FeatureFlagService(companyContextService, securityService) {
            this.companyContextService = companyContextService;
            this.securityService = securityService;
        }
        /**
         * @param {?} name
         * @param {?=} fromHeader
         * @return {?}
         */
        FeatureFlagService.prototype.isFeatureEnabled = /**
         * @param {?} name
         * @param {?=} fromHeader
         * @return {?}
         */
            function (name, fromHeader) {
                if (fromHeader === void 0) {
                    fromHeader = false;
                }
                /** @type {?} */
                var isEnabled = false;
                /** @type {?} */
                var feature = this.getFlagByName(name, fromHeader);
                if (feature !== undefined) {
                    isEnabled = feature.enabled;
                    if (feature.superAdmins && this.securityService.isSuperAdmin) {
                        return true;
                    }
                    if (feature.companyIds && feature.companyIds.length) {
                        /** @type {?} */
                        var currentCompany = this.companyContextService.getCompanyContext() || this.securityService.currentUser.companyId;
                        isEnabled = (feature.companyIds.indexOf(currentCompany) != -1);
                        return isEnabled;
                    }
                    if (feature.userIds && feature.userIds.length) {
                        isEnabled = (feature.userIds.indexOf(this.securityService.currentUser["userId"]) != -1);
                        return isEnabled;
                    }
                }
                return isEnabled;
            };
        /**
         * @param {?} name
         * @param {?=} fromHeader
         * @return {?}
         */
        FeatureFlagService.prototype.getFlagByName = /**
         * @param {?} name
         * @param {?=} fromHeader
         * @return {?}
         */
            function (name, fromHeader) {
                if (fromHeader === void 0) {
                    fromHeader = false;
                }
                /** @type {?} */
                var feature;
                /** @type {?} */
                var features = fromHeader ? this.featuresForHeader : this.features;
                if (features && features.length) {
                    feature = features.filter(function (_feature) { return _feature.name === name; })[0];
                }
                return feature;
            };
        Object.defineProperty(FeatureFlagService.prototype, "featuresForHeader", {
            get: /**
             * @return {?}
             */ function () {
                /** @type {?} */
                var envName = (ConfigHelper.environment && ConfigHelper.environment.name) || 'production';
                return headerFeatures[envName];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FeatureFlagService.prototype, "features", {
            get: /**
             * @return {?}
             */ function () {
                return ConfigHelper.environment && ConfigHelper.environment.features;
            },
            enumerable: true,
            configurable: true
        });
        FeatureFlagService.decorators = [
            { type: i0.Injectable }
        ];
        FeatureFlagService.ctorParameters = function () {
            return [
                { type: CompanyContextService },
                { type: SecurityService }
            ];
        };
        return FeatureFlagService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var LicensingService = /** @class */ (function () {
        function LicensingService(securityService, tfStorage, http$$1) {
            this.securityService = securityService;
            this.tfStorage = tfStorage;
            this.http = http$$1;
        }
        /**
         * @param {?} product
         * @return {?}
         */
        LicensingService.licensedFeaturesUrl = /**
         * @param {?} product
         * @return {?}
         */
            function (product) {
                /** @type {?} */
                var host = ConfigHelper.environment.licensingServiceUrl;
                if (host.length === 0) {
                    return '';
                }
                /** @type {?} */
                var uri = '/feature?product=' + product;
                return host + uri;
            };
        /**
         * @param {?} featureArr
         * @return {?}
         */
        LicensingService.prototype.isInsightsLicensed = /**
         * @param {?} featureArr
         * @return {?}
         */
            function (featureArr) {
                if (this.securityService.isSuperAdmin) {
                    return this.securityService.currentUser.isAnalyticsEnabled;
                }
                return this.isUserLicensed(LicensingConfig.PRODUCT.INSIGHTS, featureArr);
            };
        /**
         * @return {?}
         */
        LicensingService.prototype.refreshInsightsFeatures = /**
         * @return {?}
         */
            function () {
                if (this.securityService.isSuperAdmin) {
                    return of.of({});
                }
                /** @type {?} */
                var product = LicensingConfig.PRODUCT.INSIGHTS;
                /** @type {?} */
                var url = LicensingService.licensedFeaturesUrl(product);
                if (!url || url.length === 0) {
                    return of.of({});
                }
                return this.refreshFeatureMap(product, url);
            };
        /**
         * @param {?} product
         * @param {?} featureArr
         * @return {?}
         */
        LicensingService.prototype.isUserLicensed = /**
         * @param {?} product
         * @param {?} featureArr
         * @return {?}
         */
            function (product, featureArr) {
                /** @type {?} */
                var licensedFeatureIds = this.securityService.currentUser.licensedFeatures;
                if (_.isEmpty(licensedFeatureIds)) {
                    return false;
                }
                return !_.isEmpty(_.intersection(licensedFeatureIds, this.getFeatureIds(product, featureArr)));
            };
        /**
         * @param {?} product
         * @param {?} url
         * @return {?}
         */
        LicensingService.prototype.refreshFeatureMap = /**
         * @param {?} product
         * @param {?} url
         * @return {?}
         */
            function (product, url) {
                var _this = this;
                return this.http.get(url).pipe(operators.map(function (response) {
                    if (response) {
                        _this.tfStorage.store(product, response['feature']);
                    }
                }));
            };
        /**
         * @param {?} product
         * @param {?} featureArr
         * @return {?}
         */
        LicensingService.prototype.getFeatureIds = /**
         * @param {?} product
         * @param {?} featureArr
         * @return {?}
         */
            function (product, featureArr) {
                var e_1, _a;
                /** @type {?} */
                var featureMap = this.tfStorage.retrive(product);
                if (!featureMap || Object.keys(featureMap).length === 0) {
                    return [];
                }
                /** @type {?} */
                var featureIds = [];
                try {
                    for (var featureArr_1 = __values(featureArr), featureArr_1_1 = featureArr_1.next(); !featureArr_1_1.done; featureArr_1_1 = featureArr_1.next()) {
                        var feature = featureArr_1_1.value;
                        /** @type {?} */
                        var featureId = featureMap[feature];
                        if (featureId > 0) {
                            featureIds.push(featureId);
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (featureArr_1_1 && !featureArr_1_1.done && (_a = featureArr_1.return))
                            _a.call(featureArr_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                return featureIds;
            };
        LicensingService.features = LicensingConfig;
        LicensingService.decorators = [
            { type: i0.Injectable }
        ];
        LicensingService.ctorParameters = function () {
            return [
                { type: SecurityService },
                { type: StorageService },
                { type: http.HttpClient }
            ];
        };
        return LicensingService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NavPermissionService = /** @class */ (function () {
        function NavPermissionService(localStorage, companyContextService, security, sanitizer, userService, featureFlagService, licensingService, document) {
            var _this = this;
            this.localStorage = localStorage;
            this.companyContextService = companyContextService;
            this.security = security;
            this.sanitizer = sanitizer;
            this.userService = userService;
            this.featureFlagService = featureFlagService;
            this.licensingService = licensingService;
            this.document = document;
            this.currentHost = this.document.location.origin + (this.document.location.hostname.indexOf('localhost') > -1 ? '/build' : '');
            this.menuUrlCache = {};
            this.searchSubject = new rxjs.Subject();
            this.user = this.localStorage.retrieve('tfcurrent-user');
            this.directAssignmentGuid = this.localStorage.retrieve('direct_assignment_guid');
            this.searchEvent = this.searchSubject.asObservable();
            this.localStorage.observe('tfcurrent-user')
                .subscribe(function (value) {
                _this.user = value;
            });
            this.localStorage.observe(COMPANY_DIRECT_ASSIGNMENT_GUID)
                .subscribe(function (value) {
                _this.directAssignmentGuid = value;
            });
            this.localStorage.observe('tfCompanyConfig')
                .subscribe(function (value) {
                _this.company = value;
            });
        }
        /**
         * @param {?} item
         * @param {?} action
         * @return {?}
         */
        NavPermissionService.prototype.checkPermissions = /**
         * @param {?} item
         * @param {?} action
         * @return {?}
         */
            function (item, action) {
                return this.user && this.user.permissions && this.user.permissions[item] && this.user.permissions[item][action];
            };
        /**
         * @param {?} param
         * @return {?}
         */
        NavPermissionService.prototype.checkParam = /**
         * @param {?} param
         * @return {?}
         */
            function (param) {
                return this.user && this.user[param];
            };
        /**
         * @param {?} param
         * @return {?}
         */
        NavPermissionService.prototype.checkFalseParam = /**
         * @param {?} param
         * @return {?}
         */
            function (param) {
                return this.user && !this.user[param];
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.checkifUserAdmin = /**
         * @return {?}
         */
            function () {
                return this.user.superAdmin || this.user.companyAdmin || this.user.groupAdmin;
            };
        /**
         * @param {?} moduleName
         * @return {?}
         */
        NavPermissionService.prototype.checkIfShowModule = /**
         * @param {?} moduleName
         * @return {?}
         */
            function (moduleName) {
                return this.user && this.user.modules && this.user.modules.indexOf(moduleName) !== -1;
            };
        /**
         * @param {?} action
         * @return {?}
         */
        NavPermissionService.prototype.checkNotificationRulePermissions = /**
         * @param {?} action
         * @return {?}
         */
            function (action) {
                return this.checkPermissions('notificationRules', action) || this.checkPermissions('notification_rules', action);
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.checkPermissionForSettings = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var settingTypes = ['general', 'tracking', 'thirdParty', 'usage', 'emailNotification'];
                /** @type {?} */
                var isAllowed = false;
                settingTypes.forEach(function (type) {
                    if (_this.checkPermissions(type + 'Settings', 'view')) {
                        isAllowed = true;
                    }
                });
                return isAllowed;
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.getCreateLoadAdminParams = /**
         * @return {?}
         */
            function () {
                return "?cxtId=" + this.companyContextService.getCompanyContext() + "&cxtDesc=" + this.companyContextService.getCompanyContextName();
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.isDirectAssignmentGuid = /**
         * @return {?}
         */
            function () {
                return this.company && this.company.enableTrackingInfoDirectAssignment && this.directAssignmentGuid;
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.getDirectAssignmentGuidUrl = /**
         * @return {?}
         */
            function () {
                return '/' + this.directAssignmentGuid + '/' + btoa(this.localStorage.retrieve('tfcompany_name'));
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.getName = /**
         * @return {?}
         */
            function () {
                return this.user && this.user.name;
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.getHeaderLogo = /**
         * @return {?}
         */
            function () {
                return this.isLogoUrlPresent() ? this.user.company.logoUrl : 'https://s3.amazonaws.com/fk-icons/logo_white_text.png';
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.goToSignIn = /**
         * @return {?}
         */
            function () {
                this.document.location.href = this.currentHost + '/#/signin';
            };
        /**
         * @param {?} data
         * @param {?} key
         * @return {?}
         */
        NavPermissionService.prototype.update = /**
         * @param {?} data
         * @param {?} key
         * @return {?}
         */
            function (data, key) {
                this.user = data[key];
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.isAuthenticated = /**
         * @return {?}
         */
            function () {
                return this.security.isAuthenticated();
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.isLightTheme = /**
         * @return {?}
         */
            function () {
                return this.user && this.user.company && this.user.company.theme && this.user.company.theme === 'theme-light';
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.isLoggedIn = /**
         * @return {?}
         */
            function () {
                return (this.user && this.user.userId) ? true : false;
            };
        /**
         * @param {?} url
         * @return {?}
         */
        NavPermissionService.prototype.isRouteActive = /**
         * @param {?} url
         * @return {?}
         */
            function (url) {
                return this.document.location.href.indexOf(url) > 0;
            };
        /**
         * @param {?} menu
         * @param {?} origin
         * @return {?}
         */
        NavPermissionService.prototype.isValidMenuUrl = /**
         * @param {?} menu
         * @param {?} origin
         * @return {?}
         */
            function (menu, origin) {
                /** @type {?} */
                var menuUrl = (origin && menu[origin] && menu[origin].url) ? menu[origin].url : menu.url;
                if (menuUrl && menuUrl.length > 1) {
                    return menuUrl;
                }
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.isLogoUrlPresent = /**
         * @return {?}
         */
            function () {
                return (this.user && this.user.company && this.user.company.whiteLabelingEnabled && this.user.company.logoUrl);
            };
        /**
         * @param {?} menu
         * @param {?=} origin
         * @return {?}
         */
        NavPermissionService.prototype.fetchAllMenuRoutes = /**
         * @param {?} menu
         * @param {?=} origin
         * @return {?}
         */
            function (menu, origin) {
                var _this = this;
                if (origin === void 0) {
                    origin = null;
                }
                /** @type {?} */
                var routes = [];
                /** @type {?} */
                var menuUrl = this.isValidMenuUrl(menu, origin);
                if (menuUrl) {
                    routes.push(menuUrl);
                }
                if (menu.subs) {
                    menu.subs.forEach(function (subMenu) {
                        /** @type {?} */
                        var subMenuUrl = _this.isValidMenuUrl(subMenu, origin);
                        if (subMenuUrl) {
                            routes.push(subMenuUrl);
                        }
                    });
                }
                this.menuUrlCache[menu.id] = routes;
                return routes;
            };
        /**
         * @param {?} menu
         * @param {?=} origin
         * @return {?}
         */
        NavPermissionService.prototype.isMenuActive = /**
         * @param {?} menu
         * @param {?=} origin
         * @return {?}
         */
            function (menu, origin) {
                if (origin === void 0) {
                    origin = null;
                }
                var e_1, _a;
                /** @type {?} */
                var validRoutes = this.menuUrlCache[menu.id] ? this.menuUrlCache[menu.id] : this.fetchAllMenuRoutes(menu, origin);
                try {
                    for (var validRoutes_1 = __values(validRoutes), validRoutes_1_1 = validRoutes_1.next(); !validRoutes_1_1.done; validRoutes_1_1 = validRoutes_1.next()) {
                        var route = validRoutes_1_1.value;
                        if (this.isRouteActive(route)) {
                            return true;
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (validRoutes_1_1 && !validRoutes_1_1.done && (_a = validRoutes_1.return))
                            _a.call(validRoutes_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                return false;
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.isCompanyActive = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var company = this.companyContextService.currentCompany;
                return company && company.active;
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.isSignup = /**
         * @return {?}
         */
            function () {
                return this.document.location.href.indexOf('#/signup') > 0;
            };
        /**
         * @param {?} url
         * @return {?}
         */
        NavPermissionService.prototype.hasUrl = /**
         * @param {?} url
         * @return {?}
         */
            function (url) {
                return this.document.location.href.indexOf(url) > 0;
            };
        Object.defineProperty(NavPermissionService.prototype, "isTrackingLoads", {
            get: /**
             * @return {?}
             */ function () {
                return this.hasUrl('tracking/#/loads');
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} loadIds
         * @return {?}
         */
        NavPermissionService.prototype.onLoadsSearch = /**
         * @param {?} loadIds
         * @return {?}
         */
            function (loadIds) {
                if (loadIds) {
                    loadIds = loadIds.trim().replace(/,/g, ' ');
                    this.searchSubject.next({ ids: loadIds });
                }
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.openZendeskSupport = /**
         * @return {?}
         */
            function () {
                this.userService.getUserJwtToken()
                    .subscribe(function (data) {
                    window.open(data['redirectUri'], '_blank');
                });
            };
        /**
         * @param {?} feature
         * @return {?}
         */
        NavPermissionService.prototype.isFeatureDisabled = /**
         * @param {?} feature
         * @return {?}
         */
            function (feature) {
                return !this.isFeatureEnabled(feature);
            };
        /**
         * @param {?} featureArr
         * @param {?=} oldCheck
         * @return {?}
         */
        NavPermissionService.prototype.isLicensed = /**
         * @param {?} featureArr
         * @param {?=} oldCheck
         * @return {?}
         */
            function (featureArr, oldCheck) {
                if (oldCheck === void 0) {
                    oldCheck = null;
                }
                if (this.featureFlagService.isFeatureEnabled(LicensingConfig.INSIGHTS_LICENSE_FLAG, true)) {
                    return this.licensingService.isInsightsLicensed(featureArr);
                }
                if (!oldCheck) {
                    return false;
                }
                return this.checkParam(oldCheck);
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showMABDModule = /**
         * @return {?}
         */
            function () {
                if (this.isSuperAdmin()) {
                    return this.showAnalyticsModule();
                }
                if (this.featureFlagService.isFeatureEnabled(LicensingConfig.INSIGHTS_LICENSE_FLAG, true)) {
                    /** @type {?} */
                    var featureArr = [LicensingConfig.INSIGHTS.RECO_ARRIVAL_RECOMMENDATION, LicensingConfig.INSIGHTS.RECO_DEPARTURE_RECOMMENDATION,
                        LicensingConfig.INSIGHTS.TRANSIT_RISK_RECOMMENDATION, LicensingConfig.INSIGHTS.RESCHEDULES_RECOMMENDATION];
                    return this.licensingService.isInsightsLicensed(featureArr);
                }
                return this.isFeatureEnabled('reco-engine');
            };
        /**
         * @param {?} feature
         * @return {?}
         */
        NavPermissionService.prototype.isFeatureEnabled = /**
         * @param {?} feature
         * @return {?}
         */
            function (feature) {
                return this.featureFlagService.isFeatureEnabled(feature, true);
            };
        /**
         * @param {?} feature
         * @return {?}
         */
        NavPermissionService.prototype.isFeatureEnabledInApp = /**
         * @param {?} feature
         * @return {?}
         */
            function (feature) {
                return this.featureFlagService.isFeatureEnabled(feature);
            };
        /**
         * @param {?} feature
         * @return {?}
         */
        NavPermissionService.prototype.isFeatureDisabledInApp = /**
         * @param {?} feature
         * @return {?}
         */
            function (feature) {
                return !this.isFeatureEnabledInApp(feature);
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.isSuperAdmin = /**
         * @return {?}
         */
            function () {
                return this.user && this.user.superAdmin;
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.isSuperAdminNoContext = /**
         * @return {?}
         */
            function () {
                return this.user.superAdmin && !this.companyContextService.getCompanyContext();
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.isSuperAdminWithCompanyContext = /**
         * @return {?}
         */
            function () {
                return this.user.superAdmin && this.companyContextService.getCompanyContext();
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showAddressManager = /**
         * @return {?}
         */
            function () {
                return this.isSuperAdminWithCompanyContext() || (!this.user.superAdmin && this.checkPermissions('addresses', 'view'));
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showAddressManagerBeta = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var ENV;
                /** @type {?} */
                var ENVIRONMENTS = ['dev', 'staging'];
                /** @type {?} */
                var host = window.location.hostname;
                if (host === 'localhost') {
                    ENV = 'dev';
                }
                else {
                    ENV = host.split('.')[0].split('-')[1];
                    ENV = ENV || 'prod';
                }
                return this.checkParam('superAdmin') && ENVIRONMENTS.indexOf(ENV) > -1;
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showCompany = /**
         * @return {?}
         */
            function () {
                return this.isSuperAdminNoContext() || (this.user.companyType && this.user.companyType.indexOf('3pl') !== -1);
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showAdvancedNotifications = /**
         * @return {?}
         */
            function () {
                return this.isSuperAdminWithCompanyContext() || (this.user.role === 'admin') || (this.user.role === 'manager');
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showNotificationRules = /**
         * @return {?}
         */
            function () {
                return this.isSuperAdminWithCompanyContext() || (!this.user.superAdmin && (this.checkNotificationRulePermissions('view') || this.checkPermissions('individualNotificationRules', 'view')));
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showAdminModule = /**
         * @return {?}
         */
            function () {
                return this.user.superAdmin || this.checkIfShowModule('admin');
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showPxModule = /**
         * @return {?}
         */
            function () {
                return this.checkIfShowModule('marketplace') || this.checkIfShowModule('pcm-network-evaluation');
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showFacilityManagerModule = /**
         * @return {?}
         */
            function () {
                return this.checkIfShowModule('facility-manager');
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showAppoinmentManagerModule = /**
         * @return {?}
         */
            function () {
                return this.checkIfShowModule('appointment-manager');
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showNetworkVisibilityModule = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var isAdmin = (this.user.role === 'admin');
                /** @type {?} */
                var validUser = this.user.superAdmin || isAdmin;
                /** @type {?} */
                var discoveryConsent = this.user.allowToDiscoverOnNetworkvisibility;
                /** @type {?} */
                var featureFlag = this.user.isNetworkVisibilityUIEnabled;
                return (validUser && discoveryConsent && featureFlag);
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showReportsModule = /**
         * @return {?}
         */
            function () {
                return (this.checkIfShowModule('tracking-reports') && this.checkPermissions('trackingReports', 'execute')) && (this.checkFalseParam('superAdmin') || this.companyContextService.getCompanyContext()) && this.checkFalseParam('hideReports');
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showAnalyticsModule = /**
         * @return {?}
         */
            function () {
                return this.user && this.user.showAnalyticsModule;
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showToolsModule = /**
         * @return {?}
         */
            function () {
                return this.user && (this.user.superAdmin || this.checkPermissions('addresses', 'view') || this.checkPermissions('notificationRules', 'view') || this.checkPermissions('individualNotificationRules', 'view') || this.user.showTemperatureTrackingModule);
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showSettings = /**
         * @return {?}
         */
            function () {
                return this.checkPermissionForSettings() && (!this.user.superAdmin || this.companyContextService.getCompanyContext());
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showInsightsTab = /**
         * @return {?}
         */
            function () {
                if (this.featureFlagService.isFeatureEnabled(LicensingConfig.INSIGHTS_LICENSE_FLAG, true)) {
                    if (this.user.superAdmin) {
                        return this.showAnalyticsModule();
                    }
                    return this.licensingService.isInsightsLicensed(_.map(LicensingConfig.INSIGHTS, function (value) { return value; }));
                }
                else {
                    return this.showAnalyticsModule() || (!this.user.superAdmin && this.isFeatureEnabled('reco-engine'));
                }
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.showInsightsAPIModule = /**
         * @return {?}
         */
            function () {
                if (this.featureFlagService.isFeatureEnabled(LicensingConfig.INSIGHTS_LICENSE_FLAG, true)) {
                    /** @type {?} */
                    var featureArr = [LicensingConfig.INSIGHTS.ANALYTICS_API];
                    return this.licensingService.isInsightsLicensed(featureArr);
                }
                return this.checkParam('showPerformanceAnalytics');
            };
        /**
         * @param {?} conditions
         * @return {?}
         */
        NavPermissionService.prototype.validateConditions = /**
         * @param {?} conditions
         * @return {?}
         */
            function (conditions) {
                var e_2, _a;
                try {
                    for (var conditions_1 = __values(conditions), conditions_1_1 = conditions_1.next(); !conditions_1_1.done; conditions_1_1 = conditions_1.next()) {
                        var condition = conditions_1_1.value;
                        if (Array.isArray(condition) ? !(this[condition[0]].apply(this, condition.slice(1))) : (condition && !this[condition]())) {
                            return false;
                        }
                    }
                }
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (conditions_1_1 && !conditions_1_1.done && (_a = conditions_1.return))
                            _a.call(conditions_1);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
                }
                return true;
            };
        /**
         * @param {?} menu
         * @param {?=} origin
         * @return {?}
         */
        NavPermissionService.prototype.getMenuUrl = /**
         * @param {?} menu
         * @param {?=} origin
         * @return {?}
         */
            function (menu, origin) {
                if (origin === void 0) {
                    origin = null;
                }
                /** @type {?} */
                var urlParams = '';
                if (menu.urlParams && this[menu.urlParams]) {
                    urlParams = this[menu.urlParams]();
                }
                if (origin && menu[origin] && menu[origin].url) {
                    return this.currentHost + '/' + menu[origin].url + urlParams;
                }
                if (menu.url) {
                    return this.currentHost + '/' + menu.url + urlParams;
                }
                return this.sanitizer.bypassSecurityTrustUrl('javascript:;');
            };
        /**
         * @param {?} value
         * @param {?} key
         * @return {?}
         */
        NavPermissionService.prototype.updateUser = /**
         * @param {?} value
         * @param {?} key
         * @return {?}
         */
            function (value, key) {
                if (key === 'user') {
                    this[key] = value;
                }
                else {
                    this.directAssignmentGuid = value;
                }
            };
        /**
         * @return {?}
         */
        NavPermissionService.prototype.logOut = /**
         * @return {?}
         */
            function () {
                var _this = this;
                return this.security.logout().then(function (response) {
                    _this.goToSignIn();
                });
            };
        NavPermissionService.decorators = [
            { type: i0.Injectable }
        ];
        NavPermissionService.ctorParameters = function () {
            return [
                { type: ngxWebstorage.LocalStorageService },
                { type: CompanyContextService },
                { type: SecurityService },
                { type: platformBrowser.DomSanitizer },
                { type: UserResourceService },
                { type: FeatureFlagService },
                { type: LicensingService },
                { type: undefined, decorators: [{ type: i0.Inject, args: [platformBrowser.DOCUMENT,] }] }
            ];
        };
        return NavPermissionService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var RequiredFieldPipe = /** @class */ (function () {
        function RequiredFieldPipe() {
        }
        /**
         * @param {?} value
         * @param {?=} formControl
         * @return {?}
         */
        RequiredFieldPipe.prototype.transform = /**
         * @param {?} value
         * @param {?=} formControl
         * @return {?}
         */
            function (value, formControl) {
                if (value) {
                    return this.hasRequiredField(formControl) ? value + " *" : value;
                }
                return value;
            };
        /**
         * @param {?} abstractControl
         * @return {?}
         */
        RequiredFieldPipe.prototype.hasRequiredField = /**
         * @param {?} abstractControl
         * @return {?}
         */
            function (abstractControl) {
                if (abstractControl.validator) {
                    /** @type {?} */
                    var validator = abstractControl.validator(( /** @type {?} */({})));
                    if (validator && validator.required) {
                        return true;
                    }
                }
                if (abstractControl['controls']) {
                    for (var controlName in abstractControl['controls']) {
                        if (abstractControl['controls'][controlName]) {
                            if (this.hasRequiredField(abstractControl['controls'][controlName])) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            };
        RequiredFieldPipe.decorators = [
            { type: i0.Pipe, args: [{
                        name: 'requiredField'
                    },] }
        ];
        return RequiredFieldPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var FKSelectComponent = /** @class */ (function () {
        function FKSelectComponent() {
            this.searchable = false;
            this.clearable = true;
            this.selectedChange = new i0.EventEmitter();
            this.change = new i0.EventEmitter();
            this.onDropdownClose = new i0.EventEmitter();
            this.onSearch = new i0.EventEmitter();
        }
        /**
         * @return {?}
         */
        FKSelectComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        /**
         * @param {?} event
         * @return {?}
         */
        FKSelectComponent.prototype.onChange = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.change.emit(event);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        FKSelectComponent.prototype.valueChange = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.selectedChange.emit(this.selected);
            };
        /**
         * @return {?}
         */
        FKSelectComponent.prototype.onClose = /**
         * @return {?}
         */
            function () {
                this.onDropdownClose.emit();
            };
        /**
         * @param {?} event
         * @return {?}
         */
        FKSelectComponent.prototype.search = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                var _this = this;
                if (this.interval) {
                    clearTimeout(this.interval);
                }
                /** Will emit only after few ms of stoping the typing.*/
                this.interval = setTimeout(function () {
                    _this.onSearch.emit(event);
                }, 500);
            };
        /**
         * @return {?}
         */
        FKSelectComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                if (this.interval) {
                    clearTimeout(this.interval);
                }
            };
        FKSelectComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'fk-select',
                        template: "<ng-select #fkNgSelect [ngClass]=\"{'no-icon': !data.showIcon}\" \n           [items]=\"data.items\"\n           [placeholder]=\"data.placeholder\"\n           [searchable] = \"searchable\"\n           (search) = \"search( $event )\"\n           [bindValue]=\"data.bindValue\" \n           [bindLabel]=\"data.bindLabel\" \n           (change)=\"onChange($event)\"\n           [clearable]=\"clearable\"\n           [(ngModel)]=\"selected\"\n           (ngModelChange)=\"valueChange($event)\"\n           (close)=\"onClose()\">\n\n  <!-- SELECTED LABLE TEMPLATE -->\n  <ng-template ng-label-tmp let-item=\"item\"> {{item[data.bindLabel]}}</ng-template>\n\n  <!-- OPTIONS TEMPLATE -->\n  <ng-template ng-option-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\n    <span class=\"item-label\">{{item[data.bindLabel]}}</span>\n  </ng-template>\n  <ng-content></ng-content>\n\n</ng-select>\n",
                        styles: [".ptr{cursor:pointer}.height100{height:100%}.margin-left-15{margin:0 0 0 -15px}.margin-top-10{margin:10px 0 0}.padding-top-10{padding:10px 0 0}.padding-left-30{padding:0 0 0 30px}.padding-left-15{padding:0 0 0 15px}:host .ng-select{font-size:13px;font-family:Poppins,sans-serif;color:#76777a}:host .ng-select .ng-select-container .ng-value-container{line-height:2}:host .ng-select label{font-weight:500;font-family:Montserrat,sans-serif;font-size:13px;padding-left:2px;color:#76777a}:host .ng-select ng-select.filter-input{font-size:13px;font-family:Poppins,sans-serif;display:inline-block;color:#dededf}:host .multiple-select-rep{border-radius:10px;width:18px;height:15px;float:left;background-color:#09c;color:#fff;padding:5px 4px 12px;font-size:9px;text-align:center;margin:-5px 10px 0 0}"]
                    }] }
        ];
        FKSelectComponent.ctorParameters = function () { return []; };
        FKSelectComponent.propDecorators = {
            fkNgSelect: [{ type: i0.ViewChild, args: ["fkNgSelect",] }],
            data: [{ type: i0.Input }],
            searchable: [{ type: i0.Input }],
            clearable: [{ type: i0.Input }],
            selected: [{ type: i0.Input }],
            selectedChange: [{ type: i0.Output }],
            change: [{ type: i0.Output }],
            onDropdownClose: [{ type: i0.Output }],
            onSearch: [{ type: i0.Output }]
        };
        return FKSelectComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var FKSelectMultipleComponent = /** @class */ (function (_super) {
        __extends(FKSelectMultipleComponent, _super);
        function FKSelectMultipleComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.selectedValues = [];
            _this.searchable = false;
            _this.showLabel = false;
            _this.showMore = false;
            _this.limit = 0;
            _this.selectedValuesChange = new i0.EventEmitter();
            _this.addItem = new i0.EventEmitter();
            _this.removeItem = new i0.EventEmitter();
            _this.onSearch = new i0.EventEmitter();
            _this.onConditionChange = new i0.EventEmitter();
            _this.onPreferenceChange = new i0.EventEmitter();
            _this.maxLimit = 0;
            _this.querySelected = "any";
            return _this;
        }
        /**
         * @return {?}
         */
        FKSelectMultipleComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.searchable = this.data.searchable ? this.data.searchable : this.searchable;
                this.computeLimit();
            };
        /**
         * @return {?}
         */
        FKSelectMultipleComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
            function () {
                this.selectedItems = (this.data.useValue) ? this.selectedItems : this.selectedValues;
            };
        /**
         * @param {?} item
         * @return {?}
         */
        FKSelectMultipleComponent.prototype.isSelected = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return (this.selectedValues.length && this.selectedValues.indexOf(item[this.data.bindValue]) != -1);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        FKSelectMultipleComponent.prototype.add = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.addItem.emit(event);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        FKSelectMultipleComponent.prototype.remove = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.removeItem.emit(event);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        FKSelectMultipleComponent.prototype.valueChange = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (this.selectedValues) {
                    this.selectedValuesChange.emit(this.selectedValues);
                    this.computeLimit();
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        FKSelectMultipleComponent.prototype.queryChange = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.onConditionChange.emit(event);
            };
        /**
         * @param {?} event
         * @param {?=} isCustom
         * @return {?}
         */
        FKSelectMultipleComponent.prototype.search = /**
         * @param {?} event
         * @param {?=} isCustom
         * @return {?}
         */
            function (event, isCustom) {
                var _this = this;
                if (isCustom === void 0) {
                    isCustom = false;
                }
                if (this.interval) {
                    clearTimeout(this.interval);
                }
                /** Will emit only after few ms of stoping the typing.*/
                this.interval = setTimeout(function () {
                    _this.onSearch.emit({ event: event, "value": _this.searchText, isCustom: isCustom });
                }, 500);
            };
        /**
         * @param {?} option
         * @return {?}
         */
        FKSelectMultipleComponent.prototype.onPreferenceSelect = /**
         * @param {?} option
         * @return {?}
         */
            function (option) {
                this.data.preferences.forEach(function (item) { return item.selected = false; });
                option.selected = true;
                this.isCustomPreference = (option.type === "custom") ? true : false;
                this.searchText = '';
                this.onPreferenceChange.emit(option);
            };
        /**
         * @param {?} item
         * @return {?}
         */
        FKSelectMultipleComponent.prototype.removeSelected = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                /** @type {?} */
                var bindLabel = (this.data.useValue ? this.data.bindLabel : this.data.bindValue) || 'id';
                /** @type {?} */
                var option = this.ngMultiSelect.selectedItems.find(function (x) { return x.value[bindLabel] == item; });
                if (option && option.selected) {
                    this.ngMultiSelect.unselect(option);
                }
            };
        /**
         * @return {?}
         */
        FKSelectMultipleComponent.prototype.onClose = /**
         * @return {?}
         */
            function () {
                this.searchText = '';
                _super.prototype.onClose.call(this);
            };
        /**
         * @return {?}
         */
        FKSelectMultipleComponent.prototype.computeLimit = /**
         * @return {?}
         */
            function () {
                if (this.limit) {
                    /** @type {?} */
                    var selectComponent = this.ngMultiSelect;
                    /** @type {?} */
                    var containerWidth = (( /** @type {?} */(selectComponent.element.querySelector(".ng-value-container")))).offsetWidth;
                    /** @type {?} */
                    var labelElement = document.createElement("span");
                    /** @type {?} */
                    var contentLimit = 0;
                    /** @type {?} */
                    var accumulatedWidth = 0;
                    /** @type {?} */
                    var $body = document.getElementsByTagName("body")[0];
                    Object.assign(labelElement.style, { "font-size": "12px", "position": "absolute", "padding": "0 5px", "top": "-300px", "left": "-300px", "font-weight": 500, "font-family": "Poppins,sans-serif" });
                    $body.appendChild(labelElement);
                    /** @type {?} */
                    var selectedItems = selectComponent.itemsList.selectedItems;
                    /** @type {?} */
                    var limit = (this.limit <= selectedItems.length) ? this.limit : selectedItems.length;
                    for (var i = 0; i < limit; i++) {
                        /** @type {?} */
                        var item = selectedItems[i];
                        labelElement.textContent = item[this.data.bindLabel];
                        if ((accumulatedWidth + (labelElement.offsetWidth + 17)) < (containerWidth - 75)) {
                            accumulatedWidth += (labelElement.offsetWidth + 17);
                            contentLimit++;
                        }
                    }
                    $body.removeChild(labelElement);
                    this.maxLimit = (!contentLimit ? 1 : contentLimit);
                    return this.maxLimit;
                }
                else {
                    return this.selectedValues.length;
                }
            };
        FKSelectMultipleComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'fk-select-multiple',
                        template: "<ng-select #ngMultiSelect [items]=\"data.items\"\n           [multiple]=\"true\"\n           (add)=\"add($event)\"\n           (remove)=\"remove($event)\"\n           (change)=\"onChange($event)\"\n           [placeholder]=\"data.placeholder\"\n           [closeOnSelect]=\"false\"\n           [searchable]=\"searchable\"\n           [bindValue]=\"data.bindValue\"\n           [bindLabel]=\"data.bindLabel\"\n           [clearable]=\"false\"\n           (close)=\"onClose()\"\n           [(ngModel)]=\"selectedValues\"\n           (ngModelChange)=\"valueChange($event)\">\n\n  <ng-template ng-multi-label-tmp *ngIf=\"showLabel && !showMore\" let-items=\"items\" let-clear=\"clear\">\n    <div class=\"ng-value\" *ngFor=\"let item of items\">\n      <div class=\"value-cell\">\n        <span class=\"ng-value-label\"> {{item[data.bindLabel]}} </span>\n        <span class=\"ng-value-icon right\" (click)=\"clear(item)\" aria-hidden=\"true\">\u00D7</span>\n      </div>\n    </div>\n  </ng-template>\n\n  <ng-template ng-multi-label-tmp *ngIf=\"showLabel && showMore && limit\" let-items=\"items\" let-clear=\"clear\">\n    <div class=\"ng-value\" *ngFor=\"let item of (items ? items.slice(0, maxLimit): [])\">\n      <div class=\"value-cell\">\n        <span class=\"ng-value-label\"> {{item[data.bindLabel]}} </span>\n        <span class=\"ng-value-icon right\" (click)=\"clear(item)\" aria-hidden=\"true\">\u00D7</span>\n      </div>\n    </div>\n    <span class=\"ng-value-label few-more\" *ngIf=\"items.length > maxLimit\" >+ {{items.length - maxLimit}} more</span>\n  </ng-template>\n\n  <ng-template ng-multi-label-tmp *ngIf=\"!showLabel\" let-items=\"items\">\n    <div class=\"selected-text\">\n      <div class=\"multiple-select-rep\" *ngIf=\"selectedValues\">{{selectedValues.length}}</div>\n      <span> {{data.placeholder}}</span>\n    </div>\n  </ng-template>\n\n  <ng-template *ngIf=\"!searchable\" ng-option-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\n    <div>\n      <input id=\"item-{{index}}\" type=\"checkbox\" [ngModel]=\"isSelected(item)\">\n      <span class=\"checkmark\"></span>\n    </div>\n    <span class=\"item-label\">{{item[data.bindLabel]}}</span>\n  </ng-template>\n\n  <ng-template *ngIf=\"searchable\" ng-header-tmp>\n\n    <form *ngIf=\"data.hasPreference\" class=\"preference-form\">\n      <div class=\"preference-header\"> {{data.labels?.search_by | translate}} </div>\n      <div class=\"preference-option\" *ngFor=\"let option of data.preferences; let i = index\">\n        <label class=\"radio-container\">\n          <input id=\"option-{{i}}\" type=\"radio\" name=\"preference\" [ngClass]=\"{'selected': option.selected}\" [checked]=\"option.selected\" (change)=\"onPreferenceSelect(option)\" value=\"{{option.value}}\">\n          <span class=\"checkmark\"></span>\n          <span class=\"option-label\">{{option.label}}</span>\n        </label>\n      </div>\n    </form>\n    \n    <input *ngIf=\"!isCustomPreference\" autocomplete=\"off\"\n          type=\"text\"\n          class=\"filterInput header-search-field\"\n          [placeholder]=\"'Search'\"\n          (keydown)=\"search($event)\"\n          [(ngModel)]=\"searchText\"/>\n\n    <input *ngIf=\"isCustomPreference\" autocomplete=\"off\"\n          type=\"text\"\n          class=\"filterInput header-search-field\"\n          [placeholder]=\"'Search'\"\n          (keydown)=\"search($event, true)\"\n          [(ngModel)]=\"searchText\"/>\n\n    <fk-select *ngIf=\"data.queryOptions\"  [data]=\"data.queryOptions\"\n              (change)=\"queryChange($event)\"\n              [clearable]=\"false\"\n              [selected]=\"data.queryOptions.selected\"></fk-select>\n\n    <ng-template ng-option-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\n      <div>\n        <input id=\"item-{{index}}\" type=\"checkbox\" [ngModel]=\"isSelected(item)\">\n        <span class=\"checkmark\"></span>\n      </div>\n      <span class=\"item-label\">{{item[data.bindLabel]}}</span>\n    </ng-template>\n\n    <ng-template ng-notfound-tmp>\n      <div class=\"ng-option disabled\">{{data.labels.no_result_found | translate}}</div>\n    </ng-template>\n    <ng-template *ngIf=\"searchable && selectedItems.length\" ng-footer-tmp>\n      <div *ngFor=\"let item of selectedItems\" class=\"selected-option\">\n        <span class=\"cancel\" (click)=\"removeSelected(item)\">\n          <i class=\"fa fa-times\"></i>\n        </span>\n        <span class=\"selected-label\">{{item}}</span>\n      </div>\n    </ng-template>\n  </ng-template>\n  <ng-content></ng-content>\n</ng-select>",
                        styles: [".ptr{cursor:pointer}.height100{height:100%}.margin-left-15{margin:0 0 0 -15px}.margin-top-10{margin:10px 0 0}.padding-top-10{padding:10px 0 0}.padding-left-30{padding:0 0 0 30px}.padding-left-15{padding:0 0 0 15px}:host .ng-select{font-size:13px;font-family:Poppins,sans-serif;color:#76777a}:host .ng-select .ng-select-container .ng-value-container{line-height:2}:host .ng-select label{font-weight:500;font-family:Montserrat,sans-serif;font-size:13px;padding-left:2px;color:#76777a}:host .ng-select ng-select.filter-input{font-size:13px;font-family:Poppins,sans-serif;display:inline-block;color:#dededf}:host .multiple-select-rep{border-radius:10px;width:18px;height:15px;float:left;background-color:#09c;color:#fff;padding:5px 4px 12px;font-size:9px;text-align:center;margin:-5px 10px 0 0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{line-height:7px;padding-top:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{position:inherit!important}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{display:table;vertical-align:middle;background-color:#fffadc;border-radius:10px;border:1px solid #f0e38f;height:20px;margin-bottom:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .value-cell{display:table-cell;vertical-align:middle}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .value-cell .ng-value-label{color:#5c5c5c;font-weight:500;font-size:12px}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .value-cell .ng-value-icon.right{border-left:1px solid #f0e38f}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .value-cell .ng-value-icon.right:hover{background-color:transparent}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .few-more{font-size:14px;color:#4a90e2;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;margin-left:7px}:host ::ng-deep .selected-text{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host ::ng-deep .header-search-field{width:145px;height:30px;border-radius:2px;border:1px solid #dededf;padding:10px;font-size:12px}:host ::ng-deep .header-search-field+fk-select{width:61px;height:30px;margin-left:10px}:host ::ng-deep .header-search-field+fk-select .ng-select>.ng-dropdown-panel .ng-dropdown-panel-items .ng-option{padding:6px 6px 6px 10px}:host ::ng-deep .header-search-field+fk-select .ng-select>.ng-select-container>.ng-value-container{padding:0;height:20px;line-height:16px}:host ::ng-deep .header-search-field+fk-select .ng-select>.ng-select-container>.ng-value-container .ng-value{margin:0 0 0 10px;width:30px;border:0;border-radius:0;background:0 0}:host ::ng-deep .ng-dropdown-header{padding-left:10px;border:0}:host ::ng-deep .preference-form{padding-left:5px;border-bottom:1px solid #dededf;border-style:dashed;margin-bottom:7px}:host ::ng-deep .preference-header{font-size:13px;color:#76777a;font-weight:600;margin-top:10px}:host ::ng-deep .preference-option{height:17px;margin:10px 0}:host ::ng-deep .radio-container{display:block;position:relative;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:12px;font-weight:500;height:17px}:host ::ng-deep .radio-container .option-label{font-size:12px;margin-left:7px}:host ::ng-deep .radio-container input{opacity:0;cursor:pointer;height:0;width:0;margin:0}:host ::ng-deep .radio-container .checkmark{position:relative;height:12px;width:12px;border-radius:50%;background-color:#fff;margin:0}:host ::ng-deep .radio-container:hover input~.checkmark{background-color:#dededf}:host ::ng-deep .radio-container:hover input:checked~.checkmark{background-color:#fff}:host ::ng-deep .radio-container input:checked~.checkmark:after{display:block}:host ::ng-deep .radio-container .checkmark:after{content:\"\";display:none;width:4px;height:4px;margin:3px;border-radius:50%;background:#0ac2ff}"]
                    }] }
        ];
        FKSelectMultipleComponent.propDecorators = {
            ngMultiSelect: [{ type: i0.ViewChild, args: [ngSelect.NgSelectComponent,] }],
            selectedValues: [{ type: i0.Input }],
            searchable: [{ type: i0.Input }],
            showLabel: [{ type: i0.Input }],
            showMore: [{ type: i0.Input }],
            limit: [{ type: i0.Input }],
            selectedItems: [{ type: i0.Input }],
            selectedValuesChange: [{ type: i0.Output }],
            addItem: [{ type: i0.Output }],
            removeItem: [{ type: i0.Output }],
            onSearch: [{ type: i0.Output }],
            onConditionChange: [{ type: i0.Output }],
            onPreferenceChange: [{ type: i0.Output }]
        };
        return FKSelectMultipleComponent;
    }(FKSelectComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var FKSelectGroupComponent = /** @class */ (function (_super) {
        __extends(FKSelectGroupComponent, _super);
        function FKSelectGroupComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.showLabel = true;
            _this.selectedValues = [];
            _this.selectedValuesChange = new i0.EventEmitter();
            return _this;
        }
        /**
         * @param {?} item
         * @return {?}
         */
        FKSelectGroupComponent.prototype.isSelected = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                return (this.selectedValues.length && this.selectedValues.indexOf(item[this.data.bindValue]) != -1);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        FKSelectGroupComponent.prototype.valueChange = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (this.selectedValues) {
                    this.selectedValuesChange.emit(this.selectedValues);
                }
            };
        FKSelectGroupComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'fk-select-group',
                        template: "<ng-select #fkGroupSelect [items]=\"data.items\"\n           [multiple]=\"true\"\n           [bindLabel]=\"data.bindLabel\"\n           [bindValue]=\"data.bindValue\"\n           [groupBy]=\"data.groupBy\"\n           [selectableGroup]=\"data.selectableGroup\"\n           [selectableGroupAsModel]=\"data.selectableGroupAsModel\"\n           [closeOnSelect]=\"false\"\n           [(ngModel)]=\"selectedValues\"\n           [placeholder]=\"data.placeholder\"\n           (add)=\"add($event)\"\n           (remove)=\"remove($event)\"\n           (close)=\"onClose()\"\n           (change)=\"onChange($event)\"\n           [searchable]=\"false\"\n           (ngModelChange)=\"valueChange($event)\">\n\n    <ng-template ng-label-tmp *ngIf=\"showLabel\" let-item=\"item\" let-clear=\"clear\">\n      <span class=\"ng-value-label\"> {{item[data.bindLabel]}} </span>\n      <span class=\"ng-value-icon right\" (click)=\"clear(item)\" aria-hidden=\"true\">\u00D7</span>\n    </ng-template>\n\n    <ng-template ng-multi-label-tmp *ngIf=\"!showLabel\" let-items=\"items\">\n      <div class=\"selected-text\">\n        <div class=\"multiple-select-rep\" *ngIf=\"selectedValues\">{{selectedValues?.length}}</div>\n        <span> {{data.placeholder}}</span>\n      </div>\n    </ng-template>\n\n    <ng-template ng-optgroup-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\n      <input id=\"item-{{index}}\" type=\"checkbox\" *ngIf=\"data.selectableGroup\" [ngModel]=\"item$?.selected\"/> {{item[data.groupBy]}}\n    </ng-template>\n\n    <ng-template ng-option-tmp let-item=\"item\" let-item$=\"item$\" let-index=\"index\">\n      <input id=\"item-{{index}}\" type=\"checkbox\" [ngModel]=\"isSelected(item)\"/> {{item[data.bindLabel]}}\n    </ng-template>\n\n</ng-select>\n",
                        styles: [".ptr{cursor:pointer}.height100{height:100%}.margin-left-15{margin:0 0 0 -15px}.margin-top-10{margin:10px 0 0}.padding-top-10{padding:10px 0 0}.padding-left-30{padding:0 0 0 30px}.padding-left-15{padding:0 0 0 15px}:host .ng-select{font-size:13px;font-family:Poppins,sans-serif;color:#76777a}:host .ng-select .ng-select-container .ng-value-container{line-height:2}:host .ng-select label{font-weight:500;font-family:Montserrat,sans-serif;font-size:13px;padding-left:2px;color:#76777a}:host .ng-select ng-select.filter-input{font-size:13px;font-family:Poppins,sans-serif;display:inline-block;color:#dededf}:host .multiple-select-rep{border-radius:10px;width:18px;height:15px;float:left;background-color:#09c;color:#fff;padding:5px 4px 12px;font-size:9px;text-align:center;margin:-5px 10px 0 0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{line-height:7px;padding-top:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{position:inherit!important}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{display:table;vertical-align:middle;background-color:#fffadc;border-radius:10px;border:1px solid #f0e38f;height:20px;margin-bottom:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .value-cell{display:table-cell;vertical-align:middle}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .value-cell .ng-value-label{color:#5c5c5c;font-weight:500;font-size:12px}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .value-cell .ng-value-icon.right{border-left:1px solid #f0e38f}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .value-cell .ng-value-icon.right:hover{background-color:transparent}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .few-more{font-size:14px;color:#4a90e2;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;margin-left:7px}:host ::ng-deep .selected-text{width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host ::ng-deep .header-search-field{width:145px;height:30px;border-radius:2px;border:1px solid #dededf;padding:10px;font-size:12px}:host ::ng-deep .header-search-field+fk-select{width:61px;height:30px;margin-left:10px}:host ::ng-deep .header-search-field+fk-select .ng-select>.ng-dropdown-panel .ng-dropdown-panel-items .ng-option{padding:6px 6px 6px 10px}:host ::ng-deep .header-search-field+fk-select .ng-select>.ng-select-container>.ng-value-container{padding:0;height:20px;line-height:16px}:host ::ng-deep .header-search-field+fk-select .ng-select>.ng-select-container>.ng-value-container .ng-value{margin:0 0 0 10px;width:30px;border:0;border-radius:0;background:0 0}:host ::ng-deep .ng-dropdown-header{padding-left:10px;border:0}:host ::ng-deep .preference-form{padding-left:5px;border-bottom:1px solid #dededf;border-style:dashed;margin-bottom:7px}:host ::ng-deep .preference-header{font-size:13px;color:#76777a;font-weight:600;margin-top:10px}:host ::ng-deep .preference-option{height:17px;margin:10px 0}:host ::ng-deep .radio-container{display:block;position:relative;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:12px;font-weight:500;height:17px}:host ::ng-deep .radio-container .option-label{font-size:12px;margin-left:7px}:host ::ng-deep .radio-container input{opacity:0;cursor:pointer;height:0;width:0;margin:0}:host ::ng-deep .radio-container .checkmark{position:relative;height:12px;width:12px;border-radius:50%;background-color:#fff;margin:0}:host ::ng-deep .radio-container:hover input~.checkmark{background-color:#dededf}:host ::ng-deep .radio-container:hover input:checked~.checkmark{background-color:#fff}:host ::ng-deep .radio-container input:checked~.checkmark:after{display:block}:host ::ng-deep .radio-container .checkmark:after{content:\"\";display:none;width:4px;height:4px;margin:3px;border-radius:50%;background:#0ac2ff}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-panel-items .ng-option{text-transform:capitalize;line-height:unset}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-panel-items .ng-option input{opacity:1;display:inherit;margin-right:6px;margin-top:0}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup{text-transform:capitalize}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup input{margin-top:0;margin-right:3px}:host ::ng-deep ng-select .ng-select-container .ng-value-container .ng-value{height:20px;margin-bottom:0!important;line-height:12px}:host ::ng-deep ng-select .ng-select-container .ng-value-container .ng-value .ng-value-icon{height:100%;padding:4px 5px!important;float:left}:host ::ng-deep ng-select .ng-select-container .ng-value-container .ng-value .ng-value-label{height:100%;float:left;line-height:19px}:host ::ng-deep ng-select .ng-select-container .ng-clear-wrapper{display:none}"]
                    }] }
        ];
        FKSelectGroupComponent.propDecorators = {
            fkGroupSelect: [{ type: i0.ViewChild, args: ["fkGroupSelect",] }],
            showLabel: [{ type: i0.Input }],
            selectedValues: [{ type: i0.Input }],
            selectedValuesChange: [{ type: i0.Output }]
        };
        return FKSelectGroupComponent;
    }(FKSelectMultipleComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var FKSideNavPanelComponent = /** @class */ (function () {
        function FKSideNavPanelComponent(router$$1) {
            this.router = router$$1;
            this.expanded = false;
            this.expandOnIconClick = false;
            this.url = null;
            this.subUrl = null;
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        FKSideNavPanelComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                if (changes.options) {
                    var _a = changes.options, currentValue = _a.currentValue, previousValue = _a.previousValue;
                    if (!_.isEqual(currentValue, previousValue)) {
                        this.subscribeRouterEvents();
                    }
                }
            };
        /**
         * @return {?}
         */
        FKSideNavPanelComponent.prototype.subscribeRouterEvents = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.router.events.subscribe(function (event) {
                    if (event instanceof router.NavigationEnd) {
                        _this.highlightMenu(event.urlAfterRedirects);
                    }
                });
            };
        /**
         * @param {?} url
         * @return {?}
         */
        FKSideNavPanelComponent.prototype.highlightMenu = /**
         * @param {?} url
         * @return {?}
         */
            function (url) {
                var _this = this;
                url = url.split('?')[0];
                this.options.links.forEach(function (option) {
                    if (_.isEmpty(option.submenu) && option.navigationUrl === url) {
                        _this.url = option.navigationUrl;
                    }
                    else if (!_.isEmpty(option.submenu)) {
                        option.submenu.forEach(function (submenu) {
                            if (submenu.navigationUrl === url) {
                                _this.url = submenu.parentNavigationUrl;
                                _this.subUrl = submenu.navigationUrl;
                            }
                        });
                    }
                });
            };
        /**
         * @param {?} option
         * @return {?}
         */
        FKSideNavPanelComponent.prototype.changeMenu = /**
         * @param {?} option
         * @return {?}
         */
            function (option) {
                this.subUrl = option.submenu ? option.submenu[0].navigationUrl : option.navigationUrl;
                this.url = option.navigationUrl;
                if (this.expandOnIconClick) {
                    this.expanded = true;
                }
            };
        /**
         * @param {?} option
         * @param {?} event
         * @return {?}
         */
        FKSideNavPanelComponent.prototype.changeSubmenu = /**
         * @param {?} option
         * @param {?} event
         * @return {?}
         */
            function (option, event) {
                this.subUrl = option.navigationUrl;
                this.url = option.parentNavigationUrl;
                event.stopPropagation();
            };
        /**
         * @param {?} primaryURL
         * @param {?} compareURL
         * @return {?}
         */
        FKSideNavPanelComponent.prototype.equals = /**
         * @param {?} primaryURL
         * @param {?} compareURL
         * @return {?}
         */
            function (primaryURL, compareURL) {
                return primaryURL === compareURL;
            };
        /**
         * @param {?} primaryURL
         * @param {?} compareURL
         * @return {?}
         */
        FKSideNavPanelComponent.prototype.canShowSubMenu = /**
         * @param {?} primaryURL
         * @param {?} compareURL
         * @return {?}
         */
            function (primaryURL, compareURL) {
                return (this.equals(primaryURL, compareURL) && this.expanded);
            };
        /**
         * @return {?}
         */
        FKSideNavPanelComponent.prototype.toggle = /**
         * @return {?}
         */
            function () {
                this.expanded = !this.expanded;
            };
        FKSideNavPanelComponent.decorators = [
            { type: i0.Component, args: [{
                        // tslint:disable-next-line:component-selector
                        selector: 'fk-side-nav-panel',
                        template: "<div class=\"menu-panel\">\n    <aside class=\"left-sidebar\">\n    \t<div class=\"logoHeader\">\n\t    \t<a routerLink=\"{{options.homeLink}}\" class=\"logoLink\">\n          <img class=\"logo\" [src]=\"options.logo.logoImg\" alt=\"Logo\"/>\n          <span class=\"logoText p0\">\n              <img class=\"logoText\" [src]=\"options.logo.logoText\" alt=\"LogoText\"/>\n          </span>\n\t    \t</a>\n\t    </div>\n        <div class=\"scroll-sidebar\">\n            <nav class=\"sidebar-nav\">\n                <ul id=\"sidebarnav\">\n                    <li class=\"sidebar-item\" *ngFor=\"let menu of options.links; let i = index\" [ngClass]=\"{'selected' : equals(url, menu.navigationUrl)}\" (click)=\"changeMenu(menu)\">\n                        <ng-container>\n                            <a class=\"waves-effect sidebar-link\" routerLink=\"{{menu.navigationUrl}}\">\n                                <ng-container *ngIf=\"menu.icon;else iconClass\">\n                                    <img class=\"valignMiddle\" src=\"{{equals(url, menu.navigationUrl)? (menu.iconSelected || menu.icon) : (menu.icon)}}\" alt=\"{{menu.text | translate}}\"/>\n                                </ng-container>\n                                <ng-template #iconClass>\n                                    <i class=\"{{menu.iconClass}} svgIcon\"></i>\n                                </ng-template>\n                                <span class=\"hide-menu\">{{menu.text | translate}}</span>\n                            </a>\n                        </ng-container>\n                        <ng-container *ngIf=\"menu.submenu\">\n                            <ul class=\"hide-menu sub-menu-list\" [ngClass]=\"{'show': canShowSubMenu(url, menu.navigationUrl), 'hide': !canShowSubMenu(url, menu.navigationUrl)}\">\n                                <li *ngFor=\"let submenu of menu.submenu;let i = index\" (click)=\"changeSubmenu(submenu,$event);\">\n                                    <a class=\"waves-effect sidebar-link\" routerLink=\"{{submenu.navigationUrl}}\" [ngClass]=\"{'active' : equals(subUrl, submenu.navigationUrl)}\">\n                                        <ng-container *ngIf=\"submenu.icon;else iconClass\">\n                                            <img class=\"valignMiddle\" src=\"{{ equals(subUrl, submenu.navigationUrl) ? (submenu.iconSelected || submenu.icon) : (submenu.icon)}}\" alt=\"{{submenu.text | translate}}\"/>\n                                        </ng-container>\n                                        <ng-template #iconClass>\n                                            <i class=\"{{submenu.iconClass}} svgIcon\"></i>\n                                        </ng-template>\n                                        <span class=\"hide-menu\">{{submenu.text | translate}}</span>\n                                    </a>\n                                </li>\n                            </ul>\n                        </ng-container>\n                    </li>\n                </ul>\n            </nav>\n        </div>\n    </aside>\n</div>\n<span class=\"toggler\" (click)=\"toggle()\">\n    <svg *ngIf=\"expanded\" width=\"20\" height=\"13\">\n        <use xlink:href=\"#fk-expanded-arrow\"></use>\n    </svg>\n    <svg *ngIf=\"!expanded\" width=\"20\" height=\"13\" class=\"collapsed\">\n        <use xlink:href=\"#fk-expanded-arrow\"></use>\n    </svg>\n</span>",
                        // tslint:disable-next-line:use-host-property-decorator
                        host: { '[class.expanded]': 'expanded', 'class': 'clearfix' },
                        styles: [".menu-panel{width:100%;height:100%;position:relative}.menu-panel .logoHeader{display:flex;align-items:center;background-color:#005470;height:64px;padding:18px 12px}.menu-panel .logoHeader .logoLink{display:flex;align-items:center;margin:0;padding:0 5px}.menu-panel .logoHeader .logoLink img.logo{height:26px}.menu-panel .logoHeader .logoLink .logoText{padding-left:10px}.menu-panel .logoHeader .logoLink .logoText img{max-width:100%;height:15px;padding-left:5px}.menu-panel .left-sidebar{width:65px;height:100%;background-color:#003d52}.menu-panel .left-sidebar .scroll-sidebar{position:relative}.menu-panel .left-sidebar .scroll-sidebar .sidebar-nav ul{margin:0;padding:10px 0 0}.menu-panel .left-sidebar .scroll-sidebar .sidebar-nav ul li{list-style:none;margin-bottom:3px}.menu-panel .left-sidebar .scroll-sidebar .sidebar-nav ul li .sub-menu-list li{margin-bottom:0}.menu-panel .left-sidebar .scroll-sidebar .sidebar-nav ul li.sidebar-item.selected>.sidebar-link{background-color:#005470;border-left:7px solid #f9e87c;color:#fff}.menu-panel .left-sidebar .scroll-sidebar .sidebar-nav ul li.sidebar-item.selected>.sub-menu-list .sidebar-link.active{color:#fff}.menu-panel .left-sidebar .scroll-sidebar .sidebar-nav ul li .sidebar-link{color:#b7b7b9;width:100%;display:flex;white-space:nowrap;align-items:center;padding:10px;border-left:7px solid #003d52}.menu-panel .left-sidebar .scroll-sidebar .sidebar-nav ul li .sidebar-link.waves-effect{position:relative;cursor:pointer;display:inline-block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;vertical-align:middle;z-index:1;will-change:opacity,transform;overflow:hidden;transition:.1s ease-out;font-size:14px}.menu-panel .left-sidebar .scroll-sidebar .sidebar-nav ul li .sidebar-link i{color:#fff;width:20px;height:20px;font-size:18px}.menu-panel .left-sidebar .scroll-sidebar .sidebar-nav ul li .sidebar-link .valignMiddle{vertical-align:middle;width:20px;height:20px}.menu-panel .left-sidebar .scroll-sidebar .sidebar-nav ul li .sidebar-link .hide-menu,.menu-panel .left-sidebar .scroll-sidebar .sidebar-nav ul li .sub-menu-list.hide-menu{display:none}.toggler{height:24px;width:24px;display:inline-block;position:absolute;bottom:20px;border-radius:50%;right:20px;z-index:1;box-shadow:rgba(9,30,66,.0784314) 0 0 0 1px,rgba(9,30,66,.0784314) 0 2px 4px 1px;color:#6b778c;cursor:pointer}.toggler svg{color:#fff}.toggler svg.collapsed{-webkit-transform:rotateY(180deg);transform:rotateY(180deg)}:host{position:relative;display:inline-block;height:100%;font-family:Poppins,sans-serif}:host .left-sidebar{transition:width .2s ease-in-out}:host.expanded .left-sidebar{width:180px}:host.expanded .left-sidebar .scroll-sidebar .sidebar-nav ul li .sidebar-link .hide-menu{display:inline-block;padding-left:10px}:host.expanded .left-sidebar .scroll-sidebar .sidebar-nav ul li .sub-menu-list.hide-menu{display:inline-block;padding:0 0 0 31px;width:100%}:host.expanded .left-sidebar .scroll-sidebar .sidebar-nav ul li .sub-menu-list.hide-menu .sidebar-link{padding:5px;margin-left:0}:host.expanded .left-sidebar .scroll-sidebar .sidebar-nav ul li .sub-menu-list.hide-menu .sidebar-link .hide-menu{font-size:12px;padding-left:10px;line-height:16px;word-break:break-word;white-space:pre-wrap}.hide{display:none}.show{display:inherit}"]
                    }] }
        ];
        FKSideNavPanelComponent.ctorParameters = function () {
            return [
                { type: router.Router }
            ];
        };
        FKSideNavPanelComponent.propDecorators = {
            expanded: [{ type: i0.HostBinding, args: ['class.expanded',] }],
            options: [{ type: i0.Input }],
            expandOnIconClick: [{ type: i0.Input }]
        };
        return FKSideNavPanelComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var GeoService = /** @class */ (function () {
        function GeoService(http$$1) {
            this.http = http$$1;
            this.cityStateAutoCompleteUrl = '/api/v1/address/city_state_country_v2';
            this.stopNameAutoCompleteUrl = '/api/v1/address/stop_name_autocomplete';
        }
        /**
         * @param {?} query
         * @return {?}
         */
        GeoService.prototype.cityStateAutoComplete = /**
         * @param {?} query
         * @return {?}
         */
            function (query) {
                /** @type {?} */
                var params = { q: query };
                return this.http.get(this.fullCityStateAutoCompleteUrl, { params: params });
            };
        /**
         * @param {?} query
         * @return {?}
         */
        GeoService.prototype.stopNameAutoComplete = /**
         * @param {?} query
         * @return {?}
         */
            function (query) {
                /** @type {?} */
                var params = { q: query };
                return this.http.get(this.fullStopNameAutoCompleteUrl, { params: params });
            };
        Object.defineProperty(GeoService.prototype, "fullCityStateAutoCompleteUrl", {
            get: /**
             * @return {?}
             */ function () {
                return "" + this.geoServiceUrl + this.cityStateAutoCompleteUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeoService.prototype, "fullStopNameAutoCompleteUrl", {
            get: /**
             * @return {?}
             */ function () {
                return "" + this.geoServiceUrl + this.stopNameAutoCompleteUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeoService.prototype, "geoServiceUrl", {
            get: /**
             * @return {?}
             */ function () {
                return ConfigHelper.environment.geoServiceUrl;
            },
            enumerable: true,
            configurable: true
        });
        GeoService.decorators = [
            { type: i0.Injectable }
        ];
        GeoService.ctorParameters = function () {
            return [
                { type: http.HttpClient }
            ];
        };
        return GeoService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var LoaderComponent = /** @class */ (function () {
        function LoaderComponent(loadingService) {
            this.loadingService = loadingService;
            this.overlay = false;
            this.show = false;
        }
        /**
         * @return {?}
         */
        LoaderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.subscription = this.loadingService.LoadingState
                    .subscribe(function (state) {
                    if (state) {
                        _this.show = state.show;
                    }
                });
            };
        /**
         * @return {?}
         */
        LoaderComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                if (this.subscription && this.subscription.unsubscribe) {
                    this.subscription.unsubscribe();
                }
            };
        LoaderComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'loader',
                        template: "<div *ngIf=\"overlay && show\" class=\"loader-overlay\"></div>\n<img *ngIf=\"show\" class=\"loading-spinner\" src=\"https://assets.fourkites.com/loader.gif\" />",
                        styles: [".loader-overlay{position:absolute;height:100%;width:100%;z-index:10000}.loading-spinner{bottom:0;height:5em;left:0;margin:auto;overflow:show;position:fixed;right:0;top:0;width:5em;z-index:999999}"]
                    }] }
        ];
        LoaderComponent.ctorParameters = function () {
            return [
                { type: LoaderService }
            ];
        };
        LoaderComponent.propDecorators = {
            overlay: [{ type: i0.Input }]
        };
        return LoaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var LoadScriptDirective = /** @class */ (function () {
        function LoadScriptDirective() {
        }
        /**
         * @return {?}
         */
        LoadScriptDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var node = document.createElement('script');
                node.src = this.scriptUrl;
                node.type = 'text/javascript';
                node.async = true;
                node.defer = true;
                node.charset = 'utf-8';
                document.getElementsByTagName('head')[0].appendChild(node);
            };
        LoadScriptDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[load-script]'
                    },] }
        ];
        LoadScriptDirective.propDecorators = {
            scriptUrl: [{ type: i0.Input, args: ['script',] }]
        };
        return LoadScriptDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var REPO_NAMES = ["tools-frontend-client", "tracking-frontend-client", "dashboard-frontend-client", "insights-frontend-client", "network-visibility-frontend-client"];
    var FkCommonHeaderComponent = /** @class */ (function () {
        function FkCommonHeaderComponent(http$$1) {
            this.http = http$$1;
            this.repoName = '';
            this.environment = ConfigHelper.environment.name;
            this.copyEnvironment = Object.assign({}, ConfigHelper.environment);
            this.setEnvVariables();
        }
        /**
         * @return {?}
         */
        FkCommonHeaderComponent.prototype.setEnvVariables = /**
         * @return {?}
         */
            function () {
                var _this = this;
                window.addEventListener('load-done', function () {
                    if (window.FKUM) {
                        window.FKUM.setEnvironment(_this.copyEnvironment);
                    }
                    else {
                        console.error('Header Env not configured!!');
                    }
                });
            };
        /**
         * @return {?}
         */
        FkCommonHeaderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var DOM = this.sectionWrapper.nativeElement;
                try {
                    /** @type {?} */
                    var script_1 = document.createElement("script");
                    /** @type {?} */
                    var s3Path = 'https://fk-header.s3.amazonaws.com/header-configurations.json';
                    this.http.get(s3Path).subscribe(function (res) {
                        /** @type {?} */
                        var repoName = REPO_NAMES.indexOf(_this.repoName) > -1 ? 'ultraman' : _this.repoName;
                        /** @type {?} */
                        var version = res[_this.environment + "_version"];
                        /** @type {?} */
                        var url = res.endpoints[repoName];
                        script_1.src = url.replace('${version}', version);
                        DOM.appendChild(script_1);
                        console.info('HEADER LATEST VERSION', res.version);
                        console.info('HEADER CURRENT VERSION', version);
                    }, function (err) {
                        console.log('ERROR FETCHING S3 HEADER CONFIGURATIONS', err);
                    });
                }
                catch (e) {
                    console.log('Gotcha', e);
                }
            };
        FkCommonHeaderComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'fk-common-header-component',
                        template: "\n  <section #sectionWrapper>\n  <fourkites-header-wrapper>\n  <fourkites-legacy-header class=\"header-wrapper\" [origin]=\"'ultraman'\"></fourkites-legacy-header>\n  </fourkites-header-wrapper>\n  </section>\n  "
                    }] }
        ];
        FkCommonHeaderComponent.ctorParameters = function () {
            return [
                { type: http.HttpClient }
            ];
        };
        FkCommonHeaderComponent.propDecorators = {
            sectionWrapper: [{ type: i0.ViewChild, args: ['sectionWrapper',] }],
            repoName: [{ type: i0.Input, args: ['repoName',] }]
        };
        return FkCommonHeaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var SHARED_MODULE_CONFIG = new i0.InjectionToken('SHARED_MODULE_CONFIG');
    var SharedModule = /** @class */ (function () {
        function SharedModule(config) {
            if (config && config.environment) {
                ConfigHelper.setEnvironment(config.environment);
            }
        }
        /**
         * @param {?=} config
         * @return {?}
         */
        SharedModule.forRoot = /**
         * @param {?=} config
         * @return {?}
         */
            function (config) {
                return {
                    ngModule: SharedModule,
                    providers: [
                        { provide: SHARED_MODULE_CONFIG, useValue: config },
                        {
                            provide: SharedModuleConfig,
                            useFactory: provideConfig,
                            deps: [SHARED_MODULE_CONFIG]
                        },
                        SecurityService,
                        CompanyService,
                        LocationProviderService,
                        CompanyContextService,
                        UserResourceService,
                        DataPresenterService,
                        LoaderService,
                        { provide: dialog.MatDialogRef, useValue: {} },
                        { provide: dialog.MAT_DIALOG_DATA, useValue: [] },
                        ngxToastr.ToastrService,
                        AlertService,
                        GeoService,
                        NavPermissionService,
                        FeatureFlagService,
                        LicensingService
                    ]
                };
            };
        SharedModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [
                            LoaderComponent,
                            ActionFooterComponent,
                            NgDisabledDirective,
                            PendoAnalyticsDirective,
                            LoadScriptDirective,
                            HighlightDirective,
                            KeyBlockDirective,
                            ConfirmationDialogComponent,
                            FKDialogComponent,
                            FullPageModalComponent,
                            ExpandableList,
                            ExpandableListItem,
                            FilterToggleComponent,
                            ViewSwitcherComponent,
                            DatePickerComponent,
                            FKSelectComponent,
                            FKSelectMultipleComponent,
                            FKSelectGroupComponent,
                            FKSideNavPanelComponent,
                            RequiredFieldPipe,
                            ComponentsIconComponent,
                            FkCommonHeaderComponent
                        ],
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            dialog.MatDialogModule,
                            StorageModule,
                            core.TranslateModule,
                            calendar.CalendarModule,
                            ngxToastr.ToastrModule.forRoot(),
                            portal.PortalModule,
                            ngSelect.NgSelectModule,
                            router.RouterModule
                        ],
                        exports: [
                            StorageModule,
                            ngxToastr.ToastrModule,
                            portal.PortalModule,
                            LoaderComponent,
                            ActionFooterComponent,
                            NgDisabledDirective,
                            LoadScriptDirective,
                            PendoAnalyticsDirective,
                            HighlightDirective,
                            KeyBlockDirective,
                            ConfirmationDialogComponent,
                            FKDialogComponent,
                            FullPageModalComponent,
                            ExpandableList,
                            ExpandableListItem,
                            FilterToggleComponent,
                            ViewSwitcherComponent,
                            core.TranslatePipe,
                            FKSelectComponent,
                            FKSelectMultipleComponent,
                            FKSelectGroupComponent,
                            FKSideNavPanelComponent,
                            RequiredFieldPipe,
                            DatePickerComponent,
                            ComponentsIconComponent,
                            FkCommonHeaderComponent
                        ],
                        entryComponents: [
                            ConfirmationDialogComponent,
                            FullPageModalComponent,
                            FKDialogComponent
                        ],
                        schemas: [i0.CUSTOM_ELEMENTS_SCHEMA],
                        providers: [{
                                provide: http.HTTP_INTERCEPTORS,
                                useClass: CustomHttpInterceptor,
                                multi: true,
                                deps: [StorageService, SecurityService, CompanyContextService, LoaderService]
                            }]
                    },] }
        ];
        SharedModule.ctorParameters = function () {
            return [
                { type: SharedModuleConfig, decorators: [{ type: i0.Inject, args: [SharedModuleConfig,] }] }
            ];
        };
        return SharedModule;
    }());
    /**
     * @param {?} config
     * @return {?}
     */
    function provideConfig(config) {
        return new SharedModuleConfig(config);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var AccountSubMenuComponent = /** @class */ (function () {
        function AccountSubMenuComponent(headerService, translateService) {
            this.headerService = headerService;
            this.translateService = translateService;
        }
        /**
         * @return {?}
         */
        AccountSubMenuComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.menuItems[0].title = this.headerService.getName();
            };
        AccountSubMenuComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'hdr-account-sub-menu',
                        template: "<ul class=\"ac-menu-list\">\n  <ng-container *ngFor=\"let menu of menuItems\">\n    <li [ngClass]=\"['acc-menu-item', menu.id]\" [class.light]=\"headerService.isLightTheme()\" *ngIf=\"!menu.conditions || headerService.validateConditions(menu.conditions)\">\n      <a [href]=\"headerService.getMenuUrl(menu, origin)\" (click)=\"menu.onClick && headerService[menu.onClick]()\">\n        <i [ngClass]=\"[menu.icon, 'acc-icon']\"></i>\n        <div [attr.data-test-id]=\"'data-test-'+menu.id\" class=\"menu-title\">{{ translateService.get(menu.title) | async}}\n        </div>\n      </a>\n    </li>\n  </ng-container>\n</ul>\n",
                        styles: [".ac-menu-list{display:block;font-family:Oswald,sans-serif;font-size:13px;list-style:none}.acc-menu-item{color:#fff;cursor:pointer;display:inline-block;height:45px;margin:0;padding:7px 5px;text-align:center}.acc-menu-item a{color:inherit}.acc-menu-item a:active,.acc-menu-item a:hover{text-decoration:none}.acc-menu-item:hover{color:#09c!important}.acc-menu-item .menu-title{font-size:12px;font-weight:200;margin:5px;text-transform:uppercase}.acc-menu-item.light{color:#000}.acc-icon{font-size:15px}"]
                    }] }
        ];
        AccountSubMenuComponent.ctorParameters = function () {
            return [
                { type: NavPermissionService },
                { type: core.TranslateService }
            ];
        };
        AccountSubMenuComponent.propDecorators = {
            menuItems: [{ type: i0.Input, args: ['menuItems',] }],
            origin: [{ type: i0.Input, args: ['origin',] }]
        };
        return AccountSubMenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var UserSubMenuComponent = /** @class */ (function () {
        function UserSubMenuComponent(headerService, translateService) {
            this.headerService = headerService;
            this.translateService = translateService;
        }
        /**
         * @param {?} menu
         * @param {?} event
         * @return {?}
         */
        UserSubMenuComponent.prototype.changeImage = /**
         * @param {?} menu
         * @param {?} event
         * @return {?}
         */
            function (menu, event) {
                if (event.type === 'mouseover') {
                    menu.active = true;
                }
                else {
                    menu.active = false;
                }
            };
        /**
         * @param {?} menu
         * @param {?} origin
         * @return {?}
         */
        UserSubMenuComponent.prototype.isMenuActive = /**
         * @param {?} menu
         * @param {?} origin
         * @return {?}
         */
            function (menu, origin) {
                return (menu.active || this.headerService.isMenuActive(menu, origin));
            };
        UserSubMenuComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'hdr-user-sub-menu',
                        template: "\n<section class=\"usr-menu-bar\">\n  <div class=\"usr-menu-list\">\n    <ng-container *ngFor=\"let menu of menuItems\">\n      <div [ngClass]=\"['usr-menu-item', 'usr-menu-' + menu.id]\" [class.active]=\"headerService.isMenuActive(menu, origin)\" *ngIf=\"!menu.conditions || headerService.validateConditions(menu.conditions)\" (mouseover)=\"changeImage(menu,$event)\" (mouseout)=\"changeImage(menu,$event)\">\n        <span class=\"usr-menu-link\">\n          <a [href]=\"headerService.getMenuUrl(menu, origin)\" [ngClass]=\"{'menu-img': menu.iconUrl}\" (click)=\"menu.onClick && headerService[menu.onClick]()\">\n            <ng-container *ngIf=\"menu.iconUrl\">\n              <img [ngClass]=\"{'usr-icon-img': true, 'hidden': isMenuActive(menu, origin)}\" src=\"{{ menu.iconUrl }}\"/>\n              <img [ngClass]=\"{'usr-icon-img': true, 'hidden': !isMenuActive(menu, origin)}\" src=\"{{ menu.iconActiveUrl || menu.iconUrl }}\"/>\n            </ng-container>\n            <i *ngIf=\"menu.icon\" [ngClass]=\"[menu.icon, 'usr-icon']\"></i>\n            <span [attr.data-test-id]=\"'data-test-'+menu.id\">{{ translateService.get(menu.title) | async }}</span>\n          </a>\n          <i *ngIf=\"menu.subs\" class=\"caret\"></i>\n        </span>\n        <div *ngIf=\"menu.subs\" class=\"sub-menu\">\n          <ul>\n            <ng-container *ngFor=\"let sub of menu.subs\">\n              <a [href]=\"headerService.getMenuUrl(sub, origin)\" (click)=\"sub.onClick && headerService[sub.onClick]()\">\n                <li [attr.data-test-id]=\"'data-test-'+sub.id\" *ngIf=\"!sub.conditions || headerService.validateConditions(sub.conditions)\">\n                  {{ translateService.get(sub.title) | async}}\n                </li>\n              </a>\n            </ng-container>\n          </ul>\n        </div>\n      </div>\n    </ng-container>\n  </div>\n  <div class=\"load-search-bar\">\n    <hdr-load-searcher></hdr-load-searcher>\n  </div>\n</section>\n\n",
                        styles: [".usr-menu-bar{box-shadow:2px 2px 6px 0 rgba(0,0,0,.37)!important;background:#fff;color:#000;height:40px;width:100%}.usr-menu-bar .load-search-bar{float:right;width:280px}.usr-menu-list{display:block;float:left;list-style:none;width:calc(100% - 280px)}.usr-menu-item{float:left;box-sizing:content-box;cursor:pointer;display:inline-block;font-family:Oswald,sans-serif;font-size:16px;height:25px;padding:8px 4px;position:relative;text-align:center}.usr-menu-item a.menu-img{position:relative;top:-3px}.usr-menu-item.active .usr-menu-link{color:#09c}.usr-menu-item.active .usr-menu-link span{color:inherit;font-weight:400}.usr-menu-item.active::before{background:#09c;bottom:0;content:' ';height:3px;left:0;position:absolute;width:100%}.usr-menu-item .usr-icon{position:relative;top:1px;font-size:20px}.usr-menu-item .usr-icon-img{height:22px;width:24px;position:relative;top:5px}.usr-menu-item a{color:inherit}.usr-menu-item a:active,.usr-menu-item a:hover{text-decoration:none}.usr-menu-item span{color:#000;font-weight:200;margin:5px;text-transform:uppercase}.usr-menu-item:hover span{color:#09c}.usr-menu-item:hover .sub-menu{-webkit-transform:scaleY(1);transform:scaleY(1)}.usr-menu-item .sub-menu{background:#09c;color:#fff;left:0;min-width:300px;position:absolute;text-align:left;-webkit-transform:scaleY(0);transform:scaleY(0);-webkit-transform-origin:top;transform-origin:top;transition:.1s ease-in;top:40px;z-index:100}.usr-menu-item .sub-menu ul{list-style:none}.usr-menu-item .sub-menu ul li{font-size:16px;padding:13px 0 13px 20px;text-transform:uppercase;width:100%}.usr-menu-item .sub-menu ul li:hover{background:rgba(255,255,255,.25)!important}.caret{border-top:4px dashed;border-right:4px solid transparent;border-left:4px solid transparent;display:inline-block;height:0;margin-left:2px;vertical-align:middle;width:0}"]
                    }] }
        ];
        UserSubMenuComponent.ctorParameters = function () {
            return [
                { type: NavPermissionService },
                { type: core.TranslateService }
            ];
        };
        UserSubMenuComponent.propDecorators = {
            menuItems: [{ type: i0.Input, args: ['menuItems',] }],
            origin: [{ type: i0.Input, args: ['origin',] }]
        };
        return UserSubMenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var LoadSearcherComponent = /** @class */ (function () {
        function LoadSearcherComponent(headerService, document) {
            this.headerService = headerService;
            this.document = document;
            this.loadNumber = new forms.FormControl();
        }
        /**
         * @param {?} event
         * @return {?}
         */
        LoadSearcherComponent.prototype.onLoadNumberSubmit = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (this.loadNumber.value) {
                    this.headerService.onLoadsSearch(this.loadNumber.value);
                }
            };
        /**
         * @return {?}
         */
        LoadSearcherComponent.prototype.resetSearchValue = /**
         * @return {?}
         */
            function () {
                this.loadNumber.setValue('');
                this.headerService.onLoadsSearch(' ');
            };
        LoadSearcherComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'hdr-load-searcher',
                        template: "<div class=\"loads-searcher\">\n  <form *ngIf=\"headerService.isTrackingLoads\" class=\"load-search-form\" (ngSubmit)=\"onLoadNumberSubmit($event)\">\n    <input [formControl]=\"loadNumber\" type=\"text\" placeholder=\"{{'header.user.search_by_reference_number' | translate}}\"/>\n    <i *ngIf=\"loadNumber.value && loadNumber.value.length > 0\" (click)=\"resetSearchValue()\" class=\"fa fa-times-circle search-value-reset ptr\"></i>\n    <button type=\"submit\"><i class=\"fa fa-search\"></i></button>\n  </form>  \n</div>\n",
                        styles: [".loads-searcher{margin:4.5px 0}.load-search-form{position:relative}.load-search-form .search-value-reset{position:absolute;right:55px;top:9px}.load-search-form input{border:1px solid #4a4a4a;border-top-left-radius:2px;border-bottom-right-radius:2px;height:30px;padding:2px 3px;width:230px}.load-search-form button{background:#000;color:#fff;height:32px;margin-left:-5px;position:relative;width:35px}"]
                    }] }
        ];
        LoadSearcherComponent.ctorParameters = function () {
            return [
                { type: NavPermissionService },
                { type: undefined, decorators: [{ type: i0.Inject, args: [platformBrowser.DOCUMENT,] }] }
            ];
        };
        return LoadSearcherComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var HeaderConfig = {
        'userMenu': [
            {
                id: 'home',
                title: 'header.user.home',
                url: 'dashboard/',
                icon: 'icon-home icons',
                conditions: [['checkParam', 'enableExecDashboard']]
            },
            {
                id: 'tracking',
                title: 'header.user.tracking',
                url: '',
                icon: 'icon-location-pin icons',
                conditions: [['checkIfShowModule', 'tracking'], ['checkPermissions', 'loads', 'view']],
                subs: [
                    {
                        id: 'loads',
                        title: 'header.user.loads',
                        url: 'tracking/#/loads',
                        conditions: [['checkPermissions', 'loads', 'view']]
                    },
                    {
                        id: 'createLoad_A',
                        title: 'header.user.create_load',
                        url: '#/createLoad',
                        urlParams: 'getCreateLoadAdminParams',
                        conditions: [['checkParam', 'superAdmin']]
                    },
                    {
                        id: 'createLoad',
                        title: 'header.user.create_load',
                        url: '#/createLoad',
                        conditions: [['checkFalseParam', 'superAdmin'], ['checkPermissions', 'loads', 'create']]
                    },
                    {
                        id: 'massUpdate_A',
                        title: 'header.user.mass_update',
                        url: '#/massUpdate',
                        urlParams: 'getCreateLoadAdminParams',
                        conditions: [['checkParam', 'superAdmin']]
                    },
                    {
                        id: 'massUpdate',
                        title: 'header.user.mass_update',
                        url: '#/massUpdate',
                        conditions: [['checkFalseParam', 'superAdmin'], ['checkPermissions', 'loads', 'create']]
                    },
                    {
                        id: 'getDirectAssignment',
                        title: 'header.user.get_direct_assignment',
                        url: '#/integrations/trackingInfoAssignment',
                        urlParams: 'getDirectAssignmentGuidUrl',
                        conditions: ['isDirectAssignmentGuid']
                    },
                    {
                        id: 'oceanTracking',
                        title: 'header.user.ocean_tracking',
                        url: 'ocean-tracking/loads',
                        conditions: [
                            ['checkIfShowModule', 'tracking-ocean'],
                            ['checkPermissions', 'loads', 'view'],
                            ['isFeatureEnabled', 'new-ocean-page']
                        ]
                    },
                    {
                        id: 'airTracking',
                        title: 'header.user.air_tracking',
                        url: 'air-tracking/loads',
                        conditions: [
                            ['checkIfShowModule', 'tracking-air'],
                            ['checkPermissions', 'loads', 'view'],
                            ['isFeatureEnabled', 'new-air-page']
                        ]
                    }
                ]
            },
            {
                id: 'insights',
                title: 'header.user.fourkites_analytics',
                icon: 'icon-graph icons',
                url: '',
                conditions: ['showInsightsTab'],
                subs: [
                    {
                        id: 'trackingConsistency',
                        title: 'header.user.tracking_consistency',
                        url: 'insights/tracking-consistency',
                        conditions: [['isLicensed', [LicensingConfig.INSIGHTS.CONSISTENCY_DASHBOARD], 'showTrackingConsistency']]
                    },
                    {
                        id: 'basicAnalytics',
                        title: 'header.user.basic_analytics',
                        url: 'insights/basic-analytics',
                        conditions: [['isLicensed', [LicensingConfig.INSIGHTS.ANALYTICS_DASHBOARD, LicensingConfig.INSIGHTS.ANALYTICS_DASHBOARD_OCEAN]]]
                    },
                    {
                        id: 'perfomanceAnalytics',
                        title: 'header.user.performance_analytics',
                        url: 'insights/analytics',
                        conditions: [['isLicensed', [LicensingConfig.INSIGHTS.ADVANCED_ANALYTICS_DASHBOARD, LicensingConfig.INSIGHTS.ADVANCED_ANALYTICS_DASHBOARD_OCEAN], 'showPerformanceAnalytics']]
                    },
                    {
                        id: 'benchmarking',
                        title: 'header.user.benchmarking',
                        url: 'insights/benchmarking',
                        conditions: [['isLicensed', [LicensingConfig.INSIGHTS.BENCHMARKING_DASHBOARD], 'showBenchMarking']]
                    },
                    {
                        id: 'recommendations',
                        title: 'header.user.recommendations',
                        url: 'insights/recommendations',
                        conditions: ['showMABDModule']
                    }, {
                        id: 'manageSubscription',
                        title: 'header.user.manage_subscription',
                        url: 'insights/subscription',
                        conditions: [['isLicensed', [
                                    LicensingConfig.INSIGHTS.CONSISTENCY_SUBSCRIPTION,
                                    LicensingConfig.INSIGHTS.ADVANCED_ANALYTICS_SUBSCRIPTION,
                                    LicensingConfig.INSIGHTS.ANALYTICS_SUBSCRIPTION
                                ], 'showSubscription']]
                    },
                ]
            },
            {
                id: 'pcm',
                title: 'PCM',
                url: 'private-exchange/',
                iconUrl: 'https://s3.amazonaws.com/fk-icons/pcm-menu-icon.svg',
                iconActiveUrl: 'https://s3.amazonaws.com/fk-icons/pcm-menu-icon-active.svg',
                conditions: ['showPxModule']
            },
            {
                id: 'networkVisibility',
                title: 'header.user.network_visibility',
                url: 'network-visibility',
                iconUrl: 'https://s3.amazonaws.com/fk-icons/NetworkVis_icon.svg',
                iconActiveUrl: 'https://s3.amazonaws.com/fk-icons/NetworkVis_icon-active.svg',
                conditions: ['showNetworkVisibilityModule']
            },
            {
                id: 'facility-manager',
                title: 'header.user.facility_manager',
                url: 'dc-manager/dashboard',
                iconUrl: 'https://s3.amazonaws.com/fk-icons/facilitymanager-menu-icon.svg',
                iconActiveUrl: 'https://s3.amazonaws.com/fk-icons/facilitymanager-menu-icon-active.svg',
                conditions: ['showFacilityManagerModule']
            },
            {
                id: 'appointment-manager',
                title: 'header.user.appointment_manager',
                url: 'oas/home',
                iconUrl: 'https://s3.amazonaws.com/fk-icons/appointment-manager-menu-icon.svg',
                iconActiveUrl: 'https://s3.amazonaws.com/fk-icons/appointment-manager-menu-icon-active.svg',
                conditions: ['showAppoinmentManagerModule']
            },
            {
                id: 'tools',
                title: 'header.user.tools',
                icon: 'icon-briefcase icons',
                conditions: ['showToolsModule'],
                subs: [
                    {
                        id: 'addressManager',
                        title: 'header.user.address_manager',
                        url: 'tools/address-manager',
                        conditions: ['showAddressManager']
                    }, {
                        id: 'notificationRules',
                        title: 'header.user.notification_rules',
                        url: '#/tools/notificationRules',
                        conditions: ['showNotificationRules']
                    }, {
                        id: 'notificationRulesBeta',
                        title: 'header.user.notification_rules_2.0_beta',
                        url: 'tools/notification/notifications',
                        conditions: ['showAdvancedNotifications']
                    },
                    {
                        id: 'bulkUploadNotificationRules',
                        title: 'header.user.bulk_upload_notification_rules',
                        url: 'tools/notification/bulk-notification-upload',
                        conditions: ['showNotificationRules', ['checkParam', 'superAdmin'], ['isFeatureEnabled', 'bulk-notification-upload']]
                    },
                    {
                        id: 'etaThresholdConfiguration',
                        title: 'header.user.eta_threshold_configuration',
                        url: 'tools/eta-configuration',
                        conditions: [['checkParam', 'superAdmin']]
                    },
                    {
                        id: 'onTimePerformance',
                        title: 'header.user.on_time_performance',
                        url: '#/reports/delivery',
                        conditions: ['showReportsModule']
                    }, {
                        id: 'loadValidationReport',
                        title: 'header.user.load_validation_report',
                        url: '#/reports/loadValidation',
                        conditions: ['showReportsModule']
                    }, {
                        id: 'carrierScorecard',
                        title: 'header.user.carrier_scorecard',
                        url: '#/reports/carrier',
                        conditions: ['showReportsModule', ['checkParam', 'showCarrierScorecard']]
                    }, {
                        id: 'customerScorecard',
                        title: 'header.user.customer_scorecard',
                        url: '#/reports/customer',
                        conditions: ['showReportsModule', ['checkParam', 'showCustomerScorecard']]
                    },
                    {
                        id: 'simulateLocation',
                        title: 'header.user.simulate_location',
                        url: '#/tools/createCheckCall',
                        conditions: [['checkParam', 'superAdmin']]
                    },
                    {
                        id: 'pingTest',
                        title: 'header.user.ping_test',
                        url: '#/tools/pingTest',
                        conditions: [['checkParam', 'superAdmin']]
                    },
                    {
                        id: 'applessManagement',
                        title: 'header.user.appless_management',
                        url: '#/tools/appLessSubscriptionManagement',
                        conditions: [['checkParam', 'superAdmin']]
                    },
                    {
                        id: 'blacklistPhones',
                        title: 'header.user.blacklist_phones',
                        url: '#/tools/blackListPhoneNumbers',
                        conditions: [['checkParam', 'superAdmin']]
                    },
                    {
                        id: 'temperatureTracking',
                        title: 'header.user.temperature_tracking',
                        url: '#/tools/temperatureTracking',
                        conditions: [['checkParam', 'showTemperatureTrackingModule']]
                    },
                    {
                        id: 'healthDashboard',
                        title: 'header.user.health_dashboard',
                        url: '#/tools/cchDashboard',
                        conditions: [['checkParam', 'superAdmin']]
                    },
                    {
                        id: 'ports',
                        title: 'header.user.global_address',
                        url: 'tools/address-manager/ports',
                        conditions: ['isSuperAdminNoContext']
                    },
                    {
                        id: 'oceanInsightsMassUpload',
                        title: 'header.user.mass_update_oi',
                        url: 'ocean-tracking/loads/mass-upload',
                        conditions: ['isSuperAdminNoContext']
                    }
                ]
            },
            {
                id: 'admin',
                title: 'header.user.admin',
                url: '',
                icon: 'icon-settings icons',
                conditions: ['showAdminModule'],
                subs: [
                    {
                        id: 'companies',
                        title: 'header.user.companies',
                        url: '#/admin/companies',
                        conditions: ['showCompany']
                    },
                    {
                        id: 'locationProviders',
                        title: 'header.user.location_providers',
                        url: '#/admin/locationProviders',
                        conditions: ['isSuperAdminNoContext']
                    },
                    {
                        id: 'temperatureProviders',
                        title: 'header.user.temperature_providers',
                        url: '#/admin/temperatureProviders',
                        conditions: ['isSuperAdminNoContext']
                    },
                    {
                        id: 'network',
                        title: 'header.user.network',
                        url: '#/admin/network',
                        conditions: [['checkParam', 'companyAdmin']]
                    },
                    {
                        id: 'customers',
                        title: 'header.user.customers',
                        url: '#/admin/customers',
                        conditions: [['checkParam', 'companyAdmin']]
                    },
                    {
                        id: 'users',
                        title: 'header.user.users',
                        url: '#/admin/users',
                        conditions: ['checkifUserAdmin']
                    },
                    {
                        id: 'userLicesing',
                        title: 'header.user.manage_license',
                        url: 'admin/license/user',
                        conditions: ['isSuperAdminWithCompanyContext', 'isCompanyActive', ['isFeatureEnabled', 'user-licensing']]
                    }
                ]
            }
        ],
        'accountMenu': [
            {
                id: 'name',
                title: 'name',
                url: '#/userAccount',
                icon: 'icon-user icons',
                conditions: ['isAuthenticated']
            },
            {
                title: 'header.account.help',
                id: 'help',
                url: '',
                icon: 'icon-question icons',
                conditions: ['isAuthenticated'],
                onClick: 'openZendeskSupport'
            },
            {
                title: 'header.account.settings',
                id: 'settings',
                url: '#/settings',
                icon: 'icon-settings icons',
                conditions: ['isAuthenticated', 'showSettings']
            },
            {
                id: 'sign-out',
                title: 'header.account.sign_out',
                url: '',
                icon: 'icon-logout icon',
                conditions: ['isAuthenticated'],
                onClick: 'logOut'
            }
        ]
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var translations = {
        'header': {
            'account': {
                'help': 'Help',
                'settings': 'Settings',
                'sign_out': 'Sign Out'
            },
            'user': {
                'address_manager': 'Address Manager',
                'admin': 'Admin',
                'appless_management': 'App-less Management',
                'benchmarking': 'Benchmarking',
                'blacklist_phones': 'blacklist App-less Phones',
                'carrier_scorecard': 'Carrier Scorecard',
                'companies': 'Companies',
                'create_load': 'create Load',
                'customer_scorecard': 'Customer Scorecard',
                'customers': 'Customers',
                'dashboard': 'Dashboard',
                'eta_threshold_configuration': 'Eta Threshold Configuration',
                'facility_manager': 'Facility Manager',
                'appointment_manager': 'Appointments',
                'fourkites_analytics': 'Insights',
                'get_direct_assignment': 'Direct Assignment Loads',
                'global_address': 'Global Address',
                'health_dashboard': 'Health Dashboard',
                'home': 'Home',
                'insights_api': 'Insights API',
                'load_validation_report': 'Load Validation Report',
                'loads': 'Loads',
                'location_providers': 'Location Providers',
                'mass_update': 'Mass Update',
                'mass_update_oi': 'Mass Upload - Ocean (OI)',
                'manage_subscription': 'Manage Subscriptions',
                'matches': 'matches',
                'network': 'Network',
                'notification_rules': 'Notification Rules',
                'notification_rules_2.0_beta': 'Notification Rules (BETA)',
                'bulk_upload_notification_rules': 'Bulk Upload Notifications',
                'on_time_performance': 'On Time Performance',
                'performance_analytics': 'Advanced Analytics',
                'basic_analytics': 'Analytics',
                'ping_test': 'Ping Test',
                'ports': 'Ports',
                'recommendations': 'Recommendations',
                'reports': 'reports',
                'search_by_reference_number': 'Search by Reference Number',
                'simulate_location': 'Simulate Location',
                'temperature_providers': 'temperature Providers',
                'temperature_tracking': 'Temperature Tracking',
                'tools': 'tools',
                'tracking': 'Tracking',
                'ocean_tracking': 'Ocean Tracking',
                'air_tracking': 'Heavyweight Air Tracking',
                'tracking_consistency': 'Foundations',
                'users': 'Users',
                'network_visibility': 'Network Visibility',
                'manage_license': 'Manage Licenses'
            }
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var translations$1 = {
        'header': {
            'account': {
                'help': 'Ajuda',
                'settings': 'Configurações',
                'sign_out': 'Sair'
            },
            'user': {
                'address_manager': 'Gerenciador de endereço',
                'admin': 'Administrador',
                'appless_management': 'Gerenciamento sem aplicativo',
                'benchmarking': 'Análise comparativa',
                'blacklist_phones': 'blacklist App-less Phones',
                'carrier_scorecard': 'Tabela de desempenho da transportadora',
                'companies': 'Empresas',
                'create_load': 'Criar carga',
                'customer_scorecard': 'Tabela de desempenho do cliente',
                'customers': 'Clientes',
                'dashboard': 'Painel',
                'eta_threshold_configuration': 'Eta Threshold Configuration',
                'facility_manager': 'Facility Manager',
                'appointment_manager': 'Appointments',
                'fourkites_analytics': 'Perspectivas',
                'get_direct_assignment': 'Get Direct Assignment',
                'global_address': 'Global Address',
                'health_dashboard': 'Painel de saúde',
                'home': 'Início',
                'insights_api': 'Perspectivas API',
                'load_validation_report': 'Relatório de validação da carga',
                'loads': 'Cargas',
                'location_providers': 'Provedores de localização',
                'manage_subscription': 'Manage Subscriptions',
                'mass_update': 'Atualização em massa',
                'matches': 'Correspondências',
                'network': 'Rede',
                'notification_rules': 'Regras de notificação',
                'notification_rules_2.0_beta': 'Notification Rules (BETA)',
                'on_time_performance': 'Desempenho no prazo',
                'performance_analytics': 'Advanced Analytics',
                'basic_analytics': 'Analytics',
                'ping_test': 'Teste de ping',
                'ports': 'Ports',
                'reports': 'Relatórios',
                'search_by_reference_number': 'Pesquisar por número de referência',
                'simulate_location': 'Simular local',
                'temperature_providers': 'Provedores de temperatura',
                'temperature_tracking': 'Rastreamento de temperatura',
                'tools': 'Ferramentas',
                'tracking': 'Rastreamento',
                'ocean_tracking': 'Ocean Tracking',
                'air_tracking': 'Heavyweight Air Tracking',
                'tracking_consistency': 'Foundations',
                'users': 'Usuários',
                'network_visibility': 'Network Visibility',
                'manage_license': 'Manage Licenses'
            }
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var translations$2 = {
        'header': {
            'account': {
                'help': 'Aide',
                'settings': 'Param\u00e8tres',
                'sign_out': 'Se d\u00e9connecter'
            },
            'user': {
                'address_manager': 'Gestionnaire d\'Adresses',
                'admin': 'Admin',
                'analytics': 'Analytique',
                'appless_management': 'Gestion sans application',
                'benchmarking': '\u00c9talonnage',
                'blacklist_phones': 'T\u00e9l\u00e9phones sans application sur liste noire',
                'carrier_scorecard': 'Carte de pointage du transporteur',
                'companies': 'Entreprises',
                'create_load': 'Cr\u00e9er le chargement',
                'customer_scorecard': 'Carte de pointage du client',
                'customers': 'Clients',
                'dashboard': 'Tableau de bord',
                'eta_threshold_configuration': 'Eta Threshold Configuration',
                'facility_manager': 'Facility Manager',
                'appointment_manager': 'Appointments',
                'fourkites_analytics': 'Insights',
                'get_direct_assignment': 'Obtenir une Mission Directe',
                'global_address': 'Global Address',
                'health_dashboard': 'Tableau de bord sant\u00e9',
                'home': 'Accueil',
                'insights_api': 'Insights API',
                'load_validation_report': 'Rapport de validation du chargement',
                'loads': 'Chargements',
                'location_providers': 'Fournisseurs d\'emplacement',
                'mass_update': 'Mise \u00e0 jour massive',
                'manage_subscription': 'G\u00e9rer les abonnements',
                'matches': 'correspondances',
                'network': 'R\u00e9seau',
                'notification_rules': 'R\u00e8gles de Notification',
                'notification_rules_2.0_beta': 'Notification Rules (BETA)',
                'on_time_performance': 'Performance \u00e0 l\'heure',
                'basic_analytics': 'Analytics',
                'performance_analytics': 'Advanced Analytics',
                'ping_test': 'Test Ping',
                'ports': 'Ports',
                'reports': 'rapports',
                'search_by_reference_number': 'Rechercher par numéro de référence',
                'simulate_location': 'Simuler un emplacement',
                'subscription': 'abonnement',
                'temperature_providers': 'Fournisseurs de temp\u00e9rature',
                'temperature_tracking': 'Suivi de temp\u00e9rature',
                'tools': 'outils',
                'tracking': 'Suivi',
                'ocean_tracking': 'Ocean Tracking',
                'air_tracking': 'Heavyweight Air Tracking',
                'tracking_consistency': 'Foundations',
                'users': 'Utilisateurs',
                'network_visibility': 'Network Visibility',
                'manage_license': 'Manage Licenses'
            }
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var translations$3 = {
        'header': {
            'account': {
                'help': 'Yard\u0131m',
                'settings': 'Ayarlar',
                'sign_out': 'Oturumu Kapat'
            },
            'user': {
                'address_manager': 'Adres Y\u00f6neticisi',
                'admin': 'Y\u00f6netici',
                'analytics': 'Analiz Etme',
                'appless_management': 'App-less Y\u00f6netimi',
                'benchmarking': 'K\u0131yaslama',
                'blacklist_phones': 'AppLess Telefonlar\u0131n\u0131 kara listeye al',
                'carrier_scorecard': 'Ta\u015f\u0131y\u0131c\u0131 Karnesi',
                'companies': '\u015eirketler',
                'create_load': 'Y\u00fck Olu\u015fturun',
                'customer_scorecard': 'M\u00fc\u015fteri Karnesi',
                'customers': 'M\u00fc\u015fteriler',
                'dashboard': 'Kontrol paneli',
                'eta_threshold_configuration': 'Eta Threshold Configuration',
                'facility_manager': 'Facility Manager',
                'appointment_manager': 'Appointments',
                'fourkites_analytics': '\u0130\u00e7 g\u00f6r\u00fcler',
                'get_direct_assignment': 'Do\u011frudan Atama Al',
                'global_address': 'Global Address',
                'health_dashboard': 'Sa\u011fl\u0131k Kontrol Paneli',
                'home': 'Ana Sayfa',
                'insights_api': '\u0130\u00e7 g\u00f6r\u00fcler API',
                'load_validation_report': 'Y\u00fck Do\u011frulama Raporu',
                'loads': 'Y\u00fckler',
                'location_providers': 'Konumu Sa\u011flay\u0131c\u0131lar\u0131',
                'mass_update': 'Toplu G\u00fcncelleme',
                'manage_subscription': 'Abonelikleri Y\u00f6net',
                'matches': 'e\u015fle\u015fmeler',
                'network': 'A\u011f',
                'notification_rules': 'Bildirim Kurallar\u0131',
                'notification_rules_2.0_beta': 'Notification Rules (BETA)',
                'on_time_performance': 'Zaman\u0131nda Performans',
                'basic_analytics': 'Analytics',
                'performance_analytics': 'Advanced Analytics',
                'ping_test': 'Ping Testi',
                'ports': 'Ba\u011flant\u0131 noktalar\u0131',
                'reports': 'raporlar',
                'search_by_reference_number': 'Referans numarasına göre ara',
                'simulate_location': 'Konum Sim\u00fclasyonu',
                'subscription': 'abonelik',
                'temperature_providers': 's\u0131cakl\u0131k Sa\u011flay\u0131c\u0131lar\u0131',
                'temperature_tracking': 'S\u0131cakl\u0131k Takip',
                'tools': 'ara\u00e7lar',
                'tracking': 'Takip',
                'ocean_tracking': 'Ocean Tracking',
                'air_tracking': 'Heavyweight Air Tracking',
                'tracking_consistency': 'Foundations',
                'users': 'Kullan\u0131c\u0131lar',
                'network_visibility': 'Network Visibility',
                'manage_license': 'Manage Licenses'
            }
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    /** @type {?} */
    var translations$4 = {
        'header': {
            'account': {
                'help': 'Ayuda',
                'settings': 'Ajustes',
                'sign_out': 'Desconectar'
            },
            'user': {
                'address_manager': 'Gestor de direcciones',
                'admin': 'Administrador',
                'analytics': 'An\u00e1lisis',
                'appless_management': 'Gesti\u00f3n app-less',
                'benchmarking': 'Comparativa de mercado',
                'blacklist_phones': 'Tel\u00e9fonos app-less en lista negra',
                'carrier_scorecard': 'Tarjeta de puntuaciones de transportista',
                'companies': 'Empresas',
                'create_load': 'crear Carga',
                'customer_scorecard': 'Tarjeta de puntuaciones de cliente',
                'customers': 'Clientes',
                'dashboard': 'Panel de control',
                'eta_threshold_configuration': 'Eta Threshold Configuration',
                'facility_manager': 'Facility Manager',
                'appointment_manager': 'Appointments',
                'fourkites_analytics': 'Conocimientos',
                'get_direct_assignment': 'Obtener asignaci\u00f3n directa',
                'global_address': 'Global Address',
                'health_dashboard': 'Panel de control de salud',
                'home': 'Inicio',
                'insights_api': 'Conocimientos API',
                'load_validation_report': 'Informe de validaci\u00f3n de carga',
                'loads': 'Cargas',
                'location_providers': 'Proveedores de ubicaci\u00f3n',
                'mass_update': 'Actualización en masa',
                'manage_subscription': 'Gestionar suscripciones',
                'matches': 'coincidencias',
                'network': 'Red',
                'notification_rules': 'Normas de notificaci\u00f3n',
                'notification_rules_2.0_beta': 'Notification Rules (BETA)',
                'on_time_performance': 'Rendimiento puntual',
                'basic_analytics': 'Analytics',
                'performance_analytics': 'Advanced Analytics',
                'ping_test': 'Prueba de ping',
                'ports': 'Puertos',
                'reports': 'informes',
                'search_by_reference_number': 'Buscar por número de referencia',
                'simulate_location': 'Simular ubicaci\u00f3n',
                'subscription': 'suscripci\u00f3n',
                'temperature_providers': 'proveedores de temperatura',
                'temperature_tracking': 'Seguimiento de temperatura',
                'tools': 'herramientas',
                'tracking': 'Seguimiento',
                'ocean_tracking': 'Ocean Tracking',
                'air_tracking': 'Heavyweight Air Tracking',
                'tracking_consistency': 'Foundations',
                'users': 'Usuarios',
                'network_visibility': 'Network Visibility',
                'manage_license': 'Manage Licenses'
            }
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var HeaderComponent = /** @class */ (function () {
        function HeaderComponent(headerService, companyService, companyContextService, security, document, translate, featureFlag, localStorage) {
            this.headerService = headerService;
            this.companyService = companyService;
            this.companyContextService = companyContextService;
            this.security = security;
            this.document = document;
            this.translate = translate;
            this.featureFlag = featureFlag;
            this.localStorage = localStorage;
            this.headerConfig = HeaderConfig;
            this.companySearch = new forms.FormControl();
            this.isContextSelected = false;
            this.translate.use(this.localStorage.retrieve('NG_TRANSLATE_LANG_KEY'));
        }
        /**
         * @return {?}
         */
        HeaderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.initCompanyContext();
                this.initAdamantiumHook();
                this.translate.get('init').subscribe(function () {
                    _this.translate.setTranslation('en', translations, true);
                    _this.translate.setTranslation('pt', translations$1, true);
                    _this.translate.setTranslation('es', translations$4, true);
                    _this.translate.setTranslation('fr', translations$2, true);
                    _this.translate.setTranslation('tr', translations$3, true);
                });
            };
        /**
         * @return {?}
         */
        HeaderComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.destroyAdamantiumHook();
            };
        /**
         * @return {?}
         */
        HeaderComponent.prototype.initCompanyContext = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var companyContext = this.companyContextService.getCompanyContextName();
                this.companySearch.setValue(companyContext);
                this.isContextSelected = (companyContext && companyContext.length > 0);
                this.companySearch.valueChanges.subscribe(function (value) { return _this.onCompanyContextChange(value); });
            };
        /**
         * @param {?} company
         * @return {?}
         */
        HeaderComponent.prototype.fetchCompanyDesc = /**
         * @param {?} company
         * @return {?}
         */
            function (company) {
                return company.description;
            };
        /**
         * @param {?} id
         * @param {?} menuType
         * @return {?}
         */
        HeaderComponent.prototype.getMenuItemById = /**
         * @param {?} id
         * @param {?} menuType
         * @return {?}
         */
            function (id, menuType) {
                for (var menuIndex = 0; menuIndex < this.headerConfig[menuType].length; menuIndex++) {
                    /** @type {?} */
                    var menu = this.headerConfig[menuType][menuIndex];
                    if (menu.id === id) {
                        return menu;
                    }
                    else if (menu.subs) {
                        for (var subMenuIndex = 0; subMenuIndex < menu.subs.length; subMenuIndex++) {
                            /** @type {?} */
                            var submenu = menu.subs[subMenuIndex];
                            if (submenu.id === id) {
                                return submenu;
                            }
                        }
                    }
                }
            };
        /**
         * @param {?} id
         * @param {?} type
         * @return {?}
         */
        HeaderComponent.prototype.goToMenuById = /**
         * @param {?} id
         * @param {?} type
         * @return {?}
         */
            function (id, type) {
                /** @type {?} */
                var menuOption = this.getMenuItemById(id, type);
                /** @type {?} */
                var value = this.headerService.getMenuUrl(menuOption, this.origin);
                this.setLocationHref(value);
            };
        /**
         * @param {?} value
         * @return {?}
         */
        HeaderComponent.prototype.setLocationHref = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.document.location.href = value;
            };
        /**
         * @param {?} company
         * @return {?}
         */
        HeaderComponent.prototype.setCompanyContext = /**
         * @param {?} company
         * @return {?}
         */
            function (company) {
                this.companySearch.setValue(((company) ? company.description : ''), { emitEvent: false });
                this.companyContextService.setCompanyContext(company);
            };
        /**
         * @param {?} searchString
         * @return {?}
         */
        HeaderComponent.prototype.onCompanyContextChange = /**
         * @param {?} searchString
         * @return {?}
         */
            function (searchString) {
                var _this = this;
                if (this.isContextSelected) {
                    this.onCompanyContextReset(null);
                    return;
                }
                if (!searchString || searchString.length < 3) {
                    this.companySearchResults = [];
                    return;
                }
                this.companyService.getCompaniesAutocomplete(searchString)
                    .then(function (data) {
                    _this.companySearchResults = data || [];
                });
            };
        /**
         * @param {?} event
         * @return {?}
         */
        HeaderComponent.prototype.onCompanyContextReset = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                /** @type {?} */
                var _isContextSelected = this.isContextSelected;
                this.isContextSelected = false;
                this.companySearchResults = [];
                this.setCompanyContext(null);
                //FOR SUPERADMIN EXPIRE LOAD FILTERS FROM LOCAL STORAGE - WHEN COMPANY CONTEXT IS RESET
                this.localStorage.clear('tfload.filters');
                if (_isContextSelected) {
                    this.goToMenuById('companies', 'userMenu');
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        HeaderComponent.prototype.onCompanyContextSelect = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.isContextSelected = true;
                this.setCompanyContext(event.option.value);
                this.goToMenuById('loads', 'userMenu');
            };
        /**
         * @return {?}
         */
        HeaderComponent.prototype.initAdamantiumHook = /**
         * @return {?}
         */
            function () {
                window.FKUM = window.FKUM || {};
                window.FKUM.updateUser = this.headerService.updateUser.bind(this.headerService);
                window.FKUM.setEnvironment = ConfigHelper.setEnvironment.bind(ConfigHelper);
                /** @type {?} */
                var event = new CustomEvent("load-done", {});
                window.dispatchEvent(event);
            };
        /**
         * @return {?}
         */
        HeaderComponent.prototype.destroyAdamantiumHook = /**
         * @return {?}
         */
            function () {
                delete window.FKUM;
            };
        HeaderComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'fourkites-legacy-header',
                        template: "<header class=\"fk-hdr\">\n  <div class=\"fk-hdr-main\" [class.lightTheme]=\"headerService.isLightTheme()\">\n    <div class=\"fk-hdr-logo ptr\">\n      <a class=\"logo\" (click)=\"goToMenuById('home', 'userMenu')\">\n        <img src=\"{{headerService.getHeaderLogo()}}\" alt=\"FourKites\" />\n      </a>\n    </div>\n    <div class=\"fk-cmpny-ctxt\" *ngIf=\"headerService.isSuperAdmin()\">\n      <input placeholder=\"Change Company Context\" class=\"fk-hdr-input\" [formControl]=\"companySearch\" [matAutocomplete]=\"companySearchComplete\" />\n      <i *ngIf=\"companySearch.value && companySearch.value.length > 0\" (click)=\"onCompanyContextReset($event)\" class=\"fa fa-times-circle company-ctxt-reset ptr\"></i>\n      <mat-autocomplete #companySearchComplete=\"matAutocomplete\" autoActiveFirstOption (optionSelected)=\"onCompanyContextSelect($event)\">\n        <mat-option *ngFor=\"let company of companySearchResults\" [value]=\"company\">\n          {{company.description}}\n        </mat-option>\n      </mat-autocomplete>\n    </div>\n    <div class=\"fk-hdr-main-menu\" *ngIf=\"headerService.isLoggedIn()\">\n      <hdr-account-sub-menu [origin]=\"origin\" [menuItems]=\"headerConfig.accountMenu\"></hdr-account-sub-menu>\n    </div>\n    <div class=\"signup-link\" *ngIf=\"headerService.isSignup()\">\n      <a (click)=\"headerService.goToSignIn()\">LOGIN</a>\n    </div>\n  </div>\n\n  <div class=\"fk-hdr-sub\" *ngIf=\"headerService.isLoggedIn()\">\n    <hdr-user-sub-menu [origin]=\"origin\" [menuItems]=\"headerConfig.userMenu\"></hdr-user-sub-menu>\n  </div>\n</header>\n",
                        styles: ["@charset \"UTF-8\";.fk-hdr{font-family:\u2018Oswald\u2019,sans-serif!important;position:fixed;top:0;width:100%;z-index:100}.fk-hdr-main{background:#2d2e2f;box-shadow:0 2px 4px 0 rgba(0,0,0,.5);color:#fff;height:45px}.fk-hdr-main.lightTheme{background:linear-gradient(0deg,#e8e8e8 0,#f8f8f8 100%);border-bottom:1px solid #000}.fk-hdr-logo{float:left;margin-left:15px;width:140px}.fk-hdr-logo a{display:block;height:33px;margin:6px 0;width:100%}.fk-hdr-logo a img{height:100%}.fk-hdr-main-menu{float:right}.mat-option{font-family:sans-serif;font-size:14px;font-weight:400;height:35px;line-height:35px}.fk-cmpny-ctxt{left:50%;position:absolute;top:6px;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.fk-cmpny-ctxt .mat-form-field,.fk-cmpny-ctxt .mat-form-field-wrapper{padding:0}.fk-cmpny-ctxt .mat-form-field-infix{border:0;margin:0;padding:0;width:inherit}.fk-cmpny-ctxt input{color:#000;height:35px;padding:10px;width:330px}.fk-cmpny-ctxt .company-ctxt-reset{color:#000;position:absolute;right:10px;top:11px}.hdr-lang-selector{display:inline-block;height:50px;left:50%;position:absolute;top:12px;-webkit-transform:translateX(-50%);transform:translateX(-50%);width:280px}.hdr-lang-selector .mat-select{height:30px;padding:7px}.fk-hdr-input{background:#fff;color:#000}.signup-link{cursor:pointer;position:absolute;right:20px;top:13px}.signup-link a,.signup-link a a:active,.signup-link a a:hover{color:#09c}.mat-autocomplete-panel{font-family:\"Helvetica Neue\",Helvetica,Arial,sans-serif;height:350px}.mat-autocomplete-panel .mat-option{height:35px;line-height:35px}"]
                    }] }
        ];
        HeaderComponent.ctorParameters = function () {
            return [
                { type: NavPermissionService },
                { type: CompanyService },
                { type: CompanyContextService },
                { type: SecurityService },
                { type: undefined, decorators: [{ type: i0.Inject, args: [platformBrowser.DOCUMENT,] }] },
                { type: core.TranslateService },
                { type: FeatureFlagService },
                { type: ngxWebstorage.LocalStorageService }
            ];
        };
        HeaderComponent.propDecorators = {
            origin: [{ type: i0.Input, args: ['origin',] }]
        };
        return HeaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var LegacyHeaderModule = /** @class */ (function () {
        function LegacyHeaderModule() {
        }
        LegacyHeaderModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [
                            LoadSearcherComponent,
                            AccountSubMenuComponent,
                            UserSubMenuComponent,
                            HeaderComponent
                        ],
                        imports: [
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            common.CommonModule,
                            SharedModule.forRoot(),
                            material.MatAutocompleteModule,
                            material.MatInputModule
                        ],
                        exports: [
                            HeaderComponent
                        ]
                    },] }
        ];
        return LegacyHeaderModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var LocationProviderModule = /** @class */ (function () {
        function LocationProviderModule() {
        }
        LocationProviderModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [],
                        imports: [
                            SharedModule.forRoot()
                        ],
                        exports: [],
                        providers: [
                            LocationProviderService
                        ]
                    },] }
        ];
        return LocationProviderModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var BootController = /** @class */ (function () {
        function BootController() {
            this._reboot = new rxjs.Subject();
            this.reboot$ = this._reboot.asObservable();
        }
        /**
         * @return {?}
         */
        BootController.getbootControl = /**
         * @return {?}
         */
            function () {
                if (!BootController.instance) {
                    BootController.instance = new BootController();
                }
                return BootController.instance;
            };
        /**
         * @return {?}
         */
        BootController.prototype.watchReboot = /**
         * @return {?}
         */
            function () {
                return this.reboot$;
            };
        /**
         * @return {?}
         */
        BootController.prototype.restart = /**
         * @return {?}
         */
            function () {
                this._reboot.next(true);
            };
        BootController.instance = null;
        return BootController;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    // Test helper
    var  
    // Test helper
    UnitTestHelper = /** @class */ (function () {
        // Test helper
        function UnitTestHelper() {
        }
        /**
         * @param {?} fixture
         * @param {?} id
         * @return {?}
         */
        UnitTestHelper.testSelector = /**
         * @param {?} fixture
         * @param {?} id
         * @return {?}
         */
            function (fixture, id) {
                return fixture.nativeElement.querySelector("[data-test-id=" + id + "]");
            };
        /**
         * @param {?} Component
         * @return {?}
         */
        UnitTestHelper.makeFixture = /**
         * @param {?} Component
         * @return {?}
         */
            function (Component) {
                return testing.TestBed.createComponent(Component);
            };
        return UnitTestHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */

    exports.UnitTestHelper = UnitTestHelper;
    exports.provideConfig = provideConfig;
    exports.SHARED_MODULE_CONFIG = SHARED_MODULE_CONFIG;
    exports.SharedModule = SharedModule;
    exports.LegacyHeaderModule = LegacyHeaderModule;
    exports.LocationProviderModule = LocationProviderModule;
    exports.CompanyContextService = CompanyContextService;
    exports.CompanyService = CompanyService;
    exports.DataPresenterService = DataPresenterService;
    exports.SecurityService = SecurityService;
    exports.StorageService = StorageService;
    exports.GeoService = GeoService;
    exports.LocationProviderService = LocationProviderService;
    exports.UserResourceService = UserResourceService;
    exports.NavPermissionService = NavPermissionService;
    exports.FeatureFlagService = FeatureFlagService;
    exports.AlertService = AlertService;
    exports.LoaderService = LoaderService;
    exports.LicensingService = LicensingService;
    exports.BootController = BootController;
    exports.ConfirmationDialogComponent = ConfirmationDialogComponent;
    exports.FullPageModalComponent = FullPageModalComponent;
    exports.FKDialogComponent = FKDialogComponent;
    exports.FKSelectComponent = FKSelectComponent;
    exports.FKSelectMultipleComponent = FKSelectMultipleComponent;
    exports.FKSelectGroupComponent = FKSelectGroupComponent;
    exports.CALENDAR_VALUE_ACCESSOR = CALENDAR_VALUE_ACCESSOR;
    exports.DatePickerComponent = DatePickerComponent;
    exports.FKSideNavPanelComponent = FKSideNavPanelComponent;
    exports.ComponentsIconComponent = ComponentsIconComponent;
    exports.ɵi = ExpandableListItem;
    exports.ɵh = ExpandableList;
    exports.ɵj = FilterToggleComponent;
    exports.ɵm = FkCommonHeaderComponent;
    exports.ɵb = ActionFooterComponent;
    exports.ɵa = LoaderComponent;
    exports.ɵk = ViewSwitcherComponent;
    exports.ɵp = COMPANY_CONFIG_STORE;
    exports.ɵq = COMPANY_CONTEXT_ID_STORE;
    exports.ɵr = COMPANY_DIRECT_ASSIGNMENT_GUID;
    exports.ɵf = HighlightDirective;
    exports.ɵg = KeyBlockDirective;
    exports.ɵe = LoadScriptDirective;
    exports.ɵc = NgDisabledDirective;
    exports.ɵd = PendoAnalyticsDirective;
    exports.ɵt = UnitConversionHelper;
    exports.ɵo = CustomHttpInterceptor;
    exports.ɵs = SharedModuleConfig;
    exports.ɵv = AccountSubMenuComponent;
    exports.ɵx = HeaderComponent;
    exports.ɵu = LoadSearcherComponent;
    exports.ɵw = UserSubMenuComponent;
    exports.ɵn = StorageModule;
    exports.ɵl = RequiredFieldPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm91cmtpdGVzLWZyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvaW50ZXJmYWNlcy9jb25maWcudHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL3NlcnZpY2VzL3N0b3JhZ2Uuc2VydmljZS50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvbW9kdWxlcy9zdG9yYWdlLm1vZHVsZS50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvY29uc3RhbnRzL2F1dGgtY29uZmlnLmNvbnN0YW50LnRzIiwibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvaGVscGVycy9jb25maWcuaGVscGVyLnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9zZXJ2aWNlcy9jb21wYW55LnNlcnZpY2UudHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL2NvbnN0YW50cy9jb21wYW55LWNvbmZpZy5jb25zdGFudC50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvc2VydmljZXMvY29tcGFueS1jb250ZXh0LnNlcnZpY2UudHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL3NlcnZpY2VzL3NlY3VyaXR5LnNlcnZpY2UudHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL3NlcnZpY2VzL3VzZXItcmVzb3VyY2Uuc2VydmljZS50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvaGVscGVycy91bml0LWNvbnZlcnNpb24uaGVscGVyLnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9zZXJ2aWNlcy9kYXRhLXByZXNlbnRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9zZXJ2aWNlcy9hbGVydC5zZXJ2aWNlLnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9tb2R1bGVzL2xvY2F0aW9uLXByb3ZpZGVyL21vZGVscy9sb2NhdGlvbi1wcm92aWRlci1yZXNwb25zZS5tb2RlbC50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvbW9kdWxlcy9sb2NhdGlvbi1wcm92aWRlci9zZXJ2aWNlcy9sb2NhdGlvbi1wcm92aWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9zZXJ2aWNlcy9sb2FkZXIuc2VydmljZS50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvaW50ZXJjZXB0b3JzL2h0dHAuaW50ZXJjZXB0b3IudHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQudHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL2NvbXBvbmVudHMvY29uZmlybWF0aW9uLWRpYWxvZy9jb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudC50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvY29tcG9uZW50cy9leHBhbmRhYmxlLWxpc3QtaXRlbS9leHBhbmRhYmxlLWxpc3QtaXRlbS5jb21wb25lbnQudHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL2NvbXBvbmVudHMvZXhwYW5kYWJsZS1saXN0L2V4cGFuZGFibGUtbGlzdC5jb21wb25lbnQudHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL2NvbXBvbmVudHMvZmlsdGVyLXRvZ2dsZS9maWx0ZXItdG9nZ2xlLmNvbXBvbmVudC50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvY29tcG9uZW50cy92aWV3LXN3aXRjaGVyL3ZpZXctc3dpdGNoZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9jb21wb25lbnRzL2Z1bGwtcGFnZS1tb2RhbC9mdWxsLXBhZ2UtbW9kYWwuY29tcG9uZW50LnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9jb21wb25lbnRzL2ZrLWRpYWxvZy9may1kaWFsb2cuY29tcG9uZW50LnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9jb21wb25lbnRzL2ZrLWRhdGUtcGlja2VyL2ZrLWRhdGUtcGlja2VyLmNvbXBvbmVudC50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvY29tcG9uZW50cy9jb21wb25lbnRzLWljb24vY29tcG9uZW50cy1pY29uLmNvbXBvbmVudC50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvZGlyZWN0aXZlcy9uZy1kaXNhYmxlZC9uZy1kaXNhYmxlZC5kaXJlY3RpdmUudHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL2RpcmVjdGl2ZXMvcGVuZG8tYW5hbHl0aWNzL3BlbmRvLWFuYWx5dGljcy5kaXJlY3RpdmUudHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL2RpcmVjdGl2ZXMvaGlnaGxpZ2h0L2hpZ2hsaWdodC5kaXJlY3RpdmUudHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL2RpcmVjdGl2ZXMva2V5LWJsb2NrL2tleS1ibG9jay5kaXJlY3RpdmUudHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL2NvbnN0YW50cy9saWNlbnNpbmctY29uZmlnLmNvbnN0YW50LnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9jb25zdGFudHMvZmVhdHVyZXMuY29uc3RhbnQudHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL3NlcnZpY2VzL2ZlYXR1cmUtZmxhZy5zZXJ2aWNlLnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9zZXJ2aWNlcy9saWNlbnNpbmcuc2VydmljZS50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvc2VydmljZXMvbmF2LXBlcm1pc3Npb24uc2VydmljZS50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvcGlwZXMvcmVxdWlyZWQtZmllbGQvcmVxdWlyZWQtZmllbGQucGlwZS50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvY29tcG9uZW50cy9may1zZWxlY3QvZmstc2VsZWN0LmNvbXBvbmVudC50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvY29tcG9uZW50cy9may1zZWxlY3QtbXVsdGlwbGUvZmstc2VsZWN0LW11bHRpcGxlLmNvbXBvbmVudC50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvY29tcG9uZW50cy9may1zZWxlY3QtZ3JvdXAvZmstc2VsZWN0LWdyb3VwLmNvbXBvbmVudC50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvY29tcG9uZW50cy9may1zaWRlLW5hdi1wYW5lbC9may1zaWRlLW5hdi1wYW5lbC5jb21wb25lbnQudHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL3NlcnZpY2VzL2dlby5zZXJ2aWNlLnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9jb21wb25lbnRzL2xvYWRlci9sb2FkZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9kaXJlY3RpdmVzL2xvYWQtc2NyaXB0L2xvYWQtc2NyaXB0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvY29tcG9uZW50cy9may1jb21tb24taGVhZGVyL2ZrLWNvbW1vbi1oZWFkZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9zaGFyZWQubW9kdWxlLnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9tb2R1bGVzL2xlZ2FjeS1oZWFkZXIvY29tcG9uZW50cy9hY2NvdW50LXN1Yi1tZW51L2FjY291bnQtc3ViLW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9tb2R1bGVzL2xlZ2FjeS1oZWFkZXIvY29tcG9uZW50cy91c2VyLXN1Yi1tZW51L3VzZXItc3ViLW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9tb2R1bGVzL2xlZ2FjeS1oZWFkZXIvY29tcG9uZW50cy9sb2FkLXNlYXJjaGVyL2xvYWQtc2VhcmNoZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9jb25zdGFudHMvaGVhZGVyLWNvbmZpZy5jb25zdGFudC50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvY29uc3RhbnRzL2xvY2FsZXMvZW4udHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL2NvbnN0YW50cy9sb2NhbGVzL3B0LnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9jb25zdGFudHMvbG9jYWxlcy9mci1DQS50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvY29uc3RhbnRzL2xvY2FsZXMvdHIudHMiLCJuZzovL0Bmb3Vya2l0ZXMvZnJvbnRlbmQtY2xpZW50LXNoYXJlZC1tb2R1bGUvbGliL2NvbnN0YW50cy9sb2NhbGVzL2VzLnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9tb2R1bGVzL2xlZ2FjeS1oZWFkZXIvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9saWIvbW9kdWxlcy9sZWdhY3ktaGVhZGVyL2xlZ2FjeS1oZWFkZXIubW9kdWxlLnRzIiwibmc6Ly9AZm91cmtpdGVzL2Zyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlL2xpYi9tb2R1bGVzL2xvY2F0aW9uLXByb3ZpZGVyL2xvY2F0aW9uLXByb3ZpZGVyLm1vZHVsZS50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9ib290L2Jvb3QuY29udHJvbC50cyIsIm5nOi8vQGZvdXJraXRlcy9mcm9udGVuZC1jbGllbnQtc2hhcmVkLW1vZHVsZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIElTaGFyZWRNb2R1bGVDb25maWcge1xuXHRlbnZpcm9ubWVudDoge1trZXk6IHN0cmluZ106IGFueX1cbn1cblxuZXhwb3J0IGNsYXNzIFNoYXJlZE1vZHVsZUNvbmZpZyBpbXBsZW1lbnRzIElTaGFyZWRNb2R1bGVDb25maWcge1xuXHRlbnZpcm9ubWVudDoge1trZXk6IHN0cmluZ106IGFueX1cblxuXHRjb25zdHJ1Y3Rvcihjb25maWc6SVNoYXJlZE1vZHVsZUNvbmZpZyl7XG5cdFx0aWYoY29uZmlnICYmIGNvbmZpZy5lbnZpcm9ubWVudCl7XG5cdFx0XHR0aGlzLmVudmlyb25tZW50ID0gY29uZmlnLmVudmlyb25tZW50XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICduZ3gtd2Vic3RvcmFnZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCAqIGFzIF9tb21lbnQgZnJvbSAnbW9tZW50JztcbmNvbnN0IG1vbWVudCA9IF9tb21lbnRcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VTZXJ2aWNlIHtcbiAgcHVibGljIGNvb2tpZVBhcmFtcyA9IHsgZXhwaXJ5OiAzMCwgcGF0aDogJy8nIH1cbiAgcHVibGljIHN0b3JhZ2VUeXBlOiBzdHJpbmcgPSAnbG9jYWxTdG9yYWdlJ1xuICBwdWJsaWMgZXhwaXJ5VGltZVR5cGU6IHN0cmluZyA9ICdkYXlzJ1xuICBwdWJsaWMgY29va2llRG9tYWluOiBzdHJpbmcgPSAnLyc7XG4gIHByaXZhdGUgaXNMb2NhbFN0b3JhZ2VTdXBwb3J0ZWQ6IGJvb2xlYW4gPSB0aGlzLmxvY2FsU3RvcmFnZS5pc1N0b3JhZ2VBdmFpbGFibGUoKVxuICBwcml2YXRlIHByZWZpeDpzdHJpbmcgPSAndGYnXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2U6IExvY2FsU3RvcmFnZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb29raWVTdG9yZTogQ29va2llU2VydmljZVxuICApIHtcbiAgfVxuXG4gIHN0b3JlKGtleSwgdmFsdWUpe1xuICAgIGlmKCF2YWx1ZSl7XG4gICAgICB2YWx1ZSA9IG51bGxcbiAgICB9XG4gICAgaWYoIXRoaXMuaXNMb2NhbFN0b3JhZ2VTdXBwb3J0ZWQgfHwgdGhpcy5zdG9yYWdlVHlwZSA9PT0gJ2Nvb2tpZScpe1xuICAgICAgcmV0dXJuIHRoaXMuc3RvcmVJbkNvb2tpZShrZXksIHZhbHVlLCB0cnVlKVxuICAgIH1cbiAgICB0aGlzLmxvY2FsU3RvcmFnZS5zdG9yZSh0aGlzLmRlcml2ZVF1YWxpZmllZEtleShrZXkpLCB2YWx1ZSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcmV0cml2ZShrZXkpe1xuICAgIGlmKCF0aGlzLmlzTG9jYWxTdG9yYWdlU3VwcG9ydGVkIHx8IHRoaXMuc3RvcmFnZVR5cGUgPT09ICdjb29raWUnKXtcbiAgICAgIHJldHVybiB0aGlzLnJldHJpdmVGcm9tQ29va2llKGtleSwgdHJ1ZSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubG9jYWxTdG9yYWdlLnJldHJpZXZlKHRoaXMuZGVyaXZlUXVhbGlmaWVkS2V5KGtleSkpXG4gIH1cblxuICBjbGVhcihrZXkpe1xuICAgIGlmKCF0aGlzLmlzTG9jYWxTdG9yYWdlU3VwcG9ydGVkIHx8IHRoaXMuc3RvcmFnZVR5cGUgPT09ICdjb29raWUnKXtcbiAgICAgIHJldHVybiB0aGlzLmNsZWFyRnJvbUNvb2tpZShrZXkpXG4gICAgfVxuICAgIHRoaXMubG9jYWxTdG9yYWdlLmNsZWFyKHRoaXMuZGVyaXZlUXVhbGlmaWVkS2V5KGtleSkpXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHN0b3JlSW5Db29raWUoa2V5LCB2YWx1ZSwgZW5jb2RlPWZhbHNlKXtcbiAgICBpZihfLmlzT2JqZWN0KHZhbHVlKSB8fCBfLmlzQXJyYXkodmFsdWUpIHx8IF8uaXNOdW1iZXIodmFsdWUpKXtcbiAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpXG4gICAgfVxuICAgIGlmKGVuY29kZSl7XG4gICAgICB2YWx1ZSA9IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSlcbiAgICB9XG4gICAgbGV0IGV4cGlyeSA9IHRoaXMuZ2V0RXhwaXJ5KHZhbHVlKVxuICAgIHRoaXMuY29va2llU3RvcmUuc2V0KGtleSwgdmFsdWUsIGV4cGlyeSwgdGhpcy5jb29raWVQYXJhbXMucGF0aCwgdGhpcy5jb29raWVEb21haW4pXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJldHJpdmVGcm9tQ29va2llKGtleSwgZGVjb2RlPWZhbHNlKXtcbiAgICBsZXQgdmFsdWUgPSB0aGlzLmNvb2tpZVN0b3JlLmdldChrZXkpXG4gICAgaWYoZGVjb2RlKXtcbiAgICAgIHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlKVxuICAgIH0gY2F0Y2goZSl7XG5cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICBjbGVhckZyb21Db29raWUoa2V5KXtcbiAgICB0aGlzLmNvb2tpZVN0b3JlLmRlbGV0ZShrZXksIHRoaXMuY29va2llRG9tYWluKVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBkZWxldGVBbGxDb29raWVzKCkge1xuICAgIHRoaXMuY29va2llU3RvcmUuZGVsZXRlQWxsKCk7XG4gIH1cblxuICBzZXRFeHBpcnlUeXBlKHZhbCkge1xuICAgIHRoaXMuZXhwaXJ5VGltZVR5cGUgPSB2YWw7XG4gIH1cblxuICBzZXRFeHBpcnkoZXhwaXJ5LCBwYXRoID0gJy8nKSB7XG4gICAgdGhpcy5jb29raWVQYXJhbXMuZXhwaXJ5ID0gZXhwaXJ5O1xuICAgIHRoaXMuY29va2llUGFyYW1zLnBhdGggPSBwYXRoO1xuICB9XG5cbiAgc2V0RG9tYWluKGRvbWFpbikge1xuICAgIHRoaXMuY29va2llRG9tYWluID0gZG9tYWluO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRFeHBpcnkodmFsdWUpe1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbW9tZW50KCkuc3VidHJhY3QoMSwgJ2RheXMnKS50b0RhdGUoKS52YWx1ZU9mKClcbiAgICB9XG4gICAgaWYgKHRoaXMuZXhwaXJ5VGltZVR5cGUgPT09ICdtaW51dGVzJyl7XG4gICAgICByZXR1cm4gbW9tZW50KCkuYWRkKHRoaXMuY29va2llUGFyYW1zLmV4cGlyeSwgJ21pbnV0ZXMnKS50b0RhdGUoKS52YWx1ZU9mKClcbiAgICB9XG4gICAgcmV0dXJuIG1vbWVudCgpLmFkZCh0aGlzLmNvb2tpZVBhcmFtcy5leHBpcnksICdkYXlzJykudG9EYXRlKCkudmFsdWVPZigpXG4gIH1cblxuICBwcml2YXRlIGRlcml2ZVF1YWxpZmllZEtleShrZXkpe1xuICAgIHJldHVybiB0aGlzLnByZWZpeCArIGtleVxuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgSW5qZWN0aW9uVG9rZW4sIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmcyV2Vic3RvcmFnZSB9IGZyb20gJ25neC13ZWJzdG9yYWdlJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3N0b3JhZ2Uuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBOZzJXZWJzdG9yYWdlLmZvclJvb3QoeyBwcmVmaXg6ICcnLCBzZXBhcmF0b3I6ICcnLCBjYXNlU2Vuc2l0aXZlOiB0cnVlIH0pXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFN0b3JhZ2VTZXJ2aWNlLFxuICAgIENvb2tpZVNlcnZpY2VcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5nMldlYnN0b3JhZ2VcbiAgXVxufSlcblxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VNb2R1bGUge31cbiIsImV4cG9ydCBpbnRlcmZhY2UgSUF1dGhDb25maWcge1xuICBBVVRIOiBzdHJpbmdcbiAgVVNFUjogc3RyaW5nXG4gIERFVklDRV9JRDogc3RyaW5nXG4gIFVTRVJfSUQ6IHN0cmluZ1xuICBGUk9OVF9FTkRfVkVSU0lPTjogc3RyaW5nXG4gIENPTVBBTllfVElNRTogc3RyaW5nXG4gIEVNQUlMX1JFR0VYUD86IFJlZ0V4cFxuICBFTkFCTEVfMkZBPzpzdHJpbmdcbn1cblxuZXhwb3J0IGNvbnN0IEF1dGhDb25maWc6IElBdXRoQ29uZmlnID0ge1xuICBBVVRIIDogXCJhdXRoLXRva2VuXCIsXG4gIFVTRVIgOiBcImN1cnJlbnQtdXNlclwiLFxuICBERVZJQ0VfSUQgOiBcImRldmljZS1pZFwiLFxuICBVU0VSX0lEOiBcInVzZXItaWRcIixcbiAgRlJPTlRfRU5EX1ZFUlNJT046IFwiZnJvbnRfZW5kX3ZlcnNpb25cIixcbiAgQ09NUEFOWV9USU1FOiAnY29tYW55X3RpbWUnLFxuICBFTUFJTF9SRUdFWFA6IC9eW19hLXowLTldKyhcXC5bX2EtejAtOV0rKSpAW2EtejAtOS1dKyhcXC5bYS16MC05LV0rKSooXFwuW2Etel17Miw0fSkkLyxcbiAgRU5BQkxFXzJGQTogJ2VuYWJsZS0yZmEnXG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBDb25maWdIZWxwZXIge1xuICBzdGF0aWMgZW52aXJvbm1lbnQ6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gbnVsbFxuXG4gIHN0YXRpYyBzZXRFbnZpcm9ubWVudChlbnY6IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XG4gICAgQ29uZmlnSGVscGVyLmVudmlyb25tZW50ID0gZW52XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDb25maWdIZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL2NvbmZpZy5oZWxwZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29tcGFueVNlcnZpY2Uge1xuICBwcml2YXRlIGNvbXBhbmllc0F1dG9jb21wbGV0ZVVybCA9ICcvYXBpL3YxL2NvbXBhbmllcy9hdXRvY29tcGxldGUnO1xuICBwcml2YXRlIGN1c3RvbWVyc0F1dG9jb21wbGV0ZVVybCA9ICcvYXBpL3YxL2NvbXBhbmllcy86Y29tcGFueUlkL2N1c3RvbWVycy9hdXRvY29tcGxldGVfdjInO1xuICBwcml2YXRlIHJlbGF0aW9uc2hpcHNVcmwgPSAnL2FwaS92MS9jb21wYW5pZXMvOnNoaXBwZXIvcmVsYXRpb25zaGlwcyc7XG4gIHByaXZhdGUgY29tcGFueVVybCA9ICcvYXBpL3YxL2NvbXBhbmllcy86Y29tcGFueUlkJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRcbiAgKSB7IH1cblxuICBwdWJsaWMgZ2V0Q29tcGFuaWVzQXV0b2NvbXBsZXRlKHF1ZXJ5OiBzdHJpbmcsIGNvbXBhbnlUeXBlPzogc3RyaW5nLCBvcHRpb25zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge1xuICAgIGRlbW9Pbmx5Q29tcGFueTogZmFsc2UsXG4gICAgaXNDb21wYW55SWROZWVkZWQ6IHRydWVcbiAgfSk6IFByb21pc2U8eyBba2V5OiBzdHJpbmddOiBhbnkgfVtdPiB7XG4gICAgaWYgKCFxdWVyeSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICdxJzogcXVlcnlcbiAgICB9O1xuICAgIGlmIChjb21wYW55VHlwZSkge1xuICAgICAgcGFyYW1zWyd0eXBlJ10gPSBjb21wYW55VHlwZTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5kZW1vT25seUNvbXBhbnkpIHtcbiAgICAgIHBhcmFtc1snZGVtb19jb21wYW55X29ubHknXSA9IHRydWU7XG4gICAgfVxuICAgIHBhcmFtc1snaW50ZXJjZXB0b3JPcHRpb25zJ10gPSB7IGlzQ29tcGFueUlkTmVlZGVkOiBvcHRpb25zLmlzQ29tcGFueUlkTmVlZGVkIH07XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5mdWxsQ29tcGFuaWVzQXV0b2NvbXBsZXRlVXJsKCksIHsgcGFyYW1zIH0pXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG5cbiAgcHVibGljIGdldEN1c3RvbWVyc0F1dG9Db21wbGV0ZShjb21wYW55SWQ6IHN0cmluZywgcTogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcnJheTx7fT4+IHtcbiAgICBpZiAocSAmJiBxLnRyaW0oKSAhPT0gJycpIHtcbiAgICAgIGxldCBwYXJhbXMgPSB7IHEgfTtcbiAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEFycmF5PHt9Pj4odGhpcy5mdWxsQ29tcGFueUN1c3RvbWVyQXV0b2NvbXBsZXRlVXJsKGNvbXBhbnlJZCksIHsgcGFyYW1zIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRDb21wYW55KGNvbXBhbnlJZDogbnVtYmVyKTogUHJvbWlzZTx7IFtrZXk6IHN0cmluZ106IGFueSB9W10+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmZ1bGxDb21wYW55VXJsKGNvbXBhbnlJZCkpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlKVxuICAgICAgLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3IpO1xuICB9XG5cbiAgcHVibGljIGdldFJlbGF0aW9uc2hpcHMoc2hpcHBlcjogc3RyaW5nLCBjYXJyaWVyOiBzdHJpbmcpIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmZ1bGxSZWxhdGlvbnNoaXBVcmwoc2hpcHBlcik7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsLCB7XG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgcmVsYXRlZF9jb21wYW55X2lkOiBjYXJyaWVyXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGZ1bGxSZWxhdGlvbnNoaXBVcmwoc2hpcHBlcikge1xuICAgIGNvbnN0IHByZXBhcmVkVXJsID0gdGhpcy5yZWxhdGlvbnNoaXBzVXJsLnJlcGxhY2UoJzpzaGlwcGVyJywgc2hpcHBlcik7XG4gICAgcmV0dXJuIGAke3RoaXMuY29tcGFueVNlcnZpY2VVcmx9JHtwcmVwYXJlZFVybH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBmdWxsQ29tcGFueVVybChjb21wYW55SWQpIHtcbiAgICBjb25zdCBwcmVwYXJlZENvbXBhbnlVcmwgPSB0aGlzLmNvbXBhbnlVcmwucmVwbGFjZSgnOmNvbXBhbnlJZCcsIGNvbXBhbnlJZCk7XG4gICAgcmV0dXJuIGAke3RoaXMuY29tcGFueVNlcnZpY2VVcmx9JHtwcmVwYXJlZENvbXBhbnlVcmx9YDtcbiAgfVxuXG4gIHByaXZhdGUgZnVsbENvbXBhbmllc0F1dG9jb21wbGV0ZVVybCgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5jb21wYW55U2VydmljZVVybH0ke3RoaXMuY29tcGFuaWVzQXV0b2NvbXBsZXRlVXJsfWA7XG4gIH1cblxuICBwcml2YXRlIGZ1bGxDb21wYW55Q3VzdG9tZXJBdXRvY29tcGxldGVVcmwoY29tcGFueUlkKSB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5jdXN0b21lcnNBdXRvY29tcGxldGVVcmwucmVwbGFjZSgnOmNvbXBhbnlJZCcsIGNvbXBhbnlJZCk7XG4gICAgcmV0dXJuIGAke3RoaXMuY29tcGFueVNlcnZpY2VVcmx9JHt1cmx9YDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGNvbXBhbnlTZXJ2aWNlVXJsKCkge1xuICAgIHJldHVybiBDb25maWdIZWxwZXIuZW52aXJvbm1lbnQuY29tcGFueVNlcnZpY2VVcmw7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkJywgZXJyb3IpO1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IENPTVBBTllfQ09ORklHX1NUT1JFOiBzdHJpbmcgPSAndGZDb21wYW55Q29uZmlnJztcbmV4cG9ydCBjb25zdCBDT01QQU5ZX0NPTlRFWFRfSURfU1RPUkU6IHN0cmluZyA9ICdjb21wYW55Q29udGV4dElkJztcbmV4cG9ydCBjb25zdCBDT01QQU5ZX0RJUkVDVF9BU1NJR05NRU5UX0dVSUQ6IHN0cmluZyA9ICdkaXJlY3RfYXNzaWdubWVudF9ndWlkJzsiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IFNlc3Npb25TdG9yYWdlLCBMb2NhbFN0b3JhZ2UgfSBmcm9tICduZ3gtd2Vic3RvcmFnZSc7XG5cbmltcG9ydCB7IENvbXBhbnlTZXJ2aWNlIH0gZnJvbSBcIi4vY29tcGFueS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDT01QQU5ZX0NPTkZJR19TVE9SRSwgQ09NUEFOWV9DT05URVhUX0lEX1NUT1JFLCBDT01QQU5ZX0RJUkVDVF9BU1NJR05NRU5UX0dVSUQgfSBmcm9tICcuLi9jb25zdGFudHMvY29tcGFueS1jb25maWcuY29uc3RhbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29tcGFueUNvbnRleHRTZXJ2aWNlIHtcblxuICBAU2Vzc2lvblN0b3JhZ2UoQ09NUEFOWV9DT05URVhUX0lEX1NUT1JFKSBwdWJsaWMgY29tcGFueUNvbnRleHRNb2RlbDoge1trZXk6IHN0cmluZ106IGFueX1cbiAgQExvY2FsU3RvcmFnZShDT01QQU5ZX0NPTkZJR19TVE9SRSkgcHVibGljIGN1cnJlbnRDb21wYW55OiB7W2tleTogc3RyaW5nXTogYW55fVxuICBATG9jYWxTdG9yYWdlKENPTVBBTllfRElSRUNUX0FTU0lHTk1FTlRfR1VJRCkgcHVibGljIGRpcmVjdEd1aWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbXBhbnlTZXJ2aWNlOiBDb21wYW55U2VydmljZVxuICApe31cblxuICBwdWJsaWMgZ2V0IGNvbXBhbnlUeXBlKCk6IHN0cmluZyB7XG4gICAgbGV0IHByaW9yaXR5T3JkZXIgPSBbJ3NoaXBwZXInLCAnM3BsJywgJ2NhcnJpZXInXTtcblxuICAgIGlmKCF0aGlzLmN1cnJlbnRDb21wYW55IHx8ICF0aGlzLmN1cnJlbnRDb21wYW55LnR5cGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgdHlwZSBvZiBwcmlvcml0eU9yZGVyKSB7XG4gICAgICBpZihfLmNvbnRhaW5zKHRoaXMuY3VycmVudENvbXBhbnkudHlwZSwgdHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudENvbXBhbnkudHlwZVswXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTZXNzaW9uQ29tcGFueShjb21wYW55SWQ6IG51bWJlcikge1xuICAgIHJldHVybiB0aGlzLmNvbXBhbnlTZXJ2aWNlLmdldENvbXBhbnkoY29tcGFueUlkKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlOiB7W2tleTogc3RyaW5nXTogYW55fSkgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnRDb21wYW55ID0gcmVzcG9uc2UuY29tcGFueTtcbiAgICAgICAgdGhpcy5kaXJlY3RHdWlkID0gcmVzcG9uc2UuY29tcGFueS5kaXJlY3RUcmFja2luZ0luZm9Bc3NpZ25tZW50R3VpZDtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9KVxuICB9XG5cbiAgcHVibGljIGdldENvbXBhbnlDb250ZXh0KCl7XG4gICAgaWYodGhpcy5jb21wYW55Q29udGV4dE1vZGVsKXtcbiAgICAgIHJldHVybiB0aGlzLmNvbXBhbnlDb250ZXh0TW9kZWwuaWRcbiAgICB9XG4gICAgcmV0dXJuIFwiXCJcbiAgfVxuXG4gIHB1YmxpYyBnZXRDb21wYW55Q29udGV4dE5hbWUoKXtcbiAgICBpZih0aGlzLmNvbXBhbnlDb250ZXh0TW9kZWwpe1xuICAgICAgcmV0dXJuIHRoaXMuY29tcGFueUNvbnRleHRNb2RlbC5kZXNjcmlwdGlvblxuICAgIH1cbiAgICByZXR1cm4gXCJcIlxuICB9XG5cbiAgcHVibGljIHNldENvbXBhbnlDb250ZXh0KGNvbXBhbnlDb250ZXh0KXtcbiAgICB0aGlzLmNvbXBhbnlDb250ZXh0TW9kZWwgPSBjb21wYW55Q29udGV4dFxuICB9XG5cbiAgcHVibGljIGdldCBpc1JhaWxFdmVudEZpbHRlcnNBcHBsaWNhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrUmFpbENvbmZpZ3VyYXRpb24oJ3Nob3dSYWlsRXZlbnRGaWx0ZXJzJyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzT2NlYW5FdmVudEZpbHRlcnNBcHBsaWNhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrUmFpbENvbmZpZ3VyYXRpb24oJ3Nob3dPY2VhbkV2ZW50RmlsdGVycycpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0xhdGVzdEV2ZW50RmlsdGVyc0FwcGxpY2FibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tSYWlsQ29uZmlndXJhdGlvbignc2hvd0xhdGVzdEV2ZW50Jyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzRGlzcGxheVJlcG9ydGluZ1JhaWxyb2FkQXBwbGljYWJsZSgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLmNoZWNrUmFpbENvbmZpZ3VyYXRpb24oJ2Rpc3BsYXlSZXBvcnRpbmdSYWlscm9hZCcpO1xuICB9XG5cbiAgcHVibGljIGdldCBpc0Rpc3BsYXlFdmVudE9uQ2hlY2tjYWxsQXBwbGljYWJsZSgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLmNoZWNrUmFpbENvbmZpZ3VyYXRpb24oXCJkaXNwbGF5RXZlbnRPbkNoZWNrY2FsbFwiKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNEaXNwbGF5VHJhaW5JZEFwcGxpY2FibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tSYWlsQ29uZmlndXJhdGlvbignZGlzcGxheVRyYWluSWQnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNEaXNwbGF5TG9hZGVkT3JFbXB0eUFwcGxpY2FibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tSYWlsQ29uZmlndXJhdGlvbignZGlzcGxheUxvYWRlZE9yRW1wdHknKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tSYWlsQ29uZmlndXJhdGlvbihjb25maWdOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50Q29tcGFueSAmJiB0aGlzLmN1cnJlbnRDb21wYW55LnJhaWxDb25maWd1cmF0aW9uICYmIHRoaXMuY3VycmVudENvbXBhbnkucmFpbENvbmZpZ3VyYXRpb25bY29uZmlnTmFtZV07XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEF1dGhDb25maWcgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2F1dGgtY29uZmlnLmNvbnN0YW50XCI7XG5pbXBvcnQgeyBDb21wYW55Q29udGV4dFNlcnZpY2UgfSBmcm9tIFwiLi9jb21wYW55LWNvbnRleHQuc2VydmljZVwiO1xuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tIFwiLi9zdG9yYWdlLnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgQ29uZmlnSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvY29uZmlnLmhlbHBlclwiO1xuXG5ASW5qZWN0YWJsZSgpXG5cbmV4cG9ydCBjbGFzcyBTZWN1cml0eVNlcnZpY2Uge1xuICBwdWJsaWMgc3RhdGljIGN1cnJlbnRVc2VyOiB7W2tleTpzdHJpbmddOiBhbnl9ID0gbnVsbFxuICBwdWJsaWMgc3RhdGljIGNvbXBhbnlUaW1lOiB7W2tleTpzdHJpbmddOiBhbnl9ID0gbnVsbFxuXG4gIHByaXZhdGUgbG9naW5Vcmw6IHN0cmluZyA9IFwiL2FwaS92MS91c2Vycy9sb2dpblwiXG4gIHByaXZhdGUgdG9rZW5Vcmw6IHN0cmluZyA9IFwiL3Nzby91c2VyX2J5X3Rva2VuXCJcbiAgcHJpdmF0ZSBsb2dvdXRVcmw6IHN0cmluZyA9IFwiL2FwaS92MS91c2Vycy9sb2dvdXRcIlxuICBwcml2YXRlIHZhbGlkYXRlVG9rZW5Vcmw6IHN0cmluZyA9IFwiL2FwaS92MS91c2Vycy92YWxpZGF0ZV9hdXRoX3Rva2VuXCJcbiAgcHJpdmF0ZSBjdXJyZW50SG9zdDogc3RyaW5nID0gdGhpcy5kb2N1bWVudC5sb2NhdGlvbi5vcmlnaW4gKyAodGhpcy5kb2N1bWVudC5sb2NhdGlvbi5ob3N0bmFtZS5pbmRleE9mKCdsb2NhbGhvc3QnKSA+IC0xID8gJy9idWlsZCcgOiAnJyk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb21wYW55Q29udGV4dFNlcnZpY2U6IENvbXBhbnlDb250ZXh0U2VydmljZSxcbiAgICBwcml2YXRlIHRmU3RvcmFnZTogU3RvcmFnZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueVxuICApe31cblxuICBwcml2YXRlIGdldCB1c2VyU2VydmljZVVybCgpIHtcbiAgICByZXR1cm4gQ29uZmlnSGVscGVyLmVudmlyb25tZW50LnVzZXJTZXJ2aWNlVXJsO1xuICB9XG5cbiAgcHVibGljIGdldCBjb21wYW55VGltZSgpIHtcbiAgICByZXR1cm4gU2VjdXJpdHlTZXJ2aWNlLmNvbXBhbnlUaW1lO1xuICB9XG5cbiAgcHVibGljIHNob3VsZFJlZGlyZWN0VG9aZW5kZXNrU3VwcG9ydCgpOiBib29sZWFuIHtcbiAgICBjb25zdCB1cmwgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuICAgIGNvbnN0IHBhdHRlcm4gPSBuZXcgUmVnRXhwKFwicmV0dXJuX3RvXCIpO1xuICAgIGNvbnN0IHN0ciA9IHBhdHRlcm4udGVzdCh1cmwpO1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBwdWJsaWMgaXNSZWRpcmVjdEZyb21UaGlyZFBhcnR5U1NPKCkge1xuICAgIGNvbnN0IGNvbXBhbnlOYW1lID0gdGhpcy50ZlN0b3JhZ2UucmV0cml2ZUZyb21Db29raWUoJ2lucHV0Q29tcGFueU5hbWUnKTtcbiAgICBjb25zdCBpc0FsbG93ZWQgPSAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQoKTtcbiAgICBpZiAoY29tcGFueU5hbWUgJiYgaXNBbGxvd2VkKSB7XG4gICAgICB0aGlzLnRmU3RvcmFnZS5zZXREb21haW4oJ2ZvdXJraXRlcy5jb20nKTtcbiAgICAgIHRoaXMudGZTdG9yYWdlLmNsZWFyRnJvbUNvb2tpZSgnaW5wdXRDb21wYW55TmFtZScpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyByZWRpcmVjdFRvWmVuZGVza1N1cHBvcnQoKSB7XG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy51c2VyU2VydmljZVVybH0vYXBpL3YxL3VzZXJzL2dldF9qd3RgO1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ0lTX1pFTkRFU0tfUkVESVJFQ1RfSU5fUFJPR1JFU1MnLCBcInRydWVcIik7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKS50b1Byb21pc2UoKS50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgaWYgKHJlcyAmJiByZXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXMuZGF0YS5yZWRpcmVjdFVyaTtcbiAgICAgIH1cbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnRVJST1IgUkVESVJFQ1RJTkcgVE8gWkVOREVTSycsIG5ldyBEYXRlKCkpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGxvZ2luKGxvZ2luUGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IFByb21pc2U8e1trZXk6IHN0cmluZ106IGFueX0+IHtcbiAgICBsZXQgcmVxdWVzdEJvZHkgPSB7XG4gICAgICB1c2VybmFtZTogbG9naW5QYXJhbXMuZW1haWwsXG4gICAgICBwYXNzd29yZDogbG9naW5QYXJhbXMucGFzc3dvcmQsXG4gICAgICByZW1lbWJlck1lOiBsb2dpblBhcmFtcy5yZW1lbWJlcixcbiAgICAgIGRldmljZUlkOiB0aGlzLnRmU3RvcmFnZS5yZXRyaXZlKEF1dGhDb25maWcuREVWSUNFX0lEKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5nZXRGdWxsTG9naW5VcmwoKSwgcmVxdWVzdEJvZHkpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpZihyZXNwb25zZSAmJiByZXNwb25zZVsnc3RhdHVzQ29kZSddID09PSAyMDApe1xuICAgICAgICAgIFNlY3VyaXR5U2VydmljZS5jdXJyZW50VXNlciA9IHRoaXMudXBkYXRlV2l0aENvbXB1dGVkQXR0cmlidXRlcyhyZXNwb25zZVsndXNlciddKVxuICAgICAgICAgIHRoaXMudGZTdG9yYWdlLnN0b3JlSW5Db29raWUoQXV0aENvbmZpZy5BVVRILCByZXNwb25zZVsnYXV0aFRva2VuJ10pXG4gICAgICAgICAgdGhpcy50ZlN0b3JhZ2Uuc3RvcmVJbkNvb2tpZShBdXRoQ29uZmlnLlVTRVIsIFNlY3VyaXR5U2VydmljZS5jdXJyZW50VXNlcilcbiAgICAgICAgICB0aGlzLnRmU3RvcmFnZS5zdG9yZUluQ29va2llKEF1dGhDb25maWcuVVNFUl9JRCwgU2VjdXJpdHlTZXJ2aWNlLmN1cnJlbnRVc2VyWyd1c2VySWQnXSlcbiAgICAgICAgICBpZihsb2dpblBhcmFtcy5yZW1lbWJlcil7XG4gICAgICAgICAgICB0aGlzLnRmU3RvcmFnZS5zdG9yZShBdXRoQ29uZmlnLkFVVEgsIHJlc3BvbnNlWydhdXRoVG9rZW4nXSlcbiAgICAgICAgICAgIHRoaXMudGZTdG9yYWdlLnN0b3JlKEF1dGhDb25maWcuVVNFUiwgU2VjdXJpdHlTZXJ2aWNlLmN1cnJlbnRVc2VyKVxuICAgICAgICAgICAgdGhpcy50ZlN0b3JhZ2Uuc3RvcmUoQXV0aENvbmZpZy5VU0VSX0lELCBTZWN1cml0eVNlcnZpY2UuY3VycmVudFVzZXJbXCJ1c2VySWRcIl0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGZTdG9yYWdlLmNsZWFyKEF1dGhDb25maWcuQVVUSClcbiAgICAgICAgICAgIHRoaXMudGZTdG9yYWdlLmNsZWFyKEF1dGhDb25maWcuVVNFUilcbiAgICAgICAgICAgIHRoaXMudGZTdG9yYWdlLmNsZWFyKEF1dGhDb25maWcuVVNFUl9JRClcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy50ZlN0b3JhZ2Uuc3RvcmUoQXV0aENvbmZpZy5ERVZJQ0VfSUQsIHJlc3BvbnNlWydkZXZpY2VJZCddKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfLmV4dGVuZChyZXNwb25zZSwge1xuICAgICAgICAgIGxvZ2dlZEluOiB0aGlzLmlzQXV0aGVudGljYXRlZCgpXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnJvcilcbiAgICAgICAgcmV0dXJuIF8uZXh0ZW5kKGVycm9yLCB7XG4gICAgICAgICAgbG9nZ2VkSW46IHRoaXMuaXNBdXRoZW50aWNhdGVkKClcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRVc2VyQnlUb2tlbih0b2tlbik6IFByb21pc2U8e1trZXk6IHN0cmluZ106IGFueX0+e1xuICAgIHRoaXMuY29tcGFueUNvbnRleHRTZXJ2aWNlLnNldENvbXBhbnlDb250ZXh0KG51bGwpXG4gICAgbGV0IHBhcmFtcyA9IHsgdG9rZW4gfVxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuZ2V0RnVsbFRva2VuVXJsKCksIHsgcGFyYW1zIH0pXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBpZihyZXNwb25zZSAmJiByZXNwb25zZVsnc3RhdHVzQ29kZSddID09PSAyMDApe1xuICAgICAgICAgIFNlY3VyaXR5U2VydmljZS5jdXJyZW50VXNlciA9IHRoaXMudXBkYXRlV2l0aENvbXB1dGVkQXR0cmlidXRlcyhyZXNwb25zZVsndXNlciddKVxuICAgICAgICAgIHRoaXMudGZTdG9yYWdlLnN0b3JlKEF1dGhDb25maWcuREVWSUNFX0lELCByZXNwb25zZVsnZGV2aWNlSWQnXSlcbiAgICAgICAgICB0aGlzLnRmU3RvcmFnZS5zdG9yZUluQ29va2llKEF1dGhDb25maWcuVVNFUiwgU2VjdXJpdHlTZXJ2aWNlLmN1cnJlbnRVc2VyKVxuICAgICAgICAgIHRoaXMudGZTdG9yYWdlLnN0b3JlSW5Db29raWUoQXV0aENvbmZpZy5VU0VSX0lELCBTZWN1cml0eVNlcnZpY2UuY3VycmVudFVzZXJbJ3VzZXJJZCddKVxuICAgICAgICAgIHRoaXMudGZTdG9yYWdlLnN0b3JlSW5Db29raWUoQXV0aENvbmZpZy5BVVRILCByZXNwb25zZVsnYXV0aFRva2VuJ10pXG4gICAgICAgICAgdGhpcy50ZlN0b3JhZ2Uuc3RvcmUoQXV0aENvbmZpZy5BVVRILCByZXNwb25zZVsnYXV0aFRva2VuJ10pXG4gICAgICAgICAgdGhpcy50ZlN0b3JhZ2Uuc3RvcmUoQXV0aENvbmZpZy5VU0VSLCBTZWN1cml0eVNlcnZpY2UuY3VycmVudFVzZXIpXG4gICAgICAgICAgdGhpcy50ZlN0b3JhZ2Uuc3RvcmUoQXV0aENvbmZpZy5VU0VSX0lELCBTZWN1cml0eVNlcnZpY2UuY3VycmVudFVzZXJbXCJ1c2VySWRcIl0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlXG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCgpXG4gICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpXG4gICAgICAgIHJldHVybiBlcnJvclxuICAgICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBsb2dvdXQoKTogUHJvbWlzZTx7W2tleTogc3RyaW5nXTogYW55fT57XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUodGhpcy5nZXRGdWxsTG9nb3V0VXJsKCkpXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLmRlbGV0ZUF1dGhUb2tlbihyZXNwb25zZSlcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlXG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICB0aGlzLmRlbGV0ZUF1dGhUb2tlbih7fSlcbiAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnJvcilcbiAgICAgICAgcmV0dXJuIGVycm9yXG4gICAgICB9KVxuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlQXV0aFRva2VuKCk6IFByb21pc2U8e1trZXk6IHN0cmluZ106IGFueX0+e1xuICAgIGxldCBib2R5ID0ge31cbiAgICBpZih0aGlzLmNvbXBhbnlDb250ZXh0U2VydmljZS5jb21wYW55Q29udGV4dE1vZGVsKXtcbiAgICAgIGJvZHlbJ2NvbXBhbnlfaWQnXSA9IHRoaXMuY29tcGFueUNvbnRleHRTZXJ2aWNlLmdldENvbXBhbnlDb250ZXh0KClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuZ2V0RnVsbFZhbGlkYXRlVG9rZW5VcmwoKSwgYm9keSlcbiAgICAgIC50b1Byb21pc2UoKVxuICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmKHJlc3BvbnNlICYmIHJlc3BvbnNlWydzdGF0dXNDb2RlJ10gPT09IDIwMCl7XG4gICAgICAgICAgU2VjdXJpdHlTZXJ2aWNlLmN1cnJlbnRVc2VyID0gdGhpcy51cGRhdGVXaXRoQ29tcHV0ZWRBdHRyaWJ1dGVzKHJlc3BvbnNlWyd1c2VyJ10pXG4gICAgICAgICAgU2VjdXJpdHlTZXJ2aWNlLmNvbXBhbnlUaW1lID0ge1xuICAgICAgICAgICAgY29tcGFueVRpbWVGb3JtYXQ6IHJlc3BvbnNlWydjb21wYW55VGltZUZvcm1hdCddLFxuICAgICAgICAgICAgY29tcGFueVRpbWVab25lTmFtZTogcmVzcG9uc2VbJ2NvbXBhbnlUaW1lWm9uZU5hbWUnXSxcbiAgICAgICAgICAgIGNvbXBhbnlUaW1lWm9uZU9mZnNldDogcmVzcG9uc2VbJ2NvbXBhbnlUaW1lWm9uZU9mZnNldCddXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudGZTdG9yYWdlLnN0b3JlSW5Db29raWUoQXV0aENvbmZpZy5DT01QQU5ZX1RJTUUsIFNlY3VyaXR5U2VydmljZS5jb21wYW55VGltZSlcbiAgICAgICAgICB0aGlzLnRmU3RvcmFnZS5zdG9yZShBdXRoQ29uZmlnLkRFVklDRV9JRCwgcmVzcG9uc2VbJ2RldmljZUlkJ10pXG4gICAgICAgICAgdGhpcy50ZlN0b3JhZ2Uuc3RvcmVJbkNvb2tpZShBdXRoQ29uZmlnLlVTRVIsIFNlY3VyaXR5U2VydmljZS5jdXJyZW50VXNlcilcbiAgICAgICAgICB0aGlzLnRmU3RvcmFnZS5zdG9yZUluQ29va2llKEF1dGhDb25maWcuVVNFUl9JRCwgU2VjdXJpdHlTZXJ2aWNlLmN1cnJlbnRVc2VyWyd1c2VySWQnXSlcbiAgICAgICAgICB0aGlzLnRmU3RvcmFnZS5zdG9yZUluQ29va2llKEF1dGhDb25maWcuQVVUSCwgcmVzcG9uc2VbJ2F1dGhUb2tlbiddKVxuICAgICAgICAgIHRoaXMudGZTdG9yYWdlLnN0b3JlKEF1dGhDb25maWcuQVVUSCwgcmVzcG9uc2VbJ2F1dGhUb2tlbiddKVxuICAgICAgICAgIHRoaXMudGZTdG9yYWdlLnN0b3JlKEF1dGhDb25maWcuVVNFUiwgU2VjdXJpdHlTZXJ2aWNlLmN1cnJlbnRVc2VyKVxuICAgICAgICAgIHRoaXMudGZTdG9yYWdlLnN0b3JlKEF1dGhDb25maWcuVVNFUl9JRCwgU2VjdXJpdHlTZXJ2aWNlLmN1cnJlbnRVc2VyW1widXNlcklkXCJdKVxuICAgICAgICAgIHRoaXMudGZTdG9yYWdlLnN0b3JlKEF1dGhDb25maWcuQ09NUEFOWV9USU1FLCBTZWN1cml0eVNlcnZpY2UuY29tcGFueVRpbWUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlXG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IgJiYgZXJyb3Iuc3RhdHVzICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKXtcbiAgICAgICAgICB0aGlzLmRlbGV0ZUF1dGhUb2tlbih7fSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycm9yKVxuICAgICAgICByZXR1cm4gZXJyb3JcbiAgICAgIH0pXG4gIH1cblxuICBwdWJsaWMgdXBkYXRlV2l0aENvbXB1dGVkQXR0cmlidXRlcyh1c2VyKXtcbiAgICBsZXQgbW9kdWxlcyA9IHVzZXIubW9kdWxlcyB8fCBbXVxuICAgIGxldCBwZXJtaXNzaW9ucyA9IHVzZXIucGVybWlzc2lvbnMgfHwge31cbiAgICBsZXQgcGFja2FnZVJlc3RyaWN0aW9ucyA9IHVzZXIucGFja2FnZVJlc3RyaWN0aW9ucyB8fCB0aGlzLmRlZmF1bHRQYWNrYWdlUmVzdHJpY3Rpb25zXG4gICAgbGV0IGlzUmVhbFRpbWVOb3RpZmljYXRpb25FbmFibGVkID0gdXNlci5yZWFsVGltZU5vdGlmaWNhdGlvbiAmJiB1c2VyLnJlYWxUaW1lTm90aWZpY2F0aW9uLmVuYWJsZWQgJiYgdXNlci5yZWFsVGltZU5vdGlmaWNhdGlvbi5zdWJzY3JpcHRpb25LZXlcbiAgICBsZXQgaW5zaWdodHNMaXNjZW5zZWRCdWNrZXRzID0gdXNlci5pbnNpZ2h0c0xpY2Vuc2VkQnVja2V0cyB8fCBbXTtcblxuICAgIGxldCBjb21wdXRlZEF0dHJpYnV0ZXMgPSB0aGlzLmNvbXB1dGVBdHRyaWJ1dGVzKHVzZXIsIG1vZHVsZXMsIHBlcm1pc3Npb25zLCBwYWNrYWdlUmVzdHJpY3Rpb25zLCBpbnNpZ2h0c0xpc2NlbnNlZEJ1Y2tldHMpXG5cbiAgICByZXR1cm4gXy5leHRlbmQodXNlciwgY29tcHV0ZWRBdHRyaWJ1dGVzKVxuICB9XG5cbiAgcHVibGljIGlzQXV0aGVudGljYXRlZCgpOiBib29sZWFuIHtcbiAgICBpZih0aGlzLnRmU3RvcmFnZS5yZXRyaXZlKEF1dGhDb25maWcuVVNFUl9JRCkpIHtcbiAgICAgIGxldCB1c2VySWQgPSB0aGlzLnRmU3RvcmFnZS5yZXRyaXZlKEF1dGhDb25maWcuVVNFUl9JRCk7XG4gICAgICB0aGlzLnRmU3RvcmFnZS5zdG9yZUluQ29va2llKEF1dGhDb25maWcuVVNFUl9JRCwgdXNlcklkKTtcbiAgICB9XG4gICAgaWYodGhpcy50ZlN0b3JhZ2UucmV0cml2ZShBdXRoQ29uZmlnLkFVVEgpKSB7XG4gICAgICBsZXQgYXV0aCA9IHRoaXMudGZTdG9yYWdlLnJldHJpdmUoQXV0aENvbmZpZy5BVVRIKTtcbiAgICAgIHRoaXMudGZTdG9yYWdlLnN0b3JlSW5Db29raWUoQXV0aENvbmZpZy5BVVRILCBhdXRoKTtcbiAgICB9XG4gICAgaWYodGhpcy50ZlN0b3JhZ2UucmV0cml2ZShBdXRoQ29uZmlnLlVTRVIpKSB7XG4gICAgICBsZXQgdXNlciA9IHRoaXMudGZTdG9yYWdlLnJldHJpdmUoQXV0aENvbmZpZy5VU0VSKTtcbiAgICAgIHRoaXMudGZTdG9yYWdlLnN0b3JlSW5Db29raWUoQXV0aENvbmZpZy5VU0VSLCB1c2VyKTtcbiAgICB9XG4gICAgaWYodGhpcy50ZlN0b3JhZ2UucmV0cml2ZShBdXRoQ29uZmlnLkNPTVBBTllfVElNRSkpIHtcbiAgICAgIGxldCBjb21wYW55VGltZSA9IHRoaXMudGZTdG9yYWdlLnJldHJpdmUoQXV0aENvbmZpZy5DT01QQU5ZX1RJTUUpO1xuICAgICAgdGhpcy50ZlN0b3JhZ2Uuc3RvcmVJbkNvb2tpZShBdXRoQ29uZmlnLkNPTVBBTllfVElNRSwgY29tcGFueVRpbWUpXG4gICAgfVxuICAgIHJldHVybiAhIXRoaXMuY3VycmVudFVzZXJcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGV2aWNlSWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50ZlN0b3JhZ2UucmV0cml2ZShBdXRoQ29uZmlnLkRFVklDRV9JRCkgfHwgbnVsbFxuICB9XG5cbiAgcHVibGljIGdldCB1c2VySWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50ZlN0b3JhZ2UucmV0cml2ZUZyb21Db29raWUoQXV0aENvbmZpZy5VU0VSX0lEKSB8fCBudWxsXG4gIH1cblxuICBwdWJsaWMgZ2V0IGN1cnJlbnRVc2VyKCkge1xuICAgIGlmKF8uaXNFbXB0eShTZWN1cml0eVNlcnZpY2UuY3VycmVudFVzZXIpKXtcbiAgICAgIFNlY3VyaXR5U2VydmljZS5jdXJyZW50VXNlciA9IHRoaXMudGZTdG9yYWdlLnJldHJpdmUoQXV0aENvbmZpZy5VU0VSKVxuICAgIH1cbiAgICByZXR1cm4gU2VjdXJpdHlTZXJ2aWNlLmN1cnJlbnRVc2VyXG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzU3VwZXJBZG1pbigpe1xuICAgIGlmKCF0aGlzLmN1cnJlbnRVc2VyKXtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50VXNlci5zdXBlckFkbWluXG4gIH1cblxuICBwcml2YXRlIGdldCBkZWZhdWx0UGFja2FnZVJlc3RyaWN0aW9ucygpe1xuICAgIHJldHVybiB7XG4gICAgICBzaG93VXNlckFjY2Vzc0FuZFJvbGVzTW9kdWxlOiB0cnVlLFxuICAgICAgc2hvd090aGVyRGV0YWlsc0luTG9hZDogdHJ1ZSxcbiAgICAgIGFsbG93Q3JlYXRpbmdOb3RpZmljYXRpb25SdWxlczogdHJ1ZSxcbiAgICAgIGFsbG93Q3JlYXRpbmdVc2VyczogdHJ1ZSxcbiAgICAgIGFsbG93U2luZ2xlU2lnbk9uOiB0cnVlXG4gICAgfVxuICB9XG5cbiAgcHVibGljIG1hbmRhdGVUd29GYWN0b3IodmFsdWUpIHtcbiAgICB0aGlzLnRmU3RvcmFnZS5zdG9yZShcImVuYWJsZS0yZmFcIiwgdmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdldCBlbmFibGVUd29GYWN0b3IoKSB7XG4gICAgcmV0dXJuIHRoaXMudGZTdG9yYWdlLnJldHJpdmUoXCJlbmFibGUtMmZhXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc01vZHVsZUVuYWJsZWQobW9kdWxlczogU3RyaW5nW10sIG1vZHVsZV90b19jaGVjazogU3RyaW5nKTogYm9vbGVhbntcbiAgICByZXR1cm4gbW9kdWxlcy5pbmRleE9mKG1vZHVsZV90b19jaGVjaykgIT0gLTFcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGVBdXRoVG9rZW4obG9nb3V0UmVzcG9uc2Upe1xuICAgIGxldCB1c2VyID0gdGhpcy50ZlN0b3JhZ2UucmV0cml2ZUZyb21Db29raWUoQXV0aENvbmZpZy5VU0VSKVxuICAgIFNlY3VyaXR5U2VydmljZS5jdXJyZW50VXNlciA9IG51bGxcbiAgICB0aGlzLnRmU3RvcmFnZS5jbGVhcihBdXRoQ29uZmlnLkFVVEgpXG4gICAgdGhpcy50ZlN0b3JhZ2UuY2xlYXIoQXV0aENvbmZpZy5VU0VSKVxuICAgIHRoaXMudGZTdG9yYWdlLmNsZWFyKEF1dGhDb25maWcuVVNFUl9JRClcbiAgICB0aGlzLnRmU3RvcmFnZS5jbGVhcihBdXRoQ29uZmlnLkNPTVBBTllfVElNRSlcbiAgICB0aGlzLnRmU3RvcmFnZS5jbGVhckZyb21Db29raWUoQXV0aENvbmZpZy5BVVRIKVxuICAgIHRoaXMudGZTdG9yYWdlLmNsZWFyRnJvbUNvb2tpZShBdXRoQ29uZmlnLlVTRVIpXG4gICAgdGhpcy50ZlN0b3JhZ2UuY2xlYXJGcm9tQ29va2llKEF1dGhDb25maWcuQ09NUEFOWV9USU1FKVxuICAgIHRoaXMudGZTdG9yYWdlLmNsZWFyRnJvbUNvb2tpZShBdXRoQ29uZmlnLlVTRVJfSUQpXG4gICAgdGhpcy50ZlN0b3JhZ2UuY2xlYXIoQXV0aENvbmZpZy5FTkFCTEVfMkZBKVxuICAgIGlmIChsb2dvdXRSZXNwb25zZSAmJiBsb2dvdXRSZXNwb25zZS5yZWRpcmVjdFVyaSkge1xuICAgICAgLy8gVE9ETzogcmVkaXJlY3RUbyB0byB2aWV3IGZsb3dcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nb1RvU2lnbmluKCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgZ29Ub1NpZ25pbigpOnZvaWR7XG4gICAgdGhpcy5kb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdGhpcy5jdXJyZW50SG9zdCArIFwiLyMvc2lnbmluXCI7XG4gIH1cbiAgcHJpdmF0ZSBjb21wdXRlQXR0cmlidXRlcyh1c2VyLCBtb2R1bGVzLCBwZXJtaXNzaW9ucywgcGFja2FnZVJlc3RyaWN0aW9ucywgaW5zaWdodHNMaXNjZW5zZWRCdWNrZXRzKXtcbiAgICBsZXQgY29tcHV0ZWRBdHRyaWJ1dGVzID0ge1xuICAgICAgc2hvd1RyYWNraW5nTW9kdWxlOiB0aGlzLmlzTW9kdWxlRW5hYmxlZChtb2R1bGVzLCBcInRyYWNraW5nXCIpICYmIHBlcm1pc3Npb25zWydsb2FkcyddWyd2aWV3J10sXG4gICAgICBzaG93VG9vbHNNb2R1bGU6IHVzZXIuc3VwZXJBZG1pbixcbiAgICAgIHNob3dBZG1pbk1vZHVsZTogdGhpcy5pc01vZHVsZUVuYWJsZWQobW9kdWxlcywgXCJhZG1pblwiKSxcbiAgICAgIHNob3dSZXBvcnRzTW9kdWxlOiB0aGlzLmlzTW9kdWxlRW5hYmxlZChtb2R1bGVzLCBcInRyYWNraW5nLXJlcG9ydHNcIikgJiYgcGVybWlzc2lvbnMudHJhY2tpbmdSZXBvcnRzICYmIHBlcm1pc3Npb25zLnRyYWNraW5nUmVwb3J0cy5leGVjdXRlLFxuICAgICAgc2hvd0FuYWx5dGljc01vZHVsZTogdXNlci5pc0FuYWx5dGljc0VuYWJsZWQgJiYgKCh1c2VyLnN1cGVyQWRtaW4gJiYgdGhpcy5jb21wYW55Q29udGV4dFNlcnZpY2UuZ2V0Q29tcGFueUNvbnRleHQoKSkgfHwgdGhpcy5pc01vZHVsZUVuYWJsZWQobW9kdWxlcywgXCJpbnNpZ2h0c1wiKSksXG4gICAgICBzaG93VHJhY2tpbmdDb25zaXN0ZW5jeTogaW5zaWdodHNMaXNjZW5zZWRCdWNrZXRzLmluZGV4T2YoXCJUQ1wiKSE9IC0xLCAgICAgIFxuICAgICAgc2hvd0JlbmNoTWFya2luZzogaW5zaWdodHNMaXNjZW5zZWRCdWNrZXRzLmluZGV4T2YoXCJCTVwiKSE9IC0xLFxuICAgICAgc2hvd1BlcmZvcm1hbmNlQW5hbHl0aWNzOiBpbnNpZ2h0c0xpc2NlbnNlZEJ1Y2tldHMuaW5kZXhPZihcIlBBXCIpIT0gLTEsXG4gICAgICBzaG93U3Vic2NyaXB0aW9uOiAhXy5pc0VtcHR5KF8uaW50ZXJzZWN0aW9uKHVzZXIuY29tcGFueVR5cGUsIFsnc2hpcHBlcicsICczcGwnLCAnY2FycmllciddKSkgJiYgIV8uaXNFbXB0eShfLmludGVyc2VjdGlvbihpbnNpZ2h0c0xpc2NlbnNlZEJ1Y2tldHMsIFsnVEMnLCAnUEEnXSkpLFxuICAgICAgc2hvd1VzZXJHcm91cHNNb2R1bGU6IHVzZXIuc3VwZXJBZG1pbiB8fCB0aGlzLmlzTW9kdWxlRW5hYmxlZChtb2R1bGVzLCAnY3VzdG9tLXVzZXItZ3JvdXBzJyksXG4gICAgICBzaG93QXBwbGVzc01hbmFnZW1lbnQ6IHRoaXMuaXNNb2R1bGVFbmFibGVkKG1vZHVsZXMsICdhcHAtbGVzcy1tYW5hZ2VtZW50JykgJiYgcGVybWlzc2lvbnNbJ2xvYWRzJ10gJiYgcGVybWlzc2lvbnNbJ2xvYWRzJ11bJ3VwZGF0ZSddIHx8IHVzZXIuc3VwZXJBZG1pbixcbiAgICAgIHNob3dVc2VyQWNjZXNzQW5kUm9sZXNNb2R1bGU6IHBhY2thZ2VSZXN0cmljdGlvbnMuc2hvd1VzZXJBY2Nlc3NBbmRSb2xlc01vZHVsZSxcbiAgICAgIHNob3dDb21wbGV0ZVRyYWNraW5nSW5mbzogdGhpcy5pc01vZHVsZUVuYWJsZWQobW9kdWxlcywgXCJ0cmFja2luZy1lbGRcIiksXG4gICAgICBzaG93T3RoZXJEZXRhaWxzSW5Mb2FkOiBwYWNrYWdlUmVzdHJpY3Rpb25zLnNob3dPdGhlckRldGFpbHNJbkxvYWQsXG4gICAgICBhbGxvd0NyZWF0aW5nTm90aWZpY2F0aW9uUnVsZXM6IHBhY2thZ2VSZXN0cmljdGlvbnMuYWxsb3dDcmVhdGluZ05vdGlmaWNhdGlvblJ1bGVzLFxuICAgICAgYWxsb3dDcmVhdGluZ1VzZXJzOiBwYWNrYWdlUmVzdHJpY3Rpb25zLmFsbG93Q3JlYXRpbmdVc2VycyxcbiAgICAgIGFsbG93U2luZ2xlU2lnbk9uOiBwYWNrYWdlUmVzdHJpY3Rpb25zLmFsbG93U2luZ2xlU2lnbk9uLFxuICAgICAgc2hvd0ZhY2lsaXR5TWFuYWdlck1vZHVsZTogdGhpcy5pc01vZHVsZUVuYWJsZWQobW9kdWxlcywnZmFjaWxpdHktbWFuYWdlcicpICYmIHVzZXIuc3VwZXJBZG1pbixcbiAgICAgIHNob3dBcHBvaW5tZW50TWFuYWdlck1vZHVsZTogdGhpcy5pc01vZHVsZUVuYWJsZWQobW9kdWxlcywnYXBwb2ludG1lbnQtbWFuYWdlcicpLFxuICAgICAgc2hvd0NhcnJpZXJGaWVsZDogIV8uaXNFbXB0eShfLmludGVyc2VjdGlvbih1c2VyLmNvbXBhbnlUeXBlLCBbJ3NoaXBwZXInLCAnM3BsJywgJ2Jyb2tlciddKSksXG4gICAgICBpc1JlYWxUaW1lTm90aWZpY2F0aW9uRW5hYmxlZDogdXNlci5yZWFsVGltZU5vdGlmaWNhdGlvbiAmJiB1c2VyLnJlYWxUaW1lTm90aWZpY2F0aW9uLmVuYWJsZWQgJiYgdXNlci5yZWFsVGltZU5vdGlmaWNhdGlvbi5zdWJzY3JpcHRpb25LZXksXG4gICAgICBzaG93TWFwQXV0b1JlZnJlc2g6IHVzZXIucmVhbFRpbWVOb3RpZmljYXRpb24gJiYgdXNlci5yZWFsVGltZU5vdGlmaWNhdGlvbi5lbmFibGVkICYmIHVzZXIucmVhbFRpbWVOb3RpZmljYXRpb24uc3Vic2NyaXB0aW9uS2V5ICYmIHRoaXMuaXNNb2R1bGVFbmFibGVkKG1vZHVsZXMsICdtYXAtYXV0by1yZWZyZXNoLWxvYWRzJyksXG4gICAgICBzaG93VGVtcGVyYXR1cmVUcmFja2luZ01vZHVsZTogdGhpcy5pc01vZHVsZUVuYWJsZWQobW9kdWxlcywgJ3RlbXBlcmF0dXJlLXRyYWNraW5nJykgJiYgcGVybWlzc2lvbnMudGVtcGVyYXR1cmVUcmFja2luZ1NldHRpbmdzICYmIHBlcm1pc3Npb25zLnRlbXBlcmF0dXJlVHJhY2tpbmdTZXR0aW5ncy52aWV3LFxuICAgICAgZWRpdFRlbXBlcmF0dXJlVHJhY2tpbmdNb2R1bGU6IHRoaXMuaXNNb2R1bGVFbmFibGVkKG1vZHVsZXMsICd0ZW1wZXJhdHVyZS10cmFja2luZycpICYmIHBlcm1pc3Npb25zLnRlbXBlcmF0dXJlVHJhY2tpbmdTZXR0aW5ncyAmJiBwZXJtaXNzaW9ucy50ZW1wZXJhdHVyZVRyYWNraW5nU2V0dGluZ3MuY3JlYXRlLFxuICAgICAgc2hvd1dlYXRoZXJBbGVydHNNb2R1bGU6IHRoaXMuaXNNb2R1bGVFbmFibGVkKG1vZHVsZXMsICd3ZWF0aGVyLWFsZXJ0cycpLFxuICAgICAgc2hvd1NNU01vZHVsZTogdGhpcy5pc01vZHVsZUVuYWJsZWQobW9kdWxlcywgJ3Ntcy1ub3RpZmljYXRpb24nKSxcbiAgICAgIGRlZmF1bHRSb3V0ZTogJy9kYXNoYm9hcmQnLFxuICAgICAgc2hvd1Vwc3RyZWFtVmlzaWJpbGl0eTogdGhpcy5pc01vZHVsZUVuYWJsZWQobW9kdWxlcywgJ3Vwc3RyZWFtLXZpc2liaWxpdHknKVxuICAgIH1cblxuICAgIC8vIERFRkFVTFQgUk9VVEVTIEJBU0VEIE9OIFBFUk1JU1NJT05TXG4gICAgaWYgKGNvbXB1dGVkQXR0cmlidXRlcy5zaG93VG9vbHNNb2R1bGUpIHtcbiAgICAgIGNvbXB1dGVkQXR0cmlidXRlcy5kZWZhdWx0Um91dGUgPSAnL3Rvb2xzL2NyZWF0ZUNoZWNrQ2FsbCc7XG4gICAgfVxuXG4gICAgaWYgKGNvbXB1dGVkQXR0cmlidXRlcy5zaG93QWRtaW5Nb2R1bGUpIHtcbiAgICAgIGNvbXB1dGVkQXR0cmlidXRlcy5kZWZhdWx0Um91dGUgPSAnL2FkbWluL2NvbXBhbmllcyc7XG4gICAgfVxuXG4gICAgaWYgKGNvbXB1dGVkQXR0cmlidXRlcy5zaG93VHJhY2tpbmdNb2R1bGUpIHtcbiAgICAgIGNvbXB1dGVkQXR0cmlidXRlcy5kZWZhdWx0Um91dGUgPSAnL2xvYWRzJztcbiAgICB9XG5cbiAgICBpZiAodXNlci5ncm91cEFkbWluKSB7XG4gICAgICBjb21wdXRlZEF0dHJpYnV0ZXMuZGVmYXVsdFJvdXRlID0gJy9hZG1pbi91c2Vycyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXB1dGVkQXR0cmlidXRlcztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RnVsbExvZ2luVXJsKCl7XG4gICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2VVcmwgKyB0aGlzLmxvZ2luVXJsXG4gIH1cblxuICBwcml2YXRlIGdldEZ1bGxUb2tlblVybCgpe1xuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlVXJsICsgdGhpcy50b2tlblVybFxuICB9XG5cbiAgcHJpdmF0ZSBnZXRGdWxsTG9nb3V0VXJsKCl7XG4gICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2VVcmwgKyB0aGlzLmxvZ291dFVybFxuICB9XG5cbiAgcHJpdmF0ZSBnZXRGdWxsVmFsaWRhdGVUb2tlblVybCgpe1xuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlVXJsICsgdGhpcy52YWxpZGF0ZVRva2VuVXJsXG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGF0IFNlY3VyaXR5IFNlcnZpY2UnLCBlcnJvcik7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gXCIuL3N0b3JhZ2Uuc2VydmljZVwiO1xuXG5cbmltcG9ydCB7IFNlY3VyaXR5U2VydmljZSB9IGZyb20gXCIuL3NlY3VyaXR5LnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgQ29uZmlnSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9jb25maWcuaGVscGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuXG5leHBvcnQgY2xhc3MgVXNlclJlc291cmNlU2VydmljZSB7XG5cbiAgcHJpdmF0ZSB1c2VyUmVzb3VyY2VVcmw6IHN0cmluZyA9IFwiL2FwaS92MS91c2Vycy86aWQvOmFjdGlvblwiXG4gIHByaXZhdGUgZm9yZ290UGFzc3dvcmRVcmw6IHN0cmluZyA9IFwiL2FwaS92MS91c2Vycy86YWN0aW9uXCJcblxuICBwcml2YXRlIHVzZXJKd3RUb2tlblVybDogc3RyaW5nID0gXCIvYXBpL3YxL3VzZXJzL2dldF9qd3RcIlxuICBwcml2YXRlIGF1dGhFcnJvcjogc3RyaW5nO1xuICBwcml2YXRlIHRmYVN1Ym1pc3Npb25MaW1pdHM6e1trZXk6IHN0cmluZ106IGFueX07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgdGZTdG9yYWdlOiBTdG9yYWdlU2VydmljZSxcbiAgICBwcml2YXRlIHNlY3VyaXR5U2VydmljZTogU2VjdXJpdHlTZXJ2aWNlXG4gICl7XG4gICAgdGhpcy5pbnRpYWxpc2UyZmFTdWJtaXNzaW9uTGltaXRzKCk7XG4gIH1cblxuICBwcml2YXRlIGdldCB1c2VyU2VydmljZVVybCgpIHtcbiAgICByZXR1cm4gQ29uZmlnSGVscGVyLmVudmlyb25tZW50LnVzZXJTZXJ2aWNlVXJsO1xuICB9XG5cbiAgcHVibGljIGdldENvdW50KHR5cGU6IHN0cmluZywga2V5OiBzdHJpbmcpe1xuICAgIHJldHVybiAodGhpcy50ZmFTdWJtaXNzaW9uTGltaXRzW3R5cGVdW2tleV0gfHwgMCk7XG4gIH1cblxuICBwdWJsaWMgaXNUd29GYWN0b3JBdXRoUmVxdWlyZWQoKTogUHJvbWlzZTx7W2tleTogc3RyaW5nXTogYW55fT4ge1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICBlbWFpbDogdGhpcy5zZWN1cml0eVNlcnZpY2UuY3VycmVudFVzZXJbJ2VtYWlsQWRkcmVzcyddLFxuICAgICAgZGV2aWNlSWQ6IHRoaXMuc2VjdXJpdHlTZXJ2aWNlLmRldmljZUlkXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmdldEZ1bGxUd29GYWN0b3JBdXRoZW50aWNhdGlvblJlcXVpcmVkVXJsKHRoaXMuc2VjdXJpdHlTZXJ2aWNlLnVzZXJJZCksIHt9LCB7IHBhcmFtcyB9KVxuICAgIC50b1Byb21pc2UoKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gKHJlc3BvbnNlKSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB0aGlzLmhhbmRsZUVycm9yKGVycm9yKSlcbiAgfVxuXG4gIHB1YmxpYyBzZW5kT1RQdmlhRW1haWwoYXV0aFR5cGUpOiBQcm9taXNlPHtba2V5OiBzdHJpbmddOiBhbnl9PiB7XG4gICAgaWYoYXV0aFR5cGUgPT09ICdlbWFpbCcgJiYgdGhpcy50ZmFTdWJtaXNzaW9uTGltaXRzLmVtYWlsLnJlc2VuZENvdW50IDwgNSkge1xuICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgZW1haWw6IHRoaXMuc2VjdXJpdHlTZXJ2aWNlLmN1cnJlbnRVc2VyWydlbWFpbEFkZHJlc3MnXSxcbiAgICAgICAgZGV2aWNlSWQ6IHRoaXMuc2VjdXJpdHlTZXJ2aWNlLmRldmljZUlkXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5nZXRGdWxsVHdvRmFjdG9yQXV0aGVudGljYXRpb25FbWFpbENvZGVVcmwodGhpcy5zZWN1cml0eVNlcnZpY2UudXNlcklkKSwge30sIHsgcGFyYW1zIH0pXG4gICAgICAudG9Qcm9taXNlKClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLnRmYVN1Ym1pc3Npb25MaW1pdHMuZW1haWwucmVzZW5kQ291bnQgPSB0aGlzLnRmYVN1Ym1pc3Npb25MaW1pdHMuZW1haWwucmVzZW5kQ291bnQgKyAxO1xuICAgICAgICB0aGlzLnRmU3RvcmFnZS5zdG9yZSgnZW1haWxSZXNlbmRDb3VudCcsIHRoaXMudGZhU3VibWlzc2lvbkxpbWl0cy5lbWFpbC5yZXNlbmRDb3VudCk7XG4gICAgICAgIHJldHVybiByZXNwb25zZVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpKVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB2ZXJpZnlPVFBmcm9tRW1haWwodG9rZW4pOiBQcm9taXNlPHtba2V5OiBzdHJpbmddOiBhbnl9PiB7XG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgIGVtYWlsOiB0aGlzLnNlY3VyaXR5U2VydmljZS5jdXJyZW50VXNlclsnZW1haWxBZGRyZXNzJ10sXG4gICAgICBkZXZpY2VJZDogdGhpcy5zZWN1cml0eVNlcnZpY2UuZGV2aWNlSWQsXG4gICAgICB0b2tlblxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5nZXRGdWxsVHdvRmFjdG9yQXV0aGVudGljYXRpb25WZXJpZnlFbWFpbENvZGVVcmwodGhpcy5zZWN1cml0eVNlcnZpY2UudXNlcklkKSwge30sIHsgcGFyYW1zIH0pXG4gICAgLnRvUHJvbWlzZSgpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2VcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IpKVxuICAgIC5jYXRjaCgoKSA9PiB0aGlzLmluY3JlbWVudFN1Ym1pdENvdW50KCkpXG4gIH1cblxuICBwdWJsaWMgc2VuZFBhc3N3b3JkVmlhRW1haWwodmFsdWUpOiBQcm9taXNlPHtba2V5OiBzdHJpbmddOiBhbnl9PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuZ2V0UGFzc3dvcmRSZXNldFVybCh0aGlzLnNlY3VyaXR5U2VydmljZS51c2VySWQpLCB7J2VtYWlsQWRkcmVzcycgOiB2YWx1ZS5lbWFpbH0sIHt9KVxuICAgIC50b1Byb21pc2UoKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlXG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB0aGlzLmhhbmRsZUVycm9yKGVycm9yKSlcbiAgfVxuXG4gIHB1YmxpYyBzZW5kQXBwbGVzc01hbmFnZW1lbnRPcHRJblNtcyhwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy51c2VyU2VydmljZVVybH0vYXBpL3YxL2FwcF9sZXNzX3N1YnNjcmlwdGlvbmA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgcGFyYW1zKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXREZXZpY2VEZXRhaWxzRm9yU3VwZXJBZG1pbihwYXJhbXM6IHtba2V5OiBzdHJpbmddOiBhbnl9KSB7XG4gICAgY29uc3QgdXJsID0gYCR7dGhpcy51c2VyU2VydmljZVVybH0vYXBpL3YxL3VzZXJzL2dldF9kZXZpY2VfZGV0YWlsc19zdXBlcl9hZG1pbmA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgeyBwaG9uZTogcGFyYW1zLnBob25lLCBpbnRlcmNlcHRvck9wdGlvbnM6IHsgaXNDb21wYW55SWROZWVkZWQ6IGZhbHNlfX0pO1xuICB9XG5cbiAgcHVibGljIGdldEZpbHRlcnMocGFyYW1zKSA6IE9ic2VydmFibGU8e1trZXk6c3RyaW5nXTphbnl9PntcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmdldFVzZXJGaWx0ZXJzUmVzb3VyY2VVcmwodGhpcy5zZWN1cml0eVNlcnZpY2UuY3VycmVudFVzZXIudXNlcklkKSx7cGFyYW1zfSk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlRmlsdGVyKHBhcmFtcykgOiBPYnNlcnZhYmxlPHtba2V5OnN0cmluZ106YW55fT57XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuZ2V0VXNlckZpbHRlcnNSZXNvdXJjZVVybCh0aGlzLnNlY3VyaXR5U2VydmljZS5jdXJyZW50VXNlci51c2VySWQpLHBhcmFtcyk7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlRmlsdGVyKHBhcmFtcykgOiBPYnNlcnZhYmxlPHtba2V5OnN0cmluZ106YW55fT57XG4gICAgbGV0IHVybCA9IHRoaXMuZ2V0VXNlckZpbHRlclVybChwYXJhbXMuZmlsdGVySWQpO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHVybCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlRmlsdGVyKHBhcmFtcykgOiBPYnNlcnZhYmxlPHtba2V5OnN0cmluZ106YW55fT57XG4gICAgbGV0IHVybCA9IHRoaXMuZ2V0VXNlckZpbHRlclVybChwYXJhbXMuZmlsdGVySWQpO1xuICAgIHJldHVybiB0aGlzLmh0dHAucGF0Y2godXJsLHt1c2VyX2ZpbHRlciA6IHBhcmFtcy51c2VyX2ZpbHRlcn0pO1xuICB9XG5cbiAgcHVibGljIGdldFVzZXJKd3RUb2tlbigpe1xuICAgIGxldCB1cmwgPSB0aGlzLmdldFVzZXJKd3RVcmwoKTtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRVc2VyRmlsdGVyVXJsKGZpbHRlcklkKXtcbiAgICByZXR1cm4gYCR7dGhpcy5nZXRVc2VyRmlsdGVyc1Jlc291cmNlVXJsKHRoaXMuc2VjdXJpdHlTZXJ2aWNlLmN1cnJlbnRVc2VyLnVzZXJJZCl9LyR7ZmlsdGVySWR9YFxuICB9XG5cbiAgcHJpdmF0ZSBnZXRVc2VySnd0VXJsKCl7XG4gICAgcmV0dXJuIGAke3RoaXMudXNlclNlcnZpY2VVcmx9JHt0aGlzLnVzZXJKd3RUb2tlblVybH1gXG4gIH1cblxuICBwcml2YXRlIGdldFVzZXJGaWx0ZXJzUmVzb3VyY2VVcmwoaWQpIHtcbiAgICByZXR1cm4gYCR7dGhpcy51c2VyU2VydmljZVVybH0ke3RoaXMudXNlclJlc291cmNlVXJsLnJlcGxhY2UoXCI6YWN0aW9uXCIsIFwiZmlsdGVyXCIpLnJlcGxhY2UoXCI6aWRcIiwgaWQpfWBcbiAgfVxuICBwcml2YXRlIGdldEZ1bGxUd29GYWN0b3JBdXRoZW50aWNhdGlvblJlcXVpcmVkVXJsKGlkKXtcbiAgICByZXR1cm4gYCR7dGhpcy51c2VyU2VydmljZVVybH0ke3RoaXMudXNlclJlc291cmNlVXJsLnJlcGxhY2UoXCI6YWN0aW9uXCIsIFwibmVlZF8yZmFfbG9naW5cIikucmVwbGFjZShcIjppZFwiLCBpZCl9YFxuICB9XG5cbiAgcHJpdmF0ZSBnZXRGdWxsVHdvRmFjdG9yQXV0aGVudGljYXRpb25FbWFpbENvZGVVcmwoaWQpe1xuICAgIHJldHVybiBgJHt0aGlzLnVzZXJTZXJ2aWNlVXJsfSR7dGhpcy51c2VyUmVzb3VyY2VVcmwucmVwbGFjZShcIjphY3Rpb25cIiwgXCJzZW5kXzJmYV9zZWNyZXRfbWFpbFwiKS5yZXBsYWNlKFwiOmlkXCIsIGlkKX1gXG4gIH1cblxuICBwcml2YXRlIGdldEZ1bGxUd29GYWN0b3JBdXRoZW50aWNhdGlvblZlcmlmeUVtYWlsQ29kZVVybChpZCl7XG4gICAgcmV0dXJuIGAke3RoaXMudXNlclNlcnZpY2VVcmx9JHt0aGlzLnVzZXJSZXNvdXJjZVVybC5yZXBsYWNlKFwiOmFjdGlvblwiLCBcInZlcmlmeV8yZmFfY29kZV9lbWFpbFwiKS5yZXBsYWNlKFwiOmlkXCIsIGlkKX1gXG4gIH1cblxuICBwcml2YXRlIGdldFBhc3N3b3JkUmVzZXRVcmwoaWQpe1xuICAgIHJldHVybiBgJHt0aGlzLnVzZXJTZXJ2aWNlVXJsfSR7dGhpcy5mb3Jnb3RQYXNzd29yZFVybC5yZXBsYWNlKFwiOmFjdGlvblwiLCBcImZvcmdvdF9wYXNzd29yZFwiKX1gXG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGF0IFVzZXIgUmVzb3VyY2UgU2VydmljZScsIGVycm9yKTtcbiAgICBpZihlcnJvci5kYXRhICYmIGVycm9yLmRhdGEuc3RhdHVzQ29kZSA9PT0gNDAzKSB7XG4gICAgICB0aGlzLmF1dGhFcnJvciA9IFwiWW91ciBBY2NvdW50IGlzIExvY2tlZC4gWW91IGhhdmUgcmVhY2hlZCB0aGUgbWF4aW11bSBsaW1pdCBvZiBpbnZhbGlkIGxvZ2luIGF0dGVtcHRzLiBLaW5kbHkgdHJ5IGxvZ2dpbmcgaW4gYWZ0ZXIgYW4gaG91ci5cIjtcbiAgICAgIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLmRlbGV0ZUF1dGhUb2tlbih7fSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5jcmVtZW50U3VibWl0Q291bnQoKSB7XG4gICAgdGhpcy50ZmFTdWJtaXNzaW9uTGltaXRzLmVtYWlsLnN1Ym1pdENvdW50ID0gdGhpcy50ZmFTdWJtaXNzaW9uTGltaXRzLmVtYWlsLnN1Ym1pdENvdW50ICsgMTtcbiAgICB0aGlzLnRmU3RvcmFnZS5zdG9yZSgnZW1haWxTdWJtaXRDb3VudCcsIHRoaXMudGZhU3VibWlzc2lvbkxpbWl0cy5lbWFpbC5zdWJtaXRDb3VudCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBpbnRpYWxpc2UyZmFTdWJtaXNzaW9uTGltaXRzKCkge1xuICAgIHRoaXMudGZhU3VibWlzc2lvbkxpbWl0cyA9IHtcbiAgICAgZW1haWw6IHtcbiAgICAgICBzdWJtaXRDb3VudDogcGFyc2VJbnQodGhpcy50ZlN0b3JhZ2UucmV0cml2ZSgnZW1haWxTdWJtaXRDb3VudCcpKSB8fCAwLFxuICAgICAgIHJlc2VuZENvdW50OiBwYXJzZUludCh0aGlzLnRmU3RvcmFnZS5yZXRyaXZlKCdlbWFpbFJlc2VuZENvdW50JykpIHx8IDBcbiAgICAgfSxcbiAgICAgICBhcHA6IHtcbiAgICAgICBzdWJtaXRDb3VudDogcGFyc2VJbnQodGhpcy50ZlN0b3JhZ2UucmV0cml2ZSgnYXBwU3VibWl0Q291bnQnKSkgfHwgMFxuICAgICB9XG4gICB9XG4gICByZXR1cm4gZmFsc2U7XG4gIH1cblxufVxuIiwiZXhwb3J0IGNsYXNzIFVuaXRDb252ZXJzaW9uSGVscGVyIHtcbiAgcHVibGljIG1ldGVyVG9NaWxlKG1ldGVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gbWV0ZXIgKiAwLjAwMDYyMTM3MTtcbiAgfVxuXG4gIHB1YmxpYyBtaWxlc1RvTWV0ZXJzKG1pbGVzKTogbnVtYmVyIHtcbiAgICByZXR1cm4gbWlsZXMgKiAxNjA5LjM0O1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBkZWxlZ2F0ZSB9IGZyb20gXCJ0eXBlc2NyaXB0LW1peFwiO1xuXG5pbXBvcnQgeyBVbml0Q29udmVyc2lvbkhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL3VuaXQtY29udmVyc2lvbi5oZWxwZXJcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGFQcmVzZW50ZXJTZXJ2aWNlIHtcbiAgQGRlbGVnYXRlKCBVbml0Q29udmVyc2lvbkhlbHBlci5wcm90b3R5cGUubWV0ZXJUb01pbGUgKSBwdWJsaWMgbWV0ZXJUb01pbGU6KG1ldGVyKSA9PiBudW1iZXJcbiAgQGRlbGVnYXRlKCBVbml0Q29udmVyc2lvbkhlbHBlci5wcm90b3R5cGUubWlsZXNUb01ldGVycyApIHB1YmxpYyBtaWxlc1RvTWV0ZXJzOihtaWxlcykgPT4gbnVtYmVyXG5cbiAgY29uc3RydWN0b3IoKXt9XG5cbiAgcHVibGljIHRyYW5zZm9ybUxhcmdlRGF0YShkYXRhOm51bWJlciwgbnVtRGlnaXRzOm51bWJlcj0gMik6c3RyaW5nIHtcbiAgICB2YXIgZm9ybWF0QXJyYXkgPSBbXG4gICAgICB7IHZhbHVlOiAxLCBzeW1ib2w6IFwiXCIgfSxcbiAgICAgIHsgdmFsdWU6IDFFMywgc3ltYm9sOiBcIktcIiB9LFxuICAgICAgeyB2YWx1ZTogMUU2LCBzeW1ib2w6IFwiTVwiIH0sXG4gICAgICB7IHZhbHVlOiAxRTksIHN5bWJvbDogXCJHXCIgfSxcbiAgICAgIHsgdmFsdWU6IDFFMTIsIHN5bWJvbDogXCJUXCIgfSxcbiAgICAgIHsgdmFsdWU6IDFFMTUsIHN5bWJvbDogXCJQXCIgfSxcbiAgICAgIHsgdmFsdWU6IDFFMTgsIHN5bWJvbDogXCJFXCIgfVxuICAgIF07XG4gICAgdmFyIHJ4ID0gL1xcLjArJHwoXFwuWzAtOV0qWzEtOV0pMCskLztcbiAgICB2YXIgaTtcbiAgICBmb3IgKGkgPSBmb3JtYXRBcnJheS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICBpZiAoZGF0YSA+PSBmb3JtYXRBcnJheVtpXS52YWx1ZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChkYXRhIC8gZm9ybWF0QXJyYXlbaV0udmFsdWUpLnRvRml4ZWQobnVtRGlnaXRzKS5yZXBsYWNlKHJ4LCBcIiQxXCIpICsgZm9ybWF0QXJyYXlbaV0uc3ltYm9sO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFRvYXN0clNlcnZpY2UgfSBmcm9tICduZ3gtdG9hc3RyJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuQEluamVjdGFibGUoKVxuIGV4cG9ydCBjbGFzcyBBbGVydFNlcnZpY2Uge1xuXG4gICBjb25zdHJ1Y3RvcihcbiAgICAgcHJpdmF0ZSB0b2FzdHJTZXJ2aWNlOiBUb2FzdHJTZXJ2aWNlLFxuICAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXG4gICApe31cblxuICAgcHVibGljIGRpc3BsYXlNZXNzYWdlKHNldmVyaXR5LCBzdW1tYXJ5S2V5LCBkZXRhaWxLZXkgPSBcIlwiLCBvcHRpb25zID0ge30pIHtcbiAgICAgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldChbXG4gICAgICAgc3VtbWFyeUtleSxcbiAgICAgICBkZXRhaWxLZXlcbiAgICAgXSkuc3Vic2NyaWJlKCh0cmFuc2xhdGlvbnM6IHN0cmluZykgPT4ge1xuICAgICAgIHRoaXMuZGlzcGxheShzZXZlcml0eSwgdHJhbnNsYXRpb25zW3N1bW1hcnlLZXldLCB0cmFuc2xhdGlvbnNbZGV0YWlsS2V5XSwgb3B0aW9ucylcbiAgICAgfSlcbiAgIH1cblxuICAgcHVibGljIGRpc3BsYXkoc2V2ZXJpdHksIHN1bW1hcnlLZXksIGRldGFpbEtleSA9IFwiXCIsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy50b2FzdHJTZXJ2aWNlW3NldmVyaXR5XShkZXRhaWxLZXksIHN1bW1hcnlLZXksIG9wdGlvbnMpXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgdGhpcy50b2FzdHJTZXJ2aWNlLnNob3coZGV0YWlsS2V5LCBzdW1tYXJ5S2V5LCBvcHRpb25zKVxuICAgICAgfVxuICAgfVxuXG4gfVxuIiwiaW1wb3J0IHsgTG9jYXRpb25Qcm92aWRlciB9IGZyb20gXCIuL2xvY2F0aW9uLXByb3ZpZGVyLm1vZGVsXCJcbmV4cG9ydCBjbGFzcyBMb2NhdGlvblByb3ZpZGVyUmVzcG9uc2UgIHsgXG4gIGxvY2F0aW9uUHJvdmlkZXI6IEFycmF5PExvY2F0aW9uUHJvdmlkZXI+O1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMubG9jYXRpb25Qcm92aWRlciA9IFtdO1xuICB9XG59IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IENvbmZpZ0hlbHBlciB9IGZyb20gXCIuLi8uLi8uLi9oZWxwZXJzL2NvbmZpZy5oZWxwZXJcIjtcbmltcG9ydCB7IHBsYWluVG9DbGFzcyB9IGZyb20gXCJjbGFzcy10cmFuc2Zvcm1lclwiO1xuaW1wb3J0IHsgTG9jYXRpb25Qcm92aWRlclJlc3BvbnNlIH0gZnJvbSBcIi4uL21vZGVscy9sb2NhdGlvbi1wcm92aWRlci1yZXNwb25zZS5tb2RlbFwiO1xuXG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvY2F0aW9uUHJvdmlkZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBwcm92aWRlcnNBdXRvY29tcGxldGVVcmwgPSBcIi9hcGkvdjEvbG9jYXRpb25fcHJvdmlkZXJzL2F1dG9jb21wbGV0ZVwiXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50XG4gICl7XG4gIH1cblxuICBwcml2YXRlIGdldCB0cmFja2luZ1NlcnZpY2VVcmwoKSB7XG4gICAgcmV0dXJuIENvbmZpZ0hlbHBlci5lbnZpcm9ubWVudC50cmFja2luZ1NlcnZpY2VVcmw7XG4gIH0gXG5cbiAgcHVibGljIGdldFByb3ZpZGVyc0F1dG9jb21wbGV0ZShxdWVyeTogc3RyaW5nKTogUHJvbWlzZTx7W2tleTogc3RyaW5nXTogYW55fVtdPiB7XG4gICAgaWYoIXF1ZXJ5KXtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAncSc6IHF1ZXJ5XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuZnVsbFByb3ZpZGVyc0F1dG9jb21wbGV0ZVVybCgpLCB7IHBhcmFtcyB9KVxuICAgICAgLnRvUHJvbWlzZSgpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiBwbGFpblRvQ2xhc3MoTG9jYXRpb25Qcm92aWRlclJlc3BvbnNlLCByZXNwb25zZSkpXG4gICAgICAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcik7XG4gIH1cblxuICBwcml2YXRlIGZ1bGxQcm92aWRlcnNBdXRvY29tcGxldGVVcmwoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMudHJhY2tpbmdTZXJ2aWNlVXJsfSR7dGhpcy5wcm92aWRlcnNBdXRvY29tcGxldGVVcmx9YDtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMb2FkZXJTdGF0ZSB9IGZyb20gJy4uL2NvbnN0YW50cy9sb2FkZXItc3RhdGUuY29uc3RhbnQnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMb2FkZXJTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGxvYWRlclF1ZXVlID0gW107XG4gICAgcHVibGljIGxvYWRlclN1YmplY3QgPSBuZXcgU3ViamVjdDxMb2FkZXJTdGF0ZT4oKTtcbiAgICBwdWJsaWMgTG9hZGluZ1N0YXRlOiBPYnNlcnZhYmxlPExvYWRlclN0YXRlPiA9IHRoaXMubG9hZGVyU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICBjb25zdHJ1Y3Rvcigpe31cblxuICAgIHB1YmxpYyBzaG93KCkge1xuICAgICAgICB0aGlzLnF1ZXVlKCk7XG4gICAgfVxuICAgIHB1YmxpYyBoaWRlKCkge1xuICAgICAgICB0aGlzLmRlcXVldWUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHF1ZXVlICgpIHtcbiAgICAgICAgdGhpcy5sb2FkZXJRdWV1ZS5wdXNoKDEpO1xuICAgICAgICBpZiAodGhpcy5sb2FkZXJRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGVyU3ViamVjdC5uZXh0KDxMb2FkZXJTdGF0ZT57c2hvdzogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXF1ZXVlKCkge1xuICAgICAgICB0aGlzLmxvYWRlclF1ZXVlLnBvcCgpO1xuICAgICAgICBpZiAoIXRoaXMubG9hZGVyUXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRlclN1YmplY3QubmV4dCg8TG9hZGVyU3RhdGU+e3Nob3c6IGZhbHNlfSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiXG5pbXBvcnQge3Rocm93RXJyb3IgYXMgb2JzZXJ2YWJsZVRocm93RXJyb3IsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGZpbmFsaXplIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBIdHRwSW50ZXJjZXB0b3IsXG4gIEh0dHBSZXF1ZXN0LFxuICBIdHRwUmVzcG9uc2UsXG4gIEh0dHBIYW5kbGVyLFxuICBIdHRwRXZlbnQsXG4gIEh0dHBIZWFkZXJzLFxuICBIdHRwUGFyYW1zLFxuICBIVFRQX0lOVEVSQ0VQVE9SU1xufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBBdXRoQ29uZmlnIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9hdXRoLWNvbmZpZy5jb25zdGFudFwiO1xuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvc3RvcmFnZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTZWN1cml0eVNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvc2VjdXJpdHkuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29tcGFueUNvbnRleHRTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2NvbXBhbnktY29udGV4dC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbG9hZGVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ3VzdG9tSHR0cEludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgaXNTdXBlckFkbWluOiBib29sZWFuO1xuICBjb21wYW55SWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0b3JhZ2VTZXJ2aWNlOiBTdG9yYWdlU2VydmljZSxcbiAgICBwcml2YXRlIHNlY3VyaXR5OiBTZWN1cml0eVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjb21wYW55Q29udGV4dFNlcnZpY2U6IENvbXBhbnlDb250ZXh0U2VydmljZSxcbiAgICBwcml2YXRlIGxvYWRlclNlcnZpY2U6IExvYWRlclNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMuaXNTdXBlckFkbWluID0gc2VjdXJpdHkuaXNTdXBlckFkbWluO1xuICAgIHRoaXMuY29tcGFueUlkID0gY29tcGFueUNvbnRleHRTZXJ2aWNlLmdldENvbXBhbnlDb250ZXh0KCk7XG4gIH1cblxuICBpbnRlcmNlcHQocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgaHR0cEhhbmRsZXI6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcmVxdWVzdC5wYXJhbXMuZ2V0KCdpbnRlcmNlcHRvck9wdGlvbnMnKSk7XG4gICAgbGV0IHJlcXVlc3RQYXJhbXMgID0gcmVxdWVzdC5wYXJhbXM7XG4gICAgLy8gTXVsdGlQYXJhbXMgYWxvbmcgd2l0aCBhcnJheVBhcmFtc1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnNbJ2hhc0FycmF5UGFyYW1zJ10pIHtcbiAgICAgIGxldCBhcnJheVBhcmFtcyA9IG9wdGlvbnNbJ2FycmF5UGFyYW1zJ107XG4gICAgICBsZXQgcHJlcGFyZWRBcnJheSA9IHRoaXMucHJlcGFyZUFycmF5UGFyYW1zKHJlcXVlc3QucGFyYW1zLCBhcnJheVBhcmFtcyk7XG4gICAgICByZXF1ZXN0UGFyYW1zID0gcHJlcGFyZWRBcnJheTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2YgcmVxdWVzdC51cmwgPT09IFwic3RyaW5nXCIgJiYgcmVxdWVzdC51cmwuaW5kZXhPZignZm91cmtpdGVzLmNvbScpICE9IC0xIHx8XG4gICAgICByZXF1ZXN0LnVybC5pbmRleE9mKCdmb3Vya2l0ZXMuaW4nKSAhPSAtMSB8fCByZXF1ZXN0LnVybC5pbmRleE9mKCdsb2NhbGhvc3QnKSAhPSAtMVxuICAgICkge1xuICAgICAgaWYgKG9wdGlvbnMgJiYgIW9wdGlvbnNbJ2hpZGVMb2FkZXInXSkge1xuICAgICAgICAvLyBUT0RPOiBJbXBsZW1lbnRhdGlvbiBmb3IgRm91cktpdGVzIGxvYWRlciBzaG93IGFjdGlvblxuICAgICAgICB0aGlzLmxvYWRlclNlcnZpY2Uuc2hvdygpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaXNTdXBlckFkbWluICYmIHRoaXMuY29tcGFueUlkICYmIG9wdGlvbnNbJ2lzQ29tcGFueUlkTmVlZGVkJ10gIT09IGZhbHNlKSB7XG4gICAgICAgIHJlcXVlc3RQYXJhbXMgPSByZXF1ZXN0UGFyYW1zLnNldChcImNvbXBhbnlfaWRcIiwgdGhpcy5jb21wYW55SWQpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBBVVRIID0gdGhpcy5zdG9yYWdlU2VydmljZS5yZXRyaXZlKEF1dGhDb25maWcuQVVUSCkgfHwgdGhpcy5zdG9yYWdlU2VydmljZS5yZXRyaXZlRnJvbUNvb2tpZShBdXRoQ29uZmlnLkFVVEgpXG4gICAgICBjb25zdCBVU0VSX0lEID0gdGhpcy5zdG9yYWdlU2VydmljZS5yZXRyaXZlKEF1dGhDb25maWcuVVNFUl9JRCkgfHwgdGhpcy5zdG9yYWdlU2VydmljZS5yZXRyaXZlRnJvbUNvb2tpZShBdXRoQ29uZmlnLlVTRVJfSUQpXG4gICAgICBjb25zdCBERVZJQ0VfSUQgPSB0aGlzLnN0b3JhZ2VTZXJ2aWNlLnJldHJpdmUoQXV0aENvbmZpZy5ERVZJQ0VfSUQpXG4gICAgICAvL0xPQ0FMRVxuICAgICAgcmVxdWVzdFBhcmFtcyA9IHJlcXVlc3RQYXJhbXMuc2V0KFwibG9jYWxlXCIsIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiTkdfVFJBTlNMQVRFX0xBTkdfS0VZXCIpIHx8ICdlbicpO1xuXG4gICAgICAvLyBpbnRlcmNlcHRvck9wdGlvbnMgaXMgZm9yIGludGVybmFsIHB1cnBvc2VcbiAgICAgIC8vIHJlcXVlc3RQYXJhbXMgPSByZXF1ZXN0UGFyYW1zLmRlbGV0ZSgnaW50ZXJjZXB0b3JPcHRpb25zJyk7XG5cbiAgICAgIGNvbnN0IGF1dGhSZXEgPSByZXF1ZXN0LmNsb25lKHtcbiAgICAgICAgc2V0SGVhZGVyczoge1xuICAgICAgICAgICdDYWNoZS1jb250cm9sJzogXCJuby1jYWNoZSBuby1zdG9yZVwiLFxuICAgICAgICAgICdQcmFnbWEnOiBcIm5vLWNhY2hlXCIsXG4gICAgICAgICAgJ0V4cGlyZXMnOiBcIjBcIixcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHtBVVRIfWAsXG4gICAgICAgICAgJ1gtRm91cktpdGVzVXNlcklkJzogYCR7VVNFUl9JRH1gLFxuICAgICAgICAgICdYLUZvdXJLaXRlc0RldmljZUlkJzogYCR7REVWSUNFX0lEfWBcbiAgICAgICAgfSxcbiAgICAgICAgcGFyYW1zOiByZXF1ZXN0UGFyYW1zXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGh0dHBIYW5kbGVyLmhhbmRsZShhdXRoUmVxKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBjYXRjaEVycm9yKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlVGhyb3dFcnJvcihyZXNwb25zZSk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgZmluYWxpemUoKCkgPT4ge1xuICAgICAgICAgICAgLy8gVE9ETzogSW1wbGVtZW50YXRpb24gZm9yIEZvdXJLaXRlcyBsb2FkZXIgaGlkZSBhY3Rpb25cbiAgICAgICAgICAgIHRoaXMubG9hZGVyU2VydmljZS5oaWRlKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaHR0cEhhbmRsZXIuaGFuZGxlKHJlcXVlc3QpO1xuICAgIH1cbiAgfVxuXG4gIHByZXBhcmVBcnJheVBhcmFtcyhmaWx0ZXJQYXJhbXMsIGFycmF5UGFyYW1zKTpIdHRwUGFyYW1zIHtcbiAgICAvLyBmb3IgdGhlIEFQSSBjb21wYXRpYmlsaXR5LCBDb252ZXJ0aW5nIGFycmF5IGtleSBpbnRvIFwia2V5W11cIlxuICAgIGxldCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgIGxldCBwYXJhbUtleXMgPSBmaWx0ZXJQYXJhbXMua2V5cygpO1xuICAgIHBhcmFtS2V5cy5mb3JFYWNoKChrZXkpPT4ge1xuICAgICAgbGV0IHZhbHVlID0gZmlsdGVyUGFyYW1zLm1hcC5nZXQoa2V5KTtcbiAgICAgIGlmIChhcnJheVBhcmFtcy5pbmRleE9mKGtleSkgIT0gLTEpIHtcbiAgICAgICAgdmFsdWUuZm9yRWFjaCgodmFsdWVLZXkpPT4ge1xuICAgICAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoa2V5K1wiW11cIiwgdmFsdWVLZXkpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoa2V5LCB2YWx1ZSlcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhY3Rpb24tZm9vdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvb3Rlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Zvb3Rlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFjdGlvbkZvb3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyByZWFkb25seSB5ZWFyOm51bWJlciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuLy9AZHluYW1pY1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY29uZmlybWF0aW9uLWRpYWxvZycsXG4gIHN0eWxlVXJsczpbJ2NvbmZpcm1hdGlvbi1kaWFsb2cuY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICdjb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbn0pXG5cbmV4cG9ydCBjbGFzcyBDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8Q29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9XG4gICkgeyB9XG5cbiAgb25Ob0NsaWNrKCk6IHZvaWQge1xuICAgIGlmKHRoaXMuZGF0YS5yZWplY3RBY3Rpb24pIHtcbiAgICAgIHRoaXMuZGF0YS5yZWplY3RBY3Rpb24oKTtcbiAgICB9XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuICBvblllc0NsaWNrKCk6IHZvaWQge1xuICAgIGlmKHRoaXMuZGF0YS5hY2NlcHRBY3Rpb24pIHtcbiAgICAgIHRoaXMuZGF0YS5hY2NlcHRBY3Rpb24oKTtcbiAgICB9XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSG9zdCwgZm9yd2FyZFJlZiwgSW5qZWN0LCBDb250ZW50Q2hpbGQsIEVsZW1lbnRSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBFeHBhbmRhYmxlTGlzdCB9IGZyb20gJy4uL2V4cGFuZGFibGUtbGlzdC9leHBhbmRhYmxlLWxpc3QuY29tcG9uZW50J1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdleHBhbmRhYmxlLWxpc3QtaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnLi9leHBhbmRhYmxlLWxpc3QtaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2V4cGFuZGFibGUtbGlzdC1pdGVtLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBFeHBhbmRhYmxlTGlzdEl0ZW0ge1xuXG4gIEBJbnB1dCgpIGlzT3BlbmVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBpc09wZW5lZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIG9uT3BlbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAT3V0cHV0KCkgb25DbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASG9zdCgpIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBFeHBhbmRhYmxlTGlzdCkpIHB1YmxpYyBleHBhbmRhYmxlTGlzdDogRXhwYW5kYWJsZUxpc3QsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmXG4gICkge31cblxuICBvbkNsaWNrVG9nZ2xlKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpc09wZW5lZEJlZm9yZVdlQ2hhbmdlID0gdGhpcy5pc09wZW5lZDtcbiAgICB0aGlzLmV4cGFuZGFibGVMaXN0LmNsb3NlQWxsKHsgbmV3T3BlbmVkOiAhaXNPcGVuZWRCZWZvcmVXZUNoYW5nZSB9KTtcbiAgICB0aGlzLmlzT3BlbmVkID0gIWlzT3BlbmVkQmVmb3JlV2VDaGFuZ2U7XG4gICAgaWYgKHRoaXMuaXNPcGVuZWQpIHtcbiAgICAgIHRoaXMub25PcGVuLmVtaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoKTtcbiAgICB9XG4gICAgdGhpcy5pc09wZW5lZENoYW5nZS5lbWl0KHRoaXMuaXNPcGVuZWQpO1xuICB9XG5cbiAgb3Blbk9uSW5pdGlhbGl6YXRpb24oKSB7XG4gICAgdGhpcy5pc09wZW5lZCA9IHRydWU7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb250ZW50Q2hpbGRyZW4sIENvbXBvbmVudCwgUXVlcnlMaXN0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgRXhwYW5kYWJsZUxpc3RJdGVtIH0gZnJvbSAnLi4vZXhwYW5kYWJsZS1saXN0LWl0ZW0vZXhwYW5kYWJsZS1saXN0LWl0ZW0uY29tcG9uZW50J1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdleHBhbmRhYmxlLWxpc3QnLFxuICB0ZW1wbGF0ZTpgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmBcbn0pXG5leHBvcnQgY2xhc3MgRXhwYW5kYWJsZUxpc3QgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGNsb3NlT3RoZXJzID0gdHJ1ZTtcblxuICBASW5wdXQoKSBzaG93QXJyb3dzID0gZmFsc2U7XG5cbiAgQElucHV0KCkgZXhwYW5kQWxsID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIG9uVG9nZ2xlOiBFdmVudEVtaXR0ZXI8e1trZXk6IHN0cmluZ106IGFueX0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7W2tleTogc3RyaW5nXTogYW55fT4oKTtcblxuICBAQ29udGVudENoaWxkcmVuKGZvcndhcmRSZWYoKCkgPT4gRXhwYW5kYWJsZUxpc3RJdGVtKSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBsaXN0SXRlbXM6IFF1ZXJ5TGlzdDxFeHBhbmRhYmxlTGlzdEl0ZW0+O1xuXG4gIHByaXZhdGUgb2xkU3RhdGVzOiBFeHBhbmRhYmxlTGlzdEl0ZW1bXTtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICBpZiAodGhpcy5leHBhbmRBbGwpIHtcbiAgICAgIHRoaXMuY2xvc2VPdGhlcnMgPSBmYWxzZTtcbiAgICAgIHRoaXMub2xkU3RhdGVzID0gdGhpcy5saXN0SXRlbXMudG9BcnJheSgpO1xuICAgICAgdGhpcy5vbGRTdGF0ZXMuZm9yRWFjaChsaXN0SXRlbSA9PiB7XG4gICAgICAgIGxpc3RJdGVtLm9wZW5PbkluaXRpYWxpemF0aW9uKCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gd2Ugc3Vic2NyaWJlIGZvciBjaGFuZ2VzLCBhbmQgaWYgbmV3IGxpc3RJdGVtcyBhcmUgYWRkZWQgd2Ugb3BlbiB0aGVtIGF1dG9tYXRpY2FsbHlcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5saXN0SXRlbXMuY2hhbmdlcy5zdWJzY3JpYmUoY2hhbmdlID0+IHtcbiAgICAgICAgY29uc3QgbmV3U3RhdGVzID0gdGhpcy5saXN0SXRlbXMudG9BcnJheSgpLmZpbHRlcihsaXN0SXRlbSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMub2xkU3RhdGVzLmluZGV4T2YobGlzdEl0ZW0pID09PSAtMTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5ld1N0YXRlcy5mb3JFYWNoKGxpc3RJdGVtID0+IHtcbiAgICAgICAgICBsaXN0SXRlbS5vcGVuT25Jbml0aWFsaXphdGlvbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbGRTdGF0ZXMgPSB0aGlzLmxpc3RJdGVtcy50b0FycmF5KCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pe1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZUFsbChldmVudDoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fSkge1xuICAgIGV2ZW50LmV4aXN0aW5nQ2xvc2VkID0gZmFsc2VcbiAgICBpZiAodGhpcy5jbG9zZU90aGVycyl7XG4gICAgICB0aGlzLmxpc3RJdGVtcy50b0FycmF5KCkuZm9yRWFjaCgobGlzdEl0ZW0pID0+IHtcbiAgICAgICAgZXZlbnQuZXhpc3RpbmdDbG9zZWQgPSBldmVudC5leGlzdGluZ0Nsb3NlZCB8fCBsaXN0SXRlbS5pc09wZW5lZDtcbiAgICAgICAgbGlzdEl0ZW0uaXNPcGVuZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLm9uVG9nZ2xlLmVtaXQoZXZlbnQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZpbHRlci10b2dnbGUnLFxuICAgIHN0eWxlVXJsczogWycuL2ZpbHRlci10b2dnbGUuY29tcG9uZW50LnNjc3MnXSxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmlsdGVyLXRvZ2dsZS5jb21wb25lbnQuaHRtbCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBGaWx0ZXJUb2dnbGVDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCl7fVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd2aWV3LXN3aXRjaGVyJyxcbiAgc3R5bGVVcmxzOlsnLi92aWV3LXN3aXRjaGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnLi92aWV3LXN3aXRjaGVyLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBWaWV3U3dpdGNoZXJDb21wb25lbnQge1xuICBASW5wdXQoJ3R5cGUnKSB0eXBlPzogc3RyaW5nXG5cbiAgY29uc3RydWN0b3IoKXtcbiAgICBpZighdGhpcy50eXBlKXtcbiAgICAgIHRoaXMudHlwZSA9ICdsaXN0J1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcblxuLy9AZHluYW1pY1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZnVsbC1wYWdlLW1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Z1bGwtcGFnZS1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Z1bGwtcGFnZS1tb2RhbC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZ1bGxQYWdlTW9kYWxDb21wb25lbnQge1xuICBwdWJsaWMgcG9ydGFsOiBDb21wb25lbnRQb3J0YWw8YW55PjtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEZ1bGxQYWdlTW9kYWxDb21wb25lbnQ+LFxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbCh0aGlzLmRhdGEuY29tcG9uZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmstZGlhbG9nJyxcbiAgc3R5bGVVcmxzOlsnZmstZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnZmstZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbn0pXG5cbi8vQGR5bmFtaWNcbmV4cG9ydCBjbGFzcyBGS0RpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxGS0RpYWxvZ0NvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnlcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZih0aGlzLmRhdGEgJiYgIXRoaXMuZGF0YS50eXBlKSB7XG4gICAgICB0aGlzLmRhdGEudHlwZSA9ICdkZWZhdWx0LWFjY2VwdCc7XG4gICAgfVxuICB9XG5cbiAgb25Ob0NsaWNrKCk6IHZvaWQge1xuICAgIGlmKHRoaXMuZGF0YS5yZWplY3RBY3Rpb24pIHtcbiAgICAgIHRoaXMuZGF0YS5yZWplY3RBY3Rpb24oKTtcbiAgICB9XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgfVxuICBcbiAgb25ZZXNDbGljaygpOiB2b2lkIHtcbiAgICBpZih0aGlzLmRhdGEuYWNjZXB0QWN0aW9uKSB7XG4gICAgICB0aGlzLmRhdGEuYWNjZXB0QWN0aW9uKCk7XG4gICAgfVxuICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYWxlbmRhciwgTG9jYWxlU2V0dGluZ3MgfSBmcm9tICdwcmltZW5nL2NhbGVuZGFyJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9jb21wb25lbnRzL2RvbS9kb21oYW5kbGVyJztcblxuZXhwb3J0IGNvbnN0IENBTEVOREFSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF0ZVBpY2tlckNvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmstZGF0ZS1waWNrZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9may1kYXRlLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZmstZGF0ZS1waWNrZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ292ZXJsYXlTdGF0ZScsIFtcbiAgICAgICAgICAgIHN0YXRlKCdoaWRkZW4nLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiBoaWRkZW4nLCBhbmltYXRlKCc0MDBtcyBlYXNlLWluJykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignaGlkZGVuID0+IHZpc2libGUnLCBhbmltYXRlKCc0MDBtcyBlYXNlLW91dCcpKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCcsXG4gICAgICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1cycsXG4gICAgICAgICdbY2xhc3MuY2FsZW5kYXItYWN0aXZlXSc6J292ZXJsYXlWaXNpYmxlJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbRG9tSGFuZGxlciwgQ0FMRU5EQVJfVkFMVUVfQUNDRVNTT1JdXG59KVxuXG5leHBvcnQgY2xhc3MgRGF0ZVBpY2tlckNvbXBvbmVudCBleHRlbmRzIENhbGVuZGFyIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBWaWV3Q2hpbGQoXCJjbGVhckljb25cIikgY2xlYXJJY29uOiBFbGVtZW50UmVmO1xuXG4gICAgQElucHV0KCkgZGF0ZUZvcm1hdDogc3RyaW5nID0gJ2RkL21tL3l5JztcbiAgICBASW5wdXQoKSBob3VyRm9ybWF0OiBzdHJpbmcgPSAnMTInO1xuICAgIEBJbnB1dCgpIHllYXJOYXZpZ2F0b3IgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHllYXJSYW5nZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHNlbGVjdGVkRGF0ZVJhbmdlOiBhbnk7XG4gICAgQElucHV0KCkgc2hvd0VuZFRpbWUgPSB0cnVlO1xuXG4gICAgcHVibGljIHN0YXJ0VGltZSA9IHsgaG91cjogMCwgbWludXRlOiAwLCBmb3JtYXQ6IFwiQU1cIiwgcG06IGZhbHNlIH07XG4gICAgcHVibGljIGVuZFRpbWUgPSB7IGhvdXI6IDExLCBtaW51dGU6IDU5LCBmb3JtYXQ6IFwiUE1cIiwgcG06IHRydWUgfTtcbiAgICBwdWJsaWMgdGltZUZvcm1hdCA9IFtcIkFNXCIsIFwiUE1cIl07XG5cbiAgICBfbG9jYWxlOiBMb2NhbGVTZXR0aW5ncyA9IHtcbiAgICAgICAgZmlyc3REYXlPZldlZWs6IDAsXG4gICAgICAgIGRheU5hbWVzOiBbXCJTdW5kYXlcIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiXSxcbiAgICAgICAgZGF5TmFtZXNTaG9ydDogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLFxuICAgICAgICBkYXlOYW1lc01pbjogW1wiU3VuXCIsIFwiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCJdLFxuICAgICAgICBtb250aE5hbWVzOiBbIFwiSmFudWFyeVwiLFwiRmVicnVhcnlcIixcIk1hcmNoXCIsXCJBcHJpbFwiLFwiTWF5XCIsXCJKdW5lXCIsXCJKdWx5XCIsXCJBdWd1c3RcIixcIlNlcHRlbWJlclwiLFwiT2N0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCIgXSxcbiAgICAgICAgbW9udGhOYW1lc1Nob3J0OiBbIFwiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsXCJKdWxcIiwgXCJBdWdcIiwgXCJTZXBcIiwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIiBdLFxuICAgICAgICB0b2RheTogJ1RvZGF5JyxcbiAgICAgICAgY2xlYXI6ICdDbGVhcidcbiAgICB9O1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKCksXG4gICAgICAgICAgICBjdXJyZW50WWVhciA9IHRvZGF5LmdldFVUQ0Z1bGxZZWFyKCk7XG5cbiAgICAgICAgdGhpcy55ZWFyUmFuZ2UgPSAoY3VycmVudFllYXItMSkrXCI6XCIrKGN1cnJlbnRZZWFyKzEwKTtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICAgICAgaWYoIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gXCJyYW5nZVwiICl7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gW107XG4gICAgICAgICAgICBpZiggdGhpcy5zZWxlY3RlZERhdGVSYW5nZSl7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSggdGhpcy5zZWxlY3RlZERhdGVSYW5nZS52YWx1ZSApO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKCB0aGlzLnNlbGVjdGlvbk1vZGUgPT09IFwic2luZ2xlXCIgKXtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgaWYoIHRoaXMuc2VsZWN0ZWREYXRlUmFuZ2UgJiYgdGhpcy5zZWxlY3RlZERhdGVSYW5nZS5nZXQoXCJzdGFydF90aW1lXCIpICYmIHRoaXMuc2VsZWN0ZWREYXRlUmFuZ2UuZ2V0KFwic3RhcnRfdGltZVwiKS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoIHtzdGFydF90aW1lOiB0aGlzLnNlbGVjdGVkRGF0ZVJhbmdlLmdldChcInN0YXJ0X3RpbWVcIikudmFsdWV9LCB0cnVlICk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKXtcbiAgICAgICAgaWYoIHRoaXMuc2VsZWN0ZWREYXRlUmFuZ2Upe1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVSYW5nZS5nZXQoXCJzdGFydF90aW1lXCIpLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCBkYXRhICk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKCB7XCJzdGFydF90aW1lXCI6IGRhdGF9ICk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlUmFuZ2UuZ2V0KFwiZW5kX3RpbWVcIikudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoIGRhdGEgKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoIHtcImVuZF90aW1lXCI6IGRhdGF9ICk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dGZpZWxkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVWYWx1ZSggZGF0YSwgYnlQYXNzPWZhbHNlICl7XG4gICAgICAgIGlmKCB0aGlzLnNlbGVjdGlvbk1vZGUgPT09IFwicmFuZ2VcIiB8fCBieVBhc3Mpe1xuICAgICAgICAgICAgaWYoIChkYXRhLnN0YXJ0X3RpbWUgfHwgZGF0YS5lbmRfdGltZSkgJiYgIXRoaXMudmFsdWUgKXtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiggZGF0YS5zdGFydF90aW1lICl7XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0X2RhdGUgPSBuZXcgRGF0ZSggZGF0YS5zdGFydF90aW1lICk7XG4gICAgICAgICAgICAgICAgaWYoIHR5cGVvZiBkYXRhLnN0YXJ0X3RpbWUgPT09IFwic3RyaW5nXCIgJiYgZGF0YS5zdGFydF90aW1lLmluZGV4T2YoXCJaXCIpICE9PSAtMcOCwqApe1xuICAgICAgICAgICAgICAgICAgICBzdGFydF9kYXRlID0gbmV3IERhdGUoIHN0YXJ0X2RhdGUuZ2V0VVRDRnVsbFllYXIoKSwgc3RhcnRfZGF0ZS5nZXRVVENNb250aCgpLCBzdGFydF9kYXRlLmdldFVUQ0RhdGUoKSwgc3RhcnRfZGF0ZS5nZXRVVENIb3VycygpLCBzdGFydF9kYXRlLmdldFVUQ01pbnV0ZXMoKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiggdGhpcy5pc1NpbmdsZVNlbGVjdGlvbigpICl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBzdGFydF9kYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlWzBdID0gc3RhcnRfZGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoIHN0YXJ0X2RhdGUuZ2V0SG91cnMoKSA8PSAxMiAmJiAhdGhpcy5zdGFydFRpbWUucG0gKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUuaG91ciA9IHN0YXJ0X2RhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiggc3RhcnRfZGF0ZS5nZXRIb3VycygpID49IDEyICYmIHRoaXMuc3RhcnRUaW1lLnBtICl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lLmhvdXIgPSBzdGFydF9kYXRlLmdldEhvdXJzKCkgPT09IDEyID8gc3RhcnRfZGF0ZS5nZXRIb3VycygpIDogKHN0YXJ0X2RhdGUuZ2V0SG91cnMoKSAtIDEyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUubWludXRlID0gc3RhcnRfZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBkYXRhLnN0YXJ0X3RpbWUgPT09IG51bGwgJiYgdGhpcy5pbnB1dEZpZWxkVmFsdWUgJiYgdGhpcy5jbGVhckljb24gJiYgdGhpcy5jbGVhckljb24ubmF0aXZlRWxlbWVudCApe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJJY29uLm5hdGl2ZUVsZW1lbnQuY2xpY2soKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIGRhdGEuZW5kX3RpbWUgKXtcbiAgICAgICAgICAgICAgICBsZXQgZW5kX2RhdGUgPSBuZXcgRGF0ZSggZGF0YS5lbmRfdGltZSApO1xuICAgICAgICAgICAgICAgIGlmKCBkYXRhLmVuZF90aW1lLmluZGV4T2YoXCJaXCIpICE9PSAtMcOCwqApe1xuICAgICAgICAgICAgICAgICAgICBlbmRfZGF0ZSA9IG5ldyBEYXRlKCBlbmRfZGF0ZS5nZXRVVENGdWxsWWVhcigpLCBlbmRfZGF0ZS5nZXRVVENNb250aCgpLCBlbmRfZGF0ZS5nZXRVVENEYXRlKCksIGVuZF9kYXRlLmdldFVUQ0hvdXJzKCksIGVuZF9kYXRlLmdldFVUQ01pbnV0ZXMoKSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlWzFdID0gZW5kX2RhdGU7XG4gICAgICAgICAgICAgICAgaWYoIGVuZF9kYXRlLmdldEhvdXJzKCkgPD0gMTIgJiYgIXRoaXMuZW5kVGltZS5wbSApe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZFRpbWUuaG91ciA9IGVuZF9kYXRlLmdldEhvdXJzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoIGVuZF9kYXRlLmdldEhvdXJzKCkgPj0gMTIgJiYgdGhpcy5lbmRUaW1lLnBtICl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kVGltZS5ob3VyID0gZW5kX2RhdGUuZ2V0SG91cnMoKSA9PT0gMTIgPyBlbmRfZGF0ZS5nZXRIb3VycygpIDogKGVuZF9kYXRlLmdldEhvdXJzKCkgLSAxMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZW5kVGltZS5taW51dGUgPSBlbmRfZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiggdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCApe1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRmaWVsZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1JhbmdlU2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSAmJiB0aGlzLnZhbHVlICYmIHRoaXMudmFsdWVbMF0gJiYgdGhpcy52YWx1ZVsxXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNSYW5nZVN0YXJ0RGF0ZShkYXRlTWV0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1JhbmdlU2VsZWN0ZWQoKSAmJiB0aGlzLmlzRGF0ZUVxdWFscyh0aGlzLnZhbHVlWzBdLCBkYXRlTWV0YSk7XG4gICAgfVxuXG4gICAgcHVibGljIGlzUmFuZ2VFbmREYXRlKGRhdGVNZXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzUmFuZ2VTZWxlY3RlZCgpICYmIHRoaXMuaXNEYXRlRXF1YWxzKHRoaXMudmFsdWVbMV0sIGRhdGVNZXRhKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNEYXRlQmV0d2VlblJhbmdlKGRhdGVNZXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzUmFuZ2VTZWxlY3RlZCgpICYmIHRoaXMuaXNTZWxlY3RlZChkYXRlTWV0YSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRhdGVTZWxlY3QoIGV2ZW50LCBkYXRlICl7XG4gICAgICAgIGlmKCB0aGlzLmlzU2luZ2xlU2VsZWN0aW9uKCkgKXtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZUZvcm1hdCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25EYXRlU2VsZWN0KCBldmVudCwgZGF0ZSApO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGVJbnB1dGZpZWxkKCk6IHZvaWR7XG4gICAgICAgIGxldCBmb3JtYXR0ZWRWYWx1ZTtcbiAgICAgICAgaWYoIHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGggKXtcbiAgICAgICAgICAgIGlmKCB0aGlzLmlzUmFuZ2VTZWxlY3Rpb24oKSApe1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLnZhbHVlWzFdICl7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gdGhpcy5mb3JtYXREYXRlKHRoaXMudmFsdWVbMF0sIHRoaXMuZGF0ZUZvcm1hdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFydERhdGVPYmogPSB0aGlzLnZhbHVlWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlID0gc3RhcnREYXRlT2JqLmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0TW9udGggPSBzdGFydERhdGVPYmouZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WWVhciA9IHN0YXJ0RGF0ZU9iai5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZU9iaiA9IHRoaXMudmFsdWVbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmREYXRlID0gZW5kRGF0ZU9iai5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRNb250aCA9IGVuZERhdGVPYmouZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZFllYXIgPSBlbmREYXRlT2JqLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBtb250aHNJblNob3J0ID0gdGhpcy5fbG9jYWxlLm1vbnRoTmFtZXNTaG9ydDtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoIHN0YXJ0RGF0ZSA9PT0gZW5kRGF0ZSAmJiBzdGFydE1vbnRoID09PSBlbmRNb250aCAmJiBzdGFydFllYXIgPT09IGVuZFllYXIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSB0aGlzLmZvcm1hdERhdGUodGhpcy52YWx1ZVswXSwgdGhpcy5kYXRlRm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKCBzdGFydERhdGUgIT09IGVuZERhdGUgJiYgc3RhcnRNb250aCA9PT0gZW5kTW9udGggJiYgc3RhcnRZZWFyID09PSBlbmRZZWFyICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IG1vbnRoc0luU2hvcnRbIHN0YXJ0TW9udGggXStcIiBcIitzdGFydERhdGUrXCItXCIrZW5kRGF0ZStcIiBcIitzdGFydFllYXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiggc3RhcnRNb250aCAhPT0gZW5kTW9udGggJiYgc3RhcnRZZWFyID09PSBlbmRZZWFyICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IG1vbnRoc0luU2hvcnRbIHN0YXJ0TW9udGggXStcIiBcIitzdGFydERhdGUrXCIgLSBcIittb250aHNJblNob3J0WyBlbmRNb250aCBdK1wiIFwiK2VuZERhdGUrXCIgXCIrc3RhcnRZZWFyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoIHN0YXJ0WWVhciAhPT0gZW5kWWVhciApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVkVmFsdWUgPSBtb250aHNJblNob3J0WyBzdGFydE1vbnRoIF0rXCIgXCIrc3RhcnREYXRlK1wiIFwiK3N0YXJ0WWVhcitcIiAtIFwiK21vbnRoc0luU2hvcnRbIGVuZE1vbnRoIF0rXCIgXCIrZW5kRGF0ZStcIiBcIitlbmRZZWFyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoIHRoaXMuaXNTaW5nbGVTZWxlY3Rpb24oKSAmJiB0aGlzLnZhbHVlICl7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHtzdGFydF90aW1lOiB0aGlzLnZhbHVlfSwgdHJ1ZSk7XG4gICAgICAgICAgICBmb3JtYXR0ZWRWYWx1ZSA9IHRoaXMuZm9ybWF0RGF0ZVRpbWUodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICBpZiggdGhpcy5zaG93VGltZSApe1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFZhbHVlID0gZm9ybWF0dGVkVmFsdWUucmVwbGFjZSggZm9ybWF0dGVkVmFsdWUuc2xpY2UoLTIpLCAoIHRoaXMuc3RhcnRUaW1lLnBtID8gXCJQTVwiIDogXCJBTVwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHN1cGVyLnVwZGF0ZUlucHV0ZmllbGQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiggZm9ybWF0dGVkVmFsdWUgKXtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRGaWVsZFZhbHVlID0gZm9ybWF0dGVkVmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgICAgICBpZih0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQgJiYgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuaW5wdXRGaWVsZFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKXtcbiAgICAgICAgaWYoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuZGF0ZXBpY2tlckNsaWNrJiZ0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja1JhbmdlU2VsZWN0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoIHRoaXMuaXNSYW5nZVNlbGVjdGlvbigpICYmIHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGggKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKHRoaXMudmFsdWVbMF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZSh0aGlzLnZhbHVlWzFdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFVuaXQgPSB0aGlzLnN0YXJ0VGltZS5mb3JtYXQudG9Mb2NhbGVMb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRVbml0ID0gdGhpcy5lbmRUaW1lLmZvcm1hdC50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggc3RhcnRVbml0ID09PSBcImFtXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZS5zZXRIb3Vycyh0aGlzLnN0YXJ0VGltZS5ob3VyLCB0aGlzLnN0YXJ0VGltZS5taW51dGUsIDAsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiggc3RhcnRVbml0ID09PSBcInBtXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZS5zZXRIb3Vycyh0aGlzLnN0YXJ0VGltZS5ob3VyICsgMTIsIHRoaXMuc3RhcnRUaW1lLm1pbnV0ZSwgMCwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiggZW5kVW5pdCA9PT0gXCJhbVwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmREYXRlLnNldEhvdXJzKHRoaXMuZW5kVGltZS5ob3VyLCB0aGlzLmVuZFRpbWUubWludXRlLCAwLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoIGVuZFVuaXQgPT09IFwicG1cIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZS5zZXRIb3Vycyh0aGlzLmVuZFRpbWUuaG91ciArIDEyLCB0aGlzLmVuZFRpbWUubWludXRlLCAwLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBbc3RhcnREYXRlLCBlbmREYXRlXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh7XCJldmVudFwiOiBldmVudCwgXCJ2YWx1ZVwiOiB2YWx1ZSwgXCJzdGFydFRpbWVcIjogdGhpcy5zdGFydFRpbWUsIFwiZW5kVGltZVwiOiB0aGlzLmVuZFRpbWV9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVwaWNrZXJDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrUmFuZ2VTZWxlY3Rpb24oKXtcbiAgICAgICAgaWYodGhpcy5pc1JhbmdlU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgICAgIGlmKHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnREYXRlID0gdGhpcy52YWx1ZVswXTtcbiAgICAgICAgICAgICAgICBsZXQgZW5kRGF0ZSA9IHRoaXMudmFsdWVbMV07XG4gICAgICAgICAgICAgICAgaWYoICFlbmREYXRlICl7XG4gICAgICAgICAgICAgICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZSggbmV3IERhdGUoc3RhcnREYXRlKS5zZXRIb3VycygxMiwgMCwgMCwgMCkgKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChbc3RhcnREYXRlLCBlbmREYXRlXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldEhvdXJzKG9yaWdpbjogYW55KSB7XG4gICAgICAgIGxldCB0aW1lT2JqID0gKG9yaWdpbiA9PT0gXCJhbVwiKSA/IHRoaXMuc3RhcnRUaW1lIDogdGhpcy5lbmRUaW1lO1xuICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gdGltZU9iai5ob3VyO1xuICAgICAgICByZXR1cm4gdGltZU9iajtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5jcmVtZW50SG91ciggZXZlbnQsIG9yaWdpbj8gKXtcbiAgICAgICAgbGV0IHRpbWVPYmogPSB0aGlzLnNldEhvdXJzKG9yaWdpbik7XG5cbiAgICAgICAgdGhpcy5zd2l0Y2hBTVBNKCB0aW1lT2JqLCB0cnVlICk7XG4gICAgICAgIHN1cGVyLmluY3JlbWVudEhvdXIoZXZlbnQpO1xuICAgICAgICB0aW1lT2JqLmZvcm1hdCA9IHRpbWVPYmoucG0gPyBcIlBNXCIgOiBcIkFNXCI7XG5cbiAgICAgICAgdGltZU9iai5ob3VyID0gdGhpcy5jdXJyZW50SG91cjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVjcmVtZW50SG91ciggZXZlbnQsIG9yaWdpbj8gKXtcbiAgICAgICAgbGV0IHRpbWVPYmogPSB0aGlzLnNldEhvdXJzKG9yaWdpbik7XG5cbiAgICAgICAgdGhpcy5zd2l0Y2hBTVBNKCB0aW1lT2JqICk7XG4gICAgICAgIHN1cGVyLmRlY3JlbWVudEhvdXIoZXZlbnQpO1xuICAgICAgICB0aW1lT2JqLmZvcm1hdCA9IHRpbWVPYmoucG0gPyBcIlBNXCIgOiBcIkFNXCI7XG5cbiAgICAgICAgdGltZU9iai5ob3VyID0gdGhpcy5jdXJyZW50SG91cjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3dpdGNoQU1QTSggb2JqLCBpbmNyZW1lbnQ9ZmFsc2UgKXtcbiAgICAgICAgaWYoIHRoaXMuaG91ckZvcm1hdCA9PT0gJzEyJyApe1xuICAgICAgICAgICAgY29uc3QgcHJldkhvdXIgPSB0aGlzLmN1cnJlbnRIb3VyO1xuICAgICAgICAgICAgY29uc3QgbmV3SG91ciA9IHRoaXMuY3VycmVudEhvdXIgKyB0aGlzLnN0ZXBIb3VyO1xuICAgICAgICAgICAgaWYgKHByZXZIb3VyIDwgMTIgJiYgbmV3SG91ciA+IDExICYmIGluY3JlbWVudCkge1xuICAgICAgICAgICAgICAgIG9iai5wbSA9ICFvYmoucG07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHByZXZIb3VyID09PSAxMiAmJiAhaW5jcmVtZW50KXtcbiAgICAgICAgICAgICAgICBvYmoucG0gPSAhb2JqLnBtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldE1pbnV0ZXMob3JpZ2luOiBhbnkpIHtcbiAgICAgICAgbGV0IHRpbWVPYmogPSAob3JpZ2luID09PSBcImFtXCIpID8gdGhpcy5zdGFydFRpbWUgOiB0aGlzLmVuZFRpbWU7XG4gICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IHRpbWVPYmoubWludXRlO1xuICAgICAgICByZXR1cm4gdGltZU9iajtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5jcmVtZW50TWludXRlKCBldmVudCwgb3JpZ2luPyApe1xuICAgICAgICBsZXQgdGltZU9iaiA9IHRoaXMuc2V0TWludXRlcyhvcmlnaW4pO1xuICAgICAgICBzdXBlci5pbmNyZW1lbnRNaW51dGUoZXZlbnQpO1xuICAgICAgICB0aW1lT2JqLm1pbnV0ZSA9IHRoaXMuY3VycmVudE1pbnV0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVjcmVtZW50TWludXRlKCBldmVudCwgb3JpZ2luPyApe1xuICAgICAgICBsZXQgdGltZU9iaiA9IHRoaXMuc2V0TWludXRlcyhvcmlnaW4pO1xuICAgICAgICBzdXBlci5kZWNyZW1lbnRNaW51dGUoZXZlbnQpO1xuICAgICAgICB0aW1lT2JqLm1pbnV0ZSA9IHRoaXMuY3VycmVudE1pbnV0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25Gb3JtYXREcm9wZG93bkNoYW5nZSggdmFsdWU6IHN0cmluZywgZnJvbSApe1xuICAgICAgICBsZXQgdW5pdCA9IGZyb20gPT09IFwic3RhcnRcIiA/IFwiYW1cIiA6IFwicG1cIjtcbiAgICAgICAgaWYoIGZyb20gPT09IFwic3RhcnRcIiApe1xuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUucG0gPSB0aGlzLnBtID0gKHZhbHVlID09PSBcIlBNXCIpO1xuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUuZm9ybWF0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnNldEhvdXJzKCB1bml0ICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiggZnJvbSA9PT0gXCJlbmRcIiApe1xuICAgICAgICAgICAgdGhpcy5lbmRUaW1lLnBtID0gdGhpcy5wbSA9ICh2YWx1ZSA9PT0gXCJQTVwiKTtcbiAgICAgICAgICAgIHRoaXMuZW5kVGltZS5mb3JtYXQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0SG91cnMoIHVuaXQgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZVRpbWUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGVhckJ1dHRvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0geyBob3VyOiAwLCBtaW51dGU6IDAsIGZvcm1hdDogXCJBTVwiLCBwbTogZmFsc2UgfTtcbiAgICAgICAgdGhpcy5lbmRUaW1lID0geyBob3VyOiAxMSwgbWludXRlOiA1OSwgZm9ybWF0OiBcIlBNXCIsIHBtOiB0cnVlIH07XG4gICAgICAgIHN1cGVyLm9uQ2xlYXJCdXR0b25DbGljayhldmVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFRpbWVGb3JtYXQoKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lLnBtID0gdGhpcy5wbTtcbiAgICAgICAgdGhpcy5zdGFydFRpbWUuZm9ybWF0ID0gdGhpcy5zdGFydFRpbWUucG0gPyBcIlBNXCIgOiBcIkFNXCI7XG4gICAgfVxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NvbXBvbmVudHMtaWNvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb21wb25lbnRzLWljb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb21wb25lbnRzLWljb24uY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRzSWNvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgbmdPbkluaXQoKSB7fVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ0Rpc2FibGVkXSdcbn0pXG5leHBvcnQgY2xhc3MgTmdEaXNhYmxlZERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgc2V0IG5nRGlzYWJsZWQoIGNvbmRpdGlvbiA6IGJvb2xlYW4gKSB7XG4gICAgY29uc3QgYWN0aW9uID0gY29uZGl0aW9uID8gJ2Rpc2FibGUnIDogJ2VuYWJsZSc7XG4gICAgdGhpcy5uZ0NvbnRyb2wuY29udHJvbFthY3Rpb25dKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBuZ0NvbnRyb2wgOiBOZ0NvbnRyb2wgKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBcIltwZW5kby1hbmFseXRpY3NdXCJcbn0pXG5leHBvcnQgY2xhc3MgUGVuZG9BbmFseXRpY3NEaXJlY3RpdmUge1xuXG4gIHByaXZhdGUgaXNQZW5kb0luaXRpYXRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5saW5rKCk7IFxuICB9XG5cbiAgcHVibGljIGxpbmsoKSB7XG4gICAgbGV0IHVzZXJEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGZjdXJyZW50LXVzZXInKSB8fCBcInt9XCIpO1xuICAgICAgXG4gICAgICBpZiAoIXRoaXMuaXNQZW5kb0luaXRpYXRlZCAmJiB1c2VyRGF0YSAmJiBPYmplY3Qua2V5cyh1c2VyRGF0YSkubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaW5pdGl0YXRlKCk7XG4gICAgICB9ICAgXG4gICAgfVxuICBwcml2YXRlIGluaXRpdGF0ZSgpIHtcbiAgICB0aGlzLmlzUGVuZG9Jbml0aWF0ZWQgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBsZXQgcGVuZG9Gbj0gYChmdW5jdGlvbihhcGlLZXkpIHtcbiAgICAgICAgKFxuICAgICAgICAgIGZ1bmN0aW9uKHAsZSxuLGQsbykge1xuICAgICAgICAgIHZhciB2LHcseCx5LHo7bz1wW2RdPXBbZF18fHt9O1xuICAgICAgICAgIG8uX3E9W107XG4gICAgICAgICAgdj1bJ2luaXRpYWxpemUnLCdpZGVudGlmeScsJ3VwZGF0ZU9wdGlvbnMnLCdwYWdlTG9hZCddO1xuICAgICAgICAgIGZvcih3PTAseD12Lmxlbmd0aDt3PHg7Kyt3KVxuICAgICAgICAgIChmdW5jdGlvbihtKXtcbiAgICAgICAgICAgIG9bbV09b1ttXXx8ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgby5fcVttPT09dlswXT8ndW5zaGlmdCc6J3B1c2gnXShbbV0uY29uY2F0KFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLDApKSl9fSkodlt3XSk7XG4gICAgICAgICAgICAgIHk9ZS5jcmVhdGVFbGVtZW50KG4pO3kuYXN5bmM9ITA7XG4gICAgICAgICAgICAgIHkuc3JjPSdodHRwczovL2Nkbi5wZW5kby5pby9hZ2VudC9zdGF0aWMvJythcGlLZXkrJy9wZW5kby5qcyc7ej1lLmdldEVsZW1lbnRzQnlUYWdOYW1lKG4pWzBdO3oucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoeSx6KX0pKHdpbmRvdyxkb2N1bWVudCwnc2NyaXB0JywncGVuZG8nKTsgXG4gICAgICAgICAgICAgIHZhciB1c2VyRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RmY3VycmVudC11c2VyJykgfHwgJ3t9Jyk7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQRU5ETyBJTklUSUFURUQnKTtcbiAgICAgICAgICAgICAgaWYodXNlckRhdGEpe1xuICAgICAgICAgICAgICBwZW5kby5pbml0aWFsaXplKHt2aXNpdG9yOntpZDp1c2VyRGF0YS51c2VySWR8fCdDVVJSRU5ULVVTRVInLGVtYWlsOnVzZXJEYXRhLmVtYWlsQWRkcmVzc3x8Jycscm9sZTp1c2VyRGF0YS5yb2xlfHwnJ30sYWNjb3VudDp7aWQ6dXNlckRhdGEuY29tcGFueS5pZHx8JycsbmFtZTp1c2VyRGF0YS5jb21wYW55fHwnJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgfSkoJ2I3M2EwZjRmLWU4NDItNDEwNy01YzdiLWM5ZjZmYzIxZWRhMicpYDtcbiAgICAgICAgbGV0IEZ1bmMgPSBGdW5jdGlvbjtcbiAgICAgICAgbmV3IEZ1bmMocGVuZG9GbikoKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnRVhDRVBUSU9OIElOIFBFTkRPJywgZSk7XG4gICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2hpZ2hsaWdodF0nXG59KVxuZXhwb3J0IGNsYXNzIEhpZ2hsaWdodERpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQge1xuXG4gIEBJbnB1dCgnaGlnaGxpZ2h0Jykgc2VhcmNoVGVybSA9IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgY2FzZVNlbnNpdGl2ZSA9IHRydWU7XG5cbiAgcHJpdmF0ZSB2aWV3UmVuZGVyZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBXUkFQUEVSX1RPS0VOID0gJz09LS09PSMjJztcblxuICBwcml2YXRlIGdldCBjYXNlU2Vuc2l0aXZpdHkoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuY2FzZVNlbnNpdGl2ZSA/ICcnIDogJ2knOyB9XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5oaWdobGlnaHRTZWFyY2hUZXJtKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3UmVuZGVyZWQgPSB0cnVlO1xuICB9XG5cblxuICBoaWdobGlnaHRTZWFyY2hUZXJtKCkge1xuICAgIC8vIGluaXRpYWwgbmdDaGFnZSBjYWxsIHdpbGwgcmVzdWx0IHdpdGggbnVsbCBcXCB1bmRlZmluZWQuXG4gICAgaWYgKCF0aGlzLnNlYXJjaFRlcm0pIHtcbiAgICAgIC8vIHdoZW4gdXNlciBkZWxldGVzIGFsbCB0ZXh0IHRoZSBzZWFyY2hUZXJtIGlzIHNldCB0byAnJyB3ZSBuZWVkIHRvIHJlbW92ZSBhbGwgbWFya3MuXG4gICAgICBpZiAodGhpcy52aWV3UmVuZGVyZWQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVQcmV2aW91c2x5TWFya2VkVGV4dEluTm9kZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMucmVtb3ZlUHJldmlvdXNseU1hcmtlZFRleHRJbk5vZGUoKTtcbiAgICAgIHRoaXMubWFya01hdGNoZWRUZXh0VG9rZW5zKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtYXJrTWF0Y2hlZFRleHRUb2tlbnMoaHRtbE5vZGU6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgX3NlYXJjaFRlcm0gPSB0aGlzLmdldFNlYXJjaFRlcm0oKTtcbiAgICBjb25zdCBzZWFyY2hSZWdleCA9IG5ldyBSZWdFeHAoX3NlYXJjaFRlcm0sICdnbWknKTtcblxuICAgIGNvbnN0IF9zZWFyY2hUZXJtVW5pcXVlVG9rZW5zID0gdGhpcy5nZXRVbmlxdWVUb2tlbldyYXBwZWRTZWFyY2hUZXJtKCk7XG4gICAgY29uc3Qgc2VhcmNoUmVnZXhVbmlxdWVUb2tlbnMgPSBuZXcgUmVnRXhwKF9zZWFyY2hUZXJtVW5pcXVlVG9rZW5zLCAnZ21pJyk7XG4gICAgdGhpcy50cmF2ZXJzZUh0bWxFbGVtZW50c1RyZWUoaHRtbE5vZGUsIGUgPT4ge1xuICAgICAgdGhpcy50cmF2ZXJzZU5vZGVzSW5FbGVtZW50KGh0bWxOb2RlLmNoaWxkTm9kZXMsIG5vZGUgPT4gdGhpcy53cmFwVW5pcXVlVG9rZW5zQXJvdW5kTWF0Y2hlZFRleHQobm9kZSwgc2VhcmNoUmVnZXgpKTtcbiAgICB9KTtcblxuICAgIHRoaXMubWFya01hdGNoZWRUZXh0QW5kUmVtb3ZlVW5pcXVlVG9rZW5zKGh0bWxOb2RlLCBzZWFyY2hSZWdleFVuaXF1ZVRva2Vucyk7XG4gIH1cblxuICBwcml2YXRlIG1hcmtNYXRjaGVkVGV4dEFuZFJlbW92ZVVuaXF1ZVRva2VucyhodG1sTm9kZTogSFRNTEVsZW1lbnQsIHNlYXJjaFJlZ2V4OiBSZWdFeHApIHtcbiAgICBpZiAoaHRtbE5vZGUuaW5uZXJIVE1MKSB7XG4gICAgICBjb25zdCBpbm5lckh0bWwgPSBodG1sTm9kZS5pbm5lckhUTUw7XG4gICAgICBjb25zdCBuZXdIdG1sID0gaW5uZXJIdG1sLnJlcGxhY2Uoc2VhcmNoUmVnZXgsIG1hdGNoID0+IHtcbiAgICAgICAgY29uc3Qgd3JhcHBlckxlbmd0aCA9IHRoaXMuV1JBUFBFUl9UT0tFTi5sZW5ndGg7XG4gICAgICAgIGNvbnN0IG1hcmtlZFN0ciA9IG1hdGNoLnN1YnN0cih3cmFwcGVyTGVuZ3RoLCBtYXRjaC5sZW5ndGggLSAod3JhcHBlckxlbmd0aCAqIDIpKTtcbiAgICAgICAgcmV0dXJuIGA8bWFyayBjbGFzcz1cImhpZ2hsaWdodGVkXCIgY2xhc3M9XCJtYXJrZWRcIj4ke21hcmtlZFN0cn08L21hcms+YDtcbiAgICAgIH0pO1xuXG4gICAgICBodG1sTm9kZS5pbm5lckhUTUwgPSBuZXdIdG1sO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJhdmVyc2VOb2Rlc0luRWxlbWVudChub2RlczogTm9kZUxpc3QsIHZpc2l0Q2FsbGJhY2s6IChub2RlOiBOb2RlKSA9PiBhbnkpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICB2aXNpdENhbGxiYWNrKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgd3JhcFVuaXF1ZVRva2Vuc0Fyb3VuZE1hdGNoZWRUZXh0KGh0bWxOb2RlOiBOb2RlLCBzZWFyY2hSZWdleDogUmVnRXhwKSB7XG4gICAgY29uc3QgaW5uZXJUZXh0ID0gaHRtbE5vZGUubm9kZVZhbHVlO1xuICAgIGNvbnN0IG5ld1RleHQgPSBpbm5lclRleHQucmVwbGFjZShzZWFyY2hSZWdleCwgYCR7dGhpcy5XUkFQUEVSX1RPS0VOfSQmJHt0aGlzLldSQVBQRVJfVE9LRU59YCk7XG4gICAgaHRtbE5vZGUubm9kZVZhbHVlID0gbmV3VGV4dDtcbiAgfVxuXG4gIHByaXZhdGUgdHJhdmVyc2VIdG1sRWxlbWVudHNUcmVlKGN1cnJlbnROb2RlOiBIVE1MRWxlbWVudCwgdmlzaXRDYWxsYmFjazogKG5vZGU6IEhUTUxFbGVtZW50KSA9PiBhbnkpIHtcbiAgICBpZiAoY3VycmVudE5vZGUpIHtcbiAgICAgIHZpc2l0Q2FsbGJhY2soY3VycmVudE5vZGUpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNoaWxkRWxlbWVudCA9IGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldO1xuICAgICAgaWYoIWNoaWxkRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ25vLWhpZ2hsaWdodCcpKSB7XG4gICAgICAgIHRoaXMubWFya01hdGNoZWRUZXh0VG9rZW5zKDxIVE1MRWxlbWVudD5jaGlsZEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlUHJldmlvdXNseU1hcmtlZFRleHRJbk5vZGUoKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBtYXJraW5nUGF0dGVybiA9IG5ldyBSZWdFeHAoJzxtYXJrIGNsYXNzPVwiaGlnaGxpZ2h0ZWRcIj58PFxcL21hcms+JywgJ2cnKTtcbiAgICBjb25zdCBjbGVhblRleHQgPSBub2RlLmlubmVySFRNTC5yZXBsYWNlKG1hcmtpbmdQYXR0ZXJuLCAnJyk7XG4gICAgbm9kZS5pbm5lckhUTUwgPSBjbGVhblRleHQ7XG4gIH1cblxuICBwcml2YXRlIGdldFNlYXJjaFRlcm0oKSB7XG4gICAgbGV0IGVzY2FwZWRTZWFyY2hUZXJtID0gYCR7dGhpcy5lc2NhcGVSZWdFeHAodGhpcy5zZWFyY2hUZXJtKX1gO1xuICAgIGNvbnN0IHNwYWNlVG9NdWx0aU1hdGNoUmVnZXggPSBuZXcgUmVnRXhwKCcgJywgJ2dtJyk7XG4gICAgZXNjYXBlZFNlYXJjaFRlcm0gPSBlc2NhcGVkU2VhcmNoVGVybS5yZXBsYWNlKHNwYWNlVG9NdWx0aU1hdGNoUmVnZXgsICd8Jyk7XG4gICAgcmV0dXJuIGVzY2FwZWRTZWFyY2hUZXJtO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRVbmlxdWVUb2tlbldyYXBwZWRTZWFyY2hUZXJtKCkge1xuICAgIGxldCBlc2NhcGVkU2VhcmNoVGVybSA9IHRoaXMuZXNjYXBlUmVnRXhwKHRoaXMuc2VhcmNoVGVybSk7XG4gICAgY29uc3Qgc3BhY2VUb011bHRpTWF0Y2hSZWdleCA9IG5ldyBSZWdFeHAoJyAnLCAnZ20nKTtcbiAgICBlc2NhcGVkU2VhcmNoVGVybSA9IGVzY2FwZWRTZWFyY2hUZXJtLnJlcGxhY2Uoc3BhY2VUb011bHRpTWF0Y2hSZWdleCwgYCR7dGhpcy5XUkFQUEVSX1RPS0VOfXwke3RoaXMuV1JBUFBFUl9UT0tFTn1gKTtcbiAgICBlc2NhcGVkU2VhcmNoVGVybSA9IGAke3RoaXMuV1JBUFBFUl9UT0tFTn0ke2VzY2FwZWRTZWFyY2hUZXJtfSR7dGhpcy5XUkFQUEVSX1RPS0VOfWA7XG4gICAgcmV0dXJuIGVzY2FwZWRTZWFyY2hUZXJtO1xuICB9XG5cbiAgcHJpdmF0ZSBlc2NhcGVSZWdFeHAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKCcvW1xcLVxcW1xcXVxcL1xce1xcfVxcKFxcKVxcKlxcK1xcP1xcLlxcXFxcXF5cXCRcXHxdL2cnLCAnXFxcXCQmJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbi8vIEBkeW5hbWljXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdba2V5QmxvY2tdJ1xufSlcblxuZXhwb3J0IGNsYXNzIEtleUJsb2NrRGlyZWN0aXZlIHtcbiAgQElucHV0KCdrZXlCbG9jaycpIGtleTogYW55O1xuICBwcml2YXRlIGVsOiBOZ0NvbnRyb2w7XG4gIHByaXZhdGUgX3BhdHRlcm46IFJlZ0V4cFxuICBwcml2YXRlIGRlbGF5OiBhbnkgPSBudWxsO1xuXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFBBVFRFUk5TID0ge1xuICAgIHB2ZGVjaW1hbCA6IGZ1bmN0aW9uIChwcmVjaXNpb24pIHtcbiAgICAgIHJldHVybiAobmV3IFJlZ0V4cCgvXFxkKlxcLj9cXGR7MX0/L2cpKTtcbiAgICB9LFxuICAgIGRlY2ltYWwgOiAgZnVuY3Rpb24gKHByZWNpc2lvbikge1xuICAgICAgcmV0dXJuIChuZXcgUmVnRXhwKCcoXFwtezAsXFxcXGQrKChcXFxcLlxcXFxkeyR7cHJlY2lzaW9ufX0pfFxcXFwuKT8pJywgJ2cnKSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IgKHByaXZhdGUgbmdDb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgICB0aGlzLmVsID0gbmdDb250cm9sO1xuICB9XG5cbiAgLy8gTGlzdGVuIGZvciB0aGUgaW5wdXQgZXZlbnQgdG8gYWxzbyBoYW5kbGUgY29weSBhbmQgcGFzdGUuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQudGFyZ2V0LnZhbHVlJ10pIG9uSW5wdXQodmFsdWU6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAvL0RlbGF5IGlzIGFkZGVkIGZvciBmaXJlZm94IHRvIGFjY2VwdCB0aGUgZGVjaW1hbCBwb2ludFxuICAgICAgaWYod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3hcIikgPiAtMSkge1xuICAgICAgICBpZiAodGhpcy5kZWxheSkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRlbGF5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlbGF5ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlUmVnZXgodmFsdWUpXG4gICAgICAgIH0sIDE1MDApO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMudmFsaWRhdGVSZWdleCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdJbnZhbGlkIFJlZ0V4cCBvciBQYXR0ZXJuIENvbmZpZycsIGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGVSZWdleCh2YWx1ZTogc3RyaW5nKTogdm9pZHtcbiAgICBpZih0aGlzLnBhdHRlcm4pe1xuICAgICAgdGhpcy5lbC5jb250cm9sLnBhdGNoVmFsdWUoXy5maXJzdCh2YWx1ZS5tYXRjaCh0aGlzLnBhdHRlcm4pKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXQgcGF0dGVybigpOiBSZWdFeHAge1xuICAgIGlmKHRoaXMuX3BhdHRlcm4pe1xuICAgICAgcmV0dXJuIHRoaXMuX3BhdHRlcm47XG4gICAgfVxuICAgIGlmKHRoaXMuaXNQYXR0ZXJuSGFzaCl7XG4gICAgICByZXR1cm4gdGhpcy5fcGF0dGVybiA9IEtleUJsb2NrRGlyZWN0aXZlLlBBVFRFUk5TW18uZmlyc3QodGhpcy5rZXkpXShfLmxhc3QodGhpcy5rZXkpKVxuICAgIH1cbiAgICBpZih0eXBlb2YgdGhpcy5rZXkgPT0gXCJzdHJpbmdcIil7XG4gICAgICByZXR1cm4gdGhpcy5fcGF0dGVybiA9IEtleUJsb2NrRGlyZWN0aXZlLlBBVFRFUk5TW3RoaXMua2V5XVxuICAgIH1cbiAgICBpZihfLmlzUmVnRXhwKHRoaXMua2V5KSl7XG4gICAgICByZXR1cm4gdGhpcy5fcGF0dGVybiA9IHRoaXMua2V5IGFzIFJlZ0V4cFxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcHJpdmF0ZSBnZXQgaXNQYXR0ZXJuSGFzaCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gXy5pc0FycmF5KHRoaXMua2V5KSAmJiBfLnNpemUodGhpcy5rZXkpID09IDIgJiYgdHlwZW9mIF8uZmlyc3QodGhpcy5rZXkpID09IFwic3RyaW5nXCIgJiYgdHlwZW9mIF8ubGFzdCh0aGlzLmtleSkgPT0gXCJudW1iZXJcIiA/IHRydWUgOiBmYWxzZVxuICB9XG59XG4iLCJleHBvcnQgY29uc3QgTGljZW5zaW5nQ29uZmlnID0ge1xuICAgIFBST0RVQ1Q6IHtcbiAgICAgICAgSU5TSUdIVFM6ICdpbnNpZ2h0cydcbiAgICB9LFxuICAgIElOU0lHSFRTOiB7XG4gICAgICAgIEFEVkFOQ0VEX0FOQUxZVElDU19EQVNIQk9BUkQ6ICdhZHZhbmNlZF9hbmFseXRpY3NfZGFzaGJvYXJkJyxcbiAgICAgICAgQURWQU5DRURfQU5BTFlUSUNTX0RBU0hCT0FSRF9PQ0VBTjogJ2FkdmFuY2VkX2FuYWx5dGljc19kYXNoYm9hcmRfb2NlYW4nLFxuICAgICAgICBBRFZBTkNFRF9BTkFMWVRJQ1NfU1VCU0NSSVBUSU9OOiAnYWR2YW5jZWRfYW5hbHl0aWNzX3N1YnNjcmlwdGlvbicsXG4gICAgICAgIEFOQUxZVElDU19BUEk6ICdhbmFseXRpY3NfYXBpJyxcbiAgICAgICAgQU5BTFlUSUNTX0RBU0hCT0FSRDogJ2FuYWx5dGljc19kYXNoYm9hcmQnLFxuICAgICAgICBBTkFMWVRJQ1NfREFTSEJPQVJEX09DRUFOOiAnYW5hbHl0aWNzX2Rhc2hib2FyZF9vY2VhbicsXG4gICAgICAgIEFOQUxZVElDU19TVUJTQ1JJUFRJT046ICdhbmFseXRpY3Nfc3Vic2NyaXB0aW9uJyxcbiAgICAgICAgQkVOQ0hNQVJLSU5HX0RBU0hCT0FSRDogJ2JlbmNobWFya2luZ19kYXNoYm9hcmQnLFxuICAgICAgICBDT05TSVNURU5DWV9BUEk6ICdjb25zaXN0ZW5jeV9hcGknLFxuICAgICAgICBDT05TSVNURU5DWV9EQVNIQk9BUkQ6ICdjb25zaXN0ZW5jeV9kYXNoYm9hcmQnLFxuICAgICAgICBDT05TSVNURU5DWV9TVUJTQ1JJUFRJT046ICdjb25zaXN0ZW5jeV9zdWJzY3JpcHRpb24nLFxuICAgICAgICBBRFZBTkNFRF9BTkFMWVRJQ1NfRVhFQ19EQVNIOiAnYWR2YW5jZWRfYW5hbHl0aWNzX2V4ZWNfZGFzaCcsXG4gICAgICAgIFJFQ09fQVJSSVZBTF9FWEVDX0RBU0g6ICdyZWNvX2Fycml2YWxfZXhlY19kYXNoJyxcbiAgICAgICAgUkVDT19BUlJJVkFMX1JFQ09NTUVOREFUSU9OOiAncmVjb19hcnJpdmFsX3JlY29tbWVuZGF0aW9uJyxcbiAgICAgICAgUkVDT19ERVBBUlRVUkVfRVhFQ19EQVNIOiAncmVjb19kZXBhcnR1cmVfZXhlY19kYXNoJyxcbiAgICAgICAgUkVDT19ERVBBUlRVUkVfUkVDT01NRU5EQVRJT046ICdyZWNvX2RlcGFydHVyZV9yZWNvbW1lbmRhdGlvbicsXG4gICAgICAgIFJFQ09fREVQQVJUVVJFX1RSQUNLSU5HOiAncmVjb19kZXBhcnR1cmVfdHJhY2tpbmcnLFxuICAgICAgICBSRVNDSEVEVUxFU19FWEVDX0RBU0g6ICdyZXNjaGVkdWxlc19leGVjX2Rhc2gnLFxuICAgICAgICBSRVNDSEVEVUxFU19SRUNPTU1FTkRBVElPTjogJ3Jlc2NoZWR1bGVzX3JlY29tbWVuZGF0aW9uJyxcbiAgICAgICAgVFJBTlNJVF9SSVNLX0VYRUNfREFTSDogJ3RyYW5zaXRfcmlza19leGVjX2Rhc2gnLFxuICAgICAgICBUUkFOU0lUX1JJU0tfUkVDT01NRU5EQVRJT046ICd0cmFuc2l0X3Jpc2tfcmVjb21tZW5kYXRpb24nXG4gICAgfSxcbiAgICBJTlNJR0hUU19MSUNFTlNFX0ZMQUc6ICdpbnNpZ2h0cy1saWNlbnNpbmcnXG59O1xuIiwiaW1wb3J0IHtMaWNlbnNpbmdDb25maWd9IGZyb20gJy4vbGljZW5zaW5nLWNvbmZpZy5jb25zdGFudCc7XG5cbmV4cG9ydCBjb25zdCBoZWFkZXJGZWF0dXJlcyA9IHtcbiAgJ2Rldic6IFtcbiAgICB7XG4gICAgICAgIG5hbWU6ICdpbnNpZ2h0cy1hcGknLFxuICAgICAgICBlbmFibGVkIDogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2xvYWQtZnJhbWV3b3JrLXVwZGF0ZScsXG4gICAgICBlbmFibGVkOiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2J1bGstbm90aWZpY2F0aW9uLXVwbG9hZCcsXG4gICAgICBlbmFibGVkOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnbmV3LWFpci1wYWdlJyxcbiAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICB9XG4gIF0sXG4gICdma2Rldic6IFtcbiAgICB7XG4gICAgICBuYW1lOiAnaW5zaWdodHMtYXBpJyxcbiAgICAgIGVuYWJsZWQgOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBMaWNlbnNpbmdDb25maWcuSU5TSUdIVFNfTElDRU5TRV9GTEFHLFxuICAgICAgZW5hYmxlZCA6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdsb2FkLWZyYW1ld29yay11cGRhdGUnLFxuICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdidWxrLW5vdGlmaWNhdGlvbi11cGxvYWQnLFxuICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ25ldy1haXItcGFnZScsXG4gICAgICBlbmFibGVkOiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3JlY28tZW5naW5lJyxcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgc3VwZXJBZG1pbnMgOiB0cnVlLFxuICAgICAgdXNlcklkczogW1xuICAgICAgICAnbWFiZHRlc3R1c2VyJ1xuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3VzZXItbGljZW5zaW5nJyxcbiAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICBzdXBlckFkbWlucyA6IGZhbHNlLFxuICAgICAgdXNlcklkczogW1xuICAgICAgICAnbWF0aGFuJyxcbiAgICAgICAgJ2hhcmlzaCcsXG4gICAgICAgICdnb3V0aGFtZWxhbmdlc3dhcmFuJyxcbiAgICAgICAgJ2FuYW50aGFrcmlzaG5hbmcnLFxuICAgICAgICAncmljaC1kdWJlJyxcbiAgICAgICAgJ2dhbmVzaCdcbiAgICAgIF1cbiAgICB9XG4gIF0sXG4gICd1YXQnOiBbXG4gICAge1xuICAgICAgbmFtZTogJ2xvYWQtZnJhbWV3b3JrLXVwZGF0ZScsXG4gICAgICBlbmFibGVkOiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ25ldy1vY2Vhbi1wYWdlJyxcbiAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdidWxrLW5vdGlmaWNhdGlvbi11cGxvYWQnLFxuICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ25ldy1haXItcGFnZScsXG4gICAgICBlbmFibGVkOiB0cnVlXG4gICAgfVxuICBdLFxuICAnc3RhZ2luZyc6IFtcbiAgICB7XG4gICAgICBuYW1lOiAnbG9hZC1mcmFtZXdvcmstdXBkYXRlJyxcbiAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZmFjaWxpdHktbWFuYWdlcicsXG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIHN1cGVyQWRtaW5zIDogdHJ1ZSxcbiAgICAgIHVzZXJJZHMgOiBbXG4gICAgICAgICdtYWlsLXNhbXl1JyxcbiAgICAgICAgJ2FkbWluLXdpdGhmbScsXG4gICAgICAgICdwdXJlLWJldmVyYWdlcycsXG4gICAgICAgICdjYXJnaWxsZGVtbycsXG4gICAgICAgICd4cG9sZGVtbydcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdidWxrLW5vdGlmaWNhdGlvbi11cGxvYWQnLFxuICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ25ldy1haXItcGFnZScsXG4gICAgICBlbmFibGVkOiBmYWxzZVxuICAgIH1cbiAgXSxcbiAgJ21pcnJvcic6IFtcbiAgICB7XG4gICAgICBuYW1lOiAnbG9hZC1mcmFtZXdvcmstdXBkYXRlJyxcbiAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICduZXctb2NlYW4tcGFnZScsXG4gICAgICBlbmFibGVkOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnYnVsay1ub3RpZmljYXRpb24tdXBsb2FkJyxcbiAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICduZXctYWlyLXBhZ2UnLFxuICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICB9XG4gIF0sXG4gICdwcm9kdWN0aW9uJzogW1xuICAgIHtcbiAgICAgIG5hbWU6ICdpbnNpZ2h0cy1hcGknLFxuICAgICAgZW5hYmxlZCA6IGZhbHNlLFxuICAgICAgY29tcGFueUlkcyA6IFtcbiAgICAgICAgJ3R5c29uJyxcbiAgICAgICAgJ3N5c2NvJyxcbiAgICAgICAgJ2RlbW8tb3JnJ1xuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogTGljZW5zaW5nQ29uZmlnLklOU0lHSFRTX0xJQ0VOU0VfRkxBRyxcbiAgICAgIGVuYWJsZWQgOiB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnbG9hZC1mcmFtZXdvcmstdXBkYXRlJyxcbiAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZmFjaWxpdHktbWFuYWdlcicsXG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIHN1cGVyQWRtaW5zIDogdHJ1ZSxcbiAgICAgIHVzZXJJZHMgOiBbXG4gICAgICAgICdhcHJpbC1tb3NlcicsXG4gICAgICAgICd2aW5jZW50LWtvbGVjaycsXG4gICAgICAgICdyb2ItaGFkZG9jaycsXG4gICAgICAgICd3aXRoLWZtJyxcbiAgICAgICAgJ3JvYmVydC1yZWduaWVyJyxcbiAgICAgICAgJ2phc29uLXdpY2tsdW5kJyxcbiAgICAgICAgJ2FubmUtbWFyaWVrYW5lJyxcbiAgICAgICAgJ21pa2UtbWNrZW93bicsXG4gICAgICAgICdtaWtlLXByb3ZvJyxcbiAgICAgICAgJ3NoYWQtam9obnNvbicsXG4gICAgICAgICdjaGFkLXNlaWRlbmVjaycsXG4gICAgICAgICdqb2huLWJvcnNjaCcsXG4gICAgICAgICdtaWtlLWNhcnJvenphJyxcbiAgICAgICAgJ2xvdS1nZXJtYW5vJyxcbiAgICAgICAgJ21ja2luc2V5LWNvY2Fjb2xhJyxcbiAgICAgICAgJ21ja2luc2V5LWxvbCcsXG4gICAgICAgICdtY2tpbnNleS13ZWdtYW5zJyxcbiAgICAgICAgJ21ja2luc2V5LWdpYW50ZWFnbGUnLFxuICAgICAgICAnZG9uLXdlcm1lcnNraXJjaGVuJyxcbiAgICAgICAgJ3N0ZXZlbi1tb29yZS0xOTc3JyxcbiAgICAgICAgJ3JhZmFlbC1yb2RyaWd1ZXotNzk0NidcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdidWxrLW5vdGlmaWNhdGlvbi11cGxvYWQnLFxuICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ25ldy1vY2Vhbi1wYWdlJyxcbiAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICduZXctYWlyLXBhZ2UnLFxuICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICd1c2VyLWxpY2Vuc2luZycsXG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgc3VwZXJBZG1pbnMgOiBmYWxzZSxcbiAgICAgIHVzZXJJZHM6IFtcbiAgICAgICAgJ2hhcmktaGFyYScsXG4gICAgICAgICdtYXRoYW5rdW1hci1yJyxcbiAgICAgICAgJ2FuYW50aGFrcmlzaG5hbmcnLFxuICAgICAgICAnZ291dGhhbScsXG4gICAgICAgICdnYW5lc2gnLFxuICAgICAgICAncmljaC1kdWJlJ1xuICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdyZWNvLWVuZ2luZScsXG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIHN1cGVyQWRtaW5zIDogdHJ1ZSxcbiAgICAgIHVzZXJJZHMgOiBbXG4gICAgICAgICdjcmFpZy1ieWVycycsXG4gICAgICAgICdqYW5lLWtlbm5lZHknLFxuICAgICAgICAna2Vycmkta2Fpc2VyJyxcbiAgICAgICAgJ2NoYXJsZXMtam95bmVyJyxcbiAgICAgICAgJ3JvYi1oYWRkb2NrJyxcbiAgICAgICAgJ2plZmYtY29nZ2xlcycsXG4gICAgICAgICdhbmR5LXNjaGFyZmYnLFxuICAgICAgICAnd2FsdGVyLW1vcnJpcy01NDAwJyxcbiAgICAgICAgJ21pbGFuLWJ5cmQnLFxuICAgICAgICAnY2hyaXN0b3BoZXItYXJtc3Ryb25nJyxcbiAgICAgICAgJ2thbGV5LWdpbG1vcmUnLFxuICAgICAgICAnbWF0dC1taWNoZWxzJyxcbiAgICAgICAgJ2phc29uLWZyZXJpY2gnLFxuICAgICAgICAnc2NvdHQtcG9uc2ZvcmQnLFxuICAgICAgICAnZGF3bi1nb3VkaWUnLFxuICAgICAgICAncnlhbi1vbm8nLFxuICAgICAgICAnYXVzdGluLWZyYWRldHRlJyxcbiAgICAgICAgJ2JyaWFuLXN0b3VmZXInLFxuICAgICAgICAna2xheS1kYWx0b24nLFxuICAgICAgICAnam9obi1yZXlub2xkcycsXG4gICAgICAgICdqb2huLXdpbGxpYW1zLTcwMDEnLFxuICAgICAgICAnam9lLWRlcGFvbGEnLFxuICAgICAgICAnamFzb24ta2ltJyxcbiAgICAgICAgJ2Rvbi13ZXJtZXJza2lyY2hlbicsXG4gICAgICAgICd0aW1vdGh5LWRlbm9mYScsXG4gICAgICAgICdpbHNlLXBhY2hlY28nLFxuICAgICAgICAncmljaC1kdWJlLTk2MTUnXG4gICAgICBdXG4gICAgfVxuICBdXG59O1xuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9jb25maWcuaGVscGVyJztcbmltcG9ydCB7IENvbXBhbnlDb250ZXh0U2VydmljZSB9IGZyb20gJy4vY29tcGFueS1jb250ZXh0LnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VjdXJpdHlTZXJ2aWNlIH0gZnJvbSAnLi9zZWN1cml0eS5zZXJ2aWNlJztcbmltcG9ydCB7IGhlYWRlckZlYXR1cmVzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2ZlYXR1cmVzLmNvbnN0YW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZlYXR1cmVGbGFnU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wYW55Q29udGV4dFNlcnZpY2U6IENvbXBhbnlDb250ZXh0U2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzZWN1cml0eVNlcnZpY2U6IFNlY3VyaXR5U2VydmljZSkge1xuICB9XG5cbiAgcHVibGljIGlzRmVhdHVyZUVuYWJsZWQobmFtZTogc3RyaW5nLCBmcm9tSGVhZGVyID0gZmFsc2UpOiBib29sZWFuIHtcbiAgICBsZXQgaXNFbmFibGVkID0gZmFsc2UsIGZlYXR1cmUgPSB0aGlzLmdldEZsYWdCeU5hbWUobmFtZSwgZnJvbUhlYWRlcik7XG4gICAgaWYgKGZlYXR1cmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaXNFbmFibGVkID0gZmVhdHVyZS5lbmFibGVkO1xuICAgICAgaWYoZmVhdHVyZS5zdXBlckFkbWlucyAmJiB0aGlzLnNlY3VyaXR5U2VydmljZS5pc1N1cGVyQWRtaW4pe1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmKGZlYXR1cmUuY29tcGFueUlkcyAmJiBmZWF0dXJlLmNvbXBhbnlJZHMubGVuZ3RoKSB7XG4gICAgICAgIGxldCBjdXJyZW50Q29tcGFueSA9IHRoaXMuY29tcGFueUNvbnRleHRTZXJ2aWNlLmdldENvbXBhbnlDb250ZXh0KCkgfHwgdGhpcy5zZWN1cml0eVNlcnZpY2UuY3VycmVudFVzZXIuY29tcGFueUlkO1xuICAgICAgICBpc0VuYWJsZWQgPSAoZmVhdHVyZS5jb21wYW55SWRzLmluZGV4T2YoY3VycmVudENvbXBhbnkpICE9IC0xKTtcbiAgICAgICAgcmV0dXJuIGlzRW5hYmxlZDtcbiAgICAgIH1cbiAgICAgIGlmKGZlYXR1cmUudXNlcklkcyAmJiBmZWF0dXJlLnVzZXJJZHMubGVuZ3RoKXtcbiAgICAgICAgaXNFbmFibGVkID0gKGZlYXR1cmUudXNlcklkcy5pbmRleE9mKHRoaXMuc2VjdXJpdHlTZXJ2aWNlLmN1cnJlbnRVc2VyW1widXNlcklkXCJdKSAhPSAtMSk7XG4gICAgICAgIHJldHVybiBpc0VuYWJsZWQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpc0VuYWJsZWQ7ICAgIFxuICB9XG5cbiAgcHJpdmF0ZSBnZXRGbGFnQnlOYW1lKG5hbWU6IHN0cmluZywgZnJvbUhlYWRlciA9IGZhbHNlKSB7XG4gICAgbGV0IGZlYXR1cmU7XG4gICAgbGV0IGZlYXR1cmVzID0gZnJvbUhlYWRlcj8gdGhpcy5mZWF0dXJlc0ZvckhlYWRlcjogdGhpcy5mZWF0dXJlcztcbiAgICBpZiAoZmVhdHVyZXMgJiYgZmVhdHVyZXMubGVuZ3RoKSB7XG4gICAgICBmZWF0dXJlID0gZmVhdHVyZXMuZmlsdGVyKF9mZWF0dXJlID0+IF9mZWF0dXJlLm5hbWUgPT09IG5hbWUpWzBdO1xuICAgIH1cbiAgICByZXR1cm4gZmVhdHVyZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGZlYXR1cmVzRm9ySGVhZGVyKCkge1xuICAgIGxldCBlbnZOYW1lID0gKENvbmZpZ0hlbHBlci5lbnZpcm9ubWVudCAmJiBDb25maWdIZWxwZXIuZW52aXJvbm1lbnQubmFtZSkgfHwgJ3Byb2R1Y3Rpb24nO1xuICAgIHJldHVybiBoZWFkZXJGZWF0dXJlc1tlbnZOYW1lXTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGZlYXR1cmVzKCkge1xuICAgIHJldHVybiBDb25maWdIZWxwZXIuZW52aXJvbm1lbnQgJiYgQ29uZmlnSGVscGVyLmVudmlyb25tZW50LmZlYXR1cmVzO1xuICB9XG59XG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb25maWdIZWxwZXJ9IGZyb20gJy4uL2hlbHBlcnMvY29uZmlnLmhlbHBlcic7XG5pbXBvcnQge1NlY3VyaXR5U2VydmljZX0gZnJvbSAnLi9zZWN1cml0eS5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtTdG9yYWdlU2VydmljZX0gZnJvbSAnLi9zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHtMaWNlbnNpbmdDb25maWd9IGZyb20gJy4uL2NvbnN0YW50cy9saWNlbnNpbmctY29uZmlnLmNvbnN0YW50JztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvaW50ZXJuYWwvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge29mfSBmcm9tICdyeGpzL2ludGVybmFsL29ic2VydmFibGUvb2YnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTGljZW5zaW5nU2VydmljZSB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGZlYXR1cmVzID0gTGljZW5zaW5nQ29uZmlnO1xuXG4gICAgc3RhdGljIGxpY2Vuc2VkRmVhdHVyZXNVcmwocHJvZHVjdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGhvc3Q6IHN0cmluZyA9IENvbmZpZ0hlbHBlci5lbnZpcm9ubWVudC5saWNlbnNpbmdTZXJ2aWNlVXJsO1xuICAgICAgICBpZiAoaG9zdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgdXJpID0gJy9mZWF0dXJlP3Byb2R1Y3Q9JyArIHByb2R1Y3Q7XG4gICAgICAgIHJldHVybiBob3N0ICsgdXJpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VjdXJpdHlTZXJ2aWNlOiBTZWN1cml0eVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0ZlN0b3JhZ2U6IFN0b3JhZ2VTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0luc2lnaHRzTGljZW5zZWQoZmVhdHVyZUFycjogc3RyaW5nW10pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuc2VjdXJpdHlTZXJ2aWNlLmlzU3VwZXJBZG1pbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLmN1cnJlbnRVc2VyLmlzQW5hbHl0aWNzRW5hYmxlZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pc1VzZXJMaWNlbnNlZChMaWNlbnNpbmdDb25maWcuUFJPRFVDVC5JTlNJR0hUUywgZmVhdHVyZUFycik7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZnJlc2hJbnNpZ2h0c0ZlYXR1cmVzKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGlmICh0aGlzLnNlY3VyaXR5U2VydmljZS5pc1N1cGVyQWRtaW4pIHtcbiAgICAgICAgICAgIHJldHVybiBvZih7fSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHByb2R1Y3Q6IHN0cmluZyA9IExpY2Vuc2luZ0NvbmZpZy5QUk9EVUNULklOU0lHSFRTO1xuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBMaWNlbnNpbmdTZXJ2aWNlLmxpY2Vuc2VkRmVhdHVyZXNVcmwocHJvZHVjdCk7XG4gICAgICAgIGlmICghdXJsIHx8IHVybC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBvZih7fSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaEZlYXR1cmVNYXAocHJvZHVjdCwgdXJsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVXNlckxpY2Vuc2VkKHByb2R1Y3Q6IHN0cmluZywgZmVhdHVyZUFycjogc3RyaW5nW10pOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGxpY2Vuc2VkRmVhdHVyZUlkcyA9IHRoaXMuc2VjdXJpdHlTZXJ2aWNlLmN1cnJlbnRVc2VyLmxpY2Vuc2VkRmVhdHVyZXM7XG4gICAgICAgIGlmIChfLmlzRW1wdHkobGljZW5zZWRGZWF0dXJlSWRzKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhXy5pc0VtcHR5KF8uaW50ZXJzZWN0aW9uKGxpY2Vuc2VkRmVhdHVyZUlkcywgdGhpcy5nZXRGZWF0dXJlSWRzKHByb2R1Y3QsIGZlYXR1cmVBcnIpKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZWZyZXNoRmVhdHVyZU1hcChwcm9kdWN0OiBzdHJpbmcsIHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodXJsKS5waXBlKG1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRmU3RvcmFnZS5zdG9yZShwcm9kdWN0LCByZXNwb25zZVsnZmVhdHVyZSddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RmVhdHVyZUlkcyhwcm9kdWN0OiBzdHJpbmcsIGZlYXR1cmVBcnI6IHN0cmluZ1tdKTogbnVtYmVyW10ge1xuICAgICAgICBsZXQgZmVhdHVyZU1hcDogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHRoaXMudGZTdG9yYWdlLnJldHJpdmUocHJvZHVjdCk7XG4gICAgICAgIGlmICghZmVhdHVyZU1hcCB8fCBPYmplY3Qua2V5cyhmZWF0dXJlTWFwKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZmVhdHVyZUlkczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgZmVhdHVyZSBvZiBmZWF0dXJlQXJyKSB7XG4gICAgICAgICAgICBsZXQgZmVhdHVyZUlkOiBudW1iZXIgPSBmZWF0dXJlTWFwW2ZlYXR1cmVdO1xuICAgICAgICAgICAgaWYgKGZlYXR1cmVJZCA+IDApIHtcbiAgICAgICAgICAgICAgICBmZWF0dXJlSWRzLnB1c2goZmVhdHVyZUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmVhdHVyZUlkcztcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQsIERvbVNhbml0aXplciwgU2FmZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgTG9jYWxTdG9yYWdlLCBMb2NhbFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnbmd4LXdlYnN0b3JhZ2UnO1xuaW1wb3J0IHsgU2VjdXJpdHlTZXJ2aWNlIH0gZnJvbSAnLi9zZWN1cml0eS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbXBhbnlDb250ZXh0U2VydmljZSB9IGZyb20gJy4vY29tcGFueS1jb250ZXh0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9jb25maWcuaGVscGVyJztcbmltcG9ydCB7IFVzZXJSZXNvdXJjZVNlcnZpY2UgfSBmcm9tICcuL3VzZXItcmVzb3VyY2Uuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGZWF0dXJlRmxhZ1NlcnZpY2UgfSBmcm9tICcuL2ZlYXR1cmUtZmxhZy5zZXJ2aWNlJztcbmltcG9ydCB7IExpY2Vuc2luZ1NlcnZpY2UgfSBmcm9tICcuL2xpY2Vuc2luZy5zZXJ2aWNlJztcbmltcG9ydCB7IExpY2Vuc2luZ0NvbmZpZyB9IGZyb20gJy4uL2NvbnN0YW50cy9saWNlbnNpbmctY29uZmlnLmNvbnN0YW50JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IENPTVBBTllfRElSRUNUX0FTU0lHTk1FTlRfR1VJRCB9IGZyb20gJy4uL2NvbnN0YW50cy9jb21wYW55LWNvbmZpZy5jb25zdGFudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYXZQZXJtaXNzaW9uU2VydmljZSB7XG4gIHByaXZhdGUgdXNlcjogYW55O1xuICBwcml2YXRlIGRpcmVjdEFzc2lnbm1lbnRHdWlkOiBhbnk7XG4gIHByaXZhdGUgY3VycmVudEhvc3Q6IHN0cmluZyA9IHRoaXMuZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luICsgKHRoaXMuZG9jdW1lbnQubG9jYXRpb24uaG9zdG5hbWUuaW5kZXhPZignbG9jYWxob3N0JykgPiAtMSA/ICcvYnVpbGQnIDogJycpO1xuICBwcml2YXRlIG1lbnVVcmxDYWNoZTogYW55ID0ge307XG4gIHByaXZhdGUgc2VhcmNoU3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gIHB1YmxpYyBzZWFyY2hFdmVudDogT2JzZXJ2YWJsZTxhbnk+O1xuICBwdWJsaWMgY29tcGFueTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlOiBMb2NhbFN0b3JhZ2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29tcGFueUNvbnRleHRTZXJ2aWNlOiBDb21wYW55Q29udGV4dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzZWN1cml0eTogU2VjdXJpdHlTZXJ2aWNlLFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclJlc291cmNlU2VydmljZSxcbiAgICBwcml2YXRlIGZlYXR1cmVGbGFnU2VydmljZTogRmVhdHVyZUZsYWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgbGljZW5zaW5nU2VydmljZTogTGljZW5zaW5nU2VydmljZSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICkge1xuICAgIHRoaXMudXNlciA9IHRoaXMubG9jYWxTdG9yYWdlLnJldHJpZXZlKCd0ZmN1cnJlbnQtdXNlcicpO1xuICAgIHRoaXMuZGlyZWN0QXNzaWdubWVudEd1aWQgPSB0aGlzLmxvY2FsU3RvcmFnZS5yZXRyaWV2ZSgnZGlyZWN0X2Fzc2lnbm1lbnRfZ3VpZCcpO1xuICAgIHRoaXMuc2VhcmNoRXZlbnQgPSB0aGlzLnNlYXJjaFN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5sb2NhbFN0b3JhZ2Uub2JzZXJ2ZSgndGZjdXJyZW50LXVzZXInKVxuICAgICAgLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgdGhpcy51c2VyID0gdmFsdWU7XG4gICAgICB9KTtcbiAgICB0aGlzLmxvY2FsU3RvcmFnZS5vYnNlcnZlKENPTVBBTllfRElSRUNUX0FTU0lHTk1FTlRfR1VJRClcbiAgICAgIC5zdWJzY3JpYmUoKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXMuZGlyZWN0QXNzaWdubWVudEd1aWQgPSB2YWx1ZTtcbiAgICAgIH0pO1xuICAgIHRoaXMubG9jYWxTdG9yYWdlLm9ic2VydmUoJ3RmQ29tcGFueUNvbmZpZycpXG4gICAgLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgIHRoaXMuY29tcGFueSA9IHZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tQZXJtaXNzaW9ucyhpdGVtLCBhY3Rpb24pIHtcbiAgICByZXR1cm4gdGhpcy51c2VyICYmIHRoaXMudXNlci5wZXJtaXNzaW9ucyAmJiB0aGlzLnVzZXIucGVybWlzc2lvbnNbaXRlbV0gJiYgdGhpcy51c2VyLnBlcm1pc3Npb25zW2l0ZW1dW2FjdGlvbl07XG4gIH1cblxuICBjaGVja1BhcmFtKHBhcmFtKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlciAmJiB0aGlzLnVzZXJbcGFyYW1dO1xuICB9XG5cbiAgY2hlY2tGYWxzZVBhcmFtKHBhcmFtKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlciAmJiAhdGhpcy51c2VyW3BhcmFtXTtcbiAgfVxuXG4gIGNoZWNraWZVc2VyQWRtaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlci5zdXBlckFkbWluIHx8IHRoaXMudXNlci5jb21wYW55QWRtaW4gfHwgdGhpcy51c2VyLmdyb3VwQWRtaW47XG4gIH1cblxuICBjaGVja0lmU2hvd01vZHVsZShtb2R1bGVOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlciAmJiB0aGlzLnVzZXIubW9kdWxlcyAmJiB0aGlzLnVzZXIubW9kdWxlcy5pbmRleE9mKG1vZHVsZU5hbWUpICE9PSAtMTtcbiAgfVxuXG4gIGNoZWNrTm90aWZpY2F0aW9uUnVsZVBlcm1pc3Npb25zKGFjdGlvbikge1xuICAgIHJldHVybiB0aGlzLmNoZWNrUGVybWlzc2lvbnMoJ25vdGlmaWNhdGlvblJ1bGVzJywgYWN0aW9uKSB8fCB0aGlzLmNoZWNrUGVybWlzc2lvbnMoJ25vdGlmaWNhdGlvbl9ydWxlcycsIGFjdGlvbik7XG4gIH1cblxuICBjaGVja1Blcm1pc3Npb25Gb3JTZXR0aW5ncygpIHtcbiAgICBjb25zdCBzZXR0aW5nVHlwZXMgPSBbJ2dlbmVyYWwnLCAndHJhY2tpbmcnLCAndGhpcmRQYXJ0eScsICd1c2FnZScsICdlbWFpbE5vdGlmaWNhdGlvbiddO1xuICAgIGxldCBpc0FsbG93ZWQgPSBmYWxzZTtcbiAgICBzZXR0aW5nVHlwZXMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuY2hlY2tQZXJtaXNzaW9ucyh0eXBlICsgJ1NldHRpbmdzJywgJ3ZpZXcnKSkge1xuICAgICAgICBpc0FsbG93ZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGlzQWxsb3dlZDtcbiAgfVxuXG4gIGdldENyZWF0ZUxvYWRBZG1pblBhcmFtcygpIHtcbiAgICByZXR1cm4gYD9jeHRJZD0ke3RoaXMuY29tcGFueUNvbnRleHRTZXJ2aWNlLmdldENvbXBhbnlDb250ZXh0KCl9JmN4dERlc2M9JHt0aGlzLmNvbXBhbnlDb250ZXh0U2VydmljZS5nZXRDb21wYW55Q29udGV4dE5hbWUoKX1gO1xuICB9XG5cbiAgaXNEaXJlY3RBc3NpZ25tZW50R3VpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb21wYW55ICYmIHRoaXMuY29tcGFueS5lbmFibGVUcmFja2luZ0luZm9EaXJlY3RBc3NpZ25tZW50ICYmIHRoaXMuZGlyZWN0QXNzaWdubWVudEd1aWQgO1xuICB9XG5cbiAgZ2V0RGlyZWN0QXNzaWdubWVudEd1aWRVcmwoKSB7XG4gICAgcmV0dXJuICcvJyArIHRoaXMuZGlyZWN0QXNzaWdubWVudEd1aWQgKyAnLycgKyBidG9hKHRoaXMubG9jYWxTdG9yYWdlLnJldHJpZXZlKCd0ZmNvbXBhbnlfbmFtZScpKTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlciAmJiB0aGlzLnVzZXIubmFtZTtcbiAgfVxuXG4gIGdldEhlYWRlckxvZ28oKSB7XG4gICAgcmV0dXJuICB0aGlzLmlzTG9nb1VybFByZXNlbnQoKSA/IHRoaXMudXNlci5jb21wYW55LmxvZ29VcmwgOiAnaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2ZrLWljb25zL2xvZ29fd2hpdGVfdGV4dC5wbmcnO1xuICB9XG5cbiAgZ29Ub1NpZ25JbigpIHtcbiAgICB0aGlzLmRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmN1cnJlbnRIb3N0ICsgJy8jL3NpZ25pbic7XG4gIH1cblxuICB1cGRhdGUoZGF0YSwga2V5KSB7XG4gICAgdGhpcy51c2VyID0gZGF0YVtrZXldO1xuICB9XG5cbiAgaXNBdXRoZW50aWNhdGVkKCkge1xuICAgIHJldHVybiB0aGlzLnNlY3VyaXR5LmlzQXV0aGVudGljYXRlZCgpO1xuICB9XG5cbiAgaXNMaWdodFRoZW1lKCkge1xuICAgIHJldHVybiB0aGlzLnVzZXIgJiYgdGhpcy51c2VyLmNvbXBhbnkgJiYgdGhpcy51c2VyLmNvbXBhbnkudGhlbWUgJiYgdGhpcy51c2VyLmNvbXBhbnkudGhlbWUgPT09ICd0aGVtZS1saWdodCc7XG4gIH1cblxuICBpc0xvZ2dlZEluKCkge1xuICAgIHJldHVybiAodGhpcy51c2VyICYmIHRoaXMudXNlci51c2VySWQpID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgaXNSb3V0ZUFjdGl2ZSh1cmwpIHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5sb2NhdGlvbi5ocmVmLmluZGV4T2YodXJsKSA+IDA7XG4gIH1cblxuICBpc1ZhbGlkTWVudVVybChtZW51LCBvcmlnaW4pIHtcbiAgICBjb25zdCBtZW51VXJsID0gKG9yaWdpbiAmJiBtZW51W29yaWdpbl0gJiYgbWVudVtvcmlnaW5dLnVybCkgPyBtZW51W29yaWdpbl0udXJsIDogbWVudS51cmw7XG5cbiAgICBpZiAobWVudVVybCAmJiBtZW51VXJsLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiBtZW51VXJsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNMb2dvVXJsUHJlc2VudCgpe1xuICAgIHJldHVybiAodGhpcy51c2VyICYmIHRoaXMudXNlci5jb21wYW55ICYmIHRoaXMudXNlci5jb21wYW55LndoaXRlTGFiZWxpbmdFbmFibGVkICYmICB0aGlzLnVzZXIuY29tcGFueS5sb2dvVXJsKTtcbiAgfVxuXG4gIHByaXZhdGUgZmV0Y2hBbGxNZW51Um91dGVzKG1lbnUsIG9yaWdpbj0gbnVsbCkge1xuICAgIGxldCByb3V0ZXMgPSBbXTtcbiAgICBjb25zdCBtZW51VXJsID0gdGhpcy5pc1ZhbGlkTWVudVVybChtZW51LCBvcmlnaW4pO1xuXG4gICAgaWYgKG1lbnVVcmwpIHtcbiAgICAgIHJvdXRlcy5wdXNoKG1lbnVVcmwpO1xuICAgIH1cblxuICAgIGlmIChtZW51LnN1YnMpIHtcbiAgICAgIG1lbnUuc3Vicy5mb3JFYWNoKHN1Yk1lbnUgPT4ge1xuICAgICAgICBjb25zdCBzdWJNZW51VXJsID0gdGhpcy5pc1ZhbGlkTWVudVVybChzdWJNZW51LCBvcmlnaW4pO1xuICAgICAgICBpZiAoc3ViTWVudVVybCkge1xuICAgICAgICAgIHJvdXRlcy5wdXNoKHN1Yk1lbnVVcmwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLm1lbnVVcmxDYWNoZVttZW51LmlkXSA9IHJvdXRlcztcblxuICAgIHJldHVybiByb3V0ZXM7XG4gIH1cblxuICBpc01lbnVBY3RpdmUobWVudSwgb3JpZ2luPSBudWxsKSB7XG4gICAgY29uc3QgdmFsaWRSb3V0ZXMgPSB0aGlzLm1lbnVVcmxDYWNoZVttZW51LmlkXSA/IHRoaXMubWVudVVybENhY2hlW21lbnUuaWRdIDogdGhpcy5mZXRjaEFsbE1lbnVSb3V0ZXMobWVudSwgb3JpZ2luKTtcblxuICAgIGZvciAoY29uc3Qgcm91dGUgb2YgdmFsaWRSb3V0ZXMpIHtcbiAgICAgIGlmICh0aGlzLmlzUm91dGVBY3RpdmUocm91dGUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzQ29tcGFueUFjdGl2ZSgpe1xuICAgIGxldCBjb21wYW55ID0gdGhpcy5jb21wYW55Q29udGV4dFNlcnZpY2UuY3VycmVudENvbXBhbnk7XG4gICAgcmV0dXJuIGNvbXBhbnkgJiYgY29tcGFueS5hY3RpdmVcbiAgfVxuICBpc1NpZ251cCgpIHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJyMvc2lnbnVwJykgPiAwO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNVcmwodXJsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5sb2NhdGlvbi5ocmVmLmluZGV4T2YodXJsKSA+IDA7XG4gIH1cblxuICBnZXQgaXNUcmFja2luZ0xvYWRzKCkge1xuICAgIHJldHVybiB0aGlzLmhhc1VybCgndHJhY2tpbmcvIy9sb2FkcycpO1xuICB9XG5cbiAgb25Mb2Fkc1NlYXJjaChsb2FkSWRzOiBzdHJpbmcpIHtcbiAgICBpZiAobG9hZElkcykge1xuICAgICAgbG9hZElkcyA9IGxvYWRJZHMudHJpbSgpLnJlcGxhY2UoLywvZywgJyAnKTtcbiAgICAgIHRoaXMuc2VhcmNoU3ViamVjdC5uZXh0KHsgaWRzOiBsb2FkSWRzIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5aZW5kZXNrU3VwcG9ydCgpIHtcbiAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXJKd3RUb2tlbigpXG4gICAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgIHdpbmRvdy5vcGVuKGRhdGFbJ3JlZGlyZWN0VXJpJ10sICdfYmxhbmsnKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgaXNGZWF0dXJlRGlzYWJsZWQoZmVhdHVyZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzRmVhdHVyZUVuYWJsZWQoZmVhdHVyZSk7XG4gIH1cblxuICBpc0xpY2Vuc2VkKGZlYXR1cmVBcnI6IHN0cmluZ1tdLCBvbGRDaGVjazogc3RyaW5nID0gbnVsbCkge1xuICAgIGlmICh0aGlzLmZlYXR1cmVGbGFnU2VydmljZS5pc0ZlYXR1cmVFbmFibGVkKExpY2Vuc2luZ0NvbmZpZy5JTlNJR0hUU19MSUNFTlNFX0ZMQUcsIHRydWUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5saWNlbnNpbmdTZXJ2aWNlLmlzSW5zaWdodHNMaWNlbnNlZChmZWF0dXJlQXJyKTtcbiAgICB9XG4gICAgaWYgKCFvbGRDaGVjaykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jaGVja1BhcmFtKG9sZENoZWNrKTtcbiAgfVxuXG4gIHNob3dNQUJETW9kdWxlKCkge1xuICAgIGlmICh0aGlzLmlzU3VwZXJBZG1pbigpKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaG93QW5hbHl0aWNzTW9kdWxlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmZlYXR1cmVGbGFnU2VydmljZS5pc0ZlYXR1cmVFbmFibGVkKExpY2Vuc2luZ0NvbmZpZy5JTlNJR0hUU19MSUNFTlNFX0ZMQUcsIHRydWUpKSB7XG4gICAgICAgIGNvbnN0IGZlYXR1cmVBcnIgPSBbTGljZW5zaW5nQ29uZmlnLklOU0lHSFRTLlJFQ09fQVJSSVZBTF9SRUNPTU1FTkRBVElPTiwgTGljZW5zaW5nQ29uZmlnLklOU0lHSFRTLlJFQ09fREVQQVJUVVJFX1JFQ09NTUVOREFUSU9OLFxuICAgICAgICAgICAgTGljZW5zaW5nQ29uZmlnLklOU0lHSFRTLlRSQU5TSVRfUklTS19SRUNPTU1FTkRBVElPTiwgTGljZW5zaW5nQ29uZmlnLklOU0lHSFRTLlJFU0NIRURVTEVTX1JFQ09NTUVOREFUSU9OXTtcbiAgICAgICAgcmV0dXJuIHRoaXMubGljZW5zaW5nU2VydmljZS5pc0luc2lnaHRzTGljZW5zZWQoZmVhdHVyZUFycik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlzRmVhdHVyZUVuYWJsZWQoJ3JlY28tZW5naW5lJyk7XG4gIH1cblxuICBpc0ZlYXR1cmVFbmFibGVkKGZlYXR1cmU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmZlYXR1cmVGbGFnU2VydmljZS5pc0ZlYXR1cmVFbmFibGVkKGZlYXR1cmUsIHRydWUpO1xuICB9XG5cbiAgaXNGZWF0dXJlRW5hYmxlZEluQXBwKGZlYXR1cmU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmZlYXR1cmVGbGFnU2VydmljZS5pc0ZlYXR1cmVFbmFibGVkKGZlYXR1cmUpO1xuICB9XG5cbiAgaXNGZWF0dXJlRGlzYWJsZWRJbkFwcChmZWF0dXJlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNGZWF0dXJlRW5hYmxlZEluQXBwKGZlYXR1cmUpO1xuICB9XG5cbiAgaXNTdXBlckFkbWluKCkge1xuICAgIHJldHVybiB0aGlzLnVzZXIgJiYgdGhpcy51c2VyLnN1cGVyQWRtaW47XG4gIH1cblxuICBpc1N1cGVyQWRtaW5Ob0NvbnRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlci5zdXBlckFkbWluICYmICF0aGlzLmNvbXBhbnlDb250ZXh0U2VydmljZS5nZXRDb21wYW55Q29udGV4dCgpO1xuICB9XG5cbiAgaXNTdXBlckFkbWluV2l0aENvbXBhbnlDb250ZXh0KCkge1xuICAgIHJldHVybiB0aGlzLnVzZXIuc3VwZXJBZG1pbiAmJiB0aGlzLmNvbXBhbnlDb250ZXh0U2VydmljZS5nZXRDb21wYW55Q29udGV4dCgpO1xuICB9XG5cbiAgc2hvd0FkZHJlc3NNYW5hZ2VyKCkge1xuICAgIHJldHVybiB0aGlzLmlzU3VwZXJBZG1pbldpdGhDb21wYW55Q29udGV4dCgpIHx8ICghdGhpcy51c2VyLnN1cGVyQWRtaW4gJiYgdGhpcy5jaGVja1Blcm1pc3Npb25zKCdhZGRyZXNzZXMnLCAndmlldycpKTtcbiAgfVxuXG4gIHNob3dBZGRyZXNzTWFuYWdlckJldGEoKSB7XG4gICAgbGV0IEVOVjtcbiAgICBjb25zdCBFTlZJUk9OTUVOVFMgPSBbJ2RldicsICdzdGFnaW5nJ107XG4gICAgY29uc3QgaG9zdCA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBpZiAoaG9zdCA9PT0gJ2xvY2FsaG9zdCcpIHtcbiAgICAgIEVOViA9ICdkZXYnO1xuICAgIH0gZWxzZSB7XG4gICAgICBFTlYgPSBob3N0LnNwbGl0KCcuJylbMF0uc3BsaXQoJy0nKVsxXTtcbiAgICAgIEVOViA9IEVOViB8fCAncHJvZCc7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNoZWNrUGFyYW0oJ3N1cGVyQWRtaW4nKSAmJiBFTlZJUk9OTUVOVFMuaW5kZXhPZihFTlYpID4gLTE7XG4gIH1cblxuICBzaG93Q29tcGFueSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1N1cGVyQWRtaW5Ob0NvbnRleHQoKSB8fCAodGhpcy51c2VyLmNvbXBhbnlUeXBlICYmIHRoaXMudXNlci5jb21wYW55VHlwZS5pbmRleE9mKCczcGwnKSAhPT0gLTEpO1xuICB9XG5cbiAgc2hvd0FkdmFuY2VkTm90aWZpY2F0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5pc1N1cGVyQWRtaW5XaXRoQ29tcGFueUNvbnRleHQoKSB8fCAodGhpcy51c2VyLnJvbGUgPT09ICdhZG1pbicpIHx8ICAodGhpcy51c2VyLnJvbGUgPT09ICdtYW5hZ2VyJykgO1xuICB9XG5cbiAgc2hvd05vdGlmaWNhdGlvblJ1bGVzKCkge1xuICAgIHJldHVybiB0aGlzLmlzU3VwZXJBZG1pbldpdGhDb21wYW55Q29udGV4dCgpIHx8ICghdGhpcy51c2VyLnN1cGVyQWRtaW4gJiYgKHRoaXMuY2hlY2tOb3RpZmljYXRpb25SdWxlUGVybWlzc2lvbnMoJ3ZpZXcnKSB8fCB0aGlzLmNoZWNrUGVybWlzc2lvbnMoJ2luZGl2aWR1YWxOb3RpZmljYXRpb25SdWxlcycsICd2aWV3JykpKTtcbiAgfVxuXG4gIHNob3dBZG1pbk1vZHVsZSgpIHtcbiAgICByZXR1cm4gdGhpcy51c2VyLnN1cGVyQWRtaW4gfHwgdGhpcy5jaGVja0lmU2hvd01vZHVsZSgnYWRtaW4nKTtcbiAgfVxuXG4gIHNob3dQeE1vZHVsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja0lmU2hvd01vZHVsZSgnbWFya2V0cGxhY2UnKSB8fCB0aGlzLmNoZWNrSWZTaG93TW9kdWxlKCdwY20tbmV0d29yay1ldmFsdWF0aW9uJyk7XG4gIH1cbiAgXG5cbiAgc2hvd0ZhY2lsaXR5TWFuYWdlck1vZHVsZSgpe1xuICAgIHJldHVybiB0aGlzLmNoZWNrSWZTaG93TW9kdWxlKCdmYWNpbGl0eS1tYW5hZ2VyJyk7XG4gIH1cblxuICBzaG93QXBwb2lubWVudE1hbmFnZXJNb2R1bGUoKXtcbiAgICByZXR1cm4gdGhpcy5jaGVja0lmU2hvd01vZHVsZSgnYXBwb2ludG1lbnQtbWFuYWdlcicpO1xuICB9XG5cbiAgc2hvd05ldHdvcmtWaXNpYmlsaXR5TW9kdWxlKCkge1xuICAgIGNvbnN0IGlzQWRtaW4gPSAodGhpcy51c2VyLnJvbGUgPT09ICdhZG1pbicpO1xuICAgIGNvbnN0IHZhbGlkVXNlciA9IHRoaXMudXNlci5zdXBlckFkbWluIHx8IGlzQWRtaW47XG4gICAgY29uc3QgZGlzY292ZXJ5Q29uc2VudCA9IHRoaXMudXNlci5hbGxvd1RvRGlzY292ZXJPbk5ldHdvcmt2aXNpYmlsaXR5O1xuICAgIGNvbnN0IGZlYXR1cmVGbGFnID0gdGhpcy51c2VyLmlzTmV0d29ya1Zpc2liaWxpdHlVSUVuYWJsZWQ7XG4gICAgcmV0dXJuICh2YWxpZFVzZXIgJiYgZGlzY292ZXJ5Q29uc2VudCAmJiBmZWF0dXJlRmxhZyk7XG4gIH1cblxuICBzaG93UmVwb3J0c01vZHVsZSgpIHtcbiAgICByZXR1cm4gKHRoaXMuY2hlY2tJZlNob3dNb2R1bGUoJ3RyYWNraW5nLXJlcG9ydHMnKSAmJiB0aGlzLmNoZWNrUGVybWlzc2lvbnMoJ3RyYWNraW5nUmVwb3J0cycsICdleGVjdXRlJykpICYmICh0aGlzLmNoZWNrRmFsc2VQYXJhbSgnc3VwZXJBZG1pbicpIHx8IHRoaXMuY29tcGFueUNvbnRleHRTZXJ2aWNlLmdldENvbXBhbnlDb250ZXh0KCkpICYmIHRoaXMuY2hlY2tGYWxzZVBhcmFtKCdoaWRlUmVwb3J0cycpO1xuICB9XG5cbiAgc2hvd0FuYWx5dGljc01vZHVsZSgpIHtcbiAgICByZXR1cm4gdGhpcy51c2VyICYmIHRoaXMudXNlci5zaG93QW5hbHl0aWNzTW9kdWxlO1xuICB9XG5cbiAgc2hvd1Rvb2xzTW9kdWxlKCkge1xuICAgIHJldHVybiB0aGlzLnVzZXIgJiYgKHRoaXMudXNlci5zdXBlckFkbWluIHx8IHRoaXMuY2hlY2tQZXJtaXNzaW9ucygnYWRkcmVzc2VzJywgJ3ZpZXcnKSB8fCB0aGlzLmNoZWNrUGVybWlzc2lvbnMoJ25vdGlmaWNhdGlvblJ1bGVzJywgJ3ZpZXcnKSB8fCB0aGlzLmNoZWNrUGVybWlzc2lvbnMoJ2luZGl2aWR1YWxOb3RpZmljYXRpb25SdWxlcycsICd2aWV3JykgfHwgdGhpcy51c2VyLnNob3dUZW1wZXJhdHVyZVRyYWNraW5nTW9kdWxlKTtcbiAgfVxuXG4gIHNob3dTZXR0aW5ncygpIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja1Blcm1pc3Npb25Gb3JTZXR0aW5ncygpICYmICghdGhpcy51c2VyLnN1cGVyQWRtaW4gfHwgdGhpcy5jb21wYW55Q29udGV4dFNlcnZpY2UuZ2V0Q29tcGFueUNvbnRleHQoKSk7XG4gIH1cblxuICBzaG93SW5zaWdodHNUYWIoKSB7XG4gICAgaWYgKHRoaXMuZmVhdHVyZUZsYWdTZXJ2aWNlLmlzRmVhdHVyZUVuYWJsZWQoTGljZW5zaW5nQ29uZmlnLklOU0lHSFRTX0xJQ0VOU0VfRkxBRywgdHJ1ZSkpIHtcbiAgICAgICAgaWYgKHRoaXMudXNlci5zdXBlckFkbWluKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd0FuYWx5dGljc01vZHVsZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxpY2Vuc2luZ1NlcnZpY2UuaXNJbnNpZ2h0c0xpY2Vuc2VkKF8ubWFwKExpY2Vuc2luZ0NvbmZpZy5JTlNJR0hUUywgKHZhbHVlKSA9PiB7IHJldHVybiB2YWx1ZTsgfSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3dBbmFseXRpY3NNb2R1bGUoKSB8fCAoIXRoaXMudXNlci5zdXBlckFkbWluICYmIHRoaXMuaXNGZWF0dXJlRW5hYmxlZCgncmVjby1lbmdpbmUnKSk7XG4gICAgfVxuICB9XG5cbiAgc2hvd0luc2lnaHRzQVBJTW9kdWxlKCkge1xuICAgICAgaWYgKHRoaXMuZmVhdHVyZUZsYWdTZXJ2aWNlLmlzRmVhdHVyZUVuYWJsZWQoTGljZW5zaW5nQ29uZmlnLklOU0lHSFRTX0xJQ0VOU0VfRkxBRywgdHJ1ZSkpIHtcbiAgICAgICAgICBjb25zdCBmZWF0dXJlQXJyID0gW0xpY2Vuc2luZ0NvbmZpZy5JTlNJR0hUUy5BTkFMWVRJQ1NfQVBJXTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5saWNlbnNpbmdTZXJ2aWNlLmlzSW5zaWdodHNMaWNlbnNlZChmZWF0dXJlQXJyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmNoZWNrUGFyYW0oJ3Nob3dQZXJmb3JtYW5jZUFuYWx5dGljcycpO1xuICB9XG5cbiAgdmFsaWRhdGVDb25kaXRpb25zKGNvbmRpdGlvbnMpIHtcbiAgICBmb3IgKGNvbnN0IGNvbmRpdGlvbiBvZiBjb25kaXRpb25zKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjb25kaXRpb24pID8gISh0aGlzW2NvbmRpdGlvblswXV0uYXBwbHkodGhpcywgY29uZGl0aW9uLnNsaWNlKDEpKSkgOiAoY29uZGl0aW9uICYmICF0aGlzW2NvbmRpdGlvbl0oKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldE1lbnVVcmwobWVudSwgb3JpZ2luPSBudWxsKTogU2FmZVVybCB7XG4gICAgbGV0IHVybFBhcmFtcyA9ICcnO1xuICAgIGlmIChtZW51LnVybFBhcmFtcyAmJiB0aGlzW21lbnUudXJsUGFyYW1zXSl7XG4gICAgICB1cmxQYXJhbXMgPSB0aGlzW21lbnUudXJsUGFyYW1zXSgpO1xuICAgIH1cbiAgICBpZiAob3JpZ2luICYmIG1lbnVbb3JpZ2luXSAmJiBtZW51W29yaWdpbl0udXJsKXtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRIb3N0ICArICcvJyArIG1lbnVbb3JpZ2luXS51cmwgKyB1cmxQYXJhbXM7XG4gICAgfVxuICAgIGlmIChtZW51LnVybCl7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50SG9zdCArICcvJyArIG1lbnUudXJsICsgdXJsUGFyYW1zO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0VXJsKCdqYXZhc2NyaXB0OjsnKTtcbiAgfVxuXG4gIHVwZGF0ZVVzZXIodmFsdWUsIGtleSkge1xuICAgIGlmIChrZXkgPT09ICd1c2VyJykge1xuICAgICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlyZWN0QXNzaWdubWVudEd1aWQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxvZ091dCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWN1cml0eS5sb2dvdXQoKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgdGhpcy5nb1RvU2lnbkluKCk7XG4gICAgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQFBpcGUoe1xuICBuYW1lOiAncmVxdWlyZWRGaWVsZCdcbn0pXG5leHBvcnQgY2xhc3MgUmVxdWlyZWRGaWVsZFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgZm9ybUNvbnRyb2w/OiBGb3JtQ29udHJvbCk6IGFueSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNSZXF1aXJlZEZpZWxkKGZvcm1Db250cm9sKSA/IHZhbHVlICsgXCIgKlwiIDogdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgaGFzUmVxdWlyZWRGaWVsZChhYnN0cmFjdENvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkge1xuICAgIGlmIChhYnN0cmFjdENvbnRyb2wudmFsaWRhdG9yKSB7XG4gICAgICBjb25zdCB2YWxpZGF0b3IgPSBhYnN0cmFjdENvbnRyb2wudmFsaWRhdG9yKHt9IGFzIEFic3RyYWN0Q29udHJvbCk7XG4gICAgICBpZiAodmFsaWRhdG9yICYmIHZhbGlkYXRvci5yZXF1aXJlZCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFic3RyYWN0Q29udHJvbFsnY29udHJvbHMnXSkge1xuICAgICAgZm9yIChjb25zdCBjb250cm9sTmFtZSBpbiBhYnN0cmFjdENvbnRyb2xbJ2NvbnRyb2xzJ10pIHtcbiAgICAgICAgaWYgKGFic3RyYWN0Q29udHJvbFsnY29udHJvbHMnXVtjb250cm9sTmFtZV0pIHtcbiAgICAgICAgICBpZiAodGhpcy5oYXNSZXF1aXJlZEZpZWxkKGFic3RyYWN0Q29udHJvbFsnY29udHJvbHMnXVtjb250cm9sTmFtZV0pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmstc2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZrLXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZrLXNlbGVjdC5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgRktTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoXCJma05nU2VsZWN0XCIpIGZrTmdTZWxlY3Q6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCkgZGF0YToge1trZXk6IHN0cmluZ106IGFueX07XG4gIEBJbnB1dCgpIHNlYXJjaGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY2xlYXJhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc2VsZWN0ZWQ6IHN0cmluZztcblxuICBAT3V0cHV0KCkgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIGNoYW5nZTogRXZlbnRFbWl0dGVyPHtba2V5OiBzdHJpbmddOiBhbnl9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e1trZXk6IHN0cmluZ106IGFueX0+KCk7XG4gIEBPdXRwdXQoKSBvbkRyb3Bkb3duQ2xvc2U6IEV2ZW50RW1pdHRlcjx7W2tleTogc3RyaW5nXTogYW55fT4gPSBuZXcgRXZlbnRFbWl0dGVyPHtba2V5OiBzdHJpbmddOiBhbnl9PigpO1xuICBAT3V0cHV0KCkgb25TZWFyY2g6IEV2ZW50RW1pdHRlcjx7W2tleTogc3RyaW5nXTogYW55fT4gPSBuZXcgRXZlbnRFbWl0dGVyPHtba2V5OiBzdHJpbmddOiBhbnl9PigpO1xuXG4gIHB1YmxpYyBpbnRlcnZhbDtcblxuICBjb25zdHJ1Y3Rvcigpe31cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgcHVibGljIG9uQ2hhbmdlKGV2ZW50KSB7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cblxuICBwdWJsaWMgdmFsdWVDaGFuZ2UoIGV2ZW50ICl7XG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWQpO1xuICB9XG5cbiAgcHVibGljIG9uQ2xvc2UoICl7XG4gICAgdGhpcy5vbkRyb3Bkb3duQ2xvc2UuZW1pdCgpO1xuICB9XG5cbiAgcHVibGljIHNlYXJjaCggZXZlbnQgKXtcbiAgICBpZiggdGhpcy5pbnRlcnZhbCApe1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaW50ZXJ2YWwpO1xuICAgIH1cbiAgICAvKiogV2lsbCBlbWl0IG9ubHkgYWZ0ZXIgZmV3IG1zIG9mIHN0b3BpbmcgdGhlIHR5cGluZy4qL1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRUaW1lb3V0KCgpPT57XG4gICAgICB0aGlzLm9uU2VhcmNoLmVtaXQoIGV2ZW50ICk7XG4gICAgfSwgNTAwKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCl7XG4gICAgaWYoIHRoaXMuaW50ZXJ2YWwgKXtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmludGVydmFsKTtcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEZLU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi4vZmstc2VsZWN0L2ZrLXNlbGVjdC5jb21wb25lbnQnXG5pbXBvcnQgeyBOZ1NlbGVjdENvbXBvbmVudCB9IGZyb20gJ0BuZy1zZWxlY3Qvbmctc2VsZWN0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmstc2VsZWN0LW11bHRpcGxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZrLXNlbGVjdC1tdWx0aXBsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZrLXNlbGVjdC1tdWx0aXBsZS5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgRktTZWxlY3RNdWx0aXBsZUNvbXBvbmVudCBleHRlbmRzIEZLU2VsZWN0Q29tcG9uZW50IHtcblxuICBAVmlld0NoaWxkKE5nU2VsZWN0Q29tcG9uZW50KSBuZ011bHRpU2VsZWN0OiBOZ1NlbGVjdENvbXBvbmVudDtcblxuICBASW5wdXQoKSBzZWxlY3RlZFZhbHVlcyA9IFtdO1xuICBASW5wdXQoKSBzZWFyY2hhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNob3dMYWJlbDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzaG93TW9yZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBsaW1pdDogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgc2VsZWN0ZWRJdGVtczogQXJyYXk8YW55PjtcblxuICBAT3V0cHV0KCkgc2VsZWN0ZWRWYWx1ZXNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZ1tdPigpO1xuICBAT3V0cHV0KCkgYWRkSXRlbTogRXZlbnRFbWl0dGVyPHtba2V5OiBzdHJpbmddOiBhbnl9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e1trZXk6IHN0cmluZ106IGFueX0+KCk7XG4gIEBPdXRwdXQoKSByZW1vdmVJdGVtOiBFdmVudEVtaXR0ZXI8e1trZXk6IHN0cmluZ106IGFueX0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7W2tleTogc3RyaW5nXTogYW55fT4oKTtcbiAgQE91dHB1dCgpIG9uU2VhcmNoOiBFdmVudEVtaXR0ZXI8e1trZXk6IHN0cmluZ106IGFueX0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7W2tleTogc3RyaW5nXTogYW55fT4oKTtcbiAgQE91dHB1dCgpIG9uQ29uZGl0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8e1trZXk6IHN0cmluZ106IGFueX0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7W2tleTogc3RyaW5nXTogYW55fT4oKTtcbiAgQE91dHB1dCgpIG9uUHJlZmVyZW5jZUNoYW5nZTogRXZlbnRFbWl0dGVyPHtba2V5OiBzdHJpbmddOiBhbnl9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e1trZXk6IHN0cmluZ106IGFueX0+KCk7XG5cbiAgcHVibGljIHNlYXJjaFRleHQ6IHN0cmluZztcbiAgcHVibGljIGludGVydmFsOiBhbnk7XG4gIHB1YmxpYyBtYXhMaW1pdCA9IDA7XG5cbiAgcHVibGljIHF1ZXJ5U2VsZWN0ZWQ6IHN0cmluZyA9IFwiYW55XCI7XG4gIHB1YmxpYyBpc0N1c3RvbVByZWZlcmVuY2U7XG5cdFxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNlYXJjaGFibGUgPSB0aGlzLmRhdGEuc2VhcmNoYWJsZSA/IHRoaXMuZGF0YS5zZWFyY2hhYmxlIDogdGhpcy5zZWFyY2hhYmxlO1xuICAgIHRoaXMuY29tcHV0ZUxpbWl0KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSAodGhpcy5kYXRhLnVzZVZhbHVlKSA/IHRoaXMuc2VsZWN0ZWRJdGVtcyA6IHRoaXMuc2VsZWN0ZWRWYWx1ZXM7ICAgIFxuICB9XG5cdFxuICBwdWJsaWMgaXNTZWxlY3RlZChpdGVtKSB7XG4gICAgcmV0dXJuICh0aGlzLnNlbGVjdGVkVmFsdWVzLmxlbmd0aCAmJiB0aGlzLnNlbGVjdGVkVmFsdWVzLmluZGV4T2YoaXRlbVt0aGlzLmRhdGEuYmluZFZhbHVlXSkgIT0gLTEpO1xuICB9XG5cdFxuICBwdWJsaWMgYWRkKGV2ZW50KSB7XG4gICAgdGhpcy5hZGRJdGVtLmVtaXQoZXZlbnQpO1xuICB9XG5cdFxuICBwdWJsaWMgcmVtb3ZlKGV2ZW50KSB7XG4gICAgdGhpcy5yZW1vdmVJdGVtLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgcHVibGljIHZhbHVlQ2hhbmdlKCBldmVudCApe1xuICAgIGlmKCB0aGlzLnNlbGVjdGVkVmFsdWVzICl7XG4gICAgICB0aGlzLnNlbGVjdGVkVmFsdWVzQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZFZhbHVlcyk7XG4gICAgICB0aGlzLmNvbXB1dGVMaW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBxdWVyeUNoYW5nZSggZXZlbnQgKXtcbiAgICB0aGlzLm9uQ29uZGl0aW9uQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgcHVibGljIHNlYXJjaCggZXZlbnQsIGlzQ3VzdG9tPWZhbHNlICl7XG4gICAgaWYoIHRoaXMuaW50ZXJ2YWwgKXtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmludGVydmFsKTtcbiAgICB9XG4gICAgLyoqIFdpbGwgZW1pdCBvbmx5IGFmdGVyIGZldyBtcyBvZiBzdG9waW5nIHRoZSB0eXBpbmcuKi9cbiAgICB0aGlzLmludGVydmFsID0gc2V0VGltZW91dCgoKT0+e1xuICAgICAgdGhpcy5vblNlYXJjaC5lbWl0KHtldmVudCwgXCJ2YWx1ZVwiOiB0aGlzLnNlYXJjaFRleHQsIGlzQ3VzdG9tfSk7XG4gICAgfSwgNTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBvblByZWZlcmVuY2VTZWxlY3QoIG9wdGlvbiApe1xuICAgIHRoaXMuZGF0YS5wcmVmZXJlbmNlcy5mb3JFYWNoKGl0ZW0gPT4gIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZSApO1xuXG4gICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmlzQ3VzdG9tUHJlZmVyZW5jZSA9ICggb3B0aW9uLnR5cGUgPT09IFwiY3VzdG9tXCIgKSA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLnNlYXJjaFRleHQgPSAnJztcbiAgICB0aGlzLm9uUHJlZmVyZW5jZUNoYW5nZS5lbWl0KCBvcHRpb24gKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVTZWxlY3RlZCggaXRlbSApe1xuICAgIGxldCBiaW5kTGFiZWwgPSAodGhpcy5kYXRhLnVzZVZhbHVlPyB0aGlzLmRhdGEuYmluZExhYmVsIDogdGhpcy5kYXRhLmJpbmRWYWx1ZSkgfHwgJ2lkJztcbiAgICBsZXQgb3B0aW9uID0gdGhpcy5uZ011bHRpU2VsZWN0LnNlbGVjdGVkSXRlbXMuZmluZCh4ID0+IHgudmFsdWVbYmluZExhYmVsXT09aXRlbSk7XG4gICAgaWYob3B0aW9uICYmIG9wdGlvbi5zZWxlY3RlZCl7XG4gICAgICB0aGlzLm5nTXVsdGlTZWxlY3QudW5zZWxlY3Qob3B0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25DbG9zZSggKXtcbiAgICB0aGlzLnNlYXJjaFRleHQgPSAnJztcbiAgICBzdXBlci5vbkNsb3NlKCk7XG4gIH1cblxuICBwdWJsaWMgY29tcHV0ZUxpbWl0KCk6IG51bWJlcntcbiAgICBpZiggdGhpcy5saW1pdCApe1xuICAgICAgbGV0IHNlbGVjdENvbXBvbmVudCA9IHRoaXMubmdNdWx0aVNlbGVjdCxcbiAgICAgICAgICBjb250YWluZXJXaWR0aCA9ICg8SFRNTEVsZW1lbnQ+c2VsZWN0Q29tcG9uZW50LmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZy12YWx1ZS1jb250YWluZXJcIikpLm9mZnNldFdpZHRoLFxuICAgICAgICAgIGxhYmVsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLFxuICAgICAgICAgIGNvbnRlbnRMaW1pdCA9IDAsXG4gICAgICAgICAgYWNjdW11bGF0ZWRXaWR0aCA9IDAsXG4gICAgICAgICAgJGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07XG5cbiAgICAgIE9iamVjdC5hc3NpZ24oIGxhYmVsRWxlbWVudC5zdHlsZSwge1wiZm9udC1zaXplXCI6IFwiMTJweFwiLCBcInBvc2l0aW9uXCI6IFwiYWJzb2x1dGVcIiwgXCJwYWRkaW5nXCI6IFwiMCA1cHhcIiwgXCJ0b3BcIjogXCItMzAwcHhcIiwgXCJsZWZ0XCI6IFwiLTMwMHB4XCIsIFwiZm9udC13ZWlnaHRcIjogNTAwLCBcImZvbnQtZmFtaWx5XCI6IFwiUG9wcGlucyxzYW5zLXNlcmlmXCJ9ICk7XG4gICAgICAkYm9keS5hcHBlbmRDaGlsZCggbGFiZWxFbGVtZW50ICk7XG5cbiAgICAgIGxldCBzZWxlY3RlZEl0ZW1zID0gc2VsZWN0Q29tcG9uZW50Lml0ZW1zTGlzdC5zZWxlY3RlZEl0ZW1zLFxuICAgICAgICAgIGxpbWl0ID0gKHRoaXMubGltaXQgPD0gc2VsZWN0ZWRJdGVtcy5sZW5ndGgpID8gdGhpcy5saW1pdCA6IHNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuXG4gICAgICBmb3IoIGxldCBpPTA7IGkgPCBsaW1pdDsgaSsrKXtcbiAgICAgICAgbGV0IGl0ZW0gPSBzZWxlY3RlZEl0ZW1zW2ldO1xuICAgICAgICBsYWJlbEVsZW1lbnQudGV4dENvbnRlbnQgPSBpdGVtW3RoaXMuZGF0YS5iaW5kTGFiZWxdO1xuXG4gICAgICAgIGlmKCAoYWNjdW11bGF0ZWRXaWR0aCArIChsYWJlbEVsZW1lbnQub2Zmc2V0V2lkdGggKyAxNykpIDwgKGNvbnRhaW5lcldpZHRoIC0gNzUpICl7XG4gICAgICAgICAgYWNjdW11bGF0ZWRXaWR0aCArPSAobGFiZWxFbGVtZW50Lm9mZnNldFdpZHRoICsgMTcpO1xuICAgICAgICAgIGNvbnRlbnRMaW1pdCsrO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgJGJvZHkucmVtb3ZlQ2hpbGQoIGxhYmVsRWxlbWVudCApO1xuICAgICAgdGhpcy5tYXhMaW1pdCA9ICghY29udGVudExpbWl0ID8gMSA6IGNvbnRlbnRMaW1pdCk7XG4gICAgICByZXR1cm4gdGhpcy5tYXhMaW1pdDtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkVmFsdWVzLmxlbmd0aDtcbiAgICB9XG4gIH1cbn0iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEZLU2VsZWN0TXVsdGlwbGVDb21wb25lbnQgfSBmcm9tICcuLi9may1zZWxlY3QtbXVsdGlwbGUvZmstc2VsZWN0LW11bHRpcGxlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZrLXNlbGVjdC1ncm91cCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9may1zZWxlY3QtZ3JvdXAuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9may1zZWxlY3QtZ3JvdXAuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEZLU2VsZWN0R3JvdXBDb21wb25lbnQgZXh0ZW5kcyBGS1NlbGVjdE11bHRpcGxlQ29tcG9uZW50IHtcblxuICBAVmlld0NoaWxkKFwiZmtHcm91cFNlbGVjdFwiKSBma0dyb3VwU2VsZWN0IDogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKSBzaG93TGFiZWwgPSB0cnVlO1xuICBASW5wdXQoKSBzZWxlY3RlZFZhbHVlcyA9IFtdO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3RlZFZhbHVlc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nW10+KCk7XG5cbiAgcHVibGljIGlzU2VsZWN0ZWQoaXRlbSkge1xuICAgIHJldHVybiAodGhpcy5zZWxlY3RlZFZhbHVlcy5sZW5ndGggJiYgdGhpcy5zZWxlY3RlZFZhbHVlcy5pbmRleE9mKGl0ZW1bdGhpcy5kYXRhLmJpbmRWYWx1ZV0pICE9IC0xKTtcbiAgfVxuXG4gIHB1YmxpYyB2YWx1ZUNoYW5nZSggZXZlbnQgKXtcbiAgICBpZiggdGhpcy5zZWxlY3RlZFZhbHVlcyApe1xuICAgICAgdGhpcy5zZWxlY3RlZFZhbHVlc0NoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRWYWx1ZXMpO1xuICAgIH1cbiAgfVxufSIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEhvc3RCaW5kaW5nLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnZmstc2lkZS1uYXYtcGFuZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vZmstc2lkZS1uYXYtcGFuZWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9may1zaWRlLW5hdi1wYW5lbC5jb21wb25lbnQuc2NzcyddLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gIGhvc3Q6IHsnW2NsYXNzLmV4cGFuZGVkXSc6ICdleHBhbmRlZCcsICdjbGFzcyc6ICdjbGVhcmZpeCd9XG59KVxuXG5leHBvcnQgY2xhc3MgRktTaWRlTmF2UGFuZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmV4cGFuZGVkJykgZXhwYW5kZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgb3B0aW9uczogYW55O1xuICBASW5wdXQoKSBleHBhbmRPbkljb25DbGljayA9IGZhbHNlO1xuICBwdWJsaWMgdXJsOiBzdHJpbmcgPSBudWxsO1xuICBwdWJsaWMgc3ViVXJsOiBzdHJpbmcgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByb3V0ZXI6IFJvdXRlcikge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMub3B0aW9ucykge1xuICAgICAgY29uc3QgeyBjdXJyZW50VmFsdWUsIHByZXZpb3VzVmFsdWUgfSA9IGNoYW5nZXMub3B0aW9ucztcbiAgICAgIGlmICghXy5pc0VxdWFsKGN1cnJlbnRWYWx1ZSwgcHJldmlvdXNWYWx1ZSkpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVSb3V0ZXJFdmVudHMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3Vic2NyaWJlUm91dGVyRXZlbnRzKCkge1xuICAgIHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0TWVudShldmVudC51cmxBZnRlclJlZGlyZWN0cyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaGlnaGxpZ2h0TWVudSh1cmwpOiB2b2lkIHtcbiAgICB1cmwgPSB1cmwuc3BsaXQoJz8nKVswXTtcbiAgICB0aGlzLm9wdGlvbnMubGlua3MuZm9yRWFjaChvcHRpb24gPT4ge1xuICAgICAgaWYgKF8uaXNFbXB0eShvcHRpb24uc3VibWVudSkgJiYgb3B0aW9uLm5hdmlnYXRpb25VcmwgPT09IHVybCkge1xuICAgICAgICB0aGlzLnVybCA9IG9wdGlvbi5uYXZpZ2F0aW9uVXJsO1xuICAgICAgfSBlbHNlIGlmICghXy5pc0VtcHR5KG9wdGlvbi5zdWJtZW51KSkge1xuICAgICAgICBvcHRpb24uc3VibWVudS5mb3JFYWNoKHN1Ym1lbnUgPT4ge1xuICAgICAgICAgIGlmIChzdWJtZW51Lm5hdmlnYXRpb25VcmwgPT09IHVybCkge1xuICAgICAgICAgICAgdGhpcy51cmwgPSBzdWJtZW51LnBhcmVudE5hdmlnYXRpb25Vcmw7XG4gICAgICAgICAgICB0aGlzLnN1YlVybCA9IHN1Ym1lbnUubmF2aWdhdGlvblVybDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNoYW5nZU1lbnUob3B0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5zdWJVcmwgPSBvcHRpb24uc3VibWVudSA/IG9wdGlvbi5zdWJtZW51WzBdLm5hdmlnYXRpb25VcmwgOiBvcHRpb24ubmF2aWdhdGlvblVybDtcbiAgICB0aGlzLnVybCA9IG9wdGlvbi5uYXZpZ2F0aW9uVXJsO1xuICAgIGlmICh0aGlzLmV4cGFuZE9uSWNvbkNsaWNrKSB7XG4gICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2hhbmdlU3VibWVudShvcHRpb24sIGV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5zdWJVcmwgPSBvcHRpb24ubmF2aWdhdGlvblVybDtcbiAgICB0aGlzLnVybCA9IG9wdGlvbi5wYXJlbnROYXZpZ2F0aW9uVXJsO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgcHVibGljIGVxdWFscyhwcmltYXJ5VVJMLCBjb21wYXJlVVJMKSB7XG4gICAgcmV0dXJuIHByaW1hcnlVUkwgPT09IGNvbXBhcmVVUkw7XG4gIH1cblxuICBwdWJsaWMgY2FuU2hvd1N1Yk1lbnUocHJpbWFyeVVSTCwgY29tcGFyZVVSTCkge1xuICAgIHJldHVybiAodGhpcy5lcXVhbHMocHJpbWFyeVVSTCwgY29tcGFyZVVSTCkgJiYgdGhpcy5leHBhbmRlZCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlKCkge1xuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ29uZmlnSGVscGVyIH0gZnJvbSAnLi4vaGVscGVycy9jb25maWcuaGVscGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzICBHZW9TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBjaXR5U3RhdGVBdXRvQ29tcGxldGVVcmwgPSAnL2FwaS92MS9hZGRyZXNzL2NpdHlfc3RhdGVfY291bnRyeV92Mic7XG4gIHByaXZhdGUgc3RvcE5hbWVBdXRvQ29tcGxldGVVcmwgPSAnL2FwaS92MS9hZGRyZXNzL3N0b3BfbmFtZV9hdXRvY29tcGxldGUnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudFxuICApe31cblxuICBwdWJsaWMgY2l0eVN0YXRlQXV0b0NvbXBsZXRlKHF1ZXJ5OiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT57XG4gICAgbGV0IHBhcmFtcyA9IHsgcTogcXVlcnkgfTtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmZ1bGxDaXR5U3RhdGVBdXRvQ29tcGxldGVVcmwsIHsgcGFyYW1zIH0pO1xuICB9XG4gIFxuICBwdWJsaWMgc3RvcE5hbWVBdXRvQ29tcGxldGUocXVlcnk6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IHBhcmFtcyA9IHsgcTogcXVlcnkgfTtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmZ1bGxTdG9wTmFtZUF1dG9Db21wbGV0ZVVybCwgeyBwYXJhbXMgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldCBmdWxsQ2l0eVN0YXRlQXV0b0NvbXBsZXRlVXJsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMuZ2VvU2VydmljZVVybH0ke3RoaXMuY2l0eVN0YXRlQXV0b0NvbXBsZXRlVXJsfWBcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGZ1bGxTdG9wTmFtZUF1dG9Db21wbGV0ZVVybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHt0aGlzLmdlb1NlcnZpY2VVcmx9JHt0aGlzLnN0b3BOYW1lQXV0b0NvbXBsZXRlVXJsfWBcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGdlb1NlcnZpY2VVcmwoKSB7XG4gICAgcmV0dXJuIENvbmZpZ0hlbHBlci5lbnZpcm9ubWVudC5nZW9TZXJ2aWNlVXJsO1xuICB9XG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBMb2FkZXJTdGF0ZSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy9sb2FkZXItc3RhdGUuY29uc3RhbnQnO1xuaW1wb3J0IHsgTG9hZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xvYWRlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdsb2FkZXInLFxuICAgIHN0eWxlVXJsczogWycuL2xvYWRlci5zY3NzJ10sXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xvYWRlci5odG1sJ1xufSlcblxuZXhwb3J0IGNsYXNzIExvYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcHVibGljIG92ZXJsYXkgPSBmYWxzZTtcbiAgICBzaG93ID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgICAgIHByaXZhdGUgbG9hZGluZ1NlcnZpY2U6IExvYWRlclNlcnZpY2VcbiAgICAgICAgKSB7fVxuICAgIG5nT25Jbml0KCkgeyBcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmxvYWRpbmdTZXJ2aWNlLkxvYWRpbmdTdGF0ZVxuICAgICAgICAuc3Vic2NyaWJlKChzdGF0ZTogTG9hZGVyU3RhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZihzdGF0ZSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyA9IHN0YXRlLnNob3c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbiAmJiB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbG9hZC1zY3JpcHRdJ1xufSlcbmV4cG9ydCBjbGFzcyBMb2FkU2NyaXB0RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoJ3NjcmlwdCcpIHNjcmlwdFVybDogIGFueTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIG5vZGUuc3JjID0gdGhpcy5zY3JpcHRVcmw7XG4gICAgICAgIG5vZGUudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICBub2RlLmFzeW5jID0gdHJ1ZTtcbiAgICAgICAgbm9kZS5kZWZlciA9IHRydWU7XG4gICAgICAgIG5vZGUuY2hhcnNldCA9ICd1dGYtOCc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDb25maWdIZWxwZXIgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2NvbmZpZy5oZWxwZXInO1xuXG5jb25zdCBSRVBPX05BTUVTID0gW1widG9vbHMtZnJvbnRlbmQtY2xpZW50XCIsIFwidHJhY2tpbmctZnJvbnRlbmQtY2xpZW50XCIsIFwiZGFzaGJvYXJkLWZyb250ZW5kLWNsaWVudFwiLCBcImluc2lnaHRzLWZyb250ZW5kLWNsaWVudFwiLCBcIm5ldHdvcmstdmlzaWJpbGl0eS1mcm9udGVuZC1jbGllbnRcIl07XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICAgICAgRktVTTogYW55O1xuICAgIH1cbn1cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmstY29tbW9uLWhlYWRlci1jb21wb25lbnQnLFxuICAgIHRlbXBsYXRlOiBgXG4gIDxzZWN0aW9uICNzZWN0aW9uV3JhcHBlcj5cbiAgPGZvdXJraXRlcy1oZWFkZXItd3JhcHBlcj5cbiAgPGZvdXJraXRlcy1sZWdhY3ktaGVhZGVyIGNsYXNzPVwiaGVhZGVyLXdyYXBwZXJcIiBbb3JpZ2luXT1cIid1bHRyYW1hbidcIj48L2ZvdXJraXRlcy1sZWdhY3ktaGVhZGVyPlxuICA8L2ZvdXJraXRlcy1oZWFkZXItd3JhcHBlcj5cbiAgPC9zZWN0aW9uPlxuICBgLFxuICAgIHN0eWxlVXJsczogW10sXG59KVxuZXhwb3J0IGNsYXNzIEZrQ29tbW9uSGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKCdzZWN0aW9uV3JhcHBlcicpIHNlY3Rpb25XcmFwcGVyO1xuICAgIEBJbnB1dCgncmVwb05hbWUnKSByZXBvTmFtZTogc3RyaW5nID0gJyc7XG4gICAgcHJpdmF0ZSBlbnZpcm9ubWVudCA9IENvbmZpZ0hlbHBlci5lbnZpcm9ubWVudC5uYW1lO1xuICAgIHB1YmxpYyBjb3B5RW52aXJvbm1lbnQgPSBPYmplY3QuYXNzaWduKHt9LCBDb25maWdIZWxwZXIuZW52aXJvbm1lbnQpO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgdGhpcy5zZXRFbnZWYXJpYWJsZXMoKTtcbiAgICB9XG4gICAgc2V0RW52VmFyaWFibGVzKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZC1kb25lJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5GS1VNKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LkZLVU0uc2V0RW52aXJvbm1lbnQodGhpcy5jb3B5RW52aXJvbm1lbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdIZWFkZXIgRW52IG5vdCBjb25maWd1cmVkISEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zdCBET00gPSB0aGlzLnNlY3Rpb25XcmFwcGVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgY29uc3QgczNQYXRoID0gJ2h0dHBzOi8vZmstaGVhZGVyLnMzLmFtYXpvbmF3cy5jb20vaGVhZGVyLWNvbmZpZ3VyYXRpb25zLmpzb24nO1xuICAgICAgICAgICAgdGhpcy5odHRwLmdldChzM1BhdGgpLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXBvTmFtZSA9IFJFUE9fTkFNRVMuaW5kZXhPZih0aGlzLnJlcG9OYW1lKSA+IC0xID8gJ3VsdHJhbWFuJyA6IHRoaXMucmVwb05hbWU7XG4gICAgICAgICAgICAgICAgY29uc3QgdmVyc2lvbiA9IHJlc1tgJHt0aGlzLmVudmlyb25tZW50fV92ZXJzaW9uYF07XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gcmVzLmVuZHBvaW50c1tyZXBvTmFtZV07XG4gICAgICAgICAgICAgICAgc2NyaXB0LnNyYyA9IHVybC5yZXBsYWNlKCcke3ZlcnNpb259JywgdmVyc2lvbik7XG4gICAgICAgICAgICAgICAgRE9NLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdIRUFERVIgTEFURVNUIFZFUlNJT04nLCByZXMudmVyc2lvbik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKCdIRUFERVIgQ1VSUkVOVCBWRVJTSU9OJywgdmVyc2lvbik7XG4gICAgICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VSUk9SIEZFVENISU5HIFMzIEhFQURFUiBDT05GSUdVUkFUSU9OUycsIGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dvdGNoYScsIGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29yZSBEZXBlbmRlbmNpZXNcbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0LCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSwgVHJhbnNsYXRlUGlwZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBNYXREaWFsb2dNb2R1bGUsIE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFRvYXN0ck1vZHVsZSwgVG9hc3RyU2VydmljZSB9IGZyb20gJ25neC10b2FzdHInO1xuaW1wb3J0IHsgTmdTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5pbXBvcnQgeyBDYWxlbmRhck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvY2FsZW5kYXInO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbi8vIEludGVyZmFjZXNcbmltcG9ydCB7IElTaGFyZWRNb2R1bGVDb25maWcsIFNoYXJlZE1vZHVsZUNvbmZpZyB9IGZyb20gJy4vaW50ZXJmYWNlcy9jb25maWcnO1xuLy8gQ3VzdG9tIE1vZHVsZXNcbmltcG9ydCB7IFN0b3JhZ2VNb2R1bGUgfSBmcm9tICcuL21vZHVsZXMvc3RvcmFnZS5tb2R1bGUnO1xuLy8gU2VydmljZXNcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VjdXJpdHlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zZWN1cml0eS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbXBhbnlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb21wYW55LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tcGFueUNvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb21wYW55LWNvbnRleHQuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyUmVzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91c2VyLXJlc291cmNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVByZXNlbnRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2RhdGEtcHJlc2VudGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWxlcnRTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvYWxlcnQuc2VydmljZVwiO1xuaW1wb3J0IHsgTG9jYXRpb25Qcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL21vZHVsZXMvbG9jYXRpb24tcHJvdmlkZXIvc2VydmljZXMvbG9jYXRpb24tcHJvdmlkZXIuc2VydmljZSc7XG4vLyBJbnRlcmNlcHRvcnNcbmltcG9ydCB7IEN1c3RvbUh0dHBJbnRlcmNlcHRvciB9IGZyb20gJy4vaW50ZXJjZXB0b3JzL2h0dHAuaW50ZXJjZXB0b3InXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgeyBBY3Rpb25Gb290ZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uRGlhbG9nQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9jb25maXJtYXRpb24tZGlhbG9nL2NvbmZpcm1hdGlvbi1kaWFsb2cuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBFeHBhbmRhYmxlTGlzdCB9IGZyb20gXCIuL2NvbXBvbmVudHMvZXhwYW5kYWJsZS1saXN0L2V4cGFuZGFibGUtbGlzdC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEV4cGFuZGFibGVMaXN0SXRlbSB9IGZyb20gXCIuL2NvbXBvbmVudHMvZXhwYW5kYWJsZS1saXN0LWl0ZW0vZXhwYW5kYWJsZS1saXN0LWl0ZW0uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBGaWx0ZXJUb2dnbGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZmlsdGVyLXRvZ2dsZS9maWx0ZXItdG9nZ2xlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3U3dpdGNoZXJDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3ZpZXctc3dpdGNoZXIvdmlldy1zd2l0Y2hlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IEZ1bGxQYWdlTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZnVsbC1wYWdlLW1vZGFsL2Z1bGwtcGFnZS1tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRktEaWFsb2dDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2ZrLWRpYWxvZy9may1kaWFsb2cuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBEYXRlUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZrLWRhdGUtcGlja2VyL2ZrLWRhdGUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21wb25lbnRzSWNvbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jb21wb25lbnRzLWljb24vY29tcG9uZW50cy1pY29uLmNvbXBvbmVudCc7XG4vLyBIZWxwZXJzXG5pbXBvcnQgeyBDb25maWdIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvY29uZmlnLmhlbHBlcic7XG4vLyBkaXJlY3RpdmVzXG5pbXBvcnQgeyBOZ0Rpc2FibGVkRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nLWRpc2FibGVkL25nLWRpc2FibGVkLmRpcmVjdGl2ZSdcbmltcG9ydCB7IFBlbmRvQW5hbHl0aWNzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3BlbmRvLWFuYWx5dGljcy9wZW5kby1hbmFseXRpY3MuZGlyZWN0aXZlJztcbmltcG9ydCB7IEhpZ2hsaWdodERpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvaGlnaGxpZ2h0L2hpZ2hsaWdodC5kaXJlY3RpdmVcIjtcbmltcG9ydCB7IEtleUJsb2NrRGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9rZXktYmxvY2sva2V5LWJsb2NrLmRpcmVjdGl2ZVwiO1xuLy8gRksgTG9hZGVyXG5pbXBvcnQgeyBOYXZQZXJtaXNzaW9uU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbmF2LXBlcm1pc3Npb24uc2VydmljZSc7XG4vL1BpcGVzXG5pbXBvcnQgeyBSZXF1aXJlZEZpZWxkUGlwZSB9IGZyb20gJy4vcGlwZXMvcmVxdWlyZWQtZmllbGQvcmVxdWlyZWQtZmllbGQucGlwZSc7XG5pbXBvcnQgeyBGS1NlbGVjdENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvZmstc2VsZWN0L2ZrLXNlbGVjdC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEZLU2VsZWN0TXVsdGlwbGVDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2ZrLXNlbGVjdC1tdWx0aXBsZS9may1zZWxlY3QtbXVsdGlwbGUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBGS1NlbGVjdEdyb3VwQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9may1zZWxlY3QtZ3JvdXAvZmstc2VsZWN0LWdyb3VwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRktTaWRlTmF2UGFuZWxDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZmstc2lkZS1uYXYtcGFuZWwvZmstc2lkZS1uYXYtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IEdlb1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2dlby5zZXJ2aWNlJztcbmltcG9ydCB7IEZlYXR1cmVGbGFnU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZmVhdHVyZS1mbGFnLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGljZW5zaW5nU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbGljZW5zaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9hZGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbG9hZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9hZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvYWRlci9sb2FkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IExvYWRTY3JpcHREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbG9hZC1zY3JpcHQvbG9hZC1zY3JpcHQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZrQ29tbW9uSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZrLWNvbW1vbi1oZWFkZXIvZmstY29tbW9uLWhlYWRlci5jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3QgU0hBUkVEX01PRFVMRV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ1NIQVJFRF9NT0RVTEVfQ09ORklHJyk7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIExvYWRlckNvbXBvbmVudCxcbiAgICBBY3Rpb25Gb290ZXJDb21wb25lbnQsXG4gICAgTmdEaXNhYmxlZERpcmVjdGl2ZSxcbiAgICBQZW5kb0FuYWx5dGljc0RpcmVjdGl2ZSxcbiAgICBMb2FkU2NyaXB0RGlyZWN0aXZlLFxuICAgIEhpZ2hsaWdodERpcmVjdGl2ZSxcbiAgICBLZXlCbG9ja0RpcmVjdGl2ZSxcbiAgICBDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnQsXG4gICAgRktEaWFsb2dDb21wb25lbnQsXG4gICAgRnVsbFBhZ2VNb2RhbENvbXBvbmVudCxcbiAgICBFeHBhbmRhYmxlTGlzdCxcbiAgICBFeHBhbmRhYmxlTGlzdEl0ZW0sXG4gICAgRmlsdGVyVG9nZ2xlQ29tcG9uZW50LFxuICAgIFZpZXdTd2l0Y2hlckNvbXBvbmVudCxcbiAgICBEYXRlUGlja2VyQ29tcG9uZW50LFxuICAgIEZLU2VsZWN0Q29tcG9uZW50LFxuICAgIEZLU2VsZWN0TXVsdGlwbGVDb21wb25lbnQsXG4gICAgRktTZWxlY3RHcm91cENvbXBvbmVudCxcbiAgICBGS1NpZGVOYXZQYW5lbENvbXBvbmVudCxcbiAgICBSZXF1aXJlZEZpZWxkUGlwZSxcbiAgICBDb21wb25lbnRzSWNvbkNvbXBvbmVudCxcbiAgICBGa0NvbW1vbkhlYWRlckNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIFN0b3JhZ2VNb2R1bGUsXG4gICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgIENhbGVuZGFyTW9kdWxlLFxuICAgIFRvYXN0ck1vZHVsZS5mb3JSb290KCksXG4gICAgUG9ydGFsTW9kdWxlLFxuICAgIE5nU2VsZWN0TW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgU3RvcmFnZU1vZHVsZSxcbiAgICBUb2FzdHJNb2R1bGUsXG4gICAgUG9ydGFsTW9kdWxlLFxuICAgIExvYWRlckNvbXBvbmVudCxcbiAgICBBY3Rpb25Gb290ZXJDb21wb25lbnQsXG4gICAgTmdEaXNhYmxlZERpcmVjdGl2ZSxcbiAgICBMb2FkU2NyaXB0RGlyZWN0aXZlLFxuICAgIFBlbmRvQW5hbHl0aWNzRGlyZWN0aXZlLFxuICAgIEhpZ2hsaWdodERpcmVjdGl2ZSxcbiAgICBLZXlCbG9ja0RpcmVjdGl2ZSxcbiAgICBDb25maXJtYXRpb25EaWFsb2dDb21wb25lbnQsXG4gICAgRktEaWFsb2dDb21wb25lbnQsXG4gICAgRnVsbFBhZ2VNb2RhbENvbXBvbmVudCxcbiAgICBFeHBhbmRhYmxlTGlzdCxcbiAgICBFeHBhbmRhYmxlTGlzdEl0ZW0sXG4gICAgRmlsdGVyVG9nZ2xlQ29tcG9uZW50LFxuICAgIFZpZXdTd2l0Y2hlckNvbXBvbmVudCxcbiAgICBUcmFuc2xhdGVQaXBlLFxuICAgIEZLU2VsZWN0Q29tcG9uZW50LFxuICAgIEZLU2VsZWN0TXVsdGlwbGVDb21wb25lbnQsXG4gICAgRktTZWxlY3RHcm91cENvbXBvbmVudCxcbiAgICBGS1NpZGVOYXZQYW5lbENvbXBvbmVudCxcbiAgICBSZXF1aXJlZEZpZWxkUGlwZSxcbiAgICBEYXRlUGlja2VyQ29tcG9uZW50LFxuICAgIENvbXBvbmVudHNJY29uQ29tcG9uZW50LFxuICAgIEZrQ29tbW9uSGVhZGVyQ29tcG9uZW50XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIENvbmZpcm1hdGlvbkRpYWxvZ0NvbXBvbmVudCxcbiAgICBGdWxsUGFnZU1vZGFsQ29tcG9uZW50LFxuICAgIEZLRGlhbG9nQ29tcG9uZW50XG4gIF0sXG4gIHNjaGVtYXM6IFsgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSBdLFxuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgdXNlQ2xhc3M6IEN1c3RvbUh0dHBJbnRlcmNlcHRvcixcbiAgICBtdWx0aTogdHJ1ZSxcbiAgICBkZXBzOiBbU3RvcmFnZVNlcnZpY2UsIFNlY3VyaXR5U2VydmljZSwgQ29tcGFueUNvbnRleHRTZXJ2aWNlLCBMb2FkZXJTZXJ2aWNlXVxuICB9XVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc/OiBJU2hhcmVkTW9kdWxlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTaGFyZWRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBTSEFSRURfTU9EVUxFX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogU2hhcmVkTW9kdWxlQ29uZmlnLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IHByb3ZpZGVDb25maWcsXG4gICAgICAgICAgZGVwczogW1NIQVJFRF9NT0RVTEVfQ09ORklHXVxuICAgICAgICB9LFxuICAgICAgICBTZWN1cml0eVNlcnZpY2UsXG4gICAgICAgIENvbXBhbnlTZXJ2aWNlLFxuICAgICAgICBMb2NhdGlvblByb3ZpZGVyU2VydmljZSxcbiAgICAgICAgQ29tcGFueUNvbnRleHRTZXJ2aWNlLFxuICAgICAgICBVc2VyUmVzb3VyY2VTZXJ2aWNlLFxuICAgICAgICBEYXRhUHJlc2VudGVyU2VydmljZSxcbiAgICAgICAgTG9hZGVyU2VydmljZSxcbiAgICAgICAgeyBwcm92aWRlOiBNYXREaWFsb2dSZWYsIHVzZVZhbHVlOiB7fSB9LFxuICAgICAgICB7IHByb3ZpZGU6IE1BVF9ESUFMT0dfREFUQSwgdXNlVmFsdWU6IFtdIH0sXG4gICAgICAgIFRvYXN0clNlcnZpY2UsXG4gICAgICAgIEFsZXJ0U2VydmljZSxcbiAgICAgICAgR2VvU2VydmljZSxcbiAgICAgICAgTmF2UGVybWlzc2lvblNlcnZpY2UsXG4gICAgICAgIEZlYXR1cmVGbGFnU2VydmljZSxcbiAgICAgICAgTGljZW5zaW5nU2VydmljZVxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFNoYXJlZE1vZHVsZUNvbmZpZykgY29uZmlnOiBTaGFyZWRNb2R1bGVDb25maWcpIHtcbiAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5lbnZpcm9ubWVudCkge1xuICAgICAgQ29uZmlnSGVscGVyLnNldEVudmlyb25tZW50KGNvbmZpZy5lbnZpcm9ubWVudClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVDb25maWcoY29uZmlnOiBJU2hhcmVkTW9kdWxlQ29uZmlnKTogU2hhcmVkTW9kdWxlQ29uZmlnIHtcbiAgcmV0dXJuIG5ldyBTaGFyZWRNb2R1bGVDb25maWcoY29uZmlnKTtcbn0iLCJpbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmF2UGVybWlzc2lvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9uYXYtcGVybWlzc2lvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaGRyLWFjY291bnQtc3ViLW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJy4vYWNjb3VudC1zdWItbWVudS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2FjY291bnQtc3ViLW1lbnUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBY2NvdW50U3ViTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgnbWVudUl0ZW1zJykgbWVudUl0ZW1zO1xuICBASW5wdXQoJ29yaWdpbicpIG9yaWdpbjtcbiAgcHVibGljIG5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaGVhZGVyU2VydmljZTogTmF2UGVybWlzc2lvblNlcnZpY2UsXG4gICAgcHVibGljIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2VcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm1lbnVJdGVtc1swXS50aXRsZSA9IHRoaXMuaGVhZGVyU2VydmljZS5nZXROYW1lKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgTmF2UGVybWlzc2lvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9uYXYtcGVybWlzc2lvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaGRyLXVzZXItc3ViLW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJy4vdXNlci1zdWItbWVudS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3VzZXItc3ViLW1lbnUuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFVzZXJTdWJNZW51Q29tcG9uZW50ICB7XG4gIEBJbnB1dCgnbWVudUl0ZW1zJykgbWVudUl0ZW1zO1xuICBASW5wdXQoJ29yaWdpbicpIG9yaWdpbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaGVhZGVyU2VydmljZTogTmF2UGVybWlzc2lvblNlcnZpY2UsIHB1YmxpYyB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7IH1cblxuICBwdWJsaWMgY2hhbmdlSW1hZ2UobWVudSwgZXZlbnQpe1xuICAgIGlmIChldmVudC50eXBlID09PSAnbW91c2VvdmVyJyl7XG4gICAgICBtZW51LmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBtZW51LmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGlzTWVudUFjdGl2ZShtZW51LCBvcmlnaW4pe1xuICAgIHJldHVybiAobWVudS5hY3RpdmUgfHwgdGhpcy5oZWFkZXJTZXJ2aWNlLmlzTWVudUFjdGl2ZShtZW51LCBvcmlnaW4pKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgTmF2UGVybWlzc2lvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9uYXYtcGVybWlzc2lvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnaGRyLWxvYWQtc2VhcmNoZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9hZC1zZWFyY2hlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xvYWQtc2VhcmNoZXIuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIExvYWRTZWFyY2hlckNvbXBvbmVudCB7XG5cbiAgcHVibGljIGxvYWROdW1iZXI6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKClcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaGVhZGVyU2VydmljZTogTmF2UGVybWlzc2lvblNlcnZpY2UsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55XG4gICkgeyB9XG5cbiAgb25Mb2FkTnVtYmVyU3VibWl0KGV2ZW50KXtcbiAgICBpZih0aGlzLmxvYWROdW1iZXIudmFsdWUpe1xuICAgICAgdGhpcy5oZWFkZXJTZXJ2aWNlLm9uTG9hZHNTZWFyY2godGhpcy5sb2FkTnVtYmVyLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXNldFNlYXJjaFZhbHVlKCkge1xuICAgIHRoaXMubG9hZE51bWJlci5zZXRWYWx1ZSgnJyk7XG4gICAgdGhpcy5oZWFkZXJTZXJ2aWNlLm9uTG9hZHNTZWFyY2goJyAnKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge0xpY2Vuc2luZ0NvbmZpZ30gZnJvbSAnLi9saWNlbnNpbmctY29uZmlnLmNvbnN0YW50JztcblxuZXhwb3J0IGNvbnN0IEhlYWRlckNvbmZpZyA9IHtcbiAgJ3VzZXJNZW51JzogW1xuICAgIHtcbiAgICAgIGlkOiAnaG9tZScsXG4gICAgICB0aXRsZTogJ2hlYWRlci51c2VyLmhvbWUnLFxuICAgICAgdXJsOiAnZGFzaGJvYXJkLycsXG4gICAgICBpY29uOiAnaWNvbi1ob21lIGljb25zJyxcbiAgICAgIGNvbmRpdGlvbnM6IFtbJ2NoZWNrUGFyYW0nLCAnZW5hYmxlRXhlY0Rhc2hib2FyZCddXVxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICd0cmFja2luZycsXG4gICAgICB0aXRsZTogJ2hlYWRlci51c2VyLnRyYWNraW5nJyxcbiAgICAgIHVybDogJycsXG4gICAgICBpY29uOiAnaWNvbi1sb2NhdGlvbi1waW4gaWNvbnMnLFxuICAgICAgY29uZGl0aW9uczogW1snY2hlY2tJZlNob3dNb2R1bGUnLCAndHJhY2tpbmcnXSwgWydjaGVja1Blcm1pc3Npb25zJywgJ2xvYWRzJywgJ3ZpZXcnXV0sXG4gICAgICBzdWJzOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAnbG9hZHMnLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLmxvYWRzJyxcbiAgICAgICAgdXJsOiAndHJhY2tpbmcvIy9sb2FkcycsXG4gICAgICAgIGNvbmRpdGlvbnM6IFtbJ2NoZWNrUGVybWlzc2lvbnMnLCAnbG9hZHMnLCAndmlldyddXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdjcmVhdGVMb2FkX0EnLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLmNyZWF0ZV9sb2FkJyxcbiAgICAgICAgdXJsOiAnIy9jcmVhdGVMb2FkJyxcbiAgICAgICAgdXJsUGFyYW1zOiAnZ2V0Q3JlYXRlTG9hZEFkbWluUGFyYW1zJyxcbiAgICAgICAgY29uZGl0aW9uczogW1snY2hlY2tQYXJhbScsICdzdXBlckFkbWluJ11dXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ2NyZWF0ZUxvYWQnLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLmNyZWF0ZV9sb2FkJyxcbiAgICAgICAgdXJsOiAnIy9jcmVhdGVMb2FkJyxcbiAgICAgICAgY29uZGl0aW9uczogW1snY2hlY2tGYWxzZVBhcmFtJywgJ3N1cGVyQWRtaW4nXSwgWydjaGVja1Blcm1pc3Npb25zJywgJ2xvYWRzJywgJ2NyZWF0ZSddXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdtYXNzVXBkYXRlX0EnLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLm1hc3NfdXBkYXRlJyxcbiAgICAgICAgdXJsOiAnIy9tYXNzVXBkYXRlJyxcbiAgICAgICAgdXJsUGFyYW1zOiAnZ2V0Q3JlYXRlTG9hZEFkbWluUGFyYW1zJyxcbiAgICAgICAgY29uZGl0aW9uczogW1snY2hlY2tQYXJhbScsICdzdXBlckFkbWluJ11dXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ21hc3NVcGRhdGUnLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLm1hc3NfdXBkYXRlJyxcbiAgICAgICAgdXJsOiAnIy9tYXNzVXBkYXRlJyxcbiAgICAgICAgY29uZGl0aW9uczogW1snY2hlY2tGYWxzZVBhcmFtJywgJ3N1cGVyQWRtaW4nXSwgWydjaGVja1Blcm1pc3Npb25zJywgJ2xvYWRzJywgJ2NyZWF0ZSddXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdnZXREaXJlY3RBc3NpZ25tZW50JyxcbiAgICAgICAgdGl0bGU6ICdoZWFkZXIudXNlci5nZXRfZGlyZWN0X2Fzc2lnbm1lbnQnLFxuICAgICAgICB1cmw6ICcjL2ludGVncmF0aW9ucy90cmFja2luZ0luZm9Bc3NpZ25tZW50JyxcbiAgICAgICAgdXJsUGFyYW1zOiAnZ2V0RGlyZWN0QXNzaWdubWVudEd1aWRVcmwnLFxuICAgICAgICBjb25kaXRpb25zOiBbJ2lzRGlyZWN0QXNzaWdubWVudEd1aWQnXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdvY2VhblRyYWNraW5nJyxcbiAgICAgICAgdGl0bGU6ICdoZWFkZXIudXNlci5vY2Vhbl90cmFja2luZycsXG4gICAgICAgIHVybDogJ29jZWFuLXRyYWNraW5nL2xvYWRzJyxcbiAgICAgICAgY29uZGl0aW9uczogW1xuICAgICAgICBbJ2NoZWNrSWZTaG93TW9kdWxlJywgJ3RyYWNraW5nLW9jZWFuJ10sXG4gICAgICAgIFsnY2hlY2tQZXJtaXNzaW9ucycsICdsb2FkcycsICd2aWV3J10sXG4gICAgICAgIFsnaXNGZWF0dXJlRW5hYmxlZCcsICduZXctb2NlYW4tcGFnZSddXG4gICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ2FpclRyYWNraW5nJyxcbiAgICAgICAgdGl0bGU6ICdoZWFkZXIudXNlci5haXJfdHJhY2tpbmcnLFxuICAgICAgICB1cmw6ICdhaXItdHJhY2tpbmcvbG9hZHMnLFxuICAgICAgICBjb25kaXRpb25zOiBbXG4gICAgICAgIFsnY2hlY2tJZlNob3dNb2R1bGUnLCAndHJhY2tpbmctYWlyJ10sXG4gICAgICAgIFsnY2hlY2tQZXJtaXNzaW9ucycsICdsb2FkcycsICd2aWV3J10sXG4gICAgICAgIFsnaXNGZWF0dXJlRW5hYmxlZCcsICduZXctYWlyLXBhZ2UnXVxuICAgICAgXVxuICAgICAgfVxuICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnaW5zaWdodHMnLFxuICAgICAgdGl0bGU6ICdoZWFkZXIudXNlci5mb3Vya2l0ZXNfYW5hbHl0aWNzJyxcbiAgICAgIGljb246ICdpY29uLWdyYXBoIGljb25zJyxcbiAgICAgIHVybDogJycsXG4gICAgICBjb25kaXRpb25zOiBbJ3Nob3dJbnNpZ2h0c1RhYiddLFxuICAgICAgc3ViczogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICd0cmFja2luZ0NvbnNpc3RlbmN5JyxcbiAgICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLnRyYWNraW5nX2NvbnNpc3RlbmN5JyxcbiAgICAgICAgICB1cmw6ICdpbnNpZ2h0cy90cmFja2luZy1jb25zaXN0ZW5jeScsXG4gICAgICAgICAgY29uZGl0aW9uczogW1snaXNMaWNlbnNlZCcsIFtMaWNlbnNpbmdDb25maWcuSU5TSUdIVFMuQ09OU0lTVEVOQ1lfREFTSEJPQVJEXSwgJ3Nob3dUcmFja2luZ0NvbnNpc3RlbmN5J11dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ2Jhc2ljQW5hbHl0aWNzJyxcbiAgICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLmJhc2ljX2FuYWx5dGljcycsXG4gICAgICAgICAgdXJsOiAnaW5zaWdodHMvYmFzaWMtYW5hbHl0aWNzJyxcbiAgICAgICAgICBjb25kaXRpb25zOiBbWydpc0xpY2Vuc2VkJywgW0xpY2Vuc2luZ0NvbmZpZy5JTlNJR0hUUy5BTkFMWVRJQ1NfREFTSEJPQVJELCBMaWNlbnNpbmdDb25maWcuSU5TSUdIVFMuQU5BTFlUSUNTX0RBU0hCT0FSRF9PQ0VBTl1dXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdwZXJmb21hbmNlQW5hbHl0aWNzJyxcbiAgICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLnBlcmZvcm1hbmNlX2FuYWx5dGljcycsXG4gICAgICAgICAgdXJsOiAnaW5zaWdodHMvYW5hbHl0aWNzJyxcbiAgICAgICAgICBjb25kaXRpb25zOiBbWydpc0xpY2Vuc2VkJywgW0xpY2Vuc2luZ0NvbmZpZy5JTlNJR0hUUy5BRFZBTkNFRF9BTkFMWVRJQ1NfREFTSEJPQVJELCBMaWNlbnNpbmdDb25maWcuSU5TSUdIVFMuQURWQU5DRURfQU5BTFlUSUNTX0RBU0hCT0FSRF9PQ0VBTl0sICdzaG93UGVyZm9ybWFuY2VBbmFseXRpY3MnXV1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnYmVuY2htYXJraW5nJyxcbiAgICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLmJlbmNobWFya2luZycsXG4gICAgICAgICAgdXJsOiAnaW5zaWdodHMvYmVuY2htYXJraW5nJyxcbiAgICAgICAgICBjb25kaXRpb25zOiBbWydpc0xpY2Vuc2VkJywgW0xpY2Vuc2luZ0NvbmZpZy5JTlNJR0hUUy5CRU5DSE1BUktJTkdfREFTSEJPQVJEXSwgJ3Nob3dCZW5jaE1hcmtpbmcnXV1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAncmVjb21tZW5kYXRpb25zJyxcbiAgICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLnJlY29tbWVuZGF0aW9ucycsXG4gICAgICAgICAgdXJsOiAnaW5zaWdodHMvcmVjb21tZW5kYXRpb25zJyxcbiAgICAgICAgICBjb25kaXRpb25zOiBbJ3Nob3dNQUJETW9kdWxlJ11cbiAgICAgICAgfSwge1xuICAgICAgICAgIGlkOiAnbWFuYWdlU3Vic2NyaXB0aW9uJyxcbiAgICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLm1hbmFnZV9zdWJzY3JpcHRpb24nLFxuICAgICAgICAgIHVybDogJ2luc2lnaHRzL3N1YnNjcmlwdGlvbicsXG4gICAgICAgICAgY29uZGl0aW9uczogW1snaXNMaWNlbnNlZCcsIFtcbiAgICAgICAgICAgICAgTGljZW5zaW5nQ29uZmlnLklOU0lHSFRTLkNPTlNJU1RFTkNZX1NVQlNDUklQVElPTixcbiAgICAgICAgICAgICAgTGljZW5zaW5nQ29uZmlnLklOU0lHSFRTLkFEVkFOQ0VEX0FOQUxZVElDU19TVUJTQ1JJUFRJT04sXG4gICAgICAgICAgICAgIExpY2Vuc2luZ0NvbmZpZy5JTlNJR0hUUy5BTkFMWVRJQ1NfU1VCU0NSSVBUSU9OXSwgJ3Nob3dTdWJzY3JpcHRpb24nXV1cbiAgICAgICAgfSxcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAncGNtJyxcbiAgICAgIHRpdGxlOiAnUENNJyxcbiAgICAgIHVybDogJ3ByaXZhdGUtZXhjaGFuZ2UvJyxcbiAgICAgIGljb25Vcmw6ICdodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZmstaWNvbnMvcGNtLW1lbnUtaWNvbi5zdmcnLFxuICAgICAgaWNvbkFjdGl2ZVVybDogJ2h0dHBzOi8vczMuYW1hem9uYXdzLmNvbS9may1pY29ucy9wY20tbWVudS1pY29uLWFjdGl2ZS5zdmcnLFxuICAgICAgY29uZGl0aW9uczogWydzaG93UHhNb2R1bGUnXVxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICduZXR3b3JrVmlzaWJpbGl0eScsXG4gICAgICB0aXRsZTogJ2hlYWRlci51c2VyLm5ldHdvcmtfdmlzaWJpbGl0eScsXG4gICAgICB1cmw6ICduZXR3b3JrLXZpc2liaWxpdHknLFxuICAgICAgaWNvblVybDogJ2h0dHBzOi8vczMuYW1hem9uYXdzLmNvbS9may1pY29ucy9OZXR3b3JrVmlzX2ljb24uc3ZnJyxcbiAgICAgIGljb25BY3RpdmVVcmw6ICdodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZmstaWNvbnMvTmV0d29ya1Zpc19pY29uLWFjdGl2ZS5zdmcnLFxuICAgICAgY29uZGl0aW9uczogWydzaG93TmV0d29ya1Zpc2liaWxpdHlNb2R1bGUnXVxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdmYWNpbGl0eS1tYW5hZ2VyJyxcbiAgICAgIHRpdGxlOiAnaGVhZGVyLnVzZXIuZmFjaWxpdHlfbWFuYWdlcicsXG4gICAgICB1cmw6ICdkYy1tYW5hZ2VyL2Rhc2hib2FyZCcsXG4gICAgICBpY29uVXJsOiAnaHR0cHM6Ly9zMy5hbWF6b25hd3MuY29tL2ZrLWljb25zL2ZhY2lsaXR5bWFuYWdlci1tZW51LWljb24uc3ZnJyxcbiAgICAgIGljb25BY3RpdmVVcmw6ICdodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZmstaWNvbnMvZmFjaWxpdHltYW5hZ2VyLW1lbnUtaWNvbi1hY3RpdmUuc3ZnJyxcbiAgICAgIGNvbmRpdGlvbnM6IFsnc2hvd0ZhY2lsaXR5TWFuYWdlck1vZHVsZSddXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ2FwcG9pbnRtZW50LW1hbmFnZXInLFxuICAgICAgdGl0bGU6ICdoZWFkZXIudXNlci5hcHBvaW50bWVudF9tYW5hZ2VyJyxcbiAgICAgIHVybDogJ29hcy9ob21lJyxcbiAgICAgIGljb25Vcmw6ICdodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZmstaWNvbnMvYXBwb2ludG1lbnQtbWFuYWdlci1tZW51LWljb24uc3ZnJyxcbiAgICAgIGljb25BY3RpdmVVcmw6ICdodHRwczovL3MzLmFtYXpvbmF3cy5jb20vZmstaWNvbnMvYXBwb2ludG1lbnQtbWFuYWdlci1tZW51LWljb24tYWN0aXZlLnN2ZycsXG4gICAgICBjb25kaXRpb25zOiBbJ3Nob3dBcHBvaW5tZW50TWFuYWdlck1vZHVsZSddXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ3Rvb2xzJyxcbiAgICAgIHRpdGxlOiAnaGVhZGVyLnVzZXIudG9vbHMnLFxuICAgICAgaWNvbjogJ2ljb24tYnJpZWZjYXNlIGljb25zJyxcbiAgICAgIGNvbmRpdGlvbnM6IFsnc2hvd1Rvb2xzTW9kdWxlJ10sXG4gICAgICBzdWJzOiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAnYWRkcmVzc01hbmFnZXInLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLmFkZHJlc3NfbWFuYWdlcicsXG4gICAgICAgIHVybDogJ3Rvb2xzL2FkZHJlc3MtbWFuYWdlcicsXG4gICAgICAgIGNvbmRpdGlvbnM6IFsnc2hvd0FkZHJlc3NNYW5hZ2VyJ11cbiAgICAgIH0sIHtcbiAgICAgICAgaWQ6ICdub3RpZmljYXRpb25SdWxlcycsXG4gICAgICAgIHRpdGxlOiAnaGVhZGVyLnVzZXIubm90aWZpY2F0aW9uX3J1bGVzJyxcbiAgICAgICAgdXJsOiAnIy90b29scy9ub3RpZmljYXRpb25SdWxlcycsXG4gICAgICAgIGNvbmRpdGlvbnM6IFsnc2hvd05vdGlmaWNhdGlvblJ1bGVzJ11cbiAgICAgIH0sIHtcbiAgICAgICAgICBpZDogJ25vdGlmaWNhdGlvblJ1bGVzQmV0YScsXG4gICAgICAgICAgdGl0bGU6ICdoZWFkZXIudXNlci5ub3RpZmljYXRpb25fcnVsZXNfMi4wX2JldGEnLFxuICAgICAgICAgIHVybDogJ3Rvb2xzL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb25zJyxcbiAgICAgICAgICBjb25kaXRpb25zOiBbJ3Nob3dBZHZhbmNlZE5vdGlmaWNhdGlvbnMnXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdidWxrVXBsb2FkTm90aWZpY2F0aW9uUnVsZXMnLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLmJ1bGtfdXBsb2FkX25vdGlmaWNhdGlvbl9ydWxlcycsXG4gICAgICAgIHVybDogJ3Rvb2xzL25vdGlmaWNhdGlvbi9idWxrLW5vdGlmaWNhdGlvbi11cGxvYWQnLFxuICAgICAgICBjb25kaXRpb25zOiBbJ3Nob3dOb3RpZmljYXRpb25SdWxlcycsIFsnY2hlY2tQYXJhbScsICdzdXBlckFkbWluJ10sIFsnaXNGZWF0dXJlRW5hYmxlZCcsICdidWxrLW5vdGlmaWNhdGlvbi11cGxvYWQnXV1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnZXRhVGhyZXNob2xkQ29uZmlndXJhdGlvbicsXG4gICAgICAgIHRpdGxlOiAnaGVhZGVyLnVzZXIuZXRhX3RocmVzaG9sZF9jb25maWd1cmF0aW9uJyxcbiAgICAgICAgdXJsOiAndG9vbHMvZXRhLWNvbmZpZ3VyYXRpb24nLFxuICAgICAgICBjb25kaXRpb25zOiBbWydjaGVja1BhcmFtJywgJ3N1cGVyQWRtaW4nXV1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnb25UaW1lUGVyZm9ybWFuY2UnLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLm9uX3RpbWVfcGVyZm9ybWFuY2UnLFxuICAgICAgICB1cmw6ICcjL3JlcG9ydHMvZGVsaXZlcnknLFxuICAgICAgICBjb25kaXRpb25zOiBbJ3Nob3dSZXBvcnRzTW9kdWxlJ11cbiAgICAgIH0sIHtcbiAgICAgICAgaWQ6ICdsb2FkVmFsaWRhdGlvblJlcG9ydCcsXG4gICAgICAgIHRpdGxlOiAnaGVhZGVyLnVzZXIubG9hZF92YWxpZGF0aW9uX3JlcG9ydCcsXG4gICAgICAgIHVybDogJyMvcmVwb3J0cy9sb2FkVmFsaWRhdGlvbicsXG4gICAgICAgIGNvbmRpdGlvbnM6IFsnc2hvd1JlcG9ydHNNb2R1bGUnXVxuICAgICAgfSwge1xuICAgICAgICBpZDogJ2NhcnJpZXJTY29yZWNhcmQnLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLmNhcnJpZXJfc2NvcmVjYXJkJyxcbiAgICAgICAgdXJsOiAnIy9yZXBvcnRzL2NhcnJpZXInLFxuICAgICAgICBjb25kaXRpb25zOiBbJ3Nob3dSZXBvcnRzTW9kdWxlJywgWydjaGVja1BhcmFtJywgJ3Nob3dDYXJyaWVyU2NvcmVjYXJkJ11dXG4gICAgICB9LCB7XG4gICAgICAgIGlkOiAnY3VzdG9tZXJTY29yZWNhcmQnLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLmN1c3RvbWVyX3Njb3JlY2FyZCcsXG4gICAgICAgIHVybDogJyMvcmVwb3J0cy9jdXN0b21lcicsXG4gICAgICAgIGNvbmRpdGlvbnM6IFsnc2hvd1JlcG9ydHNNb2R1bGUnLCBbJ2NoZWNrUGFyYW0nLCAnc2hvd0N1c3RvbWVyU2NvcmVjYXJkJ11dXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ3NpbXVsYXRlTG9jYXRpb24nLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLnNpbXVsYXRlX2xvY2F0aW9uJyxcbiAgICAgICAgdXJsOiAnIy90b29scy9jcmVhdGVDaGVja0NhbGwnLFxuICAgICAgICBjb25kaXRpb25zOiBbWydjaGVja1BhcmFtJywgJ3N1cGVyQWRtaW4nXV1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAncGluZ1Rlc3QnLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLnBpbmdfdGVzdCcsXG4gICAgICAgIHVybDogJyMvdG9vbHMvcGluZ1Rlc3QnLFxuICAgICAgICBjb25kaXRpb25zOiBbWydjaGVja1BhcmFtJywgJ3N1cGVyQWRtaW4nXV1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnYXBwbGVzc01hbmFnZW1lbnQnLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLmFwcGxlc3NfbWFuYWdlbWVudCcsXG4gICAgICAgIHVybDogJyMvdG9vbHMvYXBwTGVzc1N1YnNjcmlwdGlvbk1hbmFnZW1lbnQnLFxuICAgICAgICBjb25kaXRpb25zOiBbWydjaGVja1BhcmFtJywgJ3N1cGVyQWRtaW4nXV1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnYmxhY2tsaXN0UGhvbmVzJyxcbiAgICAgICAgdGl0bGU6ICdoZWFkZXIudXNlci5ibGFja2xpc3RfcGhvbmVzJyxcbiAgICAgICAgdXJsOiAnIy90b29scy9ibGFja0xpc3RQaG9uZU51bWJlcnMnLFxuICAgICAgICBjb25kaXRpb25zOiBbWydjaGVja1BhcmFtJywgJ3N1cGVyQWRtaW4nXV1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAndGVtcGVyYXR1cmVUcmFja2luZycsXG4gICAgICAgIHRpdGxlOiAnaGVhZGVyLnVzZXIudGVtcGVyYXR1cmVfdHJhY2tpbmcnLFxuICAgICAgICB1cmw6ICcjL3Rvb2xzL3RlbXBlcmF0dXJlVHJhY2tpbmcnLFxuICAgICAgICBjb25kaXRpb25zOiBbWydjaGVja1BhcmFtJywgJ3Nob3dUZW1wZXJhdHVyZVRyYWNraW5nTW9kdWxlJ11dXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ2hlYWx0aERhc2hib2FyZCcsXG4gICAgICAgIHRpdGxlOiAnaGVhZGVyLnVzZXIuaGVhbHRoX2Rhc2hib2FyZCcsXG4gICAgICAgIHVybDogJyMvdG9vbHMvY2NoRGFzaGJvYXJkJyxcbiAgICAgICAgY29uZGl0aW9uczogW1snY2hlY2tQYXJhbScsICdzdXBlckFkbWluJ11dXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ3BvcnRzJyxcbiAgICAgICAgdGl0bGU6ICdoZWFkZXIudXNlci5nbG9iYWxfYWRkcmVzcycsXG4gICAgICAgIHVybDogJ3Rvb2xzL2FkZHJlc3MtbWFuYWdlci9wb3J0cycsXG4gICAgICAgIGNvbmRpdGlvbnM6IFsnaXNTdXBlckFkbWluTm9Db250ZXh0J11cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnb2NlYW5JbnNpZ2h0c01hc3NVcGxvYWQnLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLm1hc3NfdXBkYXRlX29pJyxcbiAgICAgICAgdXJsOiAnb2NlYW4tdHJhY2tpbmcvbG9hZHMvbWFzcy11cGxvYWQnLFxuICAgICAgICBjb25kaXRpb25zOiBbJ2lzU3VwZXJBZG1pbk5vQ29udGV4dCddXG4gICAgICB9XG4gICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdhZG1pbicsXG4gICAgICB0aXRsZTogJ2hlYWRlci51c2VyLmFkbWluJyxcbiAgICAgIHVybDogJycsXG4gICAgICBpY29uOiAnaWNvbi1zZXR0aW5ncyBpY29ucycsXG4gICAgICBjb25kaXRpb25zOiBbJ3Nob3dBZG1pbk1vZHVsZSddLFxuICAgICAgc3ViczogW1xuICAgICAge1xuICAgICAgICBpZDogJ2NvbXBhbmllcycsXG4gICAgICAgIHRpdGxlOiAnaGVhZGVyLnVzZXIuY29tcGFuaWVzJyxcbiAgICAgICAgdXJsOiAnIy9hZG1pbi9jb21wYW5pZXMnLFxuICAgICAgICBjb25kaXRpb25zOiBbJ3Nob3dDb21wYW55J11cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnbG9jYXRpb25Qcm92aWRlcnMnLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLmxvY2F0aW9uX3Byb3ZpZGVycycsXG4gICAgICAgIHVybDogJyMvYWRtaW4vbG9jYXRpb25Qcm92aWRlcnMnLFxuICAgICAgICBjb25kaXRpb25zOiBbJ2lzU3VwZXJBZG1pbk5vQ29udGV4dCddXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ3RlbXBlcmF0dXJlUHJvdmlkZXJzJyxcbiAgICAgICAgdGl0bGU6ICdoZWFkZXIudXNlci50ZW1wZXJhdHVyZV9wcm92aWRlcnMnLFxuICAgICAgICB1cmw6ICcjL2FkbWluL3RlbXBlcmF0dXJlUHJvdmlkZXJzJyxcbiAgICAgICAgY29uZGl0aW9uczogWydpc1N1cGVyQWRtaW5Ob0NvbnRleHQnXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICduZXR3b3JrJyxcbiAgICAgICAgdGl0bGU6ICdoZWFkZXIudXNlci5uZXR3b3JrJyxcbiAgICAgICAgdXJsOiAnIy9hZG1pbi9uZXR3b3JrJyxcbiAgICAgICAgY29uZGl0aW9uczogW1snY2hlY2tQYXJhbScsICdjb21wYW55QWRtaW4nXV1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnY3VzdG9tZXJzJyxcbiAgICAgICAgdGl0bGU6ICdoZWFkZXIudXNlci5jdXN0b21lcnMnLFxuICAgICAgICB1cmw6ICcjL2FkbWluL2N1c3RvbWVycycsXG4gICAgICAgIGNvbmRpdGlvbnM6IFtbJ2NoZWNrUGFyYW0nLCAnY29tcGFueUFkbWluJ11dXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ3VzZXJzJyxcbiAgICAgICAgdGl0bGU6ICdoZWFkZXIudXNlci51c2VycycsXG4gICAgICAgIHVybDogJyMvYWRtaW4vdXNlcnMnLFxuICAgICAgICBjb25kaXRpb25zOiBbJ2NoZWNraWZVc2VyQWRtaW4nXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICd1c2VyTGljZXNpbmcnLFxuICAgICAgICB0aXRsZTogJ2hlYWRlci51c2VyLm1hbmFnZV9saWNlbnNlJyxcbiAgICAgICAgdXJsOiAnYWRtaW4vbGljZW5zZS91c2VyJyxcbiAgICAgICAgY29uZGl0aW9uczogWydpc1N1cGVyQWRtaW5XaXRoQ29tcGFueUNvbnRleHQnLCAnaXNDb21wYW55QWN0aXZlJywgWydpc0ZlYXR1cmVFbmFibGVkJywgJ3VzZXItbGljZW5zaW5nJ11dXG4gICAgICB9XG4gICAgXVxuICAgIH1cbiAgXSxcbiAgJ2FjY291bnRNZW51JzogW1xuICAgIHtcbiAgICAgIGlkOiAnbmFtZScsXG4gICAgICB0aXRsZTogJ25hbWUnLFxuICAgICAgdXJsOiAnIy91c2VyQWNjb3VudCcsXG4gICAgICBpY29uOiAnaWNvbi11c2VyIGljb25zJyxcbiAgICAgIGNvbmRpdGlvbnM6IFsnaXNBdXRoZW50aWNhdGVkJ11cbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnaGVhZGVyLmFjY291bnQuaGVscCcsXG4gICAgICBpZDogJ2hlbHAnLFxuICAgICAgdXJsOiAnJyxcbiAgICAgIGljb246ICdpY29uLXF1ZXN0aW9uIGljb25zJyxcbiAgICAgIGNvbmRpdGlvbnM6IFsnaXNBdXRoZW50aWNhdGVkJ10sXG4gICAgICBvbkNsaWNrOiAnb3BlblplbmRlc2tTdXBwb3J0J1xuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdoZWFkZXIuYWNjb3VudC5zZXR0aW5ncycsXG4gICAgICBpZDogJ3NldHRpbmdzJyxcbiAgICAgIHVybDogJyMvc2V0dGluZ3MnLFxuICAgICAgaWNvbjogJ2ljb24tc2V0dGluZ3MgaWNvbnMnLFxuICAgICAgY29uZGl0aW9uczogWydpc0F1dGhlbnRpY2F0ZWQnLCAnc2hvd1NldHRpbmdzJ11cbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnc2lnbi1vdXQnLFxuICAgICAgdGl0bGU6ICdoZWFkZXIuYWNjb3VudC5zaWduX291dCcsXG4gICAgICB1cmw6ICcnLFxuICAgICAgaWNvbjogJ2ljb24tbG9nb3V0IGljb24nLFxuICAgICAgY29uZGl0aW9uczogWydpc0F1dGhlbnRpY2F0ZWQnXSxcbiAgICAgIG9uQ2xpY2s6ICdsb2dPdXQnXG4gICAgfVxuICBdXG59O1xuIiwiZXhwb3J0IGNvbnN0IHRyYW5zbGF0aW9ucyA9IHtcbiAgJ2hlYWRlcic6IHtcbiAgICAgICdhY2NvdW50Jzoge1xuICAgICAgICAgICdoZWxwJzogJ0hlbHAnLFxuICAgICAgICAgICdzZXR0aW5ncyc6ICdTZXR0aW5ncycsXG4gICAgICAgICAgJ3NpZ25fb3V0JzogJ1NpZ24gT3V0J1xuICAgICAgfSxcbiAgICAgICd1c2VyJzoge1xuICAgICAgICAgICdhZGRyZXNzX21hbmFnZXInOiAnQWRkcmVzcyBNYW5hZ2VyJyxcbiAgICAgICAgICAnYWRtaW4nOiAnQWRtaW4nLFxuICAgICAgICAgICdhcHBsZXNzX21hbmFnZW1lbnQnOiAnQXBwLWxlc3MgTWFuYWdlbWVudCcsXG4gICAgICAgICAgJ2JlbmNobWFya2luZyc6ICdCZW5jaG1hcmtpbmcnLFxuICAgICAgICAgICdibGFja2xpc3RfcGhvbmVzJzogJ2JsYWNrbGlzdCBBcHAtbGVzcyBQaG9uZXMnLFxuICAgICAgICAgICdjYXJyaWVyX3Njb3JlY2FyZCc6ICdDYXJyaWVyIFNjb3JlY2FyZCcsXG4gICAgICAgICAgJ2NvbXBhbmllcyc6ICdDb21wYW5pZXMnLFxuICAgICAgICAgICdjcmVhdGVfbG9hZCc6ICdjcmVhdGUgTG9hZCcsXG4gICAgICAgICAgJ2N1c3RvbWVyX3Njb3JlY2FyZCc6ICdDdXN0b21lciBTY29yZWNhcmQnLFxuICAgICAgICAgICdjdXN0b21lcnMnOiAnQ3VzdG9tZXJzJyxcbiAgICAgICAgICAnZGFzaGJvYXJkJzogJ0Rhc2hib2FyZCcsXG4gICAgICAgICAgJ2V0YV90aHJlc2hvbGRfY29uZmlndXJhdGlvbic6ICdFdGEgVGhyZXNob2xkIENvbmZpZ3VyYXRpb24nLFxuICAgICAgICAgICdmYWNpbGl0eV9tYW5hZ2VyJyA6ICdGYWNpbGl0eSBNYW5hZ2VyJyxcbiAgICAgICAgICAnYXBwb2ludG1lbnRfbWFuYWdlcic6ICdBcHBvaW50bWVudHMnLFxuICAgICAgICAgICdmb3Vya2l0ZXNfYW5hbHl0aWNzJzogJ0luc2lnaHRzJyxcbiAgICAgICAgICAnZ2V0X2RpcmVjdF9hc3NpZ25tZW50JzogJ0RpcmVjdCBBc3NpZ25tZW50IExvYWRzJyxcbiAgICAgICAgICAnZ2xvYmFsX2FkZHJlc3MnOiAnR2xvYmFsIEFkZHJlc3MnLFxuICAgICAgICAgICdoZWFsdGhfZGFzaGJvYXJkJzogJ0hlYWx0aCBEYXNoYm9hcmQnLFxuICAgICAgICAgICdob21lJzogJ0hvbWUnLFxuICAgICAgICAgICdpbnNpZ2h0c19hcGknOiAnSW5zaWdodHMgQVBJJyxcbiAgICAgICAgICAnbG9hZF92YWxpZGF0aW9uX3JlcG9ydCc6ICdMb2FkIFZhbGlkYXRpb24gUmVwb3J0JyxcbiAgICAgICAgICAnbG9hZHMnOiAnTG9hZHMnLFxuICAgICAgICAgICdsb2NhdGlvbl9wcm92aWRlcnMnOiAnTG9jYXRpb24gUHJvdmlkZXJzJyxcbiAgICAgICAgICAnbWFzc191cGRhdGUnOiAnTWFzcyBVcGRhdGUnLFxuICAgICAgICAgICdtYXNzX3VwZGF0ZV9vaSc6ICdNYXNzIFVwbG9hZCAtIE9jZWFuIChPSSknLFxuICAgICAgICAgICdtYW5hZ2Vfc3Vic2NyaXB0aW9uJzogJ01hbmFnZSBTdWJzY3JpcHRpb25zJyxcbiAgICAgICAgICAnbWF0Y2hlcyc6ICdtYXRjaGVzJyxcbiAgICAgICAgICAnbmV0d29yayc6ICdOZXR3b3JrJyxcbiAgICAgICAgICAnbm90aWZpY2F0aW9uX3J1bGVzJzogJ05vdGlmaWNhdGlvbiBSdWxlcycsXG4gICAgICAgICAgJ25vdGlmaWNhdGlvbl9ydWxlc18yLjBfYmV0YSc6ICdOb3RpZmljYXRpb24gUnVsZXMgKEJFVEEpJyxcbiAgICAgICAgICAnYnVsa191cGxvYWRfbm90aWZpY2F0aW9uX3J1bGVzJzogJ0J1bGsgVXBsb2FkIE5vdGlmaWNhdGlvbnMnLFxuICAgICAgICAgICdvbl90aW1lX3BlcmZvcm1hbmNlJzogJ09uIFRpbWUgUGVyZm9ybWFuY2UnLFxuICAgICAgICAgICdwZXJmb3JtYW5jZV9hbmFseXRpY3MnOiAnQWR2YW5jZWQgQW5hbHl0aWNzJyxcbiAgICAgICAgICAnYmFzaWNfYW5hbHl0aWNzJzogJ0FuYWx5dGljcycsXG4gICAgICAgICAgJ3BpbmdfdGVzdCc6ICdQaW5nIFRlc3QnLFxuICAgICAgICAgICdwb3J0cyc6ICdQb3J0cycsXG4gICAgICAgICAgJ3JlY29tbWVuZGF0aW9ucyc6ICdSZWNvbW1lbmRhdGlvbnMnLFxuICAgICAgICAgICdyZXBvcnRzJzogJ3JlcG9ydHMnLFxuICAgICAgICAgICdzZWFyY2hfYnlfcmVmZXJlbmNlX251bWJlcic6ICdTZWFyY2ggYnkgUmVmZXJlbmNlIE51bWJlcicsXG4gICAgICAgICAgJ3NpbXVsYXRlX2xvY2F0aW9uJzogJ1NpbXVsYXRlIExvY2F0aW9uJyxcbiAgICAgICAgICAndGVtcGVyYXR1cmVfcHJvdmlkZXJzJzogJ3RlbXBlcmF0dXJlIFByb3ZpZGVycycsXG4gICAgICAgICAgJ3RlbXBlcmF0dXJlX3RyYWNraW5nJzogJ1RlbXBlcmF0dXJlIFRyYWNraW5nJyxcbiAgICAgICAgICAndG9vbHMnOiAndG9vbHMnLFxuICAgICAgICAgICd0cmFja2luZyc6ICdUcmFja2luZycsXG4gICAgICAgICAgJ29jZWFuX3RyYWNraW5nJzogJ09jZWFuIFRyYWNraW5nJyxcbiAgICAgICAgICAnYWlyX3RyYWNraW5nJzogJ0hlYXZ5d2VpZ2h0IEFpciBUcmFja2luZycsXG4gICAgICAgICAgJ3RyYWNraW5nX2NvbnNpc3RlbmN5JzogJ0ZvdW5kYXRpb25zJyxcbiAgICAgICAgICAndXNlcnMnOiAnVXNlcnMnLFxuICAgICAgICAgICduZXR3b3JrX3Zpc2liaWxpdHknOiAnTmV0d29yayBWaXNpYmlsaXR5JyxcbiAgICAgICAgICAnbWFuYWdlX2xpY2Vuc2UnOiAnTWFuYWdlIExpY2Vuc2VzJ1xuICAgICAgfVxuICB9XG59O1xuIiwiZXhwb3J0IGNvbnN0IHRyYW5zbGF0aW9ucyA9IHtcbiAgJ2hlYWRlcic6IHtcbiAgICAnYWNjb3VudCc6IHtcbiAgICAgICAgJ2hlbHAnOiAnQWp1ZGEnLFxuICAgICAgICAnc2V0dGluZ3MnOiAnQ29uZmlndXJhw4PCp8ODwrVlcycsXG4gICAgICAgICdzaWduX291dCc6ICdTYWlyJ1xuICAgIH0sXG4gICAgJ3VzZXInOiB7XG4gICAgICAgICdhZGRyZXNzX21hbmFnZXInOiAnR2VyZW5jaWFkb3IgZGUgZW5kZXJlw4PCp28nLFxuICAgICAgICAnYWRtaW4nOiAnQWRtaW5pc3RyYWRvcicsXG4gICAgICAgICdhcHBsZXNzX21hbmFnZW1lbnQnOiAnR2VyZW5jaWFtZW50byBzZW0gYXBsaWNhdGl2bycsXG4gICAgICAgICdiZW5jaG1hcmtpbmcnOiAnQW7Dg8KhbGlzZSBjb21wYXJhdGl2YScsXG4gICAgICAgICdibGFja2xpc3RfcGhvbmVzJzogJ2JsYWNrbGlzdCBBcHAtbGVzcyBQaG9uZXMnLFxuICAgICAgICAnY2Fycmllcl9zY29yZWNhcmQnOiAnVGFiZWxhIGRlIGRlc2VtcGVuaG8gZGEgdHJhbnNwb3J0YWRvcmEnLFxuICAgICAgICAnY29tcGFuaWVzJzogJ0VtcHJlc2FzJyxcbiAgICAgICAgJ2NyZWF0ZV9sb2FkJzogJ0NyaWFyIGNhcmdhJyxcbiAgICAgICAgJ2N1c3RvbWVyX3Njb3JlY2FyZCc6ICdUYWJlbGEgZGUgZGVzZW1wZW5obyBkbyBjbGllbnRlJyxcbiAgICAgICAgJ2N1c3RvbWVycyc6ICdDbGllbnRlcycsXG4gICAgICAgICdkYXNoYm9hcmQnOiAnUGFpbmVsJyxcbiAgICAgICAgJ2V0YV90aHJlc2hvbGRfY29uZmlndXJhdGlvbic6ICdFdGEgVGhyZXNob2xkIENvbmZpZ3VyYXRpb24nLFxuICAgICAgICAnZmFjaWxpdHlfbWFuYWdlcic6ICdGYWNpbGl0eSBNYW5hZ2VyJyxcbiAgICAgICAgJ2FwcG9pbnRtZW50X21hbmFnZXInOiAnQXBwb2ludG1lbnRzJyxcbiAgICAgICAgJ2ZvdXJraXRlc19hbmFseXRpY3MnOiAnUGVyc3BlY3RpdmFzJyxcbiAgICAgICAgJ2dldF9kaXJlY3RfYXNzaWdubWVudCc6ICdHZXQgRGlyZWN0IEFzc2lnbm1lbnQnLFxuICAgICAgICAnZ2xvYmFsX2FkZHJlc3MnOiAnR2xvYmFsIEFkZHJlc3MnLFxuICAgICAgICAnaGVhbHRoX2Rhc2hib2FyZCc6ICdQYWluZWwgZGUgc2HDg8K6ZGUnLFxuICAgICAgICAnaG9tZSc6ICdJbsODwq1jaW8nLFxuICAgICAgICAnaW5zaWdodHNfYXBpJzogJ1BlcnNwZWN0aXZhcyBBUEknLFxuICAgICAgICAnbG9hZF92YWxpZGF0aW9uX3JlcG9ydCc6ICdSZWxhdMODwrNyaW8gZGUgdmFsaWRhw4PCp8ODwqNvIGRhIGNhcmdhJyxcbiAgICAgICAgJ2xvYWRzJzogJ0NhcmdhcycsXG4gICAgICAgICdsb2NhdGlvbl9wcm92aWRlcnMnOiAnUHJvdmVkb3JlcyBkZSBsb2NhbGl6YcODwqfDg8KjbycsXG4gICAgICAgICdtYW5hZ2Vfc3Vic2NyaXB0aW9uJzogJ01hbmFnZSBTdWJzY3JpcHRpb25zJyxcbiAgICAgICAgJ21hc3NfdXBkYXRlJzogJ0F0dWFsaXphw4PCp8ODwqNvIGVtIG1hc3NhJyxcbiAgICAgICAgJ21hdGNoZXMnOiAnQ29ycmVzcG9uZMODwqpuY2lhcycsXG4gICAgICAgICduZXR3b3JrJzogJ1JlZGUnLFxuICAgICAgICAnbm90aWZpY2F0aW9uX3J1bGVzJzogJ1JlZ3JhcyBkZSBub3RpZmljYcODwqfDg8KjbycsXG4gICAgICAgICdub3RpZmljYXRpb25fcnVsZXNfMi4wX2JldGEnOiAnTm90aWZpY2F0aW9uIFJ1bGVzIChCRVRBKScsXG4gICAgICAgICdvbl90aW1lX3BlcmZvcm1hbmNlJzogJ0Rlc2VtcGVuaG8gbm8gcHJhem8nLFxuICAgICAgICAncGVyZm9ybWFuY2VfYW5hbHl0aWNzJzogJ0FkdmFuY2VkIEFuYWx5dGljcycsXG4gICAgICAgICdiYXNpY19hbmFseXRpY3MnOiAnQW5hbHl0aWNzJyxcbiAgICAgICAgJ3BpbmdfdGVzdCc6ICdUZXN0ZSBkZSBwaW5nJyxcbiAgICAgICAgJ3BvcnRzJzogJ1BvcnRzJyxcbiAgICAgICAgJ3JlcG9ydHMnOiAnUmVsYXTDg8KzcmlvcycsXG4gICAgICAgICdzZWFyY2hfYnlfcmVmZXJlbmNlX251bWJlcic6ICdQZXNxdWlzYXIgcG9yIG7Dg8K6bWVybyBkZSByZWZlcsODwqpuY2lhJyxcbiAgICAgICAgJ3NpbXVsYXRlX2xvY2F0aW9uJzogJ1NpbXVsYXIgbG9jYWwnLFxuICAgICAgICAndGVtcGVyYXR1cmVfcHJvdmlkZXJzJzogJ1Byb3ZlZG9yZXMgZGUgdGVtcGVyYXR1cmEnLFxuICAgICAgICAndGVtcGVyYXR1cmVfdHJhY2tpbmcnOiAnUmFzdHJlYW1lbnRvIGRlIHRlbXBlcmF0dXJhJyxcbiAgICAgICAgJ3Rvb2xzJzogJ0ZlcnJhbWVudGFzJyxcbiAgICAgICAgJ3RyYWNraW5nJzogJ1Jhc3RyZWFtZW50bycsXG4gICAgICAgICdvY2Vhbl90cmFja2luZyc6ICdPY2VhbiBUcmFja2luZycsXG4gICAgICAgICdhaXJfdHJhY2tpbmcnOiAnSGVhdnl3ZWlnaHQgQWlyIFRyYWNraW5nJyxcbiAgICAgICAgJ3RyYWNraW5nX2NvbnNpc3RlbmN5JzogJ0ZvdW5kYXRpb25zJyxcbiAgICAgICAgJ3VzZXJzJzogJ1VzdcODwqFyaW9zJyxcbiAgICAgICAgJ25ldHdvcmtfdmlzaWJpbGl0eSc6ICdOZXR3b3JrIFZpc2liaWxpdHknLFxuICAgICAgICAnbWFuYWdlX2xpY2Vuc2UnOiAnTWFuYWdlIExpY2Vuc2VzJ1xuICAgIH1cbiAgfVxufTtcbiIsImV4cG9ydCBjb25zdCB0cmFuc2xhdGlvbnMgPSB7XG4gICAgJ2hlYWRlcic6IHtcbiAgICAgICAgJ2FjY291bnQnOiB7XG4gICAgICAgICAgICAnaGVscCc6ICdBaWRlJyxcbiAgICAgICAgICAgICdzZXR0aW5ncyc6ICdQYXJhbVxcdTAwZTh0cmVzJyxcbiAgICAgICAgICAgICdzaWduX291dCc6ICdTZSBkXFx1MDBlOWNvbm5lY3RlcidcbiAgICAgICAgfSxcbiAgICAgICAgJ3VzZXInOiB7XG4gICAgICAgICAgICAnYWRkcmVzc19tYW5hZ2VyJzogJ0dlc3Rpb25uYWlyZSBkXFwnQWRyZXNzZXMnLFxuICAgICAgICAgICAgJ2FkbWluJzogJ0FkbWluJyxcbiAgICAgICAgICAgICdhbmFseXRpY3MnOiAnQW5hbHl0aXF1ZScsXG4gICAgICAgICAgICAnYXBwbGVzc19tYW5hZ2VtZW50JzogJ0dlc3Rpb24gc2FucyBhcHBsaWNhdGlvbicsXG4gICAgICAgICAgICAnYmVuY2htYXJraW5nJzogJ1xcdTAwYzl0YWxvbm5hZ2UnLFxuICAgICAgICAgICAgJ2JsYWNrbGlzdF9waG9uZXMnOiAnVFxcdTAwZTlsXFx1MDBlOXBob25lcyBzYW5zIGFwcGxpY2F0aW9uIHN1ciBsaXN0ZSBub2lyZScsXG4gICAgICAgICAgICAnY2Fycmllcl9zY29yZWNhcmQnOiAnQ2FydGUgZGUgcG9pbnRhZ2UgZHUgdHJhbnNwb3J0ZXVyJyxcbiAgICAgICAgICAgICdjb21wYW5pZXMnOiAnRW50cmVwcmlzZXMnLFxuICAgICAgICAgICAgJ2NyZWF0ZV9sb2FkJzogJ0NyXFx1MDBlOWVyIGxlIGNoYXJnZW1lbnQnLFxuICAgICAgICAgICAgJ2N1c3RvbWVyX3Njb3JlY2FyZCc6ICdDYXJ0ZSBkZSBwb2ludGFnZSBkdSBjbGllbnQnLFxuICAgICAgICAgICAgJ2N1c3RvbWVycyc6ICdDbGllbnRzJyxcbiAgICAgICAgICAgICdkYXNoYm9hcmQnOiAnVGFibGVhdSBkZSBib3JkJyxcbiAgICAgICAgICAgICdldGFfdGhyZXNob2xkX2NvbmZpZ3VyYXRpb24nOiAnRXRhIFRocmVzaG9sZCBDb25maWd1cmF0aW9uJyxcbiAgICAgICAgICAgICdmYWNpbGl0eV9tYW5hZ2VyJzogJ0ZhY2lsaXR5IE1hbmFnZXInLFxuICAgICAgICAgICAgJ2FwcG9pbnRtZW50X21hbmFnZXInOiAnQXBwb2ludG1lbnRzJyxcbiAgICAgICAgICAgICdmb3Vya2l0ZXNfYW5hbHl0aWNzJzogJ0luc2lnaHRzJyxcbiAgICAgICAgICAgICdnZXRfZGlyZWN0X2Fzc2lnbm1lbnQnOiAnT2J0ZW5pciB1bmUgTWlzc2lvbiBEaXJlY3RlJyxcbiAgICAgICAgICAgICdnbG9iYWxfYWRkcmVzcyc6ICdHbG9iYWwgQWRkcmVzcycsXG4gICAgICAgICAgICAnaGVhbHRoX2Rhc2hib2FyZCc6ICdUYWJsZWF1IGRlIGJvcmQgc2FudFxcdTAwZTknLFxuICAgICAgICAgICAgJ2hvbWUnOiAnQWNjdWVpbCcsXG4gICAgICAgICAgICAnaW5zaWdodHNfYXBpJzogJ0luc2lnaHRzIEFQSScsXG4gICAgICAgICAgICAnbG9hZF92YWxpZGF0aW9uX3JlcG9ydCc6ICdSYXBwb3J0IGRlIHZhbGlkYXRpb24gZHUgY2hhcmdlbWVudCcsXG4gICAgICAgICAgICAnbG9hZHMnOiAnQ2hhcmdlbWVudHMnLFxuICAgICAgICAgICAgJ2xvY2F0aW9uX3Byb3ZpZGVycyc6ICdGb3Vybmlzc2V1cnMgZFxcJ2VtcGxhY2VtZW50JyxcbiAgICAgICAgICAgICdtYXNzX3VwZGF0ZSc6ICdNaXNlIFxcdTAwZTAgam91ciBtYXNzaXZlJyxcbiAgICAgICAgICAgICdtYW5hZ2Vfc3Vic2NyaXB0aW9uJzogJ0dcXHUwMGU5cmVyIGxlcyBhYm9ubmVtZW50cycsXG4gICAgICAgICAgICAnbWF0Y2hlcyc6ICdjb3JyZXNwb25kYW5jZXMnLFxuICAgICAgICAgICAgJ25ldHdvcmsnOiAnUlxcdTAwZTlzZWF1JyxcbiAgICAgICAgICAgICdub3RpZmljYXRpb25fcnVsZXMnOiAnUlxcdTAwZThnbGVzIGRlIE5vdGlmaWNhdGlvbicsXG4gICAgICAgICAgICAnbm90aWZpY2F0aW9uX3J1bGVzXzIuMF9iZXRhJzogJ05vdGlmaWNhdGlvbiBSdWxlcyAoQkVUQSknLFxuICAgICAgICAgICAgJ29uX3RpbWVfcGVyZm9ybWFuY2UnOiAnUGVyZm9ybWFuY2UgXFx1MDBlMCBsXFwnaGV1cmUnLFxuICAgICAgICAgICAgJ2Jhc2ljX2FuYWx5dGljcyc6ICdBbmFseXRpY3MnLFxuICAgICAgICAgICAgJ3BlcmZvcm1hbmNlX2FuYWx5dGljcyc6ICdBZHZhbmNlZCBBbmFseXRpY3MnLFxuICAgICAgICAgICAgJ3BpbmdfdGVzdCc6ICdUZXN0IFBpbmcnLFxuICAgICAgICAgICAgJ3BvcnRzJzogJ1BvcnRzJyxcbiAgICAgICAgICAgICdyZXBvcnRzJzogJ3JhcHBvcnRzJyxcbiAgICAgICAgICAgICdzZWFyY2hfYnlfcmVmZXJlbmNlX251bWJlcic6ICdSZWNoZXJjaGVyIHBhciBudW3Dg8Kpcm8gZGUgcsODwqlmw4PCqXJlbmNlJyxcbiAgICAgICAgICAgICdzaW11bGF0ZV9sb2NhdGlvbic6ICdTaW11bGVyIHVuIGVtcGxhY2VtZW50JyxcbiAgICAgICAgICAgICdzdWJzY3JpcHRpb24nOiAnYWJvbm5lbWVudCcsXG4gICAgICAgICAgICAndGVtcGVyYXR1cmVfcHJvdmlkZXJzJzogJ0ZvdXJuaXNzZXVycyBkZSB0ZW1wXFx1MDBlOXJhdHVyZScsXG4gICAgICAgICAgICAndGVtcGVyYXR1cmVfdHJhY2tpbmcnOiAnU3VpdmkgZGUgdGVtcFxcdTAwZTlyYXR1cmUnLFxuICAgICAgICAgICAgJ3Rvb2xzJzogJ291dGlscycsXG4gICAgICAgICAgICAndHJhY2tpbmcnOiAnU3VpdmknLFxuICAgICAgICAgICAgJ29jZWFuX3RyYWNraW5nJzogJ09jZWFuIFRyYWNraW5nJyxcbiAgICAgICAgICAgICdhaXJfdHJhY2tpbmcnOiAnSGVhdnl3ZWlnaHQgQWlyIFRyYWNraW5nJyxcbiAgICAgICAgICAgICd0cmFja2luZ19jb25zaXN0ZW5jeSc6ICdGb3VuZGF0aW9ucycsXG4gICAgICAgICAgICAndXNlcnMnOiAnVXRpbGlzYXRldXJzJyxcbiAgICAgICAgICAgICduZXR3b3JrX3Zpc2liaWxpdHknOiAnTmV0d29yayBWaXNpYmlsaXR5JyxcbiAgICAgICAgICAgICdtYW5hZ2VfbGljZW5zZSc6ICdNYW5hZ2UgTGljZW5zZXMnXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiZXhwb3J0IGNvbnN0IHRyYW5zbGF0aW9ucyA9IHtcbiAgICAnaGVhZGVyJzoge1xuICAgICAgICAnYWNjb3VudCc6IHtcbiAgICAgICAgICAgICdoZWxwJzogJ1lhcmRcXHUwMTMxbScsXG4gICAgICAgICAgICAnc2V0dGluZ3MnOiAnQXlhcmxhcicsXG4gICAgICAgICAgICAnc2lnbl9vdXQnOiAnT3R1cnVtdSBLYXBhdCdcbiAgICAgICAgfSxcbiAgICAgICAgJ3VzZXInOiB7XG4gICAgICAgICAgICAnYWRkcmVzc19tYW5hZ2VyJzogJ0FkcmVzIFlcXHUwMGY2bmV0aWNpc2knLFxuICAgICAgICAgICAgJ2FkbWluJzogJ1lcXHUwMGY2bmV0aWNpJyxcbiAgICAgICAgICAgICdhbmFseXRpY3MnOiAnQW5hbGl6IEV0bWUnLFxuICAgICAgICAgICAgJ2FwcGxlc3NfbWFuYWdlbWVudCc6ICdBcHAtbGVzcyBZXFx1MDBmNm5ldGltaScsXG4gICAgICAgICAgICAnYmVuY2htYXJraW5nJzogJ0tcXHUwMTMxeWFzbGFtYScsXG4gICAgICAgICAgICAnYmxhY2tsaXN0X3Bob25lcyc6ICdBcHBMZXNzIFRlbGVmb25sYXJcXHUwMTMxblxcdTAxMzEga2FyYSBsaXN0ZXllIGFsJyxcbiAgICAgICAgICAgICdjYXJyaWVyX3Njb3JlY2FyZCc6ICdUYVxcdTAxNWZcXHUwMTMxeVxcdTAxMzFjXFx1MDEzMSBLYXJuZXNpJyxcbiAgICAgICAgICAgICdjb21wYW5pZXMnOiAnXFx1MDE1ZWlya2V0bGVyJyxcbiAgICAgICAgICAgICdjcmVhdGVfbG9hZCc6ICdZXFx1MDBmY2sgT2x1XFx1MDE1ZnR1cnVuJyxcbiAgICAgICAgICAgICdjdXN0b21lcl9zY29yZWNhcmQnOiAnTVxcdTAwZmNcXHUwMTVmdGVyaSBLYXJuZXNpJyxcbiAgICAgICAgICAgICdjdXN0b21lcnMnOiAnTVxcdTAwZmNcXHUwMTVmdGVyaWxlcicsXG4gICAgICAgICAgICAnZGFzaGJvYXJkJzogJ0tvbnRyb2wgcGFuZWxpJyxcbiAgICAgICAgICAgICdldGFfdGhyZXNob2xkX2NvbmZpZ3VyYXRpb24nOiAnRXRhIFRocmVzaG9sZCBDb25maWd1cmF0aW9uJyxcbiAgICAgICAgICAgICdmYWNpbGl0eV9tYW5hZ2VyJzogJ0ZhY2lsaXR5IE1hbmFnZXInLFxuICAgICAgICAgICAgJ2FwcG9pbnRtZW50X21hbmFnZXInOiAnQXBwb2ludG1lbnRzJyxcbiAgICAgICAgICAgICdmb3Vya2l0ZXNfYW5hbHl0aWNzJzogJ1xcdTAxMzBcXHUwMGU3IGdcXHUwMGY2clxcdTAwZmNsZXInLFxuICAgICAgICAgICAgJ2dldF9kaXJlY3RfYXNzaWdubWVudCc6ICdEb1xcdTAxMWZydWRhbiBBdGFtYSBBbCcsXG4gICAgICAgICAgICAnZ2xvYmFsX2FkZHJlc3MnOiAnR2xvYmFsIEFkZHJlc3MnLFxuICAgICAgICAgICAgJ2hlYWx0aF9kYXNoYm9hcmQnOiAnU2FcXHUwMTFmbFxcdTAxMzFrIEtvbnRyb2wgUGFuZWxpJyxcbiAgICAgICAgICAgICdob21lJzogJ0FuYSBTYXlmYScsXG4gICAgICAgICAgICAnaW5zaWdodHNfYXBpJzogJ1xcdTAxMzBcXHUwMGU3IGdcXHUwMGY2clxcdTAwZmNsZXIgQVBJJyxcbiAgICAgICAgICAgICdsb2FkX3ZhbGlkYXRpb25fcmVwb3J0JzogJ1lcXHUwMGZjayBEb1xcdTAxMWZydWxhbWEgUmFwb3J1JyxcbiAgICAgICAgICAgICdsb2Fkcyc6ICdZXFx1MDBmY2tsZXInLFxuICAgICAgICAgICAgJ2xvY2F0aW9uX3Byb3ZpZGVycyc6ICdLb251bXUgU2FcXHUwMTFmbGF5XFx1MDEzMWNcXHUwMTMxbGFyXFx1MDEzMScsXG4gICAgICAgICAgICAnbWFzc191cGRhdGUnOiAnVG9wbHUgR1xcdTAwZmNuY2VsbGVtZScsXG4gICAgICAgICAgICAnbWFuYWdlX3N1YnNjcmlwdGlvbic6ICdBYm9uZWxpa2xlcmkgWVxcdTAwZjZuZXQnLFxuICAgICAgICAgICAgJ21hdGNoZXMnOiAnZVxcdTAxNWZsZVxcdTAxNWZtZWxlcicsXG4gICAgICAgICAgICAnbmV0d29yayc6ICdBXFx1MDExZicsXG4gICAgICAgICAgICAnbm90aWZpY2F0aW9uX3J1bGVzJzogJ0JpbGRpcmltIEt1cmFsbGFyXFx1MDEzMScsXG4gICAgICAgICAgICAnbm90aWZpY2F0aW9uX3J1bGVzXzIuMF9iZXRhJzogJ05vdGlmaWNhdGlvbiBSdWxlcyAoQkVUQSknLFxuICAgICAgICAgICAgJ29uX3RpbWVfcGVyZm9ybWFuY2UnOiAnWmFtYW5cXHUwMTMxbmRhIFBlcmZvcm1hbnMnLFxuICAgICAgICAgICAgJ2Jhc2ljX2FuYWx5dGljcyc6ICdBbmFseXRpY3MnLFxuICAgICAgICAgICAgJ3BlcmZvcm1hbmNlX2FuYWx5dGljcyc6ICdBZHZhbmNlZCBBbmFseXRpY3MnLFxuICAgICAgICAgICAgJ3BpbmdfdGVzdCc6ICdQaW5nIFRlc3RpJyxcbiAgICAgICAgICAgICdwb3J0cyc6ICdCYVxcdTAxMWZsYW50XFx1MDEzMSBub2t0YWxhclxcdTAxMzEnLFxuICAgICAgICAgICAgJ3JlcG9ydHMnOiAncmFwb3JsYXInLFxuICAgICAgICAgICAgJ3NlYXJjaF9ieV9yZWZlcmVuY2VfbnVtYmVyJzogJ1JlZmVyYW5zIG51bWFyYXPDhMKxbmEgZ8ODwrZyZSBhcmEnLFxuICAgICAgICAgICAgJ3NpbXVsYXRlX2xvY2F0aW9uJzogJ0tvbnVtIFNpbVxcdTAwZmNsYXN5b251JyxcbiAgICAgICAgICAgICdzdWJzY3JpcHRpb24nOiAnYWJvbmVsaWsnLFxuICAgICAgICAgICAgJ3RlbXBlcmF0dXJlX3Byb3ZpZGVycyc6ICdzXFx1MDEzMWNha2xcXHUwMTMxayBTYVxcdTAxMWZsYXlcXHUwMTMxY1xcdTAxMzFsYXJcXHUwMTMxJyxcbiAgICAgICAgICAgICd0ZW1wZXJhdHVyZV90cmFja2luZyc6ICdTXFx1MDEzMWNha2xcXHUwMTMxayBUYWtpcCcsXG4gICAgICAgICAgICAndG9vbHMnOiAnYXJhXFx1MDBlN2xhcicsXG4gICAgICAgICAgICAndHJhY2tpbmcnOiAnVGFraXAnLFxuICAgICAgICAgICAgJ29jZWFuX3RyYWNraW5nJzogJ09jZWFuIFRyYWNraW5nJyxcbiAgICAgICAgICAgICdhaXJfdHJhY2tpbmcnOiAnSGVhdnl3ZWlnaHQgQWlyIFRyYWNraW5nJyxcbiAgICAgICAgICAgICd0cmFja2luZ19jb25zaXN0ZW5jeSc6ICdGb3VuZGF0aW9ucycsXG4gICAgICAgICAgICAndXNlcnMnOiAnS3VsbGFuXFx1MDEzMWNcXHUwMTMxbGFyJyxcbiAgICAgICAgICAgICduZXR3b3JrX3Zpc2liaWxpdHknOiAnTmV0d29yayBWaXNpYmlsaXR5JyxcbiAgICAgICAgICAgICdtYW5hZ2VfbGljZW5zZSc6ICdNYW5hZ2UgTGljZW5zZXMnXG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiZXhwb3J0IGNvbnN0IHRyYW5zbGF0aW9ucyA9IHtcbiAgICAnaGVhZGVyJzoge1xuICAgICAgICAnYWNjb3VudCc6IHtcbiAgICAgICAgICAgICdoZWxwJzogJ0F5dWRhJyxcbiAgICAgICAgICAgICdzZXR0aW5ncyc6ICdBanVzdGVzJyxcbiAgICAgICAgICAgICdzaWduX291dCc6ICdEZXNjb25lY3RhcidcbiAgICAgICAgfSxcbiAgICAgICAgJ3VzZXInOiB7XG4gICAgICAgICAgICAnYWRkcmVzc19tYW5hZ2VyJzogJ0dlc3RvciBkZSBkaXJlY2Npb25lcycsXG4gICAgICAgICAgICAnYWRtaW4nOiAnQWRtaW5pc3RyYWRvcicsXG4gICAgICAgICAgICAnYW5hbHl0aWNzJzogJ0FuXFx1MDBlMWxpc2lzJyxcbiAgICAgICAgICAgICdhcHBsZXNzX21hbmFnZW1lbnQnOiAnR2VzdGlcXHUwMGYzbiBhcHAtbGVzcycsXG4gICAgICAgICAgICAnYmVuY2htYXJraW5nJzogJ0NvbXBhcmF0aXZhIGRlIG1lcmNhZG8nLFxuICAgICAgICAgICAgJ2JsYWNrbGlzdF9waG9uZXMnOiAnVGVsXFx1MDBlOWZvbm9zIGFwcC1sZXNzIGVuIGxpc3RhIG5lZ3JhJyxcbiAgICAgICAgICAgICdjYXJyaWVyX3Njb3JlY2FyZCc6ICdUYXJqZXRhIGRlIHB1bnR1YWNpb25lcyBkZSB0cmFuc3BvcnRpc3RhJyxcbiAgICAgICAgICAgICdjb21wYW5pZXMnOiAnRW1wcmVzYXMnLFxuICAgICAgICAgICAgJ2NyZWF0ZV9sb2FkJzogJ2NyZWFyIENhcmdhJyxcbiAgICAgICAgICAgICdjdXN0b21lcl9zY29yZWNhcmQnOiAnVGFyamV0YSBkZSBwdW50dWFjaW9uZXMgZGUgY2xpZW50ZScsXG4gICAgICAgICAgICAnY3VzdG9tZXJzJzogJ0NsaWVudGVzJyxcbiAgICAgICAgICAgICdkYXNoYm9hcmQnOiAnUGFuZWwgZGUgY29udHJvbCcsXG4gICAgICAgICAgICAnZXRhX3RocmVzaG9sZF9jb25maWd1cmF0aW9uJzogJ0V0YSBUaHJlc2hvbGQgQ29uZmlndXJhdGlvbicsXG4gICAgICAgICAgICAnZmFjaWxpdHlfbWFuYWdlcic6ICdGYWNpbGl0eSBNYW5hZ2VyJyxcbiAgICAgICAgICAgICdhcHBvaW50bWVudF9tYW5hZ2VyJzogJ0FwcG9pbnRtZW50cycsXG4gICAgICAgICAgICAnZm91cmtpdGVzX2FuYWx5dGljcyc6ICdDb25vY2ltaWVudG9zJyxcbiAgICAgICAgICAgICdnZXRfZGlyZWN0X2Fzc2lnbm1lbnQnOiAnT2J0ZW5lciBhc2lnbmFjaVxcdTAwZjNuIGRpcmVjdGEnLFxuICAgICAgICAgICAgJ2dsb2JhbF9hZGRyZXNzJzogJ0dsb2JhbCBBZGRyZXNzJyxcbiAgICAgICAgICAgICdoZWFsdGhfZGFzaGJvYXJkJzogJ1BhbmVsIGRlIGNvbnRyb2wgZGUgc2FsdWQnLFxuICAgICAgICAgICAgJ2hvbWUnOiAnSW5pY2lvJyxcbiAgICAgICAgICAgICdpbnNpZ2h0c19hcGknOiAnQ29ub2NpbWllbnRvcyBBUEknLFxuICAgICAgICAgICAgJ2xvYWRfdmFsaWRhdGlvbl9yZXBvcnQnOiAnSW5mb3JtZSBkZSB2YWxpZGFjaVxcdTAwZjNuIGRlIGNhcmdhJyxcbiAgICAgICAgICAgICdsb2Fkcyc6ICdDYXJnYXMnLFxuICAgICAgICAgICAgJ2xvY2F0aW9uX3Byb3ZpZGVycyc6ICdQcm92ZWVkb3JlcyBkZSB1YmljYWNpXFx1MDBmM24nLFxuICAgICAgICAgICAgJ21hc3NfdXBkYXRlJzogJ0FjdHVhbGl6YWNpw4PCs24gZW4gbWFzYScsXG4gICAgICAgICAgICAnbWFuYWdlX3N1YnNjcmlwdGlvbic6ICdHZXN0aW9uYXIgc3VzY3JpcGNpb25lcycsXG4gICAgICAgICAgICAnbWF0Y2hlcyc6ICdjb2luY2lkZW5jaWFzJyxcbiAgICAgICAgICAgICduZXR3b3JrJzogJ1JlZCcsXG4gICAgICAgICAgICAnbm90aWZpY2F0aW9uX3J1bGVzJzogJ05vcm1hcyBkZSBub3RpZmljYWNpXFx1MDBmM24nLFxuICAgICAgICAgICAgJ25vdGlmaWNhdGlvbl9ydWxlc18yLjBfYmV0YSc6ICdOb3RpZmljYXRpb24gUnVsZXMgKEJFVEEpJyxcbiAgICAgICAgICAgICdvbl90aW1lX3BlcmZvcm1hbmNlJzogJ1JlbmRpbWllbnRvIHB1bnR1YWwnLFxuICAgICAgICAgICAgJ2Jhc2ljX2FuYWx5dGljcyc6ICdBbmFseXRpY3MnLFxuICAgICAgICAgICAgJ3BlcmZvcm1hbmNlX2FuYWx5dGljcyc6ICdBZHZhbmNlZCBBbmFseXRpY3MnLFxuICAgICAgICAgICAgJ3BpbmdfdGVzdCc6ICdQcnVlYmEgZGUgcGluZycsXG4gICAgICAgICAgICAncG9ydHMnOiAnUHVlcnRvcycsXG4gICAgICAgICAgICAncmVwb3J0cyc6ICdpbmZvcm1lcycsXG4gICAgICAgICAgICAnc2VhcmNoX2J5X3JlZmVyZW5jZV9udW1iZXInOiAnQnVzY2FyIHBvciBuw4PCum1lcm8gZGUgcmVmZXJlbmNpYScsXG4gICAgICAgICAgICAnc2ltdWxhdGVfbG9jYXRpb24nOiAnU2ltdWxhciB1YmljYWNpXFx1MDBmM24nLFxuICAgICAgICAgICAgJ3N1YnNjcmlwdGlvbic6ICdzdXNjcmlwY2lcXHUwMGYzbicsXG4gICAgICAgICAgICAndGVtcGVyYXR1cmVfcHJvdmlkZXJzJzogJ3Byb3ZlZWRvcmVzIGRlIHRlbXBlcmF0dXJhJyxcbiAgICAgICAgICAgICd0ZW1wZXJhdHVyZV90cmFja2luZyc6ICdTZWd1aW1pZW50byBkZSB0ZW1wZXJhdHVyYScsXG4gICAgICAgICAgICAndG9vbHMnOiAnaGVycmFtaWVudGFzJyxcbiAgICAgICAgICAgICd0cmFja2luZyc6ICdTZWd1aW1pZW50bycsXG4gICAgICAgICAgICAnb2NlYW5fdHJhY2tpbmcnOiAnT2NlYW4gVHJhY2tpbmcnLFxuICAgICAgICAgICAgJ2Fpcl90cmFja2luZyc6ICdIZWF2eXdlaWdodCBBaXIgVHJhY2tpbmcnLFxuICAgICAgICAgICAgJ3RyYWNraW5nX2NvbnNpc3RlbmN5JzogJ0ZvdW5kYXRpb25zJyxcbiAgICAgICAgICAgICd1c2Vycyc6ICdVc3VhcmlvcycsXG4gICAgICAgICAgICAnbmV0d29ya192aXNpYmlsaXR5JzogJ05ldHdvcmsgVmlzaWJpbGl0eScsXG4gICAgICAgICAgICAnbWFuYWdlX2xpY2Vuc2UnOiAnTWFuYWdlIExpY2Vuc2VzJ1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IExvY2FsU3RvcmFnZVNlcnZpY2UgfSBmcm9tICduZ3gtd2Vic3RvcmFnZSc7XG5cbmltcG9ydCB7IEhlYWRlckNvbmZpZyB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbnN0YW50cy9oZWFkZXItY29uZmlnLmNvbnN0YW50JztcbmltcG9ydCB7IFNlY3VyaXR5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NlcnZpY2VzL3NlY3VyaXR5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tcGFueVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9jb21wYW55LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tcGFueUNvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvY29tcGFueS1jb250ZXh0LnNlcnZpY2UnO1xuaW1wb3J0IHsgTmF2UGVybWlzc2lvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9uYXYtcGVybWlzc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ0hlbHBlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9oZWxwZXJzL2NvbmZpZy5oZWxwZXJcIjtcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQgeyBGZWF0dXJlRmxhZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9mZWF0dXJlLWZsYWcuc2VydmljZSc7XG5pbXBvcnQgeyB0cmFuc2xhdGlvbnMgYXMgZW5Mb2NhbGUgfSBmcm9tICcuLi8uLi8uLi8uLi9jb25zdGFudHMvbG9jYWxlcy9lbic7XG5pbXBvcnQgeyB0cmFuc2xhdGlvbnMgYXMgcHRMb2NhbGUgfSBmcm9tICcuLi8uLi8uLi8uLi9jb25zdGFudHMvbG9jYWxlcy9wdCc7XG5pbXBvcnQgeyB0cmFuc2xhdGlvbnMgYXMgZnJDQUxvY2FsZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbnN0YW50cy9sb2NhbGVzL2ZyLUNBJztcbmltcG9ydCB7IHRyYW5zbGF0aW9ucyBhcyB0ckxvY2FsZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbnN0YW50cy9sb2NhbGVzL3RyJztcbmltcG9ydCB7IHRyYW5zbGF0aW9ucyBhcyBlc0xvY2FsZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbnN0YW50cy9sb2NhbGVzL2VzJztcblxuZGVjbGFyZSB2YXIgd2luZG93OmFueVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdmb3Vya2l0ZXMtbGVnYWN5LWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9oZWFkZXIuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveXtcbiAgQElucHV0KCdvcmlnaW4nKSBvcmlnaW46IHN0cmluZztcblxuICBwdWJsaWMgaGVhZGVyQ29uZmlnID0gSGVhZGVyQ29uZmlnO1xuICBwdWJsaWMgY29tcGFueVNlYXJjaDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgcHVibGljIGNvbXBhbnlTZWFyY2hSZXN1bHRzOiBhbnk7XG4gIHB1YmxpYyBpc0NvbnRleHRTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBoZWFkZXJTZXJ2aWNlOiBOYXZQZXJtaXNzaW9uU2VydmljZSxcbiAgICBwcml2YXRlIGNvbXBhbnlTZXJ2aWNlOiBDb21wYW55U2VydmljZSxcbiAgICBwcml2YXRlIGNvbXBhbnlDb250ZXh0U2VydmljZTogQ29tcGFueUNvbnRleHRTZXJ2aWNlLFxuICAgIHByaXZhdGUgc2VjdXJpdHk6IFNlY3VyaXR5U2VydmljZSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgcHVibGljIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSxcbiAgICBwcml2YXRlIGZlYXR1cmVGbGFnOiBGZWF0dXJlRmxhZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2U6IExvY2FsU3RvcmFnZVNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy50cmFuc2xhdGUudXNlKHRoaXMubG9jYWxTdG9yYWdlLnJldHJpZXZlKCdOR19UUkFOU0xBVEVfTEFOR19LRVknKSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRDb21wYW55Q29udGV4dCgpXG4gICAgdGhpcy5pbml0QWRhbWFudGl1bUhvb2soKVxuICAgIHRoaXMudHJhbnNsYXRlLmdldCgnaW5pdCcpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnRyYW5zbGF0ZS5zZXRUcmFuc2xhdGlvbignZW4nLCBlbkxvY2FsZSwgdHJ1ZSk7XG4gICAgICB0aGlzLnRyYW5zbGF0ZS5zZXRUcmFuc2xhdGlvbigncHQnLCBwdExvY2FsZSwgdHJ1ZSk7XG4gICAgICB0aGlzLnRyYW5zbGF0ZS5zZXRUcmFuc2xhdGlvbignZXMnLCBlc0xvY2FsZSwgdHJ1ZSk7XG4gICAgICB0aGlzLnRyYW5zbGF0ZS5zZXRUcmFuc2xhdGlvbignZnInLCBmckNBTG9jYWxlLCB0cnVlKTtcbiAgICAgIHRoaXMudHJhbnNsYXRlLnNldFRyYW5zbGF0aW9uKCd0cicsIHRyTG9jYWxlLCB0cnVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveUFkYW1hbnRpdW1Ib29rKClcbiAgfVxuXG4gIGluaXRDb21wYW55Q29udGV4dCgpe1xuICAgIGxldCBjb21wYW55Q29udGV4dCA9IHRoaXMuY29tcGFueUNvbnRleHRTZXJ2aWNlLmdldENvbXBhbnlDb250ZXh0TmFtZSgpO1xuICAgIHRoaXMuY29tcGFueVNlYXJjaC5zZXRWYWx1ZShjb21wYW55Q29udGV4dCk7XG4gICAgdGhpcy5pc0NvbnRleHRTZWxlY3RlZCA9IChjb21wYW55Q29udGV4dCAmJiBjb21wYW55Q29udGV4dC5sZW5ndGggPiAwKTtcbiAgICB0aGlzLmNvbXBhbnlTZWFyY2gudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWUpID0+IHRoaXMub25Db21wYW55Q29udGV4dENoYW5nZSh2YWx1ZSkpO1xuICB9XG5cbiAgZmV0Y2hDb21wYW55RGVzYyhjb21wYW55KSB7XG4gICAgcmV0dXJuIGNvbXBhbnkuZGVzY3JpcHRpb247XG4gIH1cblxuICBnZXRNZW51SXRlbUJ5SWQoaWQsIG1lbnVUeXBlKSB7XG4gICAgZm9yIChsZXQgbWVudUluZGV4ID0gMDsgbWVudUluZGV4IDwgdGhpcy5oZWFkZXJDb25maWdbbWVudVR5cGVdLmxlbmd0aDsgbWVudUluZGV4KyspIHtcbiAgICAgIGNvbnN0IG1lbnUgPSB0aGlzLmhlYWRlckNvbmZpZ1ttZW51VHlwZV1bbWVudUluZGV4XTtcbiAgICAgIGlmKG1lbnUuaWQgPT09IGlkKSB7XG4gICAgICAgIHJldHVybiBtZW51O1xuICAgICAgfSBlbHNlIGlmKG1lbnUuc3Vicykge1xuICAgICAgICBmb3IgKGxldCBzdWJNZW51SW5kZXggPSAwOyBzdWJNZW51SW5kZXggPCBtZW51LnN1YnMubGVuZ3RoOyBzdWJNZW51SW5kZXgrKykge1xuICAgICAgICAgIGNvbnN0IHN1Ym1lbnUgPSBtZW51LnN1YnNbc3ViTWVudUluZGV4XTtcbiAgICAgICAgICBpZihzdWJtZW51LmlkID09PSBpZCkge1xuICAgICAgICAgICAgcmV0dXJuIHN1Ym1lbnU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ29Ub01lbnVCeUlkKGlkLCB0eXBlKSB7XG4gICAgY29uc3QgbWVudU9wdGlvbiA9IHRoaXMuZ2V0TWVudUl0ZW1CeUlkKGlkLCB0eXBlKTtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuaGVhZGVyU2VydmljZS5nZXRNZW51VXJsKG1lbnVPcHRpb24sIHRoaXMub3JpZ2luKTtcbiAgICB0aGlzLnNldExvY2F0aW9uSHJlZih2YWx1ZSk7XG4gIH1cblxuICBzZXRMb2NhdGlvbkhyZWYodmFsdWUpIHtcbiAgICB0aGlzLmRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB2YWx1ZTtcbiAgfVxuXG4gIHNldENvbXBhbnlDb250ZXh0KGNvbXBhbnkpIHtcbiAgICB0aGlzLmNvbXBhbnlTZWFyY2guc2V0VmFsdWUoKChjb21wYW55KSA/IGNvbXBhbnkuZGVzY3JpcHRpb24gOiAnJyksIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICB0aGlzLmNvbXBhbnlDb250ZXh0U2VydmljZS5zZXRDb21wYW55Q29udGV4dChjb21wYW55KTtcbiAgfVxuXG4gIG9uQ29tcGFueUNvbnRleHRDaGFuZ2Uoc2VhcmNoU3RyaW5nKSB7XG4gICAgaWYodGhpcy5pc0NvbnRleHRTZWxlY3RlZCkge1xuICAgICAgdGhpcy5vbkNvbXBhbnlDb250ZXh0UmVzZXQobnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYoIXNlYXJjaFN0cmluZyB8fCBzZWFyY2hTdHJpbmcubGVuZ3RoIDwgMykge1xuICAgICAgdGhpcy5jb21wYW55U2VhcmNoUmVzdWx0cyA9IFtdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29tcGFueVNlcnZpY2UuZ2V0Q29tcGFuaWVzQXV0b2NvbXBsZXRlKHNlYXJjaFN0cmluZylcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuY29tcGFueVNlYXJjaFJlc3VsdHMgPSBkYXRhIHx8IFtdO1xuICAgICAgfSk7XG4gIH1cblxuICBvbkNvbXBhbnlDb250ZXh0UmVzZXQoZXZlbnQpe1xuICAgIHZhciBfaXNDb250ZXh0U2VsZWN0ZWQgPSB0aGlzLmlzQ29udGV4dFNlbGVjdGVkO1xuICAgIHRoaXMuaXNDb250ZXh0U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNvbXBhbnlTZWFyY2hSZXN1bHRzID0gW107XG4gICAgdGhpcy5zZXRDb21wYW55Q29udGV4dChudWxsKTtcbiAgICAvL0ZPUiBTVVBFUkFETUlOIEVYUElSRSBMT0FEIEZJTFRFUlMgRlJPTSBMT0NBTCBTVE9SQUdFIC0gV0hFTiBDT01QQU5ZIENPTlRFWFQgSVMgUkVTRVRcbiAgICB0aGlzLmxvY2FsU3RvcmFnZS5jbGVhcigndGZsb2FkLmZpbHRlcnMnKTtcbiAgICBpZihfaXNDb250ZXh0U2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuZ29Ub01lbnVCeUlkKCdjb21wYW5pZXMnLCAndXNlck1lbnUnKTtcbiAgICB9XG4gIH1cblxuICBvbkNvbXBhbnlDb250ZXh0U2VsZWN0KGV2ZW50KSB7XG4gICAgdGhpcy5pc0NvbnRleHRTZWxlY3RlZCA9IHRydWU7XG4gICAgdGhpcy5zZXRDb21wYW55Q29udGV4dChldmVudC5vcHRpb24udmFsdWUpO1xuICAgIHRoaXMuZ29Ub01lbnVCeUlkKCdsb2FkcycsICd1c2VyTWVudScpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0QWRhbWFudGl1bUhvb2soKSB7XG4gICAgd2luZG93LkZLVU0gPSB3aW5kb3cuRktVTSB8fCB7fTtcbiAgICB3aW5kb3cuRktVTS51cGRhdGVVc2VyID0gdGhpcy5oZWFkZXJTZXJ2aWNlLnVwZGF0ZVVzZXIuYmluZCh0aGlzLmhlYWRlclNlcnZpY2UpO1xuICAgIHdpbmRvdy5GS1VNLnNldEVudmlyb25tZW50ID0gQ29uZmlnSGVscGVyLnNldEVudmlyb25tZW50LmJpbmQoQ29uZmlnSGVscGVyKTtcbiAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJsb2FkLWRvbmVcIiwge30pO1xuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveUFkYW1hbnRpdW1Ib29rKCl7XG4gICAgZGVsZXRlIHdpbmRvdy5GS1VNO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgSW5qZWN0aW9uVG9rZW4sIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGVNb2R1bGUsIE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLyogTGVnYWN5IEhlYWRlciAqL1xuaW1wb3J0IHsgQWNjb3VudFN1Yk1lbnVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYWNjb3VudC1zdWItbWVudS9hY2NvdW50LXN1Yi1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2VyU3ViTWVudUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy91c2VyLXN1Yi1tZW51L3VzZXItc3ViLW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IExvYWRTZWFyY2hlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2FkLXNlYXJjaGVyL2xvYWQtc2VhcmNoZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEhlYWRlckNvbXBvbmVudCBhcyBMZWdhY3lIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi8uLi8uLi9zaGFyZWQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcblx0ZGVjbGFyYXRpb25zOiBbXG5cdFx0TG9hZFNlYXJjaGVyQ29tcG9uZW50LFxuXHRcdEFjY291bnRTdWJNZW51Q29tcG9uZW50LFxuXHRcdFVzZXJTdWJNZW51Q29tcG9uZW50LFxuICAgIExlZ2FjeUhlYWRlckNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOltcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBTaGFyZWRNb2R1bGUuZm9yUm9vdCgpLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSwgXG4gICAgTWF0SW5wdXRNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIExlZ2FjeUhlYWRlckNvbXBvbmVudFxuICBdXG59KVxuXG5leHBvcnQgY2xhc3MgTGVnYWN5SGVhZGVyTW9kdWxlIHt9OyIsImltcG9ydCB7IE5nTW9kdWxlLCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2NhdGlvblByb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbG9jYXRpb24tcHJvdmlkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLy4uLy4uL3NoYXJlZC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuXHRkZWNsYXJhdGlvbnM6IFtcblx0XHRcbiAgXSxcbiAgaW1wb3J0czpbXG4gICAgU2hhcmVkTW9kdWxlLmZvclJvb3QoKVxuICBdLFxuICBleHBvcnRzOiBbXG4gIFxuICBdLFxuICBwcm92aWRlcnM6W1xuICAgIExvY2F0aW9uUHJvdmlkZXJTZXJ2aWNlXG4gIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBMb2NhdGlvblByb3ZpZGVyTW9kdWxlIHt9OyIsImltcG9ydCB7IE9ic2VydmFibGUgLCAgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuZXhwb3J0IGNsYXNzIEJvb3RDb250cm9sbGVyIHtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEJvb3RDb250cm9sbGVyID0gbnVsbDtcbiAgcHJpdmF0ZSBfcmVib290OiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSByZWJvb3QkID0gdGhpcy5fcmVib290LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHN0YXRpYyBnZXRib290Q29udHJvbCgpIHtcbiAgICBpZiAoIUJvb3RDb250cm9sbGVyLmluc3RhbmNlKSB7XG4gICAgICBCb290Q29udHJvbGxlci5pbnN0YW5jZSA9IG5ldyBCb290Q29udHJvbGxlcigpO1xuICAgIH1cbiAgICByZXR1cm4gQm9vdENvbnRyb2xsZXIuaW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgd2F0Y2hSZWJvb3QoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVib290JDtcbiAgfVxuXG4gIHB1YmxpYyByZXN0YXJ0KCkge1xuICAgIHRoaXMuX3JlYm9vdC5uZXh0KHRydWUpO1xuICB9XG59XG4iLCIvKlxuICogUHVibGljIEFQSSBTdXJmYWNlIG9mIGZyb250ZW5kLWNsaWVudC1zaGFyZWQtbW9kdWxlXG4gKi9cblxuaW1wb3J0IHsgVGVzdEJlZCwgQ29tcG9uZW50Rml4dHVyZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvdGVzdGluZyc7XG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLy8gTW9kdWxlXG5leHBvcnQgKiBmcm9tICcuL2xpYi9zaGFyZWQubW9kdWxlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21vZHVsZXMvbGVnYWN5LWhlYWRlci9sZWdhY3ktaGVhZGVyLm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9tb2R1bGVzL2xvY2F0aW9uLXByb3ZpZGVyL2xvY2F0aW9uLXByb3ZpZGVyLm1vZHVsZSdcblxuLy8gU2VydmljZXNcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlcnZpY2VzL2NvbXBhbnktY29udGV4dC5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlcnZpY2VzL2NvbXBhbnkuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9zZXJ2aWNlcy9kYXRhLXByZXNlbnRlci5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlcnZpY2VzL3NlY3VyaXR5LnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvc2VydmljZXMvc3RvcmFnZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlcnZpY2VzL2dlby5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL21vZHVsZXMvbG9jYXRpb24tcHJvdmlkZXIvc2VydmljZXMvbG9jYXRpb24tcHJvdmlkZXIuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9zZXJ2aWNlcy91c2VyLXJlc291cmNlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvc2VydmljZXMvbmF2LXBlcm1pc3Npb24uc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9zZXJ2aWNlcy9mZWF0dXJlLWZsYWcuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9zZXJ2aWNlcy9hbGVydC5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlcnZpY2VzL2xvYWRlci5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlcnZpY2VzL2xpY2Vuc2luZy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYm9vdC9ib290LmNvbnRyb2wnO1xuXG5cbi8vIENvbXBvbmVudHNcbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvbXBvbmVudHMvY29uZmlybWF0aW9uLWRpYWxvZy9jb25maXJtYXRpb24tZGlhbG9nLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9jb21wb25lbnRzL2Z1bGwtcGFnZS1tb2RhbC9mdWxsLXBhZ2UtbW9kYWwuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvbXBvbmVudHMvZmstZGlhbG9nL2ZrLWRpYWxvZy5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvY29tcG9uZW50cy9may1zZWxlY3QvZmstc2VsZWN0LmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2xpYi9jb21wb25lbnRzL2ZrLXNlbGVjdC1tdWx0aXBsZS9may1zZWxlY3QtbXVsdGlwbGUuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vbGliL2NvbXBvbmVudHMvZmstc2VsZWN0LWdyb3VwL2ZrLXNlbGVjdC1ncm91cC5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvY29tcG9uZW50cy9may1kYXRlLXBpY2tlci9may1kYXRlLXBpY2tlci5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvY29tcG9uZW50cy9may1zaWRlLW5hdi1wYW5lbC9may1zaWRlLW5hdi1wYW5lbC5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvY29tcG9uZW50cy9jb21wb25lbnRzLWljb24vY29tcG9uZW50cy1pY29uLmNvbXBvbmVudCc7XG5cbi8vIFRlc3QgaGVscGVyXG5leHBvcnQgY2xhc3MgVW5pdFRlc3RIZWxwZXIge1xuICBwdWJsaWMgc3RhdGljIHRlc3RTZWxlY3RvcihmaXh0dXJlLCBpZCl7XG4gICAgcmV0dXJuIGZpeHR1cmUubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtdGVzdC1pZD1cIitpZCtcIl1cIilcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgbWFrZUZpeHR1cmUoQ29tcG9uZW50KTogQ29tcG9uZW50Rml4dHVyZTxhbnk+IHtcbiAgICByZXR1cm4gVGVzdEJlZC5jcmVhdGVDb21wb25lbnQoQ29tcG9uZW50KVxuICB9XG59Il0sIm5hbWVzIjpbIl8uaXNPYmplY3QiLCJfLmlzQXJyYXkiLCJfLmlzTnVtYmVyIiwiSW5qZWN0YWJsZSIsIkxvY2FsU3RvcmFnZVNlcnZpY2UiLCJDb29raWVTZXJ2aWNlIiwiTmdNb2R1bGUiLCJOZzJXZWJzdG9yYWdlIiwiaHR0cCIsIkh0dHBDbGllbnQiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiXy5jb250YWlucyIsInRzbGliXzEuX19kZWNvcmF0ZSIsIlNlc3Npb25TdG9yYWdlIiwiTG9jYWxTdG9yYWdlIiwiXy5leHRlbmQiLCJfLmlzRW1wdHkiLCJfLmludGVyc2VjdGlvbiIsIkluamVjdCIsIkRPQ1VNRU5UIiwiZGVsZWdhdGUiLCJUb2FzdHJTZXJ2aWNlIiwiVHJhbnNsYXRlU2VydmljZSIsInBsYWluVG9DbGFzcyIsIlN1YmplY3QiLCJjYXRjaEVycm9yIiwib2JzZXJ2YWJsZVRocm93RXJyb3IiLCJmaW5hbGl6ZSIsIkh0dHBQYXJhbXMiLCJDb21wb25lbnQiLCJNYXREaWFsb2dSZWYiLCJNQVRfRElBTE9HX0RBVEEiLCJFdmVudEVtaXR0ZXIiLCJIb3N0IiwiZm9yd2FyZFJlZiIsIkNoYW5nZURldGVjdG9yUmVmIiwiSW5wdXQiLCJPdXRwdXQiLCJDb250ZW50Q2hpbGRyZW4iLCJDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSIsIkNvbXBvbmVudFBvcnRhbCIsIk5HX1ZBTFVFX0FDQ0VTU09SIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJ0cmlnZ2VyIiwic3RhdGUiLCJzdHlsZSIsInRyYW5zaXRpb24iLCJhbmltYXRlIiwiRG9tSGFuZGxlciIsIlZpZXdDaGlsZCIsIkNhbGVuZGFyIiwiRGlyZWN0aXZlIiwiTmdDb250cm9sIiwiRWxlbWVudFJlZiIsIl8uZmlyc3QiLCJfLmxhc3QiLCJfLmlzUmVnRXhwIiwiXy5zaXplIiwiSG9zdExpc3RlbmVyIiwib2YiLCJtYXAiLCJfLm1hcCIsIkRvbVNhbml0aXplciIsIlBpcGUiLCJOZ1NlbGVjdENvbXBvbmVudCIsInJvdXRlciIsIl8uaXNFcXVhbCIsIk5hdmlnYXRpb25FbmQiLCJSb3V0ZXIiLCJIb3N0QmluZGluZyIsIkluamVjdGlvblRva2VuIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiTWF0RGlhbG9nTW9kdWxlIiwiVHJhbnNsYXRlTW9kdWxlIiwiQ2FsZW5kYXJNb2R1bGUiLCJUb2FzdHJNb2R1bGUiLCJQb3J0YWxNb2R1bGUiLCJOZ1NlbGVjdE1vZHVsZSIsIlJvdXRlck1vZHVsZSIsIlRyYW5zbGF0ZVBpcGUiLCJDVVNUT01fRUxFTUVOVFNfU0NIRU1BIiwiSFRUUF9JTlRFUkNFUFRPUlMiLCJGb3JtQ29udHJvbCIsInRyYW5zbGF0aW9ucyIsImVuTG9jYWxlIiwicHRMb2NhbGUiLCJlc0xvY2FsZSIsImZyQ0FMb2NhbGUiLCJ0ckxvY2FsZSIsIkxlZ2FjeUhlYWRlckNvbXBvbmVudCIsIk1hdEF1dG9jb21wbGV0ZU1vZHVsZSIsIk1hdElucHV0TW9kdWxlIiwiVGVzdEJlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7UUFPQyw0QkFBWSxNQUEwQjtZQUNyQyxJQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsV0FBVyxFQUFDO2dCQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUE7YUFDckM7U0FDRDtRQUNGLHlCQUFDO0lBQUQsQ0FBQzs7Ozs7O0FDWkQ7UUFLTSxNQUFNLEdBQUcsT0FBTztBQUV0QjtRQVNFLHdCQUNVLFlBQWlDLEVBQ2pDLFdBQTBCO1lBRDFCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtZQUNqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBZTtZQVQ3QixpQkFBWSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7WUFDeEMsZ0JBQVcsR0FBVyxjQUFjLENBQUE7WUFDcEMsbUJBQWMsR0FBVyxNQUFNLENBQUE7WUFDL0IsaUJBQVksR0FBVyxHQUFHLENBQUM7WUFDMUIsNEJBQXVCLEdBQVksSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFBO1lBQ3pFLFdBQU0sR0FBVSxJQUFJLENBQUE7U0FNM0I7Ozs7OztRQUVELDhCQUFLOzs7OztZQUFMLFVBQU0sR0FBRyxFQUFFLEtBQUs7Z0JBQ2QsSUFBRyxDQUFDLEtBQUssRUFBQztvQkFDUixLQUFLLEdBQUcsSUFBSSxDQUFBO2lCQUNiO2dCQUNELElBQUcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLElB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

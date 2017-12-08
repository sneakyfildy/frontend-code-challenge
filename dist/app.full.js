/*! frontend_interview_test Application build @ 1.0.0 */
webpackJsonp([ 0 ], [ , function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var angular = __webpack_require__(0);
    var AdsListController_1 = __webpack_require__(3);
    angular.module("app", []).component("adsList", {
        template: __webpack_require__(4),
        controller: AdsListController_1.default
    });
    angular.bootstrap(document, [ "app" ]);
}, , function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var angular = __webpack_require__(0);
    var AdsListController = function($http, $q) {
        angular.extend(this, {
            apiUrl: "api/get",
            $onInit: function() {
                $http({
                    method: "GET",
                    url: this.apiUrl
                }).then(this.onSuccessGet.bind(this), this.onErrorGet.bind(this));
            },
            setItems: function(items) {
                this.data = items;
                this.items = this.preprocessItems(this.data.slice(0, 10));
                console.log(this.items[0]);
            },
            preprocessItems: function(items) {
                var processedItems;
                processedItems = [];
                var me = this;
                items.forEach(function(item) {
                    var _titlePic;
                    me.eachKey(item.advertisementAssets, function(name, value) {
                        if (value.titlePicture) {
                            _titlePic = value;
                            return false;
                        }
                    });
                    item._titlePic = _titlePic;
                    processedItems.push(item);
                });
                return processedItems;
            },
            onSuccessGet: function(response) {
                this.setItems(response.data.data);
            },
            onErrorGet: function(response) {},
            eachKey: function(object, callbackFn, scope) {
                for (var property in object) {
                    if (object.hasOwnProperty(property) && callbackFn.call(scope || object, property, object[property], object) === false) {
                        return;
                    }
                }
            }
        });
    };
    exports.default = AdsListController;
}, function(module, exports) {
    module.exports = '<div class="list-container" ng-cloak>\n    <div class="ad-container" ng-repeat="item in $ctrl.items">\n        <div class="ad">\n            <div class="upper">\n                <div class="type">{{item.purpose ? \'Mieten\' : \'Kaufen\'}}</div>\n                <div class="pic">\n                    \x3c!-- this looks extremely weird to lookup for a title picture on client  --\x3e\n                    \x3c!-- backend must serve in directly (easily reachable)  --\x3e\n                    <img class="thumbnail" alt="preview"\n                         ng-src="{{item._titlePic.advertisementThumbnails.inventory_m.url}}"/>\n                </div>\n            </div>\n            <div class="middle">\n                <div class="desc">{{item.title}}</div>\n                <div class="address" ng-hide="!item.userWishes.visibleAddress">\n                    {{item.realestateSummary.address.postalCode}} {{item.realestateSummary.address.city}} / {{item.realestateSummary.address.street}}\n                </div>\n            </div>\n            <div class="bottom">\n                <div class="price">\n                    {{item.purpose ? item.advertisementPrice.baseRent : item.advertisementPrice.sellPrice}} &nbsp;€\n                </div>\n\n                <div class="rooms-and-size">\n                    <div class="rooms">\n                        \x3c!-- zimmer <> rooms, I dunno, it shows possibilities if needed--\x3e\n                        {{item.realestateSummary.numberOfRooms}} room{{item.realestateSummary.numberOfRooms > 1 ? \'s\' : \'\'}}\n                    </div>\n                    <span class="delimiter"></span>\n                    <div class="size">ab {{Math.round(item.realestateSummary.space)}}m <sup>2</sup></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';
} ], [ 1 ]);
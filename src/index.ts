import * as angular from 'angular';

angular.module('app', [])
    .component('adsList', {
        template: require('./templates/ads-list.html'),
        controller: function($http, $q){
            angular.extend(this, {
                //apiUrl: 'https://api.mcmakler.de/v1/advertisements',
                apiUrl: 'api/get',
                $onInit: function() {
                    $http({
                        method: "GET",
                        url: this.apiUrl
                    }).then(
                        this.onSuccessGet.bind(this),
                        this.onErrorGet.bind(this));
                },
                setItems: function(items: object[]) {
                    this.data =  items;
                    this.items =  this.preprocessItems(this.data.slice(0, 10));
                    console.log(this.items[0])
                },
                preprocessItems: function(items: any) {
                    var processedItems:object[];
                    processedItems = [];
                    // I was REALLY pissed doing this crap :[
                    var me = this;
                    items.forEach(function(item:any) {
                        var _titlePic:any;
                        me.eachKey(item.advertisementAssets, function(name:any, value: any){
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
                onSuccessGet: function(response:any) {
                    this.setItems(response.data.data);
                },
                onErrorGet: function(response:any) {
                },
                eachKey: function (object:any, callbackFn:any, scope:any){
                    for (var property in object) {
                        if (object.hasOwnProperty(property) && callbackFn.call(scope || object, property, object[property], object) === false) {
                            return;
                        }
                    }
                }
            });
        }
    });


angular.bootstrap(document, ['app']);
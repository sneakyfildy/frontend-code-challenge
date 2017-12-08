import * as angular from 'angular';
import AdsListController from './controllers/AdsListController';

angular.module('app', [])
    .component('adsList', {
        template: require('./templates/ads-list.html'),
        controller: AdsListController
    });


angular.bootstrap(document, ['app']);
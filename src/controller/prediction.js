      'use strict';

/**
 * @ngdoc controller
 * @name myApp.controller:WeatherController
 *
 * @description
 * This controller send and http request and retrieves weather data from REST API.
   Sets values for plotting weather data.
 */
    angular.module('predictApp', ['nvd3'])
      .controller('PredController', function($scope, $http) {
        $scope.$watch('search', function() {

          $http.get("https://api.mlab.com/api/1/databases/energyx/collections/energydata_2016?&apiKey=6JzRAzvdeqyLKAfQAqMOsLYLvvIdJG6A")
            .then(function(response) {
              $scope.items = response.data;
            });
        });


         /**
       * @ngdoc method
       * @name fetch
       * @methodOf myApp.controller:WeatherController
       * @description
       * This method will retrieve weather data from REST API as https response and assign to local variable.
       *

      */
        function fetch() {
          $http.get("https://api.mlab.com/api/1/databases/energyx/collections/energydata_2016?&apiKey=6JzRAzvdeqyLKAfQAqMOsLYLvvIdJG6A")
            .then(function(response) {
              $scope.items = response.data;
            });



        }

      });


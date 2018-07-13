      'use strict';

/**
 * @ngdoc controller
 * @name myApp.controller:WeatherController
 *
 * @description
 * This controller send and http request and retrieves weather data from REST API.
   Sets values for plotting weather data.
 */
    angular.module('myApp', ['angularUtils.directives.dirPagination','nvd3'])
      .controller('WeatherController', function($scope, $http) {
        $scope.$watch('search', function() {
          fetch();
        });

         /*
          @ngdoc variable
          @name search
          Sets default value for years dropdown
        */
        $scope.search = "2012";

           /*
          @ngdoc variable
          @name years
          Sets the year dropdown list
        */
        $scope.years = ["2012", "2013", "2014", "2015", "2016"];


         /**
       * @ngdoc method
       * @name fetch
       * @methodOf myApp.controller:WeatherController
       * @description
       * This method will retrieve weather data from REST API as https response and assign to local variable.
       *

      */
        function fetch() {
          $http.get("https://api.mlab.com/api/1/databases/energyx/collections/weatherdata_" + $scope.search + "?&apiKey=6JzRAzvdeqyLKAfQAqMOsLYLvvIdJG6A")
            .then(function(response) {
              $scope.details = response.data;
            });

               $http.get("https://api.mlab.com/api/1/databases/energyx/collections/weatherdata_average_" + $scope.search + "?&apiKey=6JzRAzvdeqyLKAfQAqMOsLYLvvIdJG6A")
            .then(function(response1) {
            $scope.weatherdata = [
               { key: "Cumulative Return",

               values: response1.data
               }]
            }); 

        }


         /*
          @ngdoc variable
          @name tempoptions
          Sets plotting options like the scale and values for temperature.Format the values if required
        */
        $scope.tempoptions = {
                chart: {
                    type: 'discreteBarChart',
                    height: 350,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 75
                    },
                    x: function(d){return d.month;},
                    y: function(d){return d.data.tempAvg;},
                    showValues: true,
                    valueFormat: function(d){
                         return d.toFixed(2);
                    },
                    duration: 450,
                    xAxis: {
                        axisLabel: 'Month (Jan-Dec)'
                    },
                    yAxis: {
                        axisLabel: 'Average Temperature (℉)',
                        axisLabelDistance: 5
                    }
                }
            };

                 /*
          @ngdoc variable
          @name humoptions
          Sets plotting options like the scale and values for humidity.Format the values if required
        */
                $scope.humoptions = {
                chart: {
                    type: 'discreteBarChart',
                    height: 350,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 75
                    },
                    x: function(d){return d.month;},
                    y: function(d){return d.data.relHumAvg;},
                    showValues: true,
                    valueFormat: function(d){
                         return d.toFixed(2);
                    },
                    duration: 450,
                    xAxis: {
                        axisLabel: 'Month (Jan-Dec)'
                    },
                    yAxis: {
                        axisLabel: 'Average Humidity (%)',
                        axisLabelDistance: 5
                    }
                }
            };

                 /*
          @ngdoc variable
          @name windoptions
          Sets plotting options like the scale and values for wind speed.Format the values if required
        */
              $scope.windoptions = {
                chart: {
                    type: 'discreteBarChart',
                    height: 350,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 75
                    },
                    x: function(d){return d.month;},
                    y: function(d){return d.data.windSpdAvg;},
                    showValues: true,
                    valueFormat: function(d){
                         return d.toFixed(2);
                    },
                    duration: 450,
                    xAxis: {
                        axisLabel: 'Month (Jan-Dec)'
                    },
                    yAxis: {
                        axisLabel: 'Average Wind Speed (km/h)',
                        axisLabelDistance: 5
                    }
                }
            };
             /*
          @ngdoc variable
          @name precipoptions
          Sets plotting options like the scale and values for precipitation. Format the values if required
        */

              $scope.precipoptions = {
                chart: {
                    type: 'discreteBarChart',
                    height: 350,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 75
                    },
                    x: function(d){return d.month;},
                    y: function(d){return d.data.precip;},
                    showValues: true,
                    valueFormat: function(d){
                         return d.toFixed(2);
                    },
                    duration: 450,
                    xAxis: {
                        axisLabel: 'Month (Jan-Dec)'
                    },
                    yAxis: {
                        axisLabel: 'Average Precipitation(%)',
                        axisLabelDistance: 5
                    }
                }
            };
      });